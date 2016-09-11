
var Vue = require('component_modules/vue.js');
var Router = require('component_modules/director.js').Router;
var desk = require('components/page/desk/desk.js');
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
    require.async(["page/user/user.js"], function (p) {
        doRouter("home","user","","user",p);
    })
});

router.on("/home/bus",function(view){
    require.async(["page/bus/bus.js"], function (p) {
        doRouter("home","bus","","bus",p);
    })
});

router.on("/home/order",function(view){
    require.async(["page/order/order.js"], function (p) {
        doRouter("home","order","","order",p);
    })
});

router.on("/home/desk",function(view){
    require.async(["page/desk/desk.js"], function (p) {
        doRouter("home","desk","","desk",p);
    })
});

router.on("/home/company",function(view){
    require.async(["page/company/company.js"], function (p) {
        doRouter("home","company","","company",p);
    })
});


router.on("/home/companyOrder",function(view){
    require.async(["page/companyOrder/companyOrder.js"], function (p) {
        doRouter("home","companyOrder","","companyOrder",p);
    })
});

router.on("/home/check",function(){
    require.async(["page/check/check.js"], function (p) {
        doRouter("home","check","","check",p);
    })
});

router.on("home/bus/:id", function (id) {
    require.async(["page/seat/seat.js"], function (p) {
        doRouter("home","bus","seat","seat",p);
    })
});

router.on("/sys",function(){
    router.setRoute("/sys/history");
});

router.on("/sys/history",function(){
    require.async(["page/history/history.js"], function (p) {
        doRouter("sys","history","","history",p);
    })
});

router.on("/sys/config",function(){
    require.async(["page/system/config.js"], function (p) {
        doRouter("sys","config","","config",p);
    })
});

router.configure({
    notfound: function () {
        router.setRoute("/error/notfound")
    }
});


Vue.filter('user_type',function(v){

    switch (parseInt(v)){
        case 0:{
            return '普通用户';
        }break;
        case 1:{
            return '管理员';
        }break;
        case 3:{
            return '订票员';
        }break;
        case 4:{
            return '处室负责人'
        }break;
        default:{
            return '普通用户'
        }
    }

});

router.init("/home");


