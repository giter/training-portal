/**
 * Created by jack on 2015/9/10.
 */

var Vue = require("component_modules/vue.js");
var Layer = require("component_modules/layer.m.js").layer;
var Service = require("main/service.js");
var Router = require('component_modules/director').Router;
var Check = require("main/check.js");

module.exports =   Vue.extend({
    template:__inline("relatives.html"),
    data: function () {
        return {
            rel:{
                name:"",
                sn:"",
                sex:"",
                age:"",
                relation:"",
                tel:""
            }
        }
    },
    watch:{
        "rel.sn": function () {
            if(Check.check(this.rel.sn,"card")){
                var a = this.rel.sn.substr(6,4);
                var b = (new Date()).getFullYear();
                this.rel.age = (b-a);
            }
        }
    },
    methods:{
        addRel: function () {
            if(this.valid()=="OK"){

                Layer.open({
                    content:"提交中",
                    type:2,
                    shadeClose:false,
                    shade: false
                });
                Service.addRel(JSON.stringify(this.rel), function (rep) {
                    Layer.closeAll();
                    if(rep.Code == 0){
                        Layer.open({
                            content:"关联成功！",
                            shadeClose:false,
                            btn:["确定"],
                            yes: function () {
                                Layer.closeAll();
                                var router = new Router();
                                router.setRoute("relation");
                            }
                        })
                    }else{
                        Layer.open({
                            content:rep.Message,
                            btn:["确定"],
                            yes: function () {
                                Layer.closeAll();
                            }
                        })
                    }
                })
            }else{
                Layer.open({
                    content:this.valid(),
                    btn:["确定"],
                    yes: function () {
                        Layer.closeAll();
                    }
                })
            }
        },
        valid: function () {
            var rel = this.rel;
            if(!rel.name){
                return "姓名不能为空！"
            }
            if(!rel.sn){
                return "身份证不能为空！"
            }
            if(!Check.check(rel.sn,"card")){
                return "身份证格式错误！"
            }
            if(!rel.age){
                return "年龄不能为空！"
            }
            if(!rel.relation){
                return "关系不能为空！"
            }
            if(!Check.check(rel.tel,"mobile")){
                return "请填写正确手机号"
            }

            return "OK"
        },
        backTo: function (url) {
            this.$parent.$broadcast("backReload","relation");
            var router = new Router();
            router.setRoute(url);
        }
    },
    compiled: function () {

    },
    ready: function () {
        mui("input").input();
    }
});