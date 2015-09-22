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
   template:"<div class=\"page-busSeat\" >\r\n <div class=\" mui-scroll-wrapper\" style=\"top:151px;height:{{tableStyle.height}};overflow: hidden\">\r\n  <div class=\"mui-scroll\">\r\n   <div class=\"bus-header\">\r\n    <span>车头方向</span>\r\n    <a class=\"void\"></a> 可选\r\n    <a class=\"order\"></a> 已选\r\n   </div>\r\n   <table class=\"bus-body\">\r\n    <tr v-repeat=\"r in bus.rows\">\r\n     <td v-repeat=\"bus.cols\" class=\"seat\" data-id=\"{{getSeatId(r,$index)}}\"  v-on=\"tap:selectSeat(this,r,$index)\" v-class=\"seatClass(r,$index)\" style=\"position: relative;\">\r\n      <a class=\"iconfont\" v-text=\"getText(r,$index)\"  >\r\n      </a>\r\n     </td>\r\n    </tr>\r\n   </table>\r\n  </div>\r\n </div>\r\n</div>",
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
