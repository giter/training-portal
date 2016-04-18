define('components/page/menu/menu', function(require, exports, module) {

/**
 * Created by jack on 16/4/4.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

require("form/form.js");

var model = {
    _id:"",
    type:0,
    unit:"",
    name:"",
    price:0,
    star:0,
    cates:[],
    picture:[],
    visible:1
};

module.exports = Vue.extend({
    template:"<div class=\"page-menu\">\n    <div class=\"panel panel-default  content\">\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" :class=\"{active:view=='list'}\" @click=\"changeView('list')\"><a href=\"javascript:;\">\n                    菜品</a></li>\n                <li role=\"presentation\" :class=\"{active:view=='type'}\" @click=\"changeView('type')\"><a href=\"javascript:;\">\n                    分类</a></li>\n            </ul>\n            <a v-show=\"view=='list'\" href=\"javascript:;\" class=\"btn pull-right\" @click=\"onAdd\">\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                新增菜品\n            </a>\n            <a v-show=\"view=='type'\" href=\"javascript:;\" class=\"btn pull-right\" @click=\"onAddType\">\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                新增类型\n            </a>\n        </div>\n        <div v-show=\"view=='list'\" class=\"panel-body\">\n            <table class=\"table table-bordered table-hover\">\n                <tbody>\n                <tr>\n                    <th>\n                        #\n                    </th>\n                    <th>图片\n                    </th>\n                    <th>\n                        名称\n                    </th>\n                    <th>\n                        分类\n                    </th>\n                    <th>\n                        标签\n                    </th>\n                    <th>\n                        价格\n                    </th>\n                    <th>\n                        状态\n                    </th>\n                    <th>\n                        操作\n                    </th>\n                </tr>\n                <tr v-for=\"m in menu\" track-by=\"_id\">\n                    <td>\n                        {{$index+1}}\n                    </td>\n                    <td>\n                        <img v-for=\"p in m.picture\" v-if=\"m.picture.length>0\" :src=\"'/data/image/'+p+'/100/100.json'\" class=\"img-rounded\" style=\"width: 80px;height: 80px;\">\n                        <a href=\"javascript:;\" class=\"btn btn-default btn-sm upfile\">\n                            <span class=\"glyphicon glyphicon-plus\"></span>\n                            <input type=\"file\" value=\"浏览\" @change=\"onAddPic(m,$event)\" />\n                        </a>\n                    </td>\n                    <td>\n                        {{m.name}}\n                    </td>\n                    <td>\n                        <span v-for=\"t in types.types\" v-if=\"t.key==m.type\">{{t.value}}</span>\n                    </td>\n                    <td>\n                        <span class=\"label label-primary\" v-for=\"c in m.cates\">\n                            {{c}}\n                        </span>\n                    </td>\n                    <td>\n                        ¥{{m.price}}\n                    </td>\n                    <td>\n                        {{m.visible == 0?\"禁用\":\"启用\"}}\n                    </td>\n                    <td>\n                        <a href=\"javascript:;\" @click=\"onEditMenu(m)\">编辑</a>\n                        <a href=\"javascript:;\" @click=\"onDelMenu(m)\">删除</a>\n                    </td>\n                </tr>\n                </tbody></table>\n            <div class=\"c-pager\">\n                <p class=\"pull-left\">共 {{count}} 条记录，{{query.page+1}}/{{Math.ceil(count/10)}}</p>\n\n                <ul  class=\"pagination pagination-sm\">\n                    <li>\n                    </li>\n                    <!--<li>-->\n                        <!--<a href=\"#\" aria-label=\"Previous\">-->\n                            <!--<span class=\"glyphicon glyphicon-step-backward\"></span>-->\n                        <!--</a>-->\n                    <!--</li>-->\n                    <li><a href=\"javascript:;\" :disabled=\"query.page==0\" @click=\"toPre\"><span class=\"glyphicon glyphicon-triangle-left\"></span></a></li>\n                    <li><a href=\"javascript:;\" @click=\"toNext\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a></li>\n\n                    <!--<li>-->\n                        <!--<a href=\"#\" aria-label=\"Next\">-->\n                            <!--<span class=\"glyphicon glyphicon-step-forward\"></span>-->\n                        <!--</a>-->\n                    <!--</li>-->\n                </ul>\n            </div>\n        </div>\n        <div v-show=\"view=='type'\" class=\"panel-body\">\n            <table class=\"table table-bordered table-hover\">\n                <thead>\n                <tr>\n                    <th>#</th>\n                    <th>名称</th>\n                    <th>操作</th>\n                </tr>\n                </thead>\n                <tbody>\n                    <tr v-for=\"t in types.types\">\n                        <td>{{t.key}}</td>\n                        <td>{{t.value}}</td>\n                        <td><a href=\"\">编辑</a>\n                      <a href=\"javascript:;\" @click=\"onDelType(t)\">删除</a></td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n\n    <c-form :config=\"modal\" @submit=\"onSubmit\">\n        <validator name=\"valid\">\n            <form class=\"form-horizontal\" novalidate >\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\" :class=\"{'has-warning':$valid.name.invalid&&$valid.name.touched}\">名称</label>\n                    <div class=\"col-sm-10\" :class=\"{'has-warning':$valid.name.invalid&&$valid.name.touched}\">\n                        <input type=\"text\"  class=\"form-control\" placeholder=\"必填\" v-validate:name=\"['required']\" v-model=\"model.name\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\">分类</label>\n                    <div class=\"col-sm-10\">\n                        <select class=\"form-control\" v-model=\"model.type\" number>\n                            <option value=\"{{t.key}}\" v-for=\"t in types.types\">{{t.value}}</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"form-group\" >\n                    <label class=\"col-sm-2 control-label\" :class=\"{'has-warning':$valid.price.invalid&&$valid.price.touched}\" >价格(元)</label>\n                    <div class=\"col-sm-10\" :class=\"{'has-warning':$valid.price.invalid&&$valid.price.touched}\">\n                        <input type=\"number\" class=\"form-control\"  v-validate:price=\"['required']\"  v-model=\"model.price\" placeholder=\"必填\" number>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\" :class=\"{'has-warning':$valid.unit.invalid&&$valid.unit.touched}\" >单位</label>\n                    <div class=\"col-sm-10\" :class=\"{'has-warning':$valid.unit.invalid&&$valid.unit.touched}\">\n                        <input type=\"text\" class=\"form-control\" v-model=\"model.unit\" v-validate:unit=\"['required']\" placeholder=\"必填(份/个/等等)\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\" >标签</label>\n                    <div class=\"col-sm-10\">\n                        <span class=\"label label-primary\" style=\"margin-right: 10px;\" v-for=\"c in model.cates\">\n                            {{c}}\n                          <span class=\"glyphicon glyphicon-remove\" @click=\"onRemoveCate(c)\"></span>\n                        </span>\n                        <a href=\"javascript:;\" class=\"btn btn-default\" @click=\"onAddCate\">\n                            <span class=\"glyphicon glyphicon-plus\"></span>\n                        </a>\n                    </div>\n                </div>\n                <div class=\"form-group\" >\n                    <label class=\"col-sm-2 control-label\">状态</label>\n                    <div class=\"col-sm-10\">\n                        <select class=\"form-control\" v-model=\"model.visible\" number>\n                            <option value=\"1\">启用</option>\n                            <option value=\"0\">禁用</option>\n                        </select>\n                    </div>\n                </div>\n            </form>\n        </validator>\n    </c-form>\n\n    <c-form :config=\"typeModal\" @submit=\"onSubmitType\" >\n        <form class=\"form-horizontal\">\n            <div class=\"form-group\">\n                <label class=\"col-sm-2 control-label\">值</label>\n                <div class=\"col-sm-10\" >\n                    <input type=\"number\"  class=\"form-control\" v-model=\"type.key\" placeholder=\"必填,请勿重复\"  number>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"col-sm-2 control-label\">名称</label>\n                <div class=\"col-sm-10\" >\n                    <input type=\"text\"  class=\"form-control\" v-model=\"type.value\" placeholder=\"必填\" >\n                </div>\n            </div>\n        </form>\n    </c-form>\n</div>\n",
    data: function () {
        return {
            view:"list",
            count:0,
            menu:[],
            model:Object.assign({},model),
            modal:{
                show:false,
                title:"新增菜单"
            },
            typeModal:{
                show:false,
                title:"新增类型"
            },
            types:{types:[]},
            type:{
                key:null,
                value:null
            },
            query:{
                limit:10,
                page:0
            }
        }
    },
    methods: {
        render:function (){
            this.renderMenu();
            this.renderTypes();
        },
        renderMenu: function () {
            layer.load();
            var self = this;
            Service.getMenus(this.query,function (rep) {
                self.menu = rep.lists;
                self.count = rep.count;
                layer.closeAll();
            })
        },
        renderTypes: function () {
            var self = this;
          Service.getCtx("dc_type", function (rep) {
              self.types.types = rep.types.types||[];
          });
        },
        onAdd: function () {
            this.model = Object.assign(this.model,model);
            this.modal.show = true;
            this.modal.title = "新增菜品";
        },
        onEditMenu: function (m) {
            this.model = Object.assign(this.model,m);
            this.modal.show = true;
            this.modal.title = "编辑菜品";
        },
        onDelMenu: function (m) {
            var self = this;
            layer.confirm("是否删除该菜品?",{btn:["确定","取消"]}, function () {
                Service.delMenu(m._id, function (rep) {
                    layer.closeAll();
                    self.menu.$remove(m);
                })
            });
        },
        onAddCate: function () {
            var self = this;
            var index = layer.prompt({title:"添加标签"}, function (r) {
                if(r){
                    self.model.cates.push(r);
                    layer.close(index);
                }
            });
        },
        onAddPic: function (m,e) {
            layer.load(1);
            var self = this;
            this.readFile(e, function (base,name) {
                if(base){
                    Service.upPicture(JSON.stringify({name: name,data:base}), function (rep) {
                        m.picture.push(rep);
                        Service.updateMenu(m._id,JSON.stringify(m), function (rep) {
                            layer.msg("添加图片成功!");
                        });
                        layer.closeAll();
                    });
                }else{
                    layer.closeAll();
                }
            })
        },
        onRemoveCate: function (c) {
            this.model.cates.$remove(c);
        },
        readFile: function (obj,callback) {
            var file = obj.target.files[0];
            //判断类型是不是图片
            if(!/image\/\w+/.test(file.type)){
                alert("请确保文件为图像类型");
                callback(false);
                return false;
            };
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
               callback(this.result,file.name);
            }
        },
        onSubmit: function () {
            if(this.$valid.valid){
                layer.load(1);
                this.submit();
            }else{
                this.$validate(true);
            }
        },
        submit: function () {
            var self = this;
            if(this.model._id){
                Service.updateMenu(this.model._id,JSON.stringify(this.model), function (rep) {
                    self.modal.show = false;
                    self.renderMenu();
                });
            }else{
                Service.addMenu(JSON.stringify(this.model), function (rep) {
                    self.modal.show = false;
                    self.renderMenu();
                })
            }
        },
        changeView: function (v) {
            this.view = v;
        },
        onAddType: function () {
            this.typeModal.show = true;
        },
        updateType: function () {
            Service.putCtx("dc_type",JSON.stringify({types:this.types}), function (rep) {
            });
        },
        onSubmitType: function () {
            if(typeof this.type.key =="number"&&this.type.value){
                this.types.types.push(JSON.parse(JSON.stringify(this.type)));
                this.updateType();
                this.typeModal.show = false;
                this.type.key = null;
                this.type.value = null;
            }else{
                alert("请填写完整!");
            }
        },
        onDelType: function (type) {
            var self = this;
            layer.confirm("是否删除该类型?",{btn:["确定","取消"]}, function () {
                self.types.types.$remove(type);
                self.updateType();
                layer.closeAll();
            });
        },
        toPre: function () {
            if(this.query.page>0){
                this.query.page--;
                this.renderMenu();
            }
        },
        toNext: function () {
            if(this.query.page < Math.ceil(this.count/10)-1){
                this.query.page++;
                this.renderMenu();
            }
        }
    },
    ready: function () {
        this.render();
    },
    route:{
        activate: function (transition) {
            store.view = "menu";
            transition.next();
        }
    },
});

});
