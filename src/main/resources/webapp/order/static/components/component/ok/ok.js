define('ok/ok', function(require, exports, module) {

/**
 * Created by jack on 16/4/25.
 */

var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-ok",{
    template:"<div class=\"container\" ><div class=\"msg\">\n    <div class=\"weui_msg\">\n        <div class=\"weui_icon_area\"><i class=\"weui_icon_success weui_icon_msg\"></i></div>\n        <div class=\"weui_text_area\">\n            <h2 class=\"weui_msg_title\">操作成功</h2>\n            <p class=\"weui_msg_desc\">{{content}}</p>\n        </div>\n        <div class=\"weui_opr_area\">\n            <p class=\"weui_btn_area\">\n                <a href=\"javascript:;\" class=\"weui_btn weui_btn_primary\" @click=\"onClick\">确定</a>\n                <!--<a href=\"javascript:;\" class=\"weui_btn weui_btn_default\">取消</a>-->\n            </p>\n        </div>\n        <!--<div class=\"weui_extra_area\">-->\n            <!--<a href=\"\">查看详情</a>-->\n        <!--</div>-->\n    </div>\n</div>\n",
    props:["content"],
    methods:{
        onClick: function () {
            this.$dispatch("ok-click");
        }
    }
});

});
