define('components/page/user/user', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Pintuer = require("main/pintuer.js");
var Service = require("main/service.js");

module.exports = Vue.extend({
   inherit:true,
   template:"<form method=\"post\">\r\n<div class=\"panel admin-panel\">\r\n    <div class=\"panel-head\">\r\n        <strong>\r\n            用户列表\r\n        </strong>\r\n    </div>\r\n    <div class=\"padding border-bottom\">\r\n        <input type=\"button\" class=\"button button-small checkall\" name=\"checkall\" checkfor=\"id\" value=\"全选\" />\r\n        <input type=\"button\" class=\"button button-small border-green\" value=\"添加用户\" />\r\n        <input type=\"button\" class=\"button button-small border-yellow\" value=\"批量删除\" />\r\n    </div>\r\n    <table class=\"table table-hover\">\r\n        <tr><th width=\"45\">选择</th><th width=\"120\">用户工号</th><th width=\"*\">用户名称</th><th width=\"100\">登录密码</th><th width=\"100\">用户类型</th><th width=\"100\">创建时间</th><th width=\"100\">操作</th></tr>\r\n        <tr v-repeat=\"c in users\">\r\n            <td><input type=\"checkbox\" name=\"id\" value=\"1\" /></td>\r\n            <td>{{c.id}}</td>\r\n            <td>{{c.name}}</td>\r\n            <td>{{c.pwd}}</td>\r\n            <td>{{c.type}}</td>\r\n            <td>{{c.create}}</td>\r\n        <td><a class=\"button border-blue button-little\" href=\"#\">修改</a> <a class=\"button border-yellow button-little\" href=\"#\" onclick=\"{if(confirm('确认删除?')){return true;}return false;}\">删除</a> </td></tr>\r\n    </table>\r\n\r\n    <div class=\"panel-foot text-center\">\r\n        <ul class=\"pagination\"><li><a href=\"javascript:;\" v-on=\"click:prevPage\">上一页</a></li></ul>\r\n        <ul class=\"pagination pagination-group\">\r\n            <li v-on=\"click:toPage\" v-repeat=\"parseInt(((total-1)/size))+1\" v-class=\"active:$index == (page-1)\"><a href=\"javascript:;\">{{$index+1}}</a></li>\r\n        </ul>\r\n        <ul class=\"pagination\"><li><a href=\"javascript:;\" v-on=\"click:nextPage\">下一页</a></li></ul>\r\n    </div>\r\n</div>\r\n</form>",
   data: function () {
      return {
         users:[],
         total:0,
         size:10,
         page:1
      }
   },
   watch:{
      "page": function (p) {
         this.getUsers({page:p,size:this.size});
      }
   },
   methods:{
      showDialog: function (e) {
         Pintuer.showdialog(e);
      },
      getUsers:function(param){
         var self = this;
         Service.getUsers(param,function (rep) {
            if(rep.Code == 0){
               self.users = rep.Response.rows;
               self.total = rep.Response.total;
            }
         });
      },
      toPage: function (e) {
         this.page = parseInt(e.target.innerHTML);
      },
      nextPage: function (e) {
         var t = parseInt(((this.total-1)/this.size))+1;
         if(this.page < t){
            this.page +=1;
         }

      },
      prevPage: function () {
         if(this.page > 1){
            this.page -=1;
         }
      }
   },
   ready: function () {
      this.getUsers({page:this.page,size:this.size});
   }
});

});
