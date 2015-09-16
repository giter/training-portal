define('components/page/companyOrder/companyOrder', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");
var Check = require("main/check.js");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-companyOrder container-layout\">\r\n    <div class=\"line\">\r\n        <div class=\"x9\" style=\"padding-right: 5px;\">\r\n            <div class=\"panel admin-panel\">\r\n\r\n                <div class=\"padding border-bottom\">\r\n                    <div class=\"form-inline\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                目的地：\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <select class=\"input\">\r\n                                    <option>请选择目的地</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                日期：\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <select class=\"input\">\r\n                                    <option>10月1日</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <button class=\"button bg-main float-right\" >查询</button>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n        <div class=\"x3\">\r\n            <div class=\"panel admin-panel\">\r\n                <div class=\"padding border-bottom\">\r\n                    <div class=\"form-inline\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                承包商：\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <select class=\"input\" v-model=\"selectCompany\" options=\"companies\">\r\n                                    <option>请选择承包商</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>",
   data: function () {
      return {
         companies:[],
         selectCompany:""
      }
   },
   ready: function () {
      var self = this;
      Service.getCompanies(function (rep) {
         self.companies = rep.Response;
      });
   }
});


});
