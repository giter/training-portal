define('main/main', function(require, exports, module) {


var Vue = require('component_modules/vue');
var Router = require('component_modules/director').Router;
var user = require('components/page/user/user');

require("nav/nav.js");


window.app = new Vue({
    el:"#app",
    data:{
        "currentView":"",
        "amenu":"",
        "bmenu":"",
        "cmenu":""

    },
    components:{
        "user":user
    }
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
    router.setRoute("/home/user");
});

router.on("/home/user",function(){
    app.amenu = "home";
    app.bmenu = "user";
    app.cmenu = "";
    app.currentView = "user";
});

router.on("/home/car",function(view){
    require.async(["components/page/car/car"], function (p) {
        doRouter("home","car","","car",p);
    })
});

router.on("/home/order",function(view){
    require.async(["components/page/order/order"], function (p) {
        doRouter("home","order","","order",p);
    })
});

router.on("/home/auth",function(view){
    require.async(["components/page/auth/auth"], function (p) {
        doRouter("home","auth","","auth",p);
    })
});

router.on("home/car/:id", function (id) {
    require.async(["components/page/seat/seat"], function (p) {
        doRouter("home","car","seat","seat",p);
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


router.configure({
    notfound: function () {
        router.setRoute("/error/notfound")
    }
});

router.init("/home");




});
