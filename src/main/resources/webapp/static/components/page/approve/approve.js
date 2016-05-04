define('components/page/approve/approve', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var Router = require('component_modules/director').Router;
var Layer = require('component_modules/layer.m.js').layer;
var Service =require("main/service.js");

module.exports = Vue.extend({
    inherit:true,
    template:"\r\n<div class=\"page-search-result\" >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" href=\"#config\"></a>\r\n        <h5 class=\"mui-title\">\r\n            合作单位人员审批\r\n        </h5>\r\n        <a class=\"mui-icon mui-icon-refresh mui-pull-right\" v-on=\"click:getApprove\"></a>\r\n    </header>\r\n\r\n    <div class=\"mui-content\" v-show=\"users.length>0\">\r\n\r\n        <ul class=\"mui-table-view mui-list\" style=\"margin-top: 20px;\">\r\n\r\n            <li class=\"mui-table-view-cell mui-media\" v-repeat=\"r in users\">\r\n                <a class=\"mui-navigate-right\" v-on=\"click:getApproveuser(r)\">\r\n                    <div class=\"mui-media-body\">\r\n                        {{r.name}}\r\n                        <p>单位：{{r.company}}\r\n                           </p>\r\n                    </div>\r\n                </a>\r\n            </li>\r\n\r\n        </ul>\r\n\r\n        <!--<ul class=\"mui-table-view\">-->\r\n            <!--<li class=\"mui-table-view-cell mui-media\" v-repeat=\"r in users\">-->\r\n                    <!--<div class=\"mui-media-body\" v-on=\"click:getApproveuser(r)\">-->\r\n                        <!--<h4 class=\"mui-ellipsis-2\" style=\"font-weight: bold;font-size: 14px;color: #007aff;\"> {{r.name}}</h4>-->\r\n                        <!--<p>-->\r\n                            <!--单位：{{r.company}}-->\r\n                            <!--电话：{{r.mobile}}-->\r\n                        <!--</p>-->\r\n                    <!--</div>-->\r\n            <!--</li>-->\r\n        <!--</ul>-->\r\n        <div style=\"height:50px;\"></div>\r\n    </div>\r\n\r\n\r\n\r\n\r\n</div>",
    data: function () {
        return {


        }
    },
    methods:{
        getApprove: function () {
            var self = this;
            Layer.open({
                content:"确定同意审批？",
                btn:["确定","取消"],
                shadeClose:false,
                yes: function () {
                    Layer.closeAll();
                    Layer.open({
                        content: "加载中",
                        type: 2,
                        shadeClose: false,
                        shade: false
                    });

                    Service.approveUsers(function (rep) {

                    });

                    Service.findUsers(function (rep) {
                        if(rep.Code == 0){
                            self.users = rep.Response;
                        }
                        Layer.closeAll();

                    });
                },no: function () {
                    Layer.closeAll();
                }
            });


        },

        getApproveuser: function (user) {



                        this.user = user;
                        var router = new Router();
                        return router.setRoute("approve/approvemore");




        }
    },
    ready: function () {

        var self = this;
        Service.findUsers(function (rep) {
            self.users = rep.Response
        });
    }

});

});
