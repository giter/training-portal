/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var service = require("main/service.js");
var Router = require('component_modules/director').Router;
var Layer =  require('component_modules/layer.m.js').layer;
module.exports =   Vue.extend({
   inherit:true,
   template:__inline("whither.html"),
   data: function () {
   },
   ready: function () {
      var self = this;
      Layer.open({
         content:"加载中",
         type:2,
         shadeClose:false,
         shade:"background-color:rgba(0,0,0,0)"
      });
      service.getWhither(function (rep) {
         Layer.closeAll();
         if(rep.Code == 0){
            self.whithers = rep.Response;
            Vue.nextTick(function () {
               self.render();
            })
         }
      });
   },
   methods:{
      toRouter: function (url) {
         var router = new Router();
         router.setRoute(url);
      },
      render: function () {
         var self = this,$list = $("#whither-list");
         self.router = new Router();

         var lst = $list.find(".mui-indexed-list-group");
         lst.each(function (index,target) {
            for(var i=0;i<self.whithers.length;i++){
               if($(target).data("group") == self.whithers[i].group){
                  var ws = self.whithers[i].list;
                  for(var l=0;l<ws.length;l++){
                     $(target).after(' <li data-value='+ws[l].id+' data-index='+l+' data-name='+ws[l].name+' data-tags='+ws[l].tag+' class="mui-table-view-cell mui-indexed-list-item">'+ws[l].name+'</li>');
                  }
               }
            }
         });

         $list.delegate(".mui-indexed-list-item","click", function (e) {
            var v = $(e.target).data("value"),name = $(e.target).data("name"),index = $(e.target).data("index");
            self.search.whither = name;
            self.router.setRoute("search");
         });

         var header = $("header.mui-bar");
         var list = $("#list");
         list.height(document.body.offsetHeight - header[0].offsetHeight);
         new mui.IndexedList(list[0]);
      }
   }
});