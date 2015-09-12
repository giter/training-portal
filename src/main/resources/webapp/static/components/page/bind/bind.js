define('components/page/bind/bind', function(require, exports, module) {

/**
 * Created by jack on 2015/8/18.
 */

var Vue = require("component_modules/vue");

module.exports = Vue.extend({
    template:"<div class=\"bind-container mui-content\">\r\n<header class=\"mui-bar-nav mui-bar\">\r\n    <h5 class=\"mui-title\">\r\n        用户绑定\r\n    </h5>\r\n</header>\r\n   <div class=\"mui-content\">\r\n       <div class=\"mui-content-padded\" style=\"text-align: center;padding: 20px 0;\">\r\n           <img src=\"/static/images/logo.png\">\r\n       </div>\r\n       <h5 style=\"text-align: center;margin: 10px;\">请输入您的姓名和手机号码进行绑定</h5>\r\n       <div class=\"mui-card\">\r\n\r\n           <form class=\"mui-input-group\">\r\n              <div class=\"mui-input-row\">\r\n                  <label>姓名</label>\r\n                  <input type=\"text\" lass=\"mui-input-clear\" placeholder=\"请输入姓名\">\r\n              </div>\r\n              <div class=\"mui-input-row\">\r\n                  <label>手机</label>\r\n                  <input type=\"text\" class=\"mui-input-clear\" placeholder=\"请输入手机号码\">\r\n              </div>\r\n          </form>\r\n       </div>\r\n    <div style=\"padding: 15px\">\r\n        <a href=\"#\" style=\"padding: 8px 0\" class=\"mui-btn mui-btn-block mui-btn-blue\">绑定</a>\r\n    </div>\r\n   </div>\r\n</div>\r\n"
});

});
