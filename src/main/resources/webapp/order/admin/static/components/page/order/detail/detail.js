define('components/page/order/detail/detail', function(require, exports, module) {

/**
 * Created by jack on 16/4/4.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

require("form/form.js");



module.exports = Vue.extend({
    template:"<div class=\"page-detail\">\n\n    <div class=\"panel panel-default content\" >\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" class=\"active\"><a href=\"#\">\n                    菜单详情</a></li>\n            </ul>\n            <a v-link=\"{path:'/order'}\" class=\"btn pull-right\">\n                <span class=\"glyphicon glyphicon-backward\"></span>\n                返回\n            </a>\n            <a href=\"javascript:;\" class=\"btn pull-right\" @click=\"onPrint\">\n                <span class=\"glyphicon glyphicon-print\"></span>\n                打印\n            </a>\n            <a href=\"javascript:;\" :disabled=\"mode=='edit'\"  class=\"btn pull-right\" @click=\"onEdit\">\n                <span class=\"glyphicon glyphicon-edit\"></span>\n                编辑(开发中)</a>\n\n        </div>\n        <div class=\"panel-body\" id=\"order-detail\" >\n            <h3 class=\"text-center\">\n               {{order.mdate}} {{order.mtime==\"dinner\"?\"晚餐\":\"中餐\"}} {{order.table.no}}号桌({{order.number}}人) {{order.user.name}}预定\n            </h3>\n            <table class=\"table table-bordered table-hover\">\n                <tbody>\n                <tr>\n                    <th>\n                        #\n                    </th>\n                    <th>\n                        菜品名称\n                    </th>\n                    <th>\n                        数量\n                    </th>\n                    <th>\n                        单位\n                    </th>\n                    <th>\n                        单价(元)\n                    </th>\n                    <th>\n                        总价(元)\n                    </th>\n                    <th v-if=\"mode=='edit'\">\n                        编辑\n                    </th>\n                </tr>\n                <tr v-for=\"m in order.menu\">\n                    <td>{{$index+1}}</td>\n                    <td>\n                        <span v-if=\"mode=='detail'\">{{m.name}}</span>\n                        <span class=\"like-input\" v-show=\"mode=='edit'\"  @click=\"onSelectMenu(m)\">{{m.name}}</span>\n                    </td>\n                    <td>\n                        <span v-if=\"mode=='detail'\">{{m.number}}</span>\n                        <input type=\"number\" v-if=\"mode=='edit'\" v-model=\"m.number\" number>\n                    </td>\n                    <td>{{m.unit}}</td>\n                    <td>¥{{m.price}}</td>\n                    <td>¥{{m.price * m.number}}</td>\n                    <td v-if=\"mode=='edit'\">\n                        <a href=\"javascript:;\">删除</a>\n                    </td>\n                </tr>\n                <tr>\n                    <td>合计</td>\n                    <td></td>\n                    <td></td>\n                    <td></td>\n                    <td></td>\n                    <td>¥{{total}}</td>\n                    <td v-if=\"mode=='edit'\">\n                        <button class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n                    </td>\n                </tr>\n                </tbody></table>\n\n        </div>\n\n        <div class=\"panel-footer text-right\" v-if=\"mode=='edit'\">\n            <button class=\"btn btn-primary\">提交</button>\n            <button CLASS=\"btn btn-default\" @click=\"onCancel\">取消</button>\n        </div>\n    </div>\n\n    <div class=\"modal fade\" id=\"menuModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n        <div class=\"modal-dialog  modal-lg\" role=\"document\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                    <h4 class=\"modal-title\" id=\"myModalLabel\">请选择菜品</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <ul class=\"nav nav-tabs\">\n                        <li role=\"presentation\" v-for=\"t in types\" :class=\"{active:selectType==t.key}\"><a href=\"javascript:;\" @click=\"onChangeType(t.key)\">{{t.value}}</a></li>\n                    </ul>\n\n                    <div class=\"container-fluid\" >\n                        <div class=\"row\">\n                            <div class=\"col-md-2 menu-item\" v-for=\"m in menus\" v-if=\"m.type == selectType\">\n                                <div class=\"thumbnail\">\n                                    <img v-for=\"p in m.picture\" v-if=\"m.picture.length>0&&$index==0\" :src=\"'/data/image/'+p+'/100/100.json'\" >\n                                    <div class=\"caption\">\n                                        <h5>{{m.name}}</h5>\n                                        <p>{{m.cates.join(\",\")}}</p>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>\n                    <button type=\"button\" class=\"btn btn-primary\">确定</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n",
    data: function () {
        return {
            order:{
                table:{},
                user:{}
            },
            types:[],
            selectType:"",
            menus:[],
            oid:"",
            mode:"detail"
        }
    },
    methods:{
        render: function () {
            this.renderTypes();
            this.renderMenu();
        },
        renderOrder: function (id) {
            var self = this;
            layer.load();
            Service.getOrder(id,function (rep) {
                self.order = rep;
                layer.closeAll();
            })
        },
        renderTypes: function () {
            var self = this;
            Service.getCtx("dc_type", function (rep) {
                self.types = rep.types.types||[];
                if(self.types.length>0){
                    self.selectType = self.types[0].key;
                }
            });
        },
        renderMenu: function () {
            layer.load();
            var self = this;
            Service.getMenus({},function (rep) {
                self.menus = rep.lists;
                layer.closeAll();
            })
        },
        onPrint: function () {
            $("#order-detail").jqprint();
        },
        onEdit: function () {
            this.mode = "edit";
        },
        onSelectMenu: function () {
            $("#menuModal").modal("show");
        },
        onCancel: function () {
            this.mode = "detail";
            $(this.$el).removeClass("menus-show");
        },
        onChangeType: function (t) {
            this.selectType = t;
        }

    },
    route:{
        data: function (r) {
            this.renderOrder(r.to.params.oid);
            this.mode ="detail";
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
