define('nav/nav', function(require, exports, module) {

/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue");

module.exports = Vue.component("c-nav",{
    template:"\r\n<div class=\"lefter\">\r\n    <div class=\"logo\"><img style=\"height: 40px\" src=\"/admin/static/images/logo.png\" alt=\"后台管理系统\" /></div>\r\n</div>\r\n<div class=\"righter nav-navicon\" id=\"admin-nav\">\r\n    <div class=\"mainer\">\r\n        <div class=\"admin-navbar\">\r\n            <span class=\"float-right\">\r\n                <a class=\"button button-little bg-yellow\" href=\"login.html\">注销登录</a>\r\n            </span>\r\n            <ul class=\"nav nav-inline admin-nav\">\r\n                <li v-class=\"active:f.key == amenu\"  v-repeat=\"f in func\" >\r\n                    <a href=\"#/{{f.key}}\" class=\"{{f.class}}\"> {{f.name}}</a>\r\n                    <ul>\r\n                        <li v-class=\"active:c.key==bmenu\" v-repeat=\"c in f.child\"><a href=\"#/{{f.key}}/{{c.key}}\">{{c.name}}</a></li>\r\n                    </ul>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"admin-bread\">\r\n            <span>您好，管理员，欢迎您的光临。</span>\r\n            <ul class=\"bread\">\r\n                <li><a href=\"#/{{bread1.key}}\" class=\"{{bread1.class}}\">&nbsp;{{bread1.name}}</a></li>\r\n                <li class=\"{{bread2.class}}\">&nbsp;\r\n                    <template v-if=\"!bread3.name\">\r\n                            {{bread2.name}}\r\n                    </template>\r\n                    <template v-if=\"bread3.name\">\r\n                        <a href=\"#/{{bread1.key}}/{{bread2.key}}\">\r\n                            {{bread2.name}}\r\n                        </a>\r\n                    </template>\r\n                </li>\r\n                <li  class=\"{{bread3.class}}\">&nbsp;{{bread3.name}}</li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n",
    props:["amenu","bmenu","cmenu","view"],
    data: function () {
        return {
            "func": [
                {
                    name: "首页",
                    key: "home",
                    class: "icon-home",
                    child: [
                        {
                            name: "桌面统计",
                            key: "desk",
                            class: "icon-file"
                        },
                        {
                            name: "人员管理",
                            key: "user",
                            class: "icon-user"
                        },
                        {
                            name: "车辆管理",
                            key: "bus",
                            class: "icon-bus",
                            child: [
                                {
                                    name: "车位管理",
                                    key: "seat",
                                    class:"icon-shopping-cart"
                                }
                            ]
                        },
                        {
                            name: "外围管理",
                            key: "company",
                            class: "icon-user"
                        },
                        {
                            name: "承包商订票",
                            key: "companyOrder",
                            class: "icon-file-text"
                        }
                    ]
                },
                {
                    name: "系统",
                    key: "sys",
                    class: "icon-cog",
                    child: [
                        {
                            name: "登录日志",
                            key: "history",
                            class: "icon-file-text"
                        }
                    ]
                }
            ],
            bread1: {},
            bread2: {},
            bread3:{}
        }
    },
    watch:{

        "amenu": function (e) {
            for(var i in this.func){
                if(this.func[i].key == e){
                    return  this.bread1 = this.func[i];
                }
            }
        },
        "bmenu": function (e) {
            for(var i in this.bread1.child){
                if(this.bread1.child[i].key == e){
                    return this.bread2 = this.bread1.child[i];
                }
            }
        },
        "cmenu": function (e) {
            this.bread3 = {};
            var t =  this.bread2.child;
            if(t && t.length > 0){
                for(var i in t){
                    if(t[i].key == e){
                        return this.bread3 = t[i];
                    }
                }
            }
        }
    },
    methods:{

    }
});

});
