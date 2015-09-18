define('components/page/history/history', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");


module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-history\">\r\n    <div class=\"panel admin-panel\">\r\n        <div class=\"panel-head\">\r\n            <strong>\r\n                登陆日志\r\n            </strong>\r\n        </div>\r\n\r\n        <table class=\"table table-hover\">\r\n            <tr><th width=\"200\">用户名</th><th width=\"*\">操作</th><th width=\"200\">时间</th></tr>\r\n            <tr>\r\n                <td>github@sina.com</td>\r\n                <td>登陆</td>\r\n                <td>2015-09-12 11:12</td>\r\n            </tr>\r\n        </table>\r\n\r\n        <div class=\"panel-foot text-center\">\r\n            <ul class=\"pagination\"><li><a href=\"javascript:;\" >上一页</a></li></ul>\r\n            <ul class=\"pagination pagination-group\">\r\n                <li   v-class=\"active\"><a href=\"javascript:;\">1</a></li>\r\n            </ul>\r\n            <ul class=\"pagination\"><li><a href=\"javascript:;\" >下一页</a></li></ul>\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>"
});

});
