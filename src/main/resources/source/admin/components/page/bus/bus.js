/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Check = require("main/check.js");
var pager = require("pager/pager.js");

module.exports = Vue.extend({
   inherit:true,
   template:__inline("bus.html"),
   data: function () {
      return {
         buses:[],
         count:0,
         limit:10,
         page:0,
         bus:{
            "_type":"新增车辆",
            "name":"",
            "sn":"",
            "goff":"",
            "arrive":"",
            "line":"",
            "online":1,
			"weeks":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1},
            "src":"/admin/static/images/128.png"
         },
         loading:false
      }
   },
   watch:{
      "page": function (p) {
         this.page = p;
         this.getBuses();
      }
   },
   methods:{
      addBus: function (e) {
         this.bus = {
            "_type":"新增车辆",
            "name":"",
            "sn":"",
            "line":"",
            "arrive":"",
            "destination":"",
            "goff":"",
            "online":1,
			"weeks":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1},
            "src":"/admin/static/images/128.png"
         };
         this.openDialog();
      },
      editBus: function (model) {
         model._type="编辑车辆";
         this.bus = JSON.parse(JSON.stringify(model));
         this.openDialog();
      },
      getBuses:function(param){
         var self = this;
         this.loading = true;
         Service.getBuses({page:self.page,limit:self.limit},function (rep) {
            self.loading = false;
            if(rep.Code == 0){
               self.buses = rep.Response.lists;
               self.count = rep.Response.count;
            }
         });
      },
      delBus: function (id) {
         this.loading = true;
         var self = this;

         var r = confirm("确认删除？");
         if(r){
            Service.delBus(id, function (rep) {
               self.loading = false;
               if(rep.Code != 0 ){
                  alert(rep.Message);
               }else{
                  self.getBuses();
               }
            });
         }
      },
      postBus: function () {
         if (!this.isValid){
            return;
         }
         var self = this;
         this.loading = true;
         if(this.bus._id){
            Service.updateBus(this.bus._id,JSON.stringify(self.bus),function (rep) {
               if(rep.Code != 0 ){
                  alert(rep.Message);
               }else{
                  self.getBuses();
               }
               self.loading = false;
               self.closeDialog();
            });
         }else{
            Service.addBus(JSON.stringify(self.bus),function (rep) {
               if(rep.Code != 0 ){
                  alert(rep.Message);
               }else{
                  self.getBuses();
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
      upLoadImg: function (e) {
         var self = this;
         lrz(e.target.files[0],{width:400}, function (result) {
            self.bus.src = result.base64;
         })
      }
   },
   computed: {
      validation: function () {
         return {
            name: Check.check(this.bus.name,"required"),
            sn: Check.check(this.bus.sn,"required"),
            destination: Check.check(this.bus.destination,"required"),
            goff: Check.check(this.bus.goff,"required"),
            line: Check.check(this.bus.line,"required"),
            arrive: Check.check(this.bus.line,"required")
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
      this.getBuses();
      this.dialog = $("#bus-dialog");
      var x=parseInt($(window).width()-this.dialog.outerWidth())/2;
      var y=parseInt($(window).height()-this.dialog.outerHeight())/2;
      if (y<=10){y=10}
      this.dialog.css({"left":x,"top":y});
      this.mask = $(".dialog-mask");
   }
});