define('components/page/approve/approvemore/approvemore', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var nav = require("navbar/navbar.js");
var Router = require('component_modules/director').Router;
var Layer = require('component_modules/layer.m').layer;
var Service =require("main/service.js");

module.exports = Vue.extend({
    inherit:true,
    template:"\r\n<div class=\"page-search-result\" >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" href=\"#approve\"></a>\r\n        <h5 class=\"mui-title\">\r\n            合作单位人员审批\r\n        </h5>\r\n\r\n    </header>\r\n\r\n\r\n\r\n\r\n    <div class=\"mui-content\" >\r\n\r\n        <ul class=\"mui-table-view\">\r\n            <li class=\"mui-table-view-cell mui-media\" >\r\n                <div class=\"mui-media-body\" >\r\n                    <table class=\"table\">\r\n\r\n                        <tr >\r\n                            <td>姓名：</td>\r\n                            <td>{{user.name}}</td>\r\n\r\n                        </tr>\r\n                        <tr >\r\n                            <td>电话：</td>\r\n                            <td>{{user.mobile}}</td>\r\n\r\n                        </tr>\r\n                        <tr >\r\n                            <td>身份证号：</td>\r\n                            <td>{{user.mobile}}</td>\r\n\r\n                        </tr>\r\n                        <tr >\r\n                            <td>单位：</td>\r\n                            <td>{{user.company}}</td>\r\n\r\n                        </tr>\r\n                        <tr >\r\n                            <td> 原因：</td>\r\n                            <td >{{user.yy}}</td>\r\n\r\n                        </tr>\r\n                    </table>\r\n                </div>\r\n\r\n            </li>\r\n        </ul>\r\n        <div style=\"height:50px;\"></div>\r\n    </div>\r\n    <button class=\"mui-btn mui-btn-block\"  v-on=\"click:isApprove(user._id)\" >\r\n        <span class=\"mui-icon mui-icon-search\"></span>同意\r\n    </button>\r\n    <button class=\"mui-btn mui-btn-block\"  v-on=\"click:unApprove(user._id)\" >\r\n        <span class=\"mui-icon mui-icon-search\"></span>不同意\r\n    </button>\r\n\r\n\r\n</div>",
    data: function () {
        return {



        }
    },
    methods:{

        isApprove: function (id) {
     var self = this;
            Layer.open({
                content:"确定同意审批？",
                btn:["确定","取消"],
                shadeClose:false,
                yes: function () {
                    Layer.closeAll();
                    Service.Approveuser({_id:id},function (rep) {
                        Service.findUsers(function (rep) {
                            if(rep.Code == 0){
                                self.users = rep.Response;
                            }

                        });
                        var router = new Router();
                        return router.setRoute("approve");
                    });
                },no: function () {
                    Layer.closeAll();
                }
            });

 },
        unApprove: function (id) {
            var self = this;
            Layer.open({
                content:"确定拒绝审批？",
                btn:["确定","取消"],
                shadeClose:false,
                yes: function () {
                    Layer.closeAll();
                    Service.unApproveuser({_id:id},function (rep) {
                        Service.findUsers(function (rep) {
                            if(rep.Code == 0){
                                self.users = rep.Response;
                            }

                        });
                        var router = new Router();
                        return router.setRoute("approve");
                    });
                },no: function () {
                    Layer.closeAll();
                }
            });



        }
    },
    ready: function () {

    }
});

});
