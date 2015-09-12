define('components/page/search/result/result', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");

module.exports = Vue.extend({
   template:"<div class=\"page-search-result\" >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\"mui-icon mui-icon-arrowleft mui-pull-left\"  href=\"#search\"></a>\r\n        <h5 class=\"mui-title\">\r\n            查询结果\r\n        </h5>\r\n    </header>\r\n\r\n    <div class=\"mui-content\">\r\n        <h5 class=\"mui-content-padded\">\r\n            2/2车次\r\n        </h5>\r\n        <ul class=\"mui-table-view\">\r\n            <li class=\"mui-table-view-cell\" v-repeat=\"r in result\">\r\n                <a class=\"mui-navigate-right\" href=\"#car/{{r.id}}\">\r\n                    <h4>\r\n                        {{r.name}} {{r.whither}}\r\n                    </h4>\r\n                    <p>{{r.date}}</p>\r\n                    <h5>\r\n                        空座：{{r.void}} 预订：{{r.order}} 全部：{{r.void + r.order}}\r\n                    </h5>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n\r\n    </div>\r\n\r\n    <nav class=\"mui-bar mui-bar-tab\">\r\n        <div class=\"time-nav\">\r\n            <span class=\"mui-action mui-action-previous mui-icon mui-icon-back\"></span>\r\n            <span class=\"time\">10月1日 周四</span>\r\n            <span class=\"mui-action mui-action-next mui-icon mui-icon-forward\"></span>\r\n        </div>\r\n    </nav>\r\n</div>",
   data: function () {
      return {
         result:[]
      }
   },
   compiled: function () {
      var self = this;
      Service.getResult(function (rep) {
         if(rep.Code == 0){
            self.result = rep.Response;
         }
      })
   }
});

});
