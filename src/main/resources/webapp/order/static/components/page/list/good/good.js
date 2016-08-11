define('components/page/list/good/good', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div class=\"mui-content\">\n    <div class=\"weui_cells_title\"> {{order.mdate}} {{getName(order.mtime) }}</div>\n    <ul class=\"mui-table-view\">\n        <li class=\"mui-table-view-cell mui-media\" v-for=\"m in order.items\">\n            <img  v-if=\"m.picture.length>0\" style=\"min-width: 42px;\"  class=\"mui-media-object mui-pull-left\" :src=\"'/data/image/'+m.picture[0]+'/60/60.json'\" alt=\"\">\n            <div class=\"mui-media-body\">\n                    {{m.name}}\n                <p class=\"mui-ellipsis\">\n                    {{m.number}}/{{m.unit}}\n                </p>\n            </div>\n        </li>\n        <li class=\"mui-table-view\" style=\"text-align: center\" v-show=\"order.items.length==0\">\n            您没有订货\n        </li>\n    </ul>\n</div>",
    data: function () {
        return {
            oid:"",
            order:{
                mdate:"",
                items:[],
                mtime:"",
                number:"",
                state:""
            }
        }
    },
    methods:{
        render: function () {
            
        },
        renderOrder: function () {
            var self = this;
            Service.getGOrder(this.oid, function (rep) {
                $.extend(self.order,rep);
            });
        },
        getName: function (v) {
            switch (v){
                case "morning":{
                    return "上午";
                }break;
                case "noon":{
                    return "中午";
                }break;
                case "afternoon":{
                    return "下午";
                }break;
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
    watch:{
        oid: function () {
            this.renderOrder();
        }
    },
    route:{
        data: function (next) {
            this.oid = this.$route.params.id;
        }
    },
    ready: function () {

    }
});

});
