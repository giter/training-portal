/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;

module.exports = Vue.extend({
    inherit:true,
    template:__inline("orderdetail.html"),
    data:function(){
        return {
            ticket:{
                user:{},
                bus:{},
                seat:{}
            }
        }
    },
    methods:{
        render: function () {
            var self = this;
            Layer.open({
                content:"Мгдижа",
                type:2,
                shadeClose:false,
                shade:"background-color:rgba(0,0,0,0)"
            });

            Service.getMyTicket(function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    var lst =  rep.Response;
                    for(var i =0;i<lst.length;i++){
                        if(lst[i]._id = self.detailTicket){
                            return self.ticket = lst[i];
                        }
                    }

                }
            })
        },
        reload: function () {
            this.render();
        }
    },
    compiled: function () {
        this.render();
    }
});