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
   template:"<div class=\"page-search-result\" >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" v-on=\"click:toRouter('search')\"></a>\r\n        <h5 class=\"mui-title\">\r\n            查询结果\r\n        </h5>\r\n        <a class=\"mui-icon mui-icon-refresh mui-pull-right\" v-on=\"click:getResult\"></a>\r\n    </header>\r\n\r\n    <div class=\"mui-content\" v-show=\"result.length>0\">\r\n        <h5 class=\"mui-content-padded\">\r\n            {{result.length}}/{{result.length}}车次\r\n        </h5>\r\n        <ul class=\"mui-table-view\">\r\n            <li class=\"mui-table-view-cell mui-media\" v-repeat=\"r in result\">\r\n                <a v-if=\"r.offTime\" v-class=\"mui-navigate-right:!r.offTime\"  >\r\n                    <img style=\"max-width: 62px;width: 62px;height: 62px;\" class=\"mui-media-object mui-pull-left\" v-attr=\"src:r.src||'/admin/static/images/128.png'\">\r\n                    <div class=\"mui-media-body\">\r\n                        <h4 class=\"mui-ellipsis-2\" style=\"font-weight: bold;font-size: 14px;color: #007aff;\"> {{r.line}}</h4>\r\n                        <div style=\"color: #8f8f94\">{{r.name}} {{r.order}}/{{r.void + r.order}}</div>\r\n                        <p>\r\n                            {{r.date}}至{{r.arrive}}\r\n                        </p>\r\n                    </div>\r\n                    <span v-show=\"r.offTime\" class=\"mui-badge\">过期</span>\r\n                </a>\r\n\r\n                <a v-if=\"!r.offTime\" v-class=\"mui-navigate-right:!r.offTime\"  href=\"#bus/{{r.id}}/{{search.date}}/{{r.offTime}}\" >\r\n                    <img style=\"max-width: 62px;width: 62px;height: 62px;\" class=\"mui-media-object mui-pull-left\" v-attr=\"src:r.src||'/admin/static/images/128.png'\">\r\n                    <div class=\"mui-media-body\">\r\n                        <h4 class=\"mui-ellipsis-2\" style=\"font-weight: bold;font-size: 14px;color: #007aff;\"> {{r.line}}</h4>\r\n                        <div style=\"color: #8f8f94\">{{r.name}} {{r.order}}/{{r.void + r.order}}</div>\r\n                        <p>\r\n                            {{r.date}}至{{r.arrive}}\r\n                        </p>\r\n                    </div>\r\n                    <span v-show=\"r.offTime\" class=\"mui-badge\">过期</span>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n        <div style=\"height:50px;\"></div>\r\n    </div>\r\n    \r\n    <div v-show=\"result.length==0\" class=\"mui-content-padded mui-text-center\" style=\"padding-top: 50px;\">\r\n        <img src=\"/static/images/noticket.gif\">\r\n        <div>对不起，没有车了，您可选择其他日期。</div>\r\n    </div>\r\n\r\n    <nav class=\"mui-bar mui-bar-tab\">\r\n        <div class=\"time-nav\">\r\n            <span class=\"mui-action mui-action-previous mui-icon mui-icon-back\" v-on=\"click:btnPrev\"></span>\r\n            <span class=\"time\">{{search.date}}</span>\r\n            <span class=\"mui-action mui-action-next mui-icon mui-icon-forward\" v-on=\"click:btnNext\"></span>\r\n        </div>\r\n    </nav>\r\n</div>",
   methods:{

      btnPrev: function () {
         var i = 0;
         for(;i<this.calendars.length;i++){
            if(this.calendars[i].value == this.search.date){
               if(i>0){
                  this.search.date = this.calendars[i-1].value;
                  return this.getResult();
               }
            }
         }
      },

      btnNext: function () {
         var i = 0;
         for(;i<(this.calendars.length-1);i++){
            if(this.calendars[i].value == this.search.date){
               this.search.date = this.calendars[i+1].value;
               return this.getResult();
            }
         }
      },

      getResult: function () {
         var self = this;
         self.bus = [];
         Layer.open({
            content: "加载中",
            type: 2,
            shadeClose: false,
            shade: false
         });
         Service.getResult({date:self.search.date,dest:self.search.whither},function (rep) {

            if(rep.Code == 0){
               self.result =self._checkOutBus(self.filterBus(rep.Response));
            }
            Layer.closeAll();
         })
      },

      selectBus: function (busid,date,off) {
         if(off){
            return Layer.open({
               content: "已超过订车时间，请选择其他班车。",
               btn:["确定"]
            });
         }else{
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
         }
      },
      toRouter: function (url) {
         var router = new Router();
         return router.setRoute(url);
      },
      filterBus: function (data) {
         return Service.filterBus(data);
      },
      _checkOutBus: function (data) {
         var now = Date.parse(new Date());
         for(var i in data){
            var t = Date.parse(new Date(data[i].date.replace(/-/g,"/")));
            if(now > t){
               data[i].offTime = true;
            }else{
               data[i].offTime = false;
            }
         }
         return data;

      }
   },
   computed:{

   },
   ready: function () {

      var self = this;

      if(typeof self.search.date != "string"){
         var router = new Router();
         return router.setRoute("search");
      }

      this.$on("backReload", function () {
         self.getResult();
      })
   }
});

});
