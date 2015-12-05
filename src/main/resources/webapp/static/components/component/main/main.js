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
        "mine":"",
        "detailTicket":"",
        "beginTime":1800,/*提前30分钟*/
        "endTime":10800,/*提前30分钟*/
        "busQuery":{
            id:"",
            date:"",
            off:false
        }
    },
    components:{
        "home":home
    },
    methods:{
      is_weixin: function () {
          var ua = navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i)=="micromessenger") {
              return true;
          } else {
              return false;
          }
      }
    },
    ready:function(){
       if(this.is_weixin()){

     //   if(true){
            this.openid = Service.getQueryString("openID");
            Fastclick.FastClick.attach(document.body);
            var self = this;
            Service.getMine(function (rep) {
                if(rep.Code == 0){
                    self.mine = rep.Response;
                }
            });
        }else{
            alert("请在微信中打开");
            window.location.href = "http://mp.weixin.qq.com/s?__biz=MzIxOTEwMDcwOQ==&mid=400376477&idx=1&sn=aaf861f22ac9ffc3a18bf13eaf858eb7&scene=18#wechat_redirect";
        }
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
        window.app.$broadcast("ReloadOrder");
        doRouter("order",p);
    })
});

router.on("/order/:id",function(id){
    require.async(["components/page/order/orderdetail/orderdetail"], function (p) {
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
    require.async(["components/page/search/search"], function (p) {
        doRouter("search",p);
    })
});
router.on("/search/result",function(){
    require.async(["components/page/search/result/result"], function (p) {
        doRouter("result",p);
    })
});

router.on("/validate",function(){
    require.async(["components/page/validate/validate"], function (p) {
        doRouter("validate",p);

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
router.on("/relation/relatives",function(){
    require.async(["components/page/relation/relatives/relatives"], function (p) {
        doRouter("relatives",p);
    })
});

/*承包商*/
router.on("/company",function(){
    require.async(["components/page/company/company"], function (p) {
        doRouter("company",p);
    })
});

router.on("/bus/:id/:date/:off", function (id,date,off) {
    require.async(["components/page/bus/bus"], function (p) {
        window.app.$data.busQuery.id = id;
        window.app.$data.busQuery.date = date;
        window.app.$data.busQuery.off = off;

        window.app.$broadcast("busQuery");

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




});
