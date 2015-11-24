/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

Vue.filter("dateFormat", function (v) {
   var d = new Date(v);
   return d.getFullYear() + "-" + (d.getMonth()+1) +"-" + d.getDate();
});

module.exports = Vue.extend({
   inherit:true,
   template:__inline("order.html"),
   data: function () {
      return {
         dates:[],
         cars:[]
      }
   },
   methods:{
      getDays: function (num) {
         var n = num || 12,now = Date.parse(new Date()),list = [];

         //CONFIG.OFFTIME;

         for(var i = 0; i< n;i++){
            now+=3600000*24;
            list.push(now);
         }
         return list;
      }
   },
   ready: function () {
      this.dates = this.getDays();
      var self = this;
      Service.getCarList({page:1,size:10}, function (rep) {
         self.cars = rep.Response.rows;
      })
   }
});