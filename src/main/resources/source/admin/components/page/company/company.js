/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Check = require("main/check.js");
var pager = require("pager/pager.js");

var _user = {
   "_type":"新增用户",
   "name":"",
   "mobile":"",
   "email":"",
   "admin":0,
   "company":"",
   "effective":"",
    "yy":"",
    "sn":"",
   "booktype":"0",
   "type":1  //0 普通用户 1 外包用户
}

module.exports = Vue.extend({
   inherit:true,
   template:__inline("company.html"),
   data: function () {
      return {
         users:[],
         count:0,
         limit:10,
         page:0,
         companies:[],
         selected:"",
         user:_user
      }
   },
   watch:{
      "page": function (p) {
         this.page = p;
         this.getUsers();
      },
      "selected": function (v) {
         this.getUsers(v==0?undefined:v);
      },
      "user.booktype": function (v) {
         this.getUsers();
      }
   },
   methods:{
      addUser: function (e) {
         this.initData();
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
         Service.getUsers({page:self.page,limit:self.limit,type:self.user.type,company:param,booktype:this.user.booktype},function (rep) {
            self.loading = false;
            if(rep.Code == 0){
               self.users = rep.Response.lists;
               self.count = rep.Response.count;
            }
         });
      },
      delUser: function (id) {
         var r = confirm("确认删除？");
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
      initData: function () {
         this.user.name = "";
         this.user.email = "";
         this.user.company = "";
         this.user.effective = "";
         this.user.mobile = "";
          this.user.yy = "";
          this.user.sn = "";
          this.user.zt = "0";
      },
      filterCompanies: function () {
         var self = this;
         Service.getCompanies(function (rep) {
            self.companies = rep.Response;
         })
      }
   },
   computed: {
      validation: function () {
         return {
            name: Check.check(this.user.name,"required"),
            email: Check.check(this.user.email,"email"),
            company: Check.check(this.user.company,"required"),
            mobile: Check.check(this.user.mobile,"mobile")
         }
      },
      validation2: function () {
         return {
            name: Check.check(this.user.name,"required"),
            effective: Check.check(this.user.effective,"required"),
            company: Check.check(this.user.company,"required"),
             yy: Check.check(this.user.yy,"required"),
             sn: Check.check(this.user.sn,"required"),
            mobile: Check.check(this.user.mobile,"mobile")
         }
      },
      isValid: function () {
         var validation = this.validation;
         var validation2 = this.validation2;
         if(this.user.booktype == 0){
            return Object.keys(validation).every(function (key) {
               return validation[key]
            })
         }else {
            return Object.keys(validation2).every(function (key) {
               return validation2[key]
            })
         }
      }
   },
   ready: function () {
      this.getUsers();
      this.filterCompanies();
      this.dialog = $("#company-dialog");
      var x=parseInt($(window).width()-this.dialog.outerWidth())/2;
      var y=parseInt($(window).height()-this.dialog.outerHeight())/2;
      if (y<=10){y="10"}
      this.dialog.css({"left":x,"top":y});
      this.mask = $(".dialog-mask");
      var self = this;
      laydate.skin('molv');
      laydate({
         elem: '#effective',
         //min:laydate.now(),
         choose: function (datas) {
            self.user.effective = datas;
         }
      })

   }

});