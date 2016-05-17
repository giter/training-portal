define('components/page/companyOrder/busSeat/busSeat', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");
var Check = require("main/check.js");
var IScroll = require("component_modules/iscroll-zoom");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-busSeat\" style=\"height:{{tableStyle2.height}};\">\r\n <div class=\" mui-scroll-wrapper\" style=\"top:151px;height:{{tableStyle2.height}};overflow: hidden\">\r\n  <div class=\"mui-scroll\">\r\n   <div class=\"bus-header\">\r\n    <span>车头方向</span>\r\n    <a class=\"void\"></a> 可选\r\n    <a class=\"order\"></a> 已选\r\n   </div>\r\n   <table class=\"bus-body\" >\r\n    <tr v-repeat=\"r in bus.rows\">\r\n     <td v-repeat=\"bus.cols\" class=\"seat\" data-id=\"{{getSeatId(r,$index)}}\"  v-class=\"seatClass(r,$index)\" style=\"position: relative;\">\r\n      <a style=\"cursor: pointer\" class=\"iconfont\" v-text=\"getText(r,$index)\"  v-on=\"click:clickSeat(this,r,$index)\" >\r\n      </a>\r\n\t  <p class=\"user-name\" v-text=\"getSeatUserName(r,$index)\"></p>\r\n     </td>\r\n    </tr>\r\n   </table>\r\n  </div>\r\n </div>\r\n</div>",
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
                    return seat.entity.user.name;
                }
            }
        },

      clickSeat: function (e,r,c) {
         var $t = $(e.$el);
         if($t.hasClass("icon-seat-void")){
            $(".bus-body").find("td").removeClass("icon-seat-select");
            $t.addClass("icon-seat-select");
            this.selectSeat = $t.data("id").ticket;
         }
      },
      renderScroll: function () {
         myScroll = new IScroll($(".page-busSeat > .mui-scroll-wrapper")[0], {
            zoom: true,
            scrollX: true,
            scrollY: true,
            mouseWheel: true,
            wheelAction: 'zoom'
         });
      }
   },
   watch:{

   },
   ready: function () {
      var self = this;
      Vue.nextTick(function () {
         self.renderScroll();
      })
   }
});


});
