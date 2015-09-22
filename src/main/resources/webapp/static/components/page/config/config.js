define('components/page/config/config', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var nav = require("navbar/navbar.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m").layer;
module.exports =   Vue.extend({
   template:"<div class=\"page-config\">\r\n    <div class=\"mui-control-content mui-active\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                订单查询\r\n            </h5>\r\n        </header>\r\n        <div class=\"mui-content\">\r\n            <ul class=\"mui-table-view mui-list\">\r\n                <i class=\" mui-pull-left iconfont icon-user\"></i>\r\n                <li class=\"mui-table-view-cell\">\r\n                    <a >\r\n                        {{mine.email}}\r\n                        <!--<button v-on=\"click:unBind\" class=\"mui-btn mui-btn-outlined mui-btn-negative\">解绑</button>-->\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n\r\n            <ul class=\"mui-table-view mui-list\" style=\"margin-top: 25px;\">\r\n                <i class=\" mui-pull-left iconfont icon-users\"></i>\r\n                <li class=\"mui-table-view-cell\">\r\n                    <a class=\"mui-navigate-right\" href=\"#relation\">\r\n                        委托用户\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n\r\n\r\n    </div>\r\n   <c-nav view=\"config\"></c-nav>\r\n</div>",
   data: function () {
      return {
         mine:{}
      }
   },
   methods:{
      unBind: function () {
         Layer.open({
            content:"确定解绑该账号？",
            btn:["确定","取消"],
            shadeClose:false,
            yes: function () {
               Layer.closeAll();
            },
            no: function () {
               Layer.closeAll();
            }
         });
      } 
   },
   ready: function () {
      var self = this;
      Layer.open({
         content:"加载中",
         type:2,
         shadeClose:false,
         shade:"background-color:rgba(0,0,0,0)"
      });
      Service.getMine(function (rep) {
         Layer.closeAll();
         if(rep.Code == 0){
            self.mine = rep.Response;
         }
      })
   }
});

});
