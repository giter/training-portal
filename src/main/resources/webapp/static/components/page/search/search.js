define('components/page/search/search', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var nav = require("navbar/navbar.js");
var Router = require('component_modules/director').Router;
var Layer = require('component_modules/layer.m').layer;
var Service =require("main/service.js");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-search\">\r\n    <div class=\"mui-control-content mui-active\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                订单查询\r\n            </h5>\r\n        </header>\r\n        <div class=\"mui-content\">\r\n            <ul class=\"mui-table-view mui-list\">\r\n                <i class=\" iconfont icon-target\"></i>\r\n                <li class=\"mui-table-view-cell\">\r\n                    <a class=\"mui-navigate-right\" v-on=\"click:onClick('whither')\">目的地\r\n                    <span class=\"mui-pull-right form-value\">\r\n                        {{search.whither}}\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <i class=\"iconfont icon-time\"></i>\r\n                <li class=\"mui-table-view-cell\">\r\n                    <a class=\"mui-navigate-right\" v-on=\"click:onClick('calendar')\"  >出发时间\r\n                        <span class=\"mui-pull-right form-value\">\r\n                        {{dateStr}}\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n\r\n            <button class=\"mui-btn mui-btn-block\" id=\"btn-search\" v-on=\"click:onSearch()\" >\r\n                <span class=\"mui-icon mui-icon-search\"></span>查询\r\n            </button>\r\n        </div>\r\n\r\n    </div>\r\n    <c-nav view=\"search\">\r\n    </c-nav>\r\n</div>",
   methods:{
      onClick: function (hash) {
         var router = new Router();
         router.setRoute(hash);
      },
      onSearch: function () {
         var self = this;
         Layer.open({
            content:"查询中",
            type:2,
            shadeClose:true
         });
         Service.getResult({date:self.calendars[self.search.date].value,dest:self.search.whither},function (rep) {
            Layer.closeAll();
            if(rep.Code == 0){
               self.result = rep.Response;
               var router = new Router();
               return router.setRoute("search/result");
            }
         })
      }
   },
   computed:{
      "dateStr": function () {
         if(typeof this.search.date == "number"){
            this.search.dateStr = this.calendars[this.search.date].name +" "+ this.calendars[this.search.date].week;
            return this.search.dateStr;
         }else{
            this.search.dataStr = "";
            return "请选择"
         }
      }
   }
});

});
