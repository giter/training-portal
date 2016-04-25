;/*!/components/component/main/service.js*/
define('main/service', function(require, exports, module) {

/**
 * Created by jack on 16/2/21.
 */

//var source = "http://xs.demo.hddznet.com:9015/";
var prefix = "";


Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};


function co(callback){
    return function (rep) {
        if(rep.Code == 0){
            callback.call(this,rep.Response);
        }else{
            alert("操作失败,请重试!");
        }
    }
}

$.del = function (url,callback) {
    return $.ajax({
        url:url,
        type:"delete",
        contentType:"application/json",
        dataType:"json",
        success:callback
    })
};

$.put = function (url,data,callback) {
    return $.ajax({
        url:url,
        type:"put",
        data:data,
        contentType:"application/json",
        dataType:"json",
        success:callback
    })
};

function getDate(p,c){
    $.get(prefix +"/data/calendar.json",p, co(c));
}

function getTables(p,c){
    $.get(prefix +"/data/tables.json",p,co(c));
}

function getDishes(c){
    $.get(prefix +"/data/dishes.json",co(c));
}

function getNotices(c){
    $.get(prefix +"/data/notices.json",co(c));
}

function getCtx(id,c){
    $.get(prefix +"/data/ctx.json?app="+id,co(c));
}

function orderTable(id,p,c){
    $.put(prefix+"/data/table/{id}.json".replace("{id}",id),p,co(c));
}
//我的订单
function getOrders(p,c){
    $.get(prefix +"/data/order/mine.json",p, co(c));
}

function getGOrders(p,c){
    $.get(prefix +"/data/basket/mine.json",p,co(c));
}

//点单
function putMenu(id,p,c){
    $.post(prefix+"/data/order/{id}.json".replace("{id}",id),p,co(c));
}

function getOrder(id,c){
    $.get(prefix +"/data/order/{id}.json".replace("{id}",id),co(c));
}

function delOrder(id,c){
    $.del(prefix +"/data/order/{id}.json".replace("{id}",id),co(c));
}

function dishPlus(oid,dish,c){
    $.put(prefix +"/data/order/"+oid+"/dish/"+dish+"/plus.json",{},co(c));
}

function getGoods(c){
    $.get(prefix +"/data/goods.json",co(c));
}

function getGOrder(id,c){
    $.get(prefix +"/data/basket/{id}.json".replace("{id}",id),co(c));
}

function putGoods(p,c){
    $.put(prefix +"/data/basket.json",p,co(c));
}

function updateGoods(id,p,c){
    $.post(prefix +"/data/basket/{id}.json".replace("{id}",id),p,co(c));
}

function delGOrder(id,c){
    $.del(prefix +"/data/basket/{id}.json".replace("{id}",id),co(c));
}

module.exports = {
    getDate:getDate,
    getTables:getTables,
    getDishes:getDishes,
    getNotices:getNotices,
    getCtx:getCtx,
    getOrders:getOrders,
    orderTable:orderTable,
    putMenu:putMenu,
    getOrder:getOrder,
    delOrder:delOrder,
    dishPlus:dishPlus,
    getGoods:getGoods,
    getGOrder:getGOrder,
    putGoods:putGoods,
    getGOrders:getGOrders,
    updateGoods:updateGoods,
    delGOrder:delGOrder
};

});

;/*!/components/component/nav/nav.js*/
define('nav/nav', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */


var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-nav", {
    template:"<nav class=\"mui-bar mui-bar-tab\">\n    <a class=\"mui-tab-item\" :class=\"{'mui-active':view=='order'}\" v-link=\"{path:'/order'}\">\n        <span class=\"mui-icon mui-icon-phone\"></span>\n        <span class=\"mui-tab-label\" >服务</span>\n    </a>\n    <a class=\"mui-tab-item\" :class=\"{'mui-active':view=='list'}\" v-link=\"{path:'/list'}\">\n        <span class=\"mui-icon mui-icon-compose\"></span>\n        <span class=\"mui-tab-label\">订单</span>\n    </a>\n    <a class=\"mui-tab-item\" :class=\"{'mui-active':view=='notice'}\" v-link=\"{path:'/notice'}\">\n        <span class=\"mui-icon mui-icon-list\"></span>\n        <span class=\"mui-tab-label\">公告</span>\n    </a>\n    <a class=\"mui-tab-item\" :class=\"{'mui-active':view=='config'}\" v-link=\"{path:'/config'}\">\n        <span class=\"mui-icon mui-icon-person\"></span>\n        <span class=\"mui-tab-label\">我的</span>\n    </a>\n</nav>\n",
    props:["view"],
    ready: function () {
        
    }
});

});

