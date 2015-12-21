define('components/page/config/config', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var nav = require("navbar/navbar.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m").layer;
module.exports =   Vue.extend({
   template:"<div class=\"page-config\" style=\"height: 100%\">\r\n    <div class=\"mui-control-content mui-active\" style=\"height: 100%\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                系统服务\r\n            </h5>\r\n        </header>\r\n        <div class=\"mui-content mui-scroll-wrapper\">\r\n            <div class=\"mui-scroll\">\r\n                <ul class=\"mui-table-view mui-list\" style=\"margin-top: 20px;\">\r\n                    <i class=\" mui-pull-left iconfont icon-user\"></i>\r\n                    <li class=\"mui-table-view-cell mui-media\">\r\n                        <a class=\"mui-navigate-right\" >\r\n                            <div class=\"mui-media-body\">\r\n                                {{mine.name}}\r\n                                <p>{{mine.email}}</p>\r\n                            </div>\r\n                        </a>\r\n                    </li>\r\n\r\n                </ul>\r\n\r\n                <ul class=\"mui-table-view mui-list\" style=\"margin-top: 25px;\">\r\n                    <i class=\" mui-pull-left iconfont icon-users\"></i>\r\n                    <li class=\"mui-table-view-cell\">\r\n                        <a class=\"mui-navigate-right\" href=\"#relation\">\r\n                            代订座人维护\r\n                        </a>\r\n                    </li>\r\n\r\n                    <i class=\" mui-pull-left iconfont icon-tuangou\"></i>\r\n                    <li class=\"mui-table-view-cell\">\r\n                        <a class=\"mui-navigate-right\" href=\"#company\">合作单位订位查询\r\n                        </a>\r\n                    </li>\r\n\r\n                </ul>\r\n\r\n                <h5 style=\"margin-top: 40px\" class=\"mui-content-padded\">其他应用</h5>\r\n                <ul class=\"mui-table-view mui-list \">\r\n                    <i class=\" mui-pull-left iconfont icon-plane\"></i>\r\n                    <li class=\"mui-table-view-cell mui-media\">\r\n                        <a class=\"mui-navigate-right\" href=\"http://m.ctrip.com/html5/flight/#&do_not_show_add_to_home_tip=1\">\r\n                            <div class=\"mui-media-body\">\r\n                                航班信息查询\r\n                            </div>\r\n                        </a>\r\n                    </li>\r\n                    <i class=\" mui-pull-left iconfont icon-train\"></i>\r\n                    <li class=\"mui-table-view-cell mui-media\">\r\n                        <a class=\"mui-navigate-right\" href=\"http://m.ctrip.com/webapp/train/\">\r\n                            <div class=\"mui-media-body\">\r\n                                火车信息查询\r\n                            </div>\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n                <ul class=\"mui-table-view mui-list\" style=\"margin-top: 25px;\">\r\n                    <i class=\" mui-pull-left iconfont icon-time\"></i>\r\n                    <li class=\"mui-table-view-cell\">\r\n                        <a class=\"mui-navigate-right\" href=\"#history\">\r\n                            历史订单\r\n                        </a>\r\n                    </li>\r\n                    <i class=\" mui-pull-left iconfont icon-target\"></i>\r\n                    <li class=\"mui-table-view-cell mui-media\">\r\n                        <a href=\"http://mp.weixin.qq.com/s?__biz=MzIxOTEwMDcwOQ==&mid=400376477&idx=1&sn=aaf861f22ac9ffc3a18bf13eaf858eb7&scene=18#wechat_redirect\" class=\"mui-navigate-right\" >\r\n                            帮助文档\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n                <div class=\"mui-content-padded\" style=\"margin-top: 25px;margin-bottom: 60px;\">\r\n                    <button v-on=\"click:unBind\" class=\"mui-btn mui-btn-block mui-btn-warning\" style=\"padding: 8px;\">\r\n                        解除绑定\r\n                    </button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <c-nav view=\"config\"></c-nav>\r\n</div>",
   data: function () {
      return {
         mine:{}
      }
   },
   methods:{
      unBind: function () {
         Layer.open({
            content:"确定解绑该账号？",
            btn:["确定","取消"],
            shadeClose:false,
            yes: function () {
               Service.unbind(function (rep) {
                  if(rep.Code == 0){
                     alert("解绑成功！");
                  }
                  WeixinJSBridge.call('closeWindow');
               });
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
         content:"加载中",
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

});
