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
        notice:{}
    },
    orders:[],
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

        store.getOrders();

       FastClick.attach(document.body);

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
    "/food/:oid":{
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
    "/list":{//订单列表
        component: function (resolve) {
            require.async(["components/page/list/list"], function (p) {
                resolve(p);
            });
        }
    }
});

layer.open({type:2});
Service.getCtx("dc_config", function (rep) {
    router.start(App.extend({
        data: function () {
            return {
                config:rep.config
            }
        }
    }), '#app');
    layer.closeAll();
});





});
