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

//var source = "http://xs.demo.hddznet.com:9015/";
//var prefix = "http://localhost:8002";
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
            window.location.href="login.html";
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

module.exports = {
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
    template:"<div class=\"page-stat\" >\n\n    <div class=\"panel panel-default content\">\n        <div class=\"panel-heading\">\n\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" class=\"active\"><a href=\"#\">\n                    日报</a></li>\n                <li role=\"presentation\"><a href=\"#\">\n                    月报</a></li>\n                <li role=\"presentation\"><a href=\"#\">\n                    年报</a></li>\n            </ul>\n        </div>\n        <div class=\"panel-body\">\n            <!--<table class=\"table table-bordered table-hover\">-->\n            <!--<tbody>-->\n            <!--<tr>-->\n            <!--<th>-->\n            <!--起步-->\n            <!--</th>-->\n            <!--<th>-->\n            <!--CSS-->\n            <!--</th>-->\n            <!--<th>-->\n            <!--元件-->\n            <!--</th>-->\n            <!--<th>-->\n            <!--模块-->\n            <!--</th>-->\n            <!--</tr>-->\n            <!--<tr>-->\n            <!--<td>-->\n            <!--下载前端框架-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--文本-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--网格系统-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--框架-->\n            <!--</td>-->\n            <!--<iframe id=\"tmp_downloadhelper_iframe\" style=\"display: none;\"></iframe></tr>-->\n            <!--<tr>-->\n            <!--<td>-->\n            <!--框架包含的文件-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--图片-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--图标-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--头部-->\n            <!--</td>-->\n            <!--</tr>-->\n            <!--<tr>-->\n            <!--<td>-->\n            <!--基本页面-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--水平线-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--标签-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--Banner-->\n            <!--</td>-->\n            <!--</tr>-->\n            <!--<tr>-->\n            <!--<td>-->\n            <!--响应式布局-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--按钮-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--徽章-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--导航-->\n            <!--</td>-->\n            <!--</tr>-->\n            <!--<tr>-->\n            <!--<td>-->\n            <!--浏览器支持-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--列表-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--进度条-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--面包屑-->\n            <!--</td>-->\n            <!--</tr>-->\n            <!--<tr>-->\n            <!--<td>-->\n            <!--下载前端框架-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--文本-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--网格系统-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--框架-->\n            <!--</td>-->\n            <!--<iframe id=\"tmp_downloadhelper_iframe\" style=\"display: none;\"></iframe></tr>-->\n            <!--<tr>-->\n            <!--<td>-->\n            <!--框架包含的文件-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--图片-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--图标-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--头部-->\n            <!--</td>-->\n            <!--</tr>-->\n            <!--<tr>-->\n            <!--<td>-->\n            <!--基本页面-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--水平线-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--标签-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--Banner-->\n            <!--</td>-->\n            <!--</tr>-->\n            <!--<tr>-->\n            <!--<td>-->\n            <!--响应式布局-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--按钮-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--徽章-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--导航-->\n            <!--</td>-->\n            <!--</tr>-->\n            <!--<tr>-->\n            <!--<td>-->\n            <!--浏览器支持-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--列表-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--进度条-->\n            <!--</td>-->\n            <!--<td>-->\n            <!--面包屑-->\n            <!--</td>-->\n            <!--</tr>-->\n            <!--</tbody></table>-->\n            <!--<div class=\"c-pager\">-->\n            <!--<p class=\"pull-left\">共 11 条记录，每页 20 条 1/1 </p>-->\n\n            <!--<ul  class=\"pagination pagination-sm\">-->\n            <!--<li>-->\n            <!--</li>-->\n            <!--<li>-->\n            <!--<a href=\"#\" aria-label=\"Previous\">-->\n            <!--<span class=\"glyphicon glyphicon-step-backward\"></span>-->\n            <!--</a>-->\n            <!--</li>-->\n            <!--<li><a href=\"#\"><span class=\"glyphicon glyphicon-triangle-left\"></span></a></li>-->\n            <!--<li><a href=\"#\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a></li>-->\n\n            <!--<li>-->\n            <!--<a href=\"#\" aria-label=\"Next\">-->\n            <!--<span class=\"glyphicon glyphicon-step-forward\"></span>-->\n            <!--</a>-->\n            <!--</li>-->\n            <!--</ul>-->\n            <!--</div>-->\n\n            <div class=\"container\">\n                <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 1536.2 755.1\" style=\"enable-background:new 0 0 1536.2 755.1;\" xml:space=\"preserve\">\n<style type=\"text/css\">\n\t.st0{fill:#E6E7E8;}\n    .st1{fill:#D1D3D4;}\n    .st2{fill:#F4F4F4;}\n    .st3{fill:#BCBEC0;}\n    .st4{fill:#231F20;}\n    .st5{fill:#FFFFFF;}\n    .st6{fill:#D36866;}\n    .st7{fill:#C2C4C6;}\n    .st8{fill:#DBDBDB;}\n    .st9{fill:#A7A9AC;}\n    .st10{fill:#808285;}\n</style>\n<rect x=\"96.7\" y=\"27.1\" class=\"st0\" width=\"157.4\" height=\"471.6\"/>\n<rect x=\"458.3\" class=\"st0\" width=\"157.4\" height=\"471.6\"/>\n<polygon class=\"st1\" points=\"489.6,475.3 219.3,475.3 219.3,72.3 216,68.8 216,51.3 464,51.3 489.6,90.7 \"/>\n<path class=\"st2\" d=\"M1482.2,755.1H54c-36.8,0-62.8-36.1-51.2-71l36.3-108.5h1458l36.3,108.5C1545,719,1519,755.1,1482.2,755.1z\"/>\n<g>\n\t<g>\n\t\t<g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"95.8,582.5 77.8,582.5 77.8,452.9 86.8,438.5 95.8,452.9 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M84.4,583.4l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C86.5,552.3,84.5,582.1,84.4,583.4z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M89.5,583.4l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C90.6,499.1,92.5,546.6,89.5,583.4z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M98.3,585h-23V452.2l11.5-18.4l11.5,18.4V585z M80.3,580h13V453.6l-6.5-10.4l-6.5,10.4V580z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"114.3,582.5 96.3,582.5 96.3,452.9 105.3,438.5 114.3,452.9 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M102.9,583.4l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C105,552.3,103,582.1,102.9,583.4z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M108,583.4l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.4c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C109.1,499.1,111,546.6,108,583.4z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M116.8,585h-23V452.2l11.5-18.4l11.5,18.4V585z M98.8,580h13V453.6l-6.5-10.4l-6.5,10.4V580z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"132.8,582.5 114.8,582.5 114.8,452.9 123.8,438.5 132.8,452.9 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M121.4,583.4l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C123.5,552.3,121.5,582.1,121.4,583.4z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M126.5,583.4l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C127.6,499.1,129.6,546.6,126.5,583.4z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M135.3,585h-23V452.2l11.5-18.4l11.5,18.4V585z M117.3,580h13V453.6l-6.5-10.4l-6.5,10.4V580z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"151.3,582.5 133.3,582.5 133.3,452.9 142.3,438.5 151.3,452.9 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M139.9,583.4l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C142.1,552.3,140,582.1,139.9,583.4z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M145,583.4l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C146.1,499.1,148.1,546.6,145,583.4z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M153.8,585h-23V452.2l11.5-18.4l11.5,18.4V585z M135.8,580h13V453.6l-6.5-10.4l-6.5,10.4V580z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"169.3,582.5 151.3,582.5 151.3,452.9 160.3,438.5 169.3,452.9 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M157.9,583.4l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C160.1,552.3,158,582.1,157.9,583.4z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M163,583.4l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C164.1,499.1,166.1,546.6,163,583.4z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M171.8,585h-23V452.2l11.5-18.4l11.5,18.4V585z M153.8,580h13V453.6l-6.5-10.4l-6.5,10.4V580z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"187.8,582.5 169.8,582.5 169.8,452.9 178.8,438.5 187.8,452.9 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M176.4,583.4l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C178.6,552.3,176.5,582.1,176.4,583.4z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M181.5,583.4l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C182.7,499.1,184.6,546.6,181.5,583.4z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M190.3,585h-23V452.2l11.5-18.4l11.5,18.4V585z M172.3,580h13V453.6l-6.5-10.4l-6.5,10.4V580z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"206.3,582.5 188.3,582.5 188.3,452.9 197.3,438.5 206.3,452.9 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M194.9,583.4l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C197.1,552.3,195,582.1,194.9,583.4z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M200,583.4l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C201.2,499.1,203.1,546.6,200,583.4z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M208.8,585h-23V452.2l11.5-18.4l11.5,18.4V585z M190.8,580h13V453.6l-6.5-10.4l-6.5,10.4V580z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"224.8,582.5 206.8,582.5 206.8,452.9 215.8,438.5 224.8,452.9 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M213.5,583.4l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C215.6,552.3,213.5,582.1,213.5,583.4z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M218.5,583.4l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.4c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C219.7,499.1,221.6,546.6,218.5,583.4z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M227.3,585h-23V452.2l11.5-18.4l11.5,18.4V585z M209.3,580h13V453.6l-6.5-10.4l-6.5,10.4V580z\"/>\n\t\t\t</g>\n\t\t</g>\n\t\t<g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"243.1,582.5 225.1,582.5 225.1,452.9 234.1,438.5 243.1,452.9 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M231.8,583.4l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C233.9,552.3,231.8,582.1,231.8,583.4z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M236.8,583.4l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C238,499.1,239.9,546.6,236.8,583.4z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M245.6,585h-23V452.2l11.5-18.4l11.5,18.4V585z M227.6,580h13V453.6l-6.5-10.4l-6.5,10.4V580z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"261.6,582.5 243.6,582.5 243.6,452.9 252.6,438.5 261.6,452.9 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M250.3,583.4l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C252.4,552.3,250.3,582.1,250.3,583.4z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M255.3,583.4l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C256.5,499.1,258.4,546.6,255.3,583.4z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M264.1,585h-23V452.2l11.5-18.4l11.5,18.4V585z M246.1,580h13V453.6l-6.5-10.4l-6.5,10.4V580z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"280.1,582.5 262.1,582.5 262.1,452.9 271.1,438.5 280.1,452.9 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M268.8,583.4l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C270.9,552.3,268.9,582.1,268.8,583.4z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M273.8,583.4l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C275,499.1,276.9,546.6,273.8,583.4z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M282.6,585h-23V452.2l11.5-18.4l11.5,18.4V585z M264.6,580h13V453.6l-6.5-10.4l-6.5,10.4V580z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"298.6,582.5 280.6,582.5 280.6,452.9 289.6,438.5 298.6,452.9 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M287.3,583.4l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C289.4,552.3,287.4,582.1,287.3,583.4z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M292.3,583.4l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.4c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C293.5,499.1,295.4,546.6,292.3,583.4z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M301.1,585h-23V452.2l11.5-18.4l11.5,18.4V585z M283.1,580h13V453.6l-6.5-10.4l-6.5,10.4V580z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"316.6,582.5 298.6,582.5 298.6,452.9 307.6,438.5 316.6,452.9 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M305.3,583.4l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C307.4,552.3,305.4,582.1,305.3,583.4z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M310.3,583.4l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.4c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C311.5,499.1,313.4,546.6,310.3,583.4z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M319.1,585h-23V452.2l11.5-18.4l11.5,18.4V585z M301.1,580h13V453.6l-6.5-10.4l-6.5,10.4V580z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"335.1,582.5 317.1,582.5 317.1,452.9 326.1,438.5 335.1,452.9 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M323.8,583.4l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C325.9,552.3,323.9,582.1,323.8,583.4z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M328.8,583.4l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C330,499.1,331.9,546.6,328.8,583.4z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M337.6,585h-23V452.2l11.5-18.4l11.5,18.4V585z M319.6,580h13V453.6l-6.5-10.4l-6.5,10.4V580z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"353.6,582.5 335.6,582.5 335.6,452.9 344.6,438.5 353.6,452.9 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M342.3,583.4l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C344.4,552.3,342.4,582.1,342.3,583.4z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M347.3,583.4l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C348.5,499.1,350.4,546.6,347.3,583.4z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M356.1,585h-23V452.2l11.5-18.4l11.5,18.4V585z M338.1,580h13V453.6l-6.5-10.4l-6.5,10.4V580z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"372.1,582.5 354.1,582.5 354.1,452.9 363.1,438.5 372.1,452.9 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M360.8,583.4l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C362.9,552.3,360.9,582.1,360.8,583.4z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M365.8,583.4l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C367,499.1,368.9,546.6,365.8,583.4z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M374.6,585h-23V452.2l11.5-18.4l11.5,18.4V585z M356.6,580h13V453.6l-6.5-10.4l-6.5,10.4V580z\"/>\n\t\t\t</g>\n\t\t</g>\n\t</g>\n\t<g>\n\t\t<g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"390.6,582.4 372.6,582.4 372.6,452.8 381.6,438.4 390.6,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M379.2,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C381.4,552.2,379.3,582.1,379.2,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M384.3,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C385.5,499,387.4,546.5,384.3,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M393.1,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M375.1,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"409.1,582.4 391.1,582.4 391.1,452.8 400.1,438.4 409.1,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M397.7,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C399.9,552.2,397.8,582.1,397.7,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M402.8,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C404,499,405.9,546.5,402.8,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M411.6,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M393.6,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"427.6,582.4 409.6,582.4 409.6,452.8 418.6,438.4 427.6,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M416.3,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C418.4,552.2,416.3,582.1,416.3,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M421.3,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C422.5,499,424.4,546.5,421.3,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M430.1,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M412.1,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"446.1,582.4 428.1,582.4 428.1,452.8 437.1,438.4 446.1,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M434.8,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C436.9,552.2,434.8,582.1,434.8,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M439.8,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C441,499,442.9,546.5,439.8,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M448.6,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M430.6,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"464.1,582.4 446.1,582.4 446.1,452.8 455.1,438.4 464.1,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M452.8,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C454.9,552.2,452.8,582.1,452.8,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M457.8,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C459,499,460.9,546.5,457.8,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M466.6,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M448.6,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"482.6,582.4 464.6,582.4 464.6,452.8 473.6,438.4 482.6,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M471.3,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C473.4,552.2,471.4,582.1,471.3,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M476.3,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C477.5,499,479.4,546.5,476.3,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M485.1,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M467.1,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"501.1,582.4 483.1,582.4 483.1,452.8 492.1,438.4 501.1,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M489.8,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C491.9,552.2,489.9,582.1,489.8,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M494.8,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C496,499,497.9,546.5,494.8,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M503.6,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M485.6,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"519.6,582.4 501.6,582.4 501.6,452.8 510.6,438.4 519.6,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M508.3,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C510.4,552.2,508.4,582.1,508.3,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M513.3,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C514.5,499,516.4,546.5,513.3,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M522.1,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M504.1,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t</g>\n\t\t<g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"537.9,582.4 519.9,582.4 519.9,452.8 528.9,438.4 537.9,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M526.6,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C528.7,552.2,526.7,582.1,526.6,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M531.6,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C532.8,499,534.7,546.5,531.6,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M540.4,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M522.4,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"556.4,582.4 538.4,582.4 538.4,452.8 547.4,438.4 556.4,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M545.1,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C547.2,552.2,545.2,582.1,545.1,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M550.1,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C551.3,499,553.2,546.5,550.1,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M558.9,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M540.9,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"574.9,582.4 556.9,582.4 556.9,452.8 565.9,438.4 574.9,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M563.6,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C565.7,552.2,563.7,582.1,563.6,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M568.6,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C569.8,499,571.7,546.5,568.6,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M577.4,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M559.4,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"593.4,582.4 575.4,582.4 575.4,452.8 584.4,438.4 593.4,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M582.1,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C584.2,552.2,582.2,582.1,582.1,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M587.1,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C588.3,499,590.2,546.5,587.1,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M595.9,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M577.9,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"611.4,582.4 593.4,582.4 593.4,452.8 602.4,438.4 611.4,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M600.1,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C602.2,552.2,600.2,582.1,600.1,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M605.1,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C606.3,499,608.2,546.5,605.1,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M613.9,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M595.9,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"630,582.4 612,582.4 612,452.8 621,438.4 630,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M618.6,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C620.7,552.2,618.7,582.1,618.6,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M623.6,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C624.8,499,626.7,546.5,623.6,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M632.5,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M614.5,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"648.5,582.4 630.5,582.4 630.5,452.8 639.5,438.4 648.5,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M637.1,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C639.2,552.2,637.2,582.1,637.1,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M642.2,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.4c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C643.3,499.1,645.2,546.5,642.2,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M651,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M633,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"667,582.4 649,582.4 649,452.8 658,438.4 667,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M655.6,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C657.7,552.2,655.7,582.1,655.6,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M660.7,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C661.8,499,663.7,546.5,660.7,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M669.5,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M651.5,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t</g>\n\t</g>\n\t<g>\n\t\t<g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"685.5,582.4 667.5,582.4 667.5,452.8 676.5,438.4 685.5,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M674.2,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C676.3,552.2,674.3,582.1,674.2,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M679.2,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C680.4,499,682.3,546.5,679.2,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M688,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M670,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"704.1,582.4 686.1,582.4 686.1,452.8 695.1,438.4 704.1,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M692.7,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C694.8,552.2,692.8,582.1,692.7,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M697.7,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C698.9,499,700.8,546.5,697.7,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M706.6,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M688.6,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon class=\"st1\" points=\"722.6,582.4 704.6,582.4 704.6,452.8 713.6,438.4 722.6,452.8 \t\t\t\t\"/>\n\t\t\t\t<path class=\"st3\" d=\"M711.2,583.3l-1-0.1c0-0.3,2.1-31,0.7-40.1c-1.4-9.2-0.7-21.2-0.1-23.6c0.4-1.6,2.1-63.2,0.7-77.7l1-0.1\n\t\t\t\t\tc1.2,13-0.1,75.6-0.7,78.1c-0.6,2.1-1.3,14.1,0.1,23.2C713.3,552.2,711.3,582.1,711.2,583.3z\"/>\n\t\t\t\t<path class=\"st3\" d=\"M716.3,583.3l-1-0.1c3.1-36.8,1.2-84.2,0.3-104.5c-0.1-3.3-0.2-6-0.3-7.7c-0.4-12.6,1.4-27.8,1.4-28l1,0.1\n\t\t\t\t\tc0,0.2-1.7,15.3-1.4,27.8c0.1,1.8,0.2,4.4,0.3,7.7C717.4,499,719.3,546.5,716.3,583.3z\"/>\n\t\t\t\t<path class=\"st4\" d=\"M725.1,584.9h-23V452.1l11.5-18.4l11.5,18.4V584.9z M707.1,579.9h13V453.5l-6.5-10.4l-6.5,10.4V579.9z\"/>\n\t\t\t</g>\n\t\t</g>\n\t</g>\n</g>\n<polygon class=\"st0\" points=\"1365.3,331.9 1164.2,331.9 1164.2,0 1325.1,0 1365.3,38.1 \"/>\n<path class=\"st1\" d=\"M1122.3,51.3v-3.2c1.8-1,3-3,3-5.2c0-3.3-2.7-6-6-6s-6,2.7-6,6c0,2.2,1.2,4.2,3,5.2v3.2H1006V5.7h-29.4\n\tl-16.2,19v26.6l-53.2,0v9.9l3.6,2.1v268.5h270.3v-267l3.2-2V51.3H1122.3z\"/>\n<g>\n\t<polyline class=\"st5\" points=\"944.3,152.8 884,152.8 884,165.9 931.4,165.9 \t\"/>\n\t<polygon class=\"st4\" points=\"931.4,168.4 881.5,168.4 881.5,150.3 944.3,150.3 944.3,155.3 886.5,155.3 886.5,163.4 931.4,163.4\n\t\t\"/>\n</g>\n<g>\n\t<polygon class=\"st6\" points=\"1406.1,318.7 1350.7,264.7 759.5,264.7 704.1,318.7 \t\"/>\n\t<path class=\"st4\" d=\"M1412.2,321.2H697.9l60.6-59h593.2L1412.2,321.2z M710.2,316.2h689.7l-50.3-49H760.5L710.2,316.2z\"/>\n</g>\n<g>\n\t<polygon class=\"st1\" points=\"722.1,345.7 713.1,336.7 713.1,318.7 1397.1,318.7 1397.1,336.7 1388.1,345.7 \t\"/>\n\t<path class=\"st4\" d=\"M1389.1,348.2H721l-10.5-10.5v-21.5h689v21.5L1389.1,348.2z M723.1,343.2H1387l7.5-7.5v-14.5h-679v14.5\n\t\tL723.1,343.2z\"/>\n</g>\n<g>\n\t<rect x=\"722.1\" y=\"345.7\" class=\"st5\" width=\"666\" height=\"234\"/>\n\t<path class=\"st4\" d=\"M1390.6,582.2h-671v-239h671V582.2z M724.6,577.2h661v-229h-661V577.2z\"/>\n</g>\n<polygon class=\"st4\" points=\"913.6,579.7 908.6,579.7 908.6,465.2 841.6,465.2 841.6,579.7 836.6,579.7 836.6,460.2 913.6,460.2 \"/>\n<g>\n\t<rect x=\"760.4\" y=\"412.2\" class=\"st4\" width=\"99.7\" height=\"5\"/>\n\t<g>\n\t\t<rect x=\"760.4\" y=\"384.2\" class=\"st4\" width=\"99.7\" height=\"5\"/>\n\t\t<rect x=\"740.4\" y=\"398.2\" class=\"st4\" width=\"106.7\" height=\"5\"/>\n\t\t<rect x=\"790.9\" y=\"386.7\" class=\"st4\" width=\"5\" height=\"14\"/>\n\t\t<rect x=\"820.9\" y=\"400.7\" class=\"st4\" width=\"5\" height=\"14\"/>\n\t\t<rect x=\"767.6\" y=\"400.7\" class=\"st4\" width=\"5\" height=\"14\"/>\n\t\t<rect x=\"829.9\" y=\"386.7\" class=\"st4\" width=\"5\" height=\"14\"/>\n\t</g>\n</g>\n<g>\n\t<rect x=\"962.8\" y=\"468.2\" class=\"st4\" width=\"99.7\" height=\"5\"/>\n\t<g>\n\t\t<rect x=\"962.8\" y=\"440.2\" class=\"st4\" width=\"99.7\" height=\"5\"/>\n\t\t<rect x=\"942.8\" y=\"454.2\" class=\"st4\" width=\"106.7\" height=\"5\"/>\n\t\t<rect x=\"993.3\" y=\"442.7\" class=\"st4\" width=\"5\" height=\"14\"/>\n\t\t<rect x=\"1023.3\" y=\"456.7\" class=\"st4\" width=\"5\" height=\"14\"/>\n\t\t<rect x=\"969.9\" y=\"456.7\" class=\"st4\" width=\"5\" height=\"14\"/>\n\t\t<rect x=\"1032.3\" y=\"442.7\" class=\"st4\" width=\"5\" height=\"14\"/>\n\t</g>\n</g>\n<g>\n\t<rect x=\"1276\" y=\"523.6\" class=\"st4\" width=\"99.7\" height=\"5\"/>\n\t<g>\n\t\t<rect x=\"1276\" y=\"495.6\" class=\"st4\" width=\"99.7\" height=\"5\"/>\n\t\t<rect x=\"1256\" y=\"509.6\" class=\"st4\" width=\"106.7\" height=\"5\"/>\n\t\t<rect x=\"1306.5\" y=\"498.1\" class=\"st4\" width=\"5\" height=\"14\"/>\n\t\t<rect x=\"1336.5\" y=\"512.1\" class=\"st4\" width=\"5\" height=\"14\"/>\n\t\t<rect x=\"1283.2\" y=\"512.1\" class=\"st4\" width=\"5\" height=\"14\"/>\n\t\t<rect x=\"1345.5\" y=\"498.1\" class=\"st4\" width=\"5\" height=\"14\"/>\n\t</g>\n</g>\n<g>\n\t<rect x=\"586.6\" y=\"377.1\" class=\"st0\" width=\"29.1\" height=\"246.4\"/>\n\t<path class=\"st4\" d=\"M618.2,626h-34.1V374.6h34.1V626z M589.1,621h24.1V379.6h-24.1V621z\"/>\n</g>\n<g>\n\t<rect x=\"191.7\" y=\"378.3\" class=\"st0\" width=\"29.1\" height=\"246.4\"/>\n\t<path class=\"st4\" d=\"M223.2,627.2h-34.1V375.8h34.1V627.2z M194.2,622.2h24.1V380.8h-24.1V622.2z\"/>\n</g>\n<path class=\"st4\" d=\"M1188.3,484.5l-1.7-2.1l-245.8-304l16.2-15.7l299.8,255.2L1188.3,484.5z M947.6,178.7L1188.8,477l60.5-59\n\tL957.2,169.3L947.6,178.7z\"/>\n<rect x=\"1083.2\" y=\"117.3\" transform=\"matrix(0.716 -0.6981 0.6981 0.716 91.3557 846.1431)\" class=\"st4\" width=\"5\" height=\"387\"/>\n<polygon class=\"st4\" points=\"1186.1,481.3 1167.2,394.4 1253.6,415.5 1252.4,420.4 1173.8,401.2 1191,480.2 \"/>\n<path class=\"st4\" d=\"M1174.9,402.3l-78.8-32.5l-0.4-1l-30.1-78.6l78.8,32.5L1174.9,402.3z M1100,366l66.1,27.3l-25.6-66.8\n\tl-66.1-27.3L1100,366z\"/>\n<path class=\"st4\" d=\"M1077.2,302.1l-72.2-44.6l-0.3-0.5l-42.4-72.8l72.2,44.6l0.3,0.5L1077.2,302.1z M1008.7,253.9l54.1,33.4\n\tl-32-54.9l-54.1-33.4L1008.7,253.9z\"/>\n<path class=\"st4\" d=\"M975,197.2l-32.3-16.7l-14.8-15.2l14.6-14.2l0.7-0.7l2.2-0.1l0.8,0.8l13.1,13.4L975,197.2z M945.7,176.5\n\tl18.3,9.4l-9-18.5l-10.8-11l-9.3,9.1L945.7,176.5z\"/>\n<g>\n\t<path class=\"st7\" d=\"M1310,624.7h-247.5c-18.2,0-33-14.8-33-33v0c0-18.2,14.8-33,33-33H1310c18.2,0,33,14.8,33,33v0\n\t\tC1343,610,1328.2,624.7,1310,624.7z\"/>\n\t<path class=\"st4\" d=\"M1310,627.2h-247.5c-19.6,0-35.5-15.9-35.5-35.5s15.9-35.5,35.5-35.5H1310c19.6,0,35.5,15.9,35.5,35.5\n\t\tS1329.6,627.2,1310,627.2z M1062.5,561.2c-16.8,0-30.5,13.7-30.5,30.5s13.7,30.5,30.5,30.5H1310c16.8,0,30.5-13.7,30.5-30.5\n\t\ts-13.7-30.5-30.5-30.5H1062.5z\"/>\n</g>\n<g>\n\t<g>\n\t\t<ellipse class=\"st8\" cx=\"1062.5\" cy=\"591.2\" rx=\"16.5\" ry=\"15.9\"/>\n\t\t<path class=\"st4\" d=\"M1062.5,609.6c-10.5,0-19-8.3-19-18.4s8.5-18.4,19-18.4s19,8.3,19,18.4S1073,609.6,1062.5,609.6z\n\t\t\t M1062.5,577.7c-7.7,0-14,6-14,13.4s6.3,13.4,14,13.4s14-6,14-13.4S1070.2,577.7,1062.5,577.7z\"/>\n\t</g>\n\t<g>\n\t\t<ellipse class=\"st8\" cx=\"1310\" cy=\"591.2\" rx=\"16.5\" ry=\"15.9\"/>\n\t\t<path class=\"st4\" d=\"M1310,609.6c-10.5,0-19-8.3-19-18.4s8.5-18.4,19-18.4s19,8.3,19,18.4S1320.5,609.6,1310,609.6z M1310,577.7\n\t\t\tc-7.7,0-14,6-14,13.4s6.3,13.4,14,13.4s14-6,14-13.4S1317.7,577.7,1310,577.7z\"/>\n\t</g>\n\t<g>\n\t\t<ellipse class=\"st8\" cx=\"1260.5\" cy=\"591.2\" rx=\"16.5\" ry=\"15.9\"/>\n\t\t<path class=\"st4\" d=\"M1260.5,609.6c-10.5,0-19-8.3-19-18.4s8.5-18.4,19-18.4s19,8.3,19,18.4S1271,609.6,1260.5,609.6z\n\t\t\t M1260.5,577.7c-7.7,0-14,6-14,13.4s6.3,13.4,14,13.4s14-6,14-13.4S1268.2,577.7,1260.5,577.7z\"/>\n\t</g>\n\t<g>\n\t\t<ellipse class=\"st8\" cx=\"1211\" cy=\"591.2\" rx=\"16.5\" ry=\"15.9\"/>\n\t\t<path class=\"st4\" d=\"M1211,609.6c-10.5,0-19-8.3-19-18.4s8.5-18.4,19-18.4s19,8.3,19,18.4S1221.5,609.6,1211,609.6z M1211,577.7\n\t\t\tc-7.7,0-14,6-14,13.4s6.3,13.4,14,13.4s14-6,14-13.4S1218.7,577.7,1211,577.7z\"/>\n\t</g>\n\t<g>\n\t\t<ellipse class=\"st8\" cx=\"1161.5\" cy=\"591.2\" rx=\"16.5\" ry=\"15.9\"/>\n\t\t<path class=\"st4\" d=\"M1161.5,609.6c-10.5,0-19-8.3-19-18.4s8.5-18.4,19-18.4s19,8.3,19,18.4S1172,609.6,1161.5,609.6z\n\t\t\t M1161.5,577.7c-7.7,0-14,6-14,13.4s6.3,13.4,14,13.4s14-6,14-13.4S1169.2,577.7,1161.5,577.7z\"/>\n\t</g>\n\t<g>\n\t\t<ellipse class=\"st8\" cx=\"1112\" cy=\"591.2\" rx=\"16.5\" ry=\"15.9\"/>\n\t\t<path class=\"st4\" d=\"M1112,609.6c-10.5,0-19-8.3-19-18.4s8.5-18.4,19-18.4s19,8.3,19,18.4S1122.5,609.6,1112,609.6z M1112,577.7\n\t\t\tc-7.7,0-14,6-14,13.4s6.3,13.4,14,13.4s14-6,14-13.4S1119.7,577.7,1112,577.7z\"/>\n\t</g>\n</g>\n<g>\n\t<polygon class=\"st3\" points=\"1310,534 1310,451.5 1285.3,426.7 1219.3,426.7 1219.3,534 \t\"/>\n\t<path class=\"st4\" d=\"M1312.5,536.5h-95.8V424.2h69.5l26.2,26.2V536.5z M1221.8,531.5h85.8v-79l-23.3-23.3h-62.5V531.5z\"/>\n</g>\n<g>\n\t<rect x=\"1219.3\" y=\"534\" class=\"st0\" width=\"90.8\" height=\"24.8\"/>\n\t<path class=\"st4\" d=\"M1312.5,561.2h-95.8v-29.8h95.8V561.2z M1221.8,556.2h85.8v-19.8h-85.8V556.2z\"/>\n</g>\n<g>\n\t<polygon class=\"st0\" points=\"1070.8,558.7 1046,534 1219.3,534 1219.3,558.7 \t\"/>\n\t<path class=\"st4\" d=\"M1221.8,561.2h-152l-29.8-29.8h181.8V561.2z M1071.8,556.2h145v-19.8H1052L1071.8,556.2z\"/>\n</g>\n<g>\n\t<polygon class=\"st5\" points=\"1046,534 1037.8,525.7 1037.8,509.2 1079,426.7 1219.3,426.7 1219.3,534 \t\"/>\n\t<path class=\"st4\" d=\"M1221.8,536.5H1045l-9.7-9.7v-18.1l0.3-0.5l41.9-83.9h144.3V536.5z M1047,531.5h169.7V429.2h-136.2l-40.3,80.6\n\t\tv14.9L1047,531.5z\"/>\n</g>\n<path class=\"st4\" d=\"M1131,511.7h-80.8l35.5-71h45.3V511.7z M1058.3,506.7h67.7v-61h-37.2L1058.3,506.7z\"/>\n<g>\n\t<polygon class=\"st1\" points=\"1109,426.7 1109,417.7 1118,408.7 1253,408.7 1262,417.7 1262,426.7 \t\"/>\n\t<path class=\"st4\" d=\"M1264.5,429.2h-158v-12.5l10.5-10.5H1254l10.5,10.5V429.2z M1111.5,424.2h148v-5.5l-7.5-7.5H1119l-7.5,7.5\n\t\tV424.2z\"/>\n</g>\n<g id=\"swinger\">\n\t<polygon class=\"st6\" points=\"734,352.7 1022,352.7 1022,361.7 1013,361.7 1013,379.7 1022,379.7 1022,388.7 806,388.7 734,388.7\n\t\t734,379.7 743,379.7 743,361.7 734,361.7 \t\"/>\n\t<path class=\"st4\" d=\"M1024.5,364.2v-14h-63.7l-72.4-117.7L816,350.2h-84.5v14h9v13h-9v14h293v-14h-9v-13H1024.5z M745.5,364.2h70.2\n\t\tv13h-70.2V364.2z M820.7,364.2h135.4v13H820.7V364.2z M956.1,382.2v4H820.7v-4H956.1z M1010.5,377.2h-49.4v-13h49.4V377.2z\n\t\t M820.7,359.2v-4h135.4v4H820.7z M888.4,242.1L955,350.2H821.9L888.4,242.1z M736.5,359.2v-4h79.2v4h-70.2H743H736.5z M736.5,382.2\n\t\th6.5h2.5h70.2v4h-79.2V382.2z M1019.5,382.2v4h-58.4v-4h49.4h2.5H1019.5z M1013,359.2h-2.5h-49.4v-4h58.4v4H1013z\"/>\n</g>\n<g>\n\t<g>\n\t\t<rect x=\"151.7\" y=\"165.3\" class=\"st5\" width=\"504\" height=\"180\"/>\n\t\t<path class=\"st4\" d=\"M658.2,347.8h-509v-185h509V347.8z M154.2,342.8h499v-175h-499V342.8z\"/>\n\t</g>\n\t<g>\n\t\t<g>\n\t\t\t<rect x=\"151.7\" y=\"132.7\" class=\"st3\" width=\"504\" height=\"33\"/>\n\t\t\t<path class=\"st4\" d=\"M658.2,168.2h-509v-38h509V168.2z M154.2,163.2h499v-28h-499V163.2z\"/>\n\t\t</g>\n\t\t<polygon class=\"st4\" points=\"654.6,168 583.8,136.6 511.7,166.8 439.8,136.6 367.7,166.8 366.7,166.4 295.8,136.6 223.6,166.8\n\t\t\t150.7,135 152.7,130.4 223.7,161.3 295.8,131.2 296.8,131.6 367.7,161.4 439.8,131.2 511.7,161.4 583.9,131.2 656.7,163.4 \t\t\"/>\n\t\t<polygon class=\"st4\" points=\"152.7,168 150.6,163.4 223.6,131 295.7,161.4 367.7,131 439.7,161.4 511.7,131 583.6,161.3\n\t\t\t654.7,130.4 656.7,135 583.7,166.8 511.7,136.4 439.7,166.8 367.7,136.4 295.7,166.8 223.7,136.5 \t\t\"/>\n\t</g>\n\t<g>\n\t\t<g>\n\t\t\t<rect x=\"151.7\" y=\"345.3\" class=\"st3\" width=\"504\" height=\"33\"/>\n\t\t\t<path class=\"st4\" d=\"M658.2,380.8h-509v-38h509V380.8z M154.2,375.8h499v-28h-499V375.8z\"/>\n\t\t</g>\n\t\t<polygon class=\"st4\" points=\"654.6,380.6 583.8,349.2 511.7,379.4 439.8,349.2 367.7,379.4 366.7,379 295.8,349.2 223.6,379.4\n\t\t\t150.7,347.6 152.7,343 223.7,373.9 295.8,343.8 296.8,344.2 367.7,373.9 439.8,343.8 511.7,373.9 583.9,343.8 656.7,376 \t\t\"/>\n\t\t<polygon class=\"st4\" points=\"152.7,380.6 150.6,376 223.6,343.6 295.7,373.9 367.7,343.6 439.7,373.9 511.7,343.6 583.6,373.9\n\t\t\t654.7,343 656.7,347.6 583.7,379.4 511.7,349 439.7,379.4 367.7,349 295.7,379.4 223.7,349 \t\t\"/>\n\t</g>\n</g>\n<path class=\"st4\" d=\"M1120.5,511.7h-23v-15.9c0-9.4,3.7-18.3,10.3-24.9l4.1-4.1c1.4-1.4,3.6-1.9,5.5-1.1c1.9,0.8,3.1,2.6,3.1,4.6\n\tV511.7z M1102.5,506.7h13v-36.4l-4.1,4.1c-5.7,5.7-8.9,13.3-8.9,21.4V506.7z\"/>\n<g>\n\t<g>\n\t\t<g>\n\t\t\t<rect x=\"403.4\" y=\"556.7\" class=\"st3\" width=\"60.7\" height=\"60.7\"/>\n\t\t\t<path class=\"st9\" d=\"M418.2,619.2c0-0.2-3.4-20-4.1-27.1c-0.8-7.2,3.9-37.1,4.1-38.4l1,0.2c0,0.3-4.9,31.1-4.1,38.1\n\t\t\t\tc0.8,7.1,4.1,26.8,4.1,27L418.2,619.2z\"/>\n\t\t\t<path class=\"st9\" d=\"M426.6,619.1c-0.2-1.3-4.5-31.3,0.8-43.3c5.2-11.6-1.3-21-1.4-21.1l0.8-0.6c0.1,0.1,6.9,9.9,1.5,22.1\n\t\t\t\tc-5.2,11.8-0.8,42.5-0.7,42.8L426.6,619.1z\"/>\n\t\t\t<path class=\"st9\" d=\"M452.9,620.5c-0.2-1.4-4.6-33.5,0.2-44c4.7-10.1-2-22.3-2.1-22.5l0.9-0.5c0.3,0.5,7.1,12.8,2.1,23.4\n\t\t\t\tc-4.8,10.2-0.2,43.1-0.2,43.4L452.9,620.5z\"/>\n\t\t\t<path class=\"st4\" d=\"M466.3,619.6h-65.2v-65.2h65.2V619.6z M405.7,615h56.1V559h-56.1V615z\"/>\n\t\t\t<path class=\"st9\" d=\"M438.9,618c0-0.2-5-15.6-1.9-28c3-12.1,1.5-33.2,1.5-33.4l1-0.1c0,0.2,1.5,21.4-1.5,33.7\n\t\t\t\tc-3,12.1,1.8,27.3,1.9,27.4L438.9,618z\"/>\n\t\t</g>\n\n\t\t\t<rect x=\"390.1\" y=\"579.6\" transform=\"matrix(0.7071 -0.7071 0.7071 0.7071 -287.769 477.9242)\" class=\"st3\" width=\"85.8\" height=\"13.5\"/>\n\t\t<path class=\"st9\" d=\"M399.3,616.7l-0.4-0.9c0.1-0.1,13.4-5.5,17.2-12.4c3.7-6.7,11.3-18,17.3-21.8c5.8-3.7,18.3-16.6,19.5-19.6\n\t\t\tl0.9,0.4c-1.4,3.5-14.2,16.5-19.8,20.1c-5.9,3.8-13.4,14.9-17,21.5C413,611.1,399.8,616.5,399.3,616.7z\"/>\n\t\t<path class=\"st9\" d=\"M406.9,617.6l-0.5-0.8c0.1-0.1,13.9-8.7,16.3-15.5c2.5-7.2,11.2-14.7,13.6-16.1c2.4-1.4,22.5-17.4,24.4-21.2\n\t\t\tl0.9,0.5c-2.1,4-22.4,20.1-24.8,21.6c-2.2,1.3-10.7,8.7-13.1,15.6C421.1,608.7,407.5,617.3,406.9,617.6z\"/>\n\t\t<path class=\"st4\" d=\"M407.5,624.7l-12.8-12.8l63.9-63.9l12.8,12.8L407.5,624.7z M401.2,611.9l6.3,6.3l57.4-57.4l-6.3-6.3\n\t\t\tL401.2,611.9z\"/>\n\t\t<rect x=\"396.6\" y=\"549.9\" class=\"st0\" width=\"74.1\" height=\"12.4\"/>\n\t\t<g>\n\t\t\t<path class=\"st9\" d=\"M397,559.6l-0.3-0.9c0.4-0.2,10.9-3.7,18.2-3.7c7.5,0,40-1.7,47.5-5.5l0.4,0.9c-7.7,3.8-40.4,5.6-48,5.6\n\t\t\t\tC407.7,556,397.1,559.5,397,559.6z\"/>\n\t\t\t<path class=\"st9\" d=\"M396.9,555l-0.1-1c0.4-0.1,8.8-1.2,12.2-0.8c3.5,0.4,19.9-3.1,20.8-3.7l0.5,0.8c-1.2,0.8-18.1,4.2-21.5,3.8\n\t\t\t\tC405.5,553.8,396.9,555,396.9,555z\"/>\n\t\t\t<path class=\"st9\" d=\"M403,562.8c-0.1,0-0.1,0-0.2,0l0-1c2.8,0.1,7.5-0.9,13-2c7.2-1.4,15.4-3,21.9-3c11.4,0.1,27.7,4.9,27.8,5\n\t\t\t\tl-0.3,1c-0.2,0-16.4-4.8-27.6-4.9c-6.4-0.1-14.5,1.5-21.7,3C410.6,561.9,405.9,562.8,403,562.8z\"/>\n\t\t\t<path class=\"st9\" d=\"M463,558.5c-1.8,0-3.2-1.2-3.2-2.6s1.5-2.6,3.2-2.6s3.2,1.2,3.2,2.6S464.8,558.5,463,558.5z M463,554.3\n\t\t\t\tc-1.2,0-2.2,0.7-2.2,1.6s1,1.6,2.2,1.6c1.2,0,2.2-0.7,2.2-1.6S464.2,554.3,463,554.3z\"/>\n\t\t\t<ellipse class=\"st9\" cx=\"463.4\" cy=\"556.2\" rx=\"1.1\" ry=\"0.8\"/>\n\t\t</g>\n\t\t<path class=\"st4\" d=\"M473,564.6h-78.7v-16.9H473V564.6z M398.9,560h69.6v-7.8h-69.6V560z\"/>\n\t\t<rect x=\"396.6\" y=\"611.7\" class=\"st0\" width=\"74.1\" height=\"12.4\"/>\n\t\t<path class=\"st9\" d=\"M467,625c-2.3,0-4.9-0.9-7.7-2.8c-9.4-6.1-27.7-6.5-34.2-3.6c-6.9,3.2-28.8-1.7-29.8-1.9l0.2-1\n\t\t\tc0.2,0,22.5,5,29.1,1.9c6.8-3.1,25.3-2.7,35.1,3.6c3.5,2.2,6.4,3.1,8.8,2.4c2.2-0.6,3.1-2.2,3.1-2.2l0.9,0.5c0,0.1-1.1,2-3.7,2.7\n\t\t\tC468.3,624.9,467.7,625,467,625z\"/>\n\t\t<path class=\"st9\" d=\"M470.7,618.4c-9.7-1-11.9-3-13.7-4.7c-1.2-1.1-2.1-1.9-5-2.1c-5.5-0.5-17.9,1.9-26.2,3.4\n\t\t\tc-2.9,0.5-5.1,1-6.3,1.1c-4.6,0.6-22.1-3.8-22.8-4l0.2-1c0.2,0,18,4.5,22.4,3.9c1.2-0.2,3.4-0.6,6.3-1.1\n\t\t\tc8.3-1.6,20.8-3.9,26.4-3.5c3.2,0.3,4.3,1.3,5.6,2.4c1.7,1.5,3.8,3.5,13.2,4.4L470.7,618.4z\"/>\n\t\t<path class=\"st9\" d=\"M457.1,625.7c-0.1-0.1-13.3-5.3-23.3-3.5c-10.2,1.8-37.2-1.3-38.4-1.4l0.1-1c0.3,0,28,3.2,38.1,1.4\n\t\t\tc10.3-1.8,23.3,3.3,23.9,3.5L457.1,625.7z\"/>\n\t\t<path class=\"st4\" d=\"M473,626.4h-78.7v-16.9H473V626.4z M398.9,621.8h69.6V614h-69.6V621.8z\"/>\n\n\t\t\t<rect x=\"439.3\" y=\"580.3\" transform=\"matrix(6.123234e-17 -1 1 6.123234e-17 -122.9819 1051.027)\" class=\"st0\" width=\"49.4\" height=\"13.5\"/>\n\t\t<path class=\"st9\" d=\"M465.6,612.7l-3.7-8.8c-3.7-8.8-2.2-41.5-2.1-42.9l1,0c0,0.3-1.6,33.9,2.1,42.5l3.7,8.8L465.6,612.7z\"/>\n\t\t<path class=\"st9\" d=\"M468.9,612l-0.9-0.5c0.9-1.5-0.6-9.3-4.5-23.1c-2.4-8.5-0.1-25.4,0-26.1l1,0.1c0,0.2-2.3,17.4,0,25.7\n\t\t\tC468.7,602.9,470,610.1,468.9,612z\"/>\n\t\t<path class=\"st9\" d=\"M469.2,587.3c-5.5-8.7-3.2-24.4-3.1-25.1l1,0.2c0,0.2-2.4,15.9,3,24.4L469.2,587.3z\"/>\n\t\t<path class=\"st4\" d=\"M473,614H455v-54H473V614z M459.6,609.4h8.9v-44.8h-8.9V609.4z\"/>\n\n\t\t\t<rect x=\"378.7\" y=\"580.3\" transform=\"matrix(6.123234e-17 -1 1 6.123234e-17 -183.6359 990.373)\" class=\"st0\" width=\"49.4\" height=\"13.5\"/>\n\t\t<path class=\"st9\" d=\"M396,608.5l-1-0.3c0-0.1,2.9-9.1,5-20.4c2.1-11.2-3.6-27.5-3.7-27.6l0.9-0.3c0.2,0.7,5.9,16.7,3.7,28.2\n\t\t\tC398.9,599.3,396,608.4,396,608.5z\"/>\n\t\t<path class=\"st9\" d=\"M410,595.8c-0.5,0-1-0.8-4.7-10.3c-4.2-11.1-4.7-23.1-4.7-23.2l1,0c0,0.1,0.5,11.9,4.7,22.9\n\t\t\tc3.3,8.6,4,9.6,4.1,9.8l-0.3,0.3l0,0.1h0.5l-0.4,0.5C410.1,595.8,410.1,595.8,410,595.8z\"/>\n\t\t<path class=\"st9\" d=\"M396.9,612.2l-0.2-1c6.1-1,9.4-6.1,11.2-10.2c3.5-8.5,3.1-18.8,1.8-20.6c-2.3-3.3-4.5-17.6-4.6-18.2l1-0.1\n\t\t\tc0,0.1,2.2,14.7,4.4,17.8c1.5,2.1,1.9,13-1.7,21.6C406.2,607.6,402.1,611.4,396.9,612.2z\"/>\n\t\t<path class=\"st4\" d=\"M412.4,614h-18.1v-54h18.1V614z M398.9,609.4h8.9v-44.8h-8.9V609.4z\"/>\n\t</g>\n\t<g>\n\t\t<g>\n\t\t\t<rect x=\"500.7\" y=\"556.7\" class=\"st3\" width=\"60.7\" height=\"60.7\"/>\n\t\t\t<path class=\"st9\" d=\"M515.5,619.2c0-0.2-3.4-20-4.1-27.1c-0.8-7.2,3.9-37.1,4.1-38.4l1,0.2c0,0.3-4.9,31.1-4.1,38.1\n\t\t\t\tc0.8,7.1,4.1,26.8,4.1,27L515.5,619.2z\"/>\n\t\t\t<path class=\"st9\" d=\"M523.9,619.1c-0.2-1.3-4.5-31.3,0.8-43.3c5.2-11.6-1.3-21-1.4-21.1l0.8-0.6c0.1,0.1,6.9,9.9,1.5,22.1\n\t\t\t\tc-5.2,11.8-0.8,42.5-0.7,42.8L523.9,619.1z\"/>\n\t\t\t<path class=\"st9\" d=\"M550.2,620.5c-0.2-1.4-4.6-33.5,0.2-44c4.7-10.1-2-22.3-2.1-22.5l0.9-0.5c0.3,0.5,7.1,12.8,2.1,23.4\n\t\t\t\tc-4.8,10.2-0.2,43.1-0.2,43.4L550.2,620.5z\"/>\n\t\t\t<path class=\"st4\" d=\"M563.6,619.6h-65.2v-65.2h65.2V619.6z M503,615h56.1V559H503V615z\"/>\n\t\t\t<path class=\"st9\" d=\"M536.2,618c0-0.2-5-15.6-1.9-28c3-12.1,1.5-33.2,1.5-33.4l1-0.1c0,0.2,1.5,21.4-1.5,33.7\n\t\t\t\tc-3,12.1,1.8,27.3,1.9,27.4L536.2,618z\"/>\n\t\t</g>\n\n\t\t\t<rect x=\"487.4\" y=\"579.6\" transform=\"matrix(0.7071 -0.7071 0.7071 0.7071 -259.2653 546.7381)\" class=\"st3\" width=\"85.8\" height=\"13.5\"/>\n\t\t<path class=\"st9\" d=\"M496.6,616.7l-0.4-0.9c0.1-0.1,13.4-5.5,17.2-12.4c3.7-6.7,11.3-18,17.3-21.8c5.8-3.7,18.3-16.6,19.5-19.6\n\t\t\tl0.9,0.4c-1.4,3.5-14.2,16.5-19.8,20.1c-5.9,3.8-13.4,14.9-17,21.5C510.4,611.1,497.1,616.5,496.6,616.7z\"/>\n\t\t<path class=\"st9\" d=\"M504.2,617.6l-0.5-0.8c0.1-0.1,13.9-8.7,16.3-15.5c2.5-7.2,11.2-14.7,13.6-16.1c2.4-1.4,22.5-17.4,24.4-21.2\n\t\t\tl0.9,0.5c-2.1,4-22.4,20.1-24.8,21.6c-2.2,1.3-10.7,8.7-13.1,15.6C518.4,608.7,504.8,617.3,504.2,617.6z\"/>\n\t\t<path class=\"st4\" d=\"M504.8,624.7L492,611.9l63.9-63.9l12.8,12.8L504.8,624.7z M498.5,611.9l6.3,6.3l57.4-57.4l-6.3-6.3\n\t\t\tL498.5,611.9z\"/>\n\t\t<rect x=\"493.9\" y=\"549.9\" class=\"st0\" width=\"74.1\" height=\"12.4\"/>\n\t\t<g>\n\t\t\t<path class=\"st9\" d=\"M494.3,559.6l-0.3-0.9c0.4-0.2,10.9-3.7,18.2-3.7c7.5,0,40-1.7,47.5-5.5l0.4,0.9c-7.7,3.8-40.4,5.6-48,5.6\n\t\t\t\tC505,556,494.4,559.5,494.3,559.6z\"/>\n\t\t\t<path class=\"st9\" d=\"M494.2,555l-0.1-1c0.4-0.1,8.8-1.2,12.2-0.8c3.5,0.4,19.9-3.1,20.8-3.7l0.5,0.8c-1.2,0.8-18.1,4.2-21.5,3.8\n\t\t\t\tC502.9,553.8,494.3,555,494.2,555z\"/>\n\t\t\t<path class=\"st9\" d=\"M500.3,562.8c-0.1,0-0.1,0-0.2,0l0-1c2.8,0.1,7.5-0.9,13-2c7.1-1.4,15.1-3,21.6-3c0.1,0,0.2,0,0.3,0\n\t\t\t\tc11.4,0.1,27.7,4.9,27.8,5l-0.3,1c-0.2,0-16.4-4.8-27.6-4.9c-6.4-0.1-14.5,1.5-21.7,3C507.9,561.9,503.2,562.8,500.3,562.8z\"/>\n\t\t\t<path class=\"st9\" d=\"M560.3,558.5c-1.8,0-3.2-1.2-3.2-2.6s1.5-2.6,3.2-2.6s3.2,1.2,3.2,2.6S562.1,558.5,560.3,558.5z\n\t\t\t\t M560.3,554.3c-1.2,0-2.2,0.7-2.2,1.6s1,1.6,2.2,1.6c1.2,0,2.2-0.7,2.2-1.6S561.5,554.3,560.3,554.3z\"/>\n\t\t\t<ellipse class=\"st9\" cx=\"560.8\" cy=\"556.2\" rx=\"1.1\" ry=\"0.8\"/>\n\t\t</g>\n\t\t<path class=\"st4\" d=\"M570.4,564.6h-78.7v-16.9h78.7V564.6z M496.2,560h69.6v-7.8h-69.6V560z\"/>\n\t\t<rect x=\"493.9\" y=\"611.7\" class=\"st0\" width=\"74.1\" height=\"12.4\"/>\n\t\t<path class=\"st9\" d=\"M564.3,625c-2.3,0-4.9-0.9-7.7-2.8c-9.4-6.1-27.7-6.5-34.2-3.6c-6.9,3.2-28.8-1.7-29.8-1.9l0.2-1\n\t\t\tc0.2,0,22.5,5,29.1,1.9c6.8-3.1,25.3-2.7,35.1,3.6c3.5,2.2,6.4,3,8.8,2.4c2.2-0.6,3.1-2.2,3.1-2.2l0.9,0.5c0,0.1-1.1,2-3.7,2.7\n\t\t\tC565.6,624.9,565,625,564.3,625z\"/>\n\t\t<path class=\"st9\" d=\"M568,618.4c-9.7-1-11.9-3-13.7-4.7c-1.2-1.1-2.1-1.9-5-2.1c-5.5-0.5-17.9,1.9-26.2,3.4\n\t\t\tc-2.9,0.5-5.1,1-6.3,1.1c-4.6,0.6-22.1-3.8-22.8-4l0.2-1c0.2,0,18,4.5,22.4,3.9c1.2-0.2,3.4-0.6,6.3-1.1\n\t\t\tc8.3-1.6,20.8-3.9,26.4-3.5c3.2,0.3,4.3,1.3,5.6,2.4c1.7,1.5,3.8,3.5,13.2,4.4L568,618.4z\"/>\n\t\t<path class=\"st9\" d=\"M554.4,625.7c-0.1-0.1-13.3-5.3-23.3-3.5c-10.2,1.8-37.2-1.3-38.4-1.4l0.1-1c0.3,0,28,3.2,38.1,1.4\n\t\t\tc10.3-1.8,23.3,3.3,23.9,3.5L554.4,625.7z\"/>\n\t\t<path class=\"st4\" d=\"M570.4,626.4h-78.7v-16.9h78.7V626.4z M496.2,621.8h69.6V614h-69.6V621.8z\"/>\n\n\t\t\t<rect x=\"536.6\" y=\"580.3\" transform=\"matrix(6.123234e-17 -1 1 6.123234e-17 -25.6643 1148.3446)\" class=\"st0\" width=\"49.4\" height=\"13.5\"/>\n\t\t<path class=\"st9\" d=\"M563,612.7l-3.7-8.8c-3.7-8.8-2.2-41.5-2.1-42.9l1,0c0,0.3-1.6,33.9,2.1,42.5l3.7,8.8L563,612.7z\"/>\n\t\t<path class=\"st9\" d=\"M566.2,612l-0.9-0.5c1.3-2.3-3.1-18-4.5-23.1c-2.4-8.5-0.1-25.4,0-26.1l1,0.1c0,0.2-2.3,17.4,0,25.7\n\t\t\tC566,602.9,567.3,610.1,566.2,612z\"/>\n\t\t<path class=\"st9\" d=\"M566.5,587.3c-5.5-8.7-3.2-24.4-3.1-25.1l1,0.2c0,0.2-2.4,15.9,3,24.4L566.5,587.3z\"/>\n\t\t<path class=\"st4\" d=\"M570.4,614h-18.1v-54h18.1V614z M556.9,609.4h8.9v-44.8h-8.9V609.4z\"/>\n\n\t\t\t<rect x=\"476\" y=\"580.3\" transform=\"matrix(6.123234e-17 -1 1 6.123234e-17 -86.3183 1087.6906)\" class=\"st0\" width=\"49.4\" height=\"13.5\"/>\n\t\t<path class=\"st9\" d=\"M493.3,608.5l-1-0.3c0-0.1,2.9-9.1,5-20.4c2.1-11.2-3.6-27.5-3.7-27.6l0.9-0.3c0.2,0.7,5.9,16.7,3.7,28.2\n\t\t\tC496.2,599.3,493.3,608.4,493.3,608.5z\"/>\n\t\t<path class=\"st9\" d=\"M507.4,595.8c-0.5,0-1-0.8-4.7-10.3c-4.2-11.1-4.7-23.1-4.7-23.2l1,0c0,0.1,0.5,11.9,4.7,22.9\n\t\t\tc3.3,8.6,4,9.6,4.1,9.8l-0.3,0.3l0,0.1h0.5l-0.4,0.5C507.4,595.8,507.4,595.8,507.4,595.8z\"/>\n\t\t<path class=\"st9\" d=\"M494.2,612.2l-0.2-1c6.1-1,9.4-6.1,11.2-10.2c3.5-8.5,3.1-18.8,1.8-20.6c-2.3-3.3-4.5-17.6-4.6-18.2l1-0.1\n\t\t\tc0,0.1,2.2,14.7,4.4,17.8c1.5,2.1,1.9,13-1.7,21.6C503.5,607.6,499.4,611.4,494.2,612.2z\"/>\n\t\t<path class=\"st4\" d=\"M509.7,614h-18.1v-54h18.1V614z M496.2,609.4h8.9v-44.8h-8.9V609.4z\"/>\n\t</g>\n\t<g>\n\t\t<g>\n\t\t\t<rect x=\"462.2\" y=\"480.3\" class=\"st3\" width=\"60.7\" height=\"60.7\"/>\n\t\t\t<path class=\"st9\" d=\"M477,542.8c0-0.2-3.4-20-4.1-27.1c-0.8-7.2,3.9-37.1,4.1-38.4l1,0.2c0,0.3-4.9,31.1-4.1,38.1\n\t\t\t\tc0.8,7.1,4.1,26.8,4.1,27L477,542.8z\"/>\n\t\t\t<path class=\"st9\" d=\"M485.4,542.8c-0.2-1.3-4.5-31.3,0.8-43.3c5.2-11.7-1.3-21-1.4-21.1l0.8-0.6c0.1,0.1,6.9,9.9,1.5,22.1\n\t\t\t\tc-5.2,11.8-0.8,42.5-0.7,42.8L485.4,542.8z\"/>\n\t\t\t<path class=\"st9\" d=\"M511.7,544.1c-0.2-1.4-4.6-33.5,0.2-44c4.7-10.1-2-22.3-2.1-22.5l0.9-0.5c0.3,0.5,7.1,12.8,2.1,23.4\n\t\t\t\tc-4.8,10.2-0.2,43.1-0.2,43.4L511.7,544.1z\"/>\n\t\t\t<path class=\"st4\" d=\"M525.1,543.3h-65.2V478h65.2V543.3z M464.5,538.7h56.1v-56.1h-56.1V538.7z\"/>\n\t\t\t<path class=\"st9\" d=\"M497.7,541.7c0-0.2-5-15.6-1.9-28c3-12.1,1.5-33.2,1.5-33.4l1-0.1c0,0.2,1.5,21.4-1.5,33.7\n\t\t\t\tc-3,12.1,1.8,27.3,1.9,27.4L497.7,541.7z\"/>\n\t\t</g>\n\n\t\t\t<rect x=\"449\" y=\"503.2\" transform=\"matrix(0.7071 -0.7071 0.7071 0.7071 -216.5453 497.1539)\" class=\"st3\" width=\"85.8\" height=\"13.5\"/>\n\t\t<path class=\"st9\" d=\"M458.1,540.4l-0.4-0.9c0.1-0.1,13.4-5.5,17.2-12.4c3.7-6.7,11.3-18,17.3-21.8c5.8-3.7,18.3-16.6,19.5-19.6\n\t\t\tl0.9,0.4c-1.4,3.5-14.2,16.5-19.8,20.1c-5.9,3.8-13.4,14.9-17,21.5C471.9,534.7,458.7,540.2,458.1,540.4z\"/>\n\t\t<path class=\"st9\" d=\"M465.7,541.3l-0.5-0.8c0.1-0.1,13.9-8.7,16.3-15.5c2.5-7.2,11.2-14.7,13.6-16.1c2.4-1.4,22.5-17.4,24.4-21.2\n\t\t\tl0.9,0.5c-2.1,4-22.4,20.1-24.8,21.6c-2.2,1.3-10.7,8.7-13.1,15.6C479.9,532.4,466.3,540.9,465.7,541.3z\"/>\n\t\t<path class=\"st4\" d=\"M466.3,548.3l-12.8-12.8l63.9-63.9l12.8,12.8L466.3,548.3z M460,535.5l6.3,6.3l57.4-57.4l-6.3-6.3L460,535.5z\n\t\t\t\"/>\n\t\t<rect x=\"455.5\" y=\"473.6\" class=\"st0\" width=\"74.1\" height=\"12.4\"/>\n\t\t<g>\n\t\t\t<path class=\"st9\" d=\"M455.8,483.2l-0.3-0.9c0.4-0.2,10.9-3.7,18.2-3.7c7.5,0,40-1.7,47.5-5.5l0.4,0.9c-7.7,3.8-40.4,5.6-48,5.6\n\t\t\t\tC466.5,479.6,455.9,483.2,455.8,483.2z\"/>\n\t\t\t<path class=\"st9\" d=\"M455.7,478.7l-0.1-1c0.4,0,8.8-1.2,12.2-0.8c3.5,0.4,19.9-3.1,20.8-3.7l0.5,0.8c-1.2,0.8-18.1,4.2-21.5,3.8\n\t\t\t\tC464.4,477.5,455.8,478.6,455.7,478.7z\"/>\n\t\t\t<path class=\"st9\" d=\"M461.8,486.4c-0.1,0-0.1,0-0.2,0l0-1c2.8,0.1,7.5-0.9,13-2c7.2-1.4,15.4-3,21.9-3c11.4,0.1,27.7,4.9,27.8,5\n\t\t\t\tl-0.3,1c-0.2,0-16.3-4.8-27.6-4.9c-6.4-0.1-14.5,1.5-21.7,3C469.4,485.5,464.7,486.4,461.8,486.4z\"/>\n\t\t\t<path class=\"st9\" d=\"M521.8,482.2c-1.8,0-3.2-1.2-3.2-2.6c0-1.5,1.5-2.6,3.2-2.6s3.2,1.2,3.2,2.6\n\t\t\t\tC525.1,481,523.6,482.2,521.8,482.2z M521.8,477.9c-1.2,0-2.2,0.7-2.2,1.6s1,1.6,2.2,1.6c1.2,0,2.2-0.7,2.2-1.6\n\t\t\t\tS523.1,477.9,521.8,477.9z\"/>\n\t\t\t<ellipse class=\"st9\" cx=\"522.3\" cy=\"479.9\" rx=\"1.1\" ry=\"0.8\"/>\n\t\t</g>\n\t\t<path class=\"st4\" d=\"M531.9,488.2h-78.7v-16.9h78.7V488.2z M457.7,483.6h69.6v-7.8h-69.6V483.6z\"/>\n\t\t<rect x=\"455.5\" y=\"535.4\" class=\"st0\" width=\"74.1\" height=\"12.4\"/>\n\t\t<path class=\"st9\" d=\"M525.9,548.6c-2.3,0-4.9-0.9-7.7-2.8c-9.4-6.1-27.7-6.5-34.2-3.6c-6.9,3.2-28.8-1.7-29.8-1.9l0.2-1\n\t\t\tc0.2,0,22.5,5,29.1,1.9c6.8-3.1,25.3-2.7,35.1,3.6c3.5,2.2,6.4,3.1,8.8,2.4c2.2-0.6,3.1-2.2,3.1-2.2l0.9,0.5c0,0.1-1.1,2-3.7,2.7\n\t\t\tC527.1,548.6,526.5,548.6,525.9,548.6z\"/>\n\t\t<path class=\"st9\" d=\"M529.5,542c-9.7-1-11.9-3-13.7-4.7c-1.2-1.1-2.1-1.9-5-2.1c-5.5-0.5-17.9,1.9-26.2,3.4\n\t\t\tc-2.9,0.5-5.1,1-6.3,1.1c-4.6,0.6-22.1-3.8-22.8-4l0.2-1c0.2,0,18,4.5,22.4,3.9c1.2-0.2,3.4-0.6,6.3-1.1\n\t\t\tc8.3-1.6,20.8-3.9,26.4-3.5c3.2,0.3,4.3,1.3,5.6,2.4c1.7,1.5,3.8,3.5,13.2,4.4L529.5,542z\"/>\n\t\t<path class=\"st9\" d=\"M515.9,549.4c-0.1-0.1-13.3-5.3-23.3-3.5c-10.2,1.8-37.2-1.3-38.4-1.4l0.1-1c0.3,0,28,3.2,38.1,1.4\n\t\t\tc10.3-1.8,23.3,3.3,23.9,3.5L515.9,549.4z\"/>\n\t\t<path class=\"st4\" d=\"M531.9,550h-78.7v-16.9h78.7V550z M457.7,545.4h69.6v-7.8h-69.6V545.4z\"/>\n\n\t\t\t<rect x=\"498.1\" y=\"503.9\" transform=\"matrix(6.123234e-17 -1 1 6.123234e-17 12.2019 1033.4915)\" class=\"st0\" width=\"49.4\" height=\"13.5\"/>\n\t\t<path class=\"st9\" d=\"M524.5,536.3l-3.7-8.8c-3.7-8.8-2.2-41.5-2.1-42.9l1,0c0,0.3-1.6,33.9,2.1,42.5l3.7,8.8L524.5,536.3z\"/>\n\t\t<path class=\"st9\" d=\"M527.7,535.6l-0.9-0.5c0.9-1.5-0.6-9.3-4.5-23.1c-2.4-8.5-0.1-25.4,0-26.1l1,0.1c0,0.2-2.3,17.4,0,25.7\n\t\t\tC527.5,526.6,528.8,533.7,527.7,535.6z\"/>\n\t\t<path class=\"st9\" d=\"M528,510.9c-5.5-8.7-3.2-24.4-3.1-25.1l1,0.2c0,0.2-2.4,15.9,3,24.4L528,510.9z\"/>\n\t\t<path class=\"st4\" d=\"M531.9,537.6h-18.1v-54h18.1V537.6z M518.4,533.1h8.9v-44.8h-8.9V533.1z\"/>\n\n\t\t\t<rect x=\"437.5\" y=\"503.9\" transform=\"matrix(-3.724226e-14 -1 1 -3.724226e-14 -48.4521 972.8374)\" class=\"st0\" width=\"49.4\" height=\"13.5\"/>\n\t\t<path class=\"st9\" d=\"M454.8,532.1l-1-0.3c0-0.1,2.9-9.1,5-20.4c2.1-11.2-3.6-27.5-3.7-27.6l0.9-0.3c0.2,0.7,5.9,16.7,3.7,28.2\n\t\t\tC457.7,523,454.8,532.1,454.8,532.1z\"/>\n\t\t<path class=\"st9\" d=\"M468.9,519.4c-0.5,0-1-0.8-4.7-10.3c-4.2-11.1-4.7-23.1-4.7-23.2l1,0c0,0.1,0.5,11.9,4.7,22.9\n\t\t\tc3.3,8.6,4,9.6,4.1,9.8l-0.3,0.3l0,0l0.5,0l-0.4,0.5C469,519.4,468.9,519.4,468.9,519.4z\"/>\n\t\t<path class=\"st9\" d=\"M455.7,535.8l-0.2-1c6.1-1,9.4-6.1,11.2-10.2c3.5-8.5,3.1-18.8,1.8-20.6c-2.3-3.3-4.5-17.6-4.6-18.2l1-0.1\n\t\t\tc0,0.1,2.2,14.7,4.4,17.8c1.5,2.1,1.9,13-1.7,21.6C465,531.3,460.9,535,455.7,535.8z\"/>\n\t\t<path class=\"st4\" d=\"M471.2,537.6h-18.1v-54h18.1V537.6z M457.7,533.1h8.9v-44.8h-8.9V533.1z\"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<rect x=\"1368.8\" y=\"556.7\" class=\"st3\" width=\"60.7\" height=\"60.7\"/>\n\t\t<path class=\"st9\" d=\"M1383.6,619.2c0-0.2-3.4-20-4.1-27.1c-0.8-7.2,3.9-37.1,4.1-38.4l1,0.2c0,0.3-4.9,31.1-4.1,38.1\n\t\t\tc0.8,7.1,4.1,26.8,4.1,27L1383.6,619.2z\"/>\n\t\t<path class=\"st9\" d=\"M1392,619.1c-0.2-1.3-4.5-31.3,0.8-43.3c5.2-11.6-1.3-21-1.4-21.1l0.8-0.6c0.1,0.1,6.9,9.9,1.5,22.1\n\t\t\tc-5.2,11.8-0.8,42.5-0.7,42.8L1392,619.1z\"/>\n\t\t<path class=\"st9\" d=\"M1418.3,620.5c-0.2-1.4-4.6-33.5,0.2-44c4.7-10.1-2-22.3-2.1-22.5l0.9-0.5c0.3,0.5,7.1,12.8,2.1,23.4\n\t\t\tc-4.8,10.2-0.2,43.1-0.2,43.4L1418.3,620.5z\"/>\n\t\t<path class=\"st4\" d=\"M1431.7,619.6h-65.2v-65.2h65.2V619.6z M1371.1,615h56.1V559h-56.1V615z\"/>\n\t\t<path class=\"st9\" d=\"M1404.3,618c0-0.2-5-15.6-1.9-28c3-12.1,1.5-33.2,1.5-33.4l1-0.1c0,0.2,1.5,21.4-1.5,33.7\n\t\t\tc-3,12.1,1.8,27.3,1.9,27.4L1404.3,618z\"/>\n\t</g>\n\n\t\t<rect x=\"1355.6\" y=\"579.6\" transform=\"matrix(0.7071 -0.7071 0.7071 0.7071 -5.0025 1160.5829)\" class=\"st3\" width=\"85.8\" height=\"13.5\"/>\n\t<path class=\"st9\" d=\"M1364.7,616.7l-0.4-0.9c0.1-0.1,13.4-5.5,17.2-12.4c3.7-6.7,11.3-18,17.3-21.8c5.8-3.7,18.3-16.6,19.5-19.6\n\t\tl0.9,0.4c-1.4,3.5-14.2,16.5-19.8,20.1c-5.9,3.8-13.4,14.9-17,21.5C1378.5,611.1,1365.3,616.5,1364.7,616.7z\"/>\n\t<path class=\"st9\" d=\"M1372.3,617.6l-0.5-0.8c0.1-0.1,13.9-8.7,16.3-15.5c2.5-7.2,11.2-14.7,13.6-16.1c2.4-1.4,22.5-17.4,24.4-21.2\n\t\tl0.9,0.5c-2.1,4-22.4,20.1-24.8,21.6c-2.2,1.3-10.7,8.7-13.1,15.6C1386.5,608.7,1372.9,617.3,1372.3,617.6z\"/>\n\t<path class=\"st4\" d=\"M1372.9,624.7l-12.8-12.8L1424,548l12.8,12.8L1372.9,624.7z M1366.6,611.9l6.3,6.3l57.4-57.4l-6.3-6.3\n\t\tL1366.6,611.9z\"/>\n\t<rect x=\"1362.1\" y=\"549.9\" class=\"st0\" width=\"74.1\" height=\"12.4\"/>\n\t<g>\n\t\t<path class=\"st9\" d=\"M1362.4,559.6l-0.3-0.9c0.4-0.2,10.9-3.7,18.2-3.7c7.5,0,40-1.7,47.5-5.5l0.4,0.9c-7.7,3.8-40.4,5.6-48,5.6\n\t\t\tC1373.2,556,1362.5,559.5,1362.4,559.6z\"/>\n\t\t<path class=\"st9\" d=\"M1362.3,555l-0.1-1c0.4-0.1,8.8-1.2,12.2-0.8c3.5,0.4,19.9-3.1,20.8-3.7l0.5,0.8c-1.2,0.8-18.1,4.2-21.5,3.8\n\t\t\tC1371,553.8,1362.4,555,1362.3,555z\"/>\n\t\t<path class=\"st9\" d=\"M1368.4,562.8c-0.1,0-0.1,0-0.2,0l0-1c2.8,0.1,7.5-0.9,13-2c7.1-1.4,15.1-3,21.6-3c0.1,0,0.2,0,0.3,0\n\t\t\tc11.4,0.1,27.7,4.9,27.8,5l-0.3,1c-0.2,0-16.4-4.8-27.6-4.9c-6.4-0.1-14.5,1.5-21.7,3C1376,561.9,1371.3,562.8,1368.4,562.8z\"/>\n\t\t<path class=\"st9\" d=\"M1428.4,558.5c-1.8,0-3.2-1.2-3.2-2.6s1.5-2.6,3.2-2.6s3.2,1.2,3.2,2.6S1430.2,558.5,1428.4,558.5z\n\t\t\t M1428.4,554.3c-1.2,0-2.2,0.7-2.2,1.6s1,1.6,2.2,1.6c1.2,0,2.2-0.7,2.2-1.6S1429.7,554.3,1428.4,554.3z\"/>\n\t\t<ellipse class=\"st9\" cx=\"1428.9\" cy=\"556.2\" rx=\"1.1\" ry=\"0.8\"/>\n\t</g>\n\t<path class=\"st4\" d=\"M1438.5,564.6h-78.7v-16.9h78.7V564.6z M1364.3,560h69.6v-7.8h-69.6V560z\"/>\n\t<rect x=\"1362.1\" y=\"611.7\" class=\"st0\" width=\"74.1\" height=\"12.4\"/>\n\t<path class=\"st9\" d=\"M1432.5,625c-2.3,0-4.9-0.9-7.7-2.8c-9.4-6.1-27.7-6.5-34.2-3.6c-6.9,3.2-28.8-1.7-29.8-1.9l0.2-1\n\t\tc0.2,0,22.5,5,29.1,1.9c6.8-3.1,25.3-2.7,35.1,3.6c3.5,2.2,6.4,3.1,8.8,2.4c2.2-0.6,3.1-2.2,3.1-2.2l0.9,0.5c0,0.1-1.1,2-3.7,2.7\n\t\tC1433.7,624.9,1433.1,625,1432.5,625z\"/>\n\t<path class=\"st9\" d=\"M1436.1,618.4c-9.7-1-11.9-3-13.7-4.7c-1.2-1.1-2.1-1.9-5-2.1c-5.5-0.5-17.9,1.9-26.2,3.4\n\t\tc-2.9,0.5-5.1,1-6.3,1.1c-4.6,0.6-22.1-3.8-22.8-4l0.2-1c0.2,0,18,4.5,22.4,3.9c1.2-0.2,3.4-0.6,6.3-1.1c8.3-1.6,20.8-3.9,26.4-3.5\n\t\tc3.2,0.3,4.3,1.3,5.6,2.4c1.7,1.5,3.8,3.5,13.2,4.4L1436.1,618.4z\"/>\n\t<path class=\"st9\" d=\"M1422.5,625.7c-0.1-0.1-13.3-5.3-23.3-3.5c-10.2,1.8-37.2-1.3-38.4-1.4l0.1-1c0.3,0,28,3.2,38.1,1.4\n\t\tc10.3-1.8,23.3,3.3,23.9,3.5L1422.5,625.7z\"/>\n\t<path class=\"st4\" d=\"M1438.5,626.4h-78.7v-16.9h78.7V626.4z M1364.3,621.8h69.6V614h-69.6V621.8z\"/>\n\n\t\t<rect x=\"1404.7\" y=\"580.3\" transform=\"matrix(6.123234e-17 -1 1 6.123234e-17 842.4432 2016.4521)\" class=\"st0\" width=\"49.4\" height=\"13.5\"/>\n\t<path class=\"st9\" d=\"M1431.1,612.7l-3.7-8.8c-3.7-8.8-2.2-41.5-2.1-42.9l1,0c0,0.3-1.6,33.9,2.1,42.5l3.7,8.8L1431.1,612.7z\"/>\n\t<path class=\"st9\" d=\"M1434.3,612l-0.9-0.5c1.3-2.3-3.1-18-4.5-23.1c-2.4-8.5-0.1-25.4,0-26.1l1,0.1c0,0.2-2.3,17.4,0,25.7\n\t\tC1434.1,602.9,1435.4,610.1,1434.3,612z\"/>\n\t<path class=\"st9\" d=\"M1434.6,587.3c-5.5-8.7-3.2-24.4-3.1-25.1l1,0.2c0,0.2-2.4,15.9,3,24.4L1434.6,587.3z\"/>\n\t<path class=\"st4\" d=\"M1438.5,614h-18.1v-54h18.1V614z M1425,609.4h8.9v-44.8h-8.9V609.4z\"/>\n\n\t\t<rect x=\"1344.1\" y=\"580.3\" transform=\"matrix(6.123234e-17 -1 1 6.123234e-17 781.7892 1955.7981)\" class=\"st0\" width=\"49.4\" height=\"13.5\"/>\n\t<path class=\"st9\" d=\"M1361.4,608.5l-1-0.3c0-0.1,2.9-9.1,5-20.4c2.1-11.2-3.6-27.5-3.7-27.6l0.9-0.3c0.2,0.7,5.9,16.7,3.7,28.2\n\t\tC1364.3,599.3,1361.4,608.4,1361.4,608.5z\"/>\n\t<path class=\"st9\" d=\"M1375.5,595.8c-0.5,0-1-0.8-4.7-10.3c-4.2-11.1-4.7-23.1-4.7-23.2l1,0c0,0.1,0.5,11.9,4.7,22.9\n\t\tc3.3,8.6,4,9.6,4.1,9.8l-0.3,0.3l0,0.1h0.5l-0.4,0.5C1375.6,595.8,1375.5,595.8,1375.5,595.8z\"/>\n\t<path class=\"st9\" d=\"M1362.3,612.2l-0.2-1c6.1-1,9.4-6.1,11.2-10.2c3.5-8.5,3.1-18.8,1.8-20.6c-2.3-3.3-4.5-17.6-4.6-18.2l1-0.1\n\t\tc0,0.1,2.2,14.7,4.4,17.8c1.5,2.1,1.9,13-1.7,21.6C1371.6,607.6,1367.5,611.4,1362.3,612.2z\"/>\n\t<path class=\"st4\" d=\"M1377.8,614h-18.1v-54h18.1V614z M1364.3,609.4h8.9v-44.8h-8.9V609.4z\"/>\n</g>\n<g>\n\t<g>\n\t\t<rect x=\"943.1\" y=\"556.7\" class=\"st3\" width=\"60.7\" height=\"60.7\"/>\n\t\t<path class=\"st9\" d=\"M957.9,619.2c0-0.2-3.4-20-4.1-27.1c-0.8-7.2,3.9-37.1,4.1-38.4l1,0.2c0,0.3-4.9,31.1-4.1,38.1\n\t\t\tc0.8,7.1,4.1,26.8,4.1,27L957.9,619.2z\"/>\n\t\t<path class=\"st9\" d=\"M966.3,619.1c-0.2-1.3-4.5-31.3,0.8-43.3c5.2-11.6-1.3-21-1.4-21.1l0.8-0.6c0.1,0.1,6.9,9.9,1.5,22.1\n\t\t\tc-5.2,11.8-0.8,42.5-0.7,42.8L966.3,619.1z\"/>\n\t\t<path class=\"st9\" d=\"M992.6,620.5c-0.2-1.4-4.6-33.5,0.2-44c4.7-10.1-2-22.3-2.1-22.5l0.9-0.5c0.3,0.5,7.1,12.8,2.1,23.4\n\t\t\tc-4.8,10.2-0.2,43.1-0.2,43.4L992.6,620.5z\"/>\n\t\t<path class=\"st4\" d=\"M1006,619.6h-65.2v-65.2h65.2V619.6z M945.4,615h56.1V559h-56.1V615z\"/>\n\t\t<path class=\"st9\" d=\"M978.6,618c0-0.2-5-15.6-1.9-28c3-12.1,1.5-33.2,1.5-33.4l1-0.1c0,0.2,1.5,21.4-1.5,33.7\n\t\t\tc-3,12.1,1.8,27.3,1.9,27.4L978.6,618z\"/>\n\t</g>\n\n\t\t<rect x=\"929.8\" y=\"579.6\" transform=\"matrix(0.7071 -0.7071 0.7071 0.7071 -129.696 859.546)\" class=\"st3\" width=\"85.8\" height=\"13.5\"/>\n\t<path class=\"st9\" d=\"M939,616.7l-0.4-0.9c0.1-0.1,13.4-5.5,17.2-12.4c3.7-6.7,11.3-18,17.3-21.8c5.8-3.7,18.3-16.6,19.5-19.6\n\t\tl0.9,0.4c-1.4,3.5-14.2,16.5-19.9,20.1c-5.9,3.8-13.4,14.9-17,21.5C952.7,611.1,939.5,616.5,939,616.7z\"/>\n\t<path class=\"st9\" d=\"M946.6,617.6l-0.5-0.8c0.1-0.1,13.9-8.7,16.3-15.5c2.5-7.2,11.2-14.7,13.6-16.1c2.4-1.4,22.5-17.4,24.4-21.2\n\t\tl0.9,0.5c-2.1,4-22.4,20.1-24.8,21.6c-2.2,1.3-10.7,8.7-13.1,15.6C960.8,608.7,947.2,617.3,946.6,617.6z\"/>\n\t<path class=\"st4\" d=\"M947.2,624.7l-12.8-12.8l63.9-63.9l12.8,12.8L947.2,624.7z M940.9,611.9l6.3,6.3l57.4-57.4l-6.3-6.3\n\t\tL940.9,611.9z\"/>\n\t<rect x=\"936.3\" y=\"549.9\" class=\"st0\" width=\"74.1\" height=\"12.4\"/>\n\t<g>\n\t\t<path class=\"st9\" d=\"M936.6,559.6l-0.3-0.9c0.4-0.2,10.9-3.7,18.2-3.7c7.5,0,40-1.7,47.5-5.5l0.4,0.9c-7.7,3.8-40.4,5.6-48,5.6\n\t\t\tC947.4,556,936.8,559.5,936.6,559.6z\"/>\n\t\t<path class=\"st9\" d=\"M936.6,555l-0.1-1c0.4,0,8.8-1.2,12.2-0.8c3.5,0.4,19.9-3.1,20.8-3.7l0.5,0.8c-1.2,0.8-18.1,4.2-21.5,3.8\n\t\t\tC945.2,553.8,936.6,555,936.6,555z\"/>\n\t\t<path class=\"st9\" d=\"M942.7,562.8c-0.1,0-0.1,0-0.2,0l0-1c2.8,0.1,7.5-0.9,13-2c7.1-1.4,15.1-3,21.6-3c0.1,0,0.2,0,0.3,0\n\t\t\tc11.4,0.1,27.7,4.9,27.8,5l-0.3,1c-0.2,0-16.4-4.8-27.6-4.9c-6.4-0.1-14.5,1.5-21.7,3C950.3,561.9,945.6,562.8,942.7,562.8z\"/>\n\t\t<path class=\"st9\" d=\"M1002.7,558.5c-1.8,0-3.2-1.2-3.2-2.6s1.5-2.6,3.2-2.6s3.2,1.2,3.2,2.6S1004.5,558.5,1002.7,558.5z\n\t\t\t M1002.7,554.3c-1.2,0-2.2,0.7-2.2,1.6s1,1.6,2.2,1.6c1.2,0,2.2-0.7,2.2-1.6S1003.9,554.3,1002.7,554.3z\"/>\n\t\t<ellipse class=\"st9\" cx=\"1003.1\" cy=\"556.2\" rx=\"1.1\" ry=\"0.8\"/>\n\t</g>\n\t<path class=\"st4\" d=\"M1012.7,564.6H934v-16.9h78.7V564.6z M938.6,560h69.6v-7.8h-69.6V560z\"/>\n\t<rect x=\"936.3\" y=\"611.7\" class=\"st0\" width=\"74.1\" height=\"12.4\"/>\n\t<path class=\"st9\" d=\"M1006.7,625c-2.3,0-4.9-0.9-7.7-2.8c-9.4-6.1-27.7-6.5-34.2-3.6c-6.9,3.2-28.8-1.7-29.8-1.9l0.2-1\n\t\tc0.2,0,22.5,5,29.1,1.9c6.8-3.1,25.3-2.7,35.1,3.6c3.5,2.2,6.4,3.1,8.8,2.4c2.2-0.6,3.1-2.2,3.1-2.2l0.9,0.5c0,0.1-1.1,2-3.7,2.7\n\t\tC1008,624.9,1007.4,625,1006.7,625z\"/>\n\t<path class=\"st9\" d=\"M1010.4,618.4c-9.7-1-11.9-3-13.7-4.7c-1.2-1.1-2.1-1.9-5-2.1c-5.5-0.5-17.9,1.9-26.2,3.4\n\t\tc-2.9,0.5-5.1,1-6.3,1.1c-4.6,0.6-22.1-3.8-22.8-4l0.2-1c0.2,0,18,4.5,22.4,3.9c1.2-0.2,3.4-0.6,6.3-1.1c8.3-1.6,20.8-3.9,26.4-3.5\n\t\tc3.2,0.3,4.3,1.3,5.6,2.4c1.7,1.5,3.8,3.5,13.2,4.4L1010.4,618.4z\"/>\n\t<path class=\"st9\" d=\"M996.8,625.7c-0.1-0.1-13.3-5.3-23.3-3.5c-10.2,1.8-37.2-1.3-38.4-1.4l0.1-1c0.3,0,28,3.2,38.1,1.4\n\t\tc10.3-1.8,23.3,3.3,23.9,3.5L996.8,625.7z\"/>\n\t<path class=\"st4\" d=\"M1012.7,626.4H934v-16.9h78.7V626.4z M938.6,621.8h69.6V614h-69.6V621.8z\"/>\n\n\t\t<rect x=\"979\" y=\"580.3\" transform=\"matrix(6.123234e-17 -1 1 6.123234e-17 416.7128 1590.7217)\" class=\"st0\" width=\"49.4\" height=\"13.5\"/>\n\t<path class=\"st9\" d=\"M1005.3,612.7l-3.7-8.8c-3.7-8.8-2.2-41.5-2.1-42.9l1,0c0,0.3-1.6,33.9,2.1,42.5l3.7,8.8L1005.3,612.7z\"/>\n\t<path class=\"st9\" d=\"M1008.6,612l-0.9-0.5c1.3-2.3-3.1-18-4.5-23.1c-2.4-8.5-0.1-25.4,0-26.1l1,0.1c0,0.2-2.3,17.4,0,25.7\n\t\tC1008.4,602.9,1009.7,610.1,1008.6,612z\"/>\n\t<path class=\"st9\" d=\"M1008.9,587.3c-5.5-8.7-3.2-24.4-3.1-25.1l1,0.2c0,0.2-2.4,15.9,3,24.4L1008.9,587.3z\"/>\n\t<path class=\"st4\" d=\"M1012.7,614h-18.1v-54h18.1V614z M999.3,609.4h8.9v-44.8h-8.9V609.4z\"/>\n\n\t\t<rect x=\"918.4\" y=\"580.3\" transform=\"matrix(6.123234e-17 -1 1 6.123234e-17 356.0588 1530.0676)\" class=\"st0\" width=\"49.4\" height=\"13.5\"/>\n\t<path class=\"st9\" d=\"M935.7,608.5l-1-0.3c0-0.1,2.9-9.1,5-20.4c2.1-11.2-3.6-27.5-3.7-27.6l0.9-0.3c0.2,0.7,5.9,16.7,3.7,28.2\n\t\tC938.6,599.3,935.7,608.4,935.7,608.5z\"/>\n\t<path class=\"st9\" d=\"M949.7,595.8c-0.5,0-1-0.8-4.7-10.3c-4.2-11.1-4.7-23.1-4.7-23.2l1,0c0,0.1,0.5,11.9,4.7,22.9\n\t\tc3.3,8.6,4,9.6,4.1,9.8l-0.3,0.3l0,0.1h0.5l-0.4,0.5C949.8,595.8,949.8,595.8,949.7,595.8z\"/>\n\t<path class=\"st9\" d=\"M936.6,612.2l-0.2-1c6.1-1,9.4-6.1,11.2-10.2c3.5-8.5,3.1-18.8,1.8-20.6c-2.3-3.3-4.5-17.6-4.6-18.2l1-0.1\n\t\tc0,0.1,2.2,14.7,4.4,17.8c1.5,2.1,1.9,13-1.7,21.6C945.9,607.6,941.8,611.4,936.6,612.2z\"/>\n\t<path class=\"st4\" d=\"M952.1,614H934v-54h18.1V614z M938.6,609.4h8.9v-44.8h-8.9V609.4z\"/>\n</g>\n<g>\n\t<g>\n\t\t<rect x=\"1466.1\" y=\"556.7\" class=\"st3\" width=\"60.7\" height=\"60.7\"/>\n\t\t<path class=\"st9\" d=\"M1480.9,619.2c0-0.2-3.4-20-4.1-27.1c-0.8-7.2,3.9-37.1,4.1-38.4l1,0.2c0,0.3-4.9,31.1-4.1,38.1\n\t\t\tc0.8,7.1,4.1,26.8,4.1,27L1480.9,619.2z\"/>\n\t\t<path class=\"st9\" d=\"M1489.3,619.1c-0.2-1.3-4.5-31.3,0.8-43.3c5.2-11.6-1.3-21-1.4-21.1l0.8-0.6c0.1,0.1,6.9,9.9,1.5,22.1\n\t\t\tc-5.2,11.8-0.8,42.5-0.7,42.8L1489.3,619.1z\"/>\n\t\t<path class=\"st9\" d=\"M1515.6,620.5c-0.2-1.4-4.6-33.5,0.2-44c4.7-10.1-2-22.3-2.1-22.5l0.9-0.5c0.3,0.5,7.1,12.8,2.1,23.4\n\t\t\tc-4.8,10.2-0.2,43.1-0.2,43.4L1515.6,620.5z\"/>\n\t\t<path class=\"st4\" d=\"M1529.1,619.6h-65.2v-65.2h65.2V619.6z M1468.4,615h56.1V559h-56.1V615z\"/>\n\t\t<path class=\"st9\" d=\"M1501.6,618c0-0.2-5-15.6-1.9-28c3-12.1,1.5-33.2,1.5-33.4l1-0.1c0,0.2,1.5,21.4-1.5,33.7\n\t\t\tc-3,12.1,1.8,27.3,1.9,27.4L1501.6,618z\"/>\n\t</g>\n\n\t\t<rect x=\"1452.9\" y=\"579.6\" transform=\"matrix(0.7071 -0.7071 0.7071 0.7071 23.5012 1229.3967)\" class=\"st3\" width=\"85.8\" height=\"13.5\"/>\n\t<path class=\"st9\" d=\"M1462,616.7l-0.4-0.9c0.1-0.1,13.4-5.5,17.2-12.4c3.7-6.7,11.3-18,17.3-21.8c5.8-3.7,18.3-16.6,19.5-19.6\n\t\tl0.9,0.4c-1.4,3.5-14.2,16.5-19.9,20.1c-5.9,3.8-13.4,14.9-17,21.5C1475.8,611.1,1462.6,616.5,1462,616.7z\"/>\n\t<path class=\"st9\" d=\"M1469.6,617.6l-0.5-0.8c0.1-0.1,13.9-8.7,16.3-15.5c2.5-7.2,11.2-14.7,13.6-16.1c2.4-1.4,22.5-17.4,24.4-21.2\n\t\tl0.9,0.5c-2.1,4-22.4,20.1-24.8,21.6c-2.2,1.3-10.7,8.7-13.1,15.6C1483.8,608.7,1470.2,617.3,1469.6,617.6z\"/>\n\t<path class=\"st4\" d=\"M1470.2,624.7l-12.8-12.8l63.9-63.9l12.8,12.8L1470.2,624.7z M1463.9,611.9l6.3,6.3l57.4-57.4l-6.3-6.3\n\t\tL1463.9,611.9z\"/>\n\t<rect x=\"1459.4\" y=\"549.9\" class=\"st0\" width=\"74.1\" height=\"12.4\"/>\n\t<g>\n\t\t<path class=\"st9\" d=\"M1459.7,559.6l-0.3-0.9c0.4-0.2,10.9-3.7,18.2-3.7c7.5,0,40-1.7,47.5-5.5l0.4,0.9c-7.7,3.8-40.4,5.6-48,5.6\n\t\t\tC1470.5,556,1459.8,559.5,1459.7,559.6z\"/>\n\t\t<path class=\"st9\" d=\"M1459.6,555l-0.1-1c0.4,0,8.8-1.2,12.2-0.8c3.5,0.4,19.9-3.1,20.8-3.7l0.5,0.8c-1.2,0.8-18.1,4.2-21.5,3.8\n\t\t\tC1468.3,553.8,1459.7,555,1459.6,555z\"/>\n\t\t<path class=\"st9\" d=\"M1465.7,562.8c-0.1,0-0.1,0-0.2,0l0-1c2.8,0.1,7.5-0.9,13-2c7.1-1.4,15.1-3,21.6-3c0.1,0,0.2,0,0.3,0\n\t\t\tc11.4,0.1,27.7,4.9,27.8,5l-0.3,1c-0.2,0-16.4-4.8-27.6-4.9c-6.4-0.1-14.5,1.5-21.7,3C1473.3,561.9,1468.6,562.8,1465.7,562.8z\"/>\n\t\t<path class=\"st9\" d=\"M1525.7,558.5c-1.8,0-3.2-1.2-3.2-2.6s1.5-2.6,3.2-2.6s3.2,1.2,3.2,2.6S1527.5,558.5,1525.7,558.5z\n\t\t\t M1525.7,554.3c-1.2,0-2.2,0.7-2.2,1.6s1,1.6,2.2,1.6s2.2-0.7,2.2-1.6S1527,554.3,1525.7,554.3z\"/>\n\t\t<ellipse class=\"st9\" cx=\"1526.2\" cy=\"556.2\" rx=\"1.1\" ry=\"0.8\"/>\n\t</g>\n\t<path class=\"st4\" d=\"M1535.8,564.6h-78.7v-16.9h78.7V564.6z M1461.7,560h69.6v-7.8h-69.6V560z\"/>\n\t<rect x=\"1459.4\" y=\"611.7\" class=\"st0\" width=\"74.1\" height=\"12.4\"/>\n\t<path class=\"st9\" d=\"M1529.8,625c-2.3,0-4.9-0.9-7.7-2.8c-9.4-6.1-27.7-6.5-34.2-3.6c-6.9,3.2-28.8-1.7-29.8-1.9l0.2-1\n\t\tc0.2,0,22.5,5,29.1,1.9c6.8-3.1,25.3-2.7,35.1,3.6c3.5,2.2,6.4,3.1,8.8,2.4c2.2-0.6,3.1-2.2,3.1-2.2l0.9,0.5c0,0.1-1.1,2-3.7,2.7\n\t\tC1531.1,624.9,1530.4,625,1529.8,625z\"/>\n\t<path class=\"st9\" d=\"M1533.5,618.4c-9.7-1-11.9-3-13.7-4.7c-1.2-1.1-2.1-1.9-5-2.1c-5.5-0.5-17.9,1.9-26.2,3.4\n\t\tc-2.9,0.5-5.1,1-6.3,1.1c-4.6,0.6-22.1-3.8-22.8-4l0.2-1c0.2,0,18,4.5,22.4,3.9c1.2-0.2,3.4-0.6,6.3-1.1c8.3-1.6,20.8-3.9,26.4-3.5\n\t\tc3.2,0.3,4.3,1.3,5.6,2.4c1.7,1.5,3.8,3.5,13.2,4.4L1533.5,618.4z\"/>\n\t<path class=\"st9\" d=\"M1519.8,625.7c-0.1-0.1-13.3-5.3-23.3-3.5c-10.2,1.8-37.2-1.3-38.4-1.4l0.1-1c0.3,0,28,3.2,38.1,1.4\n\t\tc10.3-1.9,23.3,3.3,23.9,3.5L1519.8,625.7z\"/>\n\t<path class=\"st4\" d=\"M1535.8,626.4h-78.7v-16.9h78.7V626.4z M1461.7,621.8h69.6V614h-69.6V621.8z\"/>\n\n\t\t<rect x=\"1502.1\" y=\"580.3\" transform=\"matrix(6.123234e-17 -1 1 6.123234e-17 939.7609 2113.7698)\" class=\"st0\" width=\"49.4\" height=\"13.5\"/>\n\t<path class=\"st9\" d=\"M1528.4,612.7l-3.7-8.8c-3.7-8.8-2.2-41.5-2.1-42.9l1,0c0,0.3-1.6,33.9,2.1,42.5l3.7,8.8L1528.4,612.7z\"/>\n\t<path class=\"st9\" d=\"M1531.7,612l-0.9-0.5c0.9-1.5-0.6-9.3-4.5-23.1c-2.4-8.5-0.1-25.4,0-26.1l1,0.1c0,0.2-2.3,17.4,0,25.7\n\t\tC1531.4,602.9,1532.7,610.1,1531.7,612z\"/>\n\t<path class=\"st9\" d=\"M1531.9,587.3c-5.5-8.7-3.2-24.4-3.1-25.1l1,0.2c0,0.2-2.4,15.9,3,24.4L1531.9,587.3z\"/>\n\t<path class=\"st4\" d=\"M1535.8,614h-18.1v-54h18.1V614z M1522.3,609.4h8.9v-44.8h-8.9V609.4z\"/>\n\n\t\t<rect x=\"1441.4\" y=\"580.3\" transform=\"matrix(6.123234e-17 -1 1 6.123234e-17 879.1068 2053.1157)\" class=\"st0\" width=\"49.4\" height=\"13.5\"/>\n\t<path class=\"st9\" d=\"M1458.7,608.5l-1-0.3c0-0.1,2.9-9.1,5-20.4c2.1-11.2-3.6-27.5-3.7-27.6l0.9-0.3c0.2,0.7,5.9,16.7,3.7,28.2\n\t\tC1461.6,599.3,1458.7,608.4,1458.7,608.5z\"/>\n\t<path class=\"st9\" d=\"M1472.8,595.8c-0.5,0-1-0.8-4.7-10.3c-4.2-11.1-4.7-23.1-4.7-23.2l1,0c0,0.1,0.5,11.9,4.7,22.9\n\t\tc3.3,8.6,4,9.6,4.1,9.8l-0.3,0.3l0,0l0.5,0l-0.4,0.5C1472.9,595.8,1472.8,595.8,1472.8,595.8z\"/>\n\t<path class=\"st9\" d=\"M1459.6,612.2l-0.2-1c6.1-1,9.4-6.1,11.2-10.2c3.5-8.5,3.1-18.8,1.8-20.6c-2.3-3.3-4.5-17.6-4.6-18.2l1-0.1\n\t\tc0,0.1,2.2,14.7,4.4,17.8c1.5,2.1,1.9,13-1.7,21.6C1468.9,607.6,1464.8,611.4,1459.6,612.2z\"/>\n\t<path class=\"st4\" d=\"M1475.1,614h-18.1v-54h18.1V614z M1461.7,609.4h8.9v-44.8h-8.9V609.4z\"/>\n</g>\n<g>\n\t<g>\n\t\t<rect x=\"1427.6\" y=\"480.3\" class=\"st3\" width=\"60.7\" height=\"60.7\"/>\n\t\t<path class=\"st9\" d=\"M1442.4,542.8c0-0.2-3.4-20-4.1-27.1c-0.8-7.2,3.9-37.1,4.1-38.4l1,0.2c0,0.3-4.9,31.1-4.1,38.1\n\t\t\tc0.8,7.1,4.1,26.8,4.1,27L1442.4,542.8z\"/>\n\t\t<path class=\"st9\" d=\"M1450.8,542.8c-0.2-1.3-4.5-31.3,0.8-43.3c5.2-11.7-1.3-21-1.4-21.1l0.8-0.6c0.1,0.1,6.9,9.9,1.5,22.1\n\t\t\tc-5.2,11.8-0.8,42.5-0.7,42.8L1450.8,542.8z\"/>\n\t\t<path class=\"st9\" d=\"M1477.2,544.1c-0.2-1.4-4.6-33.5,0.2-44c4.7-10.1-2-22.3-2.1-22.5l0.9-0.5c0.3,0.5,7.1,12.8,2.1,23.4\n\t\t\tc-4.8,10.2-0.2,43.1-0.2,43.4L1477.2,544.1z\"/>\n\t\t<path class=\"st4\" d=\"M1490.6,543.3h-65.2V478h65.2V543.3z M1429.9,538.7h56.1v-56.1h-56.1V538.7z\"/>\n\t\t<path class=\"st9\" d=\"M1463.1,541.7c0-0.2-5-15.6-1.9-28c3-12.1,1.5-33.2,1.5-33.4l1-0.1c0,0.2,1.5,21.4-1.5,33.7\n\t\t\tc-3,12.1,1.8,27.3,1.9,27.4L1463.1,541.7z\"/>\n\t</g>\n\n\t\t<rect x=\"1414.4\" y=\"503.2\" transform=\"matrix(0.7071 -0.7071 0.7071 0.7071 66.2212 1179.8125)\" class=\"st3\" width=\"85.8\" height=\"13.5\"/>\n\t<path class=\"st9\" d=\"M1423.5,540.4l-0.4-0.9c0.1-0.1,13.4-5.5,17.2-12.4c3.7-6.7,11.3-18,17.3-21.8c5.8-3.7,18.3-16.6,19.5-19.6\n\t\tl0.9,0.4c-1.4,3.5-14.2,16.5-19.8,20.1c-5.9,3.8-13.4,14.9-17,21.5C1437.3,534.7,1424.1,540.2,1423.5,540.4z\"/>\n\t<path class=\"st9\" d=\"M1431.1,541.3l-0.5-0.8c0.1-0.1,13.9-8.7,16.3-15.5c2.5-7.2,11.2-14.7,13.6-16.1c2.4-1.4,22.5-17.4,24.4-21.2\n\t\tl0.9,0.5c-2.1,4-22.4,20.1-24.8,21.6c-2.2,1.3-10.7,8.7-13.1,15.6C1445.3,532.4,1431.7,540.9,1431.1,541.3z\"/>\n\t<path class=\"st4\" d=\"M1431.7,548.3l-12.8-12.8l63.9-63.9l12.8,12.8L1431.7,548.3z M1425.4,535.5l6.3,6.3l57.4-57.4l-6.3-6.3\n\t\tL1425.4,535.5z\"/>\n\t<rect x=\"1420.9\" y=\"473.6\" class=\"st0\" width=\"74.1\" height=\"12.4\"/>\n\t<g>\n\t\t<path class=\"st9\" d=\"M1421.2,483.2l-0.3-0.9c0.4-0.2,10.9-3.7,18.2-3.7c7.5,0,40-1.7,47.5-5.5l0.4,0.9c-7.7,3.8-40.4,5.6-48,5.6\n\t\t\tC1432,479.6,1421.3,483.2,1421.2,483.2z\"/>\n\t\t<path class=\"st9\" d=\"M1421.1,478.7l-0.1-1c0.4,0,8.8-1.2,12.2-0.8c3.5,0.4,19.9-3.1,20.8-3.7l0.5,0.8c-1.2,0.8-18.1,4.2-21.5,3.8\n\t\t\tC1429.8,477.5,1421.2,478.6,1421.1,478.7z\"/>\n\t\t<path class=\"st9\" d=\"M1427.2,486.4c-0.1,0-0.1,0-0.2,0l0-1c2.8,0.1,7.5-0.9,13-2c7.2-1.4,15.4-3,21.9-3c11.4,0.1,27.7,4.9,27.8,5\n\t\t\tl-0.3,1c-0.2,0-16.4-4.8-27.6-4.9c-6.4-0.1-14.5,1.5-21.7,3C1434.8,485.5,1430.1,486.4,1427.2,486.4z\"/>\n\t\t<path class=\"st9\" d=\"M1487.2,482.2c-1.8,0-3.2-1.2-3.2-2.6c0-1.5,1.5-2.6,3.2-2.6s3.2,1.2,3.2,2.6\n\t\t\tC1490.5,481,1489,482.2,1487.2,482.2z M1487.2,477.9c-1.2,0-2.2,0.7-2.2,1.6s1,1.6,2.2,1.6c1.2,0,2.2-0.7,2.2-1.6\n\t\t\tS1488.5,477.9,1487.2,477.9z\"/>\n\t\t<ellipse class=\"st9\" cx=\"1487.7\" cy=\"479.9\" rx=\"1.1\" ry=\"0.8\"/>\n\t</g>\n\t<path class=\"st4\" d=\"M1497.3,488.2h-78.7v-16.9h78.7V488.2z M1423.2,483.6h69.6v-7.8h-69.6V483.6z\"/>\n\t<rect x=\"1420.9\" y=\"535.4\" class=\"st0\" width=\"74.1\" height=\"12.4\"/>\n\t<path class=\"st9\" d=\"M1491.3,548.6c-2.3,0-4.9-0.9-7.7-2.8c-9.4-6.1-27.7-6.5-34.2-3.6c-6.9,3.2-28.8-1.7-29.8-1.9l0.2-1\n\t\tc0.2,0,22.5,5,29.1,1.9c6.8-3.1,25.3-2.7,35.1,3.6c3.5,2.2,6.4,3,8.8,2.4c2.2-0.6,3.1-2.2,3.1-2.2l0.9,0.5c0,0.1-1.1,2-3.7,2.7\n\t\tC1492.6,548.6,1491.9,548.6,1491.3,548.6z\"/>\n\t<path class=\"st9\" d=\"M1495,542c-9.7-1-11.9-3-13.7-4.7c-1.2-1.1-2.1-1.9-5-2.1c-5.5-0.5-17.9,1.9-26.2,3.4c-2.9,0.5-5.1,1-6.3,1.1\n\t\tc-4.6,0.6-22.1-3.8-22.8-4l0.2-1c0.2,0,18,4.5,22.4,3.9c1.2-0.2,3.4-0.6,6.3-1.1c8.3-1.6,20.8-3.9,26.4-3.5\n\t\tc3.2,0.3,4.3,1.3,5.6,2.4c1.7,1.5,3.8,3.5,13.2,4.4L1495,542z\"/>\n\t<path class=\"st9\" d=\"M1481.3,549.4c-0.1-0.1-13.3-5.3-23.3-3.5c-10.2,1.8-37.2-1.3-38.4-1.4l0.1-1c0.3,0,28,3.2,38.1,1.4\n\t\tc10.3-1.8,23.3,3.3,23.9,3.5L1481.3,549.4z\"/>\n\t<path class=\"st4\" d=\"M1497.3,550h-78.7v-16.9h78.7V550z M1423.2,545.4h69.6v-7.8h-69.6V545.4z\"/>\n\n\t\t<rect x=\"1463.6\" y=\"503.9\" transform=\"matrix(6.123234e-17 -1 1 6.123234e-17 977.6271 1998.9166)\" class=\"st0\" width=\"49.4\" height=\"13.5\"/>\n\t<path class=\"st9\" d=\"M1489.9,536.3l-3.7-8.8c-3.7-8.8-2.2-41.5-2.1-42.9l1,0c0,0.3-1.6,33.9,2.1,42.5l3.7,8.8L1489.9,536.3z\"/>\n\t<path class=\"st9\" d=\"M1493.2,535.6l-0.9-0.5c1.3-2.3-3.1-18-4.5-23.1c-2.4-8.5-0.1-25.4,0-26.1l1,0.1c0,0.2-2.3,17.4,0,25.7\n\t\tC1492.9,526.6,1494.2,533.7,1493.2,535.6z\"/>\n\t<path class=\"st9\" d=\"M1493.4,510.9c-5.5-8.7-3.2-24.4-3.1-25.1l1,0.2c0,0.2-2.4,15.9,3,24.4L1493.4,510.9z\"/>\n\t<path class=\"st4\" d=\"M1497.3,537.6h-18.1v-54h18.1V537.6z M1483.8,533.1h8.9v-44.8h-8.9V533.1z\"/>\n\n\t\t<rect x=\"1402.9\" y=\"503.9\" transform=\"matrix(-3.724226e-14 -1 1 -3.724226e-14 916.973 1938.2626)\" class=\"st0\" width=\"49.4\" height=\"13.5\"/>\n\t<path class=\"st9\" d=\"M1420.2,532.1l-1-0.3c0-0.1,2.9-9.1,5-20.4c2.1-11.2-3.6-27.5-3.7-27.6l0.9-0.3c0.2,0.7,5.9,16.7,3.7,28.2\n\t\tC1423.1,523,1420.2,532,1420.2,532.1z\"/>\n\t<path class=\"st9\" d=\"M1434.3,519.4c-0.5,0-1-0.8-4.7-10.3c-4.2-11.1-4.7-23.1-4.7-23.2l1,0c0,0.1,0.5,11.9,4.7,22.9\n\t\tc3.3,8.6,4,9.6,4.1,9.8l-0.3,0.3l0,0l0.5,0l-0.4,0.5C1434.4,519.4,1434.3,519.4,1434.3,519.4z\"/>\n\t<path class=\"st9\" d=\"M1421.1,535.8l-0.2-1c6.1-1,9.4-6.1,11.2-10.2c3.5-8.5,3.1-18.8,1.8-20.6c-2.3-3.3-4.5-17.6-4.6-18.2l1-0.1\n\t\tc0,0.1,2.2,14.7,4.4,17.8c1.5,2.1,1.9,13-1.7,21.6C1430.4,531.3,1426.3,535,1421.1,535.8z\"/>\n\t<path class=\"st4\" d=\"M1436.6,537.6h-18.1v-54h18.1V537.6z M1423.2,533.1h8.9v-44.8h-8.9V533.1z\"/>\n</g>\n<rect x=\"1233\" y=\"444.9\" class=\"st10\" width=\"17.5\" height=\"70.9\"/>\n<rect x=\"1256\" y=\"444.9\" class=\"st10\" width=\"17.5\" height=\"70.9\"/>\n<path class=\"st4\" d=\"M888.4,237c-6.2,0-11.3-5.1-11.3-11.3s5.1-11.3,11.3-11.3s11.3,5.1,11.3,11.3S894.6,237,888.4,237z\n\t M888.4,219.4c-3.5,0-6.3,2.8-6.3,6.3s2.8,6.3,6.3,6.3s6.3-2.8,6.3-6.3S891.9,219.4,888.4,219.4z\"/>\n<path class=\"st4\" d=\"M888.4,219.4c-1.4,0-2.5-1.1-2.5-2.5v-50.9c0-1.4,1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5v50.9\n\tC890.9,218.3,889.8,219.4,888.4,219.4z\"/>\n<g>\n\t<g>\n\t\t<rect x=\"704.2\" y=\"593.3\" class=\"st6\" width=\"33.5\" height=\"13.4\"/>\n\t\t<path class=\"st4\" d=\"M740.2,609.2h-38.5v-18.4h38.5V609.2z M706.7,604.2h28.5v-8.4h-28.5V604.2z\"/>\n\t</g>\n\t<g>\n\t\t<rect x=\"744.4\" y=\"593.3\" class=\"st6\" width=\"33.5\" height=\"13.4\"/>\n\t\t<path class=\"st4\" d=\"M780.3,609.2h-38.5v-18.4h38.5V609.2z M746.9,604.2h28.5v-8.4h-28.5V604.2z\"/>\n\t</g>\n\t<g>\n\t\t<rect x=\"751.1\" y=\"580\" class=\"st6\" width=\"33.5\" height=\"13.4\"/>\n\t\t<path class=\"st4\" d=\"M787,595.8h-38.5v-18.4H787V595.8z M753.6,590.8H782v-8.4h-28.5V590.8z\"/>\n\t</g>\n\t<g>\n\t\t<rect x=\"710.9\" y=\"580\" class=\"st6\" width=\"33.5\" height=\"13.4\"/>\n\t\t<path class=\"st4\" d=\"M746.9,595.8h-38.5v-18.4h38.5V595.8z M713.4,590.8h28.5v-8.4h-28.5V590.8z\"/>\n\t</g>\n\t<g>\n\t\t<rect x=\"704.2\" y=\"566.6\" class=\"st6\" width=\"33.5\" height=\"13.4\"/>\n\t\t<path class=\"st4\" d=\"M740.2,582.5h-38.5v-18.4h38.5V582.5z M706.7,577.5h28.5v-8.4h-28.5V577.5z\"/>\n\t</g>\n\t<g>\n\t\t<rect x=\"744.4\" y=\"566.6\" class=\"st6\" width=\"33.5\" height=\"13.4\"/>\n\t\t<path class=\"st4\" d=\"M780.3,582.5h-38.5v-18.4h38.5V582.5z M746.9,577.5h28.5v-8.4h-28.5V577.5z\"/>\n\t</g>\n\t<g>\n\t\t<rect x=\"751.1\" y=\"553.2\" class=\"st6\" width=\"33.5\" height=\"13.4\"/>\n\t\t<path class=\"st4\" d=\"M787,569.1h-38.5v-18.4H787V569.1z M753.6,564.1H782v-8.4h-28.5V564.1z\"/>\n\t</g>\n\t<g>\n\t\t<rect x=\"697.5\" y=\"553.2\" class=\"st6\" width=\"33.5\" height=\"13.4\"/>\n\t\t<path class=\"st4\" d=\"M733.5,569.1H695v-18.4h38.5V569.1z M700,564.1h28.5v-8.4H700V564.1z\"/>\n\t</g>\n\t<g>\n\t\t<rect x=\"724.3\" y=\"539.8\" class=\"st6\" width=\"33.5\" height=\"13.4\"/>\n\t\t<path class=\"st4\" d=\"M760.3,555.7h-38.5v-18.4h38.5V555.7z M726.8,550.7h28.5v-8.4h-28.5V550.7z\"/>\n\t</g>\n\t<g>\n\t\t<rect x=\"791.2\" y=\"593.3\" class=\"st6\" width=\"33.5\" height=\"13.4\"/>\n\t\t<path class=\"st4\" d=\"M827.2,609.2h-38.5v-18.4h38.5V609.2z M793.7,604.2h28.5v-8.4h-28.5V604.2z\"/>\n\t</g>\n\t<g>\n\n\t\t\t<rect x=\"670.6\" y=\"581.7\" transform=\"matrix(0.6117 -0.7911 0.7911 0.6117 -198.5944 772.2253)\" class=\"st6\" width=\"33.5\" height=\"13.4\"/>\n\t\t<path class=\"st4\" d=\"M682.8,609.2L668.3,598l23.5-30.4l14.5,11.2L682.8,609.2z M675.3,597.1l6.6,5.1l17.4-22.5l-6.6-5.1\n\t\t\tL675.3,597.1z\"/>\n\t</g>\n</g>\n<circle class=\"st4\" cx=\"897.6\" cy=\"521.2\" r=\"4.5\"/>\n<g id=\"sleeping\">\n\t<g id=\"zfive\">\n\t\t<path class=\"st6\" d=\"M1109.9,402.2v2.1l-4,10h4v2.4h-7v-2.1c2.6-6.4,4-9.8,4.1-10h-3.2v-2.3H1109.9z\"/>\n\t</g>\n\t<g id=\"zfour\">\n\t\t<path class=\"st6\" d=\"M1100.5,416.7v2l-3.9,9.7h3.9v2.3h-6.7v-2.1c2.5-6.2,3.8-9.4,3.9-9.7h-3.1v-2.3H1100.5z\"/>\n\t</g>\n\t<g id=\"zthree\">\n\t\t<path class=\"st6\" d=\"M1108.4,430.1v1.8l-3.5,8.7h3.5v2.1h-6.1v-1.9c2.3-5.6,3.4-8.5,3.5-8.7h-2.8v-2H1108.4z\"/>\n\t</g>\n\t<g id=\"ztwo\">\n\t\t<path class=\"st6\" d=\"M1099.7,443v1.6l-3.1,7.8h3.1v1.9h-5.4v-1.7c2-5,3.1-7.6,3.2-7.8h-2.5V443H1099.7z\"/>\n\t</g>\n\t<g id=\"zone\">\n\t\t<path class=\"st6\" d=\"M1093.2,455.6v1.4l-2.7,6.7h2.7v1.6h-4.6v-1.4c1.7-4.3,2.6-6.5,2.7-6.7h-2.1v-1.6H1093.2z\"/>\n\t</g>\n</g>\n<g>\n\t<path d=\"M322.4,238.1l3.4,3.5l0,5.8h-5.5v-4.6h-2.8v19.4h2.8v-5.5h5.5v6.8l-3.4,3.4h-6.9l-3.4-3.5l0-21.9l3.5-3.5h6.7H322.4z\"/>\n\t<path d=\"M341.6,241.6v21.9l-3.5,3.5h-6.3l-3.5-3.5v-21.9l3.5-3.5h6.3L341.6,241.6z M336,242.8h-2.2v19.3h2.2V242.8z\"/>\n\t<path d=\"M363.5,238.1v28.8H358V248l-2.8,18.9H353l-3.1-19v19h-5.5v-28.8h7.4l2.1,14.5l1.9-14.5H363.5z\"/>\n\t<path d=\"M372.2,238.1v28.8h-5.5v-28.8H372.2z\"/>\n\t<path d=\"M389.1,238.1v28.8h-5.4l-2.9-11.8v11.8h-5.5v-28.8h5.4l2.9,11.5v-11.5H389.1z\"/>\n\t<path d=\"M395.6,238.1l6.9,0l3.5,3.5l-0.1,5.2h-5.3l-0.1-4h-2.7v19.4h2.7v-5.9H399v-4.6h6.9l0,11.8l-3.4,3.4h-6.9l-3.4-3.5v-21.9\n\t\tl3.3-3.3L395.6,238.1z\"/>\n\t<path d=\"M437,238.1l3.5,3.5v4.8h-5.3v-3.6h-3.1v7.3h4.9l3.5,3.5l0,9.8l-3.4,3.4h-6.9l-3.5-3.5v-4.1h5.2v2.8h3c0-2.9,0-5.4,0-7.7\n\t\th-4.8l-3.3-3.4l-0.1-9.5l3.5-3.5H437z\"/>\n\t<path d=\"M456.4,241.6v21.9l-3.5,3.5h-6.3l-3.5-3.5v-21.9l3.5-3.5h6.3L456.4,241.6z M450.8,242.8h-2.2v19.3h2.2V242.8z\"/>\n\t<path d=\"M472.6,241.6v21.9l-3.5,3.5h-6.3l-3.5-3.5v-21.9l3.5-3.5h6.3L472.6,241.6z M467,242.8h-2.2v19.3h2.2V242.8z\"/>\n\t<path d=\"M489.3,238.1v28.8h-5.4l-2.9-11.8v11.8h-5.5v-28.8h5.4l2.9,11.5v-11.5H489.3z\"/>\n</g>\n</svg>\n            </div>\n        </div>\n    </div>\n\n</div>",
    data: function () {
        return {
            date:[],
            params:{
                mtime:0, //0午餐1晚餐
                mdate:""
            }
        }
    },
    methods:{
        render: function () {

        },
        onAdd: function () {
            layer.open({title:"新增",content:"新增内容",btn:["确定","取消"]})
        }
    },
    events:{

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
    template:"<span class=\"label-primary label\" v-if=\"state==1\">未完成</span>\n<span class=\"label-danger label\" v-if=\"state==0\">下单失败</span>\n<span class=\"label-warning label\" v-if=\"state==-1\">已取消</span>\n<span class=\"label-success label\" v-if=\"state==2\">已完成</span>\n<span class=\"label-success label\" v-if=\"state==3\">已打印</span>",
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
    template:"<div class=\"panel-body\">\n    <div class=\"form-inline\">\n        <div class=\"form-group\">\n            <label>日期</label>\n            <input type=\"text\" id=\"datepick\" class=\"form-control\" @click=\"onDateClick\" v-model=\"query.mdate\" placeholder=\"请选择\">\n        </div>\n        <div class=\"form-group\">\n            <label >餐次 </label>\n            <select class=\"form-control\" v-model=\"query.mtime\">\n                <option value=\"\">全部</option>\n                <option value=\"lunch\">午餐</option>\n                <option value=\"dinner\">晚餐</option>\n            </select>\n        </div>\n        <div class=\"form-group\">\n            <label >状态 </label>\n            <select class=\"form-control\" v-model=\"query.state\">\n                <option value=\"\">全部</option>\n                <option value=\"1\">未完成</option>\n                <option value=\"-1\">已取消</option>\n                <option value=\"3\">已打印</option>\n                <option value=\"2\">已完成</option>\n            </select>\n        </div>\n        <button class=\"btn btn-default\" @click=\"onQuery\">\n            <span class=\"glyphicon glyphicon-search\"></span>\n            查询</button>\n\n    </div>\n    <hr>\n    <div id=\"daystat\">\n        <table style=\"width: 100%\" class=\"table table-bordered table-hover table-condensed\" >\n            <tbody>\n            <tr>\n                <th>\n                    序号\n                </th>\n                <th>\n                    菜名\n                </th>\n                <th>\n                    台号\n                </th>\n                <th>\n                    序号\n                </th>\n                <th>\n                    菜名\n                </th>\n                <th>\n                    台号\n                </th>\n            </tr>\n            <!--<tr v-for=\"o in orders\">-->\n                <!--<td>{{$index+1}}</td>-->\n                <!--<td>{{o.type}}</td>-->\n                <!--<td>{{o.name}}</td>-->\n                <!--<td>{{o.price  | currency \"¥\"}}</td>-->\n                <!--<td>{{o.number}}</td>-->\n                <!--&lt;!&ndash;<td style=\"width: 300px;\">&ndash;&gt;-->\n                <!--&lt;!&ndash;<table class=\"table table-bordered table-condensed\">&ndash;&gt;-->\n                <!--&lt;!&ndash;<tr v-for=\"t in o.tables\">&ndash;&gt;-->\n                <!--&lt;!&ndash;<td style=\"width: 40%\">{{t.no}}号桌</td>&ndash;&gt;-->\n                <!--&lt;!&ndash;<td style=\"width: 30%\">{{t.number}} {{t.unit}}</td>&ndash;&gt;-->\n                <!--&lt;!&ndash;<td style=\"width: 30%\">{{t.mtime==\"dinner\"?'晚餐':'午餐'}}</td>&ndash;&gt;-->\n                <!--&lt;!&ndash;</tr>&ndash;&gt;-->\n                <!--&lt;!&ndash;</table>&ndash;&gt;-->\n                <!--&lt;!&ndash;</td>&ndash;&gt;-->\n                <!--<td>{{o.price*o.number  | currency \"¥\"}}</td>-->\n            <!--</tr>-->\n\n            <tr v-for=\"o in orders\">\n                <td>{{$index+1}}</td>\n                <td><strong>{{o[0].name}}</strong></td>\n                <td>\n                    <span v-for=\"t in o[0].tables | orderBy 'no'\">\n                        <a v-for=\"r in t.number\">\n                            {{t.no}}\n                        </a>\n                    </span>\n                </td>\n                <td>{{$index+orders.length+1}}</td>\n                <td><strong>{{o[1].name}}</strong></td>\n                <td>\n                    <span v-if=\"o[1].tables\" v-for=\"t in o[1].tables | orderBy 'no'\">\n                        <a v-for=\"r in t.number\">\n                            {{t.no}}\n                        </a>\n                    </span>\n                </td>\n            </tr>\n\n            </tbody></table>\n    </div>\n</div>",
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

module.exports = Vue.extend({
    template:"<div class=\"page-menu\">\n    <div class=\"panel panel-default  content\">\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" :class=\"{active:view==0}\" @click=\"changeView(0)\"><a href=\"javascript:;\">\n                    订单</a></li>\n                <li role=\"presentation\" :class=\"{active:view==1}\" @click=\"changeView(1)\" ><a href=\"javascript:;\">\n                    每日汇总</a></li>\n            </ul>\n\n            <a href=\"javascript:;\" v-if=\"view==1\" class=\"btn pull-right\" @click=\"onPrint\">\n                <span class=\"glyphicon glyphicon-print\"></span>\n                打印\n            </a>\n        </div>\n\n        <div v-if=\"view==0\" class=\"panel-body\">\n            <div class=\"form-inline\">\n                <div class=\"form-group\">\n                    <label>日期</label>\n                    <input type=\"text\" id=\"datepick\" class=\"form-control\" @click=\"onDateClick\" v-model=\"query.mdate\" placeholder=\"请选择\">\n                </div>\n                <div class=\"form-group\">\n                    <label >餐次 </label>\n                    <select class=\"form-control\" v-model=\"query.mtime\">\n                        <option value=\"\">全部</option>\n                        <option value=\"lunch\">午餐</option>\n                        <option value=\"dinner\">晚餐</option>\n                    </select>\n                </div>\n                <div class=\"form-group\">\n                    <label >状态 </label>\n                    <select class=\"form-control\" v-model=\"query.state\">\n                        <option value=\"\">全部</option>\n                        <option value=\"1\">未完成</option>\n                        <option value=\"-1\">已取消</option>\n                        <option value=\"3\">已打印</option>\n                        <option value=\"2\">已完成</option>\n                    </select>\n                </div>\n                <button class=\"btn btn-default\" @click=\"onQuery\">\n                    <span class=\"glyphicon glyphicon-search\"></span>\n                    查询</button>\n            </div>\n            <hr>\n            <table class=\"table table-bordered table-hover\">\n                <tbody>\n                <tr>\n                    <th>\n                        #\n                    </th>\n                    <th>\n                        时间\n                    </th>\n                    <th>\n                        餐次\n                    </th>\n                    <th>\n                        下单人\n                    </th>\n                    <th>\n                        下单时间\n                    </th>\n                    <th>\n                        人数\n                    </th>\n                    <th>\n                        餐桌\n                    </th>\n                    <th>\n                        菜品数量(种)\n                    </th>\n                    <th>\n                        期望上菜时间\n                    </th>\n                    <th>\n                        状态\n                    </th>\n                    <th>\n                        菜单\n                    </th>\n                    <th>\n                        操作\n                    </th>\n                </tr>\n                <tr v-for=\"o in orders\" track-by=\"_id\">\n                    <td>{{$index+1 + query.limit*query.page}}</td>\n                    <td>{{o.mdate}}</td>\n                    <td>{{o.mtime==\"dinner\"?\"晚餐\":\"午餐\"}}</td>\n                    <td><a href=\"javascript:;\" @click=\"onShowUserInfo(o.user,$event)\">{{o.user.name}}</a></td>\n                    <td>{{(new Date(o.created)).Format(\"yyyy-MM-dd hh:mm\")}}</td>\n                    <td>{{o.number}}</td>\n                    <td>{{o.table.no}}</td>\n                    <td>{{o.menu.length}}</td>\n                    <td>{{o.remark}}</td>\n                    <td><c-state :state=\"o.state\"></c-state></td>\n                    <td><a v-link=\"{path:'order/'+o._id}\" >查看</a></td>\n                    <td>\n                        <a @click=\"onCancel(o)\" href=\"javascript:;\">取消</a>\n                     <a  @click=\"onComplete(o)\" href=\"javascript:;\">已完成</a>\n                     <a  @click=\"onPrinter(o)\" href=\"javascript:;\">已打印</a>\n                    </td>\n                </tr>\n                </tbody></table>\n            <div class=\"c-pager\">\n                <p class=\"pull-left\">共 {{count}} 条记录，每页 {{query.limit}} 条 {{query.page+1}}/{{Math.ceil(count/query.limit)}} </p>\n\n                <ul  class=\"pagination pagination-sm\">\n                    <li>\n                    </li>\n                    <li>\n                        <a @click=\"toFirst\" href=\"javascript:;\" aria-label=\"Previous\">\n                            <span class=\"glyphicon glyphicon-step-backward\"></span>\n                        </a>\n                    </li>\n                    <li><a href=\"javascript:;\" :disabled=\"query.page==0\" @click=\"toPre\"><span class=\"glyphicon glyphicon-triangle-left\"></span></a></li>\n                    <li><a href=\"javascript:;\" @click=\"toNext\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a></li>\n\n                    <li>\n                        <a @click=\"toLast\" href=\"javascript:;\" aria-label=\"Next\">\n                            <span class=\"glyphicon glyphicon-step-forward\"></span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n\n        <div v-if=\"view==1\" is=\"stat\"></div>\n\n\n    </div>\n\n\n</div>\n",
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
        "stat":stat
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
    template:"<div class=\"page-config\">\n    <div class=\"panel panel-default content\">\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" @click=\"onChangeView('food')\" :class=\"{active:view=='food'}\"><a href=\"javascript:;\">\n                    订餐配置</a></li>\n                <li role=\"presentation\"  @click=\"onChangeView('goods')\" :class=\"{active:view=='goods'}\"><a href=\"javascript:;\">\n                    订货配置</a></li>\n            </ul>\n        </div>\n        <div class=\"panel-body\" v-if=\"view=='food'\">\n\n            <div class=\"form-horizontal\">\n               <div class=\"form-group\">\n                   <label class=\"col-sm-2 control-label\">提前预定天数</label>\n                   <div class=\"col-sm-10\">\n                       <input type=\"number\"  class=\"form-control\" v-model=\"config.pre\" >\n                   </div>\n               </div>\n            </div>\n\n            <fieldset>\n                <legend>中餐</legend>\n                <div class=\"form-horizontal\">\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">最晚预定时间</label>\n                        <div class=\"col-sm-10\">\n                            <input type=\"text\"  class=\"form-control\" v-model=\"config.lunch.lastOrder\" >\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">最晚退订时间</label>\n                        <div class=\"col-sm-10\">\n                            <input type=\"text\"  class=\"form-control\"  v-model=\"config.lunch.unSub\" >\n                        </div>\n                    </div>\n                </div>\n            </fieldset>\n            <fieldset>\n                <legend>晚餐</legend>\n                <div class=\"form-horizontal\">\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">最晚预定时间</label>\n                        <div class=\"col-sm-10\">\n                            <input type=\"text\"  class=\"form-control\"  v-model=\"config.dinner.lastOrder\" >\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">最晚退订时间</label>\n                        <div class=\"col-sm-10\">\n                            <input type=\"text\"  class=\"form-control\"  v-model=\"config.dinner.unSub\" >\n                        </div>\n                    </div>\n                </div>\n            </fieldset>\n            <fieldset>\n                <legend>订餐开放设置</legend>\n                <table class=\"table table-bordered\">\n\n                    <tr>\n                        <th v-for=\"w in config.week\">\n                            {{getWeekName($key)}}\n                        </th>\n                    </tr>\n                    <tr>\n                        <td v-for=\"w in config.week\">\n                            <label>\n                                午餐\n                                <input type=\"checkbox\" v-model=\"w.lunch\">\n                            </label>\n                            <br>\n                            <label>\n                                晚餐\n                                <input type=\"checkbox\"  v-model=\"w.dinner\">\n                            </label>\n                        </td>\n                    </tr>\n\n                </table>\n\n            </fieldset>\n        </div>\n        <div class=\"panel-footer text-right\" v-if=\"view=='food'\">\n            <a href=\"javascript:;\" class=\"btn btn-primary\" @click=\"onSubmit\">提交</a>\n        </div>\n\n        <div class=\"panel-body\" v-if=\"view=='goods'\">\n            <fieldset>\n                <legend>订货设置</legend>\n                <div class=\"form-horizontal\">\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">订货开启时间</label>\n                        <div class=\"col-sm-5\">\n                            <select v-model=\"gConfig.begin.week\" class=\"form-control\">\n                                <option value=\"0\">每周末</option>\n                                <option value=\"1\">每周一</option>\n                                <option value=\"2\">每周二</option>\n                                <option value=\"3\">每周三</option>\n                                <option value=\"4\">每周四</option>\n                                <option value=\"5\">每周五</option>\n                                <option value=\"6\">每周六</option>\n                            </select>\n                        </div>\n                        <div class=\"col-sm-5\">\n                            <input type=\"text\"  class=\"form-control\" v-model=\"gConfig.begin.time\" >\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">订货关闭时间</label>\n                        <div class=\"col-sm-5\">\n                            <select v-model=\"gConfig.end.week\" class=\"form-control\">\n                                <option value=\"0\">每周末</option>\n                                <option value=\"1\">每周一</option>\n                                <option value=\"2\">每周二</option>\n                                <option value=\"3\">每周三</option>\n                                <option value=\"4\">每周四</option>\n                                <option value=\"5\">每周五</option>\n                                <option value=\"6\">每周六</option>\n                            </select>\n                        </div>\n                        <div class=\"col-sm-5\">\n                            <input type=\"text\"  class=\"form-control\" v-model=\"gConfig.end.time\" >\n                        </div>\n                    </div>\n                </div>\n\n            </fieldset>\n            <fieldset>\n                <legend>取货设置</legend>\n                <div class=\"form-horizontal\">\n                    <table class=\"table table-bordered\">\n                        <tr>\n                            <th v-for=\"w in gConfig.week\">\n                                {{getWeekName($key)}}\n                            </th>\n                        </tr>\n                        <tr>\n                            <td v-for=\"w in gConfig.week\">\n                                <label>\n                                    上午\n                                    <input type=\"checkbox\" v-model=\"w.morning\">\n                                </label>\n                                <br>\n                                <label>\n                                    中午\n                                    <input type=\"checkbox\"  v-model=\"w.noon\">\n                                </label>\n                                <br>\n                                <label>\n                                    下午\n                                    <input type=\"checkbox\"  v-model=\"w.afternoon\">\n                                </label>\n                            </td>\n                        </tr>\n\n                    </table>\n                </div>\n            </fieldset>\n\n        </div>\n        <div class=\"panel-footer text-right\" v-if=\"view=='goods'\">\n            <a href=\"javascript:;\" class=\"btn btn-primary\" @click=\"onSubmitGoods\">提交</a>\n        </div>\n\n    </div>\n</div>",
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
            var c = w - v;

            if(c == 0){
                return week+"(今天)";
            }else if(c < 0){
                d.setDate(d.getDate()+7+c);
                return week+ d.Format("(yyyy-MM-dd)");
            }else if(c >0){
                d.setDate(d.getDate()+c);
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

;/*!/components/page/menu/menu.js*/
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
    visible:1,
    shift:null
};

module.exports = Vue.extend({
    template:"<div class=\"page-menu\">\n    <div class=\"panel panel-default  content\">\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" :class=\"{active:view=='list'}\" @click=\"changeView('list')\"><a href=\"javascript:;\">\n                    菜品</a></li>\n                <li role=\"presentation\" :class=\"{active:view=='type'}\" @click=\"changeView('type')\"><a href=\"javascript:;\">\n                    分类</a></li>\n            </ul>\n            <a v-show=\"view=='list'\" href=\"javascript:;\" class=\"btn pull-right\" @click=\"onAdd\">\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                新增菜品\n            </a>\n            <a v-show=\"view=='type'\" href=\"javascript:;\" class=\"btn pull-right\" @click=\"onAddType\">\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                新增类型\n            </a>\n        </div>\n        <div v-show=\"view=='list'\" class=\"panel-body\">\n            <form class=\"form-inline\">\n                <div class=\"form-group\">\n                    <label >名称</label>\n                    <input type=\"text\" v-model=\"query.like\" placeholder=\"菜品名称\" class=\"form-control\">\n                </div>\n                <div class=\"form-group\">\n                    <label >类型</label>\n                    <select class=\"form-control\" v-model=\"query.type\">\n                        <option value=\"\">全部</option>\n                        <option value=\"{{t.key}}\" v-for=\"t in types.types\">{{t.value}}</option>\n                    </select>\n                </div>\n                <button class=\"btn btn-default\" @click=\"onQuery\">\n                    <span class=\"glyphicon glyphicon-search\"></span>\n                    查询</button>\n            </form>\n            <hr/>\n            <table class=\"table table-bordered table-hover\">\n                <tbody>\n                <tr>\n                    <th>\n                        #\n                    </th>\n                    <th>图片\n                    </th>\n                    <th>\n                        名称\n                    </th>\n                    <th>\n                        分类\n                    </th>\n                    <th>\n                        标签\n                    </th>\n                    <th>\n                        价格\n                    </th>\n                    <th>\n                        提前预定时间\n                    </th>\n                    <th>\n                        状态\n                    </th>\n                    <th>\n                        操作\n                    </th>\n                </tr>\n                <tr v-for=\"m in menu\" track-by=\"_id\">\n                    <td>\n                        {{query.limit*query.page+$index+1}}\n                    </td>\n                    <td>\n                        <span class=\"img-wrap\" v-for=\"p in m.picture\" v-if=\"m.picture.length>0\">\n                            <span class=\"glyphicon glyphicon-remove btn-remove\" @click=\"removeImg(m,p)\"></span>\n                            <img  :src=\"'/data/image/'+p+'/100/100.json'\" class=\"img-rounded\" style=\"width: 80px;margin-left: 5px;height: 80px;\">\n                        </span>\n                        <a href=\"javascript:;\" class=\"btn btn-default btn-sm upfile\">\n                            <span class=\"glyphicon glyphicon-plus\"></span>\n                            <input type=\"file\" value=\"浏览\" @change=\"onAddPic(m,$event)\" />\n                        </a>\n                    </td>\n                    <td>\n                        {{m.name}}\n                    </td>\n                    <td>\n                        <span v-for=\"t in types.types\" v-if=\"t.key==m.type\">{{t.value}}</span>\n                    </td>\n                    <td>\n                        <span class=\"label label-primary\" v-for=\"c in m.cates\">\n                            {{c}}\n                        </span>\n                    </td>\n                    <td>\n                        ¥{{m.price}}\n                    </td>\n                    <td>\n                        <span v-show=\"m.shift\">{{m.shift}}小时</span>\n                    </td>\n                    <td>\n                        {{m.visible == 0?\"禁用\":\"启用\"}}\n                    </td>\n                    <td>\n                        <a href=\"javascript:;\" @click=\"onEditMenu(m)\">编辑</a>\n                        <a href=\"javascript:;\" @click=\"onDelMenu(m)\">删除</a>\n                    </td>\n                </tr>\n                </tbody></table>\n            <div class=\"c-pager\">\n                <p class=\"pull-left\">共 {{count}} 条记录，{{query.page+1}}/{{Math.ceil(count/query.limit)}}</p>\n\n                <ul  class=\"pagination pagination-sm\">\n                    <li>\n                    </li>\n                    <li>\n                        <a href=\"javascript:;\" aria-label=\"Previous\" @click=\"toFirst\">\n                            <span class=\"glyphicon glyphicon-step-backward\"></span>\n                        </a>\n                    </li>\n                    <li><a href=\"javascript:;\" :disabled=\"query.page==0\" @click=\"toPre\"><span class=\"glyphicon glyphicon-triangle-left\"></span></a></li>\n                    <li><a href=\"javascript:;\" @click=\"toNext\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a></li>\n\n                    <li>\n                        <a  href=\"javascript:;\"  href=\"#\" aria-label=\"Next\"  @click=\"toLast\">\n                            <span class=\"glyphicon glyphicon-step-forward\"></span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n        <div v-show=\"view=='type'\" class=\"panel-body\">\n            <table class=\"table table-bordered table-hover\">\n                <thead>\n                <tr>\n                    <th>#</th>\n                    <th>名称</th>\n                    <th>排序</th>\n                    <th>操作</th>\n                </tr>\n                </thead>\n                <tbody>\n                    <tr v-for=\"t in types.types\">\n                        <td>{{t.key}}</td>\n                        <td>{{t.value}}</td>\n                        <td>{{t.sort}}</td>\n                        <td><a href=\"javascript:;\" @click=\"onEditType(t)\">编辑</a>\n                      <a href=\"javascript:;\" @click=\"onDelType(t)\">删除</a></td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n\n    <c-form :config=\"modal\" @submit=\"onSubmit\">\n        <validator name=\"valid\">\n            <form class=\"form-horizontal\" novalidate >\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\" :class=\"{'has-warning':$valid.name.invalid&&$valid.name.touched}\">名称</label>\n                    <div class=\"col-sm-10\" :class=\"{'has-warning':$valid.name.invalid&&$valid.name.touched}\">\n                        <input type=\"text\"  class=\"form-control\" placeholder=\"必填\" v-validate:name=\"['required']\" v-model=\"model.name\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\">分类</label>\n                    <div class=\"col-sm-10\">\n                        <select class=\"form-control\" v-model=\"model.type\" number>\n                            <option value=\"{{t.key}}\" v-for=\"t in types.types\">{{t.value}}</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"form-group\" >\n                    <label class=\"col-sm-2 control-label\" :class=\"{'has-warning':$valid.price.invalid&&$valid.price.touched}\" >价格(元)</label>\n                    <div class=\"col-sm-10\" :class=\"{'has-warning':$valid.price.invalid&&$valid.price.touched}\">\n                        <input type=\"number\" class=\"form-control\"  v-validate:price=\"['required']\"  v-model=\"model.price\" placeholder=\"必填\" number>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\" :class=\"{'has-warning':$valid.unit.invalid&&$valid.unit.touched}\" >单位</label>\n                    <div class=\"col-sm-10\" :class=\"{'has-warning':$valid.unit.invalid&&$valid.unit.touched}\">\n                        <input type=\"text\" class=\"form-control\" v-model=\"model.unit\" v-validate:unit=\"['required']\" placeholder=\"必填(份/个/等等)\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\" >标签</label>\n                    <div class=\"col-sm-10\">\n                        <span class=\"label label-primary\" style=\"margin-right: 10px;\" v-for=\"c in model.cates\">\n                            {{c}}\n                          <span class=\"glyphicon glyphicon-remove\" @click=\"onRemoveCate(c)\"></span>\n                        </span>\n                        <a href=\"javascript:;\" class=\"btn btn-default\" @click=\"onAddCate\">\n                            <span class=\"glyphicon glyphicon-plus\"></span>\n                        </a>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\">提前预定</label>\n                    <div class=\"col-sm-10\" >\n                        <input type=\"number\" class=\"form-control\" v-model=\"model.shift\" placeholder=\"选填,提前预定时间(小时)\" number>\n                    </div>\n                </div>\n                <div class=\"form-group\" >\n                    <label class=\"col-sm-2 control-label\">状态</label>\n                    <div class=\"col-sm-10\">\n                        <select class=\"form-control\" v-model=\"model.visible\" number>\n                            <option value=\"1\">启用</option>\n                            <option value=\"0\">禁用</option>\n                        </select>\n                    </div>\n                </div>\n            </form>\n        </validator>\n    </c-form>\n\n    <c-form :config=\"typeModal\" @submit=\"onSubmitType\" >\n        <form class=\"form-horizontal\">\n            <div class=\"form-group\">\n                <label class=\"col-sm-2 control-label\">值</label>\n                <div class=\"col-sm-10\" >\n                    <input type=\"number\"  class=\"form-control\" v-model=\"type.key\" placeholder=\"必填,请勿重复\"  number>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"col-sm-2 control-label\">名称</label>\n                <div class=\"col-sm-10\" >\n                    <input type=\"text\"  class=\"form-control\" v-model=\"type.value\" placeholder=\"必填\" >\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"col-sm-2 control-label\">排序</label>\n                <div class=\"col-sm-10\" >\n                    <input type=\"number\"  class=\"form-control\" v-model=\"type.sort\" placeholder=\"选填\" number>\n                </div>\n            </div>\n        </form>\n    </c-form>\n</div>\n",
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
    template:"<div class=\"panel-body\">\n    <div class=\"form-inline\">\n        <div class=\"form-group\">\n            <label>日期</label>\n            <input type=\"text\" id=\"datepick\" class=\"form-control\" @click=\"onDateClick\" v-model=\"query.mdate\" placeholder=\"请选择\">\n        </div>\n        <div class=\"form-group\">\n            <label >状态 </label>\n            <select class=\"form-control\" v-model=\"query.state\">\n                <option value=\"\">全部</option>\n                <option value=\"1\">未完成</option>\n                <option value=\"-1\">已取消</option>\n                <option value=\"2\">已完成</option>\n            </select>\n        </div>\n        <button class=\"btn btn-default\" @click=\"onQuery\">\n            <span class=\"glyphicon glyphicon-search\"></span>\n            查询</button>\n    </div>\n    <hr>\n    <table class=\"table table-bordered table-hover\" id=\"weekstat\" >\n        <tbody>\n        <tr>\n            <th>\n                #\n            </th>\n            <th>\n                类型\n            </th>\n            <th>\n                货物名称\n            </th>\n            <th>\n                价格\n            </th>\n            <th>\n                数量\n            </th>\n            <th>\n                总价\n            </th>\n        </tr>\n        <tr v-for=\"o in orders\">\n            <td>{{$index+1}}</td>\n            <td>{{o.type.value}}</td>\n            <td>{{o.name}}</td>\n            <td>{{o.price  | currency \"¥\"}}</td>\n            <td>{{o.number}}</td>\n            <td>{{o.price*o.number  | currency \"¥\"}}</td>\n        </tr>\n        </tbody></table>\n</div>",
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
    template:"<div class=\"panel-body\">\n    <div class=\"form-inline\">\n        <div class=\"form-group\">\n            <label>日期</label>\n            <input type=\"text\" id=\"datepick\" class=\"form-control\" @click=\"onDateClick\" v-model=\"query.mdate\" placeholder=\"请选择\">\n        </div>\n        <div class=\"form-group\">\n            <label >状态 </label>\n            <select class=\"form-control\" v-model=\"query.state\">\n                <option value=\"\">全部</option>\n                <option value=\"1\">未完成</option>\n                <option value=\"-1\">已取消</option>\n                <option value=\"2\">已完成</option>\n            </select>\n        </div>\n        <button class=\"btn btn-default\" @click=\"onQuery\">\n            <span class=\"glyphicon glyphicon-search\"></span>\n            查询</button>\n\n        <div class=\"btn-group pull-right\" role=\"group\" aria-label=\"...\">\n            <button type=\"button\" class=\"btn btn-default\" :class=\"{active:view=='0'}\" @click=\"onChangeView(0)\">统计</button>\n            <button type=\"button\" class=\"btn btn-default\"  :class=\"{active:view=='1'}\" @click=\"onChangeView(1)\">汇总</button>\n        </div>\n    </div>\n    <hr>\n    <div v-if=\"view==0\">\n        <table  class=\"table table-bordered table-hover\" id=\"weekstat\">\n            <tbody>\n            <tr>\n                <th>\n                    #\n                </th>\n                <th>\n                    下单人\n                </th>\n                <th>处室</th>\n                <th>\n                    取货时间\n                </th>\n                <th>\n                    货物(名称\\数量\\单价\\合计)\n                </th>\n                <th>\n                    总价\n                </th>\n            </tr>\n            <tr v-for=\"o in orders\">\n                <td>{{$index+1}}</td>\n                <td>{{o.user.name}}</td>\n                <td>{{o.user.department}}</td>\n                <td>{{o.mdate}} {{o.mtime | timeName}}</td>\n                <td>\n                    <table class=\"table  table-bordered table-condensed\" style=\"margin-bottom: 0\">\n                        <tr v-for=\"i in o.items\">\n                            <td  style=\"width: 40%\">{{i.name}}</td>\n                            <td  style=\"width: 20%\">{{i.number}} {{i.unit}}</td>\n                            <td  style=\"width: 20%\">{{i.price  | currency \"¥\"}}</td>\n                            <td  style=\"width: 20%\">{{i.price*i.number | currency \"¥\"}}</td>\n                        </tr>\n                    </table>\n                </td>\n                <td>¥{{getTotal(o)}}</td>\n            </tr>\n            </tbody></table>\n\n    </div>\n\n    <table v-if=\"view==1\" class=\"table table-bordered table-hover\" id=\"weekstat\">\n        <tbody>\n        <tr>\n            <th>\n                #\n            </th>\n            <th>类型</th>\n            <th>\n                货物名称\n            </th>\n            <th>\n                价格\n            </th>\n            <th>\n                数量\n            </th>\n            <th>\n                总价\n            </th>\n        </tr>\n\n        <tr v-for=\"o in stats | orderBy 'type.sort'\">\n            <td>{{$index+1}}</td>\n            <td>{{o.type.value}}</td>\n            <td>{{o.name}}</td>\n            <td>{{o.price | currency \"¥\"}}</td>\n            <td>{{o.number}}{{o.unit}}</td>\n            <td>{{o.price*o.number | currency \"¥\"}}</td>\n        </tr>\n        <tr>\n            <td colspan=\"5\">合计</td>\n            <td>¥{{allCount(stats)}}</td>\n        </tr>\n        </tbody></table>\n</div>",
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
    template:"<div class=\"page-menu\">\n    <div class=\"panel panel-default  content\">\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" :class=\"{active:view==0}\" @click=\"changeView(0)\"><a href=\"javascript:;\">\n                    订单</a></li>\n                <li role=\"presentation\"  :class=\"{active:view==1}\" @click=\"changeView(1)\" ><a href=\"javascript:;\">\n                    每日汇总</a></li>\n                <li role=\"presentation\"  :class=\"{active:view==2}\" @click=\"changeView(2)\" ><a href=\"javascript:;\">\n                    周报</a></li>\n            </ul>\n\n            <a href=\"javascript:;\" v-if=\"view==2||view==1\" class=\"btn pull-right\" @click=\"onPrint\">\n                <span class=\"glyphicon glyphicon-print\"></span>\n                打印\n            </a>\n\n        </div>\n        <div v-if=\"view==0\" class=\"panel-body\">\n            <div class=\"form-inline\">\n                <div class=\"form-group\">\n                    <label>日期</label>\n                    <input id=\"mdate\" type=\"text\" class=\"form-control\" @click=\"onDateClick\" v-model=\"query.mdate\" placeholder=\"请选择\">\n                </div>\n                <div class=\"form-group\">\n                    <label >状态 </label>\n                    <select class=\"form-control\" v-model=\"query.state\">\n                        <option value=\"\">全部</option>\n                        <option value=\"1\">未完成</option>\n                        <option value=\"-1\">已取消</option>\n                        <option value=\"2\">已完成</option>\n                    </select>\n                </div>\n                <a href=\"javascript:;\" class=\"btn btn-default\" @click=\"onQuery\">\n                    <span class=\"glyphicon glyphicon-search\"></span>\n                    查询</a>\n            </div>\n            <hr>\n            <table class=\"table table-bordered table-hover\">\n                <tbody>\n                <tr>\n                    <th>\n                        #\n                    </th>\n                    <th>\n                        取货时间\n                    </th>\n                    <th>\n                        下单人\n                    </th>\n                    <th>\n                        下单时间\n                    </th>\n                    <th>货物总类</th>\n                    <th>\n                        状态\n                    </th>\n                    <th>\n                        订单详情\n                    </th>\n\n                    <th>\n                        操作\n                    </th>\n                </tr>\n                <tr v-for=\"o in orders\" track-by=\"_id\">\n                    <td>{{$index+1 + query.limit*query.page}}</td>\n                    <td>{{o.mdate}} {{o.mtime | timeName}}</td>\n                    <td>\n                        <a href=\"javascript:;\" @click=\"onShowUserInfo(o.user,$event)\">{{o.user.name}}</a>\n                    </td>\n                    <td>{{(new Date(o.created)).Format(\"yyyy-MM-dd hh:mm\")}}</td>\n                    <td>{{o.items.length}}</td>\n                    <td><c-state :state=\"o.state\"></c-state></td>\n                    <td><a v-link=\"{path:'/order/goods/'+o._id}\" >查看</a></td>\n                    <td><a @click=\"onCancel(o)\" href=\"javascript:;\">取消</a>\n                        <a @click=\"onComplete(o)\" href=\"javascript:;\">已完成</a>\n                    </td>\n\n                </tr>\n                </tbody></table>\n            <div class=\"c-pager\">\n                <p class=\"pull-left\">共 {{count}} 条记录，每页 {{query.limit}} 条 {{query.page+1}}/{{Math.ceil(count/query.limit)}} </p>\n\n                <ul  class=\"pagination pagination-sm\">\n                    <li>\n                    </li>\n                    <li>\n                        <a href=\"javascript:;\" @click=\"toFirst\" aria-label=\"Previous\">\n                            <span class=\"glyphicon glyphicon-step-backward\"></span>\n                        </a>\n                    </li>\n                    <li><a href=\"javascript:;\" :disabled=\"query.page==0\" @click=\"toPre\"><span class=\"glyphicon glyphicon-triangle-left\"></span></a></li>\n                    <li><a href=\"javascript:;\" @click=\"toNext\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a></li>\n\n                    <li>\n                        <a href=\"javascript:;\" @click=\"toLast\" aria-label=\"Next\">\n                            <span class=\"glyphicon glyphicon-step-forward\"></span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n        <div is=\"stat\" v-if=\"view ==1\"></div>\n        <div is=\"weekstat\" v-if=\"view ==2\"></div>\n    </div>\n\n\n\n\n</div>\n",
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
