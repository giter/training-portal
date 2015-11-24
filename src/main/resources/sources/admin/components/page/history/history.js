/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");


module.exports = Vue.extend({
   inherit:true,
   data: function () {
      return {
         traces:[],
         count:0,
         page:0,
         limit:10
      }
   },
   template:__inline("history.html"),
   compiled: function () {
      this.getLog();
   },
   watch:{
      "page": function (p) {
         this.page = p;
         this.getLog();
      }
   },
   methods:{
      toPage: function (e) {
         this.page = parseInt(e.target.innerHTML)-1;
      },
      nextPage: function (e) {
         var t = parseInt(((this.count-1)/this.limit));
         if(this.page < t){
            this.page +=1;
         }
      },
      prevPage: function () {
         if(this.page > 0){
            this.page -=1;
         }
      },
      getTime: function (t) {
         var d = new Date(t);
         return d.getFullYear() + "-" +(d.getMonth()+1)+"-"+ d.getDate() +" " + d.getHours()+":"+ d.getMinutes()+":"+ d.getSeconds();
      },
      getAction: function (t) {
         switch (t){
            case 1:{
               return "后台登录"
            }break;
            case  10000:{
               return "前台登录"
            }break;
         }
      },
      getLog: function () {
         var self = this;
         self.loading = true;
         Service.getTraces({page:this.page,limit:this.limit}, function (rep) {
            self.loading = false;
            if(rep.Code == 0){
               self.traces = rep.Response.lists;
               self.count = rep.Response.count;
            }
         })
      }
   }
});