/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var Router = require('component_modules/director').Router;
var Layer = require('component_modules/layer.m.js').layer;
var Service =require("main/service.js");

module.exports = Vue.extend({
   inherit:true,
   template:__inline("search.html"),
   data: function () {
     return {
        date:[],
        style:{
           height:0
        }
     }
   },
   methods:{
      onClick: function (hash) {
         var router = new Router();
         router.setRoute(hash);
      },
      onSelectDate: function (d) {
         this.search.date  = d.value;
      },
      onSearch: function (whither) {
         this.search.whither = whither;
         if(this.valid()){
            var self = this;
            Layer.open({
               content:"��ѯ��",
               type:2,
               shadeClose:true
            });

            Service.getResult({date:self.search.date,dest:whither},function (rep) {
               Layer.closeAll();
               if(rep.Code == 0){
                  self.result = self.filterBus(rep.Response);
                  var router = new Router();
                  return router.setRoute("search/result");
               }
            })
         }
      },
	
      filterBus: function (data) {

		 return Service.filterBus(data);
   },
	
      valid: function () {
         var str = null;
         if(!this.search.date){
            str = "����ѡ�����ʱ�䣡";
         }
         if(this.search.whither =="��ѡ��"){
            str = "����ѡ��Ŀ�ĵأ�";
         }
         if(str){
               Layer.open({
               content:str,
               shadeClose:false,
               btn:["ȷ��"],
               yes: function () {
                  Layer.closeAll();
               }
            })
         }
         return !str;
      }
   },
   ready: function () {
	  
      var self = this;

	  var ctx = Service.getContext({});

	  var advance = ctx['config'] ? (ctx['config']['advance'] || 7) : 7;
	
      Service.getCalendar({max:advance}, function (rep) {

         if(rep.Code == 0){

            var target = rep.Response;
            var lst = [];
            for(var i=0;i<target.length;i++){
               lst.push({
                  value:target[i].value,
                  text:target[i].name +" " + target[i].week + ( (i==0) ? "�����죩":"")
               })
            }
            self.calendars =self.date = lst;

            mui(".page-search .mui-scroll-wrapper").scroll();
         }
      });
   }
});