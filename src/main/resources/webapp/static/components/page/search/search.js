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
   template:"<div class=\"page-search\" >\r\n    <div class=\"mui-control-content mui-active\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                订单查询\r\n            </h5>\r\n        </header>\r\n        <div class=\"mui-content\">\r\n\r\n            <div class=\"x-control-group\">\r\n\r\n                <div class=\"x-label-edit x-label20\">\r\n                    <label class=\"x-label \">发车时间</label>\r\n                    <div class=\"x-edit\" >\r\n                        <select  v-model=\"search.date\" options=\"date\" class=\"form-control\"><option value=\"\">请选择...</option></select>\r\n                    </div>\r\n                </div>\r\n\r\n<div style=\"text-align: center;margin-top: 20px;\">\r\n    <button type=\"button\" v-on=\"click:onSearch('昌江')\" class=\"mui-btn mui-btn-primary mui-btn-block\">昌江</button>\r\n    <button type=\"button\" v-on=\"click:onSearch('海口')\"  class=\"mui-btn mui-btn-green mui-btn-block\">海口</button>\r\n</div>\r\n\r\n            </div>\r\n            <!--<ul class=\"mui-table-view mui-list\">-->\r\n            <!--<li class=\"mui-table-view-cell\">-->\r\n            <!--<a>出发时间-->\r\n\r\n            <!--<select class=\"app-select\" v-model=\"selectCompany\" options=\"companies\">-->\r\n            <!--<option>请选择</option>-->\r\n            <!--</select>-->\r\n\r\n            <!--</a>-->\r\n            <!--</li>-->\r\n            <!--<i class=\" iconfont icon-target\"></i>-->\r\n            <!--<li class=\"mui-table-view-cell\">-->\r\n            <!--<a class=\"mui-navigate-right\" v-on=\"tap:onClick('whither')\">目的地-->\r\n            <!--<span class=\"mui-pull-right form-value\">-->\r\n            <!--{{search.whither}}-->\r\n            <!--</span>-->\r\n            <!--</a>-->\r\n            <!--</li>-->\r\n            <!--</ul>-->\r\n\r\n            <!--<button class=\"mui-btn mui-btn-block\" id=\"btn-search\" v-on=\"click:onSearch()\" >-->\r\n                <!--<span class=\"mui-icon mui-icon-search\"></span>查询-->\r\n            <!--</button>-->\r\n\r\n\r\n        </div>\r\n\r\n    </div>\r\n    <c-nav view=\"search\">\r\n    </c-nav>\r\n</div>",
   data: function () {
     return {
        date:[],
        selectDate:""
     }
   },
   methods:{
      onClick: function (hash) {
         var router = new Router();
         router.setRoute(hash);
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
                  self.result = rep.Response;
                  var router = new Router();
                  return router.setRoute("search/result");
               }
            })
         }
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
         }
      });

   }
});

});
