define('components/page/list/list', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<header class=\"mui-bar-nav mui-bar\">\n    <h5 class=\"mui-title\">订单列表</h5>\n</header>\n<div class=\"mui-content\">\n\n    <ul class=\"mui-table-view\">\n        <li style=\"text-align: center\" v-show=\"count ==0\">\n            暂无订单\n        </li>\n        <li class=\"mui-table-view-cell mui-media\" v-for=\"l in list.orders\" v-if=\"l.state>0\">\n            <a class=\"mui-navigate-right\" @click=\"goTo(l)\">\n                <div class=\"mui-media-body\">\n                    {{l.mdate}} {{l.mtime==\"lunch\"?\"午餐\":\"晚餐\"}}\n                    <p class='mui-ellipsis'>{{l.table.no}}号桌({{l.table.type==0?\"大厅\":\"包厢\"}})  {{l.number}}人</p>\n                </div>\n                <span class=\"mui-badge mui-badge-primary\" v-if=\"l.menu.length>0\">已点餐</span>\n            </a>\n        </li>\n    </ul>\n</div>\n\n<c-nav view=\"list\"></c-nav>",
    data: function () {
      return {
          list:store.state
      }
    },
    methods:{
        goTo: function (l) {
            layer.open({type:2});
            this.$router.go("food/"+ l._id);
        }
    },
    computed:{
        count: function () {
            var c = 0;
            this.list.orders.forEach(function (l) {
                if(l.state > 0){
                    c++;
                }
            });
            return c;
        }
    },
    ready: function () {

    }
});

});
