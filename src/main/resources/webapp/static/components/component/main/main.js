define('main/main', function(require, exports, module) {


var Vue = require('component_modules/vue');
var Router = require('component_modules/director').Router;
var home = require('components/page/home/home');
var Service = require("main/service.js");
var Fastclick = require("component_modules/fastclick");

Vue.config.debug = true;

window.app = new Vue({
    el:"#app",
    data:{
        "currentView":"home",
        "search":{
            "whither":"请选择",
            "date":null,
            "dateStr":""
        },
        "result":[],/*查票结果*/
        "bus":[],/*查询到的车辆信息*/
        "calendars":[],
        "whithers":[],
        "openid":"",
        "mine":""
    },
    components:{
        "home":home
    },
    ready:function(){
        this.openid = Service.getQueryString("openID");
        Fastclick.FastClick.attach(document.body);
        var self = this;
        Service.getMine(function (rep) {
            if(rep.Code == 0){
                self.mine = rep.Response;
            }
        })
    }
});

/*过场动画*/
Vue.transition('slideInRight', {
    leave: function (el) {
        if( $(el).length>0){
            el.className = "";
        }
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
    require.async(["page/list/list.js"], function (p) {
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
router.on("/relation/query",function(){
    require.async(["components/page/relation/query/query"], function (p) {
        doRouter("query",p);
    })
});

/*承包商*/
router.on("/company",function(){
    require.async(["components/page/company/company"], function (p) {
        doRouter("company",p);
    })
});

router.on("/bus", function (id) {
    require.async(["components/page/bus/bus"], function (p) {
        doRouter("bus",p);
    });
});

router.on("/bus/select", function (id) {
    require.async(["page/bus/select/select.js"], function (p) {
        doRouter("bus-select",p);
    });
});



router.configure({
    notfound: function () {
        router.setRoute("/error/notfound")
    }
});


router.init("/home");




});
