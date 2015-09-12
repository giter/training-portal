define('components/page/car/car', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Pintuer = require("main/pintuer.js");
var Service = require("main/service.js");

module.exports = Vue.extend({
   inherit:true,
   template:"<div >\r\n    <div class=\"panel admin-panel\">\r\n        <div class=\"panel-head\">\r\n            <strong>\r\n                车辆列表\r\n            </strong>\r\n        </div>\r\n        <div class=\"padding border-bottom\">\r\n            <input type=\"button\" class=\"button button-small checkall\" name=\"checkall\" checkfor=\"id\" value=\"全选\" />\r\n            <input type=\"button\" class=\"button button-small border-green dialogs\" v-on=\"click:showDialog\" data-target=\"#mydialog\" data-mask=\"1\" data-width=\"50%\" value=\"新增车辆\" />\r\n            <input type=\"button\" class=\"button button-small border-yellow\" value=\"批量删除\" />\r\n        </div>\r\n        <table class=\"table table-hover\">\r\n            <tr><th width=\"45\">选择</th><th width=\"120\">车牌号</th><th width=\"100\">驾驶员</th><th width=\"100\">汽车类型</th><th width=\"100\">发车目的地</th><th width=\"100\">发车时间</th><th width=\"100\">座位数</th><th width=\"100\">操作</th></tr>\r\n            <tr v-repeat=\"c in cars\">\r\n                <td><input type=\"checkbox\" name=\"id\" value=\"1\" /></td>\r\n                <td>{{c.name}}</td>\r\n                <td>{{c.name}}</td>\r\n                <td>大巴</td>\r\n                <td>{{c.destination}}</td>\r\n                <td>{{c.goff}}</td>\r\n                <td>{{c.number}}</td>\r\n                <td><a class=\"button border-blue button-little\" href=\"#\">修改</a> <a class=\"button border-yellow button-little\" href=\"#\" onclick=\"{if(confirm('确认删除?')){return true;}return false;}\">删除</a> <a class=\"button border-blue button-little\" href=\"#/home/car/{{c.id}}\">车位管理</a></td></tr>\r\n        </table>\r\n        <div class=\"panel-foot text-center\">\r\n            <ul class=\"pagination\"><li><a href=\"javascript:;\" v-on=\"click:prevPage\">上一页</a></li></ul>\r\n            <ul class=\"pagination pagination-group\">\r\n                <li v-on=\"click:toPage\" v-repeat=\"parseInt(((total-1)/size))+1\" v-class=\"active:$index == (page-1)\"><a href=\"javascript:;\">{{$index+1}}</a></li>\r\n            </ul>\r\n            <ul class=\"pagination\"><li><a href=\"javascript:;\" v-on=\"click:nextPage\">下一页</a></li></ul>\r\n        </div>\r\n    </div>\r\n    <div id=\"mydialog\">\r\n        <div class=\"dialog\">\r\n            <div class=\"dialog-head\">\r\n                <span class=\"close rotate-hover\"></span>\r\n                <strong>新增车辆</strong>\r\n            </div>\r\n            <div class=\"dialog-body\">\r\n                <div class=\"form-x\" >\r\n                    <div class=\"form-group\">\r\n                        <div class=\"label\">\r\n                            车牌号\r\n                        </div>\r\n                        <div class=\"field\">\r\n                            <input type=\"text\" class=\"input\" placeholder=\"请填写车牌号\">\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"label\">\r\n                            驾驶员\r\n                        </div>\r\n                        <div class=\"field\">\r\n                            <input type=\"text\" class=\"input\" placeholder=\"请填写驾驶员姓名\">\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"label\">\r\n                            目的地\r\n                        </div>\r\n                        <div class=\"field\">\r\n                            <input type=\"text\" class=\"input\" placeholder=\"请填写目的地\">\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"label\">\r\n                            发车时间\r\n                        </div>\r\n                        <div class=\"field\">\r\n                            <input type=\"text\" class=\"input\" placeholder=\"请填写发车时间\">\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"label\">\r\n                            座位数\r\n                        </div>\r\n                        <div class=\"field\">\r\n                            <input type=\"number\" class=\"input\" placeholder=\"请填写座位数\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"dialog-foot\">\r\n                <button class=\"button dialog-close\">取消</button>\r\n                <button class=\"button bg-green\">确认</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n",
   data: function () {
      return {
         cars:[],
         total:0,
         size:10,
         page:1
      }
   },
   watch:{
     "page": function (p) {
        this.getCars({page:p,size:this.size});
     }
   },
   methods:{
      showDialog: function (e) {
         Pintuer.showdialog(e);
      },
      getCars:function(param){
         var self = this;
         Service.getCarList(param,function (rep) {
            if(rep.Code == 0){
               self.cars = rep.Response.rows;
               self.total = rep.Response.total;
            }
         });
      },
      toPage: function (e) {
         this.page = parseInt(e.target.innerHTML);
      },
      nextPage: function (e) {
         var t = parseInt(((this.total-1)/this.size))+1;
         if(this.page < t){
            this.page +=1;
         }

      },
      prevPage: function () {
         if(this.page > 1){
            this.page -=1;
         }
      }
   },
   ready: function () {
      this.getCars({page:this.page,size:this.size});
   }
});

});
