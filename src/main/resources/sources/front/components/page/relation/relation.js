/**
 * Created by jack on 2015/9/10.
 */

var Vue = require("component_modules/vue.js");
var Layer = require("component_modules/layer.m.js").layer;
var Service = require("main/service.js");

module.exports =   Vue.extend({
    inherit:true,
    template:__inline("relation.html"),
    data: function () {
        return {
            delegations:[],
            relatives:[],
            len:0
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
            Service.getUsers({delegateTo:self.mine._id},function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.delegations = rep.Response.lists;
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
            Service.delForDelegation(id,function (rep) {
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
        if(!this.mine){
            window.location.href="/"
        }

        this.getDelegation();
        this.getRelatives();

        var self = this;
        this.$on("backReload", function (type) {
            if(type == "relation"){
                self.getDelegation();
                self.getRelatives();
            }
        });
    }
});