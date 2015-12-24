/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Check = require("main/check.js");
var IScroll = require("component_modules/iscroll-zoom.js");

module.exports = Vue.extend({
   inherit:true,
   template:__inline("busSeat.html"),
   data: function () {
     return {

     }
   },
   methods:{
      "getText": function (r,c) {
         var list = this.bus.seats;
         for(var i =0;i<list.length;i++) {
            if (list[i].col == c && list[i].row == r) {
               return list[i].sn;
            }
         }
      },
      "getSeatId": function (r,c) {
         var list = this.bus.seats;
         for(var i =0;i<list.length;i++) {
            if (list[i].col == c && list[i].row == r) {
               return JSON.stringify(list[i]);
            }
         }
      },
      "seatClass": function (r,c) {
         var list = this.bus.seats;
         for(var i =0;i<list.length;i++){
            if(list[i].col == c && list[i].row == r){
               if(list[i].state){

				  if(!parseInt(list[i].sn)&&typeof list[i].sn == "string"){
                      return "icon-seat-none bus-text"
                  }

                  switch (list[i].state){
                     case 0:{
                        return "icon-seat-none";
                     }break;
                     case 1:{
                        return "icon-seat-void";
                     }break;
                     case 2:{
                        return "icon-seat-order";
                     }break;
                     default: {
                        return "icon-seat-none";
                     }
                  }
               }
            }
         }

      },

	  getSeatUserName: function (r,c) {

            var seat = this.getSeatId(r,c);

            if(seat){
                var seat = JSON.parse(seat);
                if(seat.entity.user){
                    var a=seat.entity.user.name;
                    var b=seat.entity.user.department;
                    if(seat.entity.source){
                        if(seat.entity.source.relation!=null) {
                            b = seat.entity.source.relation;
                        }
                    }
                    if(seat.entity.user.department==null){
                        b="";
                    }

                    var c=a+"("+b+")";
                    return c;

                }
            }

			return "";
        },

       getSeatUserSource: function (r,c) {

           var seat = this.getSeatId(r,c);

           if(seat){
               var seat = JSON.parse(seat);
               if(seat.entity.source){
                   var a=seat.entity.source.name;
                   var b=seat.entity.source.department;

                   var c="代订人："+a+"("+b+")";
                   return c;
               }
           }

           return "";
       },


      clickSeat: function (e,r,c) {
         var $t = $(e.$el);
         if($t.hasClass("icon-seat-void")){
            $(".bus-body").find("td").removeClass("icon-seat-select");
            $t.addClass("icon-seat-select");
            this.selectSeat = $t.data("id").ticket;
         }
      }
   },
   watch:{

   },
   ready: function () {
      var self = this;
      Vue.nextTick(function () {
      })
   }
});
