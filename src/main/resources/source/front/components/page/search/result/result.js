/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Router = require('component_modules/director').Router;
var Layer = require("component_modules/layer.m.js").layer;

module.exports = Vue.extend({
   inherit:true,
   template:__inline("result.html"),
   methods:{
      btnPrev: function () {
         var i = 0;
         for(;i<this.calendars.length;i++){
            if(this.calendars[i].value == this.search.date){
               if(i>0){
                  this.search.date = this.calendars[i-1].value;
                  return this.getResult();
               }
            }
         }
      },
      btnNext: function () {
         var i = 0;
         for(;i<(this.calendars.length-1);i++){
            if(this.calendars[i].value == this.search.date){
               this.search.date = this.calendars[i+1].value;
               return this.getResult();
            }
         }
      },
      getResult: function () {
         var self = this;
         self.bus = [];
         Layer.open({
            content: "������",
            type: 2,
            shadeClose: false,
            shade: false
         });
         Service.getResult({date:self.search.date,dest:self.search.whither},function (rep) {
            if(rep.Code == 0){
               self.result = self.filterBus(rep.Response);
            }
            Layer.closeAll();
         })
      },
      selectBus: function (busid,date) {
         var self = this;
         Layer.open({
            content:"������",
            type:2,
            shadeClose:false,
            shade:"background-color:rgba(0,0,0,0)"
         });
         Service.getBusSeat({bus:busid,date:date},function (rep) {
            Layer.closeAll();
            if(rep.Code == 0){
               self.bus = rep.Response;
               var router = new Router();
               return router.setRoute("bus");
            }
         })
      },
      toRouter: function (url) {
         var router = new Router();
         return router.setRoute(url);
      },
      filterBus: function (data) {
         var now = Date.parse(new Date())/1000,list = [];
         for(var i in data){
            var time = Date.parse(new Date(data[i].date.replace(/-/g,"/")))/1000;
            var diff = now - time;

            if(diff <= 0){
               list.push(data[i]);
            }
         }
         return list;

      }
   },
   computed:{

   },
   ready: function () {
      var self = this;
      if(typeof self.search.date != "string"){
         var router = new Router();
         return router.setRoute("search");
      }

      this.$on("backReload", function () {
         self.getResult();
      })
   }
});