define('components/page/config/config', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");

var nav = require("nav/nav.js");
var Service =require("main/service.js");

module.exports = Vue.extend({
    template:"<div class=\"mui-content p-config\">\n    <header>\n\n\n        <img :src=\"user.headImgUrl\" alt=\"\" class=\"img-circle\">\n        <h5>{{user.nickname}}</h5>\n\n    </header>\n\n    <ul class=\"mui-table-view\">\n        <li class=\"mui-table-view-cell\">\n            <a href=\"\" class=\"mui-navigate-right\">\n                历史订单\n                <span class=\"mui-badge\">开发中</span>\n            </a>\n        </li>\n        <li class=\"mui-table-view-cell\">\n            <a href=\"\" class=\"mui-navigate-right\">\n                帮助文档\n                <span class=\"mui-badge\">制作中</span>\n            </a>\n        </li>\n    </ul>\n    <!--<div class=\"mui-content-padded\">-->\n        <!--<a href=\"\" class=\"mui-btn mui-btn-block mui-btn-warning\">-->\n            <!--<span class=\"mui-icon mui-icon-close\"></span>-->\n            <!--解除绑定-->\n        <!--</a>-->\n    <!--</div>-->\n\n</div>\n<c-nav view=\"config\"></c-nav>",
    data: function () {
        return {
            user:{}
        }
    },
    methods:{
        render: function () {
            this.getInfo();
        },
        getInfo: function () {
            var self = this;
            Service.getUserInfo(function (rep) {
                self.user = rep;
            });
        }
    },
    ready: function () {
        this.render();
    }
});


});
