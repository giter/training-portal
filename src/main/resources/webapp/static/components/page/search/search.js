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
   template:"<div class=\"page-search\" >\r\n    <div class=\"mui-control-content mui-active\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                班车查询\r\n            </h5>\r\n        </header>\r\n        <div class=\"mui-content mui-scroll-wrapper\">\r\n            <div class=\"mui-scroll\">\r\n                <h5 class=\"mui-content-padded\">出发时间</h5>\r\n                <div class=\"mui-card\">\r\n                    <form class=\"mui-input-group\">\r\n                        <div class=\"mui-input-row mui-radio\" v-repeat=\"d in date\" v-on=\"click:onSelectDate(d)\">\r\n                            <label>{{d.text}}</label>\r\n                            <input name=\"radio1\" type=\"radio\" >\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n                <h5 class=\"mui-content-padded\">目的地</h5>\r\n                <div class=\"mui-card\">\r\n                    <ul class=\"mui-table-view\">\r\n                        <li class=\"mui-table-view-cell\" v-on=\"click:onSearch('昌江')\">\r\n                            <a class=\"mui-navigate-right\">\r\n                                前往昌江\r\n                            </a>\r\n                        </li>\r\n                        <li class=\"mui-table-view-cell\" v-on=\"click:onSearch('海口')\">\r\n                            <a class=\"mui-navigate-right\">\r\n                                前往海口\r\n                            </a>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n                <h5 class=\"mui-content-padded\">&nbsp;</h5>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <c-nav view=\"search\">\r\n    </c-nav>\r\n</div>",
   data: function () {
     return {
        date:[],
        style:{
           height:0
        }
     }
   },
   methods:{
      onClick: function (hash) {
         var router = new Router();
         router.setRoute(hash);
      },
      onSelectDate: function (d) {
         this.search.date  = d.value;
      },
      onSearch: function (whither) {
         this.search.whither = whither;
         if(this.valid()){
            var self = this;
            Layer.open({
               content:"查询中",
               type:2,
               shadeClose:true
            });

            Service.getResult({date:self.search.date,dest:whither},function (rep) {
               Layer.closeAll();
               if(rep.Code == 0){
                  self.result = self.filterBus(rep.Response);
                  var router = new Router();
                  return router.setRoute("search/result");
               }
            })
         }
      },
      filterBus: function (data) {
         var now = Date.parse(new Date())/1000,list = [];
         for(var i in data){
            var time = Date.parse(new Date(data[i].date.replace("-","/")))/1000;
            var diff = now - time;

            if(diff <= 0){
               list.push(data[i]);
            }
         }
         return list;
      },
      valid: function () {
         var str = null;
         if(!this.search.date){
            str = "请先选择出发时间！";
         }
         if(this.search.whither =="请选择"){
            str = "请先选择目的地！";
         }
         if(str){
               Layer.open({
               content:str,
               shadeClose:false,
               btn:["确定"],
               yes: function () {
                  Layer.closeAll();
               }
            })
         }
         return !str;
      }
   },
   ready: function () {
      var self = this;
      Service.getCalendar(function (rep) {
         if(rep.Code == 0){
            var target = rep.Response;
            var lst = [];
            for(var i in target){
               lst.push({
                  value:target[i].value,
                  text:target[i].name +" " + target[i].week
               })
            }
            self.calendars =self.date = lst;

            mui(".page-search .mui-scroll-wrapper").scroll();
         }
      });
   }
});

});
