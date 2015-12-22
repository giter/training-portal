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
    template:__inline("approve.html"),
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