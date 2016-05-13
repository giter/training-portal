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
    $.get(prefix +"/data/dishes.json?",{sorts:"{created:1}"},co(c));
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

function getUserInfo(c){
    $.get(prefix +"/get_user_info.json",co(c));
}

module.exports = {
    getUserInfo:getUserInfo,
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
    template:"<nav class=\"mui-bar mui-bar-tab\">\n    <a class=\"mui-tab-item\" :class=\"{'mui-active':view=='order'}\" v-link=\"{path:'/order'}\">\n        <span class=\"mui-icon mui-icon-phone\"></span>\n        <span class=\"mui-tab-label\" >服务</span>\n    </a>\n    <a class=\"mui-tab-item\" :class=\"{'mui-active':view=='list'}\" v-link=\"{path:'/list/food'}\">\n        <span class=\"mui-icon mui-icon-compose\"></span>\n        <span class=\"mui-tab-label\">订单</span>\n    </a>\n    <a class=\"mui-tab-item\" :class=\"{'mui-active':view=='notice'}\" v-link=\"{path:'/notice'}\">\n        <span class=\"mui-icon mui-icon-list\"></span>\n        <span class=\"mui-tab-label\">公告</span>\n    </a>\n    <a class=\"mui-tab-item\" :class=\"{'mui-active':view=='config'}\" v-link=\"{path:'/config'}\">\n        <span class=\"mui-icon mui-icon-person\"></span>\n        <span class=\"mui-tab-label\">我的</span>\n    </a>\n</nav>\n",
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
    template:"<div class=\"mui-content page-order\">\n\n    <div class=\"navbar\">\n        <div class=\"bd\" style=\"height: 100%;\">\n            <div class=\"weui_tab\">\n                <div class=\"weui_navbar\">\n                    <div :class=\"{weui_bar_item_on:view=='food'}\" @click=\"onChangeView('food')\" class=\"weui_navbar_item \">\n                        我要订餐\n                    </div>\n                    <div :class=\"{weui_bar_item_on:view=='goods'}\" @click=\"onChangeView('goods')\"  class=\"weui_navbar_item\">\n                        我要订货\n                    </div>\n                </div>\n                <div class=\"weui_tab_bd\">\n\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div v-show=\"view=='food'\">\n        <div class=\"weui_cells_title\">预订日期</div>\n        <form class=\"mui-input-group\">\n            <div class=\"mui-input-row mui-radio\" v-for=\"d in date\" @click=\"selectWeek(d.week)\">\n                <label :for=\"d.value\">{{d.value}} {{d.week}}</label>\n                <input name=\"date\" type=\"radio\"  v-model=\"params.mdate\"  :value=\"d.value\" :id=\"d.value\">\n            </div>\n        </form>\n        <div class=\"weui_cells_title\">就餐人数</div>\n        <div class=\"mui-input-row mui-input-range\" style=\"padding-left: 20px;\">\n            <h4 class=\"p-number\"><span class=\"number-tiaodong\">{{params.num}}</span> 人</h4>\n            <input type=\"range\" id=\"block-range\" value=\"4\" min=\"1\" max=\"20\" data-input-slider=\"4\" v-model=\"params.num\">\n        </div>\n        <div class=\"weui_cells_title\">预订餐次</div>\n        <div class=\"mui-card\">\n            <ul class=\"mui-table-view\">\n                <li class=\"mui-table-view-cell\" v-if=\"lunchShow\"  >\n                    <a class=\"mui-navigate-right\" @click=\"onSelect('lunch')\"  :class=\"{disabled:!lunch}\" >\n                        午餐 <span v-show=\"!lunch\">(今日已过期)</span>\n                    </a>\n                </li>\n                <li class=\"mui-table-view-cell\" v-if=\"dinnerShow\"  >\n                    <a  class=\"mui-navigate-right\"  @click=\"onSelect('dinner')\"    :class=\"{disabled:!dinner}\"  >\n                        晚餐 <span v-show=\"!dinner\">(今日已过期)</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div v-show=\"view=='goods'\">\n        <div v-if=\"canDH\">\n            <div v-if=\"!hasDH\">\n                <div class=\"weui_cells_title\">取货日期</div>\n                <form class=\"mui-input-group\">\n                    <div class=\"mui-input-row mui-radio\" v-for=\"d in gDate\" @click=\"selectDHdate(d)\">\n                        <label :for=\"d.week\">{{d.value}} {{d.week}}</label>\n                        <input name=\"date\" type=\"radio\"  v-model=\"gParams.mdate\"  :value=\"d.value\" :id=\"d.week\">\n                    </div>\n                </form>\n                <div class=\"weui_cells_title\">取货时间</div>\n                <div class=\"mui-card\">\n                    <ul class=\"mui-table-view\">\n                        <li class=\"mui-table-view-cell\" v-if=\"selectDH.mtime.morning\" >\n                            <a  v-if=\"!checkHasOrder(selectDH,'morning')\" v-link=\"{path:'/goods/'+selectDH.value +'/morning/all'}\" class=\"mui-navigate-right\" >\n                                上午\n                            </a>\n                            <a href=\"javascript:;\" v-else >\n                                上午   <span class=\"mui-badge \">已预订</span>\n                            </a>\n\n                        </li>\n                        <li class=\"mui-table-view-cell\" v-if=\"selectDH.mtime.noon\"   >\n                            <a  v-if=\"!checkHasOrder(selectDH,'noon')\" v-link=\"{path:'/goods/'+selectDH.value +'/noon/all'}\"  class=\"mui-navigate-right\" >\n                                中午\n                            </a>\n                            <a href=\"javascript:;\" v-else >\n                                中午   <span class=\"mui-badge \">已预订</span>\n                            </a>\n                        </li>\n                        <li class=\"mui-table-view-cell\" v-if=\"selectDH.mtime.afternoon\"   >\n                            <a  v-if=\"!checkHasOrder(selectDH,'afternoon')\"  v-link=\"{path:'/goods/'+selectDH.value +'/afternoon/all'}\"  class=\"mui-navigate-right\" >\n                                下午\n                            </a>\n                            <a href=\"javascript:;\" v-else >\n                                下午   <span class=\"mui-badge\">已预订</span>\n                            </a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n            <div v-else>\n                <ul class=\"mui-table-view\">\n                    <li class=\"mui-table-view-cell\" style=\"text-align: center\">\n                        您本周已经订货。\n                    </li>\n                </ul>\n\n                <div class=\"mui-content-padded\">\n                    <a class=\"mui-btn mui-btn-block mui-btn-success\" v-link=\"{path:'/list/goods'}\" >查看订单</a>\n                </div>\n            </div>\n        </div>\n        <div v-if=\"!canDH\">\n            <ul class=\"mui-table-view\">\n                <li class=\"mui-table-view-cell\" style=\"text-align: center\">\n                    本周开放预定已经结束,请下周预定。\n                </li>\n            </ul>\n        </div>\n        <!--<ul class=\"mui-table-view\">-->\n        <!--<li class=\"mui-table-view-cell\" v-for=\"d in gDate\">-->\n        <!--<a v-link=\"{path:'/goods/'+d.value +'/all'}\" class=\"mui-navigate-right\">-->\n        <!--{{d.value}} {{d.week}}-->\n        <!--</a>-->\n        <!--</li>-->\n        <!--</ul>-->\n    </div>\n\n</div>\n\n<c-nav view=\"order\"></c-nav>\n",
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
            selectDH:{
                mtime:{}
            },
            canDH:true,
            lunch:true,
            dinner:true,
            lunchShow:true,
            dinnerShow:true,
            view:"food",
            goods:store.state,
            hasDH:false
        }
    },
    methods:{
        render: function () {
            this.renderDate();
            this.renderGDate();
            this.selectWeek();
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

                    Service.getDate({max:7},function (date) {
                        self.canDH = self.checkDh(rep.config);
                        self.gDate = self.getGDate(rep,date);
                        if(self.gDate.length>0){
                            self.gParams.mdate = self.gDate[0].value;
                            self.selectDH = self.gDate[0];
                        }
                        layer.closeAll();
                    })


            });

        },
        selectDHdate: function (obj) {
            this.selectDH = obj;
        },
        checkDh: function (config) {
            var begin = new Date();
            var w = begin.getDay();
            if(w > config.end.week){
                return false;
            }

            begin.setDate(begin.getDate()+config.begin.week - w);
            var b = config.begin.time.split(":");
            begin.setHours(parseInt(b[0]));
            var bstr = begin.setMinutes(parseInt(b[1]));


            var end = new Date();
            end.setDate(end.getDate()+config.end.week - w);
            var e = config.end.time.split(":");
            end.setHours(parseInt(e[0]));
            var estr = end.setMinutes(parseInt(e[1]));

            var nowstr = new Date().getTime();
            if(bstr < nowstr && nowstr < estr){
                return true;
            }else{
                return false;
            }
        },
        getGDate: function (data,date) {
            var weeks = data.config.week,list = [];

            for (var i = 0; i < date.length; i++) {
                var obj = date[i];
                for(var w in weeks){
                    if(obj.week == this._weekName(w)){
                        if(weeks[w]["afternoon"]||weeks[w]["noon"]||weeks[w]["morning"]){
                            obj["mtime"] = weeks[w];
                            list.push(obj);
                        }
                    }

                }
            }
            return list;


        },
        _weekName: function (w) {
            switch (parseInt(w)){
                case 0:{
                    return "周日";
                }break;
                case 1:{
                    return "周一";
                }break;
                case 2:{
                    return "周二";
                }break;
                case 3:{
                    return "周三";
                }break;
                case 4:{
                    return "周四";
                }break;
                case 5:{
                    return "周五";
                }break;
                case 6:{
                    return "周六";
                }break;
            }
        },
        onSelect: function (type) {
            this.params.mtime = type;
            if(this[type]){
                this.$router.go({name:"table",params:{mtime:this.params.mtime,mdate:this.params.mdate,num:this.params.num}});
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
        },
        hasConfig: function (type,w) {
            var config = this.$root.config;
            return config.week[w][type];
        },
        selectWeek: function (v) {

            var w = (new Date).getDay();
            switch (v){
                case "周日":{
                    w = 0;
                }break;
                case "周一":{
                    w = 1;
                }break;
                case "周二":{
                    w = 2;
                }break;
                case "周三":{
                    w = 3;
                }break;
                case "周四":{
                    w = 4;
                }break;
                case "周五":{
                    w = 5;
                }break;
                case "周六":{
                    w = 6;
                }break;
            }

            this.lunchShow = this.hasConfig("lunch",w);
            this.dinnerShow = this.hasConfig("dinner",w);
        },
        checkHasOrder: function (obj,mtime) {
            var goods = this.goods.goods;
            var bool = false;
            goods.forEach(function (g) {
                if(g.state == 1){
                    if(g.mdate == obj.value&& g.mtime == mtime){
                        bool = true;
                    }

                }
            });
            return bool;
        },
        checkHasDh: function (goods) {
            var bool = false;
            goods.forEach(function (g) {
                if(g.state == 1){
                    bool =true;
                }
            });
            this.hasDH = bool;
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

        },
        goods:{
            deep:true,
            handler: function (state) {
                this.checkHasDh(state.goods);

            }
        }
    },
    route:{
        data: function () {
            this.checkHasDh(this.goods.goods);
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

        setInterval(function () {
            Service.getCtx("dh_config",function (rep) {
                self.gconfig = rep.config;
            });
        },60000);

        store.getOrders();
        store.getGoods();
         //FastClick.attach(document.body);
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
    "/goods/:mdate/:mtime/:mode":{
        component: function (resolve) {
            require.async(["components/page/goods/goods"], function (p) {
                resolve(p);
            });
        }
    },
    "/order/goods/detail/:oid/:mode":{
        component: function (resolve) {
            require.async(["components/page/goods/goods"], function (p) {
                resolve(p);
            });
        }
    },
    "/food/:oid/:view/:mode":{
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
    "/list/:view":{//订单列表
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
    },
    "list/good/:id":{
        component: function (resolve) {
            require.async(["components/page/list/good/good"], function (p) {
                resolve(p);
            });
        }
    }
});

layer.open({type:2});
Service.getCtx("dc_config", function (rep) {
    Service.getCtx("dh_config",function (dhrep) {
        router.start(App.extend({
            data: function () {
                return {
                    config:rep.config,
                    gconfig:dhrep.config
                }
            }
        }), '#app');
        layer.closeAll();
    });
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


            //L.tileLayer.zoomify('./static/images/tables/', {
            //    width: w,
            //    height: h,
            //    tolerance: 0.8,
            //    attribution: '二楼小餐厅分布图'
            //}).addTo(this.map);

            var img = new L.imageOverlay("./static/images/tables/bg.jpg",[[90,-180],[-78,38]]).addTo(this.map);
            this.featureLayer = new L.featureGroup().addTo(this.map);

            this.textLayer = new L.featureGroup().bringToFront().addTo(this.map);

            this.map.on("zoomstart", function () {
                self.map.removeLayer(self.featureLayer);
            });
            this.map.on("zoomend", function () {
                self.featureLayer.addTo(self.map);
            });
            this.map.setZoom(2);


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
                case 3:
                case 1:return "#E8AA54";break;
                default:return "#fef1c9";break;
            }
        },
        renderHot: function (data) {
            var self = this,feature="";
            if(data.table.position.type == "rectangle"){
                feature = new L.rectangle(data.table.position.latlngs,{weight:1,fillColor:this.getStateColor(data.state),fillOpacity:data.state==1?0.6:0.5,data:data}).addTo(this.featureLayer);

            }else{
                feature = new L.circle(data.table.position.latlng,data.table.position.radius,{weight:1,fillColor:this.getStateColor(data.state),fillOpacity:data.state==1?0.6:0.5,data:data}).addTo(this.featureLayer);

            }
            feature.on("click", function () {

                self.table = this.options.data.table;
                if(this.options.data.user){

                    layer.open({
                        content:"该桌已被<strong> "+this.options.data.user.name +" </strong>预定!",
                        btn: ['确认'],
                        shadeClose: true,
                        yes: function(){
                            layer.closeAll();
                        }
                    });
                }else{
                    layer.open({
                        title:"订单确认",
                        content: self.getDialogInfo(),
                        btn: ['确认', '取消'],
                        shadeClose: true,
                        yes: function(){
                            self.order();
                        }, no: function(){
                        }
                    });
                }



            });

            var center = feature.getBounds().getCenter();
            var divIcon = new L.divIcon({html:data.table.seat+"座",className:"table-icon",iconSize:[30,20],iconAnchor:[-10,23]});
            var marker = new L.marker(center,{icon:divIcon}).addTo(this.textLayer);
            marker.on("click", function () {
                feature.fire("click");
            })

        },
        getDialogInfo: function () {
            return this.$interpolate("<table class='table-info'>" +
                "<tr><td>日期:</td><td>{{params.mdate}}</td></tr>" +
                "<tr><td>餐次:</td><td>{{params.mtime=='lunch'?'午餐':'晚餐'}}</td></tr>" +
                "<tr><td>就餐人数:</td><td>{{params.num}}人</td></tr>" +
                "<tr><td>桌位:</td><td>{{table.type==0?'包间':'大厅'}}{{table.no}}号</td></tr>" +
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
                    time:1,
                    shadeClose:false
                });
                setTimeout(function () {
                    layer.closeAll();
                    store.getOrders();
                    self.renderTable();
                    self.$router.replace("/food/"+rep._id+"/list/all");
                },1000);
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
            this.params = $.extend(this.params,transition.to.params);
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
                self.types = rep.types.types.sort(function (a,b) {
                    if(!a.sort){a.sort=0}
                    if(!b.sort){b.sort=0}
                    return a.sort - b.sort;
                });
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
var Service =require("main/service.js");

module.exports = Vue.extend({
    template:"<div class=\"mui-content p-config\">\n    <header>\n\n\n        <img :src=\"user.headImgUrl\" alt=\"\" class=\"img-circle\">\n        <h5>{{user.nickname}}</h5>\n\n    </header>\n\n    <ul class=\"mui-table-view\">\n        <li class=\"mui-table-view-cell\">\n            <a href=\"\" class=\"mui-navigate-right\">\n                历史订单\n                <span class=\"mui-badge\">开发中</span>\n            </a>\n        </li>\n        <li class=\"mui-table-view-cell\">\n            <a href=\"\" class=\"mui-navigate-right\">\n                帮助文档\n                <span class=\"mui-badge\">制作中</span>\n            </a>\n        </li>\n    </ul>\n    <!--<div class=\"mui-content-padded\">-->\n        <!--<a href=\"\" class=\"mui-btn mui-btn-block mui-btn-warning\">-->\n            <!--<span class=\"mui-icon mui-icon-close\"></span>-->\n            <!--解除绑定-->\n        <!--</a>-->\n    <!--</div>-->\n\n</div>\n<c-nav view=\"config\"></c-nav>",
    data: function () {
        return {
            user:{}
        }
    },
    methods:{
        render: function () {
            this.getInfo();
        },
        getInfo: function () {
            var self = this;
            Service.getUserInfo(function (rep) {
                self.user = rep;
            });
        }
    },
    ready: function () {
        this.render();
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
    template:"<div class=\"navbar\">\n    <div class=\"bd\" style=\"height: 100%;\">\n        <div class=\"weui_tab\">\n            <div class=\"weui_navbar\">\n                <div :class=\"{weui_bar_item_on:view=='food'}\" @click=\"onChangeView('food')\" class=\"weui_navbar_item \">\n                    我的订餐\n                </div>\n                <div :class=\"{weui_bar_item_on:view=='goods'}\" @click=\"onChangeView('goods')\"  class=\"weui_navbar_item\">\n                    我的订货\n                </div>\n            </div>\n            <div class=\"weui_tab_bd\">\n\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"mui-content\" v-if=\"view=='food'\" >\n\n    <ul class=\"mui-table-view\" style=\"margin-bottom: 50px\">\n        <li style=\"text-align: center\" v-show=\"count ==0\">\n            暂无订单\n        </li>\n        <li class=\"mui-table-view-cell mui-media\" v-for=\"l in list.orders\" v-if=\"l.state>0\">\n            <a class=\"mui-navigate-right\" @click=\"goTo(l)\">\n                <div class=\"mui-media-body\">\n                    {{l.mdate}} {{l.mtime==\"lunch\"?\"午餐\":\"晚餐\"}}\n                    <p class='mui-ellipsis'>{{l.table.no}}号桌({{l.table.type==0?\"包间\":\"大厅\"}})  {{l.number}}人</p>\n                </div>\n                <span class=\"mui-badge mui-badge-primary\" v-if=\"l.menu.length>0&&!checkExpire(l)\">已点餐</span>\n                <span class=\"mui-badge \" v-if=\"checkExpire(l)\">已过期</span>\n            </a>\n        </li>\n    </ul>\n</div>\n\n<div class=\"mui-content\"  v-if=\"view=='goods'\" >\n\n    <ul class=\"mui-table-view\" style=\"margin-bottom: 50px\">\n        <li style=\"text-align: center\" v-show=\"gcount ==0\">\n            暂无订单\n        </li>\n        <li class=\"mui-table-view-cell mui-media\" v-for=\"l in list.goods\" v-if=\"l.state>0\">\n            <a class=\"mui-navigate-right\" @click=\"goTo2(l)\">\n                <div class=\"mui-media-body\">\n                    {{l.mdate}} {{getName(l.mtime)}}\n                    <p class='mui-ellipsis'></p>\n                </div>\n                <span v-if=\"!checkExpire2(l)\" class=\"mui-badge mui-badge-primary\" v-show=\"l.items.length>0\" >已订货</span>\n                <span v-if=\"checkExpire2(l)\" class=\"mui-badge \">已过退订时间</span>\n            </a>\n        </li>\n    </ul>\n</div>\n\n<c-nav view=\"list\"></c-nav>",
    data: function () {
        return {
            list:store.state,
            goods:store.goods,
            view:"food"
        }
    },
    methods:{
        goTo: function (l) {
            if(this.checkExpire(l)&& l.menu.length>0){
                this.$router.go("/list/food/"+ l._id);
            }else{
                layer.open({type:2});
                this.$router.go("/food/"+ l._id+ (l.menu.length>0?"/menu/order":"/list/all"));
            }
        },
        goTo2: function (l) {
          if(this.checkExpire2(l)) {
              this.$router.go("/list/good/"+ l._id);
          }else{
             this.$router.go('/order/goods/detail/'+l._id +'/'+(l.items.length>0?'order':'all'));
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
        },
        checkExpire2: function (d) {
            var now = new Date();
            var w = now.getDay();
            var nowstr = now.valueOf();
            var config = this.$root.gconfig;
            var end = new Date();
            end.setDate(end.getDate()+config.end.week - w);
            var e = config.end.time.split(":");
            end.setHours(parseInt(e[0]));
            var estr = end.setMinutes(parseInt(e[1]));
            return now > estr;

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
        },
        gcount: function () {
            var c = 0;
            this.list.goods.forEach(function (l) {
                if(l.state > 0){
                    c++;
                }
            });
            return c;
        }
    },
    route:{
        data: function () {
            var v = this.$route.params.view;
            this.view = v;
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

;/*!/components/page/list/good/good.js*/
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
