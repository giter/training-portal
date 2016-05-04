define('components/page/validate/validate', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;

module.exports =   Vue.extend({
   inherit:true,
   template:"<div class=\"page-service\">\r\n    <div class=\"mui-control-content mui-active\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                验票\r\n            </h5>\r\n        </header>\r\n        <div class=\"mui-content  mui-scroll-wrapper\">\r\n            <div class=\"mui-scroll\">\r\n                <h5 v-if=\"list.length==0\" style=\"text-align: center;margin-top:100px;\">注：出发前半小时开始验票</h5>\r\n\r\n                <div v-repeat=\"l in list\" v-show=\"list.length>0\" class=\"mui-card twinkling\" style=\"padding: 8px;margin-top:20px;\">\r\n                    <h5 style=\"text-align: right;padding-top: 5px;\">\r\n                        <span style=\"font-size: 16px;font-weight: bold;color: #000;float: left\">{{l.user.name}}</span>\r\n                        <span style=\"color: #666;\">{{l.user.department}}{{l.user.unit}}</span>\r\n                    </h5>\r\n                    <div style=\"text-align: center;color: red;font-weight: bold;font-size: 25px;margin: 10px 0;font-weight: bold;\">\r\n                        {{l.bus.name}} {{l.seat.sn}}号座\r\n                    </div>\r\n                    <div >\r\n                        <span>   {{l.bus.line}}</span><span style=\"float: right\">{{l.bus.goff}} 开</span>\r\n                    </div>\r\n                    <div style=\"text-align: right\">\r\n                        <h5>{{l.date}} </h5>\r\n                    </div>\r\n                    <h5 style=\"text-align: center\">\r\n\r\n                    </h5>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n    <c-nav view=\"validate\"></c-nav>\r\n</div>",
   data: function () {
      return {
         list:[]
      }
   },
   methods:{
      render: function () {
         var self = this;
         Service.getMyTicket(function (rep) {
            if(rep.Code == 0){
               self.valid(rep.Response);
               mui(".page-service .mui-scroll-wrapper").scroll();
            }
         })
      },
      valid: function (data) {
         var now = Date.parse(new Date())/1000,list = [];
         for(var i in data){
            var time = Date.parse(new Date(data[i].date.replace(/-/g,"/")+" "+data[i].bus.goff))/1000;
            var diff = now - time;

            if(diff>=-this.beginTime&&diff<=this.endTime){
               list.push(data[i]);
            }
         }
         this.list = list;
      }
   },
   ready: function () {
      var self = this;
      this.render();
      setInterval(function () {
         self.render();
      },60000)
   }
});

});
