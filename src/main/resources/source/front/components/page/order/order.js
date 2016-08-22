/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;

module.exports = Vue.extend({
    inherit:true,
    template:__inline("order.html"),
    data:function(){
        return {
            order:[]
        }
    },
    methods:{
        render: function () {
            var self = this;
            Layer.open({
                content:"加载中",
                type:2,
                shadeClose:false,
                shade:"background-color:rgba(0,0,0,0)"
            });
            this._getDateRange();

            Service.getMyTicket(self._getDateRange(),function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.order =self._transData(rep.Response);
                    mui(".page-order .mui-scroll-wrapper").scroll();
                }
            })
        },
        reload: function () {
            this.render();
        },
        getSourceName: function (o) {
            if(o){
                return o.name;
            }
        },
        unSub: function (o) {
            var self = this;
            Layer.open({
                content:"确定退订"+ o.date+"的"+ o.seat.sn+"号座位？",
                btn:["确定","取消"],
                shadeClose:false,
                yes: function () {
                    Layer.closeAll();
                    self._unSubTicket(o._id);
                },no: function () {
                    Layer.closeAll();
                }
            });
        },
        _unSubTicket: function (id) {
            var self = this;
            Service.unSubTicket(id, function () {
                self.reload();
            });
        },
        _transData: function (data) {
            if(data.length>0){
                var target = {};
                for(var i in data){
                    target[data[i].date] = [];
                }

                for(var i in data){
                    for(var d in target){
                        if(data[i].date == d){
                            target[d].push(data[i]);
                        }
                    }
                }
                var n = [];
                for(var i in target){
                    n.push({date:i,data:target[i]});
                }
                return n.reverse();
            }
            return [];
        },
        canRefund: function (o) {
            var now = Date.parse(new Date())/1000,list = [];
            var time = Date.parse(new Date(o.date.replace(/-/g,"/")+" "+o.bus.goff))/1000;
            var diff = now - time;

            return diff<this.beginTime*-1;
        },
        _getDateRange: function () {
            var tran = function (d) {
                if(d < 10 ){
                    return "0"+String(d);
                }
                return String(d);
            };
            var date = new Date();
            var begin = String(date.getFullYear())+"-"+tran(date.getMonth()+1)+"-"+tran(date.getDate());
            var edate = new Date(date.valueOf()+ 6*24*60*60*1000);
            var end = String(edate.getFullYear())+"-"+tran(edate.getMonth()+1)+"-"+tran(edate.getDate());

            return {begin:begin,end:end};

        }
    },
    compiled: function () {
        this.render();
        var self = this;
        this.$on("ReloadOrder", function () {
            self.reload();
        })
    }
});