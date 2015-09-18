define('navbar/navbar', function(require, exports, module) {

/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue");

module.exports = Vue.component("c-nav",{
    inherit:true,
    template:"<nav class=\"mui-bar mui-bar-tab\"  >\r\n    <a class=\"mui-tab-item\" v-class=\"mui-active:view =='search'\" v-on=\"tap:onClick('#search')\">\r\n        <span class=\"mui-icon mui-icon-search\"></span>\r\n        <span class=\"mui-tab-label\">搜索</span>\r\n    </a>\r\n    <a class=\"mui-tab-item\" v-class=\"mui-active:view =='order'\" v-on=\"tap:onClick('#order')\"  >\r\n        <span class=\"mui-icon icon-font  mui-icon-phone\"></span>\r\n        <span class=\"mui-tab-label\">订单</span>\r\n    </a>\r\n    <a class=\"mui-tab-item\" v-class=\"mui-active:view =='service'\"  v-on=\"tap:onClick('#service')\">\r\n        <span class=\"mui-icon mui-icon-list\"></span>\r\n        <span class=\"mui-tab-label\">服务</span>\r\n    </a>\r\n    <a class=\"mui-tab-item\" v-class=\"mui-active:view =='config'\" v-on=\"tap:onClick('#config')\">\r\n        <span class=\"mui-icon mui-icon-gear\"></span>\r\n        <span class=\"mui-tab-label\">设置</span>\r\n    </a>\r\n</nav>",
    props:["view"],
    methods:{
        onClick: function (hash) {
            window.location.hash = hash;
        }
    },
    ready: function () {

    }
});

});
