
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
        "mine":"",
        "detailTicket":"",
        "beginTime":1800,/*提前30分钟*/
        "endTime":10800/*提前30分钟*/
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
        });


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
    require.async(["page/bind/bind.js"], function (p) {
        doRouter("bind",p);
    })
});

router.on("/home",function(){
    app.currentView = "home";
});

router.on("/order",function(){
    require.async(["page/order/order.js"], function (p) {
        window.app.$broadcast("ReloadOrder");
        doRouter("order",p);
    })
});

router.on("/order/:id",function(id){
    require.async(["page/order/orderdetail/orderdetail.js"], function (p) {
        window.app.detailTicket = id;
        doRouter("orderdetail",p);
    })
});


router.on("/list",function(){
    require.async(["page/list/list.js"], function (p) {
        doRouter("list",p);
    })
});

router.on("/search",function(){
    require.async(["page/search/search.js"], function (p) {
        doRouter("search",p);
    })
});
router.on("/search/result",function(){
    require.async(["page/search/result/result.js"], function (p) {
        doRouter("result",p);
    })
});

router.on("/validate",function(){
    require.async(["page/validate/validate.js"], function (p) {
        doRouter("validate",p);

    })
});

router.on("/config",function(){
    require.async(["page/config/config.js"], function (p) {
        doRouter("config",p);
    })
});

router.on("/whither",function(){
    require.async(["page/whither/whither.js"], function (p) {
        doRouter("whither",p);
    })
});

router.on("/calendar",function(){
    require.async(["page/calendar/calendar.js"], function (p) {
        doRouter("calendar",p);
    })
});

router.on("/relation",function(){
    require.async(["page/relation/relation.js"], function (p) {
        doRouter("relation",p);
    })
});
router.on("/relation/query",function(){
    require.async(["page/relation/query/query.js"], function (p) {
        doRouter("query",p);
    })
});
router.on("/relation/relatives",function(){
    require.async(["page/relation/relatives/relatives.js"], function (p) {
        doRouter("relatives",p);
    })
});

/*承包商*/
router.on("/company",function(){
    require.async(["page/company/company.js"], function (p) {
        doRouter("company",p);
    })
});

router.on("/bus", function (id) {
    require.async(["page/bus/bus.js"], function (p) {
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


router.init("/search");