;/*!/components/page/order/order.js*/
define('components/page/order/order', function(require, exports, module) {

/**
 * Created by jack on 2015/12/2.
 */
var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div class=\"mui-content page-order\">\n\n    <div class=\"navbar\">\n        <div class=\"bd\" style=\"height: 100%;\">\n            <div class=\"weui_tab\">\n                <div class=\"weui_navbar\">\n                    <div :class=\"{weui_bar_item_on:view=='food'}\" @click=\"onChangeView('food')\" class=\"weui_navbar_item \">\n                        我要订餐\n                    </div>\n                    <div :class=\"{weui_bar_item_on:view=='goods'}\" @click=\"onChangeView('goods')\"  class=\"weui_navbar_item\">\n                        我要订货\n                    </div>\n                </div>\n                <div class=\"weui_tab_bd\">\n\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div v-show=\"view=='food'\">\n        <div class=\"weui_cells_title\">预订日期</div>\n        <form class=\"mui-input-group\">\n            <div class=\"mui-input-row mui-radio\" v-for=\"d in date\">\n                <label :for=\"d.value\">{{d.value}} {{d.week}}</label>\n                <input name=\"date\" type=\"radio\"  v-model=\"params.mdate\"  :value=\"d.value\" :id=\"d.value\">\n            </div>\n        </form>\n        <div class=\"weui_cells_title\">预订人数</div>\n        <div class=\"mui-input-row mui-input-range\" style=\"padding-left: 20px;\">\n            <h4 class=\"p-number\"><span>{{params.num}}</span> 人</h4>\n            <input type=\"range\" id=\"block-range\" value=\"5\" min=\"1\" max=\"20\" data-input-slider=\"4\" v-model=\"params.num\">\n        </div>\n        <div class=\"weui_cells_title\">预订餐次</div>\n        <div class=\"mui-card\">\n            <ul class=\"mui-table-view\">\n                <li class=\"mui-table-view-cell\"  >\n                    <a class=\"mui-navigate-right\" @click=\"onSelect('lunch')\"  :class=\"{disabled:!lunch}\" >\n                        午餐 <span v-show=\"!lunch\">(今日已过期)</span>\n                    </a>\n                </li>\n                <li class=\"mui-table-view-cell\"  >\n                    <a  class=\"mui-navigate-right\"  @click=\"onSelect('dinner')\"  :class=\"{disabled:!dinner}\"  >\n                        晚餐 <span v-show=\"!dinner\">(今日已过期)</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div v-show=\"view=='goods'\">\n        <div class=\"weui_cells_title\">预订日期</div>\n        <ul class=\"mui-table-view\">\n            <li class=\"mui-table-view-cell\" v-for=\"d in gDate\">\n                <a v-link=\"{path:'/order/goods/'+d.value}\" class=\"mui-navigate-right\">\n                   {{d.value}} {{d.week}}\n                </a>\n\n            </li>\n        </ul>\n    </div>\n\n</div>\n\n<c-nav view=\"order\"></c-nav>\n",
    data: function () {
        return {
            date:[],
            gDate:[],
            params:{
                mtime:"",
                mdate:"",
                num:5
            },
            gParams:{
                mdate:""
            },
            lunch:true,
            dinner:true,
            view:"food"
        }
    },
    methods:{
        render: function () {
            this.renderDate();
            this.renderGDate();
        },
        renderDate: function () {
            layer.open({type:2});
            var self = this;
            Service.getDate({max:this.$root.config.pre},function (date) {
                self.date = date;
                self.params.mdate = date[0].value;
                layer.closeAll();
            })
        },
        renderGDate: function () {
            layer.open({type:2});
            var self = this;
            Service.getCtx("dh_config", function (rep) {
                var max = rep.config.pre||3;
                Service.getDate({max:max},function (date) {
                    self.gDate = date;
                    self.gParams.mdate = date[0].value;
                    layer.closeAll();
                })
            });

        },

        onSelect: function (type) {
            this.params.mtime = type;
            if(this[type]){
                router.go({name:"table",params:{mtime:this.params.mtime,mdate:this.params.mdate,num:this.params.num}});
            }
        },
        check: function (mt) {
            var config = this.$root.config;
            var t  = config[mt];
            var now = (new Date()).Format("hh:mm"),last = t.lastOrder;
            return parseInt((now.split(":")[0]*60+now.split(":")[1]*1)) <parseInt( (last.split(":")[0]*60+ last.split(":")[1]*1))
        },
        onChangeView: function (v) {
            this.view = v;
        }

    },
    watch:{
        "params.mdate": function (v) {
            var index = 0;
            for (var i = 0; i < this.date.length; i++) {
                var obj = this.date[i];
                if(obj.value == v){
                    index = i;
                }
            }

            if(index==0){
                this.lunch = this.check("lunch");
                this.dinner = this.check("dinner");
            }else{
                this.lunch = true;
                this.dinner = true;
            }

        }
    },
    ready: function () {
        this.render();
    }
});

});

