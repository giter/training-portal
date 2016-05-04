/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var Router = require('component_modules/director.js').Router;
var Layer = require('component_modules/layer.m.js').layer;
var Service =require("main/service.js");

module.exports = Vue.extend({
    inherit:true,
    template:__inline("approvemore.html"),
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