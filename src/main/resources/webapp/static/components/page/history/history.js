define('components/page/history/history', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m").layer;

module.exports = Vue.extend({
    inherit:true,
    template:"<div class=\"page-history\">\r\n    <header class=\"mui-bar-nav mui-bar\">\r\n        <h5 class=\"mui-title\">\r\n            历史订单\r\n        </h5>\r\n        <a class=\"mui-icon mui-icon-arrowleft\" href=\"#config\"></a>\r\n    </header>\r\n    <div class=\"mui-content \" style=\"height: {{height}}px;overflow-y:auto\">\r\n        <div class=\"mui-card\">\r\n            <div class=\"mui-input-group\">\r\n                <div class=\"mui-input-row\">\r\n                    <label>查询日期</label>\r\n                    <input type=\"button\" v-on=\"click:showDatePicker\" v-attr=\"value:date||'请选择时间'\" style=\"height: 40px\" >\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <ul class=\"mui-table-view\" v-show=\"order.length>0\" style=\"margin-top: 10px;\">\r\n            <li class=\"mui-table-view-cell mui-media\" v-repeat=\"o in order\">\r\n                <a>\r\n                    <img style=\"width: 42px;\" class=\"mui-media-object mui-pull-left\" v-attr=\"src:o.bus.src||'/admin/static/images/128.png'\">\r\n                    <div class=\"mui-media-body\">\r\n                        <h4 class=\"mui-ellipsis-2\"  style=\"color: blue;font-weight: bold;font-size: 14px;\"> {{o.bus.line}}</h4>\r\n                        <p class=\"mui-ellipsis-2\" style=\"padding-right: 55px;\">{{o.user.name}}<span v-show=\"o.source\" class=\"mui-badge mui-badge-warning\">{{getSourceName(o.source)}} 代</span> {{o.bus.name}} {{o.seat.sn}}座 {{o.bus.goff}} 出发</p>\r\n                    </div>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n        <h5 v-show=\"date!=''&&order.length==0\" style=\"margin-top: 10px;text-align: center\" class=\"text-center\" >对不起，没有查询到您的相关订票记录。</h5>\r\n    </div>\r\n</div>\r\n\r\n",
    data:function(){
        return {
            date:"",
            order:[],
            height:document.documentElement.clientHeight-44
        }
    },
    methods:{
        render: function () {

        },
        showDatePicker: function () {
            var self = this;
            this.picker.show(function (d) {
                self.date = d.text;
            });
        },
        getSourceName: function (o) {
            if(o){
                return o.name;
            }
        },
        getTicket: function () {
            Layer.open({
                content: "查询中",
                type: 2,
                shadeClose: false,
                shade: false
            });
            var self = this;
            Service.getMyTicket({date:this.date,old:true},function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.order = rep.Response;
                }
            })
        }
    },
    watch:{
        "date": function () {
            this.getTicket();
        }
    },
    ready: function () {
        this.picker = new mui.DtPicker({"type":"date","beginYear":2015});
    }
});

});
