define('components/page/notice/notice', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<header class=\"mui-bar-nav mui-bar\">\n    <h5 class=\"mui-title\">\n        公告列表\n    </h5>\n</header>\n<div class=\"mui-content\">\n    <ul class=\"mui-table-view\">\n        <li v-for=\"n in notices\" class=\"mui-table-view-cell mui-media\">\n            <a href=\"javascript:;\" @click=\"onShowContent(n)\" class=\"mui-navigate-right\">\n                <div class=\"mui-media-body\">\n                    {{n.title}}\n                    <p class=\"mui-ellipsis\">\n                        {{(new Date(n.created)).Format('yyyy-MM hh:dd')}}\n                    </p>\n                </div>\n            </a>\n        </li>\n    </ul>\n</div>\n\n<c-nav view=\"notice\"></c-nav>",
    data: function () {
        return {
            notices:[],
            count:0
        }
    },
    methods:{
        render: function () {
            this.renderList();
        },
        renderList: function () {
            var self = this;
            Service.getNotices(function (rep) {
                self.notices = rep;
            });
        },
        onShowContent: function (n) {
            store.state.notice = n;
            router.go({name:"detail",params:{id: n._id}});
        }
    },
    ready: function () {
        this.render();
    },
    route:{
        activate: function (transition) {
            transition.next();
        }
    }
});

});
