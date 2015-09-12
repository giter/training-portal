define('components/page/seat/seat', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");


module.exports = Vue.extend({
   inherit:true,
   template:"<div >\r\n    <div class=\"panel admin-panel\">\r\n        <div class=\"panel-head\">\r\n            <strong>\r\n                车位管理\r\n            </strong>\r\n        </div>\r\n        <div class=\"padding border-bottom\">\r\n            <button class=\"button win-back icon-arrow-left\" style=\"float: right\" onclick=\"javascript:window.history.go(-1)\"> 后退</button>\r\n            <input type=\"button\" class=\"button button-small checkall\" name=\"checkall\" checkfor=\"id\" value=\"全选\" />\r\n            <input type=\"button\" class=\"button button-small border-yellow\" value=\"批量删除\" />\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n\r\n"
});

});
