define('components/page/check/check', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");
var Check = require("main/check.js");

var tStats = require("components/page/check/ticketsStats/ticketsStats");
var bSeat = require("components/page/check/busSeat/busSeat");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-companyOrder container-layout\">\r\n    <div class=\"line\">\r\n        \r\n        <div class=\"x12\" style=\"padding-left: 5px;\">\r\n            <div class=\"panel admin-panel\">\r\n                <div class=\"padding border-bottom\">\r\n                    <div class=\"form-inline\">\r\n                        <div class=\"form-group\">\r\n\r\n                            \r\n\r\n\t\t\t\t\t\t\t<div class=\"field\">\r\n                                <label>查询日期</label>\r\n                                <!--<select class=\"input\" v-model=\"selectCalendar\" options=\"calendar\" >-->\r\n                                    <!--<option value=\"\">请选择日期</option>-->\r\n                                <!--</select>-->\r\n                                <!--<input type=\"button\" v-on=\"click:showDatePicker\" v-attr=\"value:date||'请选择时间'\" style=\"height: 40px\" >-->\r\n                                <!--<input type=\"text\" style=\"height: 40px\"  v-model=\"selectCalendar\"  name=\"bdter\" id=\"bdter\"readonly=\"\" class=\"textbox\"   value=\"\" />-->\r\n                             <input class=\"input\" id=\"selectCalendar\" onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})\"/>\r\n                                <!--<option value=\"\">请选择日期</option>-->\r\n                                <!--</select>-->\r\n                                <!--<input type=\"test\" id=\"selectCalendar\" v-on=\"change:aa()\" v-model=\"selectCalendar\"/>-->\r\n                            </div>\r\n\t\t\t\t\t\t\t<div class=\"label\">\r\n\t\t\t\t\t\t\t\t&nbsp;&nbsp;&nbsp;&nbsp;\r\n                            </div>\r\n                            <div class=\"field\">\r\n\r\n                                <select v-on=\"change:searchTicketStats\" class=\"input\" v-model=\"selectWhither\" options=\"whither\">\r\n                                    <option>请选择目的地</option>\r\n                                </select>\r\n                            </div>\r\n                            <div class=\"label\">\r\n                                &nbsp;&nbsp;&nbsp;&nbsp;\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <button class=\"button  bg-green\" v-on=\"click:searchTicketStats\" data-target=\"#user-dialog\" data-mask=\"1\" data-width=\"50%\"    >\r\n                                    <span class=\"icon-search\"></span>搜索</button>\r\n                                </button>\r\n                               <!--<input type=\"button\" v-on=\"click:searchTicketStats\" value=\"查询\">-->\r\n                            </div>\r\n                        </div>\r\n                        <span class=\"badge bg-sub\">{{selectCalendar}}</span>\r\n                        <span class=\"badge bg-sub\">{{busname}}</span>\r\n                        <span class=\"badge bg-sub\">{{line}}</span>\r\n                    </div>\r\n                </div>\r\n\r\n                <div v-component=\"{{childView}}\" keep-alive ></div>\r\n\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>",
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
         line:"",
         busname:"",
         childView:"",
         tStats:[] /*查票*/
      }
   },
   methods:{
       //showDatePicker: function () {
       //    var self = this;
       //    this.picker.show(function (d) {
       //        self.date = d.text;
       //    });
       //},
      btnSearch: function () {

      },
      valid: function () {

      },
      searchTicketStats: function () {
          //alert(this.selectCalendar);
          //alert(this.selectWhither);
          //alert($('#selectCalendar').val())
          this.selectCalendar=$('#selectCalendar').val();
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
      onPrint: function () {
         print();
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

      },
       aa:function(){
           alert( this.selectCalendar)
           if( this.selectCalendar){
               //this.getCompanyUser();
               this.searchTicketStats();
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
            //this.getCompanyUser();
            this.searchTicketStats();
         }
      }
   },
   ready: function () {
      var self = this;
      Service.getCompanies(function (rep) {
         self.companies = rep.Response;
      });
      Service.getCalendara(function (rep) {
         if(rep.Code == 0){
            var target = rep.Response;
            var lst = [];
            for(var i=0;i<target.length;i++){
               lst.push({
                  value:target[i].value,
                  text:target[i].name +"-" +target[i].week + (i==10?"（今天）":"")
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


           //this.picker = new mui.DtPicker({"type":"date","beginYear":2016});

   }
});


});
