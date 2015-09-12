define('components/page/config/config', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var nav = require("navbar/navbar.js");

module.exports =   Vue.extend({
   template:"<div class=\"page-config\">\r\n    <div class=\"mui-control-content mui-active\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                订单查询\r\n            </h5>\r\n        </header>\r\n        <div class=\"mui-content\">\r\n            <ul class=\"mui-table-view mui-list\">\r\n                <i class=\" mui-pull-left iconfont icon-user\"></i>\r\n                <li class=\"mui-table-view-cell\">\r\n                    <a class=\"mui-navigate-right\">\r\n                        hao3304@qq.com\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n\r\n            <ul class=\"mui-table-view mui-list\" style=\"margin-top: 25px;\">\r\n                <i class=\" mui-pull-left iconfont icon-users\"></i>\r\n                <li class=\"mui-table-view-cell\">\r\n                    <a class=\"mui-navigate-right\" href=\"#relation\">\r\n                        关联用户\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n\r\n\r\n    </div>\r\n   <c-nav view=\"config\"></c-nav>\r\n</div>"
});

});
