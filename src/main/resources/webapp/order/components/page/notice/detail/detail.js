define('components/page/notice/detail/detail', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div>\n{{{content}}}\n</div>",
    data: function () {
        return {
            content: ""
        }
    },
    methods:{

    },
    ready: function () {

    },
    route:{
        activate: function (transition) {
            this.content = store.state.notice.content;
            if(!this.content){
                router.go("/notice");
            }
            transition.next();
        }
    }
});

});
