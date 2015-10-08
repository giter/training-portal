define('components/page/companyOrder/companyOrder', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");
var Check = require("main/check.js");

var tStats = require("components/page/companyOrder/ticketsStats/ticketsStats");
var bSeat = require("components/page/companyOrder/busSeat/busSeat");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-companyOrder container-layout\">\r\n    <div class=\"line\">\r\n        <div class=\"x5\">\r\n            <div class=\"panel admin-panel\">\r\n                <div class=\"padding border-bottom\">\r\n                    <div class=\"form-inline\">\r\n                        <div class=\"form-group\">\r\n\r\n                            <div class=\"field\">\r\n                                <select class=\"input\" v-model=\"selectCompany\" options=\"companies\">\r\n                                    <option >请选择承包商</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"field\">\r\n                                <select class=\"input\" v-model=\"selectCalendar\" options=\"calendar\">\r\n                                    <option value=\"\">请选择日期</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <!--<button class=\"button bg-main float-right\" v-on=\"click:getCompanyUser\" >查询</button>-->\r\n                </div>\r\n\r\n                <table class=\"table\">\r\n                    <tr>\r\n                        <th width=\"60\">序号</th>\r\n                        <th width=\"100\">姓名</th>\r\n                        <th width=\"100\">车辆</th>\r\n                        <th width=\"100\">车位</th>\r\n                        <th width=\"*\">操作</th>\r\n                    </tr>\r\n                </table>\r\n                <div v-style=\"tableStyle\" >\r\n                    <table class=\"table \">\r\n                        <tr v-repeat=\"u in users\" style=\"cursor: pointer\" v-on=\"click:clickUser(u._id)\" v-class=\"bg-main:u._id == selectUser\">\r\n                            <td width=\"60\">\r\n                                {{$index+1}}\r\n                            </td>\r\n                            <td width=\"100\">\r\n                                {{u.name}}\r\n                            </td>\r\n                            <td width=\"100\">\r\n                                {{u.bus}}\r\n                            </td>\r\n                            <td width=\"100\">\r\n                                {{u.seat}}\r\n                            </td>\r\n                            <td width=\"*\">\r\n                                <button v-if=\"u.seat\" v-on=\"click:unSub(u._id,u.ticket)\" class=\"button bg-yellow\">退订</button>\r\n                            </td>\r\n                        </tr>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"x7\" style=\"padding-left: 5px;\">\r\n            <div class=\"panel admin-panel\">\r\n                <div class=\"padding border-bottom\">\r\n                    <div class=\"form-inline\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <select v-attr=\"disabled:users.length==0\" v-on=\"change:searchTicketStats\" class=\"input\" v-model=\"selectWhither\" options=\"whither\">\r\n                                    <option>请选择目的地</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                        <span class=\"badge bg-sub\">{{selectCalendar}}</span>\r\n                    </div>\r\n                    <button v-on=\"click:onOrder\" class=\"button bg-main float-right\"  v-attr=\"disabled:!selectSeat||!selectUser\">预订</button>\r\n\r\n                </div>\r\n\r\n                <div v-component=\"{{childView}}\" keep-alive ></div>\r\n\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>",
   components:{
      stats:tStats,
      seats:bSeat,
      bus:{}
   },
   data: function () {
      return {
         companies:[],
         selectCompany:null,
         selectUser:null,
         calendar:[],
         selectCalendar:null,
         selectSeat:null,
         whither:[],
         selectWhither:null,
         users:[],
         tableStyle:{
            "height":document.documentElement.clientHeight-282 +"px",
            "overflow-y":"auto"
         },tableStyle2:{
            "height":document.documentElement.clientHeight-245 +"px",
            "overflow-y":"auto"
         },
         bus:{},
         childView:"",
         tStats:[] /*查票*/
      }
   },
   methods:{
      getUser: function () {
         var self =this;
         this.loading = true;
         if(!this.selectCompany){
            return this.users = [];
         }
         Service.getUsers({
            page:0,
            limit:999,
            type:1,
            company:self.selectCompany
         }, function (rep) {
            if(rep.Code == 0){
               var users = rep.Response.lists;

               Service.getCompanyTicket({
                  page:0,
                  limit:999,
                  company:self.selectCompany,
                  date:self.selectCalendar
               }, function (rep) {
                  if(rep.Code == 0){
                     var list = rep.Response;
                     for(var u = 0;u< users.length; u++){
                        for(var i =0;i< list.length; i++){
                           if(users[u]._id == list[i].user._id){
                              users[u].bus = list[i].bus.sn;
                              users[u].seat = list[i].seat.sn;
                              users[u].ticket = list[i]._id;
                           }
                        }
                     }
                     self.users =users;
                  }
                  self.loading = false;
               })

            }
         })
      },
      btnSearch: function () {

      },
      valid: function () {

      },
      searchTicketStats: function () {
         if(this.selectCalendar&&this.selectWhither){
            this.loading = true;
            var self = this;
            Service.getTicketStats({dest:this.selectWhither,date:this.selectCalendar}, function (rep) {
               self.loading = false;
               if(rep.Code == 0){
                  self.tStats = rep.Response;
                  self.childView = "stats";
               }
            })
         }
      },
      getCompanyUser: function () {
         this.selectUser = "";
         this.getUser();
      },
      clickUser: function (id) {
         this.selectUser = id;
      },
      onOrder: function () {
         var self = this;
         this.loading = true;
         Service.orderTicket(this.selectUser,this.selectSeat, function (rep) {
            self.loading = false;
            if(rep.Code == 0){
               self.getUser();
               self.selectSeat = null;
               $(".page-busSeat .icon-seat-select").removeClass("icon-seat-select").addClass("icon-seat-order");
            }else{
               alert(rep.Message);
            }
         })
      },
      unSub: function (uid,id) {
         var r = confirm("确定退订？");
         var self = this;
         if(r){
            this.loading = true;
            Service.unTicket(uid,id, function (rep) {
               this.loading = false;
               self.getUser();
            })
         }

      }
   },
   watch:{
      "selectCompany": function (v) {
         if(v && this.selectCalendar){
            this.getCompanyUser();
         }
      },
      "selectCalendar": function (v) {
         if(v && this.selectCalendar){
            this.getCompanyUser();
            this.searchTicketStats();
         }
      }
   },
   ready: function () {
      var self = this;
      Service.getCompanies(function (rep) {
         self.companies = rep.Response;
      });
      Service.getCalendar(function (rep) {
         if(rep.Code == 0){
            var target = rep.Response;
            var lst = [];
            for(var i in target){
               lst.push({
                  value:target[i].value,
                  text:target[i].name +"-" +target[i].week
               })
            }
            self.calendar = lst;
         }
      });
      Service.getWhither(function (rep) {
         if(rep.Code == 0){
            var target = rep.Response;
            var lst = [];
            for(var i in target){
               for(var d in target[i].list){
                  lst.push(target[i].list[d].id);
               }
            }
            self.whither = lst;
         }
      })
   }
});


});
