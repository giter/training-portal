/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Check = require("main/check.js");

var tStats = require("page/companyOrder/ticketsStats/ticketsStats.js");
var bSeat = require("page/companyOrder/busSeat/busSeat.js");

module.exports = Vue.extend({
   inherit:true,
   template:__inline("companyOrder.html"),
   components:{
      stats:tStats,
      seats:bSeat,
      bus:{}
   },
   data: function () {
      return {
         companies:[],
         selectCompany:null,
         selectUser:null,
         calendar:[],
         selectCalendar:null,
         selectSeat:null,
         whither:[],
         selectWhither:null,
         users:[],
         tableStyle:{
            "height":document.documentElement.clientHeight-282 +"px",
            "overflow-y":"auto"
         },tableStyle2:{
            "height":document.documentElement.clientHeight-245 +"px",
            "overflow-y":"auto"
         },
         bus:{},
         childView:"",
         tStats:[] /*查票*/
      }
   },
   methods:{
      getUser: function () {
         var self =this;
         this.loading = true;
         if(!this.selectCompany){
            return this.users = [];
         }
         Service.getUsers({
            page:0,
            limit:999,
            type:1,
            booktype:1,
            // effective:true,
            company:self.selectCompany
         }, function (rep) {
            if(rep.Code == 0){
               var users = rep.Response.lists;

               Service.getCompanyTicket({
                  page:0,
                  limit:999,
                  company:self.selectCompany,
                  date:self.selectCalendar
               }, function (rep) {
                  if(rep.Code == 0){
                     var list = rep.Response;
                     for(var u = 0;u< users.length; u++){
                        for(var i =0;i< list.length; i++){
                           if(users[u]._id == list[i].user._id){
                              users[u].bus = list[i].bus.name;
                              users[u].seat = list[i].seat.sn;
                              users[u].ticket = list[i]._id;
                           }
                        }
                     }
                     self.users =users;
                  }
                  self.loading = false;
               })

            }
         })
      },
      btnSearch: function () {

      },
      valid: function () {

      },
      searchTicketStats: function () {
         if(this.selectCalendar&&this.selectWhither){
            this.loading = true;
            var self = this;
            Service.getTicketStats({dest:this.selectWhither,date:this.selectCalendar}, function (rep) {
               self.loading = false;
               if(rep.Code == 0){
                  self.tStats = rep.Response;
                  self.childView = "stats";
               }
            })
         }
      },
      getCompanyUser: function () {
         this.selectUser = "";
         this.getUser();
      },
      clickUser: function (id) {
         this.selectUser = id;
      },
      onOrder: function () {
         var self = this;
         this.loading = true;
         Service.orderTicket(this.selectUser,this.selectSeat, function (rep) {
            self.loading = false;
            if(rep.Code == 0){
               self.getUser();
               self.selectSeat = null;
               $(".page-busSeat .icon-seat-select").removeClass("icon-seat-select").addClass("icon-seat-order");
            }else{
               alert(rep.Message);
            }
         })
      },
      unSub: function (uid,id) {
         var r = confirm("确定退订？");
         var self = this;
         if(r){
            this.loading = true;
            Service.unTicket(uid,id, function (rep) {
               this.loading = false;
               self.getUser();
            })
         }

      }
   },
   watch:{
      "selectCompany": function (v) {
         if(v && this.selectCalendar){
            this.getCompanyUser();
         }
      },
      "selectCalendar": function (v) {
         if(v && this.selectCalendar){
            this.getCompanyUser();
            this.searchTicketStats();
         }
      }
   },
   ready: function () {
      var self = this;
      Service.getCompanies(function (rep) {
         self.companies = rep.Response;
      });
      Service.getCalendar(function (rep) {
         if(rep.Code == 0){
            var target = rep.Response;
            var lst = [];
            for(var i=0;i<target.length;i++){
               lst.push({
                  value:target[i].value,
                  text:target[i].name +"-" +target[i].week + (i==0?"（今天）":"")
               })
            }
            self.calendar = lst;
         }
      });
      Service.getWhither(function (rep) {
         if(rep.Code == 0){
            var target = rep.Response;
            var lst = [];
            for(var i in target){
               for(var d in target[i].list){
                  lst.push(target[i].list[d].id);
               }
            }
            self.whither = lst;
         }
      })
   }
});
