/**
 * Created by jack on 2015/9/10.
 */

var Vue = require("component_modules/vue.js");
var Layer = require("component_modules/layer.m.js").layer;
var Service = require("main/service.js");
var Router = require('component_modules/director').Router;

module.exports =   Vue.extend({
    template:__inline("query.html"),
    data: function () {
        return {
            list:[],
            name:""
        }
    },
    methods:{
        query: function (name) {
            var self = this;
            self.list = [];
            Service.getUsers({name:name}, function (rep) {
                self.list = rep.Response.lists;
            })
        },
        backTo: function (url) {
            this.$parent.$broadcast("backReload","relation");
            var router = new Router();
            router.setRoute(url);
        },
        addDelegation: function (id) {
            Layer.open({
                content: "提交中",
                type: 2,
                shadeClose: false,
                shade: false
            });
            var self = this;
            Service.getDelegation(function (rep) {
                if(rep.Response.length < 2){
                    self._add(id);
                }else{
                    Layer.open({
                        content: "最多可以添加四个委托！",
                        shadeClose: false,
                        btn:["确定"],
                        yes: function () {
                            Layer.closeAll();
                        }
                    });
                }
            });


        },
        _add: function (id) {
            Service.addForDelegation(id, function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    Layer.open({
                        content: "已成功添加其为您的代订座人！",
                        shadeClose: false,
                        btn:["确定"],
                        yes: function () {
                            Layer.closeAll();
                        }
                    });
                }else{
                    Layer.open({
                        content: rep.Message,
                        shadeClose: false,
                        btn:["确定"],
                        yes: function () {
                            Layer.closeAll();
                        }
                    });
                }

            });
        }
    },
    watch:{
        "name": function (v) {
            this.query(v);
        }
    },
    ready: function () {
        //mui(".page-query input").input();
    }
});