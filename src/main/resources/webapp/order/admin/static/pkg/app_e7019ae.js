;/*!/components/component/form/form.js*/
define('form/form', function(require, exports, module) {

/**
 * Created by jack on 16/4/7.
 */

var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-form",{
    template:"<div class=\"c-form\">\n    <div class=\"modal fade\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\"  aria-label=\"Close\"><span aria-hidden=\"true\"  @click=\"hideModal\">&times;</span></button>\n                    <h4 class=\"modal-title\">{{config.title}}</h4>\n                </div>\n                <div class=\"modal-body\">\n                   <slot>\n\n                   </slot>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\"  @click=\"hideModal\">取消</button>\n                    <button type=\"button\" class=\"btn btn-primary\" @click=\"onSubmit\">确定</button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>",
    props:["config"],
    data: function () {
        return {
        }
    },
    methods:{
        toggle:function(){
            this.config.show?this.$modal.modal("show"):this.$modal.modal("hide");
        },
        hideModal: function () {
            this.config.show = false;
        },
        onSubmit: function () {
            this.$dispatch("submit");
        }
    },
    watch:{
        config:{
            deep:true,
            handler:function(){
                this.toggle();
            }
        }
    },
    ready:function(){
        var self = this;
        this.$modal = $(this.$el).find(".modal");
        this.$modal.on("click", function (e) {
            if($(e.target).hasClass("in")){
                self.config.show =false;
            }

            e.stopPropagation();
        })
    }
});

});

;/*!/components/component/header/header.js*/
define('header/header', function(require, exports, module) {

/**
 * Created by jack on 16/4/3.
 */

var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-header", {
    template:"<div>\n    <div class=\"logo\">\n        <strong>订餐管理后台</strong>\n    </div>\n    <div class=\"user\">\n        <img class=\"img-circle\" src=\"/order/admin/static/images/my.jpg\" data-holder-rendered=\"true\" style=\"width: 80px; height: 80px;\">\n        <h5>admin</h5>\n    </div>\n\n    <div class=\"list-group\">\n        <a v-for=\"m in menus\" v-link=\"{path:'/'+m.key}\" class=\"list-group-item\" title=\"{{m.name}}\" :class=\"{active:m.key == view}\">\n            <span class=\"glyphicon  pull-right\" :class=\"m.className\"  title=\"{{m.name}}\" ></span>\n            &nbsp;{{m.name}}\n        </a>\n    </div>\n</div>",
    props:["view"],
    data: function () {
        return {
            menus:[
                {
                    name:"统计报表",
                    key:"stat",
                    className:"glyphicon-file"
                },{
                    name:"菜单管理",
                    key:"menu",
                    className:"glyphicon-list-alt"

                } ,{
                    name:"餐桌管理",
                    key:"table",
                    className:"glyphicon-inbox"
                },{
                    name:"货品管理",
                    key:"goods",
                    className:"glyphicon-compressed"
                }
                ,{
                    name:"订餐订单管理",
                    key:"order",
                    className:"glyphicon-shopping-cart"
                }
                ,{
                    name:"货物订单管理",
                    key:"gOrder",
                    className:"glyphicon glyphicon-phone-alt"
                }
                ,{
                    name:"公告管理",
                    key:"notice",
                    className:"glyphicon-list"
                },{
                    name:"系统配置",
                    key:"config",
                    className:"glyphicon-asterisk"
                }
            ]
        }
    },
    ready: function () {

    }
});

});

;/*!/components/component/main/service.js*/
define('main/service', function(require, exports, module) {

/**
 * Created by jack on 16/2/21.
 */

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
            window.location.href="/order/admin/login.html";
        }
    }
}

$.del = function (url,callback) {
    return $.ajax({
        url:url,
        type:"delete",
        contentType:"application/json",
        dataType:"json",
        success:callback,
        error:callback
    })
};

$.put = function (url,p,callback) {
    return $.ajax({
        url:url,
        type:"put",
        data:p,
        contentType:"application/json",
        dataType:"json",
        success:callback,
        error:callback
    });
};

$.get_s = function (url,p,callback) {
    return $.ajax({
        url:url,
        type:"get",
        data:p,
        contentType:"application/json",
        dataType:"json",
        success:callback,
        error:callback
    });
};


function getDate(c){
    $.get_s(prefix +"/api/date.json",{}, co(c));
}

function getTable(c){
    $.get_s(prefix +"/admin/data/table/items.json?sorts={no:1}",{},co(c));
}

function addTable(p,c){
    $.post(prefix +"/admin/data/table/insert.json",p,co(c));
}

function delTable(id,c){
    $.del(prefix +"/admin/data/table/{id}.json".replace("{id}",id),co(c));
}

function updateTable(id,p,c){
    $.put(prefix +"/admin/data/table/{id}.json".replace("{id}",id), p,co(c));
}

//菜品管理
function getMenus(p,c){
    $.get_s(prefix +"/admin/data/dish/items.json",p,co(c));
}

function updateMenu(id,p,c){
    $.put(prefix +"/admin/data/dish/{id}.json".replace("{id}",id),p,co(c));
}

//上传照片
function upPicture(p,c){
    $.post(prefix +"/admin/data/image.json",p,co(c));
}

//添加菜品
function addMenu(p,c){
    $.post(prefix +"/admin/data/dish/insert.json",p,co(c));
}

function delMenu(id,c){
    $.del(prefix +"/admin/data/dish/{id}.json".replace("{id}",id),co(c));
}

function getNotices(c){
    $.get_s(prefix +"/admin/data/notice/items.json",{},co(c));
}

function putCtx(id,p,c){
    $.put(prefix +"/admin/data/ctx.json?app="+id,p,co(c));
}

function getCtx(id,c){
    $.get_s(prefix +"/data/ctx.json?app="+id,{},co(c));
}

function getOrders(p,c){
    $.get_s(prefix +"/admin/data/order/items.json",p,co(c));
}
function getOrder(id,c){
    $.get_s(prefix +"/admin/data/order/{id}.json".replace("{id}",id),{},co(c));
}

function updateOrder(id,p,c){
    $.put(prefix +"/admin/data/order/{id}.json".replace("{id}",id),p,co(c));
}


function delOrder(id,c){
    $.del(prefix +"/admin/data/order/{id}.json".replace("{id}",id),co(c));
}

function delNotice(id,c){
    $.del(prefix +"/admin/data/notice/{id}.json".replace("{id}",id),co(c));
}

function getGoods(p,c){
    $.get_s(prefix +"/admin/data/goods/items.json",p,co(c));
}

function insertGoods(p,c){
    $.post(prefix +"/admin/data/goods/insert.json",p,co(c));
}

function updateGoods(id,p,c){
    $.put(prefix +"/admin/data/goods/{id}.json".replace("{id}",id),p,co(c));
}

function delGoods(id,c){
    $.del(prefix +"/admin/data/goods/{id}.json".replace("{id}",id),co(c));
}

function getGoodsOrder(p,c){
    $.get_s(prefix +"/admin/data/basket/items.json",p,co(c));
}

function delGoodsOrder(id,c){
    $.del(prefix +"/admin/data/basket/{id}.json".replace("{id}",id),co(c));
}

function updateGoodsOrder(id,p,c){
    $.put(prefix +"/admin/data/basket/{id}.json".replace("{id}",id),p,co(c));
}

function getGoodsOrderById(id,c){
    $.get_s(prefix +"/admin/data/basket/{id}.json".replace("{id}",id),{},co(c));
}

function getDepts(c){
    $.get_s(prefix +"/data/user/finddepts.json",{},co(c));
}

function getPackage(c){
    $.get_s(prefix +"/admin/data/pack/items.json",{},co(c));
}

function delPackage(id,c){
    $.del(prefix +"/admin/data/pack/{id}.json".replace("{id}",id),co(c));
}

function getPackageById(id,c){
    $.get_s(prefix +"/admin/data/pack/{id}.json".replace("{id}",id),co(c));
}

function addPackage(p,c){
    $.post(prefix +"/admin/data/pack/insert.json",p,co(c));
}

function getOrderStat(p,c){
    $.post(prefix +"/data/order/statistics/"+ p.start+"/"+ p.end+".json",co(c));
}

function getGoodsStat(p,c){
    $.post(prefix +"/data/basket/statistics/"+ p.start+"/"+ p.end+".json",co(c));
}

function updatePackage(id,p,c){
    $.put(prefix +"/admin/data/pack/{id}.json".replace("{id}",id),p,co(c));
}


module.exports = {
    getGoodsStat:getGoodsStat,
    getOrderStat:getOrderStat,
    updatePackage:updatePackage,
    addPackage:addPackage,
    getPackageById:getPackageById,
    delPackage:delPackage,
    getPackage:getPackage,
    getDate:getDate,
    getTable:getTable,
    delTable:delTable,
    updateTable:updateTable,
    getMenus:getMenus,
    delMenu:delMenu,
    updateMenu:updateMenu,
    upPicture:upPicture,
    addMenu:addMenu,
    addTable:addTable,
    getNotices:getNotices,
    putCtx:putCtx,
    getCtx:getCtx,
    getOrders:getOrders,
    getOrder:getOrder,
    delOrder:delOrder,
    updateOrder:updateOrder,
    delNotice:delNotice,
    getGoods:getGoods,
    insertGoods:insertGoods,
    updateGoods:updateGoods,
    delGoods:delGoods,
    getGoodsOrder:getGoodsOrder,
    delGoodsOrder:delGoodsOrder,
    getGoodsOrderById:getGoodsOrderById,
    updateGoodsOrder:updateGoodsOrder,
    getDepts:getDepts
};

});

;/*!/components/component/nav/nav.js*/
define('nav/nav', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */


var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-nav", {
    template:"<nav>\n    <span class=\"nav-header\">订餐管理后台</span>\n\n    <a href=\"javascript:;\" class=\"btn btn-primary active btn-toggle\" @click=\"toggle\">\n        <span class=\"glyphicon glyphicon-list\"></span>\n    </a>\n\n    <a href=\"login.html\" class=\"pull-right text-warning\">\n        <span class=\"glyphicon glyphicon-log-out\"></span>\n        注销\n    </a>\n</nav>",
    ready: function () {
        
    },
    methods:{
        toggle: function () {
            $(this.$root.$el).toggleClass("hidden-header");
        }
    }
});

});

