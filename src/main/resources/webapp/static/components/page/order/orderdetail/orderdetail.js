define('components/page/order/orderdetail/orderdetail', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;

module.exports = Vue.extend({
    inherit:true,
    template:"<div class=\"page-orderdetail\">\r\n    <header class=\"mui-bar-nav mui-bar\">\r\n        <h5 class=\"mui-title\">\r\n            车辆验票\r\n        </h5>\r\n        <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" href=\"#order\"></a>\r\n    </header>\r\n    <div class=\"mui-content\">\r\n\r\n        <div class=\"mui-card twinkling\" style=\"padding: 8px;\">\r\n            <h5 style=\"text-align: right;padding-top: 5px;\">\r\n               <span style=\"font-size: 16px;font-weight: bold;color: #000;float: left\">{{ticket.user.name}}</span>\r\n                <span style=\"color: #666;\">{{ticket.user.department}}{{ticket.user.unit}}</span>\r\n            </h5>\r\n            <div style=\"text-align: center;color: red;font-weight: bold;font-size: 25px;margin: 5px 0;font-weight: bold;\">\r\n                {{ticket.bus.name}} {{ticket.seat.sn}}号座\r\n            </div>\r\n            <div >\r\n                <span>   {{ticket.bus.line}}</span><span style=\"float: right\">{{ticket.bus.goff}} 开</span>\r\n            </div>\r\n            <div style=\"text-align: right\">\r\n                <h5>{{ticket.date}} </h5>\r\n            </div>\r\n            <h5 style=\"text-align: center\">\r\n\r\n            </h5>\r\n\r\n        </div>\r\n\r\n    </div>\r\n</div>",
    data:function(){
        return {
            ticket:{
                user:{},
                bus:{},
                seat:{}
            }
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
                    var lst =  rep.Response;
                    for(var i =0;i<lst.length;i++){
                        if(lst[i]._id = self.detailTicket){
                            return self.ticket = lst[i];
                        }
                    }

                }
            })
        },
        reload: function () {
            this.render();
        }
    },
    compiled: function () {
        this.render();
    }
});

});
