define('components/page/service/service', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var nav = require("navbar/navbar.js");

module.exports =   Vue.extend({
   template:"<div class=\"page-service\">\r\n    <div class=\"mui-control-content mui-active\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                服务列表\r\n            </h5>\r\n        </header>\r\n        <div class=\"mui-content  mui-scroll-wrapper\">\r\n            <div class=\"mui-scroll\">\r\n                <ul class=\"mui-table-view mui-list\" style=\"margin-top: 15px;\">\r\n                    <i class=\" mui-pull-left iconfont icon-tuangou\"></i>\r\n                    <li class=\"mui-table-view-cell\">\r\n                        <a class=\"mui-navigate-right\" href=\"#company\">承包商订位查询\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n                <h5 style=\"margin-top: 60px\" class=\"mui-content-padded\">其他应用</h5>\r\n                <ul class=\"mui-table-view mui-list ellipsis2\">\r\n                    <i class=\" mui-pull-left iconfont icon-plane\"></i>\r\n                    <li class=\"mui-table-view-cell mui-media\">\r\n                        <a class=\"mui-navigate-right\" href=\"http://m.ctrip.com/html5/flight/#&do_not_show_add_to_home_tip=1\">\r\n                            <div class=\"mui-media-body\">\r\n                                机票预订\r\n                                <p class=\"mui-ellipsis\">\r\n                                    全国特价机票预订\r\n                                </p>\r\n                            </div>\r\n                        </a>\r\n                    </li>\r\n                    <i class=\" mui-pull-left iconfont icon-train\"></i>\r\n                    <li class=\"mui-table-view-cell mui-media\">\r\n                        <a class=\"mui-navigate-right\" href=\"http://m.ctrip.com/webapp/train/\">\r\n                            <div class=\"mui-media-body\">\r\n                                火车票代购\r\n                                <p class=\"mui-ellipsis\">\r\n                                    车票快递，自由选座\r\n                                </p>\r\n                            </div>\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n    <c-nav view=\"service\"></c-nav>\r\n</div>",
   ready: function () {
      mui(".page-service .mui-scroll-wrapper").scroll();
   }
});

});
