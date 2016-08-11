define('components/page/loading/loading', function(require, exports, module) {

/**
 * Created by jack on 2015/12/2.
 */
var Vue = require("component_modules/vue.js");

module.exports = Vue.extend({
    inherit:true,
    template:"<div class=\"loader\">\n</div>\n\n",
    props:["view"],
    data: function () {
        return {

        }
    },
    events:{

    },
    ready: function () {

    }
});

});
