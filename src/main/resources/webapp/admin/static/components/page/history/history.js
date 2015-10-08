define('components/page/history/history', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");


module.exports = Vue.extend({
   inherit:true,
   data: function () {
      return {
         traces:[],
         count:0,
         page:0,
         limit:10
      }
   },
   template:"<div class=\"page-history\">\r\n    <div class=\"panel admin-panel\">\r\n        <div class=\"panel-head\">\r\n            <strong>\r\n                登陆日志\r\n            </strong>\r\n        </div>\r\n\r\n        <table class=\"table table-hover\">\r\n            <tr><th width=\"200\">用户名</th><th width=\"*\">邮箱</th><th width=\"200\">操作</th><th width=\"200\">时间</th></tr>\r\n            <tr v-repeat=\"v in traces\">\r\n                <td>{{v.user.name}}</td>\r\n                <td>{{v.user.email}}</td>\r\n                <td>{{getAction(v.action)}}</td>\r\n                <td>{{getTime(v.created)}}</td>\r\n            </tr>\r\n        </table>\r\n\r\n        <div class=\"panel-foot text-center\">\r\n            <ul class=\"pagination\"><li><a href=\"javascript:;\" v-on=\"click:prevPage\">上一页</a></li></ul>\r\n            <ul class=\"pagination pagination-group\">\r\n                <li v-on=\"click:toPage\" v-repeat=\"parseInt(((count-1)/limit))+1\" v-class=\"active:$index == (page)\"><a href=\"javascript:;\">{{$index+1}}</a></li>\r\n            </ul>\r\n            <ul class=\"pagination\"><li><a href=\"javascript:;\" v-on=\"click:nextPage\">下一页</a></li></ul>\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>",
   compiled: function () {
      var self = this;
      self.loading = true;
      Service.getTraces({page:this.page,limit:this.limit}, function (rep) {
         self.loading = false;
         if(rep.Code == 0){
            self.traces = rep.Response.lists;
            self.count = rep.Response.count;
         }
      })
   },
   methods:{
      toPage: function (e) {
         this.page = parseInt(e.target.innerHTML)-1;
      },
      nextPage: function (e) {
         var t = parseInt(((this.count-1)/this.limit));
         if(this.page < t){
            this.page +=1;
         }
      },
      prevPage: function () {
         if(this.page > 0){
            this.page -=1;
         }
      },
      getTime: function (t) {
         var d = new Date(t);
         return d.getFullYear() + "-" +(d.getMonth()+1)+"-"+ d.getDate() +" " + d.getHours()+":"+ d.getMinutes()+":"+ d.getSeconds();
      },
      getAction: function (t) {
         switch (t){
            case 1:{
               return "后台登录"
            }break;
            case  10000:{
               return "前台登录"
            }break;
         }
      }
   }
});

});
