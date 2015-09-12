define('main/main', function(require, exports, module) {


var Vue = require('component_modules/vue');
var Router = require('component_modules/director').Router;
var home = require('components/page/home/home');

window.app = new Vue({
    el:"#app",
    data:{
        "currentView":"home",
        "search":{
            "value":"",
            "target":"请选择",
            "time":"请选择"
        }
    },
    components:{
        "home":home
    }
});

var router = new Router();

function doRouter(target,page){
    var coms = window.app.$options.components;
    if(!coms[target]){
        coms[target] = page;
    }
    window.app.$data.currentView = target;
}

router.on("/bind",function(){
    require.async(["components/page/bind/bind"], function (p) {
        doRouter("bind",p);
    })
});

router.on("/home",function(){
    app.currentView = "home";
});

router.on("/order",function(){
    require.async(["components/page/order/order"], function (p) {
        doRouter("order",p);
    })
});

router.on("/list",function(){
    require.async(["components/page/list/list"], function (p) {
        doRouter("list",p);
    })
});

router.on("/search",function(){
    require.async(["components/page/search/search"], function (p) {
        doRouter("search",p);
    })
});
router.on("/search/result",function(){
    require.async(["components/page/search/result/result"], function (p) {
        doRouter("result",p);
    })
});

router.on("/service",function(){
    require.async(["components/page/service/service"], function (p) {
        doRouter("service",p);
    })
});

router.on("/config",function(){
    require.async(["components/page/config/config"], function (p) {
        doRouter("config",p);
    })
});

router.on("/whither",function(){
    require.async(["components/page/whither/whither"], function (p) {
        doRouter("whither",p);
    })
});

router.on("/calendar",function(){
    require.async(["components/page/calendar/calendar"], function (p) {
        doRouter("calendar",p);
    })
});

router.on("/relation",function(){
    require.async(["components/page/relation/relation"], function (p) {
        doRouter("relation",p);
    })
});

router.on("/car/:id", function (id) {
    require.async(["components/page/car/car"], function (p) {
        doRouter("car",p);
    });
});

router.configure({
    notfound: function () {
        router.setRoute("/error/notfound")
    }
})

router.init("/search");



});
