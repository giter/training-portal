define('components/page/search/result/result', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");
var Router = require('component_modules/director').Router;
var Layer = require("component_modules/layer.m").layer;

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-search-result\" >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\"mui-action-back mui-icon mui-icon-left-nav mui-pull-left\" v-on=\"tap:toRouter('search')\"></a>\r\n        <h5 class=\"mui-title\">\r\n            查询结果\r\n        </h5>\r\n    </header>\r\n\r\n    <div class=\"mui-content\">\r\n        <h5 class=\"mui-content-padded\">\r\n            {{result.length}}/{{result.length}}车次\r\n        </h5>\r\n        <ul class=\"mui-table-view\">\r\n            <li class=\"mui-table-view-cell mui-media\" v-repeat=\"r in result\">\r\n                <a class=\"mui-navigate-right\" v-on=\"click:selectBus(r.id,calendars[search.date].value)\">\r\n                    <img style=\"max-width: 62px;width: 62px;height: 62px;\" class=\"mui-media-object mui-pull-left\" v-attr=\"src:r.src||'/admin/static/images/128.png'\">\r\n                    <div class=\"mui-media-body\">\r\n                        {{r.name}} {{r.whither}}\r\n                        <p>\r\n                            {{r.date}}\r\n                        <h5>\r\n                            <span style=\"color: red;font-weight: bold;\">空座：{{r.void}}</span> 预订：{{r.order}} 全部：{{r.void + r.order}}\r\n                        </h5>\r\n                        </p>\r\n                    </div>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n\r\n    </div>\r\n\r\n    <nav class=\"mui-bar mui-bar-tab\">\r\n        <div class=\"time-nav\">\r\n            <span class=\"mui-action mui-action-previous mui-icon mui-icon-back\" v-on=\"tap:btnPrev\"></span>\r\n            <span class=\"time\">{{dateStr}}</span>\r\n            <span class=\"mui-action mui-action-next mui-icon mui-icon-forward\" v-on=\"tap:btnNext\"></span>\r\n        </div>\r\n    </nav>\r\n</div>",
   methods:{
      btnPrev: function () {
         if(this.search.date > 0){
            this.search.date -=1;
            this.getResult();
         }
      },
      btnNext: function () {
         if(this.search.date < (this.calendars.length-1)){
            this.search.date+=1;
            this.getResult();
         }
      },
      getResult: function () {
         var self = this;
         Service.getResult({date:self.calendars[self.search.date].value,dest:self.search.whither},function (rep) {
            if(rep.Code == 0){
               self.result = rep.Response;
            }
            Layer.closeAll();
         })
      },
      selectBus: function (busid,date) {
         var self = this;
         Layer.open({
            content:"加载中",
            type:2,
            shadeClose:false,
            shade:"background-color:rgba(0,0,0,0)"
         });
         Service.getBusSeat({bus:busid,date:date},function (rep) {
            Layer.closeAll();
            if(rep.Code == 0){
               self.bus = rep.Response;
               var router = new Router();
               return router.setRoute("bus");
            }
         })
      },
      toRouter: function (url) {
         var router = new Router();
         return router.setRoute(url);
      }
   },
   computed:{
      "dateStr": function () {
         if(this.calendars){
            return this.calendars[this.search.date].name +" " +this.calendars[this.search.date].week;
         }
      }
   },
   ready: function () {
      var self = this;
      if(typeof self.search.date != "number"){
         var router = new Router();
         return router.setRoute("search");
      }
   }
});

});
