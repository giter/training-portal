define('main/main', function(require, exports, module) {


var Vue = require('component_modules/vue');
var Router = require('component_modules/director').Router;
var desk = require('components/page/desk/desk');
var Service = require('main/service.js');

require("loading/loading.js");
require("nav/nav.js");


window.app = new Vue({
    el:"#app",
    data:{
        "currentView":"",
        "amenu":"",
        "bmenu":"",
        "cmenu":"",
        "loading":false /*是否显示加载*/
    },
    components:{
        "desk":desk
    },
    ready: function () {

    }
});

/*过场动画*/
Vue.transition('slide', {
    enter: function (el) {
        $(el).css({
            "opacity":0,
            "margin-top":20
        }).animate({
            "opacity":1,
            "margin-top":0
        },300,"linear");
    },
    leave: function (el) {
        if(el > 0 ){
            $(el).remove();
        }
    }
});

/*表单验证结果*/
Vue.directive('disabled', function (value) {
    this.el.disabled = !value;
});

var router = new Router();

function doRouter(a,b,c,view,component){
    var coms = window.app.$options.components;

    if(!coms[view]){
        coms[view] = component;
    }
    app.amenu = a;
    app.bmenu = b;
    app.cmenu = c;
    app.currentView = view;
}

router.on("/home",function(){
    router.setRoute("/home/desk");
});


router.on("/login",function(){
    router.setRoute("/home/desk");
});


router.on("/home/user",function(){
    require.async(["components/page/user/user"], function (p) {
        doRouter("home","user","","user",p);
    })
});

router.on("/home/bus",function(view){
    require.async(["components/page/bus/bus"], function (p) {
        doRouter("home","bus","","bus",p);
    })
});

router.on("/home/order",function(view){
    require.async(["components/page/order/order"], function (p) {
        doRouter("home","order","","order",p);
    })
});

router.on("/home/desk",function(view){
    require.async(["components/page/desk/desk"], function (p) {
        doRouter("home","desk","","desk",p);
    })
});

router.on("/home/company",function(view){
    require.async(["components/page/company/company"], function (p) {
        doRouter("home","company","","company",p);
    })
});


router.on("/home/companyOrder",function(view){
    require.async(["components/page/companyOrder/companyOrder"], function (p) {
        doRouter("home","companyOrder","","companyOrder",p);
    })
});

router.on("home/bus/:id", function (id) {
    require.async(["components/page/seat/seat"], function (p) {
        doRouter("home","bus","seat","seat",p);
    })
});

router.on("/sys",function(){
    router.setRoute("/sys/history");
});

router.on("/sys/history",function(){
    require.async(["components/page/history/history"], function (p) {
        doRouter("sys","history","","history",p);
    })
});

router.on("/sys/config",function(){
    require.async(["components/page/system/config"], function (p) {
        doRouter("sys","config","","config",p);
    })
});

router.configure({
    notfound: function () {
        router.setRoute("/error/notfound")
    }
});

router.init("/home");




});
