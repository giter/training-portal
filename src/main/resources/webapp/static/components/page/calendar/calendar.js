define('components/page/calendar/calendar', function(require, exports, module) {

/**
 * Created by jack on 2015/9/10.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");
var Router = require('component_modules/director').Router;

module.exports =   Vue.extend({
    inherit:true,
    template:"<div class=\"page-calendar\" v-transition=\"slideInRight\" >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\"mui-icon mui-icon-arrowleft mui-pull-left\" href=\"#search\"></a>\r\n        <h5 class=\"mui-title\">\r\n            日期选择\r\n        </h5>\r\n    </header>\r\n    <div class=\"mui-content\">\r\n        <h5 class=\"mui-content-padded\">\r\n            可以预订未来7天坐票\r\n        </h5>\r\n        <ul class=\"mui-table-view\">\r\n            <li v-repeat=\"c in calendars\" class=\"mui-table-view-cell mui-media\">\r\n                <a class=\"mui-navigate-right\" v-on=\"click:onSelect(c)\">\r\n                    <div class=\"mui-media-body\" >\r\n                        {{c.name}}\r\n                        <p>{{c.week}}  {{c.other}}</p>\r\n                    </div>\r\n                </a>\r\n            </li>\r\n\r\n        </ul>\r\n    </div>\r\n</div>",
    data: function () {
        return {
            calendars:[]
        }
    },
    ready: function () {
        var self = this;
        Service.getCalendar(function (rep) {
            if(rep.Code == 0){
                self.calendars = rep.Response;

            }
        })
    },
    methods:{
        onSelect: function (r) {
            this.search.time = r.name +" "+ r.week;
            var router = new Router();
            router.setRoute("#search");
        }
    }
});

});
