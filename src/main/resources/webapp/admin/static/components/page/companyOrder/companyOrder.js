define('components/page/companyOrder/companyOrder', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");
var Check = require("main/check.js");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-companyOrder container-layout\">\r\n    <div class=\"line\">\r\n        <div class=\"x9\" style=\"padding-right: 5px;\">\r\n            <div class=\"panel admin-panel\">\r\n\r\n                <div class=\"padding border-bottom\">\r\n                    <div class=\"form-inline\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                目的地：\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <select class=\"input\" v-model=\"selectWhither\" options=\"whither\">\r\n                                    <option>请选择目的地</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                日期：\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <select class=\"input\" v-model=\"selectCalendar\" options=\"calendar\">\r\n                                    <option>请选择日期</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <button class=\"button bg-main float-right\" >查询</button>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n        <div class=\"x3\">\r\n            <div class=\"panel admin-panel\">\r\n                <div class=\"padding border-bottom\">\r\n                    <div class=\"form-inline\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                承包商：\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <select class=\"input\" v-model=\"selectCompany\" options=\"companies\">\r\n                                    <option>请选择承包商</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n\r\n                </div>\r\n\r\n                <table class=\"table\">\r\n                    <tr>\r\n                        <th width=\"50\">序号</th>\r\n                        <th width=\"*\">姓名</th>\r\n                        <th width=\"50\">选择</th>\r\n                    </tr>\r\n                </table>\r\n                <div v-style=\"tableStyle\" >\r\n                    <table class=\"table table-hover\">\r\n                        <tr v-repeat=\"u in users\" >\r\n                            <td>\r\n                                {{$index+1}}\r\n                            </td>\r\n                            <td>\r\n                                {{u.name}}\r\n                            </td>\r\n                            <td>\r\n                                <input type=\"checkbox\">\r\n                            </td>\r\n                        </tr>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>",
   data: function () {
      return {
         companies:[],
         selectCompany:null,
         selectUser:null,
         calendar:[],
         selectCalendar:null,
         whither:[],
         selectWhither:null,
         users:[],
         tableStyle:{
            "height":document.documentElement.clientHeight-280 +"px",
            "overflow-y":"auto",
            "cursor":"pointer"
         }
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
               self.users = rep.Response.lists;
               self.loading = false;
            }
         })
      }
   },
   watch:{
     "selectCompany": function () {
        this.getUser();
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
