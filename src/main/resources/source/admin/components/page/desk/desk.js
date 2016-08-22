/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");


module.exports = Vue.extend({
   inherit:true,
   template:__inline("desk.html"),
   data: function () {
      return {
         system:{}
      }
   },
   computed:{
      getTime:function(){
         var t = this.system.uptime;
         var hour = parseInt(t/3600);
         var minu = parseInt((t/3600-hour)*60);
         var sec = t - hour*3600 - minu*60;
         return hour +"–° ±" + minu +"∑÷"+sec+"√Î";
      }
   },
   compiled: function () {
      var self = this;
      this.loading = true;
      Service.getSysInfo(function (rep) {
         if(rep.Code == 0){
            self.system = rep.Response;
         }
         self.loading = false;

      })
   }
});