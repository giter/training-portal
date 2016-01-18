define('components/page/bus/bus', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");
var Check = require("main/check.js");
var pager = require("pager/pager.js");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-bus\">\r\n    <div class=\"panel admin-panel\">\r\n        <div class=\"panel-head\">\r\n            <strong>\r\n                发车管理\r\n            </strong>\r\n        </div>\r\n        <div class=\"padding border-bottom\">\r\n            <input type=\"button\" class=\"button button-small bg-main\" data-mask=\"1\" data-width=\"50%\"  v-on=\"click:addBus\" value=\"新增车辆\" />\r\n        </div>\r\n        <table class=\"table table-hover\">\r\n            <tr><th width=\"120\">车辆照片</th><th width=\"120\">车辆名</th><th width=\"100\">车牌号</th><th width=\"100\">驾驶员</th><th width=\"100\">方向</th><th width=\"*\">路线</th><th width=\"80\">发车时间</th><th width=\"80\">到达时间</th><th width=\"80\">状态</th><th width=\"200\">操作</th></tr>\r\n            <tr v-repeat=\"c in buses\" >\r\n                <td ><img width=\"64\" height=\"64\"  class=\"img-border radius-small\" v-attr=\"src:c.src||'/admin/static/images/128.png'\"></td>\r\n                <td >{{c.name}}</td>\r\n                <td >{{c.sn}}</td>\r\n                <td>{{c.jsy}}</td>\r\n                <td >{{c.destination}}</td>\r\n                <td >{{c.line}}</td>\r\n                <td >{{c.goff}}</td>\r\n                <td >{{c.arrive}}</td>\r\n                <td >{{c.online == 0?\"停用\":\"启用\"}}</td>\r\n                <td >\r\n                    <a v-on=\"click:editBus(c)\" class=\"button border-blue button-little\" href=\"javascript:;\">修改</a>\r\n                    <a class=\"button border-yellow button-little\" v-on=\"click:delBus(c._id)\" href=\"javascript:;\" >删除</a>\r\n                    <a href=\"#/home/bus/{{c._id}}\" class=\"button border-blue button-little\" href=\"javascript:;\">车位管理</a>\r\n                </td>\r\n            </tr>\r\n        </table>\r\n\r\n        <c-pager count=\"{{@ count}}\" limit=\"{{@ limit}}\" page=\"{{@ page}}\"></c-pager>\r\n\r\n\r\n        <div class=\"dialog-mask\" style=\"display: none;\"></div>\r\n        <div id=\"bus-dialog\" class=\"dialog-win\" style=\"position: fixed; width: 50%; z-index: 11;display: none;\">\r\n            <div class=\"dialog open\">\r\n                <div class=\"dialog-head\">\r\n                    <span class=\"close\" v-on=\"click:closeDialog\"></span>\r\n                    <strong>{{bus._type}}</strong>\r\n                </div>\r\n                <div class=\"dialog-body\">\r\n                    <div class=\"form-x\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                车辆名\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.name\" placeholder=\"请填写车辆名\">\r\n                                <div v-show=\"!validation.name\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                车牌号\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.sn\" placeholder=\"请填写车牌号\">\r\n                                <div v-show=\"!validation.sn\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                        <div class=\"label\">\r\n                            驾驶员\r\n                        </div>\r\n                        <div class=\"field\">\r\n                            <input type=\"text\" class=\"input\" v-model=\"bus.jsy\" placeholder=\"请填写驾驶员\">\r\n\r\n                        </div>\r\n                    </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                驾驶员电话\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.tel\" placeholder=\"请填写驾驶员电话号码\">\r\n\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                方向\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.destination\" placeholder=\"请填写目的地\">\r\n                                <div v-show=\"!validation.destination\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                路线\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.line\" placeholder=\"请填写路线\">\r\n                                <div v-show=\"!validation.line\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                发车时间\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.goff\" placeholder=\"请填写目的地\">\r\n                                <div v-show=\"!validation.goff\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                到达时间\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.arrive\" placeholder=\"请填写到达时间\">\r\n                                <div v-show=\"!validation.arrive\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                状态\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <select class=\"input\" v-model=\"bus.online\">\r\n                                    <option value=0>停用</option>\r\n                                    <option value=1>启用</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                发车日\r\n                            </div>\r\n                            <div class=\"field\">\r\n\r\n\t\t\t\t\t\t\t\t<label for='bus-week-0'>星期一</label>\r\n\t\t\t\t\t\t\t\t<input id='bus-week-0' type='checkbox' v-model=\"bus.weeks['0']\" number value=1 />\r\n\r\n\t\t\t\t\t\t\t\t<label for='bus-week-1'>星期二</label>\r\n\t\t\t\t\t\t\t\t<input id='bus-week-1' type='checkbox' v-model=\"bus.weeks['1']\" number value=1 />\r\n\r\n\t\t\t\t\t\t\t\t<label for='bus-week-2'>星期三</label>\r\n\t\t\t\t\t\t\t\t<input id='bus-week-2' type='checkbox' v-model=\"bus.weeks['2']\" number value=1 />\r\n\r\n\t\t\t\t\t\t\t\t<label for='bus-week-3'>星期四</label>\r\n\t\t\t\t\t\t\t\t<input id='bus-week-3' type='checkbox' v-model=\"bus.weeks['3']\" number value=1 />\r\n\r\n\t\t\t\t\t\t\t\t<label for='bus-week-4'>星期五</label>\r\n\t\t\t\t\t\t\t\t<input id='bus-week-4' type='checkbox' v-model=\"bus.weeks['4']\" number value=1 />\r\n\r\n\t\t\t\t\t\t\t\t<label for='bus-week-5'>星期六</label>\r\n\t\t\t\t\t\t\t\t<input id='bus-week-5' type='checkbox' v-model=\"bus.weeks['5']\" number value=1 />\r\n\r\n\t\t\t\t\t\t\t\t<label for='bus-week-6'>星期日</label>\r\n\t\t\t\t\t\t\t\t<input id='bus-week-6' type='checkbox' v-model=\"bus.weeks['6']\" number value=1 /> \r\n\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                照片\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <a class=\"button bg-main input-file\" href=\"javascript:void(0);\">\r\n                                    + 上传照片\r\n                                    <input size=\"100\" type=\"file\" v-on=\"change:upLoadImg\" accept=\"image/gif, image/jpeg, image/png\" />\r\n                                </a>\r\n                                <img v-if=\"bus.src\" v-attr=\"src:bus.src\"  width=\"50\" height=\"50\" class=\"img-border radius-small\" />\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n                <div class=\"dialog-foot\">\r\n                    <button class=\"button dialog-close\" v-on=\"click:closeDialog\">取消</button>\r\n                    <button class=\"button bg-green\" v-disabled=\"isValid\" v-on=\"click:postBus\">确认</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>\r\n\r\n",
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
            "goff":"",
            "arrive":"",
            "line":"",
            "online":1,
			"weeks":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1},
            "src":"/admin/static/images/128.png"
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
            "line":"",
            "arrive":"",
            "destination":"",
            "goff":"",
            "online":1,
			"weeks":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1},
            "src":"/admin/static/images/128.png"
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

         var r = confirm("确认删除？");
         if(r){
            Service.delBus(id, function (rep) {
               self.loading = false;
               if(rep.Code != 0 ){
                  alert(rep.Message);
               }else{
                  self.getBuses();
               }
            });
         }
      },
      postBus: function () {
         if (!this.isValid){
            return;
         }
         var self = this;
         this.loading = true;
         this.toInt(self.bus);
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
      toInt: function (bus) {
         var week = bus.weeks;
         for(var i in week){
            week[i] = parseInt(week[i]);
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
      },
      upLoadImg: function (e) {
         var self = this;
         lrz(e.target.files[0],{width:400}, function (result) {
            self.bus.src = result.base64;
         })
      }
   },
   computed: {
      validation: function () {
         return {
            name: Check.check(this.bus.name,"required"),
            sn: Check.check(this.bus.sn,"required"),
            destination: Check.check(this.bus.destination,"required"),
            goff: Check.check(this.bus.goff,"required"),
            line: Check.check(this.bus.line,"required"),
            arrive: Check.check(this.bus.line,"required")
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
      if (y<=10){y=10}
      this.dialog.css({"left":x,"top":y});
      this.mask = $(".dialog-mask");
   }
});

});
