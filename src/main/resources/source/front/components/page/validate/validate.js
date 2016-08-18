/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;

module.exports =   Vue.extend({
   inherit:true,
   template:__inline("validate.html"),
   data: function () {
      return {
         list:[]
      }
   },
   methods:{
      render: function () {
         var self = this;
         Service.getMyTicket(function (rep) {
            if(rep.Code == 0){
               self.valid(rep.Response);
               mui(".page-service .mui-scroll-wrapper").scroll();
            }
         })
      },
      valid: function (data) {
         var now = Date.parse(new Date())/1000,list = [];
         for(var i in data){
            var time = Date.parse(new Date(data[i].date.replace(/-/g,"/")+" "+data[i].bus.goff))/1000;
            var diff = now - time;

            if(diff>=-this.beginTime&&diff<=this.endTime){
               list.push(data[i]);
            }
         }
         this.list = list;
      }
   },
   ready: function () {
      var self = this;
      this.render();
      setInterval(function () {
         self.render();
      },60000)
   }
});