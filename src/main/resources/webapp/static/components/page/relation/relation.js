define('components/page/relation/relation', function(require, exports, module) {

/**
 * Created by jack on 2015/9/10.
 */

var Vue = require("component_modules/vue");
var Layer = require("component_modules/layer.m").layer;
var Service = require("main/service.js");

module.exports =   Vue.extend({
    template:"<div class=\"page-relation\" >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" href=\"#config\"></a>\r\n        <h5 class=\"mui-title\">\r\n            联系人\r\n        </h5>\r\n        <a class=\"mui-pull-right mui-icon mui-icon-refresh\" v-on=\"click:reload\"></a>\r\n    </header>\r\n    <div class=\"mui-content\">\r\n        <h5 class=\"mui-content-padded\">\r\n            每个用户最多可以绑定四个联系人\r\n        </h5>\r\n        <ul class=\"mui-table-view\">\r\n            <li class=\"mui-table-view-cell mui-media\" v-repeat=\"u in delegations\">\r\n                <a >\r\n                    <div class=\"mui-media-body\" >\r\n                        {{u.name}}\r\n                        <p>{{u.email}}</p>\r\n                    </div>\r\n                    <button class=\"mui-btn mui-btn-negative mui-btn-outlined\" v-on=\"click:delDelegation(u._id)\">\r\n                        删除\r\n                    </button>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n        <div style=\"padding: 15px;\">\r\n\r\n            <a style=\"padding: 5px;\" v-if=\"delegations.length<4\" class=\"mui-btn mui-btn-primary mui-btn-block\" href=\"#relation/query\">\r\n                <span class=\"mui-icon mui-icon-plus\"></span>\r\n                添加联系人</a>\r\n        </div>\r\n\r\n        <ul class=\"mui-table-view\">\r\n            <li class=\"mui-table-view-cell mui-media\" v-repeat=\"u in relatives\">\r\n                <a >\r\n                    <div class=\"mui-media-body\" >\r\n                        {{u.name}}\r\n                        <p>{{u.relation}}</p>\r\n                    </div>\r\n                    <button class=\"mui-btn mui-btn-negative mui-btn-outlined\" v-on=\"click:delRel(u._id)\">\r\n                        删除\r\n                    </button>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n        <div style=\"padding: 15px;\">\r\n            <a style=\"padding: 5px;\" v-if=\"relatives.length<4\" class=\"mui-btn mui-btn-primary mui-btn-block\" href=\"#relation/relatives\">\r\n                <span class=\"mui-icon mui-icon-plus\"></span>\r\n                添加亲属</a>\r\n        </div>\r\n\r\n        <h5 style=\"text-align: center\">刷新页面查看最新关联。</h5>\r\n    </div>\r\n</div>",
    data: function () {
        return {
            delegations:[],
            relatives:[]
        }
    },
    methods:{
        getDelegation: function () {
            var self = this;
            Layer.open({
                content: "加载中",
                type: 2,
                shadeClose: false,
                shade: false
            });
            Service.getDelegation(function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.delegations = rep.Response;
                }
            })
        },
        getRelatives: function () {
            var self = this;
            Layer.open({
                content: "加载中",
                type: 2,
                shadeClose: false,
                shade: false
            });
            Service.getRel(function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.relatives = rep.Response;
                }
            })
        },
        delDelegation: function (id) {
            var self = this;
            Layer.open({
                content: "提交中",
                type: 2,
                shadeClose: false,
                shade: false
            });
            Service.delDelegation(id,function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.getDelegation();
                }
            })
        },
        delRel: function (id) {
            Layer.open({
                content: "提交中",
                type: 2,
                shadeClose: false,
                shade: false
            });
            var self = this;
            Service.delRel(id, function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.getRelatives();
                }
            })
        },
        reload: function () {
            this.getDelegation();
            this.getRelatives();
        }
    },
    compiled: function () {
        this.getDelegation();
        this.getRelatives();
    }
});

});
