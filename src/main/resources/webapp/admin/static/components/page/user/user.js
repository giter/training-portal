define('components/page/user/user', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");
var Check = require("main/check.js");


module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-user\">\r\n    <div class=\"panel admin-panel\">\r\n        <div class=\"panel-head\">\r\n            <strong>\r\n                用户列表\r\n            </strong>\r\n        </div>\r\n        <div class=\"padding border-bottom\">\r\n            <input type=\"button\" class=\"button button-small bg-main\" data-target=\"#user-dialog\" data-mask=\"1\" data-width=\"50%\"  v-on=\"click:addUser\" value=\"新增用户\" />\r\n        </div>\r\n        <table class=\"table table-hover\">\r\n            <tr><th width=\"120\">用户名</th><th width=\"250\">邮箱</th><th width=\"100\">手机号码</th><th width=\"*\">OpenID</th><th width=\"100\">订票限制</th><th width=\"100\">用户类型</th><th width=\"100\">操作</th></tr>\r\n            <tr v-repeat=\"c in users\">\r\n                <td>{{c.name}}</td>\r\n                <td>{{c.email}}</td>\r\n                <td>{{c.mobile}}</td>\r\n                <td>{{c.openID}}</td>\r\n                <td>{{c.limit?c.limit:1}}</td>\r\n                <td>{{c.admin == 1?\"管理员\":\"普通用户\"}}</td>\r\n                <td><a v-on=\"click:editUser(c)\" class=\"button border-blue button-little\" href=\"javascript:;\">修改</a> <a class=\"button border-yellow button-little\" v-on=\"click:delUser(c._id)\" href=\"javascript:;\" onclick=\"{if(confirm('确认删除?')){return true;}return false;}\">删除</a> </td></tr>\r\n        </table>\r\n\r\n        <div class=\"panel-foot text-center\">\r\n            <ul class=\"pagination\"><li><a href=\"javascript:;\" v-on=\"click:prevPage\">上一页</a></li></ul>\r\n            <ul class=\"pagination pagination-group\">\r\n                <li v-on=\"click:toPage\" v-repeat=\"parseInt(((count-1)/limit))+1\" v-class=\"active:$index == (page)\"><a href=\"javascript:;\">{{$index+1}}</a></li>\r\n            </ul>\r\n            <ul class=\"pagination\"><li><a href=\"javascript:;\" v-on=\"click:nextPage\">下一页</a></li></ul>\r\n        </div>\r\n\r\n        <div class=\"dialog-mask\" style=\"display: none;\"></div>\r\n        <div id=\"user-dialog\" class=\"dialog-win\" style=\"position: fixed; width: 50%; z-index: 11;display: none;\">\r\n            <div class=\"dialog open\">\r\n                <div class=\"dialog-head\">\r\n                    <span class=\"close\" v-on=\"click:closeDialog\"></span>\r\n                    <strong>{{user._type}}</strong>\r\n                </div>\r\n                <div class=\"dialog-body\">\r\n                    <div class=\"form-x\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                用户名\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"user.name\" placeholder=\"请填写用户名\">\r\n                                <div v-show=\"!validation.name\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                邮箱\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"user.email\" placeholder=\"请填写邮箱\">\r\n                                <div v-show=\"!validation.email\" class=\"input-help  check-error\"><ul><li>请填写邮箱格式</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                手机号\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"user.mobile\" placeholder=\"请填写手机号\">\r\n                                <div v-show=\"!validation.mobile\" class=\"input-help  check-error\"><ul><li>请填写正确手机号码</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                用户类型\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <select class=\"input\" v-model=\"user.admin\">\r\n                                    <option value=\"0\">普通用户</option>\r\n                                    <option value=\"1\">管理员</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"dialog-foot\">\r\n                    <button class=\"button dialog-close\" v-on=\"click:closeDialog\">取消</button>\r\n                    <button class=\"button bg-green\" v-disabled=\"isValid\" v-on=\"click:postUser\" >确认</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>",
   data: function () {
      return {
         users:[],
         count:0,
         limit:10,
         page:0,
         user:{
            "_type":"新增用户",
            "name":"",
            "mobile":"",
            "email":"",
            "admin":0,
            "type":0 //0 普通用户 1 承包商
         }
      }
   },
   watch:{
      "page": function (p) {
         this.page = p;
         this.getUsers();
      }
   },
   methods:{
      addUser: function (e) {
         this.user = {
            "_type":"新增用户",
            "name":"",
            "mobile":"",
            "email":"",
            "admin":0,
            "type":0 //0 普通用户 1 承包商
         };
         this.openDialog();
      },
      editUser: function (model) {
         model._type="修改用户";
         this.user = JSON.parse(JSON.stringify(model));
         this.openDialog();
      },
      getUsers:function(param){
         var self = this;
         this.loading = true;
         Service.getUsers({page:self.page,limit:self.limit,type:self.user.type},function (rep) {
            self.loading = false;
            if(rep.Code == 0){
               self.users = rep.Response.lists;
               self.count = rep.Response.count;
            }
         });
      },
      delUser: function (id) {
         this.loading = true;
         var self = this;
         Service.delUser(id, function (rep) {
            self.loading = false;
            if(rep.Code != 0 ){
               alert(rep.Message);
            }else{
               self.getUsers();
            }
         });
      },
      postUser: function () {
         if (!this.isValid){
            return;
         }

         var self = this;
         this.loading = true;
         if(this.user._id){
            Service.updateUser(this.user._id,JSON.stringify(self.user),function (rep) {
               if(rep.Code != 0 ){
                  alert(rep.Message);
               }else{
                  self.getUsers();
               }
               self.loading = false;
               self.closeDialog();
            });
         }else{
            Service.addUser(JSON.stringify(self.user),function (rep) {
               if(rep.Code != 0 ){
                  alert(rep.Message);
               }else{
                  self.getUsers();
               }
               self.loading = false;
               self.closeDialog();
            });
         }
      },
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
      openDialog: function () {
         this.dialog.show();
         this.mask.show();
      },
      closeDialog: function () {
         this.dialog.hide();
         this.mask.hide();
      }
   },
   computed: {
      validation: function () {
         return {
            name: Check.check(this.user.name,"required"),
            email: Check.check(this.user.email,"email"),
            mobile: Check.check(this.user.mobile,"mobile")
         }
      },
      isValid: function () {
         var validation = this.validation;
         return Object.keys(validation).every(function (key) {
            return validation[key]
         })
      }
   },
   ready: function () {
      this.getUsers();
      this.dialog = $("#user-dialog");

      var x=parseInt($(window).width()-this.dialog.outerWidth())/2;
      var y=parseInt($(window).height()-this.dialog.outerHeight())/2;
      if (y<=10){y="10"}
      this.dialog.css({"left":x,"top":y});

      this.mask = $(".dialog-mask");
   }
});

});
