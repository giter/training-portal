/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Check = require("main/check.js");

var tStats = require("page/check/ticketsStats/ticketsStats.js");
var bSeat = require("page/check/busSeat/busSeat.js");

module.exports = Vue.extend({
   inherit:true,
   template:__inline("check.html"),
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
         line:"",
         busname:"",
         childView:"",
         tStats:[] /*��Ʊ*/
      }
   },
   methods:{
       //showDatePicker: function () {
       //    var self = this;
       //    this.picker.show(function (d) {
       //        self.date = d.text;
       //    });
       //},
      btnSearch: function () {

      },
      valid: function () {

      },
      searchTicketStats: function () {
          //alert(this.selectCalendar);
          //alert(this.selectWhither);
          //alert($('#selectCalendar').val())
          this.selectCalendar=$('#selectCalendar').val();
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
      onPrint: function () {
         print();
      },

      unSub: function (uid,id) {
         var r = confirm("ȷ���˶���");
         var self = this;
         if(r){
            this.loading = true;
            Service.unTicket(uid,id, function (rep) {
               this.loading = false;
               self.getUser();
            })
         }

      },
       aa:function(){
           alert( this.selectCalendar)
           if( this.selectCalendar){
               //this.getCompanyUser();
               this.searchTicketStats();
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
            //this.getCompanyUser();
            this.searchTicketStats();
         }
      }
   },
   ready: function () {
      var self = this;
      Service.getCompanies(function (rep) {
         self.companies = rep.Response;
      });
      Service.getCalendara(function (rep) {
         if(rep.Code == 0){
            var target = rep.Response;
            var lst = [];
            for(var i=0;i<target.length;i++){
               lst.push({
                  value:target[i].value,
                  text:target[i].name +"-" +target[i].week + (i==10?"�����죩":"")
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


           //this.picker = new mui.DtPicker({"type":"date","beginYear":2016});

   }
});
