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
    }
});

router.start(App, '#app');




});