;/*!/components/page/loading/loading.js*/
define('components/page/loading/loading', function(require, exports, module) {

/**
 * Created by jack on 2015/12/2.
 */
var Vue = require("component_modules/vue.js");

module.exports = Vue.extend({
    inherit:true,
    template:"<div class=\"loader\">\n</div>\n\n",
    props:["view"],
    data: function () {
        return {

        }
    },
    events:{

    },
    ready: function () {

    }
});

});

;/*!/components/component/main/main.js*/
define('main/main', function(require, exports, module) {

/**
 * Created by jack on 16/2/17.
 */

var Vue = require("component_modules/vue.js");
var Router = require("component_modules/vue-router.js");

var order = require("components/page/order/order");
var loading = require("components/page/loading/loading");
var Service = require("main/service.js");
Vue.use(Router);


store = {
    state:{
        orders:[],
        notice:{},
        goods:[]
    },
    getOrders: function () {
        var start = (new Date()).Format("yyyy-MM-dd");
        var end =  ((new Date()).Format("yyyy")*1+1)+(new Date()).Format("-MM-dd");
        var self = this;
        Service.getOrders({start:start,end:end},function (rep) {
            if(rep){
                rep.sort(function (a,b) {
                    return Date.parse(new Date(a.mdate)) < Date.parse(new Date(b.mdate))?-1:1
                });
            }
            self.state.orders = rep;
        });
    },
    getGoods: function () {
        var start = (new Date()).Format("yyyy-MM-dd");
        var end =  ((new Date()).Format("yyyy")*1+1)+(new Date()).Format("-MM-dd");
        var self = this;
        Service.getGOrders({start:start,end:end},function (rep) {
            if(rep){
                rep.sort(function (a,b) {
                    return Date.parse(new Date(a.mdate)) < Date.parse(new Date(b.mdate))?-1:1
                });
            }
            self.state.goods = rep;
        });
    }
};

router = new Router();
var App = Vue.extend({
    ready: function () {
        var self = this;
        setInterval(function () {
            Service.getCtx("dc_config",function (rep) {
                self.config = rep.config;
            });
        },60000);

        store.getOrders();
        store.getGoods();

        FastClick.attach(document.body);

    }
});

router.redirect({
    "/":"/order"
});

router.map({
    "/order":{
        component:order
    },
    "/order/:mdate/:mtime/:num":{
        component: function (resolve) {
            require.async(["components/page/order/table/table"], function (p) {
                resolve(p);
            });
        },
        name:"table"
    },
    "/order/goods/:mdate":{
        component: function (resolve) {
            require.async(["components/page/goods/goods"], function (p) {
                resolve(p);
            });
        }
    },
    "/order/goods/detail/:oid":{
        component: function (resolve) {
            require.async(["components/page/goods/goods"], function (p) {
                resolve(p);
            });
        }
    },
    "/food/:oid":{
        component: function (resolve) {
            require.async(["components/page/food/food"], function (p) {
                resolve(p);
            });
        },
        name:"food"
    },
    "/notice":{
        component: function (resolve) {
            require.async(["components/page/notice/notice"], function (p) {
                resolve(p);
            });
        }
    },
    "/notice/:id":{
        component: function (resolve) {
            require.async(["components/page/notice/detail/detail"], function (p) {
                resolve(p);
            });
        },
        name:"detail"
    },
    "/config":{
        component: function (resolve) {
            require.async(["components/page/config/config"], function (p) {
                resolve(p);
            });
        }
    },
    "/list":{//订单列表
        component: function (resolve) {
            require.async(["components/page/list/list"], function (p) {
                resolve(p);
            });
        }
    },
    "list/food/:id":{
        component: function (resolve) {
            require.async(["components/page/list/food/food"], function (p) {
                resolve(p);
            });
        }
    }
});

layer.open({type:2});
Service.getCtx("dc_config", function (rep) {
    router.start(App.extend({
        data: function () {
            return {
                config:rep.config
            }
        }
    }), '#app');
    layer.closeAll();
});





});

