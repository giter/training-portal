define('components/page/bus/bus', function(require, exports, module) {

/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m").layer;

module.exports = Vue.extend({
    template:"<div class=\"page-bus\"  v-transition=\"slideInRight\">\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <h5 class=\"mui-title\">{{bus.name}}({{bus.sn}})\r\n        </h5>\r\n        <a class=\"mui-icon mui-icon-arrowleft mui-pull-left\" href=\"#/search/result\"></a>\r\n    </header>\r\n    <div class=\"mui-content mui-scroll-wrapper\" style=\"padding-bottom: 44px;\">\r\n       <div class=\"mui-scroll\">\r\n           <div class=\"bus-header\">\r\n\r\n           </div>\r\n           <table class=\"bus-body\">\r\n               <tr v-repeat=\"r in bus.rows\">\r\n                   <td v-repeat=\"bus.cols\" class=\"seat\" data-id=\"{{getSeatId(r,$index)}}\" v-on=\"tap:selectSeat(this,r,$index)\" v-class=\"seatClass(r,$index)\" style=\"position: relative;\">\r\n                       <a class=\"iconfont\" v-text=\"getText(r,$index)\"  >\r\n                       </a>\r\n                   </td>\r\n               </tr>\r\n           </table>\r\n       </div>\r\n    </div>\r\n    <nav class=\"mui-bar mui-bar-footer\">\r\n        <button class=\"mui-btn mui-btn-block mui-btn-primary\" v-on=\"tap:orderSeat\">\r\n            <span class=\"mui-icon mui-icon-checkmarkempty\"></span>\r\n            预订\r\n        </button>\r\n    </nav>\r\n</div>",
    data: function () {
        return {
            bus:{},
            seat:null
        }
    },
    methods:{
        "seatClass": function (r,c) {
            var list = this.bus.seats;
            for(var i =0;i<list.length;i++){
                if(list[i].col == c && list[i].row == r){
                    if(list[i].state){
                        hav = true;
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
        "selectSeat": function (e,r,c) {
            var $t = $(e.$el);
            if($t.hasClass("icon-seat-void")){
                $(".bus-body").find("td").removeClass("icon-seat-select");
                $t.addClass("icon-seat-select");
                this.seat = $t.data("id");
            }
        },
        "orderSeat": function () {
            if(this.seat){
                var self = this;
                Layer.open({
                    content:"确定预订"+this.seat.sn +"号座位吗？",
                    shadeClose:false,
                    btn:["确定","取消"],
                    yes: function () {
                        self._orderSeat(self.seat._id);
                    },
                    no: function () {
                        Layer.closeAll();
                    }
                });
            }else{
                Layer.open({
                    content:"请先选择座位!",
                    shadeClose:false,
                    btn:["确定"],
                    yes: function () {
                        Layer.closeAll();
                    }
                })
            }
        },
        _orderSeat: function (id) {
            Service.orderSeat(id,JSON.stringify({openID:"oXJVPs6KdX-f8C_T55uJiY3WtbX4"}), function (rep) {
                Layer.closeAll();
            });
        }
    },
    ready: function () {
        var busid = Service.getHashString("id"),
            date = Service.getHashString("date");
        mui(".page-bus > .mui-content").scroll();
        var self = this;
        Layer.open({
            content:"加载中",
            type:2,
            shadeClose:false
        });
        Service.getBusSeat({bus:busid,date:date},function (rep) {
            if(rep.Code == 0){
                self.bus = rep.Response;
            }
            Layer.closeAll();
        })
    },
    compiled: function () {

    }
});

});
