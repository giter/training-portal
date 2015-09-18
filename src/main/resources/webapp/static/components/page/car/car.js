define('components/page/car/car', function(require, exports, module) {

/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");

module.exports = Vue.extend({
    template:"<div class=\"page-car\"  v-transition=\"slideInRight\">\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <h5 class=\"mui-title\">{{name}}({{destination}})\r\n        </h5>\r\n        <a class=\"mui-icon mui-icon-arrowleft mui-pull-left\" href=\"#/search/result\"></a>\r\n    </header>\r\n    <div class=\"mui-content\">\r\n        <div class=\"car-header\">\r\n\r\n        </div>\r\n        <table class=\"car-seat\">\r\n            <tr v-repeat=\"row in seats\">\r\n                <td v-repeat=\"s in row.col\">\r\n                    <a v-class=\"void-seat:s.st == 1,order-seat:s.st==2\">{{s.sn}}</a>\r\n                </td>\r\n\r\n            </tr>\r\n        </table>\r\n    </div>\r\n    <nav class=\"mui-bar mui-bar-footer\">\r\n        <button class=\"mui-btn mui-btn-block mui-btn-primary\">\r\n            <span class=\"mui-icon mui-icon-checkmarkempty\"></span>\r\n            预订\r\n        </button>\r\n    </nav>\r\n</div>",
    data: function () {
        return {
            destination: "海口",
            id: 1,
            name: "琼A888888",
            seats: []
        }
    },
    ready: function () {
        $(".page-bus > .mui-content").height(document.documentElement.clientHeight -88).css("overflow-y","auto");
        var self = this;
        Service.getCarSeat(1,function (rep) {
            if(rep.Code == 0){
                self.$data.seats = rep.Response.seats;
            }
        })
    }
});

});