;/*!/components/page/order/table/table.js*/
define('components/page/order/table/table', function(require, exports, module) {

/**
 * Created by jack on 2015/12/2.
 */
var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var L = require("component_modules/leaflet-src.js");
require("component_modules/leaflet.zoomify.js");
require("component_modules/leaflet.draw-src.js");
var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div class=\"mui-content\" id=\"map\" :style=\"{height:height+'px'}\">\n</div>\n<c-nav view=\"order\"></c-nav>",
    data: function () {
        return {
            height:document.documentElement.clientHeight-52,
            type:0,
            scale:1,
            params:{
                mtime:"",
                mdate:"",
                num:0
            },
            table:{}
        }
    },
    methods:{
        render: function () {
            this.renderMap();
        },
        renderMap: function () {
            var w = 2484,h = 3512;
            var self = this;
            this.map = new L.map("map",{
                center:[0,0],
                zoom:2,
                minZoom:0,
                maxZoom:3,
                attributionControl:false
            });

            L.tileLayer.zoomify('./admin/static/images/tables/', {
                width: w,
                height: h,
                tolerance: 0.8,
                attribution: '二楼小餐厅分布图'
            }).addTo(this.map);

            this.featureLayer = new L.featureGroup().addTo(this.map);

            this.map.on("zoomstart", function () {
                self.map.removeLayer(self.featureLayer);
            });
            this.map.on("zoomend", function () {
                self.featureLayer.addTo(self.map);
            });

        },
        renderTable: function () {
            layer.open({type:2});
            var self = this;
            this.featureLayer.clearLayers();
            Service.getTables({mdate:this.params.mdate,mtime:this.params.mtime},function (data) {

                data.forEach(function (t) {
                    self.renderHot(t);
                });
                layer.closeAll();
            });
        },
        getStateColor: function (state) {
            switch (state){
                case 1:return "#000";break;
                default:return "blue";
            }
        },
        renderHot: function (data) {
            var self = this,feature="";
            if(data.table.position.type == "rectangle"){
                feature = new L.rectangle(data.table.position.latlngs,{weight:1,fillColor:this.getStateColor(data.state),fillOpacity:0.4,data:data}).addTo(this.featureLayer);

            }else{
                feature = new L.circle(data.table.position.latlng,data.table.position.radius,{weight:1,fillColor:this.getStateColor(data.state),fillOpacity:0.4,data:data}).addTo(this.featureLayer);
            }
            feature.on("click", function () {
                self.table = this.options.data.table;
                if(this.options.data.user){
                    layer.open({
                        content:"该桌已被<strong> "+this.options.data.user.name +" </strong>预定!",
                        btn: ['确认'],
                        shadeClose: false,
                        yes: function(){
                            layer.closeAll();
                        }
                    });
                }else{
                    layer.open({
                        title:"订单确认",
                        content: self.getDialogInfo(),
                        btn: ['确认', '取消'],
                        shadeClose: false,
                        yes: function(){
                            self.order();
                        }, no: function(){
                        }
                    });
                }

            });

        },
        getDialogInfo: function () {
            return this.$interpolate("<table class='table-info'>" +
                "<tr><td>日期:</td><td>{{params.mdate}}</td></tr>" +
                "<tr><td>餐次:</td><td>{{params.mtime=='lunch'?'午餐':'晚餐'}}</td></tr>" +
                "<tr><td>人数:</td><td>{{params.num}}人</td></tr>" +
                "<tr><td>桌位:</td><td>{{table.type==0?'大厅':'包厢'}}{{table.no}}号</td></tr>" +
                "</table>");
        },
        order: function () {
            var self = this;
            Service.orderTable(this.table._id,JSON.stringify({
                mtime:this.params.mtime,
                mdate:this.params.mdate,
                number:parseInt(this.params.num),
                menu:[]
            }), function (rep) {
                layer.open({
                    content:"预定成功!",
                    btn:["马上去点菜"],
                    shadeClose:false,
                    yes: function () {
                        layer.closeAll();
                        store.getOrders();
                        self.$router.go("/list");
                    }
                });
            })
        }
    },
    events:{
    },
    watch:{
        "params":{
            deep:true,
            handler: function () {
                this.renderTable();
            }
        }
    },
    route:{
        data: function (transition) {
            this.params = Object.assign(this.params,transition.to.params);
            transition.next();
        }
    },
    ready: function () {
        this.render();

    }
});

});

;/*!/components/component/ok/ok.js*/
define('ok/ok', function(require, exports, module) {

/**
 * Created by jack on 16/4/25.
 */

var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-ok",{
    template:"<div class=\"container\" ><div class=\"msg\">\n    <div class=\"weui_msg\">\n        <div class=\"weui_icon_area\"><i class=\"weui_icon_success weui_icon_msg\"></i></div>\n        <div class=\"weui_text_area\">\n            <h2 class=\"weui_msg_title\">操作成功</h2>\n            <p class=\"weui_msg_desc\">{{content}}</p>\n        </div>\n        <div class=\"weui_opr_area\">\n            <p class=\"weui_btn_area\">\n                <a href=\"javascript:;\" class=\"weui_btn weui_btn_primary\" @click=\"onClick\">确定</a>\n                <!--<a href=\"javascript:;\" class=\"weui_btn weui_btn_default\">取消</a>-->\n            </p>\n        </div>\n        <!--<div class=\"weui_extra_area\">-->\n            <!--<a href=\"\">查看详情</a>-->\n        <!--</div>-->\n    </div>\n</div>\n",
    props:["content"],
    methods:{
        onClick: function () {
            this.$dispatch("ok-click");
        }
    }
});

});

