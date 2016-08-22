/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Layer = require("component_modules/layer.m.js").layer;
var Service = require("main/service.js");


module.exports = Vue.extend({
    template:__inline("company.html"),
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