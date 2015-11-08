define('components/page/bind/bind', function(require, exports, module) {

/**
 * Created by jack on 2015/8/18.
 */

var Vue = require("component_modules/vue");
var Check = require("main/check.js").check;
var Server = require("main/service.js");
var Layer = require("component_modules/layer.m").layer;

module.exports = Vue.extend({
    inherit:true,
    template:"<div class=\"bind-container mui-content\">\r\n<header class=\"mui-bar-nav mui-bar\">\r\n    <h5 class=\"mui-title\">\r\n        用户绑定\r\n    </h5>\r\n    <a class=\" mui-icon mui-icon-left-nav mui-pull-left\" href=\"#config\"></a>\r\n</header>\r\n   <div class=\"mui-content\">\r\n\r\n       <h5 style=\"text-align: center;margin: 10px;\">请输入您的企业邮箱地址进行绑定</h5>\r\n       <div class=\"mui-card\">\r\n           <form class=\"mui-input-group\">\r\n              <div class=\"mui-input-row\">\r\n                  <label>邮箱</label>\r\n                  <input type=\"text\" class=\"mui-input-clear\" v-model=\"email\" placeholder=\"请输入邮箱地址\">\r\n              </div>\r\n          </form>\r\n       </div>\r\n       <h5 style=\"color: red;text-align: center\" v-show=\"!valid\">请输入正确邮箱格式</h5>\r\n       <div style=\"padding: 15px\">\r\n        <a style=\"padding: 6px 0\" class=\"mui-btn mui-btn-block mui-btn-blue\" v-on=\"click:onBind\">绑定</a>\r\n    </div>\r\n   </div>\r\n</div>\r\n",
    data: function () {
      return {
          email:"",
          valid:true
      }
    },
    methods:{
        onBind: function () {
            if(!this.email||!Check(this.email,"email")){
                this.valid = false;
            }else{
                this.valid = true;
                Layer.open({
                    content:"提交中",
                    type:2,
                    shadeClose:false
                });
                Server.userBind(JSON.stringify({
                    openID:this.openid,
                    email:this.email
                }), function (rep) {
                    Layer.closeAll();
                    if(rep.Code == 0){
                        Layer.open({
                            content:"已经发送验证信息到您的邮箱，请先验证后再打开微信。",
                            btn:["确定"],
                            yes: function () {
                                WeixinJSBridge.call('closeWindow');
                            }
                        })
                    }else{
                        Layer.open({
                            content:rep.Message,
                            btn:["确定"],
                            yes: function () {
                                WeixinJSBridge.call('closeWindow');
                            }
                        })
                    }

                })
            }
        }
    }
});

});
