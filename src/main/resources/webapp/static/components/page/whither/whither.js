define('components/page/whither/whither', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var nav = require("navbar/navbar.js");
var service = require("main/service.js");
var Router = require('component_modules/director').Router;
var Layer =  require('component_modules/layer.m').layer;
module.exports =   Vue.extend({
   inherit:true,
   template:"<div class=\"page-whither\">\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\"mui-action-back mui-icon mui-icon-left-nav mui-pull-left\" href=\"#search\"></a>\r\n        <h5 class=\"mui-title\">\r\n            选择目的地\r\n        </h5>\r\n    </header>\r\n    <div class=\"mui-content\">\r\n        <div id='list' class=\"mui-indexed-list\">\r\n            <div class=\"mui-indexed-list-search mui-input-row mui-search\">\r\n                <input type=\"search\" class=\"mui-input-clear mui-indexed-list-search-input\" placeholder=\"搜查名称或首字母\">\r\n            </div>\r\n            <div class=\"mui-indexed-list-bar\">\r\n                <a>A</a>\r\n                <a>B</a>\r\n                <a>C</a>\r\n                <a>D</a>\r\n                <a>E</a>\r\n                <a>F</a>\r\n                <a>G</a>\r\n                <a>H</a>\r\n                <a>I</a>\r\n                <a>J</a>\r\n                <a>K</a>\r\n                <a>L</a>\r\n                <a>M</a>\r\n                <a>N</a>\r\n                <a>O</a>\r\n                <a>P</a>\r\n                <a>Q</a>\r\n                <a>R</a>\r\n                <a>S</a>\r\n                <a>T</a>\r\n                <a>U</a>\r\n                <a>V</a>\r\n                <a>W</a>\r\n                <a>X</a>\r\n                <a>Y</a>\r\n                <a>Z</a>\r\n            </div>\r\n            <div class=\"mui-indexed-list-alert\"></div>\r\n            <div class=\"mui-indexed-list-inner\">\r\n                <div class=\"mui-indexed-list-empty-alert\">没有数据</div>\r\n                <ul class=\"mui-table-view\" id=\"whither-list\">\r\n                   <li data-group=\"{{v.group}}\" v-repeat=\"v in whithers\" data-index=\"{{$index}}\" class=\"mui-table-view-divider mui-indexed-list-group\">\r\n                        {{v.group}}\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n</div>",
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

});
