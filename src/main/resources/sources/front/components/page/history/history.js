/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;

module.exports = Vue.extend({
    inherit:true,
    template:__inline("history.html"),
    data:function(){
        return {
            date:"",
            order:[],
            height:document.documentElement.clientHeight-44
        }
    },
    methods:{
        render: function () {

        },
        showDatePicker: function () {
            var self = this;
            this.picker.show(function (d) {
                self.date = d.text;
            });
        },
        getSourceName: function (o) {
            if(o){
                return o.name;
            }
        },
        getTicket: function () {
            Layer.open({
                content: "查询中",
                type: 2,
                shadeClose: false,
                shade: false
            });
            var self = this;
            Service.getMyTicket({date:this.date,old:true},function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.order = rep.Response;
                }
            })
        }
    },
    watch:{
        "date": function () {
            this.getTicket();
        }
    },
    ready: function () {
        this.picker = new mui.DtPicker({"type":"date","beginYear":2015});
    }
});