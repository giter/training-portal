define('components/page/bus/bus', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");
var Check = require("main/check.js");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-bus\">\r\n    <div class=\"panel admin-panel\">\r\n        <div class=\"panel-head\">\r\n            <strong>\r\n                车辆列表\r\n            </strong>\r\n        </div>\r\n        <div class=\"padding border-bottom\">\r\n            <input type=\"button\" class=\"button button-small bg-main\" data-mask=\"1\" data-width=\"50%\"  v-on=\"click:addBus\" value=\"新增车辆\" />\r\n        </div>\r\n        <table class=\"table table-hover\">\r\n            <tr><th width=\"100\">车辆名</th><th width=\"100\">车牌号</th><th width=\"*\">目的地</th><th width=\"100\">发车时间</th><th width=\"100\">当前座位数</th><th width=\"200\">操作</th></tr>\r\n            <tr v-repeat=\"c in buses\">\r\n                <td>{{c.name}}</td>\r\n                <td>{{c.sn}}</td>\r\n                <td>{{c.destination}}</td>\r\n                <td>{{c.goff}}</td>\r\n                <td>0</td>\r\n                <td>\r\n                    <a v-on=\"click:editBus(c)\" class=\"button border-blue button-little\" href=\"javascript:;\">修改</a>\r\n                    <a class=\"button border-yellow button-little\" v-on=\"click:delBus(c._id)\" href=\"javascript:;\" onclick=\"{if(confirm('确认删除?')){return true;}return false;}\">删除</a>\r\n                    <a href=\"#/home/bus/{{c._id}}\" class=\"button border-blue button-little\" href=\"javascript:;\">车位管理</a>\r\n                </td>\r\n            </tr>\r\n        </table>\r\n\r\n        <div class=\"panel-foot text-center\">\r\n            <ul class=\"pagination\"><li><a href=\"javascript:;\" v-on=\"click:prevPage\">上一页</a></li></ul>\r\n            <ul class=\"pagination pagination-group\">\r\n                <li v-on=\"click:toPage\" v-repeat=\"parseInt(((count-1)/limit))+1\" v-class=\"active:$index == (page)\"><a href=\"javascript:;\">{{$index+1}}</a></li>\r\n            </ul>\r\n            <ul class=\"pagination\"><li><a href=\"javascript:;\" v-on=\"click:nextPage\">下一页</a></li></ul>\r\n        </div>\r\n\r\n        <div class=\"dialog-mask\" style=\"display: none;\"></div>\r\n        <div id=\"bus-dialog\" class=\"dialog-win\" style=\"position: fixed; width: 50%; z-index: 11;display: none;\">\r\n            <div class=\"dialog open\">\r\n                <div class=\"dialog-head\">\r\n                    <span class=\"close\" v-on=\"click:closeDialog\"></span>\r\n                    <strong>{{bus._type}}</strong>\r\n                </div>\r\n                <div class=\"dialog-body\">\r\n                    <div class=\"form-x\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                车辆名\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.name\" placeholder=\"请填写车辆名\">\r\n                                <div v-show=\"!validation.name\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                车牌号\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.sn\" placeholder=\"请填写车牌号\">\r\n                                <div v-show=\"!validation.sn\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                目的地\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.destination\" placeholder=\"请填写目的地\">\r\n                                <div v-show=\"!validation.destination\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                发出时间\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.goff\" placeholder=\"请填写目的地\">\r\n                                <div v-show=\"!validation.goff\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"dialog-foot\">\r\n                    <button class=\"button dialog-close\" v-on=\"click:closeDialog\">取消</button>\r\n                    <button class=\"button bg-green\" v-disabled=\"isValid\" v-on=\"click:postBus\">确认</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>\r\n\r\n",
   data: function () {
      return {
         buses:[],
         count:0,
         limit:10,
         page:0,
         bus:{
            "_type":"新增车辆",
            "name":"",
            "sn":"",
            "goff":""
         },
         loading:false
      }
   },
   watch:{
      "page": function (p) {
         this.page = p;
         this.getBuses();
      }
   },
   methods:{
      addBus: function (e) {
         this.bus = {
            "_type":"新增车辆",
            "name":"",
            "sn":"",
            "destination":"",
            "goff":""
         };
         this.openDialog();
      },
      editBus: function (model) {
         model._type="编辑车辆";
         this.bus = JSON.parse(JSON.stringify(model));
         this.openDialog();
      },
      getBuses:function(param){
         var self = this;
         this.loading = true;
         Service.getBuses({page:self.page,limit:self.limit},function (rep) {
            self.loading = false;
            if(rep.Code == 0){
               self.buses = rep.Response.lists;
               self.count = rep.Response.count;
            }
         });
      },
      delBus: function (id) {
         this.loading = true;
         var self = this;
         Service.delBus(id, function (rep) {
            self.loading = false;
            if(rep.Code != 0 ){
               alert(rep.Message);
            }else{
               self.getBuses();
            }
         });
      },
      postBus: function () {
         if (!this.isValid){
            return;
         }

         var self = this;
         this.loading = true;
         if(this.bus._id){
            Service.updateBus(this.bus._id,JSON.stringify(self.bus),function (rep) {
               if(rep.Code != 0 ){
                  alert(rep.Message);
               }else{
                  self.getBuses();
               }
               self.loading = false;
               self.closeDialog();
            });
         }else{
            Service.addBus(JSON.stringify(self.bus),function (rep) {
               if(rep.Code != 0 ){
                  alert(rep.Message);
               }else{
                  self.getBuses();
               }
               self.loading = false;
               self.closeDialog();
            });
         }
      },
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
      openDialog: function () {
         this.dialog.show();
         this.mask.show();
      },
      closeDialog: function () {
         this.dialog.hide();
         this.mask.hide();
      }
   },
   computed: {
      validation: function () {
         return {
            name: Check.check(this.bus.name,"required"),
            sn: Check.check(this.bus.sn,"required"),
            destination: Check.check(this.bus.destination,"required"),
            goff: Check.check(this.bus.goff,"required")
         }
      },
      isValid: function () {
         var validation = this.validation;
         return Object.keys(validation).every(function (key) {
            return validation[key]
         })
      }
   },
   ready: function () {
      this.getBuses();
      this.dialog = $("#bus-dialog");
      var x=parseInt($(window).width()-this.dialog.outerWidth())/2;
      var y=parseInt($(window).height()-this.dialog.outerHeight())/2;
      if (y<=10){y="10"}
      this.dialog.css({"left":x,"top":y});
      this.mask = $(".dialog-mask");
   }
});

});
