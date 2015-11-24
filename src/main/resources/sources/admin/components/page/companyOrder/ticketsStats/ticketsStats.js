/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

module.exports = Vue.extend({
   inherit:true,
   template:__inline("ticketsStats.html"),
   methods:{
      getBusSeat: function (id) {
         var self = this;
         Service.getBusTickets({bus:id,date:this.selectCalendar}, function (rep) {
            self.bus = rep.Response;
            self.childView = "seats";
         });
      }

   }
});
