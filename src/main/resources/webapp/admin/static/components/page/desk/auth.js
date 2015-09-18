define('components/page/desk/auth', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");


module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"admin\">\r\n    <div class=\"line-big\">\r\n        <div class=\"xm3\">\r\n            <div class=\"panel border-back\">\r\n                <div class=\"panel-body text-center\">\r\n                    <img src=\"/admin/static/images/admin.jpg\" width=\"120\" class=\"radius-circle\"><br>\r\n                    admin\r\n                </div>\r\n                <div class=\"panel-foot bg-back border-back\">您好，admin，这是您第100次登录，上次登录为2015-09-13。</div>\r\n            </div>\r\n            <br>\r\n            <div class=\"panel\">\r\n                <div class=\"panel-head\"><strong>系统统计</strong></div>\r\n                <ul class=\"list-group\">\r\n                    <li><span class=\"float-right badge bg-red\">2634</span><span class=\"icon-user\"></span> 绑定用户</li>\r\n                    <li><span class=\"float-right badge bg-main\">45</span><span class=\"icon-car\"></span> 车辆</li>\r\n                    <li><span class=\"float-right badge bg-main\">2821</span><span class=\"icon-shopping-cart\"></span> 车位</li>\r\n                </ul>\r\n            </div>\r\n            <br>\r\n        </div>\r\n        <div class=\"xm9\">\r\n            <div class=\"alert alert-green\"><strong>注意：</strong>今日预定座位总数为2642个。</div>\r\n\r\n            <div class=\"panel\">\r\n                <table class=\"table\">\r\n                    <tbody><tr><th colspan=\"2\">服务器信息</th></tr>\r\n                    <tr><td width=\"110\" align=\"right\">操作系统：</td><td>\tUbuntu Server 14.04.1 LTS 64位</td></tr>\r\n                    <tr><td align=\"right\">Web服务器：</td><td>Apache</td></tr>\r\n                    <tr><td align=\"right\">程序语言：</td><td>java</td></tr>\r\n                    <tr><td align=\"right\">数据库：</td><td>MongoDB</td></tr>\r\n                    <tr><td align=\"right\">当前状态：</td><td>运行</td></tr>\r\n                    <tr><td align=\"right\">运行时间：</td><td>11天 17小时 38分 54秒</td></tr>\r\n                    <tr><td align=\"right\">内存使用：</td><td>49M</td></tr>\r\n                    </tbody></table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <br>\r\n</div>"
});

});