;/*!/components/page/goods/goods.js*/
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
    template:"<div class=\"page-food\">\n    <span class=\"mui-badge mui-badge-red\"  id=\"badge\" style=\"display: none;position: absolute;z-index: 1000\">1</span>\n\n    <header class=\"mui-bar mui-bar-nav\" v-if=\"view=='menu'\">\n        <h5 class=\"mui-title \">\n            结算:¥{{total}}\n        </h5>\n        <a class=\"mui-btn-link mui-pull-right\"  @click=\"onRemoveAll\">\n            清空\n        </a>\n        <a class=\"mui-icon mui-icon-back\" v-link=\"{path:'/order'}\" >\n        </a>\n    </header>\n    <header class=\"mui-bar mui-bar-nav\" v-if=\"view=='list'\">\n        <h5 class=\"mui-title \">\n            结算:¥{{total}}\n        </h5>\n        <a class=\"mui-btn-link mui-pull-right\" v-if=\"oid\"   @click=\"onCancel\">\n            取消订单\n        </a>\n        <a class=\"mui-icon mui-icon-back\" v-link=\"{path:'/order'}\" >\n\n        </a>\n    </header>\n    <div class=\"mui-content\" v-show=\"view=='list'\" >\n\n        <div class=\"left-nav\">\n            <ul class=\"mui-table-view\">\n                <li class=\"mui-table-view-cell\" v-for=\"t in types\" :class=\"{'active':selectType==t.key}\"  @click=\"onSelectType(t)\">\n                    {{t.value}}\n                </li>\n            </ul>\n        </div>\n        <div class=\"right-list\">\n            <ul class=\"mui-table-view\" id=\"menu-container\">\n                <li class=\"mui-table-view-cell mui-media\" v-for=\"l in list\" v-show=\"l.type == selectType\" >\n                    <template v-for=\"p in l.picture\" >\n                        <img class=\"mui-media-object mui-pull-left menu-img\" data-lazyload={{'/data/image/'+p+'/60/60.json'}} data-preview-src=\"{{'/data/image/'+p+'/1000/1000.json'}}\"  data-preview-group=\"{{l._id}}\" v-show=\"$index==0\">\n                        <img class=\"mui-media-object mui-pull-left\" style=\"display: none\" src=\"\" data-preview-src=\"{{'/data/image/'+p+'/1000/1000.json'}}\" data-preview-group=\"{{l._id}}\"    v-if=\"$index>0\">\n                    </template>\n                    <div class=\"mui-media-body\">\n                        {{l.name}}\n                    </div>\n                    <p class=\"f-info\">\n                        <span class=\"f-price\">¥{{l.price}}</span>/{{l.unit}}\n                    <span class=\"mui-numbox mui-pull-right\">\n                        <button class=\"mui-btn mui-numbox-btn-minus\" type=\"button\" :disabled=\"!l.number\" @click=\"onMinusNum(l)\" >-</button>\n                        <input class=\"mui-numbox-input\" type=\"number\" :value=\"l.number\" />\n                        <button class=\"mui-btn mui-numbox-btn-plus\" type=\"button\" @click=\"onPlusNum(l,$event)\">+</button>\n                    </span>\n\n                    </p>\n                </li>\n            </ul>\n        </div>\n    </div >\n\n    <div class=\"mui-content l-menu\" v-if=\"view=='menu'\">\n        <ul class=\"mui-table-view\">\n            <li class=\"mui-table-view-cell mui-media\" v-for=\"l in list\" v-if=\"l.number>0\" >\n                <template v-for=\"p in l.picture\" >\n                    <img class=\"mui-media-object mui-pull-left  menu-img\" :src=\"'/data/image/'+p+'/60/60.json'\" data-preview-src=\"{{'/data/image/'+p+'/1000/1000.json'}}\" data-preview-group=\"{{'o_'+l._id}}\"  v-if=\"$index==0\">\n                    <img class=\"mui-media-object mui-pull-left\" style=\"display: none\" src=\"\" data-preview-src=\"{{'/data/image/'+p+'/1000/1000.json'}}\"  data-preview-group=\"{{'o_'+l._id}}\"    v-if=\"$index>0\">\n                </template>\n                <div class=\"mui-media-body\">\n                    {{l.name}}\n                </div>\n                <p class=\"f-info\">\n                    <span class=\"f-price\">¥{{l.price}}</span>/{{l.unit}}\n                    <span class=\"mui-numbox mui-pull-right\">\n                        <button class=\"mui-btn mui-numbox-btn-minus\" type=\"button\" :disabled=\"!l.number\" @click=\"onMinusNum(l)\" >-</button>\n                        <input class=\"mui-numbox-input\" type=\"number\" :value=\"l.number\" />\n                        <button class=\"mui-btn mui-numbox-btn-plus\" type=\"button\" @click=\"onPlusNum(l,$event)\">+</button>\n                    </span>\n                </p>\n            </li>\n\n            <li class=\"mui-table-view-divider\" v-show=\"count==0\"  @click=\"onChangeView('list')\"  >\n                没有货物预定\n            </li>\n        </ul>\n        <div class=\"b-submit\"  v-show=\"count>0\">\n            <button  class=\"mui-btn mui-btn-block mui-btn-success\" :disabled=\"disabled\" @click=\"onSubmit\">\n                提交\n            </button>\n        </div>\n    </div>\n    <nav class=\"mui-bar mui-bar-tab\"  >\n        <a class=\"mui-tab-item\"   :class=\"{'mui-active':view=='list'}\"  @click=\"onChangeView('list')\" >\n            <span class=\"mui-icon mui-icon-list\"></span>\n            <span class=\"mui-tab-label\">菜单</span>\n        </a>\n        <a class=\"mui-tab-item\"  :class=\"{'mui-active':view=='menu'}\" @click=\"onChangeView('menu')\" >\n        <span id=\"dest\" class=\"mui-icon mui-icon-compose\">\n            <span  class=\"mui-badge mui-badge-primary\" v-show=\"count>0\">{{count}}</span>\n        </span>\n            <span class=\"mui-tab-label\">已点</span>\n        </a>\n    </nav>\n\n    <c-ok v-if=\"ok.show\" @ok-click=\"onOkClick\" :content=\"ok.content\" transition=\"zoom\"></c-ok>\n</div>",
    data: function () {
        return {
            view:"list",
            types:[],
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
                Service.updateGoods(this.oid,JSON.stringify({mdate:this.$route.params.mdate,items:m}), function (rep) {
                    layer.closeAll();
                    self.ok.content="您的货物订单已经提交保存!";
                    self.ok.show = true;
                });

            }else{
                Service.putGoods(JSON.stringify({mdate:this.$route.params.mdate,items:m}), function (rep) {
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
                                self.$router.go("/list");
                                layer.closeAll();
                            }
                        })

                    })
                }
            });

        },
        onOkClick: function () {
            this.ok.show = false;
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
            }
        }
    },
    route:{
        data: function (r) {
            this.oid = r.to.params.oid;
            this.selectType = this.types.length>0?this.types[0].key:"";
            r.next();
            layer.closeAll();

        },

        waitForData:true
    },

    ready: function () {
        this.render();

        mui.previewImage();



    }
});

});

