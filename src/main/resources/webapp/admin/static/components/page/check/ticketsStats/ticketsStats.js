define('components/page/check/ticketsStats/ticketsStats', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-ticketsStats\">\r\n <table class=\"table\">\r\n  <tbody><tr>\r\n   <th width=\"200\">名称</th>\r\n   <th width=\"300\">线路</th>\r\n   <th width=\"100\">可预订</th>\r\n   <th width=\"100\">已预订</th>\r\n   <th width=\"100\">总座位</th>\r\n   <th width=\"*\">操作</th>\r\n  </tr>\r\n  </tbody></table>\r\n <div  v-style=\"tableStyle\">\r\n  <table class=\"table table-hover\">\r\n   <tbody>\r\n   <tr v-repeat=\"b in tStats\" >\r\n    <td width=\"300\">\r\n     {{b.name}}\r\n    </td>\r\n\t<td width=\"200\">\r\n     {{b.line}}\r\n    </td>\r\n    <td width=\"100\">\r\n     {{b.void}}\r\n    </td>\r\n    <td width=\"100\">\r\n     {{b.order}}\r\n    </td>\r\n    <td width=\"100\">\r\n     {{b.order + b.void}}\r\n    </td>\r\n    <td width=\"*\">\r\n     <a  class=\"button border-blue button-little\" v-on=\"click:getBusSeat(b)\" href=\"javascript:;\">查看</a>\r\n    </td>\r\n   </tr>\r\n   </tbody>\r\n  </table>\r\n </div>\r\n</div>",
   methods:{
      getBusSeat: function (b) {
         var self = this;
         self.line = b.line;
         self.busname = b.name;
         Service.getBusTicketsa({bus: b.id,date:this.selectCalendar}, function (rep) {
            self.bus = rep.Response;
            self.childView = "seats";
         });
      }

   }
});


});
