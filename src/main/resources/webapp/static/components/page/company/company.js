define('components/page/company/company', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");

module.exports = Vue.extend({
    template:"<div class=\"page-company\">\r\n    <div class=\"mui-control-content mui-active\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                承包商订位\r\n            </h5>\r\n            <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" href=\"#service\"></a>\r\n        </header>\r\n        <div class=\"mui-content\">\r\n            <ul class=\"mui-table-view mui-grid-view mui-grid-9\">\r\n                <li class=\"mui-table-view-cell mui-media mui-col-xs-4\">\r\n                    <a href=\"#\">\r\n                        <span class=\"mui-icon mui-icon mui-icon-compose\"></span>\r\n                        <div class=\"mui-media-body\">团队订位</div>\r\n                    </a>\r\n                </li>\r\n                <li class=\"mui-table-view-cell mui-media mui-col-xs-4\">\r\n                    <a href=\"#\">\r\n                        <span class=\"mui-icon mui-icon-search\"></span>\r\n                        <div class=\"mui-media-body\">订位查询</div>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n\r\n        </div>\r\n    </div>\r\n\r\n</div>",
    data:function(){
      return {
      }
    }

});

});
