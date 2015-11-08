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
    template:"<div class=\"page-order\">\r\n    <div class=\"mui-control-content mui-active\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                已选列表\r\n            </h5>\r\n            <a class=\"mui-icon mui-icon-refresh mui-pull-right\" v-on=\"click:reload\"></a>\r\n        </header>\r\n        <div class=\"mui-content mui-scroll-wrapper\">\r\n            <div class=\"mui-scroll\">\r\n                <h5 style=\"padding-left: 15px;\">订单</h5>\r\n                <ul class=\"mui-table-view mui-list\">\r\n                    <li class=\"mui-table-view-cell mui-media\" v-repeat=\"o in order\">\r\n                       <a href=\"#order/{{o._id}}\">\r\n                           <img style=\"width: 42px;\" class=\"mui-media-object mui-pull-left\" v-attr=\"src:o.bus.src||'/admin/static/images/128.png'\">\r\n                           <div class=\"mui-media-body\">\r\n                               {{o.bus.sn}} {{o.bus.destination}}\r\n                               <p class=\"mui-ellipsis\">{{o.date}} {{o.bus.goff}} {{o.seat.sn}}号座位</p>\r\n                           </div>\r\n                           <button class=\"mui-btn mui-btn-negative mui-btn-outlined\" v-on=\"click:unSub(o)\">\r\n                               退订\r\n                           </button>\r\n                       </a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <c-nav view=\"order\">\r\n    </c-nav>\r\n</div>",
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
            Service.getMyTicket(function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.order = rep.Response;
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
        }
    },
    compiled: function () {
        this.render();
    }
});

});
