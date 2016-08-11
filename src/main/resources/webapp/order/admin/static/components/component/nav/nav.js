define('nav/nav', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */


var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-nav", {
    template:"<nav>\n    <span class=\"nav-header\">订餐管理后台</span>\n\n    <a href=\"javascript:;\" class=\"btn btn-primary active\" @click=\"toggle\">\n        <span class=\"glyphicon glyphicon-list\"></span>\n    </a>\n\n\n    <a href=\"login.html\" class=\"pull-right text-warning\">\n        <span class=\"glyphicon glyphicon-log-out\"></span>\n        注销\n    </a>\n</nav>",
    ready: function () {
        
    },
    methods:{
        toggle: function () {
            $(this.$root.$el).toggleClass("hidden-header");
        }
    }
});

});
