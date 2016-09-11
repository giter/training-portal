/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;
var IScroll = require("component_modules/iscroll-zoom.js");
var Router = require("component_modules/director.js").Router;

module.exports = Vue.extend({
    inherit:true,
    template:__inline("bus.html"),
    data: function () {
        return {
            seat:null,
            delegate:[],
            selectDelegate:{}
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
        getSeatUserName: function (r,c) {
            var seat = this.getSeatId(r,c);
            if(seat){
                var seat = JSON.parse(seat);
                if(seat.entity.user){
                    return seat.entity.user.name;
                }
            }
        },
        "selectSeat": function (e,r,c) {
            var $t = $(e.$el);
            if($t.hasClass("icon-seat-void")){
                $(".bus-body").find("td").removeClass("icon-seat-select");
                $t.addClass("icon-seat-select");
                this.seat = $t.data("id");
                var user = this.selectDelegate;
                //

                //if(!user.ticket){
                //    this.orderSeat(this.seat.ticket, function (ticket) {
                //        user.ticket = ticket;
                //    });
                //}else{
                //    this._unSubTicket(user.ticket._id, function () {
                //        self.orderSeat(self.seat.ticket, function (ticket) {
                //            user.ticket = ticket;
                //        });
                //    });
                //}
                var self = this;
                this._unSubTicket(function () {
                    self.orderSeat(self.seat.ticket, function (ticket) {
                        user.ticket = ticket;
                    });
                })

            }
        },
        orderSeat: function (id,callback) {
            Layer.closeAll();
            Layer.open({
                content:"订票中",
                type:2,
                shadeClose:false
            });
            var self = this;
            Service.orderSeat(self.selectDelegate.value,self.mine._id,id, function (rep) {
                Layer.closeAll();
                $(".bus-body").find("td").removeClass("icon-seat-select");
                self.seat = null;
                if(rep.Code == 0){
                    callback?callback.call(this,rep.Response):null;
                    self.reloadSeat();
                }else{
                    alert(rep.Message);
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
        backTo: function (url) {
            this.$parent.$broadcast("backReload","search");
            var router = new Router();
            router.setRoute(url);
        },
        getDelegate: function () {
            var self = this;
            Service.getUsers({delegateTo:this.mine._id},function (rep) {
                if(rep.Code == 0){
                    var list = [{text:self.mine.name,value:self.mine._id,ticket:""}],target = rep.Response.lists;
                    for(var i in target){
                        list.push({
                            text:target[i].name,
                            value:target[i]._id,
                            ticket:""
                        })
                    }
                    self.delegate = list;
                    self.selectDelegate = list[0];

                    self.getRels();
                }
            })
        },
        getRels: function () {
            var self = this;
            Service.getUsers({relatedTo:this.mine._id}, function (rep) {
                if(rep.Code == 0){
                    var lst = rep.Response.lists;
                    for(var i=0;i<lst.length;i++){
                        self.delegate.push({text:lst[i].name,value:lst[i]._id,ticket:""});
                    }
                }
            })
        },
        _unSubTicket: function (callback) {
            var self = this,seats = this.bus.seats;
            var tid = null;
            for(var i= 0;i<seats.length;i++){
                if(seats[i].entity.user){
                    if(seats[i].entity.user._id == this.selectDelegate.value){
                        tid = seats[i].ticket;
                    }
                }
            }

            if(tid){
                Service.unSubTicket(tid, function () {
                    callback.call(this);
                });
            }else{
                callback.call(this);
            }
        },
        selectUser: function (u) {
            this.selectDelegate = u;
        },
        getBus: function (callback) {
            var self = this;
            Layer.open({
                content:"加载中",
                type:2,
                shadeClose:false,
                shade:"background-color:rgba(0,0,0,0)"
            });
            Service.getBusSeat({bus:this.busQuery.id,date:this.busQuery.date},function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.bus = rep.Response;
                    callback.call(this);
                }
            })
        }
    },
    ready: function () {
        if(typeof this.search.date !="string"){
            var router = new Router();
            router.setRoute("search");
            window.location.reload();
        }

        var self = this;

        this.getBus(
            function () {
                Vue.nextTick(function () {
                    self.renderScroll();
                    self.getDelegate();
                })
            }
        );


        this.$on("busQuery", function () {
            this.getBus(
                function () {
                    Vue.nextTick(function () {
                        self.renderScroll();
                        self.getDelegate();
                    })
                }
            );
        })


    }
});