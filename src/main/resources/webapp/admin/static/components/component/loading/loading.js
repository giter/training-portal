define('loading/loading', function(require, exports, module) {

/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue");

module.exports = Vue.component("c-loading",{
    template:"<div class=\"layui-layer-shade\" id=\"layui-layer-shade22\" times=\"22\" style=\"z-index:19891035; background-color:#fff; opacity:0.5; filter:alpha(opacity=50);display: none\"></div>\r\n<div class=\"layui-layer layui-anim layui-layer-loading \" id=\"layui-layer22\" type=\"loading\" times=\"22\" showtime=\"0\" contype=\"string\" style=\"display: none;z-index: 19891036; \"><div class=\"layui-layer-content layui-layer-loading1\"></div><span class=\"layui-layer-setwin\"></span></div>\r\n",
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

});
