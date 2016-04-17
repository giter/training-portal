define('components/page/food/food', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
require("component_modules/mui.js");
require("component_modules/mui.zoom.js");
require("component_modules/mui.previewimage.js");

var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div class=\"page-food\">\n    <span class=\"mui-badge mui-badge-red\"  id=\"badge\" style=\"display: none;position: absolute;z-index: 1000\">1</span>\n\n    <header class=\"mui-bar mui-bar-nav\" v-if=\"view=='menu'\">\n        <h5 class=\"mui-title \">\n            结算:¥{{total}}\n        </h5>\n        <a class=\"mui-btn-link mui-pull-right\" v-show=\"!expire\"  @click=\"onRemoveAll\">\n            清空\n        </a>\n        <a class=\"mui-btn-link mui-pull-right\" v-show=\"expire\" >\n            已过期\n        </a>\n        <a class=\"mui-icon mui-icon-back\" v-link=\"{path:'/list'}\" >\n        </a>\n    </header>\n    <header class=\"mui-bar mui-bar-nav\" v-if=\"view=='list'\">\n        <h5 class=\"mui-title \">\n            结算:¥{{total}}\n        </h5>\n        <a class=\"mui-btn-link mui-pull-right\" v-show=\"!expire\"  @click=\"onCancel\">\n            取消订单\n        </a>\n        <a class=\"mui-icon mui-icon-back\" v-link=\"{path:'/list'}\" >\n\n        </a>\n    </header>\n    <div class=\"mui-content\" v-show=\"view=='list'\" >\n\n\n        <div class=\"left-nav\">\n            <ul class=\"mui-table-view\">\n                <li class=\"mui-table-view-cell\" v-for=\"t in types\" :class=\"{'active':selectType==t.key}\"  @click=\"onSelectType(t)\">\n                    {{t.value}}\n                </li>\n            </ul>\n        </div>\n        <div class=\"right-list\">\n            <ul class=\"mui-table-view\">\n                <li class=\"mui-table-view-cell mui-media\" v-for=\"l in list\" v-show=\"l.type == selectType\" >\n                    <a>\n                        <template v-for=\"p in l.picture\" >\n                            <img class=\"mui-media-object mui-pull-left\" :src=\"'/data/image/'+p+'.json'\" data-preview-src=\"\"  data-preview-group=\"{{l._id}}\" v-if=\"$index==0\">\n                            <img class=\"mui-media-object mui-pull-left\" style=\"display: none\" src=\"\" data-preview-src=\"{{'/data/image/'+p+'.json'}}\" data-preview-group=\"{{l._id}}\"    v-if=\"$index>0\">\n                        </template>\n                        <div class=\"mui-media-body\">\n                            {{l.name}} <span class=\"dz\"><img src=\"/order/admin/static/images/dz.png\" alt=\"\">{{l.star}}</span>\n                            <p class='mui-ellipsis'>{{l.cates.join(\",\")}}</p>\n                        </div>\n                        <p class=\"f-info\">\n                            <span class=\"f-price\">¥{{l.price}}</span>/{{l.unit}}\n                    <span class=\"mui-numbox mui-pull-right\">\n                        <button class=\"mui-btn mui-numbox-btn-minus\" type=\"button\" :disabled=\"!l.number\" @click=\"onMinusNum(l)\" >-</button>\n                        <input class=\"mui-numbox-input\" type=\"number\" :value=\"l.number\" />\n                        <button class=\"mui-btn mui-numbox-btn-plus\" type=\"button\" @click=\"onPlusNum(l,$event)\">+</button>\n                    </span>\n\n                        </p>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div >\n\n    <div class=\"mui-content l-menu\" v-show=\"view=='menu'\">\n        <ul class=\"mui-table-view\">\n            <li class=\"mui-table-view-cell mui-media\" v-for=\"l in list\" v-show=\"l.number>0\" >\n                <a>\n                    <template v-for=\"p in l.picture\" >\n                        <img class=\"mui-media-object mui-pull-left\" :src=\"'/data/image/'+p+'.json'\" data-preview-src=\"\" data-preview-group=\"{{'o_'+l._id}}\"  v-if=\"$index==0\">\n                        <img class=\"mui-media-object mui-pull-left\" style=\"display: none\" src=\"\" data-preview-src=\"{{'/data/image/'+p+'.json'}}\"  data-preview-group=\"{{'o_'+l._id}}\"    v-if=\"$index>0\">\n                    </template>\n                    <div class=\"mui-media-body\">\n                        {{l.name}} <span class=\"dz\"><img src=\"/order/admin/static/images/dz.png\" alt=\"\">{{l.star}}</span>\n                        <p class='mui-ellipsis'>{{l.cates.join(\",\")}}</p>\n                    </div>\n                    <p class=\"f-info\">\n                        <span class=\"f-price\">¥{{l.price}}</span>/{{l.unit}}\n                    <span class=\"mui-numbox mui-pull-right\" v-show=\"!expire\">\n                        <button class=\"mui-btn mui-numbox-btn-minus\" type=\"button\" :disabled=\"!l.number\" @click=\"onMinusNum(l)\" >-</button>\n                        <input class=\"mui-numbox-input\" type=\"number\" :value=\"l.number\" />\n                        <button class=\"mui-btn mui-numbox-btn-plus\" type=\"button\" @click=\"onPlusNum(l,$event)\">+</button>\n                    </span>\n                        <span v-show=\"expire\" @click=\"onDz(l,$event)\" class=\" mui-pull-right\"><img src=\"/order/admin/static/images/dz.png\" alt=\"\"></span>\n\n                    </p>\n                </a>\n            </li>\n\n            <li class=\"mui-table-view-divider\" v-show=\"count==0\"  @click=\"onChangeView('list')\"  >\n                请先点菜\n            </li>\n        </ul>\n        <div class=\"b-submit\"  v-show=\"count>0\">\n            <button v-show=\"!expire\"  class=\"mui-btn mui-btn-block mui-btn-success\" :disabled=\"disabled\" @click=\"onSubmit\">\n                提交\n            </button>\n        </div>\n    </div>\n    <nav class=\"mui-bar mui-bar-tab\"  v-show=\"!expire\"  >\n        <a class=\"mui-tab-item\"   :class=\"{'mui-active':view=='list'}\"  @click=\"onChangeView('list')\" >\n            <span class=\"mui-icon mui-icon-list\"></span>\n            <span class=\"mui-tab-label\">菜单</span>\n        </a>\n        <a class=\"mui-tab-item\"  :class=\"{'mui-active':view=='menu'}\" @click=\"onChangeView('menu')\" >\n        <span id=\"dest\" class=\"mui-icon mui-icon-compose\">\n            <span  class=\"mui-badge mui-badge-primary\" v-show=\"count>0\">{{count}}</span>\n        </span>\n            <span class=\"mui-tab-label\">已点</span>\n        </a>\n    </nav>\n</div>",
    data: function () {
        return {
            view:"list",
            types:[],
            selectType:"",
            list:[],
            oid:"",
            disabled:true,
            expire:false
        }
    },
    methods:{
        render: function () {
            this.renderList();
        },
        renderList: function () {
            layer.open({type: 2});
            var self = this;

            Service.getCtx("dc_type", function (rep) {
                self.types = rep.types.types;
                self._getMenus();
            });
        },
        renderOrder: function (id) {
            var self = this;
            Service.getOrder(id, function (rep) {
                self.list.forEach(function (l) {
                    l.number = 0;
                });

                for (var i = 0; i < rep.menu.length; i++) {
                    var obj1 = rep.menu[i];
                    for (var j = 0; j < self.list.length; j++) {
                        var obj2 = self.list[j];
                        if(obj1._id == obj2._id){
                            obj2.number = obj1.number;
                        }
                    }
                }

                //是否到期,不能退订修改
                self.expire = self.checkExpire(rep);
                if(self.expire ){
                    self.view = "menu";
                }
            });
        },
        _getMenus: function () {
            var self = this;
            Service.getDishes(function (rep) {
                self.selectType = self.types[0].key;
                for (var i = 0; i < rep.length; i++) {
                    var obj = rep[i];
                    obj.number = 0;
                }
                self.list = rep;
                self.renderOrder(self.$route.params.oid);
                layer.closeAll();

            });
        },
        onSelectType: function (t) {
            this.selectType = t.key;
        },
        onMinusNum: function (l) {
            this.disabled = false;
            l.number -=1;
        },
        onPlusNum: function (l,e) {
            this.doAnimate(e);
            this.disabled = false;
            l.number +=1;
        },
        onChangeView: function (v) {
            this.view = v;
        },
        doAnimate: function (e) {
            this.badge.css({
                "left": e.clientX,
                "top": e.clientY,
                "opacity":1
            }).show();

            this.badge.animate({
                "left":this.dest.left,
                "top":this.dest.top,
                "opacity":0
            })
        },
        onRemoveAll: function () {
            var self = this;
            layer.open({
                content:"确定移除全部已选菜品?",
                btn:["确定","取消"],
                yes: function () {
                    self.clearMenu();
                    layer.closeAll();
                    self.disabled = false;
                }
            });
        },
        onSubmit: function () {
            var self = this;
            layer.open({
                content:"确定提交菜单?",
                btn:["确定","取消"],
                yes: function () {
                    self.submit();
                    layer.closeAll();
                    self.disabled = true;
                }
            });
        },
        clearMenu: function () {
            for (var i = 0; i < this.list.length; i++) {
                var obj = this.list[i];
                obj.number = 0;
            }


            this._putOrder({menu: [],_id:this.oid}, function () {
                layer.open({
                    content:"更新成功!",
                    btn:["确定"],
                    shadeClose:false,
                    yes: function () {
                        layer.closeAll();
                    }
                });
            });
        },
        submit: function () {
            var m = [];
            this.list.forEach(function (obj) {
                if(obj.number>0){
                    m.push({_id:obj._id,number:obj.number});
                }
            });
            this._putOrder({menu: m,_id:this.oid}, function () {
                layer.open({
                    content:"提交成功!",
                    btn:["确定"],
                    shadeClose:false,
                    yes: function () {
                        layer.closeAll();
                        store.getOrders();
                    }
                });
            });
        },
        _putOrder: function (p,callback) {
            Service.putMenu(p._id,JSON.stringify({
                menu: p.menu
            }), callback)
        },
        onCancel: function () {
            var self = this;
            layer.open({
                content:"确定取消订单?",
                btn:["确定","取消"],
                yes: function () {
                    Service.delOrder(self.oid, function (rep) {

                        layer.open({
                            content:"取消成功!",
                            btn:["确定"],
                            yes: function () {
                                store.getOrders();
                                self.$router.go("/list");
                                layer.closeAll();
                            }
                        })

                    })
                }
            });

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
       },
        onDz: function (m,e) {
            m.star++;
            layer.open({type:2});
            Service.dishPlus(this.oid, m._id, function (rep) {
                layer.closeAll();
            });
        }
    },
    computed:{
        count: function () {
            var c = 0;
            for (var i = 0; i < this.list.length; i++) {
                var obj = this.list[i];
                c += obj.number;
            }
            return c;
        },
        total: function () {
            var t = 0;
            for (var i = 0; i < this.list.length; i++) {
                var obj = this.list[i];
                t += (obj.number*obj.price);
            }
            return t.toFixed(2);
        }
    },
    watch:{
        oid:function(id){
            if(this.list.length>0){
                this.renderOrder(id);
            }
        }
    },
    route:{
        data: function (r) {
            this.oid = r.to.params.oid;
            this.selectType = this.types.length>0?this.types[0].key:"";
            this.view = "list";

            setTimeout(function () {
                r.next();
                layer.closeAll();
            },500)
        },
        waitForData:true
    },

    ready: function () {
        this.render();
        this.badge = $("#badge");
        this.dest = $("#dest").offset();

        mui.previewImage();
    }
});

});
