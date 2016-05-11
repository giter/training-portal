define('components/page/goods/goods', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
require("component_modules/mui.js");
require("component_modules/mui.zoom.js");
require("component_modules/mui.previewimage.js");
require("component_modules/mui.lazyload.js");
require("component_modules/mui.lazyload.img.js");

require("ok/ok.js");

var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div class=\"page-food\">\n    <span class=\"mui-badge mui-badge-red\"  id=\"badge\" style=\"display: none;position: absolute;z-index: 1000\">1</span>\n\n    <header class=\"mui-bar mui-bar-nav\" v-if=\"view=='menu'\">\n        <h5 class=\"mui-title \">\n            结算:¥{{total}}\n        </h5>\n        <a class=\"mui-btn-link mui-pull-right\" v-if=\"oid&&mode!='all'\" href=\"#goods-sheet\" >\n            编辑\n        </a>\n        <a class=\"mui-icon mui-icon-back\" v-link=\"{path:'/list/goods'}\" >\n        </a>\n    </header>\n    <header class=\"mui-bar mui-bar-nav\" v-if=\"view=='list'\">\n        <h5 class=\"mui-title \">\n            结算:¥{{total}}\n        </h5>\n        <a class=\"mui-btn-link mui-pull-right\" v-if=\"oid\"   @click=\"onCancel\">\n            取消订单\n        </a>\n        <a class=\"mui-icon mui-icon-back\" v-link=\"{path:'/order'}\" >\n\n        </a>\n    </header>\n    <div class=\"mui-content\" v-show=\"view=='list'\" >\n\n        <div class=\"left-nav\">\n            <ul class=\"mui-table-view\">\n                <li class=\"mui-table-view-cell\" v-for=\"t in types\" :class=\"{'active':selectType==t.key}\"  @click=\"onSelectType(t)\">\n                    {{t.value}}\n                </li>\n            </ul>\n        </div>\n        <div class=\"right-list\">\n            <ul class=\"mui-table-view\" id=\"menu-container\">\n                <li class=\"mui-table-view-cell mui-media\" v-for=\"l in list\" v-show=\"l.type == selectType\" >\n                    <template v-for=\"p in l.picture\" >\n                        <img class=\"mui-media-object mui-pull-left menu-img\" data-lazyload={{'/data/image/'+p+'/60/60.json'}} data-preview-src=\"{{'/data/image/'+p+'/1000/1000.json'}}\"  data-preview-group=\"{{l._id}}\" v-show=\"$index==0\">\n                        <img class=\"mui-media-object mui-pull-left\" style=\"display: none\" src=\"\" data-preview-src=\"{{'/data/image/'+p+'/1000/1000.json'}}\" data-preview-group=\"{{l._id}}\"    v-if=\"$index>0\">\n                    </template>\n                    <div class=\"mui-media-body\">\n                        {{l.name}}\n                    </div>\n                    <p class=\"f-info\">\n                        <span class=\"f-price\">¥{{l.price}}</span>/{{l.unit}}\n                    <span class=\"mui-numbox mui-pull-right\">\n                        <button class=\"mui-btn mui-numbox-btn-minus\" type=\"button\" :disabled=\"!l.number\" @click=\"onMinusNum(l)\" >-</button>\n                        <input class=\"mui-numbox-input\" type=\"number\" :value=\"l.number\" />\n                        <button class=\"mui-btn mui-numbox-btn-plus\" type=\"button\" @click=\"onPlusNum(l,$event)\">+</button>\n                    </span>\n\n                    </p>\n                </li>\n            </ul>\n        </div>\n    </div >\n\n    <div class=\"mui-content l-menu\" v-if=\"view=='menu'\">\n        <ul class=\"mui-table-view\">\n            <li class=\"mui-table-view-cell mui-media\" v-for=\"l in list\" v-if=\"l.number>0\" >\n                <template v-for=\"p in l.picture\" >\n                    <img class=\"mui-media-object mui-pull-left  menu-img\" :src=\"'/data/image/'+p+'/60/60.json'\" data-preview-src=\"{{'/data/image/'+p+'/1000/1000.json'}}\" data-preview-group=\"{{'o_'+l._id}}\"  v-if=\"$index==0\">\n                    <img class=\"mui-media-object mui-pull-left\" style=\"display: none\" src=\"\" data-preview-src=\"{{'/data/image/'+p+'/1000/1000.json'}}\"  data-preview-group=\"{{'o_'+l._id}}\"    v-if=\"$index>0\">\n                </template>\n                <div class=\"mui-media-body\">\n                    {{l.name}} <span v-if=\"mode!='all'\" class=\"mui-pull-right\">{{l.number}}{{l.unit}}</span>\n                </div>\n                <p class=\"f-info\">\n                    <span class=\"f-price\">¥{{l.price}}</span>/{{l.unit}}\n                    <span class=\"mui-numbox mui-pull-right\"  v-show=\"mode=='all'\">\n                        <button class=\"mui-btn mui-numbox-btn-minus\" type=\"button\" :disabled=\"!l.number\" @click=\"onMinusNum(l)\" >-</button>\n                        <input class=\"mui-numbox-input\" type=\"number\" :value=\"l.number\" />\n                        <button class=\"mui-btn mui-numbox-btn-plus\" type=\"button\" @click=\"onPlusNum(l,$event)\">+</button>\n                    </span>\n                </p>\n            </li>\n\n            <li class=\"mui-table-view-divider\" v-show=\"count==0\"  @click=\"onChangeView('list')\"  >\n                没有货物预定\n            </li>\n        </ul>\n        <div class=\"b-submit\" v-if=\"mode=='all'\"  v-show=\"count>0\">\n            <button  class=\"mui-btn mui-btn-block mui-btn-success\" :disabled=\"disabled\" @click=\"onSubmit\">\n                提交订单\n            </button>\n            <button  class=\"mui-btn mui-btn-block mui-btn-info\"  @click=\"onBackList\">\n                返回列表\n            </button>\n        </div>\n    </div>\n    <nav class=\"mui-bar mui-bar-tab\"  >\n        <a class=\"mui-tab-item\" v-show=\"mode=='all'\"   :class=\"{'mui-active':view=='list'}\"  @click=\"onChangeView('list')\" >\n            <span class=\"mui-icon mui-icon-list\"></span>\n            <span class=\"mui-tab-label\">货单</span>\n        </a>\n        <a class=\"mui-tab-item\"  :class=\"{'mui-active':view=='menu'}\" @click=\"onChangeView('menu')\" >\n        <span id=\"dest\" class=\"mui-icon mui-icon-compose\">\n            <span  class=\"mui-badge mui-badge-primary\" v-show=\"count>0\"  transition=\"bounceIn\" >{{count}}</span>\n        </span>\n            <span class=\"mui-tab-label\">已点</span>\n        </a>\n    </nav>\n\n\n    <div id=\"goods-sheet\" class=\"mui-popover mui-popover-action mui-popover-bottom\">\n        <ul class=\"mui-table-view\">\n            <li class=\"mui-table-view-cell\">\n                <a href=\"javascript:;\" @click=\"onEditAll\">修改订单</a>\n            </li>\n            <li class=\"mui-table-view-cell\">\n                <a href=\"javascript:;\" @click=\"onCancel\">取消订单</a>\n            </li>\n        </ul>\n        <ul class=\"mui-table-view\">\n            <li class=\"mui-table-view-cell\">\n                <a href=\"#goods-sheet\"><b>取消</b></a>\n            </li>\n        </ul>\n    </div>\n\n    <c-ok v-if=\"ok.show\" @ok-click=\"onOkClick\" :content=\"ok.content\" transition=\"zoom\"></c-ok>\n</div>",
    data: function () {
        return {
            view:"list",
            types:[],
            mode:"all",
            selectType:"",
            list:[],
            oid:"",
            disabled:true,
            busy:false,
            ok:{
                show:false,
                content:"更新成功!"
            }
        }
    },
    methods:{
        render: function () {
            this.renderList();
        },
        renderList: function () {
            layer.open({type: 2});
            var self = this;

            Service.getCtx("dh_type", function (rep) {
                self.types = rep.types.types;
                self._getGoods();
            });
        },
        renderOrder: function (id) {
            var self = this;
            Service.getGOrder(id, function (rep) {
                self.list.forEach(function (l) {
                    l.number = 0;
                });

                for (var i = 0; i < rep.items.length; i++) {
                    var obj1 = rep.items[i];
                    for (var j = 0; j < self.list.length; j++) {
                        var obj2 = self.list[j];
                        if(obj1._id == obj2._id){
                            obj2.number = obj1.number;
                        }
                    }
                }


            });
        },
        _getGoods: function () {
            var self = this;
            Service.getGoods(function (rep) {
                self.selectType = self.types[0].key;
                for (var i = 0; i < rep.length; i++) {
                    var obj = rep[i];
                    obj.number = 0;
                }
                self.list = rep;
                if(self.$route.params.oid){
                    self.renderOrder(self.$route.params.oid);
                }
                layer.closeAll();

                Vue.nextTick(function () {
                    mui("#menu-container").imageLazyload({
                        placeholder: './static/images/60x60.gif'
                    });

                })
            });
        },
        onSelectType: function (t) {
            this.selectType = t.key;
        },
        onMinusNum: function (l) {
            this.disabled = false;
            l.number -=1;
        },
        onPlusNum: function (l) {
            this.disabled = false;
            l.number +=1;
        },
        onChangeView: function (v) {
            this.view = v;
        },
        onRemoveAll: function () {
            var self = this;
            layer.open({
                content:"确定移除全部已选货物?",
                btn:["确定","取消"],
                yes: function () {
                    self.clearGoods();
                    layer.closeAll();
                    self.disabled = false;
                }
            });
        },
        onSubmit: function () {
            var self = this;
            layer.open({
                content:"确定提交货物列表?",
                btn:["确定","取消"],
                yes: function () {
                    self.submit();

                    self.disabled = true;
                }
            });
        },
        clearGoods: function () {
            for (var i = 0; i < this.list.length; i++) {
                var obj = this.list[i];
                obj.number = 0;
            }
            var self = this;
            Service.updateGoods(this.oid,JSON.stringify({items: []}), function () {
                layer.closeAll();
                self.ok.content="您的货物订单已经清空!";
                self.ok.show = true;
            });
        },
        submit: function () {
            var m = [];
            this.list.forEach(function (obj) {
                if(obj.number>0){
                    m.push({_id:obj._id,number:obj.number});
                }
            });
            var self = this;
            if(this.$route.params.oid){
                Service.updateGoods(this.oid,JSON.stringify({mdate:this.$route.params.mdate,items:m,state:1}), function (rep) {
                    layer.closeAll();
                    self.ok.content="您的货物订单已经提交保存!";
                    self.ok.show = true;
                });

            }else{
                Service.putGoods(JSON.stringify({mdate:this.$route.params.mdate,mtime:this.$route.params.mtime,items:m}), function (rep) {
                    layer.closeAll();
                    self.ok.content="您的货物订单已经提交保存!";
                    self.ok.show = true;
                });

            }

            //this._putOrder({menu: m,_id:this.oid}, function () {
            //    layer.open({
            //        content:"提交成功!",
            //        btn:["确定"],
            //        shadeClose:false,
            //        yes: function () {
            //            layer.closeAll();
            //            store.getOrders();
            //        }
            //    });
            //});
        },

        onCancel: function () {
            var self = this;
            mui('#goods-sheet').popover('toggle');
            layer.open({
                content:"确定取消订单?",
                btn:["确定","取消"],
                yes: function () {
                    Service.delGOrder(self.oid, function (rep) {
                        layer.open({
                            content:"取消成功!",
                            btn:["确定"],
                            yes: function () {
                                store.getGoods();
                                self.$router.go("/list/goods");
                                layer.closeAll();
                            }
                        })

                    })
                }
            });

        },
        onOkClick: function () {
            this.ok.show = false;
            store.getGoods();
            this.$router.go("/list/goods");
        },
        onEditAll: function () {
            mui('#goods-sheet').popover('toggle');
            this.mode = "all";
        },
        onBackList: function () {
            window.history.back();
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
            if(this.list.length>0&&id){
                this.renderOrder(id);
            }else{
                this.renderList();
            }
        }
    },
    route:{
        data: function (r) {
            this.oid = r.to.params.oid;
            this.selectType = this.types.length>0?this.types[0].key:"";
            this.mode = r.to.params.mode;
            if(this.mode !="all"){
                this.view = "menu";
            }
            r.next();
            layer.closeAll();

        },

        waitForData:true
    },

    ready: function () {
        mui.previewImage();
    }
});

});
