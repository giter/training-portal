define('components/page/company/company', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Layer = require("component_modules/layer.m").layer;
var Service = require("main/service.js");


module.exports = Vue.extend({
    template:"<div class=\"page-company\">\r\n    <div class=\"mui-control-content mui-active\" v-show=\"!isQuery\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                承包商订位查询\r\n            </h5>\r\n            <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" href=\"#service\"></a>\r\n        </header>\r\n        <div class=\"mui-content\">\r\n            <ul class=\"mui-table-view mui-list\">\r\n                <i class=\" iconfont icon-users\"></i>\r\n                <li class=\"mui-table-view-cell\">\r\n                    <a >承包商\r\n                        <select class=\"company-select\" v-model=\"selectCompany\" options=\"companies\">\r\n                            <option>请选择</option>\r\n                        </select>\r\n                    </a>\r\n                </li>\r\n                <i class=\"iconfont icon-time\"></i>\r\n                <li class=\"mui-table-view-cell\">\r\n                    <a  >出发时间\r\n                        <select class=\"company-select\" v-model=\"selectDate\" options=\"date\">\r\n                            <option>请选择</option>\r\n                        </select>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n            <div class=\"mui-content-padded\" style=\"text-align: center\">\r\n                <h5>手机端只支持查询，订位请到PC管理后台。</h5>\r\n            </div>\r\n            <button class=\"mui-btn mui-btn-block\" id=\"btn-search\" v-on=\"click:onSearch()\" >\r\n                <span class=\"mui-icon mui-icon-search\"></span>查询\r\n            </button>\r\n\r\n        </div>\r\n\r\n    </div>\r\n    <div class=\"mui-control-content mui-active\" v-show=\"isQuery\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                查询结果\r\n            </h5>\r\n            <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" v-on=\"tap:toBack\"></a>\r\n        </header>\r\n        <div class=\"mui-content\" style=\"height: {{height}}px;overflow-y: auto;\">\r\n            <table class=\"table\">\r\n                <thead>\r\n                <th>序号</th>\r\n                <th>姓名</th>\r\n                <th>车辆</th>\r\n                <th>车位</th>\r\n                </thead>\r\n                <tr v-repeat=\"u in users\">\r\n                    <td>{{$index+1}}</td>\r\n                    <td>{{u.name}}</td>\r\n                    <td>{{u.bus}}</td>\r\n                    <td>{{u.seat}}</td>\r\n                </tr>\r\n            </table>\r\n\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>",
    data:function(){
        return {
            selectDate:"",
            date:[],
            selectCompany:"",
            companies:[],
            isQuery:false,
            users:[],
            height:document.documentElement.clientHeight -44
        }
    },
    methods:{
        onSearch: function () {
            if(this.selectDate&&this.selectCompany){

                this._search();

            }else{
                Layer.open({
                    content: "请选择完整!",
                    shadeClose: false,
                    btn:["确定"],
                    yes: function () {
                        Layer.closeAll();
                    }
                })
            }
        },
        toBack: function () {
            this.isQuery = false;
            this.users =[];
        },
        _search: function () {
            var self = this;
            Layer.open({
                content: "加载中",
                type: 2,
                shadeClose: false,
                shade: false
            });
            Service.getUsers({
                page:0,
                limit:999,
                type:1,
                company:self.selectCompany
            }, function (rep) {
                if(rep.Code == 0){
                    var users = rep.Response.lists;
                    Service.getCompanyTicket({
                        page:0,
                        limit:999,
                        company:self.selectCompany,
                        date:self.selectDate
                    }, function (rep) {
                        if(rep.Code == 0){
                            var list = rep.Response;
                            for(var u = 0;u< users.length; u++){
                                for(var i =0;i< list.length; i++){
                                    if(users[u]._id == list[i].user._id){
                                        users[u].bus = list[i].bus.sn;
                                        users[u].seat = list[i].seat.sn;
                                        users[u].ticket = list[i]._id;
                                    }
                                }
                            }
                            self.users =users;
                        }
                        Layer.closeAll();
                        self.isQuery =true;
                    })

                }
            })
        }
    },
    ready: function () {
        var self = this;
        Service.getCompanies(function (rep) {
            self.companies = rep.Response;
        });
        Service.getCalendar(function (rep) {
            if(rep.Code == 0){
                var target = rep.Response;
                var lst = [];
                for(var i in target){
                    lst.push({
                        value:target[i].value,
                        text:target[i].name
                    })
                }
                self.date = lst;
            }
        });
    }

});

});
