define('components/page/seat/seat', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");
var Check = require("main/check.js");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-seat\">\r\n    <div class=\"panel admin-panel\">\r\n        <div class=\"panel-head\">\r\n            <strong>\r\n                车位管理\r\n            </strong>\r\n\r\n        </div>\r\n        <div class=\"padding border-bottom\">\r\n            <button class=\"button win-back icon-arrow-left\" style=\"float: right\" onclick=\"javascript:window.history.go(-1)\"> 后退</button>\r\n            <input type=\"button\" class=\"button button-small bg-dot\" data-mask=\"1\" data-width=\"50%\" v-on=\"click:btnInit\"  value=\"初始化\" />\r\n            <i>{{bus.rows}} x {{bus.cols}}</i>\r\n        </div>\r\n       <div class=\"seat-container\">\r\n           <h4 class=\"bus-info\">\r\n               {{bus.name}}-{{bus.sn}}\r\n           </h4>\r\n           <table>\r\n               <tr v-repeat=\"r in bus.rows\">\r\n                   <td v-repeat=\"bus.cols\" style=\"position: relative;\">\r\n                       <a v-on=\"click:seatClick(r,$index,this)\">\r\n                           {{r}}-{{$index}}\r\n                           <div v-show=\"seat.row==r&&seat.col==$index\">\r\n                               <input type=\"text\" class=\"input\" v-model=\"seat.sn\" placeholder=\"请输入位号\">\r\n                               <div style=\"margin-top: 5px;\">\r\n                                   <input type=\"button\" style=\"padding: 2px 5px;\" class=\"button button-small bg-dot\" v-on=\"click:addSeat\" value=\"保存\">\r\n                                   <input type=\"button\" style=\"padding: 2px 5px;\" class=\"button button-small\" v-on=\"click:btnCancel\" value=\"取消\">\r\n                               </div>\r\n                           </div>\r\n                            <h3 class=\"seat-sn\" v-text=\"seatSn(r,$index).sn\" v-if=\"seat.row!=r||seat.col!=$index\">\r\n\r\n                            </h3>\r\n                       </a>\r\n                       <button style=\"position: absolute;left:100px;top:8px;\" v-if=\"(r+1)==bus.rows&&($index+1)==bus.cols\" class=\"button icon icon-minus bg-main\" v-on=\"click:minusBusRow\">删除行</button>\r\n                   </td>\r\n               </tr>\r\n           </table>\r\n           <div style=\"text-align: center\">\r\n               <button class=\"button icon icon-plus bg-main\" v-on=\"click:plusBusRow\">增加行</button>\r\n           </div>\r\n       </div>\r\n    </div>\r\n    <div class=\"dialog-mask\" style=\"display: none;\"></div>\r\n    <div id=\"init-dialog\"  class=\"dialog-win\" style=\"position: fixed; width: 50%; z-index: 11;display: none\">\r\n        <div class=\"dialog open\">\r\n            <div class=\"dialog-head\">\r\n                <span class=\"close\" v-on=\"click:btnClose\"></span>\r\n                <strong>初始化</strong>\r\n            </div>\r\n            <div class=\"dialog-body\">\r\n                <div class=\"form-x\">\r\n\r\n                    <div class=\"form-group\">\r\n                        <div class=\"alert alert-yellow\"><strong>注意：</strong>初始化会清空所有座位信息。</div>\r\n                        <div class=\"label\">\r\n                            行数\r\n                        </div>\r\n                        <div class=\"field\">\r\n                            <input type=\"number\" class=\"input\" v-model=\"rows\" placeholder=\"请填写行数\">\r\n                            <div v-show=\"!validation.rows\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"label\">\r\n                            列数\r\n                        </div>\r\n                        <div class=\"field\">\r\n                            <input type=\"number\" class=\"input\" v-model=\"cols\" placeholder=\"请填列数\">\r\n                            <div v-show=\"!validation.cols || !validation.larger\" class=\"input-help  check-error\"><ul><li>必填，最大不超过8列</li></ul></div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"dialog-foot\">\r\n                <button class=\"button dialog-close\" v-on=\"click:btnClose\">取消</button>\r\n                <button class=\"button bg-green\" v-disabled=\"isValid\" v-on=\"click:busInit\" >确认</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n",
   data: function () {
      return {
         busid:"",
         bus:{},
         seats:[],
         cols:"",
         rows:"",
         seat:{
            _id:null,
            row:null,
            col:null,
            sn:null
         }
      }
   },
   methods:{
      seatClick: function (row,col,e) {
         var target = this.seatSn(row,col);
         this.seat.row = parseInt(row);
         this.seat.col = parseInt(col);
         this.seat.sn = target.sn;
         this.seat._id = target._id;

         var $input = $(e.$el).find(".input");
         Vue.nextTick(function () {
            $input[0].focus();
            $input[0].select();
         })
      },
      btnCancel: function (e) {
         this.seat.row = null;
         this.seat.col = null;
         this.seat.sn = null;
         this.seat._id = null;
         if(e){
            e.stopPropagation();
         }
      },
      addSeat: function (e) {
         var self = this;
         self.loading = true;
         if(this.seat.sn){
            if(this.seat._id){
               Service.updateSeat(this.busid,this.seat._id, JSON.stringify(this.seat),function (rep) {
                  self.loading = false;
                  self.btnCancel();
                  self.init();
               });

            }else{
               Service.addSeat(this.busid,JSON.stringify(this.seat), function (rep) {
                  self.loading = false;
                  if(rep.Code == 0){
                     self.seats.push(rep.Response);
                     self.btnCancel();
                  }
               })
            }
         }else if(this.seat._id){
            Service.delSeat(this.busid,this.seat._id, function (rep) {
               self.loading = false;
               self.btnCancel();
               self.init();
            });
         }else{
            self.loading = false;
            self.btnCancel(e);
         }

      },
      seatSn: function (row,col) {
         var list = this.seats;
         for(var i in list){
            if(list[i].row == row&&list[i].col == col){
               return list[i];
            }
         }
         return "";
      },
      busInit: function () {
         if(this.isValid){
            var r = confirm("初始化改删除全部座位，确定初始化？");
            if(r){
               this.delAllSeat(this.seats);
               this.bus.rows = parseInt(this.rows);
               this.bus.cols = parseInt(this.cols);
               this.busUpdate();
            }
         }
      },
      busUpdate: function () {
         var self = this;
         Service.updateBus(this.busid,JSON.stringify(this.bus), $.proxy(function (rep) {
            if(rep.Code == 0){
               this.bus = rep.Response;
               self._closeInitDialog();
               self.init();
            }
         }),this);
      },
      btnInit: function () {
         this.cols = "";
         this.rows = "";
         this._openInitDialog();
      },
      btnClose: function () {
         this._closeInitDialog();
      },
      _openInitDialog: function () {
         this.dialog.show();
         this.mask.show();
      },
      _closeInitDialog: function () {
         this.dialog.hide();
         this.mask.hide();
      },
      delAllSeat: function (list) {
         for(var i in list){
            Service.delSeat(this.busid,list[i]._id,function(){
               console.log(i);
            })
         }
      },
      plusBusRow: function () {
         this.bus.rows +=1;
         this.busUpdate();
      },
      minusBusRow: function () {
         var valid = false;
         for(var i in this.seats){
            if(this.seats[i].row ==(this.bus.rows-1) ){
               valid = true;
            }
         }

         if(valid){
            alert("请先删除最后一列的座位！");
         }else{
            this.bus.rows -=1;
            this.busUpdate();
         }


      },
      init: function () {
         this.busid = window.location.hash.replace("#/home/bus/","");
         var self = this;
         this.loading = true;

         Service.getBus(this.busid, function (rep) {
            if(rep.Code == 0){
               self.bus = rep.Response;
               Service.getSeat(self.busid,function (rep) {
                  self.loading = false;
                  if(rep.Code == 0){
                     self.seats = rep.Response.lists;
                  }
               })
            }
         });
      }
   },
   computed:{
      validation: function () {
         return {
            rows: Check.check(this.rows,"required"),
            cols: Check.check(this.cols,"required"),
            larger:this.cols<9
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
      this.dialog = $("#init-dialog");
      var x=parseInt($(window).width()-this.dialog.outerWidth())/2;
      var y=parseInt($(window).height()-this.dialog.outerHeight())/2;
      if (y<=10){y="10"}
      this.dialog.css({"left":x,"top":y});
      this.mask = $(".dialog-mask");

   },
   compiled: function () {
      this.init();
   }
});

});
