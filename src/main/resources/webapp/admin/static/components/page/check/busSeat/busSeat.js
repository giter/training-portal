define('components/page/check/busSeat/busSeat', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");
var Check = require("main/check.js");
var IScroll = require("component_modules/iscroll-zoom");

module.exports = Vue.extend({
   inherit:true,
   template:"<style>\r\n\t@media print {\r\n\t\t@page { size: A4 portrait;}\r\n\t\t.lefter {display:none;}\r\n\t\t#admin-nav{display:none;}\r\n\t\t.admin { left:0; top:0; padding: 0;width: 100%;}\r\n\t\t.printer {display:none;}\r\n\t\t.bus-body { width: auto;}\r\n\t\t.page-companyOrder {padding: 0;}\r\n\t\t.page-busSeat .bus-header{padding: 10px 0;}\r\n\t}\r\n\r\n</style>\r\n\r\n<div class=\"page-busSeat\">\r\n <div class=\" mui-scroll-wrapper\" style=\"top:151px;\">\r\n  <div class=\"mui-scroll\">\r\n   <div class=\"bus-header\">\r\n    <span>车头方向</span>\r\n    <a class=\"void\"></a> 可选\r\n    <a class=\"order\"></a> 已选\r\n\r\n\t<button v-on=\"click:onPrint\" class=\"button bg-main float-right printer\" >打印</button>\r\n\r\n   </div>\r\n   <table class=\"bus-body\" style='width: 100%;margin: 0 auto;'>\r\n    <tr v-repeat=\"r in bus.rows\">\r\n     <td v-repeat=\"bus.cols\" style=\"position: relative;padding:0;width:80px; border: 1px solid #000;\">\r\n      <a style=\"cursor: default; line-height: 16px; height: 16px;\" class=\"iconfont\" v-text=\"getText(r,$index)\" >\r\n      </a>\r\n\t  <p class=\"user-name\" v-text=\"getSeatUserName(r,$index)\" style='margin-bottom: 4px;'></p>\r\n         <p class=\"user-name\" v-text=\"getSeatUserSource(r,$index)\" style='margin-bottom: 4px;'></p>\r\n\r\n     </td>\r\n    </tr>\r\n   </table>\r\n  </div>\r\n </div>\r\n</div>",
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


});
