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
   methods:{
      initSeat: function () {
         $.getJSON("/data/dbus.json", function (buss) {

            $.getJSON("/data/dseat.json", function (seats) {
            var len = buss.length;
               for(var b in buss){
                  for(var s in seats){
                     Service.addSeat(buss[b]._id,JSON.stringify({
                        row:seats[s].row,
                        col:seats[s].col,
                        sn:seats[s].sn
                     }), function (rep) {
                        console.log("第"+(b+1)+"辆车，第"+s+"个座位，进度"+b/len);
                     })

                  }
               }

            })
         })
      }
   },
   computed:{
      getTime:function(){
         var t = this.system.uptime;
         var hour = parseInt(t/3600);
         var minu = parseInt((t/3600-hour)*60);
         var sec = t - hour*3600 - minu*60;
         return hour +"小时" + minu +"分"+sec+"秒";
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