/**
 * Created by jack on 2015/9/10.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Router = require('component_modules/director.js').Router;
var Layer = require("component_modules/layer.m.js").layer;

module.exports = Vue.extend({
    inherit:true,
    template:__inline("calendar.html"),
    ready: function () {
        var self = this;
        Layer.open({
            content:"加载中",
            type:2,
            shadeClose:false,
            shade:"background-color:rgba(0,0,0,0)"
        });
        Service.getCalendar(function (rep) {
            Layer.closeAll();
            if(rep.Code == 0){
                self.calendars = rep.Response;
            }
        })
    },
    methods:{
        onSelect: function (r) {
            this.search.date = r;
            var router = new Router();
            router.setRoute("search");
        },
        toRouter: function (url) {
            var router = new Router();
            router.setRoute(url);
        }
    }
});