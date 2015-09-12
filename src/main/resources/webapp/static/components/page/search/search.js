define('components/page/search/search', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var nav = require("navbar/navbar.js");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-search\">\r\n    <div class=\"mui-control-content mui-active\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                订单查询\r\n            </h5>\r\n        </header>\r\n        <div class=\"mui-content\">\r\n            <ul class=\"mui-table-view mui-list\">\r\n                <i class=\" iconfont icon-target\"></i>\r\n                <li class=\"mui-table-view-cell\">\r\n                    <a class=\"mui-navigate-right\" v-on=\"click:onClick('#whither')\">目的地\r\n                    <span class=\"mui-pull-right form-value\">\r\n                        {{search.target}}\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n                <i class=\"iconfont icon-time\"></i>\r\n                <li class=\"mui-table-view-cell\">\r\n                    <a class=\"mui-navigate-right\" v-on=\"click:onClick('#calendar')\"  >出发时间\r\n                        <span class=\"mui-pull-right form-value\">\r\n                        {{search.time}}\r\n                    </span>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n\r\n            <button class=\"mui-btn mui-btn-block\" id=\"btn-search\" v-on=\"click:onClick('#search/result')\" >\r\n                <span class=\"mui-icon mui-icon-search\"></span>查询\r\n            </button>\r\n        </div>\r\n\r\n    </div>\r\n    <c-nav view=\"search\">\r\n    </c-nav>\r\n</div>",
   methods:{
      onClick: function (hash) {
         window.location.hash = hash;
      }
   },
   ready: function () {

   }
});

});
