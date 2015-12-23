define('components/page/user/user', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");
var Check = require("main/check.js");
var pager = require("pager/pager.js");


module.exports = Vue.extend({
   inherit:true,
   template:"\r\n\r\n\r\n<table>\r\n    <tr>\r\n        <td>\r\n            <div  class=\"\">\r\n                <div id=\"treeDemo\" class=\"ztree\"></div>\r\n            </div>\r\n\r\n        </td>\r\n        <td>\r\n            <div class=\"page-user \" >\r\n\r\n                <div class=\"panel admin-panel\">\r\n                    <div class=\"panel-head\">\r\n                        <strong>\r\n                            用户列表\r\n                        </strong>\r\n                    </div>\r\n                    <div class=\"padding border-bottom\">\r\n                        <div class=\"form-inline\">\r\n                            <div class=\"form-group\">\r\n                                <div class=\"label\">\r\n                                    用户名：\r\n                                </div>\r\n                                <div class=\"field\">\r\n                                    <input type=\"text\" v-model=\"query.name\" class=\"input\" placeholder=\"用户名\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <div class=\"label\">\r\n                                    邮箱：\r\n                                </div>\r\n                                <div class=\"field\">\r\n                                    <input type=\"text\" v-model=\"query.email\" class=\"input\" placeholder=\"邮箱\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <button class=\"button  bg-green\" v-on=\"click:onQuery\" data-target=\"#user-dialog\" data-mask=\"1\" data-width=\"50%\"    >\r\n                                    <span class=\"icon-search\"></span>搜索</button>\r\n                                </button>\r\n\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <button class=\"button  bg-red-light\" v-on=\"click:onReset\" data-target=\"#user-dialog\" data-mask=\"1\" data-width=\"50%\"    >\r\n                                    <span class=\"icon-recycle\"></span>重置</button>\r\n                                </button>\r\n\r\n                            </div>\r\n\r\n                        </div>\r\n                        <input type=\"button\" class=\"button  bg-main float-right\" data-target=\"#user-dialog\" data-mask=\"1\" data-width=\"50%\"  v-on=\"click:addUser\" value=\"新增用户\" />\r\n\r\n                        <!--<input type=\"button\" class=\"button button-small bg-main\" data-target=\"#user-dialog\" data-mask=\"1\" data-width=\"50%\"  v-on=\"click:inputUser\" value=\"导入用户\" />-->\r\n                        <!--<input type=\"button\" class=\"button button-small bg-main\" data-target=\"#user-dialog\" data-mask=\"1\" data-width=\"50%\"  v-on=\"click:dellAllUser\" value=\"删除全部\" />-->\r\n                    </div>\r\n\r\n                    <table class=\"table table-hover\">\r\n                        <tr><th width=\"120\">用户名</th><th width=\"*\">邮箱</th><th width=\"100\">手机号码</th><th width=\"150\">处室</th><th width=\"150\">科室</th><th width=\"100\">用户类型</th><th width=\"100\">登录密码</th><th width=\"140\">操作</th></tr>\r\n                        <tr v-repeat=\"c in users\">\r\n                            <td>{{c.name}}</td>\r\n                            <td>{{c.email}}</td>\r\n                            <td>{{c.mobile}}</td>\r\n                            <td>{{c.department}}</td>\r\n                            <td>{{c.unit}}</td>\r\n                            <!--<td>{{c.limit?c.limit:1}}</td>-->\r\n                            <td>{{c.admin == 1?\"管理员\":\"普通用户\"}}</td>\r\n                            <td>{{c.password}}</td>\r\n                            <td><a v-on=\"click:editUser(c)\" class=\"button border-blue button-little\" href=\"javascript:;\">修改</a> <a class=\"button border-yellow button-little\" v-on=\"click:delUser(c._id)\" href=\"javascript:;\">删除</a> </td></tr>\r\n                    </table>\r\n\r\n                    <c-pager count=\"{{@ count}}\" limit=\"{{@ limit}}\" page=\"{{@ page}}\"></c-pager>\r\n\r\n                    <div class=\"dialog-mask\" style=\"display: none;\"></div>\r\n                    <div id=\"user-dialog\" class=\"dialog-win\" style=\"position: fixed; width: 50%; z-index: 11;display: none;\">\r\n                        <div class=\"dialog open\">\r\n                            <div class=\"dialog-head\">\r\n                                <span class=\"close\" v-on=\"click:closeDialog\"></span>\r\n                                <strong>{{user._type}}</strong>\r\n                            </div>\r\n                            <div class=\"dialog-body\">\r\n                                <div class=\"form-x\">\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"label\">\r\n                                            用户名\r\n                                        </div>\r\n                                        <div class=\"field\">\r\n                                            <input type=\"text\" class=\"input\" v-model=\"user.name\" placeholder=\"请填写用户名\">\r\n                                            <div v-show=\"!validation.name\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"label\">\r\n                                            邮箱\r\n                                        </div>\r\n                                        <div class=\"field\">\r\n                                            <input type=\"text\" class=\"input\" v-model=\"user.email\" placeholder=\"请填写邮箱\">\r\n                                            <div v-show=\"!validation.email\" class=\"input-help  check-error\"><ul><li>请填写邮箱格式</li></ul></div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"label\">\r\n                                            手机号\r\n                                        </div>\r\n                                        <div class=\"field\">\r\n                                            <input type=\"text\" class=\"input\" v-model=\"user.mobile\" placeholder=\"请填写手机号\">\r\n                                            <div v-show=\"!validation.mobile\" class=\"input-help  check-error\"><ul><li>请填写正确手机号码</li></ul></div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"label\">\r\n                                            处室\r\n                                        </div>\r\n                                        <div class=\"field\">\r\n                                            <input type=\"text\" class=\"input\" v-model=\"user.department\" placeholder=\"请填写处室\">\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"label\">\r\n                                            科室\r\n                                        </div>\r\n                                        <div class=\"field\">\r\n                                            <input type=\"text\" class=\"input\" v-model=\"user.unit\" placeholder=\"请填写科室\">\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"label\">\r\n                                            用户类型\r\n                                        </div>\r\n                                        <div class=\"field\">\r\n                                            <select class=\"input\" v-model=\"user.admin\" number>\r\n                                                <option value=0>普通用户</option>\r\n                                                <option value=1>管理员</option>\r\n                                                <option value=3>订票员</option>\r\n                                                <option value=4>处室负责人</option>\r\n                                            </select>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"label\">\r\n                                            登录密码\r\n                                        </div>\r\n                                        <div class=\"field\">\r\n                                            <input type=\"text\" class=\"input\" v-model=\"user.password\" placeholder=\"请填写登录密码\">\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"dialog-foot\">\r\n                                <button class=\"button dialog-close\" v-on=\"click:closeDialog\">取消</button>\r\n                                <button class=\"button bg-green\" v-disabled=\"isValid\" v-on=\"click:postUser\" >确认</button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                </div>\r\n\r\n            </div>\r\n        </td>\r\n    </tr>\r\n</table>\r\n\r\n\r\n",
   data: function () {
      return {

              namea:"",
              level:5
         ,
         users:[],
         count:0,
         limit:10,
         isAdmin:false,
         page:0,
         user:{
            "_type":"新增用户",
            "name":"",
            "mobile":"",
            "email":"",
            "department":"",
            "unit":"",
            "admin":0,
            "type":0, //0 普通用户 1 合作单位
            "password":"",
            "limit":1
         },
         query:{
             email:"",
            name:""

         }
      }
   },
   watch:{
      "page": function (p) {
         this.page = p;
         this.onTreepage();
      }
   },
   methods:{
      addUser: function (e) {
         this.user = {
            "_type":"新增用户",
            "name":"",
            "mobile":"",
            "email":"",
            "department":"",
            "unit":"",
            "admin":0,
            "type":0, //0 普通用户 1 合作单位
            "password":"",
            "limit":1
         };
         this.openDialog();
      },
      editUser: function (model) {
         model._type="修改用户";
         this.user = JSON.parse(JSON.stringify(model));
         this.openDialog();
      },
      onQuery: function () {
         this.getUsers();
      },
      onReset: function () {
         this.query = {
            name:"",
             email:""
         }
         this.getUsers();
      },
      getUsers:function(param){
         var self = this;
         this.loading = true;
         Service.getUsers({page:self.page,limit:self.limit,type:self.user.type,email:this.query.email?this.query.email:undefined,name:this.query.name?this.query.name:undefined},function (rep) {
            self.loading = false;
            if(rep.Code == 0){
               self.users = rep.Response.lists;
               self.count = rep.Response.count;
            }
         });
      },
      delUser: function (id) {
         var r =  confirm("确认删除？");
         if(r){
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
         }
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
      },
      inputUser: function () {

         $.getJSON("/admin/data/dataNew.json", function (rep) {

            var i = 0,len = rep.length;

            var timer =  setInterval(function () {
               if(i<len){
                  var p = rep[i];
                  p.limit = 1;
                  p.admin = 0;
                  p.type = 0;
                  Service.addUser(JSON.stringify(p), function (r) {
                     if(r.Code == 0){
                        console.log(i);
                     }
                  });
                  i++;
               }else{
                  clearInterval(timer);
               }

            },100)



         })
      },
      dellAllUser: function () {
         Service.getUsers({page:0,limit:999},function (rep) {
            var rep = rep.Response.lists;
            var i = 0,len = rep.length;
            var timer =  setInterval(function () {
               if(i<len){
                  Service.delUser(rep[i]._id, function (rep) {
                     if(rep.Code != 0 ){
                     }else{
                        console.log(i);
                     }
                  });
                  i++;
               }else{
                  clearInterval(timer);
               }

            },100)
         });
      },
         onTreeClick:function(event, treeId, treeNode, clickFlag){
            var aa=this;
             //this.users = [];
             aa.level=treeNode.level;
             aa.namea=treeNode.name;
             Service.getUsersa({page:aa.page,limit:aa.limit,type:aa.user.type,email:this.query.email?this.query.email:undefined,name:this.query.name?this.query.name:undefined,namea:treeNode.name?treeNode.name:undefined,level:treeNode.level?treeNode.level:undefined},function (rep) {
                 if(rep.Code == 0){
                     aa.users = rep.Response.lists;
                     aa.count = rep.Response.count;
                 }
             });
             this.dialog = $("#user-dialog");

             var x=parseInt($(window).width()-this.dialog.outerWidth())/2;
             var y=parseInt($(window).height()-this.dialog.outerHeight())/2;
             if (y<=10){y="10"}
             this.dialog.css({"left":x,"top":y});

             this.mask = $(".dialog-mask");
         },
       onTreepage:function(){
           var aa=this;
           //this.users = [];
           Service.getUsersa({page:aa.page,limit:aa.limit,type:aa.user.type,email:this.query.email?this.query.email:undefined,name:this.query.name?this.query.name:undefined,namea: aa.namea? aa.namea:undefined,level: aa.level? aa.level:undefined},function (rep) {
               if(rep.Code == 0){
                   aa.users = rep.Response.lists;
                   aa.count = rep.Response.count;
               }
           });
           this.dialog = $("#user-dialog");

           var x=parseInt($(window).width()-this.dialog.outerWidth())/2;
           var y=parseInt($(window).height()-this.dialog.outerHeight())/2;
           if (y<=10){y="10"}
           this.dialog.css({"left":x,"top":y});

           this.mask = $(".dialog-mask");
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


       var zTree;

       var setting = {
           view: {
               dblClickExpand: false,
               showLine: false
           },
           data: {
               simpleData: {
                   enable: true
               }
           },
           check: {
               enable: false,
               autoCheckTrigger: true
           },
           callback: {
               beforeClick: null,
               onClick: this.onTreeClick
           }
       };
       // function zTreeOnClick(event, treeId, treeNode, clickFlag) {
       //     var self = this;
       //     this.loading = true;

       //
       //
       //}
       var zNodes;
       Service.getDepts(function (rep) {

                zNodes = rep.Response;

           var t = $("#treeDemo");
           t = $.fn.zTree.init(t, setting, zNodes);
       });



   }
});

});
