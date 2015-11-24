/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Check = require("main/check.js");

module.exports = Vue.extend({
   inherit:true,
   template:__inline("seat.html"),
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
            Service.delAllSeat(this.busid,function(rep){
            })
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