;/*!/components/page/stat/food/food.js*/
define('components/page/stat/food/food', function(require, exports, module) {

/**
 * Created by jack on 16/5/31.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");


module.exports = Vue.extend({
   template:"<table class=\"table  table-bordered table-hover\">\n    <tr>\n        <th>#</th>\n        <th>菜名</th>\n        <th>数量</th>\n        <th>单价</th>\n        <th>订餐总人数</th>\n        <th>总金额</th>\n    </tr>\n    <tr v-for=\"v in list\">\n        <td>{{$index + 1}}</td>\n        <td>{{v.name}}</td>\n        <td>{{v.num}}</td>\n        <td>{{v.price}}/{{v.unit}}</td>\n        <td>{{v.persons}}</td>\n        <td>{{v.amount  | currency \"¥\"}}</td>\n    </tr>\n    <tr v-if=\"list.length>0\">\n        <td colspan=\"5\">合计</td>\n        <td>{{count | currency \"¥\"}}</td>\n    </tr>\n</table>",
    props:["params"],
    data: function () {
        return {
            list:[]
        }
    },
    methods:{
      render: function () {
          
      },
      query: function () {
          var self = this;
          Service.getOrderStat(this.params,function (rep) {
              self.list = rep;
          })
      }
    },
    computed:{
      count: function () {
          var count = 0;
          this.list.forEach(function (v) {
            count += v.amount;
          });
          return count;
      }  
    },
    events:{
        onQuery: function () {
            this.query();
        }
    },
    ready: function () {

    }
});

});

;/*!/components/page/stat/good/good.js*/
define('components/page/stat/good/good', function(require, exports, module) {

/**
 * Created by jack on 16/5/31.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");


module.exports = Vue.extend({
   template:"<table class=\"table  table-bordered table-hover\">\n    <tr>\n        <th>#</th>\n        <th>货名</th>\n        <th>数量</th>\n        <th>单价</th>\n        <th>预定次数</th>\n        <th>总金额</th>\n    </tr>\n    <tr v-for=\"v in list\">\n        <td>{{$index + 1}}</td>\n        <td>{{v.name}}</td>\n        <td>{{v.num}}</td>\n        <td>{{v.price}}/{{v.unit}}</td>\n        <td>{{v.times}}</td>\n        <td>{{v.amount  | currency \"¥\"}}</td>\n    </tr>\n    <tr v-if=\"list.length>0\">\n        <td colspan=\"5\">合计</td>\n        <td>{{count | currency \"¥\"}}</td>\n    </tr>\n</table>",
    props:["params"],
    data: function () {
        return {
            list:[]
        }
    },
    methods:{
      render: function () {
          
      },
      query: function () {
          var self = this;
          Service.getGoodsStat(this.params,function (rep) {
              self.list = rep;
          })
      }
    },
    computed:{
        count: function () {
            var count = 0;
            this.list.forEach(function (v) {
                count += v.amount;
            });
            return count;
        }
    },
    events:{
        onQuery: function () {
            this.query();
        }
    },
    ready: function () {

    }
});

});

;/*!/components/page/stat/stat.js*/
define('components/page/stat/stat', function(require, exports, module) {

/**
 * Created by jack on 2015/12/2.
 */
var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var echarts = require("component_modules/echarts.min.js");
var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div class=\"page-stat\" >\n\n    <div class=\"panel panel-default content\">\n        <div class=\"panel-heading\">\n\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" class=\"active\">\n\t\t\t\t\t<div class=\"dropdown\">\n\t\t\t\t\t\t<a id=\"dLabel\" href=\"javascript:;\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n\t\t\t\t\t\t\t{{this.params.mode == 'food'?'订餐统计':'订货统计'}}\n\t\t\t\t\t\t\t<span class=\"caret\"></span>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t\t<ul class=\"dropdown-menu\" aria-labelledby=\"dLabel\">\n\t\t\t\t\t\t\t<li><a href=\"javascript:;\" @click=\"changeMode('food')\">订餐统计</a></li>\n\t\t\t\t\t\t\t<li><a href=\"javascript:;\" @click=\"changeMode('good')\">订货统计</a></li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n                <li role=\"presentation\" :class=\"{active:params.type == 'month'}\" ><a href=\"javascript:;\" @click=\"onChangeView('month')\">\n                    月报</a></li>\n                <li role=\"presentation\" :class=\"{active:params.type == 'year'}\"><a href=\"javascript:;\"  @click=\"onChangeView('year')\">\n                    年报</a></li>\n            </ul>\n\n\t\t\t<a href=\"javascript:;\"class=\"btn pull-right\" @click=\"onPrint\">\n\t\t\t\t<span class=\"glyphicon glyphicon-print\"></span>\n\t\t\t\t打印\n\t\t\t</a>\n        </div>\n\t\t<div class=\"panel-body\" style=\"width: 100%\">\n\t\t\t<form class=\"form-inline\">\n\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t<label >统计时间</label>\n\t\t\t\t\t<input type=\"text\" id=\"stat-datepick\" v-model=\"date\" @click=\"renderDatePicker\"  placeholder=\"请选择时间\" class=\"form-control\">\n\t\t\t\t</div>\n\t\t\t\t<a class=\"btn btn-default\" @click=\"onQuery\">\n\t\t\t\t\t<span class=\"glyphicon glyphicon-search\"></span>\n\t\t\t\t\t查询</a>\n\t\t\t</form>\n\t\t\t<hr/>\n\t\t\t<div id=\"stat-wrap\">\n\t\t\t\t<div is=\"food\" v-if=\"params.mode=='food'\" :params=\"params\"></div>\n\t\t\t\t<div is=\"good\"  :params=\"params\" v-else></div>\n\t\t\t</div>\n\t\t</div>\n    </div>\n\n</div>",
    data: function () {
        return {
            date:"",
            params:{
                type:"month",
                mode:"food",
                start:"",
                end:""
            }
        }
    },
    methods:{
        render: function () {
            var format = "yyyy-MM";
            if(this.params.type == "year"){
                format = "yyyy";
            }
            this.date = new Date().Format(format);
        },
        changeMode: function (v) {
            this.params.mode = v;
        },
        onChangeView: function (v) {
          this.params.type = v;
            this.render();
        },
        renderDatePicker: function () {
            var self = this;
            var format = "YYYY-MM";
            if(this.params.type == "year"){
                format = "YYYY";
            }
            laydate({istime: true,format: format,choose: function (datas) {
                self.date = datas;
            }});
        },
        onQuery: function () {
            this.$broadcast("onQuery");
        },
        onPrint: function () {
            $("#stat-wrap").jqprint();
        }
    },
    watch:{
        date: function (d) {
            if(this.params.type == "month"){
                this.params.start  = d +"-01";
                this.params.end  = d +"-31";
            }else{
                this.params.start  = d +"-01-01";
                this.params.end  = d +"-12-31";
            }
        }
    },
    components:{
      food: require("components/page/stat/food/food"),
      good: require("components/page/stat/good/good")
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


var stat = require("components/page/stat/stat");
var loading = require("components/page/loading/loading");
var header = require("header/header.js");

var vaild = require("component_modules/vue-validator.js");

Vue.use(Router);
Vue.use(vaild);


store = {
    view:"loading"
};

function mixin(p,view){
    return p.extend({
        route:{
            activate: function (transition) {
                store.view = view;
                transition.next();
            }
        }
    })
}


router = new Router();
var App = Vue.extend({
    data: function () {
        return {
            store:store
        }
    }
});

router.redirect({
    "/":"/stat"
});

router.map({
    "/stat":{
        component:function (resolve) {
            resolve(mixin(stat,"stat"));
        }
    },
    "/table":{
        component: function (resolve) {
            require.async(["components/page/table/table"], function (p) {
                resolve(mixin(p,"table"));
            });
        }
    },
    "/order":{
        component: function (resolve) {
            require.async(["components/page/order/order"], function (p) {
                resolve(mixin(p,"order"));
            });
        }
    },
    "/order/:oid":{
        component: function (resolve) {
            require.async(["components/page/order/detail/detail"], function (p) {
                resolve(mixin(p,"detail"));
            });
        }
    },
    "/order/goods/:oid":{
        component: function (resolve) {
            require.async(["components/page/gOrder/detail/detail"], function (p) {
                resolve(mixin(p,"detail"));
            });
        }
    },
    "/notice":{
        component: function (resolve) {
            require.async(["components/page/notice/notice"], function (p) {
                resolve(mixin(p,"notice"));
            });
        }
    },
    "/order":{
        component: function (resolve) {
            require.async(["components/page/order/order"], function (p) {
                resolve(mixin(p,"order"));
            });
        }
    },
    "/notice/add": {
        component: function (resolve) {
            require.async(["components/page/notice/add/add"], function (p) {
                resolve(mixin(p,"notice-add"));
            });
        }
    },
    "/config":{
        component: function (resolve) {
            require.async(["components/page/config/config"], function (p) {
                resolve(mixin(p,"config"));
            });
        }
    },
    "/menu":{
        component: function (resolve) {
            require.async(["components/page/menu/menu"], function (p) {
                resolve(mixin(p,"menu"));
            });
        }
    },
    "/goods":{
        component: function (resolve) {
            require.async(["components/page/goods/goods"], function (p) {
                resolve(mixin(p,"goods"));
            });
        }
    },
    "gOrder":{
        component: function (resolve) {
            require.async(["components/page/gOrder/order"], function (p) {
                resolve(mixin(p,"gOrder"));
            });
        }
    },
    "/package/add":{
        component: function (resolve) {
            require.async(["components/page/menu/package/add"], function (p) {
                resolve(mixin(p,"package"));
            });
        }
    },
    "/package/edit/:id":{
        component: function (resolve) {
            require.async(["components/page/menu/package/add"], function (p) {
                resolve(mixin(p,"package"));
            });
        }
    }
});


Vue.filter("timeName", function (v) {
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
});


router.start(App, '#app');




});

;/*!/components/page/table/table.js*/
define('components/page/table/table', function(require, exports, module) {

/**
 * Created by jack on 16/4/3.
 */

var Vue = require("component_modules/vue.js");
var L = require("component_modules/leaflet-src.js");
var Service = require("main/service.js");
require("component_modules/leaflet.zoomify.js");
require("component_modules/leaflet.draw-src.js");
require("form/form.js");

var model = {
    _id:"",
    type:0,
    no:0,
    position:"",
    seat:0,
    visible:1
};

module.exports = Vue.extend({
    template:"\n<div class=\"panel panel-default page-wrap content\">\n    <div class=\"panel-heading\">\n\n        <ul class=\"nav nav-pills pull-left\">\n            <li role=\"presentation\" :class=\"{active:view=='map'}\"><a href=\"javascript:;\" @click=\"onChangeView('map')\">\n                地图</a></li>\n            <li role=\"presentation\"  :class=\"{active:view=='grid'}\"><a href=\"javascript:;\" @click=\"onChangeView('grid')\">\n                列表</a></li>\n        </ul>\n\n        <div class=\"dropdown pull-right\" v-show=\"view=='map'\">\n            <a class=\"btn dropdown-toggle\" type=\"button\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">\n                新增热区\n                <span class=\"caret\"></span>\n            </a>\n            <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\">\n                <li><a href=\"javascript:;\" @click=\"onAddRect\" >\n                    <span class=\"glyphicon glyphicon-stop\"></span>\n                    &nbsp;矩形</a></li>\n                <li><a href=\"javascript:;\" @click=\"onAddCircle\">\n                    <span class=\"glyphicon glyphicon-record\"></span>\n                    &nbsp;圆形</a></li>\n            </ul>\n        </div>\n    </div>\n    <div class=\"panel-body\" v-show=\"view=='grid'\">\n        <table class=\"table table-bordered table-hover\">\n            <tbody>\n            <tr>\n                <th>\n                    #\n                </th>\n                <th>\n                    编号\n                </th>\n                <th>\n                    类型\n                </th>\n                <th>\n                    座位数\n                </th>\n                <th>\n                    位置\n                </th>\n                <th>\n                    状态\n                </th>\n                <th>\n                    操作\n                </th>\n            </tr>\n\n            <tr v-for=\"t in tables\">\n                <td>\n                    {{$index+1}}\n                </td>\n                <td>\n                    {{t.no}}\n                </td>\n                <td>\n                    {{t.type==0?\"包厢\":\"大厅\"}}\n                </td>\n                <td>\n                    {{t.seat}}\n                </td>\n                <td>\n                    <a href=\"javascript:;\" @click=\"goTo(t._id)\">查看</a>\n                </td>\n                <td>\n                    {{t.visible==0?\"预留\":\"启用\"}}\n                </td>\n                <td>\n                    <a href=\"\">编辑</a>\n                    <a href=\"javascript:;\" @click=\"onDelTable(t)\">删除</a>\n                </td>\n            </tr>\n\n            </tbody></table>\n        <div class=\"c-pager\">\n            <p class=\"pull-left\">共 11 条记录，每页 20 条 1/1 </p>\n\n            <ul  class=\"pagination pagination-sm\">\n                <li>\n                </li>\n                <li>\n                    <a href=\"#\" aria-label=\"Previous\">\n                        <span class=\"glyphicon glyphicon-step-backward\"></span>\n                    </a>\n                </li>\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-triangle-left\"></span></a></li>\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a></li>\n\n                <li>\n                    <a href=\"#\" aria-label=\"Next\">\n                        <span class=\"glyphicon glyphicon-step-forward\"></span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div class=\"panel-body\" id=\"map\" v-show=\"view=='map'\">\n\n    </div>\n\n\n    <c-form :config=\"modal\" @submit=\"onSubmit\">\n        <validator name=\"valid\">\n            <form class=\"form-horizontal\" novalidate >\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\" :class=\"{'has-warning':$valid.no.invalid&&$valid.no.touched}\"  >编号</label>\n                    <div class=\"col-sm-10\" :class=\"{'has-warning':$valid.no.invalid&&$valid.no.touched}\">\n                        <input type=\"number\" class=\"form-control\" placeholder=\"必填\" v-validate:no=\"['required']\" v-model=\"model.no\" number>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\">类别</label>\n                    <div class=\"col-sm-10\">\n                        <select class=\"form-control\" v-model=\"model.type\" number>\n                            <option value=\"0\">包厢</option>\n                            <option value=\"1\">大厅</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\" :class=\"{'has-warning':$valid.seat.invalid&&$valid.seat.touched}\" >座位数</label>\n                    <div class=\"col-sm-10\" :class=\"{'has-warning':$valid.seat.invalid&&$valid.seat.touched}\">\n                        <input type=\"number\" class=\"form-control\" placeholder=\"必填\" v-model=\"model.seat\" v-validate:seat=\"['required']\" number>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\">状态</label>\n                    <div class=\"col-sm-10\">\n                        <select class=\"form-control\" v-model=\"model.visible\" number>\n                            <option value=\"0\">预留</option>\n                            <option value=\"1\">启用</option>\n                        </select>\n                    </div>\n                </div>\n            </form>\n        </validator>\n    </c-form>\n\n</div>\n",
    data: function () {
        return {
            view:"map",
            modal:{
                title:"新增餐桌",
                show:false
            },
            tables:[],
            count:0,
            model:$.extend({},model)
        }
    },
    methods:{
        render: function () {
            var self = this;
            self.renderMap();
            self.renderTable();
        },
        renderMap: function () {
            var w = 2484,h = 3512;
            this.map = new L.map("map",{
                center:[0,0],
                zoom:2,
                minZoom:0,
                maxZoom:3,
                attributionControl:false
            });

            L.tileLayer.zoomify('./static/images/tables/', {
                width: w,
                height: h,
                tolerance: 0.8,
                attribution: '二楼小餐厅分布图'
            }).addTo(this.map);

            this.featureLayer = new L.featureGroup().addTo(this.map);

            this.map.on("click", function (e) {
            });

            this.initDraw();
        },
        renderTable: function () {
            layer.load();
            var self = this;
            Service.getTable(function (rep) {

                self.tables = rep.lists;
                self.count = rep.count;
                self.featureLayer.clearLayers();
                self.tables.forEach(function (d) {
                    self.renderHot(d);
                });
                layer.closeAll();
            });
        },
        renderHot: function (data) {
            var self = this,feature;
            if(data.position.type == "rectangle"){
                feature = new L.rectangle(data.position.latlngs,{weight:1,data:data}).addTo(this.featureLayer);
                feature.on("click", function () {
                    this.options.data.position.latlngs = this._latlngs;
                    self.model = $.extend(self.model,this.options.data);
                    self.modal.title="更新餐桌";
                    self.modal.show = true;
                });

            }else{
                feature = new L.circle(data.position.latlng,data.position.radius,{weight:1,data:data}).addTo(this.featureLayer);
                feature.on("click", function () {
                    this.options.data.position.latlng = this._latlng;
                    this.options.data.position.radius = this._mRadius;
                    self.model = $.extend(self.model,this.options.data);
                    self.modal.title="更新餐桌";
                    self.modal.show = true;
                });
            }

            feature.editing.enable();


        },
        onAddRect: function () {
            this.model = $.extend({},model);
            this.drawRectangle.enable();
        },
        onAddCircle: function () {
            this.model = $.extend({},model);
            this.drawCircle.enable();
        },
        initDraw: function () {
            this.drawCircle = new L.Draw.Circle(this.map,{shapeOptions:{editable:true}});
            this.drawRectangle = new L.Draw.Rectangle(this.map,{shapeOptions:{editable:true}});

            var self = this;
            this.map.on("draw:created", function (t) {
                self.featureLayer.addLayer(t.layer);
                if(t.layerType == "circle"){
                    self.addTable({type: t.layerType,latlng: t.layer._latlng,radius: t.layer._mRadius});
                }else{
                    self.addTable({type: t.layerType,latlngs: t.layer._latlngs});
                }
            })
        },
        addTable: function (position) {
            this.modal.title = "新增餐桌";
            this.modal.show = true;
            this.model.position = position;
        },
        onDelTable: function (t) {
            var self = this;
            layer.confirm("确定删除该餐桌?",{btn:["确定","取消"]}, function () {
                Service.delTable(t._id, function () {
                    self.tables.$remove(t);
                    layer.closeAll();
                });
            });
        },
        onSubmit:function(){
            if(this.$valid.valid){
                layer.load(1);
                this.submit();
            }else{
                this.$validate(true);
            }
        },
        submit: function () {
            var self = this;
            layer.load();
            if(this.model._id){
                Service.updateTable(this.model._id,JSON.stringify(this.model), function (rep) {
                    self.renderTable();
                    layer.closeAll();

                });
            } else{
                Service.addTable(JSON.stringify(this.model), function (rep) {
                    self.renderTable();
                    layer.closeAll();

                })
            }
            this.modal.show = false;
        },
        goTo: function (id) {
            var self = this;
            this.view = "map";
            Vue.nextTick(function () {
                self.featureLayer.eachLayer(function (layer) {
                    if(id == layer.options.data._id){
                        setTimeout(function () {
                            self.map.setView(layer.getBounds().getCenter(),3);
                        },200);
                    }
                })
            });
        },
        onChangeView: function (v) {
            this.view = v;
        }
    },
    ready: function () {
        this.render();
    }
});

});

;/*!/components/component/state/state.js*/
define('state/state', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */


var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-state", {
    template:"<span class=\"label-primary label\" v-if=\"state==1\">未处理</span>\n<span class=\"label-danger label\" v-if=\"state==0\">下单失败</span>\n<span class=\"label-warning label\" v-if=\"state==-1\">已取消</span>\n<span class=\"label-success label\" v-if=\"state==2\">已完成</span>\n<span class=\"label-success label\" v-if=\"state==3\">已打印</span>",
    props:["state"],
    ready: function () {
        
    },
    methods:{

    }
});

});

;/*!/components/page/order/stat/stat.js*/
define('components/page/order/stat/stat', function(require, exports, module) {

/**
 * Created by jack on 16/4/4.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

require("form/form.js");
require("state/state.js");


module.exports = Vue.extend({
    template:"<div class=\"panel-body\">\n    <div class=\"form-inline\">\n        <div class=\"form-group\">\n            <label>日期</label>\n            <input type=\"text\" id=\"datepick\" class=\"form-control\" @click=\"onDateClick\" v-model=\"query.mdate\" placeholder=\"请选择\">\n        </div>\n        <div class=\"form-group\">\n            <label >餐次 </label>\n            <select class=\"form-control\" v-model=\"query.mtime\">\n                <option value=\"\">全部</option>\n                <option value=\"lunch\">午餐</option>\n                <option value=\"dinner\">晚餐</option>\n            </select>\n        </div>\n        <div class=\"form-group\">\n            <label >状态 </label>\n            <select class=\"form-control\" v-model=\"query.state\">\n                <option value=\"\">全部</option>\n                <option value=\"1\">未处理</option>\n                <option value=\"-1\">已取消</option>\n                <option value=\"3\">已打印</option>\n                <option value=\"2\">已完成</option>\n            </select>\n        </div>\n        <button class=\"btn btn-default\" @click=\"onQuery\">\n            <span class=\"glyphicon glyphicon-search\"></span>\n            查询</button>\n\n    </div>\n    <hr>\n    <div id=\"daystat\">\n        <table style=\"width: 100%\" class=\"table table-bordered table-hover table-condensed\" >\n            <tbody>\n            <tr>\n                <th>\n                    序号\n                </th>\n                <th>\n                    菜名\n                </th>\n                <th>\n                    台号\n                </th>\n                <th>\n                    序号\n                </th>\n                <th>\n                    菜名\n                </th>\n                <th>\n                    台号\n                </th>\n            </tr>\n            <!--<tr v-for=\"o in orders\">-->\n                <!--<td>{{$index+1}}</td>-->\n                <!--<td>{{o.type}}</td>-->\n                <!--<td>{{o.name}}</td>-->\n                <!--<td>{{o.price  | currency \"¥\"}}</td>-->\n                <!--<td>{{o.number}}</td>-->\n                <!--&lt;!&ndash;<td style=\"width: 300px;\">&ndash;&gt;-->\n                <!--&lt;!&ndash;<table class=\"table table-bordered table-condensed\">&ndash;&gt;-->\n                <!--&lt;!&ndash;<tr v-for=\"t in o.tables\">&ndash;&gt;-->\n                <!--&lt;!&ndash;<td style=\"width: 40%\">{{t.no}}号桌</td>&ndash;&gt;-->\n                <!--&lt;!&ndash;<td style=\"width: 30%\">{{t.number}} {{t.unit}}</td>&ndash;&gt;-->\n                <!--&lt;!&ndash;<td style=\"width: 30%\">{{t.mtime==\"dinner\"?'晚餐':'午餐'}}</td>&ndash;&gt;-->\n                <!--&lt;!&ndash;</tr>&ndash;&gt;-->\n                <!--&lt;!&ndash;</table>&ndash;&gt;-->\n                <!--&lt;!&ndash;</td>&ndash;&gt;-->\n                <!--<td>{{o.price*o.number  | currency \"¥\"}}</td>-->\n            <!--</tr>-->\n\n            <tr v-for=\"o in orders\">\n                <td>{{$index+1}}</td>\n                <td><strong style=\"font-size: 16px;\">{{o[0].name}}</strong></td>\n                <td>\n                    <span v-for=\"t in o[0].tables | orderBy 'no'\">\n                        <a style=\"font-size: 18px\" v-for=\"r in t.number\">\n                            {{t.no}}\n                        </a>\n                    </span>\n                </td>\n                <td>{{$index+orders.length+1}}</td>\n                <td><strong style=\"font-size: 18px;\">{{o[1].name}}</strong></td>\n                <td>\n                    <span v-if=\"o[1].tables\" v-for=\"t in o[1].tables | orderBy 'no'\">\n                        <a style=\"font-size:18px\" v-for=\"r in t.number\">\n                            {{t.no}}\n                        </a>\n                    </span>\n                </td>\n            </tr>\n\n            </tbody></table>\n    </div>\n</div>",
    data: function () {
        return {
            orders: [],
            count: 0,
            query: {
                page: 0,
                limit: 20,
                mtime: "",
                mdate: "",
                sorts: '{"mdate":-1}',
                state: ""
            },
            types: []
        }

    },
    methods:{
        render: function () {
            $("#datepick").val((new Date()).Format("yyyy-MM-dd"));
            var self = this;
            Service.getCtx("dc_type", function (rep) {
                self.types = rep.types.types || [];
                self.renderOrders();
            });
        },
        renderOrders: function () {
            var self = this;
            layer.load();
            var query = JSON.parse(JSON.stringify(this.query));
            query.mdate = $("#datepick").val();
            for(var i in query){
                if(!query[i]){
                    delete query[i]
                }
            }
            Service.getOrders(query,function (rep) {
                self.orders = self.stat(rep.lists);
                self.count = rep.count;
                layer.closeAll();
            })
        },
        onDateClick: function () {
            var self = this;
            laydate({istime: true, format: 'YYYY-MM-DD',choose: function (datas) {
                self.query.mdate = datas;
            }});
        },
        onQuery: function () {
            this.query.page = 0;
            this.renderOrders();
        },
        stat: function (list) {
            var result = [],menus = {};
            list.forEach(function (l) {
                if(typeof l.menu == "object"){
                    l.menu.forEach(function (m) {
                        menus[m._id]= {};
                    })
                }
            });

            for(var _id in menus){
                list.forEach(function (l) {
                    if(typeof l.menu == "object"){
                        l.menu.forEach(function (m) {
                            if(m._id == _id){
                                menus[_id].name = m.name;
                                menus[_id].picture = m.picture;
                                menus[_id].price = m.price;
                                menus[_id].type = m.type;
                                if(menus[_id].number){
                                    menus[_id].number += m.number;
                                }else{
                                    menus[_id].number = m.number;
                                }

                                if(menus[_id].tables){
                                    menus[_id].tables.push({no: l.table.no,mtime: l.mtime,number: m.number,unit: m.unit});
                                }else{
                                    menus[_id].tables = [{no: l.table.no,mtime: l.mtime,number: m.number,unit: m.unit}];
                                }

                            }
                        })
                    }
                });
                result.push(menus[_id]);
            }

            return this.toPage(result);
        },
        getTypeSort: function (key) {
            for (var i = 0; i < this.types.length; i++) {
                var obj = this.types[i];
                if(obj.key == key){
                    return obj.sort || 0;
                }
            }
        },
        toPage: function (list) {
            var self = this;
            list.sort(function (a,b) {
                return self.getTypeSort(a.type) - self.getTypeSort(b.type);
            });

            list = this.pushSpace(list);

            var limit = Math.ceil(list.length /2);
            var result = [];

            for (var i = 0; i < limit; i++) {
                result.push([list[i]||{},list[limit+i]||{}]);
            }

            return result;
        },
        pushSpace: function (list) {
            var type = {},len = 0;
            list.forEach(function (l) {
                if(!(l.type in type)){
                    len ++;
                }
                type[l.type] = true;
            });

            var result = [];
            for (var i = 0; i < list.length; i++) {
                var obj = list[i];
                if(list[i+1]){
                    result.push(obj);
                    if(obj.type != list[i+1].type){
                        result.push({});
                    }
                }else{
                    result.push(obj);
                }
            }

            return result;

        }
    },
    ready: function () {
        this.render();
    }
});

});

;/*!/components/page/order/realtime/realtime.js*/
define('components/page/order/realtime/realtime', function(require, exports, module) {

/**
 * Created by jack on 16/6/3.
 */


var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

module.exports = Vue.extend({
    template:"\n<div class=\"container-fluid page-realtime\">\n    <div class=\"row\">\n        <fieldset>\n            <legend>未处理\n                <div class=\"form-inline pull-right\">\n                    <div class=\"form-group\">\n                        <label>日期:</label>\n                        <span>{{query.mdate}}</span>\n                    </div>\n                    <div class=\"form-group\">\n                        <label>刷新时间:</label>\n                        <span>{{gettime}} ({{countdown}})</span>\n                    </div>\n\n                </div>\n            </legend>\n            <div class=\"col-sm-6 col-md-3 col-lg-2\" v-for=\"r in orders\" v-if=\"r.state==1\">\n                <div class=\"panel panel-primary\">\n                    <div class=\"panel-heading text-center\" style=\"font-size: 12px;padding: 0 5px;\">\n                        {{r.user.name}} ({{r.user.mobile}})\n                    </div>\n                    <div class=\"panel-body text-center\">\n                        <h1  >{{r.table.no}}</h1>\n                        <label>{{r.mtime==\"dinner\"?\"晚餐\":\"午餐\"}} {{r.number}}人</label>\n                    </div>\n                    <div class=\"panel-footer text-center\">\n                        <a v-link=\"{path:'order/'+r._id}\" ><span class=\"glyphicon glyphicon-list-alt\"></span></a>\n                        &nbsp;\n                        <a href=\"javascript:;\" @click=\"onPrinter(r)\"><span class=\"glyphicon glyphicon-print\"></span></a>\n                        &nbsp;\n                        <a href=\"javascript:;\" @click=\"onCancel(r)\" ><span class=\"glyphicon glyphicon-remove\"></span></a>\n                    </div>\n                </div>\n            </div>\n        </fieldset>\n        <fieldset>\n            <legend>已打印</legend>\n            <div class=\"col-sm-6 col-md-3 col-lg-2\" v-for=\"r in orders\" v-if=\"r.state==3\">\n                <div class=\"panel panel-info\">\n                    <div class=\"panel-heading text-center\" style=\"font-size: 12px;padding: 0 5px;\">\n                        {{r.user.name}} ({{r.user.mobile}})\n                    </div>\n                    <div class=\"panel-body text-center\">\n                        <h1  >{{r.table.no}}</h1>\n                        <label>{{r.mtime==\"dinner\"?\"晚餐\":\"午餐\"}} {{r.number}}人</label>\n                    </div>\n                    <div class=\"panel-footer text-center\">\n                        <a v-link=\"{path:'order/'+r._id}\" ><span class=\"glyphicon glyphicon-list-alt\"></span></a>\n                        &nbsp;\n                        <a href=\"javascript:;\"  @click=\"onCancel(r)\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n                    </div>\n                </div>\n            </div>\n        </fieldset>\n        <fieldset>\n            <legend>已取消</legend>\n            <div class=\"col-sm-6 col-md-3 col-lg-2\" v-for=\"r in orders\" v-if=\"r.state==-1\">\n                <div class=\"panel panel-warning\">\n                    <div class=\"panel-heading text-center\" style=\"font-size: 12px;padding: 0 5px;\">\n                        {{r.user.name}} ({{r.user.mobile}})\n                    </div>\n                    <div class=\"panel-body text-center\">\n                        <h1  >{{r.table.no}}</h1>\n                        <label>{{r.mtime==\"dinner\"?\"晚餐\":\"午餐\"}} {{r.number}}人</label>\n                    </div>\n                    <div class=\"panel-footer text-center\">\n                        <a href=\"javascript:;\"  @click=\"onCancel(r)\"><span class=\"glyphicon glyphicon-list-alt\"></span></a>\n                    </div>\n                </div>\n            </div>\n        </fieldset>\n    </div>\n</div>",
    data: function () {
        return {
            view:0,
            orders:[],
            count:0,
            gettime:"",
            countdown:30,
            query:{
                page:0,
                limit:999,
                mdate:new Date().Format("yyyy-MM-dd")
                //mdate:"2016-05-14"
            }
        }
    },
    methods:{
        renderOrders: function () {
            var self = this;
            var query = JSON.parse(JSON.stringify(this.query));
            Service.getOrders(query,function (rep) {
                self.orders = rep.lists;
                self.count = rep.count;
                self.gettime = new Date().Format("yyyy-MM-dd hh:mm:ss")
            })
        },
        onPrinter: function (obj) {
            layer.confirm("确定修改状态为已打印?",{btn:["确定","取消"]}, function () {
                obj.state = 3;
                Service.updateOrder(obj._id,JSON.stringify(obj),function (rep) {
                    layer.closeAll();
                    layer.alert("操作成功!");
                })
            });
        },
        onCancel: function (o) {
            var self = this;
            layer.confirm("是否取消该订单?",{btn:["确定","取消"]}, function () {
                Service.delOrder(o._id,function (rep) {
                    layer.closeAll();
                    layer.alert("取消成功!");
                    self.orders.$remove(o);
                })
            });
        },
        busGo: function () {
            var self = this;
            setInterval(function () {
                self.countdown -=1;
            },1000)
        }
    },
    watch:{
        countdown: function (v) {
            if(v == 0){
                this.countdown = 30;
                this.renderOrders();
            }
        }
    },
    ready: function () {
        this.renderOrders();
        this.busGo();
    }
});

});

;/*!/components/page/order/order.js*/
define('components/page/order/order', function(require, exports, module) {

/**
 * Created by jack on 16/4/4.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

require("form/form.js");
require("state/state.js");

var stat = require("components/page/order/stat/stat");
var real = require("components/page/order/realtime/realtime");

module.exports = Vue.extend({
    template:"<div class=\"page-menu\">\n    <div class=\"panel panel-default  content\">\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" :class=\"{active:view==0}\" @click=\"changeView(0)\"><a href=\"javascript:;\">\n                    订单列表</a></li>\n                <li role=\"presentation\" :class=\"{active:view==2}\" @click=\"changeView(2)\"><a href=\"javascript:;\">\n                    实时订单</a></li>\n                <li role=\"presentation\" :class=\"{active:view==1}\" @click=\"changeView(1)\" ><a href=\"javascript:;\">\n                    每日汇总</a></li>\n            </ul>\n\n            <a href=\"javascript:;\" v-if=\"view==1\" class=\"btn pull-right\" @click=\"onPrint\">\n                <span class=\"glyphicon glyphicon-print\"></span>\n                打印\n            </a>\n        </div>\n\n        <div v-if=\"view==0\" class=\"panel-body\">\n            <div class=\"form-inline\">\n                <div class=\"form-group\">\n                    <label>日期</label>\n                    <input type=\"text\" id=\"datepick\" class=\"form-control\" @click=\"onDateClick\" v-model=\"query.mdate\" placeholder=\"请选择\">\n                </div>\n                <div class=\"form-group\">\n                    <label >餐次 </label>\n                    <select class=\"form-control\" v-model=\"query.mtime\">\n                        <option value=\"\">全部</option>\n                        <option value=\"lunch\">午餐</option>\n                        <option value=\"dinner\">晚餐</option>\n                    </select>\n                </div>\n                <div class=\"form-group\">\n                    <label >状态 </label>\n                    <select class=\"form-control\" v-model=\"query.state\">\n                        <option value=\"\">全部</option>\n                        <option value=\"1\">未处理</option>\n                        <option value=\"-1\">已取消</option>\n                        <option value=\"3\">已打印</option>\n                        <option value=\"2\">已完成</option>\n                    </select>\n                </div>\n                <button class=\"btn btn-default\" @click=\"onQuery\">\n                    <span class=\"glyphicon glyphicon-search\"></span>\n                    查询</button>\n            </div>\n            <hr>\n            <table class=\"table table-bordered table-hover\">\n                <tbody>\n                <tr>\n                    <th>\n                        #\n                    </th>\n                    <th>\n                        时间\n                    </th>\n                    <th>\n                        餐次\n                    </th>\n                    <th>\n                        下单人\n                    </th>\n                    <th>\n                        下单时间\n                    </th>\n                    <th>\n                        人数\n                    </th>\n                    <th>\n                        餐桌\n                    </th>\n                    <th>\n                        菜品数量(种)\n                    </th>\n                    <th>\n                        期望上菜时间\n                    </th>\n                    <th>\n                        状态\n                    </th>\n                    <th>\n                        菜单\n                    </th>\n                    <th>\n                        操作\n                    </th>\n                </tr>\n                <tr v-for=\"o in orders\" track-by=\"_id\">\n                    <td>{{$index+1 + query.limit*query.page}}</td>\n                    <td>{{o.mdate}}</td>\n                    <td>{{o.mtime==\"dinner\"?\"晚餐\":\"午餐\"}}</td>\n                    <td><a href=\"javascript:;\" @click=\"onShowUserInfo(o.user,$event)\">{{o.user.name}}</a></td>\n                    <td>{{(new Date(o.created)).Format(\"yyyy-MM-dd hh:mm\")}}</td>\n                    <td>{{o.number}}</td>\n                    <td>{{o.table.no}}</td>\n                    <td>{{o.menu.length}}</td>\n                    <td>{{o.remark}}</td>\n                    <td><c-state :state=\"o.state\"></c-state></td>\n                    <td><a v-link=\"{path:'order/'+o._id}\" >查看</a></td>\n                    <td>\n                        <a @click=\"onCancel(o)\" href=\"javascript:;\">取消</a>\n                     <a  @click=\"onComplete(o)\" href=\"javascript:;\">已完成</a>\n                     <a  @click=\"onPrinter(o)\" href=\"javascript:;\">已打印</a>\n                    </td>\n                </tr>\n                </tbody></table>\n            <div class=\"c-pager\">\n                <p class=\"pull-left\">共 {{count}} 条记录，每页 {{query.limit}} 条 {{query.page+1}}/{{Math.ceil(count/query.limit)}} </p>\n\n                <ul  class=\"pagination pagination-sm\">\n                    <li>\n                    </li>\n                    <li>\n                        <a @click=\"toFirst\" href=\"javascript:;\" aria-label=\"Previous\">\n                            <span class=\"glyphicon glyphicon-step-backward\"></span>\n                        </a>\n                    </li>\n                    <li><a href=\"javascript:;\" :disabled=\"query.page==0\" @click=\"toPre\"><span class=\"glyphicon glyphicon-triangle-left\"></span></a></li>\n                    <li><a href=\"javascript:;\" @click=\"toNext\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a></li>\n\n                    <li>\n                        <a @click=\"toLast\" href=\"javascript:;\" aria-label=\"Next\">\n                            <span class=\"glyphicon glyphicon-step-forward\"></span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n\n        <div v-if=\"view==1\" is=\"stat\"></div>\n        <div v-if=\"view==2\" is=\"real\"></div>\n\n    </div>\n\n\n</div>\n",
    data: function () {
        return {
            view:0,
            orders:[],
            count:0,
            query:{
                page:0,
                limit:20,
                mtime:"",
                mdate:"",
                sorts:'{"mdate":-1}',
                state:""
            }
        }
    },
    methods:{
        render: function () {
            this.renderOrders();
        },
        renderOrders: function () {
            var self = this;
            layer.load();
            var query = JSON.parse(JSON.stringify(this.query));
            query.mdate = $("#datepick").val();
            for(var i in query){
                if(!query[i]){
                    delete query[i]
                }
            }
            Service.getOrders(query,function (rep) {
                self.orders = rep.lists;
                self.count = rep.count;
                layer.closeAll();
            })
        },
        onDateClick: function () {
            var self = this;
            laydate({istime: true, format: 'YYYY-MM-DD',choose: function (datas) {
                self.query.mdate = datas;
            }});
        },
        onQuery: function () {
            this.query.page = 0;
            this.renderOrders();
        },
        onCancel: function (o) {
            var self = this;
            layer.confirm("是否取消该订单?",{btn:["确定","取消"]}, function () {
                Service.delOrder(o._id,function (rep) {
                    layer.closeAll();
                    layer.alert("取消成功!");
                    self.orders.$remove(o);
                })
            });
        },
        toPre: function () {
           if(this.query.page>0){
               this.query.page--;
               this.renderOrders();
           }
        },
        toNext: function () {
            if(this.query.page < Math.ceil(this.count/this.query.limit)-1){
                this.query.page++;
                this.renderOrders();
            }
        },
        toFirst: function () {
            this.query.page = 0;
            this.renderOrders();
        },
        toLast: function () {
            this.query.page = Math.ceil(this.count/10)-1;
            this.renderOrders();
        },
        onComplete: function (obj) {
            layer.confirm("确定完成订单?",{btn:["确定","取消"]}, function () {
                obj.state = 2;
                Service.updateOrder(obj._id,JSON.stringify(obj),function (rep) {
                    layer.closeAll();
                    layer.alert("操作成功!");
                })
            });
        },
        changeView: function (v) {
            this.view = v;
        },
        onPrinter: function (obj) {
            layer.confirm("确定修改状态为已打印?",{btn:["确定","取消"]}, function () {
                obj.state = 3;
                Service.updateOrder(obj._id,JSON.stringify(obj),function (rep) {
                    layer.closeAll();
                    layer.alert("操作成功!");
                })
            });
        },
        onPrint: function () {
            $("#daystat").jqprint();
        },
        onShowUserInfo: function (user,e) {

            var htmlCodes = [
                '<table class="table" style="margin-bottom: 0">',
                '<tr><td>姓名：</td><td>'+user.name+'</td></tr>',
                '<tr><td>处室：</td><td>'+user.department+'</td></tr>',
                '<tr><td>电话：</td><td>'+user.mobile+'</td></tr>',
                '<tr><td>邮箱：</td><td>'+user.email+'</td></tr>',
                '</table>'
            ].join("");
            layer.tips(htmlCodes, e.target, {
                tips: [1, '#3595CC'],
                time: 4000
            });
        }
    },
    components:{
        "stat":stat,
        "real":real
    },
    ready: function () {
        this.render();
    }
});

});

;/*!/components/page/order/detail/detail.js*/
define('components/page/order/detail/detail', function(require, exports, module) {

/**
 * Created by jack on 16/4/4.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

require("form/form.js");



module.exports = Vue.extend({
    template:"<div class=\"page-detail\">\n\n    <div class=\"panel panel-default content\" >\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" class=\"active\"><a href=\"#\">\n                    菜单详情</a></li>\n            </ul>\n            <a v-link=\"{path:'/order'}\" class=\"btn pull-right\">\n                <span class=\"glyphicon glyphicon-backward\"></span>\n                返回\n            </a>\n            <a href=\"javascript:;\" class=\"btn pull-right\" @click=\"onPrint\">\n                <span class=\"glyphicon glyphicon-print\"></span>\n                打印\n            </a>\n            <a href=\"javascript:;\" :disabled=\"mode=='edit'\"  class=\"btn pull-right\" @click=\"onEdit\">\n                <span class=\"glyphicon glyphicon-edit\"></span>\n                编辑</a>\n\n        </div>\n        <div class=\"panel-body\" id=\"order-detail\" >\n            <h3 class=\"text-center\" style=\"text-align: center\" >\n               {{order.mdate}} {{order.mtime==\"dinner\"?\"晚餐\":\"中餐\"}} {{order.table.no}}号桌({{order.number}}人) {{order.user.name}}({{order.user.mobile}})预定\n            </h3>\n            <p style=\"text-align: center\" class=\"text-center\" v-show=\"order.remark\">上菜时间:{{order.remark}}</p>\n            <table class=\"table table-bordered table-hover\" style=\"width: 100%\">\n                <tbody>\n                <tr>\n                    <th>\n                        #\n                    </th>\n                    <th>\n                        分类\n                    </th>\n                    <th>\n                        菜品名称\n                    </th>\n                    <th>\n                        数量\n                    </th>\n                    <th>\n                        备注\n                    </th>\n                    <th>\n                        单价(元)\n                    </th>\n                    <th>\n                        总价(元)\n                    </th>\n                    <!--<th v-if=\"mode=='edit'\">-->\n                        <!--编辑-->\n                    <!--</th>-->\n                </tr>\n                <tr v-for=\"m in order.menu | orderBy 'type.sort'\">\n                    <td>{{$index+1}}</td>\n                    <td>\n                        {{m.type.value}}\n                    </td>\n                    <td>\n                        <strong style=\"font-size: 16px;\">{{m.name}}</strong>\n                    </td>\n                    <td>\n                        <strong style=\"font-size: 16px\" v-if=\"mode=='detail'\">{{m.number}} {{m.unit}}</strong>\n                        <input type=\"number\" v-if=\"mode=='edit'\" v-model=\"m.number\" number>\n                    </td>\n                    <td>{{m.remark}}</td>\n                    <td>\n                        <span v-if=\"mode=='detail'\">{{m.price  | currency \"¥\"}}</span>\n                        <input type=\"number\" v-if=\"mode=='edit'\" v-model=\"m.price\" number>\n                    </td>\n                    <td>{{m.price * m.number | currency \"¥\"}}</td>\n                    <!--<td v-if=\"mode=='edit'\">-->\n                        <!--<a href=\"javascript:;\">删除</a>-->\n                    <!--</td>-->\n                </tr>\n                <tr>\n                    <td>合计</td>\n                    <td></td>\n                    <td></td>\n                    <td></td>\n                    <td></td>\n                    <td></td>\n                    <td>¥{{total}}</td>\n                    <td v-if=\"mode=='edit'\">\n                        <!--<button class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-plus\"></span></button>-->\n                    </td>\n                </tr>\n                </tbody></table>\n\n        </div>\n\n        <div class=\"panel-footer text-right\" v-if=\"mode=='edit'\">\n            <button class=\"btn btn-primary\"  @click=\"onUpdate\">提交</button>\n            <button CLASS=\"btn btn-default\" @click=\"onCancel\">取消</button>\n        </div>\n    </div>\n\n</div>\n",
    data: function () {
        return {
            order:{
                table:{},
                user:{},
                remark:""
            },
            types:[],
            menus:[],
            oid:"",
            mode:"detail"
        }
    },
    methods:{
        renderOrder: function (id) {
            var self = this;
            layer.load();
            this.model = "detail";
            Service.getOrder(id,function (rep) {
                self.order = self.showType(rep);
                layer.closeAll();
            })
        },
        renderTypes: function (id) {
            var self = this;
            Service.getCtx("dc_type", function (rep) {
                self.types = rep.types.types||[];
                self.renderOrder(id);
            });
        },
        onPrint: function () {
            $("#order-detail").jqprint();
        },
        onEdit: function () {
            this.mode = "edit";
        },

        onCancel: function () {
            this.mode = "detail";
            $(this.$el).removeClass("menus-show");
        },
        onChangeType: function (t) {
            this.selectType = t;
        },
        onUpdate: function () {
            var self = this;
            layer.confirm("确定更新订单?", {btn: ["确定", "取消"]}, function () {
                layer.load();
                Service.updateOrder(self.order._id, JSON.stringify(self.order), function (rep) {
                    layer.closeAll();
                    self.mode  = "detail";

                });
            });
        },
        showType: function (order) {
            var self = this;
            order.menu.forEach(function (l) {
                self.types.forEach(function (t) {
                    if(t.key == l.type){
                        l.type = t;
                    }
                })
            });

            return order;
        }
    },
    route:{
        data: function (r) {
            this.renderTypes(r.to.params.oid);
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
    }
});

});

;/*!/components/page/gOrder/detail/detail.js*/
define('components/page/gOrder/detail/detail', function(require, exports, module) {

/**
 * Created by jack on 16/4/4.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

require("form/form.js");



module.exports = Vue.extend({
    template:"<div class=\"page-detail\">\n\n    <div class=\"panel panel-default content\" >\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" class=\"active\"><a href=\"#\">\n                    货物详情</a></li>\n            </ul>\n            <a v-link=\"{path:'/gOrder'}\" class=\"btn pull-right\">\n                <span class=\"glyphicon glyphicon-backward\"></span>\n                返回\n            </a>\n            <a href=\"javascript:;\" class=\"btn pull-right\" @click=\"onPrint\">\n                <span class=\"glyphicon glyphicon-print\"></span>\n                打印\n            </a>\n            <a href=\"javascript:;\" :disabled=\"mode=='edit'\"  class=\"btn pull-right\" @click=\"onEdit\">\n                <span class=\"glyphicon glyphicon-edit\"></span>\n                编辑</a>\n\n        </div>\n        <div class=\"panel-body\" id=\"order-detail\" >\n            <h3 class=\"text-center\" style=\"text-align: center\">\n               {{order.mdate}} {{order.user.name}}({{order.user.mobile}})预定\n            </h3>\n            <table class=\"table table-bordered table-hover\">\n                <tbody>\n                <tr>\n                    <th>\n                        #\n                    </th>\n                    <th>\n                        类型\n                    </th>\n                    <th>\n                        货物名称\n                    </th>\n                    <th>\n                        数量\n                    </th>\n                    <th>\n                        单价(元)\n                    </th>\n                    <th>\n                        总价(元)\n                    </th>\n                    <!--<th v-if=\"mode=='edit'\">-->\n                        <!--编辑-->\n                    <!--</th>-->\n                </tr>\n                <tr v-for=\"m in order.items | orderBy 'type.sort'\">\n                    <td>{{$index+1}}</td>\n                    <td>\n                        {{m.type.value}}\n                    </td>\n                    <td>\n                        <strong style=\"font-size: 16px;\">{{m.name}}</strong>\n                    </td>\n                    <td>\n                        <strong style=\"font-size: 16px;\" v-if=\"mode=='detail'\">{{m.number}} </strong>\n                        <input type=\"number\" v-if=\"mode=='edit'\" v-model=\"m.number\" number>{{m.unit}}\n                    </td>\n                    <td>\n                        <span v-if=\"mode=='detail'\">{{m.price  | currency \"¥\"}}</span>\n                        <input type=\"number\" v-if=\"mode=='edit'\" v-model=\"m.price\" number>\n                    </td>\n                    <td>{{m.price * m.number  | currency \"¥\"}}</td>\n                    <!--<td v-if=\"mode=='edit'\">-->\n                        <!--<a href=\"javascript:;\">删除</a>-->\n                    <!--</td>-->\n                </tr>\n                <tr>\n                    <td>合计</td>\n                    <td></td>\n                    <td></td>\n                    <td></td>\n                    <td></td>\n                    <td>¥{{total}}</td>\n                    <td v-if=\"mode=='edit'\">\n                        <!--<button class=\"btn btn-default btn-sm\"><span class=\"glyphicon glyphicon-plus\"></span></button>-->\n                    </td>\n                </tr>\n                </tbody></table>\n\n        </div>\n\n        <div class=\"panel-footer text-right\" v-if=\"mode=='edit'\">\n            <button class=\"btn btn-primary\" @click=\"onUpdate\">提交</button>\n            <button CLASS=\"btn btn-default\" @click=\"onCancel\">取消</button>\n        </div>\n    </div>\n\n    <div class=\"modal fade\" id=\"menuModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n        <div class=\"modal-dialog  modal-lg\" role=\"document\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                    <h4 class=\"modal-title\" id=\"myModalLabel\">请选择菜品</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <ul class=\"nav nav-tabs\">\n                        <li role=\"presentation\" v-for=\"t in types\" :class=\"{active:selectType==t.key}\"><a href=\"javascript:;\" @click=\"onChangeType(t.key)\">{{t.value}}</a></li>\n                    </ul>\n\n                    <div class=\"container-fluid\" >\n                        <div class=\"row\">\n                            <div class=\"col-md-2 menu-item\" v-for=\"m in menus\" v-if=\"m.type == selectType\">\n                                <div class=\"thumbnail\">\n                                    <img v-for=\"p in m.picture\" v-if=\"m.picture.length>0&&$index==0\" :src=\"'/data/image/'+p+'/100/100.json'\" >\n                                    <div class=\"caption\">\n                                        <h5>{{m.name}}</h5>\n                                        <p>{{m.cates.join(\",\")}}</p>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>\n                    <button type=\"button\" class=\"btn btn-primary\">确定</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n",
    data: function () {
        return {
            order:{
                table:{},
                user:{}
            },
            types:[],
            menus:[],
            oid:"",
            mode:"detail"
        }
    },
    methods:{
        renderOrder: function (id) {
            var self = this;
            layer.load();
            Service.getGoodsOrderById(id,function (rep) {
                self.order = self.getType(rep);
                layer.closeAll();
            })
        },
        renderTypes: function (id) {
            var self = this;
            Service.getCtx("dh_type", function (rep) {
                self.types = rep.types.types||[];
                self.renderOrder(id);
            });
        },
        getType: function (order) {
            var self = this;
            order.items.forEach(function (l) {
                self.types.forEach(function (t) {
                    if(t.key == l.type){
                        l.type = t;
                    }
                })
            });
            return order;
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
        },
        onUpdate: function () {
            var self = this;
            layer.confirm("确定更新订单?", {btn: ["确定", "取消"]}, function () {
                layer.load();
                Service.updateGoodsOrder(self.order._id, JSON.stringify(self.order), function (rep) {
                    layer.closeAll();
                    self.mode  = "detail";

                });
            });
        }

    },
    route:{
        data: function (r) {
            this.renderTypes(r.to.params.oid);
            this.mode ="detail";
        }
    },
    computed:{
        total: function () {
            var total = 0;
            if(this.order.items){
                this.order.items.forEach(function (m) {
                    total +=(m.price* m.number);
                })
            }
            return total.toFixed(2);
        }
    }
});

});

;/*!/components/page/notice/notice.js*/
define('components/page/notice/notice', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");
var nav = require("nav/nav.js");

require("form/form.js");

var Service = require("main/service.js");

module.exports = Vue.extend({
    template:"<div class=\"page-notice\">\n    <div class=\"panel panel-default  content\">\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" class=\"active\"><a href=\"#\">\n                    公告</a></li>\n            </ul>\n            <a v-link=\"{path:'add',append:true}\" class=\"btn pull-right\">\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                新增\n            </a>\n        </div>\n        <div class=\"panel-body\">\n            <table class=\"table table-bordered table-hover\">\n                <tbody>\n                <tr>\n                    <th>\n                        #\n                    </th>\n                    <th>标题\n                    </th>\n                    <th>\n                        发布时间\n                    </th>\n                    <th>\n                        发布人\n                    </th>\n                    <th>\n                        是否置顶\n                    </th>\n                    <th>\n                        操作\n                    </th>\n                </tr>\n                <tr v-for=\"n in notices\">\n                    <td>\n                        {{$index+1}}\n                    </td>\n                    <td>\n                        {{n.title}}\n                    </td>\n                    <td>\n                        {{(new Date(n.updated).Format(\"yyyy-MM-dd hh:mm\"))}}\n                    </td>\n                    <td>\n                        {{n.user}}\n                    </td>\n                    <td>\n                        {{n.top?'是':'否'}}\n                    </td>\n                    <td>\n                        <a v-link=\"{path:'add?id='+n._id,append:true}\">编辑</a>\n                        <a href=\"javascript:;\" @click=\"onDel(n)\">删除</a>\n                    </td>\n                </tr>\n                </tbody></table>\n            <!--<div class=\"c-pager\">-->\n                <!--<p class=\"pull-left\">共 {{notices.length}} 条记录，每页 10 条 1/1 </p>-->\n\n                <!--<ul  class=\"pagination pagination-sm\">-->\n                    <!--<li>-->\n                    <!--</li>-->\n                    <!--<li>-->\n                        <!--<a href=\"#\" aria-label=\"Previous\">-->\n                            <!--<span class=\"glyphicon glyphicon-step-backward\"></span>-->\n                        <!--</a>-->\n                    <!--</li>-->\n                    <!--<li><a href=\"#\"><span class=\"glyphicon glyphicon-triangle-left\"></span></a></li>-->\n                    <!--<li><a href=\"#\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a></li>-->\n\n                    <!--<li>-->\n                        <!--<a href=\"#\" aria-label=\"Next\">-->\n                            <!--<span class=\"glyphicon glyphicon-step-forward\"></span>-->\n                        <!--</a>-->\n                    <!--</li>-->\n                <!--</ul>-->\n            <!--</div>-->\n        </div>\n    </div>\n    <!--<c-form :show=\"modalShow\" >-->\n\n        <!--<form class=\"form-horizontal\">-->\n            <!--<div class=\"form-group\" v-for=\"m in model\" v-show=\"m.type != 'hidden'\">-->\n                <!--<label class=\"col-sm-2 control-label\">{{m.name}}</label>-->\n                <!--<div class=\"col-sm-10\">-->\n                    <!--{{getStr}}-->\n                <!--</div>-->\n            <!--</div>-->\n        <!--</form>-->\n\n    <!--</c-form>-->\n\n</div>\n",
    data: function () {
        return {
            notices:[],
            count:0,
            modal:{
                show:false
            }
        }
    },
    methods:{
        render:function (){
            this.renderList();
        },
        renderList: function () {
            var self = this;
            Service.getNotices(function (rep) {
                self.count = rep.count;
                self.notices = rep.lists;
            });
        },
        onDel: function (n) {
            var self = this;
            layer.confirm("是否删除该通知?",{btn:["确定","取消"]}, function () {
                self.delNotice(n._id,function (rep) {
                    self.notices.$remove(n);
                    layer.alert("删除成功!");
                    layer.closeAll();
                })
            });
        },
        delNotice: function (id,callback) {
            Service.delNotice(id,callback);
        }
    },
    ready: function () {
        this.render();
    }
});

});

;/*!/components/page/notice/add/add.js*/
define('components/page/notice/add/add', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");
var nav = require("nav/nav.js");

require("form/form.js");

module.exports = Vue.extend({
    template:"<div class=\"page-notice-add\">\n    <div class=\"panel panel-default  content\">\n        <div class=\"panel-heading\">\n            新增公告\n            <a href=\"javascript:history.back()\" class=\"btn pull-right\">\n                <span class=\"glyphicon glyphicon-backward\"></span>\n                返回\n            </a>\n        </div>\n        <div class=\"panel-body\">\n            <iframe src=\"./static/wx/index.html\"  frameborder=\"0\"></iframe>\n        </div>\n    </div>\n</div>\n",
    data: function () {
        return {

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
var Service = require("main/service.js");
var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div class=\"page-config\">\n    <div class=\"panel panel-default content\">\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" @click=\"onChangeView('food')\" :class=\"{active:view=='food'}\"><a href=\"javascript:;\">\n                    订餐配置</a></li>\n                <li role=\"presentation\"  @click=\"onChangeView('goods')\" :class=\"{active:view=='goods'}\"><a href=\"javascript:;\">\n                    订货配置</a></li>\n            </ul>\n        </div>\n        <div class=\"panel-body\" v-if=\"view=='food'\">\n\n            <div class=\"form-horizontal\">\n               <div class=\"form-group\">\n                   <label class=\"col-sm-2 control-label\">提前预定天数</label>\n                   <div class=\"col-sm-10\">\n                       <input type=\"number\"  class=\"form-control\" v-model=\"config.pre\" number>\n                   </div>\n               </div>\n            </div>\n\n            <fieldset>\n                <legend>中餐</legend>\n                <div class=\"form-horizontal\">\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">最晚预定时间</label>\n                        <div class=\"col-sm-10\">\n                            <input type=\"text\"  class=\"form-control\" v-model=\"config.lunch.lastOrder\" >\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">最晚退订时间</label>\n                        <div class=\"col-sm-10\">\n                            <input type=\"text\"  class=\"form-control\"  v-model=\"config.lunch.unSub\" >\n                        </div>\n                    </div>\n                </div>\n            </fieldset>\n            <fieldset>\n                <legend>晚餐</legend>\n                <div class=\"form-horizontal\">\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">最晚预定时间</label>\n                        <div class=\"col-sm-10\">\n                            <input type=\"text\"  class=\"form-control\"  v-model=\"config.dinner.lastOrder\" >\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">最晚退订时间</label>\n                        <div class=\"col-sm-10\">\n                            <input type=\"text\"  class=\"form-control\"  v-model=\"config.dinner.unSub\" >\n                        </div>\n                    </div>\n                </div>\n            </fieldset>\n            <fieldset>\n                <legend>订餐开放设置</legend>\n                <table class=\"table table-bordered\">\n\n                    <tr>\n                        <th v-for=\"w in config.week\">\n                            {{getWeekName($key)}}\n                        </th>\n                    </tr>\n                    <tr>\n                        <td v-for=\"w in config.week\">\n                            <label>\n                                午餐\n                                <input type=\"checkbox\" v-model=\"w.lunch\">\n                            </label>\n                            <br>\n                            <label>\n                                晚餐\n                                <input type=\"checkbox\"  v-model=\"w.dinner\">\n                            </label>\n                        </td>\n                    </tr>\n\n                </table>\n\n            </fieldset>\n        </div>\n        <div class=\"panel-footer text-right\" v-if=\"view=='food'\">\n            <a href=\"javascript:;\" class=\"btn btn-primary\" @click=\"onSubmit\">提交</a>\n        </div>\n\n        <div class=\"panel-body\" v-if=\"view=='goods'\">\n            <fieldset>\n                <legend>订货设置</legend>\n                <div class=\"form-horizontal\">\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">订货开启时间</label>\n                        <div class=\"col-sm-5\">\n                            <select v-model=\"gConfig.begin.week\" class=\"form-control\" number>\n                                <option value=\"0\">每周末</option>\n                                <option value=\"1\">每周一</option>\n                                <option value=\"2\">每周二</option>\n                                <option value=\"3\">每周三</option>\n                                <option value=\"4\">每周四</option>\n                                <option value=\"5\">每周五</option>\n                                <option value=\"6\">每周六</option>\n                            </select>\n                        </div>\n                        <div class=\"col-sm-5\">\n                            <input type=\"text\"  class=\"form-control\" v-model=\"gConfig.begin.time\" >\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">订货关闭时间</label>\n                        <div class=\"col-sm-5\">\n                            <select v-model=\"gConfig.end.week\" class=\"form-control\" number>\n                                <option value=\"0\">每周末</option>\n                                <option value=\"1\">每周一</option>\n                                <option value=\"2\">每周二</option>\n                                <option value=\"3\">每周三</option>\n                                <option value=\"4\">每周四</option>\n                                <option value=\"5\">每周五</option>\n                                <option value=\"6\">每周六</option>\n                            </select>\n                        </div>\n                        <div class=\"col-sm-5\">\n                            <input type=\"text\"  class=\"form-control\" v-model=\"gConfig.end.time\" >\n                        </div>\n                    </div>\n                </div>\n\n            </fieldset>\n            <fieldset>\n                <legend>取货设置</legend>\n                <div class=\"form-horizontal\">\n                    <table class=\"table table-bordered\">\n                        <tr>\n                            <th v-for=\"w in gConfig.week\">\n                                {{getWeekName($key)}}\n                            </th>\n                        </tr>\n                        <tr>\n                            <td v-for=\"w in gConfig.week\">\n                                <label>\n                                    上午\n                                    <input type=\"checkbox\" v-model=\"w.morning\">\n                                </label>\n                                <br>\n                                <label>\n                                    中午\n                                    <input type=\"checkbox\"  v-model=\"w.noon\">\n                                </label>\n                                <br>\n                                <label>\n                                    下午\n                                    <input type=\"checkbox\"  v-model=\"w.afternoon\">\n                                </label>\n                            </td>\n                        </tr>\n\n                    </table>\n                </div>\n            </fieldset>\n\n        </div>\n        <div class=\"panel-footer text-right\" v-if=\"view=='goods'\">\n            <a href=\"javascript:;\" class=\"btn btn-primary\" @click=\"onSubmitGoods\">提交</a>\n        </div>\n\n    </div>\n</div>",
    data: function () {
        return {
            config:{
                pre:4,
                lunch:{
                    lastOrder:"12:00",
                    unSub:"12:20"
                },
                dinner:{
                    lastOrder:"18:00",
                    unSub:"18:20"
                },
                week:{  //0周日
                    0:{
                        dinner:true,
                        lunch:true
                    },
                    1:{
                        dinner:true,
                        lunch:true
                    },
                    2:{
                        dinner:true,
                        lunch:true
                    },
                    3:{
                        dinner:true,
                        lunch:true
                    },
                    4:{
                        dinner:true,
                        lunch:true
                    },
                    5:{
                        dinner:true,
                        lunch:true
                    },
                    6:{
                        dinner:true,
                        lunch:true
                    }
                }
            },
            gConfig:{
                begin:{
                    week:1,
                    time:"08:00"
                },
                end:{
                    week:3,
                    time:"16:00"
                },
                week:{  //0周日
                    0:{
                        morning:true,
                        noon:true,
                        afternoon:true
                    },
                    1:{
                        morning:true,
                        noon:true,
                        afternoon:true
                    },
                    2:{
                        morning:true,
                        noon:true,
                        afternoon:true
                    },
                    3:{
                        morning:true,
                        noon:true,
                        afternoon:true
                    },
                    4:{
                        morning:true,
                        noon:true,
                        afternoon:true
                    },
                    5:{
                        morning:true,
                        noon:true,
                        afternoon:true
                    },
                    6:{
                        morning:true,
                        noon:true,
                        afternoon:true
                    }
                }
            },
            view:"food"
        }
    },
    methods:{
        render: function () {
            this.renderConfig();
        },
        onSubmit: function () {
            Service.putCtx("dc_config", JSON.stringify({config:this.config}),function (rep) {
                layer.alert("更新成功!");
            });
        },
        onSubmitGoods: function () {
            Service.putCtx("dh_config", JSON.stringify({config:this.gConfig}),function (rep) {
                layer.alert("更新成功!");
            });
        },
        renderGConfig: function () {
            layer.load();
            var self = this;
            Service.getCtx("dh_config", function (rep) {
                if(rep.config){
                    self.gConfig = $.extend(self.gConfig,rep.config);
                }
                layer.closeAll();
            });
        },
        renderConfig: function () {
            var self = this;
            layer.load();
            Service.getCtx("dc_config", function (rep) {
                if(rep.config){
                    self.config = $.extend(self.config,rep.config);
                }
                layer.closeAll();
            });
        },
        onChangeView: function (v) {
            this.view = v;
        },
        getWeekName: function (v) {
            var r = parseInt(v),week = "";
            switch (r){
                case 0:{
                    week = "星期天";
                }break;
                case 1:{
                    week = "星期一";
                }break;
                case 2:{
                    week = "星期二";
                }break;
                case 3:{
                    week = "星期三";
                }break;
                case 4:{
                    week = "星期四";
                }break;
                case 5:{
                    week = "星期五";
                }break;
                case 6:{
                    week = "星期六";
                }break;

            }

            var d = new Date();
            var w = d.getDay();
            var c = w - r;
            if(c == 0){
                return week+"(今天)";
            }else if(c < 0){
                d.setDate(d.getDate()-c);
                return week+ d.Format("(yyyy-MM-dd)");
            }else if(c >0){
                d.setDate(d.getDate()+7-c);
                return week+d.Format("(yyyy-MM-dd)");
            }
        }


    },
    ready: function () {
        this.render();
    },
    watch:{
        view: function (v) {
            if(v == "goods"){
                this.renderGConfig();
            }
        }
    },
    route:{
        activate: function (transition) {
            transition.next();
        }
    }
});


});

;/*!/components/page/menu/package/package.js*/
define('components/page/menu/package/package', function(require, exports, module) {

/**
 * Created by jack on 16/5/29.
 */

var Vue = require("component_modules/vue.js");
var Service =require("main/service.js");

module.exports = Vue.extend({
    template:"<div class=\"page-package panel-body\">\n    <table class=\"table table-bordered table-hover\">\n        <thead>\n        <tr>\n            <th>#</th>\n            <th>套餐名称</th>\n            <th>内容</th>\n            <th>操作</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr v-for=\"p in packages\">\n            <td>{{$index+1}}</td>\n            <td>{{p.name}}</td>\n                <td>\n                    <table class=\"table  table-bordered \" style=\"margin-bottom: 0\">\n                        <tr v-for=\"m in p.menu\">\n                            <td>{{m.type.value}}</td>\n                            <td>{{m.food.name}}</td>\n                            <td>{{m.number}} {{m.food.unit}}</td>\n                        </tr>\n                    </table>\n                </td>\n            <td><a href=\"javascript:;\" v-link=\"{path:'/package/edit/'+p._id}\">编辑</a>\n                <a href=\"javascript:;\" @click=\"onDel(p)\">删除</a></td>\n        </tr>\n        </tbody>\n    </table>\n</div>",
    data: function () {
        return {
            packages:[]
        }
    },
    methods:{
        render: function () {
            this.renderPackage();
        },
        renderPackage: function () {
            var self = this;
            Service.getPackage(function (rep) {
                self.packages = rep.lists;
            })
        },
        onDel: function (p) {
            var self = this;
            layer.confirm("是否删除该套餐?",{btn:["确定","取消"]}, function () {
                Service.delPackage(p._id, function (rep) {
                    layer.closeAll();
                    self.packages.$remove(p);
                })
            });
        }
    },
    events:{
      "package-reload": function () {
          this.renderPackage();
      }
    },
    ready: function () {
        this.render();
    }
});

});

;/*!/components/page/menu/menu.js*/
define('components/page/menu/menu', function(require, exports, module) {

/**
 * Created by jack on 16/4/4.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

var package = require("components/page/menu/package/package");

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
    visible:1,
    shift:null
};

module.exports = Vue.extend({
    template:"<div class=\"page-menu\">\n    <div class=\"panel panel-default  content\">\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" :class=\"{active:view=='list'}\" @click=\"changeView('list')\"><a href=\"javascript:;\">\n                    菜品</a></li>\n                <li role=\"presentation\" :class=\"{active:view=='type'}\" @click=\"changeView('type')\"><a href=\"javascript:;\">\n                    分类</a></li>\n                <li role=\"presentation\" :class=\"{active:view=='package'}\" @click=\"changeView('package')\"><a href=\"javascript:;\">\n                    套餐管理</a></li>\n            </ul>\n            <a v-show=\"view=='list'\" href=\"javascript:;\" class=\"btn pull-right\" @click=\"onAdd\">\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                新增菜品\n            </a>\n            <a v-show=\"view=='type'\" href=\"javascript:;\" class=\"btn pull-right\" @click=\"onAddType\">\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                新增类型\n            </a>\n            <a v-show=\"view=='package'\" v-link=\"{path:'/package/add'}\" class=\"btn pull-right\" >\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                新增套餐\n            </a>\n        </div>\n        <div v-show=\"view=='list'\" class=\"panel-body\">\n            <form class=\"form-inline\">\n                <div class=\"form-group\">\n                    <label >名称</label>\n                    <input type=\"text\" v-model=\"query.like\" placeholder=\"菜品名称\" class=\"form-control\">\n                </div>\n                <div class=\"form-group\">\n                    <label >类型</label>\n                    <select class=\"form-control\" v-model=\"query.type\">\n                        <option value=\"\">全部</option>\n                        <option value=\"{{t.key}}\" v-for=\"t in types.types\">{{t.value}}</option>\n                    </select>\n                </div>\n                <button class=\"btn btn-default\" @click=\"onQuery\">\n                    <span class=\"glyphicon glyphicon-search\"></span>\n                    查询</button>\n            </form>\n            <hr/>\n            <table class=\"table table-bordered table-hover\">\n                <tbody>\n                <tr>\n                    <th>\n                        #\n                    </th>\n                    <th>图片\n                    </th>\n                    <th>\n                        名称\n                    </th>\n                    <th>\n                        分类\n                    </th>\n                    <th>\n                        标签\n                    </th>\n                    <th>\n                        价格\n                    </th>\n                    <th>\n                        提前预定时间\n                    </th>\n                    <th>\n                        状态\n                    </th>\n                    <th>\n                        操作\n                    </th>\n                </tr>\n                <tr v-for=\"m in menu\" track-by=\"_id\">\n                    <td>\n                        {{query.limit*query.page+$index+1}}\n                    </td>\n                    <td>\n                        <span class=\"img-wrap\" v-for=\"p in m.picture\" v-if=\"m.picture.length>0\">\n                            <span class=\"glyphicon glyphicon-remove btn-remove\" @click=\"removeImg(m,p)\"></span>\n                            <img  :src=\"'/data/image/'+p+'/100/100.json'\" class=\"img-rounded\" style=\"width: 80px;margin-left: 5px;height: 80px;\">\n                        </span>\n                        <a href=\"javascript:;\" class=\"btn btn-default btn-sm upfile\">\n                            <span class=\"glyphicon glyphicon-plus\"></span>\n                            <input type=\"file\" value=\"浏览\" @change=\"onAddPic(m,$event)\" />\n                        </a>\n                    </td>\n                    <td>\n                        {{m.name}}\n                    </td>\n                    <td>\n                        <span v-for=\"t in types.types\" v-if=\"t.key==m.type\">{{t.value}}</span>\n                    </td>\n                    <td>\n                        <span class=\"label label-primary\" v-for=\"c in m.cates\">\n                            {{c}}\n                        </span>\n                    </td>\n                    <td>\n                        ¥{{m.price}}\n                    </td>\n                    <td>\n                        <span v-show=\"m.shift\">{{m.shift}}小时</span>\n                    </td>\n                    <td>\n                        {{m.visible == 0?\"禁用\":\"启用\"}}\n                    </td>\n                    <td>\n                        <a href=\"javascript:;\" @click=\"onEditMenu(m)\">编辑</a>\n                        <a href=\"javascript:;\" @click=\"onDelMenu(m)\">删除</a>\n                    </td>\n                </tr>\n                </tbody></table>\n            <div class=\"c-pager\">\n                <p class=\"pull-left\">共 {{count}} 条记录，{{query.page+1}}/{{Math.ceil(count/query.limit)}}</p>\n\n                <ul  class=\"pagination pagination-sm\">\n                    <li>\n                    </li>\n                    <li>\n                        <a href=\"javascript:;\" aria-label=\"Previous\" @click=\"toFirst\">\n                            <span class=\"glyphicon glyphicon-step-backward\"></span>\n                        </a>\n                    </li>\n                    <li><a href=\"javascript:;\" :disabled=\"query.page==0\" @click=\"toPre\"><span class=\"glyphicon glyphicon-triangle-left\"></span></a></li>\n                    <li><a href=\"javascript:;\" @click=\"toNext\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a></li>\n\n                    <li>\n                        <a  href=\"javascript:;\"  href=\"#\" aria-label=\"Next\"  @click=\"toLast\">\n                            <span class=\"glyphicon glyphicon-step-forward\"></span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n        <div v-show=\"view=='type'\" class=\"panel-body\">\n            <table class=\"table table-bordered table-hover\">\n                <thead>\n                <tr>\n                    <th>#</th>\n                    <th>名称</th>\n                    <th>排序</th>\n                    <th>操作</th>\n                </tr>\n                </thead>\n                <tbody>\n                    <tr v-for=\"t in types.types\">\n                        <td>{{t.key}}</td>\n                        <td>{{t.value}}</td>\n                        <td>{{t.sort}}</td>\n                        <td><a href=\"javascript:;\" @click=\"onEditType(t)\">编辑</a>\n                      <a href=\"javascript:;\" @click=\"onDelType(t)\">删除</a></td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div is=\"package\" v-if=\"view=='package'\"></div>\n    </div>\n\n    <c-form :config=\"modal\" @submit=\"onSubmit\">\n        <validator name=\"valid\">\n            <form class=\"form-horizontal\" novalidate >\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\" :class=\"{'has-warning':$valid.name.invalid&&$valid.name.touched}\">名称</label>\n                    <div class=\"col-sm-10\" :class=\"{'has-warning':$valid.name.invalid&&$valid.name.touched}\">\n                        <input type=\"text\"  class=\"form-control\" placeholder=\"必填\" v-validate:name=\"['required']\" v-model=\"model.name\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\">分类</label>\n                    <div class=\"col-sm-10\">\n                        <select class=\"form-control\" v-model=\"model.type\" number>\n                            <option value=\"{{t.key}}\" v-for=\"t in types.types\">{{t.value}}</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"form-group\" >\n                    <label class=\"col-sm-2 control-label\" :class=\"{'has-warning':$valid.price.invalid&&$valid.price.touched}\" >价格(元)</label>\n                    <div class=\"col-sm-10\" :class=\"{'has-warning':$valid.price.invalid&&$valid.price.touched}\">\n                        <input type=\"number\" class=\"form-control\"  v-validate:price=\"['required']\"  v-model=\"model.price\" placeholder=\"必填\" number>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\" :class=\"{'has-warning':$valid.unit.invalid&&$valid.unit.touched}\" >单位</label>\n                    <div class=\"col-sm-10\" :class=\"{'has-warning':$valid.unit.invalid&&$valid.unit.touched}\">\n                        <input type=\"text\" class=\"form-control\" v-model=\"model.unit\" v-validate:unit=\"['required']\" placeholder=\"必填(份/个/等等)\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\" >标签</label>\n                    <div class=\"col-sm-10\">\n                        <span class=\"label label-primary\" style=\"margin-right: 10px;\" v-for=\"c in model.cates\">\n                            {{c}}\n                          <span class=\"glyphicon glyphicon-remove\" @click=\"onRemoveCate(c)\"></span>\n                        </span>\n                        <a href=\"javascript:;\" class=\"btn btn-default\" @click=\"onAddCate\">\n                            <span class=\"glyphicon glyphicon-plus\"></span>\n                        </a>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\">提前预定</label>\n                    <div class=\"col-sm-10\" >\n                        <input type=\"number\" class=\"form-control\" v-model=\"model.shift\" placeholder=\"选填,提前预定时间(小时)\" number>\n                    </div>\n                </div>\n                <div class=\"form-group\" >\n                    <label class=\"col-sm-2 control-label\">状态</label>\n                    <div class=\"col-sm-10\">\n                        <select class=\"form-control\" v-model=\"model.visible\" number>\n                            <option value=\"1\">启用</option>\n                            <option value=\"0\">禁用</option>\n                        </select>\n                    </div>\n                </div>\n            </form>\n        </validator>\n    </c-form>\n\n    <c-form :config=\"typeModal\" @submit=\"onSubmitType\" >\n        <form class=\"form-horizontal\">\n            <div class=\"form-group\">\n                <label class=\"col-sm-2 control-label\">值</label>\n                <div class=\"col-sm-10\" >\n                    <input type=\"number\"  class=\"form-control\" v-model=\"type.key\" placeholder=\"必填,请勿重复\"  number>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"col-sm-2 control-label\">名称</label>\n                <div class=\"col-sm-10\" >\n                    <input type=\"text\"  class=\"form-control\" v-model=\"type.value\" placeholder=\"必填\" >\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"col-sm-2 control-label\">排序</label>\n                <div class=\"col-sm-10\" >\n                    <input type=\"number\"  class=\"form-control\" v-model=\"type.sort\" placeholder=\"选填\" number>\n                </div>\n            </div>\n        </form>\n    </c-form>\n</div>\n",
    data: function () {
        return {
            view:"list",
            count:0,
            menu:[],
            model:$.extend({},model),
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
                value:null,
                sort:null
            },
            query:{
                limit:20,
                page:0,
                type:"",
                like:"",
                sorts:"{created:1}"
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
        onQuery: function () {
            this.renderMenu();
        },
        renderTypes: function () {
            var self = this;
            Service.getCtx("dc_type", function (rep) {
                rep.types.types.sort(function (a,b) {
                    var aa = a.sort || 0;
                    var bb = b.sort || 0;
                    return aa-bb;
                });
                self.types.types = rep.types.types||[];
            });
        },
        onAdd: function () {
            this.model = $.extend(this.model,model);
            this.modal.show = true;
            this.modal.title = "新增菜品";
        },
        onEditMenu: function (m) {
            this.model = $.extend(this.model,m);
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
        removeImg: function (m,img) {
            var self = this;
            layer.confirm("是否删除该图片?",{btn:["确定","取消"]}, function () {
                m.picture.$remove(img);
                $.extend(self.model,m);
                self.submit();
            });

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
            this.typeModal.title = "新增类型";
        },
        onEditType: function (t) {
            $.extend(this.type,t);
            this.typeModal.show = true;
            this.typeModal.title = "编辑类型";
        },
        updateType: function () {
            var self = this;
            Service.putCtx("dc_type",JSON.stringify({types:this.types}), function (rep) {
                self.renderTypes();
            });
        },
        onSubmitType: function () {
            if(typeof this.type.key =="number"&&this.type.value){

                var has = false,self = this;
                this.types.types.forEach(function (t) {
                    if(t.key == self.type.key){
                        $.extend(t,self.type);
                        has = true;
                    }
                });
                if(!has){
                    this.types.types.push(JSON.parse(JSON.stringify(this.type)));
                }
                this.updateType();
                this.typeModal.show = false;
                this.type.key = null;
                this.type.value = null;
                this.type.sort = null;
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
            if(this.query.page < Math.ceil(this.count/this.query.limit)-1){
                this.query.page++;
                this.renderMenu();
            }
        },
        toFirst: function () {
            this.query.page = 0;
            this.renderMenu();
        },
        toLast: function () {
            this.query.page =  Math.ceil(this.count/this.query.limit)-1;
            this.renderMenu();
        }

    },
    components:{
        package:package
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

;/*!/components/page/goods/goods.js*/
define('components/page/goods/goods', function(require, exports, module) {

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
    picture:[],
    visible:1
};

module.exports = Vue.extend({
    template:"<div class=\"page-menu\">\n    <div class=\"panel panel-default  content\">\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" :class=\"{active:view=='list'}\" @click=\"changeView('list')\"><a href=\"javascript:;\">\n                    货物</a></li>\n                <li role=\"presentation\" :class=\"{active:view=='type'}\" @click=\"changeView('type')\"><a href=\"javascript:;\">\n                    分类</a></li>\n            </ul>\n            <a v-show=\"view=='list'\" href=\"javascript:;\" class=\"btn pull-right\" @click=\"onAdd\">\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                新增货物\n            </a>\n            <a v-show=\"view=='type'\" href=\"javascript:;\" class=\"btn pull-right\" @click=\"onAddType\">\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                新增类型\n            </a>\n        </div>\n        <div v-show=\"view=='list'\" class=\"panel-body\">\n            <form class=\"form-inline\">\n                <div class=\"form-group\">\n                    <label>名称</label>\n                    <input type=\"text\" class=\"form-control\"  v-model=\"query.like\" placeholder=\"请填写\">\n                </div>\n                <div class=\"form-group\">\n                    <label >类型</label>\n                    <select class=\"form-control\" v-model=\"query.type\">\n                        <option value=\"\">全部</option>\n                        <option value=\"{{t.key}}\" v-for=\"t in types.types\">{{t.value}}</option>\n                    </select>\n                </div>\n                <button class=\"btn btn-primary\" @click=\"onQuery\">\n                    <span class=\"glyphicon glyphicon-search\"></span>\n                    查询</button>\n            </form>\n            <hr>\n            <table class=\"table table-bordered table-hover\">\n                <tbody>\n                <tr>\n                    <th>\n                        #\n                    </th>\n                    <th>图片\n                    </th>\n                    <th>\n                        名称\n                    </th>\n                    <th>\n                        分类\n                    </th>\n                    <th>\n                        价格\n                    </th>\n                    <th>\n                        状态\n                    </th>\n                    <th>\n                        操作\n                    </th>\n                </tr>\n                <tr v-for=\"m in menu\" track-by=\"_id\">\n                    <td>\n                        {{query.limit*query.page+$index+1}}\n                    </td>\n                    <td>\n                        <span class=\"img-wrap\" v-for=\"p in m.picture\" v-if=\"m.picture.length>0\">\n                            <span class=\"glyphicon glyphicon-remove btn-remove\" @click=\"removeImg(m,p)\"></span>\n                            <img  :src=\"'/data/image/'+p+'/100/100.json'\" class=\"img-rounded\" style=\"width: 80px;margin-left: 5px;height: 80px;\">\n                        </span>\n                        <a href=\"javascript:;\" class=\"btn btn-default btn-sm upfile\">\n                            <span class=\"glyphicon glyphicon-plus\"></span>\n                            <input type=\"file\" value=\"浏览\" @change=\"onAddPic(m,$event)\" />\n                        </a>\n                    </td>\n                    <td>\n                        {{m.name}}\n                    </td>\n                    <td>\n                        <span v-for=\"t in types.types\" v-if=\"t.key==m.type\">{{t.value}}</span>\n                    </td>\n                    <td>\n                        ¥{{m.price}}\n                    </td>\n                    <td>\n                        {{m.visible == 0?\"禁用\":\"启用\"}}\n                    </td>\n                    <td>\n                        <a href=\"javascript:;\" @click=\"onEditGoods(m)\">编辑</a>\n                        <a href=\"javascript:;\" @click=\"onDelGoods(m)\">删除</a>\n                    </td>\n                </tr>\n                </tbody></table>\n            <div class=\"c-pager\">\n                <p class=\"pull-left\">共 {{count}} 条记录，{{query.page+1}}/{{Math.ceil(count/query.limit)}}</p>\n\n                <ul  class=\"pagination pagination-sm\">\n                    <li>\n                    </li>\n                    <li>\n                        <a href=\"javascript:;\" aria-label=\"Previous\" @click=\"toFirst\">\n                            <span class=\"glyphicon glyphicon-step-backward\"></span>\n                        </a>\n                    </li>\n                    <li><a href=\"javascript:;\" :disabled=\"query.page==0\" @click=\"toPre\"><span class=\"glyphicon glyphicon-triangle-left\"></span></a></li>\n                    <li><a href=\"javascript:;\" @click=\"toNext\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a></li>\n\n                    <li>\n                        <a  href=\"javascript:;\"  href=\"#\" aria-label=\"Next\"  @click=\"toLast\">\n                            <span class=\"glyphicon glyphicon-step-forward\"></span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n        <div v-show=\"view=='type'\" class=\"panel-body\">\n            <table class=\"table table-bordered table-hover\">\n                <thead>\n                <tr>\n                    <th>#</th>\n                    <th>名称</th>\n                    <th>排序</th>\n                    <th>操作</th>\n                </tr>\n                </thead>\n                <tbody>\n                    <tr v-for=\"t in types.types\">\n                        <td>{{t.key}}</td>\n                        <td>{{t.value}}</td>\n                        <td>{{t.sort}}</td>\n                        <td><a href=\"javascript:;\" @click=\"onEditType(t)\">编辑</a>\n                      <a href=\"javascript:;\" @click=\"onDelType(t)\">删除</a></td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n\n    <c-form :config=\"modal\" @submit=\"onSubmit\">\n        <validator name=\"valid\">\n            <form class=\"form-horizontal\" novalidate >\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\" :class=\"{'has-warning':$valid.name.invalid&&$valid.name.touched}\">名称</label>\n                    <div class=\"col-sm-10\" :class=\"{'has-warning':$valid.name.invalid&&$valid.name.touched}\">\n                        <input type=\"text\"  class=\"form-control\" placeholder=\"必填\" v-validate:name=\"['required']\" v-model=\"model.name\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\">分类</label>\n                    <div class=\"col-sm-10\">\n                        <select class=\"form-control\" v-model=\"model.type\" number>\n                            <option value=\"{{t.key}}\" v-for=\"t in types.types\">{{t.value}}</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"form-group\" >\n                    <label class=\"col-sm-2 control-label\" :class=\"{'has-warning':$valid.price.invalid&&$valid.price.touched}\" >价格(元)</label>\n                    <div class=\"col-sm-10\" :class=\"{'has-warning':$valid.price.invalid&&$valid.price.touched}\">\n                        <input type=\"number\" class=\"form-control\"  v-validate:price=\"['required']\"  v-model=\"model.price\" placeholder=\"必填\" number>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\" :class=\"{'has-warning':$valid.unit.invalid&&$valid.unit.touched}\" >单位</label>\n                    <div class=\"col-sm-10\" :class=\"{'has-warning':$valid.unit.invalid&&$valid.unit.touched}\">\n                        <input type=\"text\" class=\"form-control\" v-model=\"model.unit\" v-validate:unit=\"['required']\" placeholder=\"必填(份/个/等等)\">\n                    </div>\n                </div>\n                <div class=\"form-group\" >\n                    <label class=\"col-sm-2 control-label\">状态</label>\n                    <div class=\"col-sm-10\">\n                        <select class=\"form-control\" v-model=\"model.visible\" number>\n                            <option value=\"1\">启用</option>\n                            <option value=\"0\">禁用</option>\n                        </select>\n                    </div>\n                </div>\n            </form>\n        </validator>\n    </c-form>\n\n    <c-form :config=\"typeModal\" @submit=\"onSubmitType\" >\n        <form class=\"form-horizontal\">\n            <div class=\"form-group\">\n                <label class=\"col-sm-2 control-label\">值</label>\n                <div class=\"col-sm-10\" >\n                    <input type=\"number\"  class=\"form-control\" v-model=\"type.key\" placeholder=\"必填,请勿重复\"  number>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"col-sm-2 control-label\">名称</label>\n                <div class=\"col-sm-10\" >\n                    <input type=\"text\"  class=\"form-control\" v-model=\"type.value\" placeholder=\"必填\" >\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"col-sm-2 control-label\">排序</label>\n                <div class=\"col-sm-10\" >\n                    <input type=\"number\"  class=\"form-control\" v-model=\"type.sort\" placeholder=\"必填\" number>\n                </div>\n            </div>\n        </form>\n    </c-form>\n</div>\n",
    data: function () {
        return {
            view:"list",
            count:0,
            menu:[],
            model:$.extend({},model),
            modal:{
                show:false,
                title:"新增货物"
            },
            typeModal:{
                show:false,
                title:"新增类型"
            },
            types:{types:[]},
            type:{
                key:null,
                value:null,
                sort:null
            },
            query:{
                limit:10,
                page:0,
                type:"",
                like:""
            }
        }
    },
    methods: {
        render:function (){
            this.renderGoods();
            this.renderTypes();
        },
        renderGoods: function () {
            layer.load();
            var self = this;
            var query = JSON.parse(JSON.stringify(this.query));
            for(var i in query){
                if(!query[i]){
                    delete query[i];
                }
            }
            Service.getGoods(this.query,function (rep) {
                self.menu = rep.lists;
                self.count = rep.count;
                layer.closeAll();
            })
        },
        onQuery: function () {
          this.renderGoods();
        },
        renderTypes: function () {
            var self = this;
          Service.getCtx("dh_type", function (rep) {
              self.types.types = rep.types.types||[];
          });
        },
        onAdd: function () {
            this.model = $.extend(this.model,model);
            this.modal.show = true;
            this.modal.title = "新增货物";
        },
        onEditGoods: function (m) {
            this.model = $.extend(this.model,m);
            this.modal.show = true;
            this.modal.title = "编辑货物";
        },
        onDelGoods: function (m) {
            var self = this;
            layer.confirm("是否删除该货物?",{btn:["确定","取消"]}, function () {
                Service.delGoods(m._id, function (rep) {
                    layer.closeAll();
                    self.menu.$remove(m);
                })
            });
        },
        onAddPic: function (m,e) {
            layer.load(1);
            var self = this;
            this.readFile(e, function (base,name) {
                if(base){
                    Service.upPicture(JSON.stringify({name: name,data:base}), function (rep) {
                        m.picture.push(rep);
                        Service.updateGoods(m._id,JSON.stringify(m), function (rep) {
                            layer.msg("添加图片成功!");
                        });
                        layer.closeAll();
                    });
                }else{
                    layer.closeAll();
                }
            })
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
                Service.updateGoods(this.model._id,JSON.stringify(this.model), function (rep) {
                    self.modal.show = false;
                    self.renderGoods();
                });
            }else{
                Service.insertGoods(JSON.stringify(this.model), function (rep) {
                    self.modal.show = false;
                    self.renderGoods();
                })
            }
        },
        removeImg: function (m,img) {
            var self = this;
            layer.confirm("是否删除该图片?",{btn:["确定","取消"]}, function () {
                m.picture.$remove(img);
                $.extend(self.model,m);
                self.submit();
            });
        },
        changeView: function (v) {
            this.view = v;
        },
        onAddType: function () {
            this.typeModal.show = true;
        },
        updateType: function () {
            Service.putCtx("dh_type",JSON.stringify({types:this.types}), function (rep) {
            });
        },
        onSubmitType: function () {
            if(typeof this.type.key =="number"&&this.type.value){

                var has = false,self = this;

                this.types.types.forEach(function (t) {
                    if(t.key == self.type.key){
                        $.extend(t,self.type);
                        has = true;
                    }
                });
                if(!has){
                    this.types.types.push(JSON.parse(JSON.stringify(this.type)));
                }

                this.updateType();
                this.typeModal.show = false;
                this.type.key = null;
                this.type.value = null;
                this.type.sort = null;
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
        onEditType: function (t) {
            $.extend(this.type,t);
            this.typeModal.show = true;
            this.typeModal.title = "编辑类型";
        },
        toPre: function () {
            if(this.query.page>0){
                this.query.page--;
                this.renderGoods();
            }
        },
        toNext: function () {
            if(this.query.page < Math.ceil(this.count/10)-1){
                this.query.page++;
                this.renderGoods();
            }
        },
        toFirst: function () {
            this.query.page = 0;
            this.renderGoods();
        },
        toLast: function () {
            this.query.page =  Math.ceil(this.count/10)-1;
            this.renderGoods();
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

;/*!/components/page/gOrder/stat/stat.js*/
define('components/page/gOrder/stat/stat', function(require, exports, module) {

/**
 * Created by jack on 16/4/4.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

require("form/form.js");
require("state/state.js");


module.exports = Vue.extend({
    template:"<div class=\"panel-body\">\n    <div class=\"form-inline\">\n        <div class=\"form-group\">\n            <label>日期</label>\n            <input type=\"text\" id=\"datepick\" class=\"form-control\" @click=\"onDateClick\" v-model=\"query.mdate\" placeholder=\"请选择\">\n        </div>\n        <div class=\"form-group\">\n            <label >状态 </label>\n            <select class=\"form-control\" v-model=\"query.state\">\n                <option value=\"\">全部</option>\n                <option value=\"1\">未处理</option>\n                <option value=\"-1\">已取消</option>\n                <option value=\"2\">已完成</option>\n            </select>\n        </div>\n        <button class=\"btn btn-default\" @click=\"onQuery\">\n            <span class=\"glyphicon glyphicon-search\"></span>\n            查询</button>\n    </div>\n    <hr>\n    <table class=\"table table-bordered table-hover\" id=\"weekstat\" >\n        <tbody>\n        <tr>\n            <th>\n                #\n            </th>\n            <th>\n                类型\n            </th>\n            <th>\n                货物名称\n            </th>\n            <th>\n                价格\n            </th>\n            <th>\n                数量\n            </th>\n            <th>\n                总价\n            </th>\n        </tr>\n        <tr v-for=\"o in orders\">\n            <td>{{$index+1}}</td>\n            <td>{{o.type.value}}</td>\n            <td>{{o.name}}</td>\n            <td>{{o.price  | currency \"¥\"}}</td>\n            <td>{{o.number}}</td>\n            <td>{{o.price*o.number  | currency \"¥\"}}</td>\n        </tr>\n        </tbody></table>\n</div>",
    data: function () {
        return {
            orders:[],
            count:0,
            query:{
                page:0,
                mtime:"",
                mdate:"",
                sorts:'{"mdate":-1}',
                state:""
            },
            types:[]
        }
    },
    methods:{
        render: function () {
            $("#datepick").val((new Date()).Format("yyyy-MM-dd"));
            var self = this;
            Service.getCtx("dh_type", function (rep) {
                self.types = rep.types.types||[];
                self.renderOrders();
            });
        },
        renderOrders: function () {
            var self = this;
            layer.load();
            var query = JSON.parse(JSON.stringify(this.query));
            query.mdate = $("#datepick").val();
            for(var i in query){
                if(!query[i]){
                    delete query[i]
                }
            }
            Service.getGoodsOrder(query,function (rep) {
                self.orders = self.stat(rep.lists);
                self.count = rep.count;
                layer.closeAll();
            })
        },
        onDateClick: function () {
            var self = this;
            laydate({istime: true, format: 'YYYY-MM-DD',choose: function (datas) {
                self.query.mdate = datas;
            }});
        },
        onQuery: function () {
            this.query.page = 0;
            this.renderOrders();
        },
        stat: function (list) {
            var result = [],menus = {};
            list.forEach(function (l) {
                if(typeof l.items == "object"){
                    l.items.forEach(function (m) {
                        menus[m._id]= {};
                    })
                }
            });

            var self = this;
            for(var _id in menus){
                list.forEach(function (l) {
                    if(typeof l.items == "object"){
                        l.items.forEach(function (m) {
                            if(m._id == _id){
                                menus[_id].name = m.name;
                                menus[_id].picture = m.picture;
                                menus[_id].price = m.price;
                                menus[_id].type = self.getType(m.type);
                                if(menus[_id].number){
                                    menus[_id].number += m.number;
                                }else{
                                    menus[_id].number = m.number;
                                }

                            }
                        })
                    }
                });
                result.push(menus[_id]);
            }
            return result.sort(function (a,b) {
                return   a.type.sort - b.type.sort;
            });
        },
        getType: function (key) {
            for (var i = 0; i < this.types.length; i++) {
                var obj = this.types[i];
                if(obj.key == key){
                    return obj;
                }
            }
        }
    },
    ready: function () {
        this.render();
    }
});

});

;/*!/components/page/gOrder/weekstat/weekstat.js*/
define('components/page/gOrder/weekstat/weekstat', function(require, exports, module) {

/**
 * Created by jack on 16/4/4.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

require("form/form.js");
require("state/state.js");


module.exports = Vue.extend({
    template:"<div class=\"panel-body\">\n    <div class=\"form-inline\">\n        <div class=\"form-group\">\n            <label>日期</label>\n            <input type=\"text\" id=\"datepick\" class=\"form-control\" @click=\"onDateClick\" v-model=\"query.mdate\" placeholder=\"请选择\">\n        </div>\n        <div class=\"form-group\">\n            <label >状态 </label>\n            <select class=\"form-control\" v-model=\"query.state\">\n                <option value=\"\">全部</option>\n                <option value=\"1\">未处理</option>\n                <option value=\"-1\">已取消</option>\n                <option value=\"2\">已完成</option>\n            </select>\n        </div>\n        <button class=\"btn btn-default\" @click=\"onQuery\">\n            <span class=\"glyphicon glyphicon-search\"></span>\n            查询</button>\n\n        <div class=\"btn-group pull-right\" role=\"group\" aria-label=\"...\">\n            <button type=\"button\" class=\"btn btn-default\" :class=\"{active:view=='0'}\" @click=\"onChangeView(0)\">统计</button>\n            <button type=\"button\" class=\"btn btn-default\"  :class=\"{active:view=='1'}\" @click=\"onChangeView(1)\">汇总</button>\n        </div>\n    </div>\n    <hr>\n    <div v-if=\"view==0\">\n        <table  class=\"table table-bordered table-hover\" id=\"weekstat\">\n            <tbody>\n            <tr>\n                <th>\n                    #\n                </th>\n                <th>\n                    下单人\n                </th>\n                <th>处室</th>\n                <th>\n                    取货时间\n                </th>\n                <th>\n                    货物(名称\\数量\\单价\\合计)\n                </th>\n                <th>\n                    总价\n                </th>\n            </tr>\n            <tr v-for=\"o in orders\">\n                <td>{{$index+1}}</td>\n                <td>{{o.user.name}}</td>\n                <td>{{o.user.department}}</td>\n                <td>{{o.mdate}} {{o.mtime | timeName}}</td>\n                <td>\n                    <table class=\"table  table-bordered table-condensed\" style=\"margin-bottom: 0\">\n                        <tr v-for=\"i in o.items\">\n                            <td  style=\"width: 40%\">{{i.name}}</td>\n                            <td  style=\"width: 20%\">{{i.number}} {{i.unit}}</td>\n                            <td  style=\"width: 20%\">{{i.price  | currency \"¥\"}}</td>\n                            <td  style=\"width: 20%\">{{i.price*i.number | currency \"¥\"}}</td>\n                        </tr>\n                    </table>\n                </td>\n                <td>¥{{getTotal(o)}}</td>\n            </tr>\n            </tbody></table>\n\n    </div>\n\n    <table v-if=\"view==1\" class=\"table table-bordered table-hover\" id=\"weekstat\">\n        <tbody>\n        <tr>\n            <th>\n                #\n            </th>\n            <th>类型</th>\n            <th>\n                货物名称\n            </th>\n            <th>\n                价格\n            </th>\n            <th>\n                数量\n            </th>\n            <th>\n                总价\n            </th>\n        </tr>\n\n        <tr v-for=\"o in stats | orderBy 'type.sort'\">\n            <td>{{$index+1}}</td>\n            <td>{{o.type.value}}</td>\n            <td>{{o.name}}</td>\n            <td>{{o.price | currency \"¥\"}}</td>\n            <td>{{o.number}}{{o.unit}}</td>\n            <td>{{o.price*o.number | currency \"¥\"}}</td>\n        </tr>\n        <tr>\n            <td colspan=\"5\">合计</td>\n            <td>¥{{allCount(stats)}}</td>\n        </tr>\n        </tbody></table>\n</div>",
    data: function () {
        return {
            orders:[],
            stats:[],
            count:0,
            view:0,
            query:{
                mdate:"",
                sorts:'{"mdate":-1}',
                state:"",
                limit:999
            },
            deps:[
            ],
            types:[]
        }
    },
    methods:{
        render: function () {
            var now = (new Date()).Format("yyyy-MM-dd");
            $("#datepick").val(now);
            layer.load();
            var self = this;
            Service.getDepts(function (rep) {
                if(rep){
                    var list = [],sort = 1;
                    rep.forEach(function (r) {
                        if(r.level == 2){
                            r.sort = sort;
                            list.push(r);
                            sort ++;
                        }
                    });
                    self.deps = list;

                    Service.getCtx("dh_type", function (rep) {
                        self.types = rep.types.types||[];
                        self.renderOrders(now);
                        layer.closeAll();

                    });

                }
            })
        },
        onDateClick: function () {
            var self = this;
            laydate({istime: true, format: 'YYYY-MM-DD',choose: function (datas) {
                self.query.mdate = datas;
            }});
        },
        onQuery: function () {
            this.renderOrders( $("#datepick").val());
        },
        getDptsSort: function (dp) {
            for (var i = 0; i < this.deps.length; i++) {
                var obj = this.deps[i];
                if(obj.name == dp){
                    return obj.sort;
                }
                
            }
        },
        renderOrders: function (date) {

            this.orders = [];
            this.stats = [];
            this.view = 0;

            var result = this.getMonDayAndSunDay(date);
            var self = this;

            var query = JSON.parse(JSON.stringify(this.query));
            for(var i in query){
                if(!query[i]){
                    delete query[i]
                }
            }

            for(var i in result){
                (function (date) {
                    query.mdate =date;

                    Service.getGoodsOrder(query, function (rep) {
                        self.orders = self.orders.concat(rep.lists);
                        if(self.orders.length>=2){
                            self.orders.sort(function (a,b) {
                                return self.getDptsSort(a.user.department) - self.getDptsSort(b.user.department)
                            })
                        }

                    });
                })(result[i])
            }

        },
        getTotal: function (o) {
            var total = 0;
            o.items.forEach(function (i) {
                total += (i.price* i.number);
            });
            return total.toFixed(2);
        },
        getMonDayAndSunDay: function (datevalue) {
            var dateValue = datevalue;result = [];
            var arr = dateValue.split("-");
            //月份-1 因为月份从0开始 构造一个Date对象
            var date = new Date(arr[0],arr[1]-1,arr[2]);

            var dateOfWeek = date.getDay();//返回当前日期的在当前周的某一天（0～6--周日到周一）

            var dateOfWeekInt = parseInt(dateOfWeek,10);//转换为整型

            if(dateOfWeekInt==0){//如果是周日
                dateOfWeekInt=7;
            }
            var aa = 7-dateOfWeekInt;//当前于周末相差的天数

            var temp2 = parseInt(arr[2],10);//按10进制转换，以免遇到08和09的时候转换成0
            var sunDay = temp2+aa;//当前日期的周日的日期
            var monDay = sunDay-6//当前日期的周一的日期

            var startDate = new Date(arr[0],arr[1]-1,monDay);
            var endDate = new Date(arr[0],arr[1]-1,sunDay);

            var sm = parseInt(startDate.getMonth())+1;//月份+1 因为月份从0开始
            var em = parseInt(endDate.getMonth())+1;

            if(sm<9){
                sm = "0"+sm;
            }
            if(em<9){
                em = "0"+em;
            }

            var start = startDate.getFullYear()+"-"+sm+"-"+startDate.Format("dd");
            //var end = endDate.getFullYear()+"-"+em+"-"+endDate.Format("dd");
            //var result = new Array();
            result.push(start);

            var dd = new Date(start);
            for (var i = 1; i < 7; i++) {
                dd.setDate(dd.getDate()+ 1);
                result.push(dd.Format("yyyy-MM-dd"));
            }

            return result;
        },
        getType: function (key) {
            for (var i = 0; i < this.types.length; i++) {
                var obj = this.types[i];
                if(obj.key == key){
                    return obj;
                }
            }
        },
        stat: function (list) {
            var result = [],menus = {};
            list.forEach(function (l) {
                if(typeof l.items == "object"){
                    l.items.forEach(function (m) {
                        menus[m._id]= {};
                    })
                }
            });

            var self = this;
            for(var _id in menus){
                list.forEach(function (l) {
                    if(typeof l.items == "object"){
                        l.items.forEach(function (m) {
                            if(m._id == _id){
                                menus[_id].name = m.name;
                                menus[_id].picture = m.picture;
                                menus[_id].unit = m.unit;
                                menus[_id].price = m.price;
                                menus[_id].type = self.getType(m.type);
                                if(menus[_id].number){
                                    menus[_id].number += m.number;
                                }else{
                                    menus[_id].number = m.number;
                                }

                            }
                        })
                    }
                });
                result.push(menus[_id]);
            }
            return result.sort(function (a,b) {
                return   b.number - a.number;
            });
        },
        allCount: function (stats) {
            var total = 0;
            stats.forEach(function (i) {
                total += (i.price* i.number);
            });
            return total.toFixed(2);
        },
        onChangeView: function (v) {
            this.view = v;
        }
    },
    watch:{
      view: function (v) {
          if(v == 1){
              this.stats = this.stat(this.orders);
          }
      }
    },
    ready: function () {
        this.render();
    }
});

});

;/*!/components/page/gOrder/order.js*/
define('components/page/gOrder/order', function(require, exports, module) {

/**
 * Created by jack on 16/4/4.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

require("form/form.js");
require("state/state.js");
var stat = require("components/page/gOrder/stat/stat");
var weekstat = require("components/page/gOrder/weekstat/weekstat");

module.exports = Vue.extend({
    template:"<div class=\"page-menu\">\n    <div class=\"panel panel-default  content\">\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" :class=\"{active:view==0}\" @click=\"changeView(0)\"><a href=\"javascript:;\">\n                    订单</a></li>\n                <li role=\"presentation\"  :class=\"{active:view==1}\" @click=\"changeView(1)\" ><a href=\"javascript:;\">\n                    每日汇总</a></li>\n                <li role=\"presentation\"  :class=\"{active:view==2}\" @click=\"changeView(2)\" ><a href=\"javascript:;\">\n                    周报</a></li>\n            </ul>\n\n            <a href=\"javascript:;\" v-if=\"view==2||view==1\" class=\"btn pull-right\" @click=\"onPrint\">\n                <span class=\"glyphicon glyphicon-print\"></span>\n                打印\n            </a>\n\n        </div>\n        <div v-if=\"view==0\" class=\"panel-body\">\n            <div class=\"form-inline\">\n                <div class=\"form-group\">\n                    <label>日期</label>\n                    <input id=\"mdate\" type=\"text\" class=\"form-control\" @click=\"onDateClick\" v-model=\"query.mdate\" placeholder=\"请选择\">\n                </div>\n                <div class=\"form-group\">\n                    <label >状态 </label>\n                    <select class=\"form-control\" v-model=\"query.state\">\n                        <option value=\"\">全部</option>\n                        <option value=\"1\">未处理</option>\n                        <option value=\"-1\">已取消</option>\n                        <option value=\"2\">已完成</option>\n                    </select>\n                </div>\n                <a href=\"javascript:;\" class=\"btn btn-default\" @click=\"onQuery\">\n                    <span class=\"glyphicon glyphicon-search\"></span>\n                    查询</a>\n            </div>\n            <hr>\n            <table class=\"table table-bordered table-hover\">\n                <tbody>\n                <tr>\n                    <th>\n                        #\n                    </th>\n                    <th>\n                        取货时间\n                    </th>\n                    <th>\n                        下单人\n                    </th>\n                    <th>\n                        下单时间\n                    </th>\n                    <th>货物总类</th>\n                    <th>\n                        状态\n                    </th>\n                    <th>\n                        订单详情\n                    </th>\n\n                    <th>\n                        操作\n                    </th>\n                </tr>\n                <tr v-for=\"o in orders\" track-by=\"_id\">\n                    <td>{{$index+1 + query.limit*query.page}}</td>\n                    <td>{{o.mdate}} {{o.mtime | timeName}}</td>\n                    <td>\n                        <a href=\"javascript:;\" @click=\"onShowUserInfo(o.user,$event)\">{{o.user.name}}</a>\n                    </td>\n                    <td>{{(new Date(o.created)).Format(\"yyyy-MM-dd hh:mm\")}}</td>\n                    <td>{{o.items.length}}</td>\n                    <td><c-state :state=\"o.state\"></c-state></td>\n                    <td><a v-link=\"{path:'/order/goods/'+o._id}\" >查看</a></td>\n                    <td><a @click=\"onCancel(o)\" href=\"javascript:;\">取消</a>\n                        <a @click=\"onComplete(o)\" href=\"javascript:;\">已完成</a>\n                    </td>\n\n                </tr>\n                </tbody></table>\n            <div class=\"c-pager\">\n                <p class=\"pull-left\">共 {{count}} 条记录，每页 {{query.limit}} 条 {{query.page+1}}/{{Math.ceil(count/query.limit)}} </p>\n\n                <ul  class=\"pagination pagination-sm\">\n                    <li>\n                    </li>\n                    <li>\n                        <a href=\"javascript:;\" @click=\"toFirst\" aria-label=\"Previous\">\n                            <span class=\"glyphicon glyphicon-step-backward\"></span>\n                        </a>\n                    </li>\n                    <li><a href=\"javascript:;\" :disabled=\"query.page==0\" @click=\"toPre\"><span class=\"glyphicon glyphicon-triangle-left\"></span></a></li>\n                    <li><a href=\"javascript:;\" @click=\"toNext\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a></li>\n\n                    <li>\n                        <a href=\"javascript:;\" @click=\"toLast\" aria-label=\"Next\">\n                            <span class=\"glyphicon glyphicon-step-forward\"></span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n        <div is=\"stat\" v-if=\"view ==1\"></div>\n        <div is=\"weekstat\" v-if=\"view ==2\"></div>\n    </div>\n\n\n\n\n</div>\n",
    data: function () {
        return {
            view:0,
            orders:[],
            count:0,
            query:{
                page:0,
                limit:20,
                mdate:"",
                sorts:'{"mdate":-1}',
                state:""
            }
        }
    },
    methods:{
        render: function () {
            this.renderOrders();
        },
        renderOrders: function () {
            var self = this;
            layer.load();
            this.query.mdate = $("#mdate").val();
            var query = JSON.parse(JSON.stringify(this.query));
            for(var i in query){
                if(!query[i]){
                    delete query[i];
                }
            }

            Service.getGoodsOrder(query,function (rep) {
                self.orders = rep.lists;
                self.count = rep.count;
                layer.closeAll();
            })
        },
        onDateClick: function () {
            var self = this;
            laydate({istime: true, format: 'YYYY-MM-DD',choose: function (datas) {
                self.query.mdate = datas;
            }});
        },
        onQuery: function () {
            this.query.page = 0;
            this.renderOrders();
        },
        onCancel: function (o) {
            var self = this;
            layer.confirm("是否取消该订单?",{btn:["确定","取消"]}, function () {
                Service.delGoodsOrder(o._id,function (rep) {
                    layer.closeAll();
                    layer.alert("取消成功!");
                    self.renderOrders();
                })
            });
        },
        toPre: function () {
           if(this.query.page>0){
               this.query.page--;
               this.renderOrders();
           }
        },
        toNext: function () {
            if(this.query.page < Math.ceil(this.count/this.query.limit)-1){
                this.query.page++;
                this.renderOrders();
            }
        },
        toFirst: function () {
            this.query.page = 0;
            this.renderOrders();
        },
        toLast: function () {
            this.query.page =  Math.ceil(this.count/this.query.limit)-1;
            this.renderOrders();
        },
        onComplete: function (obj) {
            layer.confirm("确定完成订单?",{btn:["确定","取消"]}, function () {
                obj.state = 2;
                Service.updateGoodsOrder(obj._id,JSON.stringify(obj),function (rep) {
                    layer.closeAll();
                    layer.alert("操作成功!");
                })
            });
        },
        onShowUserInfo: function (user,e) {

            var htmlCodes = [
                '<table class="table" style="margin-bottom: 0">',
                '<tr><td>姓名：</td><td>'+user.name+'</td></tr>',
                '<tr><td>处室：</td><td>'+user.department+'</td></tr>',
                '<tr><td>电话：</td><td>'+user.mobile+'</td></tr>',
                '<tr><td>邮箱：</td><td>'+user.email+'</td></tr>',
                '</table>'
            ].join("");
            layer.tips(htmlCodes, e.target, {
                tips: [1, '#3595CC'],
                time: 4000
            });
        },

        changeView: function (v) {
            this.view = v;
        },
        onPrint: function () {
            $("#weekstat").jqprint();
        }
    },
    components:{
        stat:stat,
        weekstat:weekstat
    },
    ready: function () {
        this.render();
    }
});

});

;/*!/components/page/menu/package/add.js*/
define('components/page/menu/package/add', function(require, exports, module) {

/**
 * Created by jack on 16/5/29.
 */

var Vue = require("component_modules/vue.js");
var Service =require("main/service.js");

module.exports = Vue.extend({
    template:"<div class=\"page-package-add\">\n    <div class=\"panel panel-default  content\">\n        <div class=\"panel-heading\">\n            <a href=\"javascript:history.back()\" class=\"btn pull-right\">\n                <span class=\"glyphicon glyphicon-backward\"></span>\n                返回\n            </a>\n        </div>\n        <div class=\"panel-body\">\n            <form class=\"form-inline\">\n                <div class=\"form-group\">\n                    <label >套餐名称</label>\n                    <input type=\"text\" v-model=\"model.name\" placeholder=\"套餐名称\" class=\"form-control\">\n                </div>\n                <div class=\"form-group\">\n                    <label >排序</label>\n                    <input type=\"number\" v-model=\"model.sort\" placeholder=\"排序\" class=\"form-control\" number>\n                </div>\n            </form>\n            <hr/>\n            <table class=\"table table-bordered table-hover\">\n                <tbody>\n                <tr>\n                    <th>\n                        #\n                    </th>\n                    <th>\n                        类型\n                    </th>\n                    <th>菜名\n                    </th>\n                    <th>\n                        数量\n                    </th>\n                    <th>\n                        <button @click=\"onPlus\"><span class=\"glyphicon glyphicon-plus\"></span></button>\n                    </th>\n                </tr>\n                <tr v-for=\"m in model.menu\" >\n                    <td>{{$index+1}}</td>\n                    <td>{{m.type.value}}</td>\n                    <td>{{m.food.name}}</td>\n                    <td>{{m.number}}</td>\n                    <td><a href=\"javascript:;\" @click=\"onMinus(m)\">删除</a></td>\n                </tr>\n                </tbody></table>\n        </div>\n        <div class=\"panel-footer text-right\">\n            <button class=\"btn btn-primary\" @click=\"onAdd\">确定</button>\n            <button class=\"btn btn-default\" @click=\"onBack\">取消</button>\n        </div>\n    </div>\n\n    <div class=\"modal fade\" id=\"package-add-modal\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                    <h4 class=\"modal-title\">新增</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <form>\n                        <div class=\"form-group\">\n                            <label  class=\"control-label\">菜品类型</label>\n                            <select class=\"form-control\" v-model=\"selectType\">\n                                <option value=\"\">请选择</option>\n                                <option value=\"{{t.key}}\" v-for=\"t in types | orderBy 'sort'\">{{t.value}}</option>\n                            </select>\n                        </div>\n                        <div class=\"form-group\" v-if=\"menu.length>0\">\n                            <label  class=\"control-label\">菜品</label>\n                            <select class=\"form-control\" v-model=\"selectFood\">\n                                <option value=\"{{t._id}}\" v-for=\"t in menu\">{{t.name}}</option>\n                            </select>\n                        </div>\n                        <div class=\"form-group\" v-if=\"menu.length>0\">\n                            <label  class=\"control-label\">数量</label>\n                            <input type=\"number\" placeholder=\"数量\" class=\"form-control\" v-model=\"number\">\n                        </div>\n                    </form>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\" @click=\"onCancel\">取消</button>\n                    <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" @click=\"onInsert\">确定</button>\n                </div>\n            </div><!-- /.modal-content -->\n        </div><!-- /.modal-dialog -->\n    </div><!-- /.modal -->\n</div>",
    data: function () {
        return {
            model:{
                _id:"",
                name:"",
                sort:"",
                menu:[]
            },
            types:[],
            selectType:"",
            selectFood:"",
            menu:[],
            number:1
        }
    },
    methods:{
        render: function () {
            this.renderTypes();
        },
        onPlus: function () {
            $("#package-add-modal").modal("show");
        },
        onCancel: function () {
            $("#package-add-modal").modal("hide");
        },
        onAdd: function () {
            if(!this.model.name){
                return layer.alert("请输入套餐名称!");
            }
            layer.load();
            var self = this;
            if(!this.model._id){
                Service.addPackage(JSON.stringify(this.model), function (rep) {
                    layer.closeAll();
                    alert("新增成功");
                    self.$root.$broadcast("package-reload");
                    window.history.back();
                });
            }else{
                Service.updatePackage(this.model._id,JSON.stringify(this.model), function (rep) {
                    layer.closeAll();
                    self.$root.$broadcast("package-reload");
                    window.history.back();
                });
            }
        },
        renderTypes: function () {
            var self = this;
            Service.getCtx("dc_type", function (rep) {
                rep.types.types.sort(function (a,b) {
                    var aa = a.sort || 0;
                    var bb = b.sort || 0;
                    return aa-bb;
                });
                self.types = rep.types.types||[];
            });
        },
        renderMenu: function (t) {
            layer.load();
            var self = this;
            Service.getMenus({type:t,limit:999},function (rep) {
                self.menu = rep.lists;
                self.selectFood = self.menu[0]._id;
                layer.closeAll();
            })
        },
        getPackage: function (id,callback) {
            Service.getPackage(function (rep) {
                var list = rep.lists;
                for (var i = 0; i < list.length; i++) {
                    var obj = list[i];
                    if(obj._id == id){
                        return callback.call(this,obj);
                    }
                }
            })
        },
        onInsert: function () {
            this.model.menu.push({
                type:this._getType(this.selectType),
                food:this._getFood(this.selectFood),
                number:this.number
            });
        },
        onMinus: function (m) {
          this.model.menu.$remove(m);
        },
        _getType: function (key) {
            for (var i = 0; i < this.types.length; i++) {
                var obj = this.types[i];
                if(obj.key == key){
                    return obj;
                }
            }
        },
        _getFood: function (id) {
            for (var i = 0; i < this.menu.length; i++) {
                var obj = this.menu[i];
                if(obj._id == id){
                    return obj;
                }
            }
        },
        onBack: function () {
            window.history.back();
        }
    },
    watch:{
        selectType: function (t) {
            if(t){
                this.renderMenu(t);
            }else{
                this.menu = [];
            }
        }
    },
    route:{
        data: function () {
            $.extend(this.model,{
                _id:"",
                name:"",
                sort:"",
                menu:[]
            });
            if(this.$route.params.id){
                var self = this;
                this.getPackage(this.$route.params.id, function (rep) {
                    $.extend(self.model,rep);
                });
            }
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

var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div class=\"mui-content\">\n    <div class=\"mui-content-padded\">\n        订单列表\n    </div>\n    <ul class=\"mui-table-view\">\n        <li class=\"mui-table-view-cell mui-media \">\n            <a class=\"mui-navigate-right\">\n                <div class=\"mui-media-body\">\n                    2016-04-01 下午\n                    <p class='mui-ellipsis'>8号桌(包厢) 10人</p>\n                </div>\n            </a>\n        </li>\n    </ul>\n</div>\n\n<c-nav view=\"list\"></c-nav>",
    data: function () {
      return {
      }
    }
});

});
