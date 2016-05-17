define('components/page/desk/desk', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");


module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"admin\">\r\n    <div class=\"line-big\">\r\n        <div class=\"xm3\">\r\n            <div class=\"panel border-back\">\r\n                <div class=\"panel-body text-center\">\r\n                    <img src=\"/admin/static/images/admin.jpg\" width=\"120\" class=\"radius-circle\"><br>\r\n                    管理员\r\n                </div>\r\n                <div class=\"panel-foot bg-back border-back\">您好，管理员!</div>\r\n            </div>\r\n            <br>\r\n            <div class=\"panel\">\r\n                <div class=\"panel-head\"><strong>系统统计</strong></div>\r\n                <ul class=\"list-group\">\r\n                    <li><span class=\"float-right badge bg-red\">{{system.users}}</span><span class=\"icon-user\"></span> 绑定用户</li>\r\n                    <li><span class=\"float-right badge bg-main\">{{system.buses}}</span><span class=\"icon-car\"></span> 车辆</li>\r\n                    <li><span class=\"float-right badge bg-main\">{{system.seats}}</span><span class=\"icon-shopping-cart\"></span> 车位</li>\r\n                </ul>\r\n            </div>\r\n            <br>\r\n        </div>\r\n        <div class=\"xm9\">\r\n            <!--<div class=\"alert alert-green\"><strong>注意：</strong>今日预定座位总数为123个。</div>-->\r\n\r\n            <div class=\"panel\">\r\n                <table class=\"table\">\r\n                    <tbody><tr><th colspan=\"2\">服务器信息</th></tr>\r\n                    <tr><td width=\"110\" align=\"right\">操作系统：</td><td>{{system.os}}</td></tr>\r\n                    <tr><td align=\"right\">Web服务器：</td><td>{{system.web}}</td></tr>\r\n                    <tr><td align=\"right\">程序语言：</td><td>{{system.language}}</td></tr>\r\n                    <tr><td align=\"right\">数据库：</td><td>{{system.db}}</td></tr>\r\n                    <tr><td align=\"right\">当前状态：</td><td>{{system.status}}</td></tr>\r\n                    <tr><td align=\"right\">运行时间：</td><td>{{getTime}}</td></tr>\r\n                    <tr><td align=\"right\">内存使用：</td><td>{{system.memory/1048576}}MB</td></tr>\r\n                    </tbody></table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <br>\r\n</div>",
   data: function () {
      return {
         system:{}
      }
   },
   computed:{
      getTime:function(){
         var t = this.system.uptime;
         var hour = parseInt(t/3600);
         var minu = parseInt((t/3600-hour)*60);
         var sec = t - hour*3600 - minu*60;
         return hour +"小时" + minu +"分"+sec+"秒";
      }
   },
   compiled: function () {
      var self = this;
      this.loading = true;
      Service.getSysInfo(function (rep) {
         if(rep.Code == 0){
            self.system = rep.Response;
         }
         self.loading = false;

      })
   }
});

});
