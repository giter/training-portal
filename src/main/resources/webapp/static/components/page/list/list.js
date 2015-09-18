define('components/page/list/list', function(require, exports, module) {

/**
 * Created by jack on 2015/8/23.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");

module.exports = Vue.extend({
    template:"<div class=\"list-page\" >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <h5 class=\"mui-title\">\r\n            车辆选择\r\n        </h5>\r\n    </header>\r\n    <ul class=\"list\">\r\n        <li class=\"mui-col-xs-6\" v-repeat=\"l in list\">\r\n            <a href=\"#/car/{{l.id}}\">\r\n                <img  src=\"{{l.img}}\">\r\n                <div class=\"title\">{{l.name}}</div>\r\n                <div class=\"status\">{{l.number}}/{{l.total}}</div>\r\n                <h5><span class=\"target\">{{l.destination}}</span><span class=\"time\">{{l.goff}}</span></h5>\r\n            </a>\r\n        </li>\r\n\r\n    </ul>\r\n</div>\r\n",
    data: function () {
        return {
            list:""
        }
    },
    ready: function () {
        var self = this;
        Service.getCarList(function (rep) {
            if(rep.Code == 0){
                self.$data.list = rep.Response;
            }
        })
    }
});



});
