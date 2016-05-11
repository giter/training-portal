define('components/page/food/food', function(require, exports, module) {

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

var nav = require("nav/nav.js");

require("component_modules/dt");

require("ok/ok.js");

module.exports = Vue.extend({
    template:"<div class=\"page-food\">\n    <span class=\"mui-badge mui-badge-red\"  id=\"badge\" style=\"display: none;position: absolute;z-index: 1000\">1</span>\n\n    <header class=\"mui-bar mui-bar-nav\" v-if=\"view=='menu'\">\n        <h5 class=\"mui-title \">\n            结算:¥{{total}}\n        </h5>\n        <a class=\"mui-btn-link  mui-pull-right\" v-show=\"mode!='all'\" href=\"#picture\">\n            编辑\n        </a>\n        <a class=\"mui-btn-link  mui-pull-right\" v-show=\"mode=='all'\" href=\"#picture\">\n            取消订单\n        </a>\n        <a class=\"mui-icon mui-icon-back\" v-link=\"{path:'/list/food'}\" >\n        </a>\n    </header>\n    <header class=\"mui-bar mui-bar-nav\" v-if=\"view=='list'\">\n        <h5 class=\"mui-title \">\n            结算:¥{{total}}\n        </h5>\n\n        <a class=\"mui-icon mui-icon-back\" v-link=\"{path:'/list/food'}\" >\n\n        </a>\n    </header>\n    <div class=\"mui-content\" v-show=\"view=='list'\" >\n        <div class=\"left-nav\">\n            <ul class=\"mui-table-view\">\n                <li class=\"mui-table-view-cell\" v-for=\"t in types\" :class=\"{'active':selectType==t.key}\"  @click=\"onSelectType(t)\">\n                    {{t.value}}\n                </li>\n            </ul>\n        </div>\n        <div class=\"right-list\">\n            <div class=\"mui-loading\" v-show=\"list.length==0\">\n                <div class=\"mui-spinner\">\n                    <div class=\"mui-spinner-indicator mui-spinner-indicator12\"></div>\n                    <div class=\"mui-spinner-indicator mui-spinner-indicator11\"></div>\n                    <div class=\"mui-spinner-indicator mui-spinner-indicator10\"></div>\n                    <div class=\"mui-spinner-indicator mui-spinner-indicator9\"></div>\n                    <div class=\"mui-spinner-indicator mui-spinner-indicator8\"></div>\n                    <div class=\"mui-spinner-indicator mui-spinner-indicator7\"></div>\n                    <div class=\"mui-spinner-indicator mui-spinner-indicator6\"></div>\n                    <div class=\"mui-spinner-indicator mui-spinner-indicator5\"></div>\n                    <div class=\"mui-spinner-indicator mui-spinner-indicator4\"></div>\n                    <div class=\"mui-spinner-indicator mui-spinner-indicator3\"></div>\n                    <div class=\"mui-spinner-indicator mui-spinner-indicator2\"></div>\n                    <div class=\"mui-spinner-indicator mui-spinner-indicator1\"></div>\n                </div>\n            </div>\n            <ul class=\"mui-table-view\" id=\"menu-container\" v-show=\"list.length>0\">\n                <li class=\"mui-table-view-cell mui-media\" v-for=\"l in list\" v-show=\"l.type == selectType\"  track-by=\"$index\" >\n                    <template v-for=\"p in l.picture\" >\n                        <img class=\"mui-media-object mui-pull-left menu-img\" data-lazyload={{'/data/image/'+p+'/60/60.json'}} data-preview-src=\"{{'/data/image/'+p+'/1000/1000.json'}}\"  data-preview-group=\"{{l._id}}\" v-if=\"$index==0\">\n                        <img class=\"mui-media-object mui-pull-left\" style=\"display: none\" src=\"\" data-preview-src=\"{{'/data/image/'+p+'/1000/1000.json'}}\" data-preview-group=\"{{l._id}}\"    v-if=\"$index>0\">\n                    </template>\n                    <div class=\"mui-media-body\">\n                        {{l.name}} <span class=\"dz\"><img src=\"/order/static/images/dz.png\" alt=\"\">{{l.star}}</span>\n                        <p class='mui-ellipsis-2'>{{l.cates.join(\",\")}}</p>\n                    </div>\n                    <p class=\"f-info\">\n                        <span class=\"f-price\">¥{{l.price}}</span>/{{l.unit}}\n                    <span class=\"mui-numbox mui-pull-right\" v-show=\"!l.overtime\">\n                        <button class=\"mui-btn mui-numbox-btn-minus\" type=\"button\" :disabled=\"!l.number\" @click=\"onMinusNum(l)\" >-</button>\n                        <input class=\"mui-numbox-input\" type=\"number\" :value=\"l.number\" />\n                        <button class=\"mui-btn mui-numbox-btn-plus\" type=\"button\" @click=\"onPlusNum(l,$event)\">+</button>\n                    </span>\n                    <span class=\"mui-pull-right mui-badge\" v-show=\"l.overtime\">已过预定时间</span>\n                    </p>\n                </li>\n            </ul>\n        </div>\n    </div >\n\n    <div class=\"mui-content l-menu\" v-show=\"view=='menu'\">\n        <div class=\"weui_cells weui_cells_access\" style=\"margin-bottom: 10px;\">\n            <div class=\"weui_cell weui_cell_select weui_select_after\">\n                <div class=\"weui_cell_hd\">\n                    <label for=\"\" class=\"weui_label\">就餐人数</label>\n                </div>\n                <div class=\"weui_cell_bd weui_cell_primary\">\n                    <select :disabled=\"mode!='all'\" :style=\"{color:mode!='all'?'#8f8f94':'#000'}\" class=\"weui_select\"  style=\"padding: 0 30px 0 15px;margin-bottom: 0;\" v-model=\"number\">\n                        <option v-for=\"r in 20\" value=\"{{r+1}}\">{{r+1}}人</option>\n                    </select>\n                </div>\n            </div>\n            <div class=\"weui_cell  \">\n                <div class=\"weui_cell_hd\"><label class=\"weui_label\">上菜时间</label></div>\n                <div class=\"weui_cell_bd weui_cell_primary\" @click=\"onPickTime\" >\n                    <span class=\"weui_input\" type=\"text\" :style=\"{color:mode!='all'?'#8f8f94':'#000'}\" v-text=\"remark||'请选择'\" ></span>\n                    <div class=\"weui_cell_ft\" style=\"float: right\">\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <ul class=\"mui-table-view\">\n            <li class=\"mui-table-view-cell mui-media\" v-for=\"l in list\" v-show=\"l.number>0\" >\n                <template v-for=\"p in l.picture\" >\n                    <img class=\"mui-media-object mui-pull-left  menu-img\" :src=\"'/data/image/'+p+'/60/60.json'\" data-preview-src=\"{{'/data/image/'+p+'/1000/1000.json'}}\" data-preview-group=\"{{'o_'+l._id}}\"  v-if=\"$index==0\">\n                    <img class=\"mui-media-object mui-pull-left\" style=\"display: none\" src=\"\" data-preview-src=\"{{'/data/image/'+p+'/1000/1000.json'}}\"  data-preview-group=\"{{'o_'+l._id}}\"    v-if=\"$index>0\">\n                </template>\n                <div class=\"mui-media-body\">\n                    {{l.name}} <span class=\"dz\"><img src=\"/order/static/images/dz.png\" alt=\"\">{{l.star}}</span><span class=\"mui-pull-right\"  v-show=\"mode!='all'\">{{l.number}} {{l.unit}}</span>\n                    <p class='mui-ellipsis-2'>{{l.cates.join(\",\")}}</p>\n                </div>\n                <p class=\"f-info\">\n                    <span class=\"f-price\">¥{{l.price}}</span>/{{l.unit}}\n\n                    <span class=\"mui-numbox mui-pull-right\" v-show=\"mode=='all'\" v-if=\"!l.overtime\">\n                        <button class=\"mui-btn mui-numbox-btn-minus\" type=\"button\" :disabled=\"!l.number\" @click=\"onMinusNum(l)\" >-</button>\n                        <input class=\"mui-numbox-input\" type=\"number\" :value=\"l.number\" />\n                        <button class=\"mui-btn mui-numbox-btn-plus\" type=\"button\" @click=\"onPlusNum(l,$event)\">+</button>\n                    </span>\n                    <span class=\"mui-pull-right mui-badge\" v-show=\"l.overtime\">已过退订时间</span>\n                </p>\n                <p class=\"mui-ellipsis\">\n                    <input type=\"text\" v-show=\"mode=='all'\"  v-model=\"l.remark\" placeholder=\"请填写备注信息,例如口味,要求。\" style=\"margin-bottom: 0;margin-top: 5px;border: 1px solid rgba(0, 0, 0, 0.1)\">\n                    <span v-show=\"mode!='all'\">{{l.remark}}</span>\n                </p>\n            </li>\n\n            <li class=\"mui-table-view-divider\" v-show=\"count==0\"  @click=\"onChangeView('list')\"  >\n                请先点菜\n            </li>\n\n        </ul>\n        <!--<div class=\"weui_cells_title\">备注信息</div>-->\n        <!--<div class=\"weui_cells weui_cells_form\">-->\n            <!--<div class=\"weui_cell\">-->\n                <!--<div class=\"weui_cell_bd weui_cell_primary\">-->\n                    <!--<textarea  style=\"padding: 0\" v-model=\"remark\" class=\"weui_textarea\" placeholder=\"可以填写您的口味或其他需求\" rows=\"3\"></textarea>-->\n                <!--</div>-->\n            <!--</div>-->\n        <!--</div>-->\n\n        <div class=\"b-submit\" >\n           <div class=\"col-md-6\">\n               <button  class=\"mui-btn mui-btn-block mui-btn-success\" :disabled=\"disabled\" v-show=\"mode=='all'\"  @click=\"onSubmit\">\n               提交订单\n            </button>\n           </div>\n            <div class=\"col-md-6\">\n                <a  class=\"mui-btn mui-btn-block mui-btn-info\" v-show=\"mode=='all'\" v-link=\"{path:'/list'}\">\n                    返回订单\n                </a>\n            </div>\n        </div>\n    </div>\n    <nav class=\"mui-bar mui-bar-tab\"  >\n        <a class=\"mui-tab-item\"   :class=\"{'mui-active':view=='list'}\" v-show=\"mode=='all'\"  @click=\"onChangeView('list')\" >\n            <span class=\"mui-icon mui-icon-list\"></span>\n            <span class=\"mui-tab-label\">菜单</span>\n        </a>\n        <a class=\"mui-tab-item\"  :class=\"{'mui-active':view=='menu'}\" @click=\"onChangeView('menu')\" >\n        <span id=\"dest\" class=\"mui-icon mui-icon-compose\">\n            <span  class=\"mui-badge mui-badge-primary\" transition=\"bounceIn\" v-show=\"count>0\">{{count}}</span>\n        </span>\n            <span class=\"mui-tab-label\">已点</span>\n        </a>\n    </nav>\n\n\n    <div id=\"picture\" class=\"mui-popover mui-popover-action mui-popover-bottom\">\n        <ul class=\"mui-table-view\">\n            <li class=\"mui-table-view-cell\">\n                <a href=\"javascript:;\" @click=\"onEditAll\">修改订单</a>\n            </li>\n            <li class=\"mui-table-view-cell\">\n                <a href=\"javascript:;\" @click=\"onCancel\">取消订单</a>\n            </li>\n        </ul>\n        <ul class=\"mui-table-view\">\n            <li class=\"mui-table-view-cell\">\n                <a href=\"#picture\"><b>取消</b></a>\n            </li>\n        </ul>\n    </div>\n\n    <c-ok @ok-click=\"onOkClick\" :content=\"ok.content\"  transition=\"zoom\" v-if=\"ok.show\"></c-ok>\n</div>",
    data: function () {
        return {
            order:"",
            mode:"all",
            view:"list",
            types:[],
            remark:"",
            number:"",
            selectType:"",
            list:[],
            oid:"",
            disabled:true,
            busy:false,
            ok:{
                show:false,
                content:"你的订单信息已经提交"
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
            this.remark = "";
            Service.getCtx("dc_type", function (rep) {
                self.types = rep.types.types;
                self._getMenus();
            });
        },
        renderOrder: function (id) {
            var self = this;
            Service.getOrder(id, function (rep) {
                self.order = rep;
                self.number = rep.number;
                self.remark = rep.remark;
                self.list.forEach(function (l) {
                    l.number = 0;
                    if(l.shift){
                        l.overtime = self.hasShift(l,rep);
                    }
                });

                for (var i = 0; i < rep.menu.length; i++) {
                    var obj1 = rep.menu[i];
                    for (var j = 0; j < self.list.length; j++) {
                        var obj2 = self.list[j];
                        if(obj1._id == obj2._id){
                            obj2.number = obj1.number;
                            obj2.remark = obj1.remark;
                        }
                    }
                }
                layer.closeAll();
                Vue.nextTick(function () {
                    self.disabled = true;
                })
            });
        },
        _getMenus: function () {
            var self = this;
            layer.open({type:2,content:"获取中"});

            Service.getDishes(function (rep) {
                self.selectType = self.types[0].key;
                for (var i = 0; i < rep.length; i++) {
                    var obj = rep[i];
                    obj.number = 0;
                    obj.remark = "";
                    obj.overtime = false;

                }
                self.list = rep;
                self.renderOrder(self.$route.params.oid);
                layer.closeAll();

                Vue.nextTick(function () {
                    mui("#menu-container").imageLazyload({
                        placeholder: './static/images/60x60.gif'
                    });
                })
            });
        },
        hasShift: function (obj,order) {
            var t = this.$root.config[order.mtime].lastOrder;
            var etime = order.mdate.replace(/-/g,"/") +" " +t;
            var target = Date.parse(new Date(etime));
            target -= obj.shift * 3600*1000;
            return this.now >= target;
        },
        onSelectType: function (t) {
            this.selectType = t.key;
        },
        onMinusNum: function (l) {
            l.number -=1;
        },
        onPlusNum: function (l) {
            l.number +=1;
        },
        onChangeView: function (v) {
            this.view = v;
        },
        onRemoveAll: function () {
            var self = this;
            layer.open({
                content:"确定移除全部已选菜品?",
                btn:["确定","取消"],
                yes: function () {
                    self.clearMenu();
                    layer.closeAll();
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
                    m.push({_id:obj._id,number:obj.number,remark:obj.remark});
                }
            });
            var self = this;
            this._putOrder({menu: m,_id:this.oid,remark:this.remark,number:this.number}, function () {
                self.ok.show = true;
            });
        },
        _putOrder: function (p,callback) {
            Service.putMenu(p._id,JSON.stringify({
                menu: p.menu,
                remark: p.remark,
                state:1,
                number: p.number
            }), callback)
        },
        onCancel: function () {
            var self = this;
            mui('#picture').popover('toggle');
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
                                self.$router.go("/list/food");
                                layer.closeAll();
                            }
                        })

                    })
                }
            });

        },
        onDz: function (m) {
            m.star++;
            layer.open({type:2});
            Service.dishPlus(this.oid, m._id, function (rep) {
                layer.closeAll();
            });
        },
        onOkClick: function () {
            this.ok.show = false;
            store.getOrders();
            this.$router.go("/list/food");
        },
        onPickTime: function () {
            if(this.mode!="all"){
                return ;
            }
            var self = this;
            var picker = new mui.DtPicker({"type":"time",customData:{h:self.order.mtime=="dinner"?[{text:17,value:17},{text:18,value:18},{text:19,value:19},{text:20,value:20}]:[{text:11,value:11},{text:12,value:12}]}});
            picker.ui.h.addEventListener("change", function () {
                var h = picker.ui.h.picker.getSelectedItem();
                picker.ui.i.picker.setItems(self.getMinute(h.value));
            });

            picker.show(function (time) {
                self.remark = time.value;
            });
        },
        getMinute: function (h) {
            var begin = 0,end=60,m = [];

            switch (h){
                case 11:{
                    begin = 40;
                }break;
                case 12:{
                    end = 40;
                }break;
                case 17:{
                    begin = 30;
                }break;
                case 20:{
                    end = 30;
                }break;
            }

            for (var i = begin; i < end; i++) {
                if(i < 10){
                    i="0"+i;
                }
                m.push({
                    text:i,
                    value:i
                });
            }

            return m;
        },
        onEditAll: function () {
            mui('#picture').popover('toggle');
            this.mode = "all";
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
        remark: function () {
            this.disabled = false;
        },
        number: function () {
            this.disabled = false;
        },
        list:{
            deep:true,
            handler: function () {
                this.disabled = false;
            }
        }
    },
    route:{
        data: function (r) {
            this.oid = r.to.params.oid;
            this.selectType = this.types.length>0?this.types[0].key:"";

            setTimeout(function () {
                r.next();
                layer.closeAll();
            },500);

            var n = new Date();
            this.now = Date.parse(n);
            this.nowStr = n.Format("yyyy-MM-dd");
            this.remark = "";
            this.view = r.to.params.view;
            this.mode = r.to.params.mode;

            this.renderOrder(this.oid);
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
