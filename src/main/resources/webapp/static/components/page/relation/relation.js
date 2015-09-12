define('components/page/relation/relation', function(require, exports, module) {

/**
 * Created by jack on 2015/9/10.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");

module.exports =   Vue.extend({
    template:"<div class=\"page-calendar\" v-transition=\"slideInRight\" >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\"mui-icon mui-icon-arrowleft mui-pull-left\" href=\"#config\"></a>\r\n        <h5 class=\"mui-title\">\r\n            联系人\r\n        </h5>\r\n        <a class=\"mui-pull-right mui-btn-link\" >添加</a>\r\n    </header>\r\n    <div class=\"mui-content\">\r\n        <h5 class=\"mui-content-padded\">\r\n            每个用户最多可以绑定三个联系人\r\n        </h5>\r\n        <ul class=\"mui-table-view\">\r\n            <li class=\"mui-table-view-cell mui-media\" v-repeat=\"u in users\">\r\n               <a class=\"mui-navigate-right\">\r\n                   <div class=\"mui-media-body\" >\r\n                       {{u.name}}\r\n                       <p>{{u.mail}}</p>\r\n                   </div>\r\n               </a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>",
    data: function () {
        return {
            users:[]
        }
    },
    compiled: function () {
        var self = this;
        Service.getUsers(function (rep) {
            if(rep.Code == 0){
                self.users = rep.Response;
            }
        })
    }
});

});
