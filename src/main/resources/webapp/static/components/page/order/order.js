define('components/page/order/order', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var nav = require("navbar/navbar.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m").layer;

module.exports = Vue.extend({
    inherit:true,
    template:"<div class=\"page-order\">\r\n    <div class=\"mui-control-content mui-active\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                已选列表\r\n            </h5>\r\n            <a class=\"mui-icon mui-icon-refresh mui-pull-right\" v-on=\"click:reload\"></a>\r\n        </header>\r\n        <div class=\"mui-content mui-scroll-wrapper\">\r\n            <div class=\"mui-scroll\">\r\n                <ul class=\"mui-table-view mui-list\">\r\n                    <div v-repeat=\"tickets in order\">\r\n                        <li class=\"mui-table-view-divider\">{{tickets.date}}</li>\r\n                        <li class=\"mui-table-view-cell mui-media\" v-repeat=\"o in tickets.data\">\r\n                            <a>\r\n                                <img style=\"width: 42px;\" class=\"mui-media-object mui-pull-left\" v-attr=\"src:o.bus.src||'/admin/static/images/128.png'\">\r\n                                <div class=\"mui-media-body\">\r\n                                    <h4 style=\"color: blue;font-weight: bold;font-size: 14px;\"> {{o.bus.line}}</h4>\r\n                                    <p class=\"mui-ellipsis\">{{o.user.name}}<span v-show=\"o.source\" class=\"mui-badge mui-badge-warning\">代</span> {{o.bus.name}} {{o.seat.sn}}座 {{o.bus.goff}} 出发</p>\r\n                                </div>\r\n                                <button v-show=\"canRefund(o)\" class=\"mui-btn mui-btn-negative mui-btn-outlined\" v-on=\"click:unSub(o)\">\r\n                                    退订\r\n                                </button>\r\n\r\n                                <span v-show=\"!canRefund(o)\" class=\"mui-badge\">已过期</span>\r\n                            </a>\r\n                        </li>\r\n                    </div>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <c-nav view=\"order\">\r\n    </c-nav>\r\n</div>",
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

            return diff<this.beginTime;
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

});
