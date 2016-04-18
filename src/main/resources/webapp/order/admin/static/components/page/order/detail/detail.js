define('components/page/order/detail/detail', function(require, exports, module) {

/**
 * Created by jack on 16/4/4.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

require("form/form.js");



module.exports = Vue.extend({
    template:"<div class=\"page-menu\">\n    <div class=\"panel panel-default  content\">\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" class=\"active\"><a href=\"#\">\n                    菜单详情</a></li>\n            </ul>\n            <a v-link=\"{path:'/order'}\" class=\"btn pull-right\">\n                <span class=\"glyphicon glyphicon-backward\"></span>\n                返回\n            </a>\n            <a href=\"javascript:;\" class=\"btn pull-right\" @click=\"onPrint\">\n                <span class=\"glyphicon glyphicon-print\"></span>\n                打印\n            </a>\n        </div>\n        <div class=\"panel-body\" id=\"order-detail\">\n            <h3 class=\"text-center\">\n               {{order.mdate}} {{order.mtime==\"dinner\"?\"晚餐\":\"中餐\"}} {{order.table.no}}号桌({{order.number}}人) {{order.user.name}}预定\n            </h3>\n            <table class=\"table table-bordered table-hover\">\n                <tbody>\n                <tr>\n                    <th>\n                        #\n                    </th>\n                    <th>\n                        菜品名称\n                    </th>\n                    <th>\n                        数量\n                    </th>\n                    <th>\n                        单位\n                    </th>\n                    <th>\n                        单价(元)\n                    </th>\n                    <th>\n                        总价(元)\n                    </th>\n                </tr>\n                <tr v-for=\"m in order.menu\">\n                    <td>{{$index+1}}</td>\n                    <td>{{m.name}}</td>\n                    <td>{{m.number}}</td>\n                    <td>{{m.unit}}</td>\n                    <td>¥{{m.price}}</td>\n                    <td>¥{{m.price * m.number}}</td>\n                </tr>\n                <tr>\n                    <td>合计</td>\n                    <td></td>\n                    <td></td>\n                    <td></td>\n                    <td></td>\n                    <td>¥{{total}}</td>\n                </tr>\n                </tbody></table>\n\n        </div>\n    </div>\n\n\n\n\n</div>\n",
    data: function () {
        return {
            order:{
                table:{},
                user:{}
            },
            oid:""
        }
    },
    methods:{
        render: function () {
        },
        renderOrder: function (id) {
            var self = this;
            layer.load();
            Service.getOrder(id,function (rep) {
                self.order = rep;
                layer.closeAll();
            })
        },
        onPrint: function () {
            $("#order-detail").jqprint();
        }

    },
    route:{
        data: function (r) {
            this.renderOrder(r.to.params.oid);
        }
    },
    computed:{
        total: function () {
            var total = 0;
            if(this.order.menu){
                this.order.menu.forEach(function (m) {
                    total +=(m.price* m.number);
                })
            }
            return total;
        }
    },
    ready: function () {
        this.render();
    }
});

});
