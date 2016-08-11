define('components/page/list/list', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");

var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div class=\"mui-content\">\n    <div class=\"mui-content-padded\">\n        订单列表\n    </div>\n    <ul class=\"mui-table-view\">\n        <li class=\"mui-table-view-cell mui-media \">\n            <a class=\"mui-navigate-right\">\n                <div class=\"mui-media-body\">\n                    2016-04-01 下午\n                    <p class='mui-ellipsis'>8号桌(包厢) 10人</p>\n                </div>\n            </a>\n        </li>\n    </ul>\n</div>\n\n<c-nav view=\"list\"></c-nav>",
    data: function () {
      return {
      }
    }
});

});
