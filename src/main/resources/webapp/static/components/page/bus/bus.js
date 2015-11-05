define('components/page/bus/bus', function(require, exports, module) {

/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m").layer;
var IScroll = require("component_modules/iscroll-zoom");
var Router = require("component_modules/director").Router;

module.exports = Vue.extend({
    inherit:true,
    template:"<div class=\"page-bus\" >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <h5 class=\"mui-title\">{{bus.sn}}\r\n        </h5>\r\n        <a class=\" mui-icon mui-icon-left-nav mui-pull-left\" href=\"#/search/result\"></a>\r\n        <a class=\"mui-icon  mui-icon-refresh mui-pull-right\" v-on=\"click:reloadSeat\"></a>\r\n    </header>\r\n    <div class=\"mui-content\">\r\n        <ul class=\"mui-table-view\" style=\"margin-top: 0\">\r\n            <li class=\"mui-table-view-cell mui-media\">\r\n                <div class=\"mui-media-body\">\r\n                    <span style=\"font-weight: bold\">方向：{{bus.destination}}</span>\r\n                    <p class='mui-ellipsis' style=\"font-size: 12px\">\r\n                        {{search.date}}\r\n                    </p>\r\n                </div>\r\n                <button class=\"mui-btn mui-btn-primary\" v-on=\"click:orderSeat\">\r\n                    提交预订\r\n                </button>\r\n            </li>\r\n        </ul>\r\n        <ul class=\"mui-table-view\">\r\n            <li class=\"mui-table-view-cell\" style=\"padding:6px 15px;line-height: 35px;\">\r\n                {{selectText}}\r\n                    <select style=\"width: 120px;height: 35px;\" class=\" mui-pull-right form-control\" v-model=\"selectDelegate\" options=\"delegate\"></select>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    <div class=\" mui-scroll-wrapper\" style=\"top:155px;\">\r\n        <div class=\"mui-scroll\" >\r\n            <div class=\"bus-header\">\r\n                <span>车头方向</span>\r\n                <a class=\"void\"></a> 可选\r\n                <a class=\"order\"></a> 已选\r\n            </div>\r\n            <table class=\"bus-body\">\r\n                <tr v-repeat=\"r in bus.rows\">\r\n                    <td v-repeat=\"bus.cols\" class=\"seat\" data-id=\"{{getSeatId(r,$index)}}\"  v-on=\"click:selectSeat(this,r,$index)\" v-class=\"seatClass(r,$index)\" style=\"position: relative;\">\r\n                        <a class=\"iconfont\" v-text=\"getText(r,$index)\"  >\r\n                        </a>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n\r\n            <ul class=\"mui-table-view silder-nav\" style=\"\">\r\n                <li class=\"mui-table-view-cell\" v-repeat=\"bus.rows\">\r\n                    {{$index+1}}\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n\r\n</div>",
    data: function () {
        return {
            seat:null,
            delegate:[],
            selectDelegate:""
        }
    },
    computed:{
        "selectText": function () {
            if(this.seat){
                return (this.seat.row+1) +"排" +(this.seat.col+1)+"列  "+this.seat.sn+"座";
            }else{
                return "请选择";
            }
        }
    },
    methods:{
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
                        self._orderSeat(self.seat.ticket);
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
            Layer.closeAll();
            Layer.open({
                content:"订票中",
                type:2,
                shadeClose:false
            });
            var self = this;

            Service.orderSeat(self.selectDelegate,self.mine._id,id, function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.seat = null;
                    $(".bus-body").find("td").removeClass("icon-seat-select");
                    Layer.open({
                        content:"恭喜您，订票成功！现在要返回订票列表吗？",
                        shadeClose:false,
                        btn:["确定","取消"],
                        yes: function () {
                            Layer.closeAll();
                            var router = new Router();
                            return router.setRoute("order");
                        },no: function () {
                            Layer.closeAll();
                            self.reloadSeat();
                        }
                    });
                }else{
                    Layer.open({
                        content:rep.Message,
                        shadeClose:false,
                        btn:["确定"],
                        yes: function () {
                            Layer.closeAll();
                            self.reloadSeat();
                        }
                    });
                }
            });
        },
        renderScroll: function () {
            myScroll = new IScroll($(".page-bus > .mui-scroll-wrapper")[0], {
                zoom: true,
                scrollX: true,
                scrollY: true,
                mouseWheel: true,
                wheelAction: 'zoom'
            });
        },
        reloadSeat: function () {
            var self = this;
            Layer.open({
                content:"加载中",
                type:2,
                shadeClose:false
            });
            Service.getBusSeat({bus:self.bus._id,date:self.search.date},function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.bus = rep.Response;
                    var router = new Router();
                    return router.setRoute("bus");
                }
            })
        },
        getDelegate: function () {
            var self = this;
            Service.getUsers({DelegateTo:this.mine._id}, function (rep) {
                if(rep.Code == 0){
                    var list = [{text:self.mine.name,value:self.mine._id}],target = rep.Response.lists;
                    for(var i in target){
                        list.push({
                            text:target[i].name,
                            value:target[i]._id
                        })
                    }
                    self.delegate = list;
                    self.selectDelegate = list[0].value;
                }
            })
        },
        getRels: function () {
            var self = this;
            Service.getUsers({relatedTo:this.mine._id}, function (rep) {
                if(rep.Code == 0){
                  var lst = rep.Response.lists;
                    for(var i=0;i<lst.length;i++){
                        self.delegate.push({text:lst[i].name,value:lst[i]._id});
                    }
                }
            })
        }
    },
    ready: function () {
        if(typeof this.search.date !="string"){
            var router = new Router();
            return router.setRoute("search");
        }
        this.renderScroll();
        this.getDelegate();
        this.getRels();
    }
});

});
