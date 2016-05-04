define('components/page/calendar/calendar', function(require, exports, module) {

/**
 * Created by jack on 2015/9/10.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Router = require('component_modules/director').Router;
var Layer = require("component_modules/layer.m.js").layer;

module.exports = Vue.extend({
    inherit:true,
    template:"<div class=\"page-calendar\"  >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\" mui-icon mui-icon-left-nav mui-pull-left\" v-on=\"tap:toRouter('search')\"></a>\r\n        <h5 class=\"mui-title\">\r\n            日期选择\r\n        </h5>\r\n    </header>\r\n    <div class=\"mui-content\">\r\n        <h5 class=\"mui-content-padded\">\r\n            可以预订未来7天坐票\r\n        </h5>\r\n        <ul class=\"mui-table-view\">\r\n            <li v-repeat=\"c in calendars\" class=\"mui-table-view-cell mui-media\">\r\n                <a class=\"mui-navigate-right\" v-on=\"click:onSelect($index)\">\r\n                    <div class=\"mui-media-body\" >\r\n                        {{c.name}}\r\n                        <p>{{c.week}}  {{c.other}}</p>\r\n                    </div>\r\n                </a>\r\n            </li>\r\n\r\n        </ul>\r\n    </div>\r\n</div>",
    ready: function () {
        var self = this;
        Layer.open({
            content:"加载中",
            type:2,
            shadeClose:false,
            shade:"background-color:rgba(0,0,0,0)"
        });
        Service.getCalendar(function (rep) {
            Layer.closeAll();
            if(rep.Code == 0){
                self.calendars = rep.Response;
            }
        })
    },
    methods:{
        onSelect: function (r) {
            this.search.date = r;
            var router = new Router();
            router.setRoute("search");
        },
        toRouter: function (url) {
            var router = new Router();
            router.setRoute(url);
        }
    }
});

});
