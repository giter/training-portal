define('nav/nav', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */


var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-nav", {
    template:"<nav class=\"mui-bar mui-bar-tab\">\n    <a class=\"mui-tab-item\" :class=\"{'mui-active':view=='order'}\" v-link=\"{path:'/order'}\">\n        <span class=\"mui-icon mui-icon-phone\"></span>\n        <span class=\"mui-tab-label\" >服务</span>\n    </a>\n    <a class=\"mui-tab-item\" :class=\"{'mui-active':view=='list'}\" v-link=\"{path:'/list'}\">\n        <span class=\"mui-icon mui-icon-compose\"></span>\n        <span class=\"mui-tab-label\">订单</span>\n    </a>\n    <a class=\"mui-tab-item\" :class=\"{'mui-active':view=='notice'}\" v-link=\"{path:'/notice'}\">\n        <span class=\"mui-icon mui-icon-list\"></span>\n        <span class=\"mui-tab-label\">公告</span>\n    </a>\n    <a class=\"mui-tab-item\" :class=\"{'mui-active':view=='config'}\" v-link=\"{path:'/config'}\">\n        <span class=\"mui-icon mui-icon-person\"></span>\n        <span class=\"mui-tab-label\">我的</span>\n    </a>\n</nav>\n",
    props:["view"],
    ready: function () {
        
    }
});

});