;/*!/components/page/food/food.js*/
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
require("ok/ok.js");

module.exports = Vue.extend({
    template:"<div class=\"page-food\">\n    <span class=\"mui-badge mui-badge-red\"  id=\"badge\" style=\"display: none;position: absolute;z-index: 1000\">1</span>\n\n    <header class=\"mui-bar mui-bar-nav\" v-if=\"view=='menu'\">\n        <h5 class=\"mui-title \">\n            结算:¥{{total}}\n        </h5>\n        <a class=\"mui-btn-link mui-pull-right\"  @click=\"onRemoveAll\">\n            清空\n        </a>\n        <a class=\"mui-icon mui-icon-back\" v-link=\"{path:'/list'}\" >\n        </a>\n    </header>\n    <header class=\"mui-bar mui-bar-nav\" v-if=\"view=='list'\">\n        <h5 class=\"mui-title \">\n            结算:¥{{total}}\n        </h5>\n        <a class=\"mui-btn-link mui-pull-right\"   @click=\"onCancel\">\n            取消订单\n        </a>\n        <a class=\"mui-icon mui-icon-back\" v-link=\"{path:'/list'}\" >\n\n        </a>\n    </header>\n    <div class=\"mui-content\" v-show=\"view=='list'\" >\n\n\n        <div class=\"left-nav\">\n            <ul class=\"mui-table-view\">\n                <li class=\"mui-table-view-cell\" v-for=\"t in types\" :class=\"{'active':selectType==t.key}\"  @click=\"onSelectType(t)\">\n                    {{t.value}}\n                </li>\n            </ul>\n        </div>\n        <div class=\"right-list\">\n            <ul class=\"mui-table-view\" id=\"menu-container\">\n                <li class=\"mui-table-view-cell mui-media\" v-for=\"l in list\" v-show=\"l.type == selectType\" >\n                    <template v-for=\"p in l.picture\" >\n                        <img class=\"mui-media-object mui-pull-left menu-img\" data-lazyload={{'/data/image/'+p+'/60/60.json'}} data-preview-src=\"{{'/data/image/'+p+'/1000/1000.json'}}\"  data-preview-group=\"{{l._id}}\" v-if=\"$index==0\">\n                        <img class=\"mui-media-object mui-pull-left\" style=\"display: none\" src=\"\" data-preview-src=\"{{'/data/image/'+p+'/1000/1000.json'}}\" data-preview-group=\"{{l._id}}\"    v-if=\"$index>0\">\n                    </template>\n                    <div class=\"mui-media-body\">\n                        {{l.name}} <span class=\"dz\"><img src=\"/order/static/images/dz.png\" alt=\"\">{{l.star}}</span>\n                        <p class='mui-ellipsis'>{{l.cates.join(\",\")}}</p>\n                    </div>\n                    <p class=\"f-info\">\n                        <span class=\"f-price\">¥{{l.price}}</span>/{{l.unit}}\n                    <span class=\"mui-numbox mui-pull-right\">\n                        <button class=\"mui-btn mui-numbox-btn-minus\" type=\"button\" :disabled=\"!l.number\" @click=\"onMinusNum(l)\" >-</button>\n                        <input class=\"mui-numbox-input\" type=\"number\" :value=\"l.number\" />\n                        <button class=\"mui-btn mui-numbox-btn-plus\" type=\"button\" @click=\"onPlusNum(l,$event)\">+</button>\n                    </span>\n\n                    </p>\n                </li>\n            </ul>\n        </div>\n    </div >\n\n    <div class=\"mui-content l-menu\" v-if=\"view=='menu'\">\n        <ul class=\"mui-table-view\">\n            <li class=\"mui-table-view-cell mui-media\" v-for=\"l in list\" v-show=\"l.number>0\" >\n                <template v-for=\"p in l.picture\" >\n                    <img class=\"mui-media-object mui-pull-left  menu-img\" :src=\"'/data/image/'+p+'/60/60.json'\" data-preview-src=\"{{'/data/image/'+p+'/1000/1000.json'}}\" data-preview-group=\"{{'o_'+l._id}}\"  v-if=\"$index==0\">\n                    <img class=\"mui-media-object mui-pull-left\" style=\"display: none\" src=\"\" data-preview-src=\"{{'/data/image/'+p+'/1000/1000.json'}}\"  data-preview-group=\"{{'o_'+l._id}}\"    v-if=\"$index>0\">\n                </template>\n                <div class=\"mui-media-body\">\n                    {{l.name}} <span class=\"dz\"><img src=\"/order/static/images/dz.png\" alt=\"\">{{l.star}}</span>\n                    <p class='mui-ellipsis'>{{l.cates.join(\",\")}}</p>\n                </div>\n                <p class=\"f-info\">\n                    <span class=\"f-price\">¥{{l.price}}</span>/{{l.unit}}\n                    <span class=\"mui-numbox mui-pull-right\">\n                        <button class=\"mui-btn mui-numbox-btn-minus\" type=\"button\" :disabled=\"!l.number\" @click=\"onMinusNum(l)\" >-</button>\n                        <input class=\"mui-numbox-input\" type=\"number\" :value=\"l.number\" />\n                        <button class=\"mui-btn mui-numbox-btn-plus\" type=\"button\" @click=\"onPlusNum(l,$event)\">+</button>\n                    </span>\n                </p>\n            </li>\n\n            <li class=\"mui-table-view-divider\" v-show=\"count==0\"  @click=\"onChangeView('list')\"  >\n                请先点菜\n            </li>\n\n        </ul>\n        <div class=\"weui_cells_title\">备注信息</div>\n        <div class=\"weui_cells weui_cells_form\">\n            <div class=\"weui_cell\">\n                <div class=\"weui_cell_bd weui_cell_primary\">\n                    <textarea  style=\"padding: 0\" v-model=\"remark\" class=\"weui_textarea\" placeholder=\"可以填写您的口味或其他需求\" rows=\"3\"></textarea>\n                </div>\n            </div>\n        </div>\n        <div class=\"b-submit\"  v-show=\"count>0\">\n            <button  class=\"mui-btn mui-btn-block mui-btn-success\" :disabled=\"disabled\" @click=\"onSubmit\">\n                提交\n            </button>\n        </div>\n    </div>\n    <nav class=\"mui-bar mui-bar-tab\"  >\n        <a class=\"mui-tab-item\"   :class=\"{'mui-active':view=='list'}\"  @click=\"onChangeView('list')\" >\n            <span class=\"mui-icon mui-icon-list\"></span>\n            <span class=\"mui-tab-label\">菜单</span>\n        </a>\n        <a class=\"mui-tab-item\"  :class=\"{'mui-active':view=='menu'}\" @click=\"onChangeView('menu')\" >\n        <span id=\"dest\" class=\"mui-icon mui-icon-compose\">\n            <span  class=\"mui-badge mui-badge-primary\" v-show=\"count>0\">{{count}}</span>\n        </span>\n            <span class=\"mui-tab-label\">已点</span>\n        </a>\n    </nav>\n\n    <c-ok @ok-click=\"onOkClick\" :content=\"ok.content\" v-if=\"ok.show\"></c-ok>\n</div>",
    data: function () {
        return {
            view:"list",
            types:[],
            remark:"",
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

            Service.getCtx("dc_type", function (rep) {
                self.types = rep.types.types;
                self._getMenus();
            });
        },
        renderOrder: function (id) {
            var self = this;
            Service.getOrder(id, function (rep) {
                self.remark = rep.remark;
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
        onPlusNum: function (l,e) {
            this.disabled = false;
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
            var self = this;
            this._putOrder({menu: m,_id:this.oid,remark:this.remark}, function () {
                self.ok.show = true;
            });
        },
        _putOrder: function (p,callback) {
            Service.putMenu(p._id,JSON.stringify({
                menu: p.menu,
                remark: p.remark
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
        },
        remark: function () {
            this.disabled = false;
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

;/*!/components/page/notice/notice.js*/
define('components/page/notice/notice', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<header class=\"mui-bar-nav mui-bar\">\n    <h5 class=\"mui-title\">\n        公告列表\n    </h5>\n</header>\n<div class=\"mui-content\">\n    <ul class=\"mui-table-view\">\n        <li style=\"text-align: center\" v-show=\"notices.length ==0\">\n            暂无公告\n        </li>\n        <li v-for=\"n in notices\" class=\"mui-table-view-cell mui-media\">\n            <a href=\"javascript:;\" @click=\"onShowContent(n)\" class=\"mui-navigate-right\">\n                <div class=\"mui-media-body\">\n                    {{n.title}}\n                    <p class=\"mui-ellipsis\">\n                        {{(new Date(n.created)).Format('yyyy-MM hh:dd')}}\n                    </p>\n                </div>\n            </a>\n        </li>\n    </ul>\n</div>\n\n<c-nav view=\"notice\"></c-nav>",
    data: function () {
        return {
            notices:[],
            count:0
        }
    },
    methods:{
        render: function () {
            this.renderList();
        },
        renderList: function () {
            var self = this;
            Service.getNotices(function (rep) {
                self.notices = rep;
            });
        },
        onShowContent: function (n) {
            store.state.notice = n;
            router.go({name:"detail",params:{id: n._id}});
        }
    },
    ready: function () {
        this.render();
    },
    route:{
        activate: function (transition) {
            transition.next();
        }
    }
});

});

;/*!/components/page/notice/detail/detail.js*/
define('components/page/notice/detail/detail', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div style=\"padding:5px;\">\n{{{content}}}\n</div>",
    data: function () {
        return {
            content: ""
        }
    },
    methods:{

    },
    ready: function () {

    },
    route:{
        activate: function (transition) {
            this.content = store.state.notice.content;
            if(!this.content){
                router.go("/notice");
            }
            transition.next();
        }
    }
});

});

;/*!/components/page/config/config.js*/
define('components/page/config/config', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");

var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div class=\"mui-content p-config\">\n    <header>\n\n\n        <img src=\"/order/static/images/my.jpg\" alt=\"\" class=\"img-circle\">\n        <h5>个人信息暂未开发</h5>\n\n    </header>\n\n    <ul class=\"mui-table-view\">\n        <li class=\"mui-table-view-cell\">\n            <a href=\"\" class=\"mui-navigate-right\">\n                历史订单\n                <span class=\"mui-badge\">开发中</span>\n            </a>\n        </li>\n        <li class=\"mui-table-view-cell\">\n            <a href=\"\" class=\"mui-navigate-right\">\n                帮助文档\n                <span class=\"mui-badge\">制作中</span>\n            </a>\n        </li>\n    </ul>\n    <!--<div class=\"mui-content-padded\">-->\n        <!--<a href=\"\" class=\"mui-btn mui-btn-block mui-btn-warning\">-->\n            <!--<span class=\"mui-icon mui-icon-close\"></span>-->\n            <!--解除绑定-->\n        <!--</a>-->\n    <!--</div>-->\n\n</div>\n<c-nav view=\"config\"></c-nav>",
    data: function () {
      return {
      }
    },
    route:{
        activate: function (transition) {
            transition.next();
        }
    }
});


});

;/*!/components/page/list/list.js*/
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

;/*!/components/page/list/food/food.js*/
define('components/page/list/food/food', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div class=\"mui-content\">\n    <div class=\"weui_cells_title\"> {{order.mdate}} {{order.mtime=='dinner'?\"晚餐\":\"午餐\"}} {{order.table.no}}号座</div>\n    <ul class=\"mui-table-view\">\n        <li class=\"mui-table-view-cell mui-media\" v-for=\"m in order.menu\">\n            <img  v-if=\"m.picture.length>0\" style=\"min-width: 42px;\"  class=\"mui-media-object mui-pull-left\" :src=\"'/data/image/'+m.picture[0]+'/60/60.json'\" alt=\"\">\n\n            <img  v-if=\"m.picture.length==0\" class=\"mui-media-object mui-pull-left\" src=\"/order/static/images/60x60.gif\" alt=\"\">\n\n            <div class=\"mui-media-body\">\n                    {{m.name}}\n\n                <a href=\"javascript:;\" v-if=\"m.visible!=-1\" class=\"mui-btn-link mui-pull-right\" @click=\"onDz(m)\">点赞</a>\n                <p class=\"mui-ellipsis\">\n                    {{m.number}}/{{m.unit}}\n                </p>\n            </div>\n        </li>\n    </ul>\n</div>",
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
