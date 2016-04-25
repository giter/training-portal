define('components/page/list/list', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div class=\"navbar\">\n    <div class=\"bd\" style=\"height: 100%;\">\n        <div class=\"weui_tab\">\n            <div class=\"weui_navbar\">\n                <div :class=\"{weui_bar_item_on:view=='food'}\" @click=\"onChangeView('food')\" class=\"weui_navbar_item \">\n                    我的订餐\n                </div>\n                <div :class=\"{weui_bar_item_on:view=='goods'}\" @click=\"onChangeView('goods')\"  class=\"weui_navbar_item\">\n                    我的订货\n                </div>\n            </div>\n            <div class=\"weui_tab_bd\">\n\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"mui-content\" v-if=\"view=='food'\" >\n\n    <ul class=\"mui-table-view\" style=\"margin-bottom: 50px\">\n        <li style=\"text-align: center\" v-show=\"count ==0\">\n            暂无订单\n        </li>\n        <li class=\"mui-table-view-cell mui-media\" v-for=\"l in list.orders\" v-if=\"l.state>0\">\n            <a class=\"mui-navigate-right\" @click=\"goTo(l)\">\n                <div class=\"mui-media-body\">\n                    {{l.mdate}} {{l.mtime==\"lunch\"?\"午餐\":\"晚餐\"}}\n                    <p class='mui-ellipsis'>{{l.table.no}}号桌({{l.table.type==0?\"大厅\":\"包厢\"}})  {{l.number}}人</p>\n                </div>\n                <span class=\"mui-badge mui-badge-primary\" v-if=\"l.menu.length>0&&!checkExpire(l)\">已点餐</span>\n                <span class=\"mui-badge \" v-if=\"checkExpire(l)\">已过期</span>\n            </a>\n        </li>\n    </ul>\n</div>\n\n<div class=\"mui-content\"  v-if=\"view=='goods'\" >\n\n    <ul class=\"mui-table-view\" style=\"margin-bottom: 50px\">\n        <li style=\"text-align: center\" v-show=\"count ==0\">\n            暂无订单\n        </li>\n        <li class=\"mui-table-view-cell mui-media\" v-for=\"l in list.goods\" v-if=\"l.state>0\">\n            <a class=\"mui-navigate-right\" v-link=\"{path:'/order/goods/detail/'+l._id}\">\n                <div class=\"mui-media-body\">\n                    {{l.mdate}}\n                    <p class='mui-ellipsis'></p>\n                </div>\n                <span class=\"mui-badge mui-badge-primary\" >已订货</span>\n            </a>\n        </li>\n    </ul>\n</div>\n\n<c-nav view=\"list\"></c-nav>",
    data: function () {
      return {
          list:store.state,
          goods:store.goods,
          view:"food"
      }
    },
    methods:{
        goTo: function (l) {
            if(this.checkExpire(l)){
                this.$router.go("list/food/"+ l._id);
            }else{
                layer.open({type:2});
                this.$router.go("food/"+ l._id);
            }
        },
        onChangeView: function (v) {
            this.view = v;
        },
        checkExpire: function (d) {
            if(d.mdate ==  (new Date()).Format("yyyy-MM-dd")){
                var mt = d.mtime;
                var config = this.$root.config;
                var t  = config[mt];
                var now = (new Date()).Format("hh:mm"),last = t.unSub;
                return parseInt((now.split(":")[0]*60+now.split(":")[1]*1)) > parseInt( (last.split(":")[0]*60+ last.split(":")[1]*1))
            }else{
                return false;
            }
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
