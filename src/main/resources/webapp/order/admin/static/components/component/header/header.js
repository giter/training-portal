define('header/header', function(require, exports, module) {

/**
 * Created by jack on 16/4/3.
 */

var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-header", {
    template:"<div>\n    <div class=\"logo\">\n        <strong>订餐管理后台</strong>\n    </div>\n    <div class=\"user\">\n        <img class=\"img-circle\" src=\"/order/admin/static/images/my.jpg\" data-holder-rendered=\"true\" style=\"width: 80px; height: 80px;\">\n        <h5>admin</h5>\n    </div>\n\n    <div class=\"list-group\">\n        <a v-for=\"m in menus\" v-link=\"{path:'/'+m.key}\" class=\"list-group-item\" title=\"{{m.name}}\" :class=\"{active:m.key == view}\">\n            <span class=\"glyphicon  pull-right\" :class=\"m.className\"  title=\"{{m.name}}\" ></span>\n            &nbsp;{{m.name}}\n        </a>\n    </div>\n</div>",
    props:["view"],
    data: function () {
      return {
          menus:[
              {
                  name:"统计报表",
                  key:"stat",
                  className:"glyphicon-file"
              },{
                  name:"菜单管理",
                  key:"menu",
                  className:"glyphicon-list-alt"

              },{
                  name:"餐桌管理",
                  key:"table",
                  className:"glyphicon-inbox"
              },{
                  name:"订餐订单管理",
                  key:"order",
                  className:"glyphicon-shopping-cart"
              },{
                  name:"公告管理",
                  key:"notice",
                  className:"glyphicon-list"
              },{
                  name:"系统配置",
                  key:"config",
                  className:"glyphicon-asterisk"
              }
          ]
      }
    },
    ready: function () {

    }
});

});
