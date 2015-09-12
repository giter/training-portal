define('components/page/order/order', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var nav = require("navbar/navbar.js");
var Service = require("main/service.js");

module.exports = Vue.extend({
    template:"<div class=\"page-order\">\r\n    <div class=\"mui-control-content mui-active\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                订单列表\r\n            </h5>\r\n            <a class=\"mui-icon mui-icon-refresh mui-pull-right\"></a>\r\n        </header>\r\n        <div class=\"mui-content\">\r\n            <h5 style=\"padding-left: 15px;\">订单</h5>\r\n            <ul class=\"mui-table-view mui-list\">\r\n                <li class=\"mui-table-view-cell\" v-repeat=\"o in order\">\r\n                    <h4>\r\n                        {{o.name}} {{o.target}}\r\n                    </h4>\r\n                    <p>{{o.date}}</p>\r\n                    <h5 style=\"color: #000;\">\r\n                        {{o.user}}：{{o.seat}}号座位\r\n                    </h5>\r\n                    <button class=\"mui-btn\">\r\n                        退订\r\n                    </button>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    <c-nav view=\"order\">\r\n    </c-nav>\r\n</div>",
    data:function(){
      return {
          order:[]
      }
    },
    methods:{

    },
    compiled: function () {
        var self = this;
      Service.getOrder(function (rep) {
          if(rep.Code == 0){
              self.order = rep.Response;
          }
      })
    }


});

});
