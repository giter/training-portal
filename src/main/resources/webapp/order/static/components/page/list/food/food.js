define('components/page/list/food/food', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div class=\"mui-content\">\n    <div class=\"weui_cells_title\"> {{order.mdate}} {{order.mtime=='dinner'?\"晚餐\":\"午餐\"}} {{order.table.no}}号座</div>\n    <ul class=\"mui-table-view\">\n        <li class=\"mui-table-view-cell mui-media\" v-for=\"m in order.menu\">\n            <img  v-if=\"m.picture.length>0\" style=\"min-width: 42px;\"  class=\"mui-media-object mui-pull-left\" :src=\"'/data/image/'+m.picture[0]+'/60/60.json'\" alt=\"\">\n\n            <!--<img  v-if=\"m.picture.length==0\" class=\"mui-media-object mui-pull-left\" src=\"/static/images/60x60.gif\" alt=\"\">-->\n\n            <div class=\"mui-media-body\">\n                    {{m.name}}\n\n                <a href=\"javascript:;\" v-if=\"m.visible!=-1\" class=\"mui-btn-link mui-pull-right\" @click=\"onDz(m)\">点赞</a>\n                <p class=\"mui-ellipsis\">\n                    {{m.number}}/{{m.unit}}\n                </p>\n            </div>\n        </li>\n        <li class=\"mui-table-view\" style=\"text-align: center\" v-show=\"order.menu.length==0\">\n            您没有点菜\n        </li>\n    </ul>\n</div>",
    data: function () {
        return {
            oid:"",
            order:{
                mdate:"",
                menu:[],
                mtime:"",
                number:"",
                state:"",
                table:{}
            }
        }
    },
    methods:{
        render: function () {
            
        },
        renderOrder: function () {
            var self = this;
            Service.getOrder(this.oid, function (rep) {
                $.extend(self.order,rep);
            });
        },
        onDz: function (m) {
            m.star++;
            m.visible = -1;
            Service.dishPlus(this.oid, m._id, function (rep) {
                layer.open({
                    content: m.name+ '(点赞+1)',
                    style: 'background-color:#3cc51f; color:#fff; border:none;',
                    time: 1
                });
            });
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
