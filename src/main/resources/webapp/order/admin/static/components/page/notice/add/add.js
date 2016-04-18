define('components/page/notice/add/add', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");
var nav = require("nav/nav.js");

require("form/form.js");

module.exports = Vue.extend({
    template:"<div class=\"page-notice-add\">\n    <div class=\"panel panel-default  content\">\n        <div class=\"panel-heading\">\n            新增公告\n            <a href=\"javascript:history.back()\" class=\"btn pull-right\">\n                <span class=\"glyphicon glyphicon-backward\"></span>\n                返回\n            </a>\n        </div>\n        <div class=\"panel-body\">\n            <iframe src=\"/static/wx/index.html\"  frameborder=\"0\"></iframe>\n        </div>\n    </div>\n</div>\n",
    data: function () {
        return {

        }
    }
});

});
