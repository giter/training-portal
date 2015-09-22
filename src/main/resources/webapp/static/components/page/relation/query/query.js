define('components/page/relation/query/query', function(require, exports, module) {

/**
 * Created by jack on 2015/9/10.
 */

var Vue = require("component_modules/vue");
var Layer = require("component_modules/layer.m").layer;
var Service = require("main/service.js");

module.exports =   Vue.extend({
    template:"<div class=\"page-query\"  >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <div class=\"mui-input-row mui-search mui-pull-left\" style=\"max-width: 80%\">\r\n            <input type=\"search\" class=\"mui-input-clear\" placeholder=\"请输入姓名查询\" v-model=\"name\" >\r\n        </div>\r\n        <a class=\"mui-pull-right mui-btn-link\" href=\"#relation\">取消</a>\r\n    </header>\r\n    <div class=\"mui-content\" v-if=\"list.length>0\">\r\n        <ul class=\"mui-table-view  mui-media\">\r\n            <li class=\"mui-table-view-cell mui-media-body\" v-repeat=\"u in list\">\r\n                {{u.name}}\r\n                <p>{{u.email}}</p>\r\n                <button class=\"mui-btn mui-btn-outlined mui-btn-negative\" v-on=\"click:addDelegation(u._id)\">委托</button>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n</div>",
    data: function () {
        return {
            list:[],
            name:""
        }
    },
    methods:{
        query: function (name) {
            var self = this;
            Service.getUsers({name:name}, function (rep) {
                self.list = rep.Response.lists;
            })
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
                if(rep.Response.length < 4){
                    self._add(id);
                }else{
                    Layer.open({
                        content: "最多可以添加三个委托！",
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
            Service.addDelegation(id, function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    Layer.open({
                        content: "委托成功！",
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
        mui(".page-query input").input();
    }
});

});
