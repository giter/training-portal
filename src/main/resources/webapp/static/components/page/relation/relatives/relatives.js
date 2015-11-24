define('components/page/relation/relatives/relatives', function(require, exports, module) {

/**
 * Created by jack on 2015/9/10.
 */

var Vue = require("component_modules/vue");
var Layer = require("component_modules/layer.m").layer;
var Service = require("main/service.js");
var Router = require('component_modules/director').Router;
var Check = require("main/check.js");

module.exports =   Vue.extend({
    template:"<div class=\"page-relatives\">\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" v-on=\"click:backTo('relation')\"></a>\r\n        <h5 class=\"mui-title\">\r\n            添加非公司人员\r\n        </h5>\r\n    </header>\r\n    <div class=\"mui-content\">\r\n        <div class=\"mui-card\">\r\n            <div class=\"mui-input-group\">\r\n                <div class=\"mui-input-row\">\r\n                    <label>姓名</label>\r\n                    <input type=\"text\" class=\"mui-input-clear\" v-model=\"rel.name\" placeholder=\"请输入姓名\">\r\n                </div>\r\n            </div>\r\n            <div class=\"mui-input-group\">\r\n                <div class=\"mui-input-row\">\r\n                    <label>身份证（后四位）</label>\r\n                    <input type=\"text\" class=\"mui-input-clear\" v-model=\"rel.sn\" placeholder=\"请输入身份证\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <h5 class=\"mui-content-padded\">性别</h5>\r\n        <div class=\"mui-card\">\r\n            <form class=\"mui-input-group\">\r\n                <div class=\"mui-input-row mui-radio\">\r\n                    <label>男</label>\r\n                    <input name=\"style\" type=\"radio\" v-model=\"rel.sex\" checked value=\"男\">\r\n                </div>\r\n                <div class=\"mui-input-row mui-radio\">\r\n                    <label>女</label>\r\n                    <input name=\"style\" type=\"radio\" v-model=\"rel.sex\" value=\"女\">\r\n                </div>\r\n            </form>\r\n        </div>\r\n        <div class=\"mui-card\" style=\"margin-top: 10px;\">\r\n            <div class=\"mui-input-group\">\r\n                <div class=\"mui-input-row\">\r\n                    <label>年龄</label>\r\n                    <input type=\"text\" class=\"mui-input-clear\" v-model=\"rel.age\" placeholder=\"请输入年龄\" >\r\n                </div>\r\n            </div>\r\n            <div class=\"mui-input-group\">\r\n                <div class=\"mui-input-row\">\r\n                    <label>手机</label>\r\n                    <input type=\"text\" class=\"mui-input-clear\" v-model=\"rel.tel\" placeholder=\"请输入手机号\">\r\n                </div>\r\n            </div>\r\n            <div class=\"mui-input-group\">\r\n                <div class=\"mui-input-row\">\r\n                    <label>关系</label>\r\n                    <input type=\"text\" class=\"mui-input-clear\" v-model=\"rel.relation\" placeholder=\"请输入关系\">\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n        <h5 class=\"mui-content-padded mui-text-center\">如为合作单位请填写单位名称</h5>\r\n        <div style=\"padding: 15px;\">\r\n            <a  style=\"padding: 5px\" class=\"mui-btn mui-btn-primary mui-btn-block\" v-on=\"click:addRel\">\r\n                <span class=\"mui-icon mui-icon-plus\"></span>\r\n                添加</a>\r\n        </div>\r\n    </div>\r\n</div>",
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
            if(rel.sn.length != 4){
                return "请输入身份证后四位！"
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

});
