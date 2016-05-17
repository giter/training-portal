/**
 * Created by jack on 2015/8/18.
 */

var Vue = require("component_modules/vue.js");
var Check = require("main/check.js").check;
var Server = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;

module.exports = Vue.extend({
    inherit:true,
    template:__inline("bind.html"),
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
                            content:rep.Response.value,
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