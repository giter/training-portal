define('components/page/home/home', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");

module.exports =   Vue.extend({
   template:"<div id=\"page-home\">\r\n    <div id=\"wrap\">\r\n        <div class=\"item\">\r\n            <div class=\"spinner1\"></div>\r\n            <h5>拼命加载中<span class=\"dot\">.</span></h5>\r\n        </div>\r\n    </div>\r\n\r\n</div>"
});

});
