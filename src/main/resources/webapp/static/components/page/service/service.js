define('components/page/service/service', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var nav = require("navbar/navbar.js");

module.exports =   Vue.extend({
   template:"<div class=\"page-service\">\r\n    <div class=\"mui-control-content mui-active\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                服务列表\r\n            </h5>\r\n        </header>\r\n        <div class=\"mui-content\">\r\n            <ul class=\"mui-table-view mui-list\">\r\n                <i class=\" mui-pull-left iconfont icon-tuangou\"></i>\r\n                <li class=\"mui-table-view-cell\">\r\n                    <a class=\"mui-navigate-right\" href=\"#company\">承包商订位\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n\r\n            <h5 style=\"margin-top: 100px\" class=\"mui-content-padded\">其他应用</h5>\r\n\r\n            <ul class=\"mui-table-view mui-list\">\r\n                <i class=\" mui-pull-left iconfont icon-plane\"></i>\r\n                <li class=\"mui-table-view-cell\">\r\n                    <a class=\"mui-navigate-right\" href=\"http://m.ctrip.com/html5/flight/#&do_not_show_add_to_home_tip=1\">机票预订\r\n                    </a>\r\n                </li>\r\n                <i class=\" mui-pull-left iconfont icon-train\"></i>\r\n                <li class=\"mui-table-view-cell\">\r\n                    <a class=\"mui-navigate-right\" href=\"http://m.ctrip.com/webapp/train/\">火车票代购\r\n                    </a>\r\n                </li>\r\n                <i class=\" mui-pull-left iconfont icon-bus\"></i>\r\n                <li class=\"mui-table-view-cell\">\r\n                    <a class=\"mui-navigate-right\" href=\"http://m.ctrip.com/webapp/bus/\">汽车票预订\r\n                    </a>\r\n                </li>\r\n                <i class=\" mui-pull-left iconfont icon-car\"></i>\r\n                <li class=\"mui-table-view-cell\">\r\n                    <a class=\"mui-navigate-right\" href=\"http://m.ctrip.com/webapp/car/\">专车预订\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n\r\n    </div>\r\n    <c-nav view=\"service\"></c-nav>\r\n</div>"
});

});
