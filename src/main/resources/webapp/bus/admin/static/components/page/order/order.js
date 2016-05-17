define('components/page/order/order', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");

Vue.filter("dateFormat", function (v) {
   var d = new Date(v);
   return d.getFullYear() + "-" + (d.getMonth()+1) +"-" + d.getDate();
});

module.exports = Vue.extend({
   inherit:true,
   template:"<div>\r\n\r\n    <div class=\"panel admin-panel\">\r\n\r\n        <div class=\"panel-head\">\r\n\r\n            <strong>\r\n                车位预订\r\n            </strong>\r\n        </div>\r\n        <div class=\"padding border-bottom\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"label\"><label >目的地&nbsp;</label></div>\r\n                    <div class=\"field\">\r\n                        <select class=\"input\" name=\"place\">\r\n                            <option>请选择</option>\r\n                            <option value=\"1\">目的地1234</option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n            <ul class=\"nav nav-menu nav-inline nav-main nav-justified nav-navicon border-green\">\r\n                <li v-class=\"dateActive:$index==0\" v-repeat=\"d in dates\"><a href=\"javascript:;\" style=\"padding-left: 0;padding-right: 0;\">{{d | dateFormat}}</a></li>\r\n            </ul>\r\n        </div>\r\n        <table class=\"table table-hover\">\r\n            <tr><th width=\"45\">选择</th><th width=\"120\">车牌号</th><th width=\"100\">驾驶员</th><th width=\"100\">汽车类型</th><th width=\"100\">发车目的地</th><th width=\"100\">发车时间</th><th width=\"100\">座位数</th><th width=\"100\">操作</th></tr>\r\n            <tr v-repeat=\"c in cars\">\r\n                <td><input type=\"checkbox\" name=\"id\" value=\"1\" /></td>\r\n                <td>{{c.name}}</td>\r\n                <td>{{c.name}}</td>\r\n                <td>大巴</td>\r\n                <td>{{c.destination}}</td>\r\n                <td>{{c.goff}}</td>\r\n                <td>{{c.number}}</td>\r\n                <td><a class=\"button border-blue button-little\" href=\"#\">预订</a> </tr>\r\n        </table>\r\n    </div>\r\n</div>",
   data: function () {
      return {
         dates:[],
         cars:[]
      }
   },
   methods:{
      getDays: function (num) {
         var n = num || 12,now = Date.parse(new Date()),list = [];

         //CONFIG.OFFTIME;

         for(var i = 0; i< n;i++){
            now+=3600000*24;
            list.push(now);
         }
         return list;
      }
   },
   ready: function () {
      this.dates = this.getDays();
      var self = this;
      Service.getCarList({page:1,size:10}, function (rep) {
         self.cars = rep.Response.rows;
      })
   }
});

});
