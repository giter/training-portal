/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;
module.exports =   Vue.extend({
   template:__inline("config.html"),
   data: function () {
      return {
         mine:{}
      }
   },
   methods:{
      unBind: function () {
         Layer.open({
            content:"ȷ�������˺ţ�",
            btn:["ȷ��","ȡ��"],
            shadeClose:false,
            yes: function () {
               Layer.closeAll();
            },
            no: function () {
               Layer.closeAll();
            }
         });
      } 
   },
   ready: function () {
      var self = this;
      Layer.open({
         content:"������",
         type:2,
         shadeClose:false,
         shade:"background-color:rgba(0,0,0,0)"
      });
      Service.getMine(function (rep) {
         Layer.closeAll();
         if(rep.Code == 0){
            self.mine = rep.Response;
         }
      })

      mui(".page-config .mui-scroll-wrapper").scroll();
   }
});