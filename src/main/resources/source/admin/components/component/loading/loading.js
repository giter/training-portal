/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-loading",{
    template:__inline("loading.html"),
    props:["show"],
    methods:{
        showLoading: function () {
            var x=parseInt($(window).width()-this.layer.outerWidth())/2;
            var y=parseInt($(window).height()-this.layer.outerHeight())/2;
            if (y<=10){y="10"}
            this.layer.css({"left":x,"top":y});
            this.mask.show();
            this.layer.show();
        },
        closeLoading: function () {
            this.mask.hide();
            this.layer.hide();
        }
    },
    watch:{
      "show": function (r) {
          if(r){
              this.showLoading();
          }else{
              this.closeLoading();
          }
      }  
    },
    ready: function () {
        this.layer = $("#layui-layer22");
        this.mask = $(".layui-layer-shade");
    }
});