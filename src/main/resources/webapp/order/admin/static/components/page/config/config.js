define('components/page/config/config', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div class=\"page-config\">\n    <div class=\"panel panel-default content\">\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" @click=\"onChangeView('food')\" :class=\"{active:view=='food'}\"><a href=\"javascript:;\">\n                    订餐配置</a></li>\n                <li role=\"presentation\"  @click=\"onChangeView('goods')\" :class=\"{active:view=='goods'}\"><a href=\"javascript:;\">\n                    订货配置</a></li>\n            </ul>\n        </div>\n        <div class=\"panel-body\" v-if=\"view=='food'\">\n\n            <div class=\"form-horizontal\">\n               <div class=\"form-group\">\n                   <label class=\"col-sm-2 control-label\">提前预定天数</label>\n                   <div class=\"col-sm-10\">\n                       <input type=\"number\"  class=\"form-control\" v-model=\"config.pre\" >\n                   </div>\n               </div>\n            </div>\n\n            <fieldset>\n                <legend>中餐</legend>\n                <div class=\"form-horizontal\">\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">最晚预定时间</label>\n                        <div class=\"col-sm-10\">\n                            <input type=\"text\"  class=\"form-control\" v-model=\"config.lunch.lastOrder\" >\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">最晚退订时间</label>\n                        <div class=\"col-sm-10\">\n                            <input type=\"text\"  class=\"form-control\"  v-model=\"config.lunch.unSub\" >\n                        </div>\n                    </div>\n                </div>\n            </fieldset>\n            <fieldset>\n                <legend>晚餐</legend>\n                <div class=\"form-horizontal\">\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">最晚预定时间</label>\n                        <div class=\"col-sm-10\">\n                            <input type=\"text\"  class=\"form-control\"  v-model=\"config.dinner.lastOrder\" >\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">最晚退订时间</label>\n                        <div class=\"col-sm-10\">\n                            <input type=\"text\"  class=\"form-control\"  v-model=\"config.dinner.unSub\" >\n                        </div>\n                    </div>\n                </div>\n            </fieldset>\n        </div>\n        <div class=\"panel-footer text-right\" v-if=\"view=='food'\">\n            <a href=\"javascript:;\" class=\"btn btn-primary\" @click=\"onSubmit\">提交</a>\n        </div>\n\n        <div class=\"panel-body\" v-if=\"view=='goods'\">\n            <div class=\"form-horizontal\">\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\">提前预定天数</label>\n                    <div class=\"col-sm-10\">\n                        <input type=\"number\"  class=\"form-control\" v-model=\"gConfig.pre\" >\n                    </div>\n                </div>\n            </div>\n\n        </div>\n        <div class=\"panel-footer text-right\" v-if=\"view=='goods'\">\n            <a href=\"javascript:;\" class=\"btn btn-primary\" @click=\"onSubmitGoods\">提交</a>\n        </div>\n\n    </div>\n</div>",
    data: function () {
      return {
          config:{
              pre:4,
              lunch:{
                  lastOrder:"12:00",
                  unSub:"12:20"
              },
              dinner:{
                  lastOrder:"18:00",
                  unSub:"18:20"
              }
          },
          gConfig:{
            pre:5
          },
          view:"food"
      }
    },
    methods:{
        render: function () {
            this.renderConfig();
        },
        onSubmit: function () {
            Service.putCtx("dc_config", JSON.stringify({config:this.config}),function (rep) {
                layer.alert("更新成功!");
            });
        },
        onSubmitGoods: function () {
            Service.putCtx("dh_config", JSON.stringify({config:this.gConfig}),function (rep) {
                layer.alert("更新成功!");
            });
        },
        renderGConfig: function () {
            layer.load();
            var self = this;
            Service.getCtx("dh_config", function (rep) {
                if(rep.config){
                    self.gConfig = $.extend(self.gConfig,rep.config);
                }
                layer.closeAll();
            });
        },
        renderConfig: function () {
            var self = this;
            layer.load();
            Service.getCtx("dc_config", function (rep) {
                if(rep.config){
                    self.config = $.extend(self.config,rep.config);
                }
                layer.closeAll();
            });
        },
        onChangeView: function (v) {
            this.view = v;
        }

        
    },
    ready: function () {
        this.render();
    },
    watch:{
      view: function (v) {
          if(v == "goods"){
              this.renderGConfig();
          }
      }
    },
    route:{
        activate: function (transition) {
            transition.next();
        }
    }
});


});
