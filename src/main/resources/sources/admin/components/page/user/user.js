/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Check = require("main/check.js");
var pager = require("pager/pager.js");


module.exports = Vue.extend({
   inherit:true,
   template:__inline("user.html"),
   data: function () {
      return {
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