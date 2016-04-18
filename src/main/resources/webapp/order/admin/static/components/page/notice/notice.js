define('components/page/notice/notice', function(require, exports, module) {

/**
 * Created by jack on 16/3/30.
 */

var Vue = require("component_modules/vue.js");
var nav = require("nav/nav.js");

require("form/form.js");

var Service = require("main/service.js");

module.exports = Vue.extend({
    template:"<div class=\"page-notice\">\n    <div class=\"panel panel-default  content\">\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" class=\"active\"><a href=\"#\">\n                    公告</a></li>\n            </ul>\n            <a v-link=\"{path:'add',append:true}\" class=\"btn pull-right\">\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                新增\n            </a>\n        </div>\n        <div class=\"panel-body\">\n            <table class=\"table table-bordered table-hover\">\n                <tbody>\n                <tr>\n                    <th>\n                        #\n                    </th>\n                    <th>标题\n                    </th>\n                    <th>\n                        发布时间\n                    </th>\n                    <th>\n                        发布人\n                    </th>\n                    <th>\n                        是否置顶\n                    </th>\n                    <th>\n                        操作\n                    </th>\n                </tr>\n                <tr v-for=\"n in notices\">\n                    <td>\n                        {{$index+1}}\n                    </td>\n                    <td>\n                        {{n.title}}\n                    </td>\n                    <td>\n                        {{(new Date(n.updated).Format(\"yyyy-MM-dd hh:mm\"))}}\n                    </td>\n                    <td>\n                        {{n.user}}\n                    </td>\n                    <td>\n                        {{n.top?'是':'否'}}\n                    </td>\n                    <td>\n                        <a v-link=\"{path:'add?id='+n._id,append:true}\">编辑</a>\n                        <a href=\"javascript:;\" @click=\"onDel(n)\">删除</a>\n                    </td>\n                </tr>\n                </tbody></table>\n            <!--<div class=\"c-pager\">-->\n                <!--<p class=\"pull-left\">共 {{notices.length}} 条记录，每页 10 条 1/1 </p>-->\n\n                <!--<ul  class=\"pagination pagination-sm\">-->\n                    <!--<li>-->\n                    <!--</li>-->\n                    <!--<li>-->\n                        <!--<a href=\"#\" aria-label=\"Previous\">-->\n                            <!--<span class=\"glyphicon glyphicon-step-backward\"></span>-->\n                        <!--</a>-->\n                    <!--</li>-->\n                    <!--<li><a href=\"#\"><span class=\"glyphicon glyphicon-triangle-left\"></span></a></li>-->\n                    <!--<li><a href=\"#\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a></li>-->\n\n                    <!--<li>-->\n                        <!--<a href=\"#\" aria-label=\"Next\">-->\n                            <!--<span class=\"glyphicon glyphicon-step-forward\"></span>-->\n                        <!--</a>-->\n                    <!--</li>-->\n                <!--</ul>-->\n            <!--</div>-->\n        </div>\n    </div>\n    <!--<c-form :show=\"modalShow\" >-->\n\n        <!--<form class=\"form-horizontal\">-->\n            <!--<div class=\"form-group\" v-for=\"m in model\" v-show=\"m.type != 'hidden'\">-->\n                <!--<label class=\"col-sm-2 control-label\">{{m.name}}</label>-->\n                <!--<div class=\"col-sm-10\">-->\n                    <!--{{getStr}}-->\n                <!--</div>-->\n            <!--</div>-->\n        <!--</form>-->\n\n    <!--</c-form>-->\n\n</div>\n",
    data: function () {
        return {
            notices:[],
            count:0,
            modal:{
                show:false
            }
        }
    },
    methods:{
        render:function (){
            this.renderList();
        },
        renderList: function () {
            var self = this;
            Service.getNotices(function (rep) {
                self.count = rep.count;
                self.notices = rep.lists;
            });
        },
        onDel: function (n) {
            var self = this;
            layer.confirm("是否删除该通知?",{btn:["确定","取消"]}, function () {
                self.notices.$remove(n);
                self.delNotice(n._id,function (rep) {
                    alert("删除成功!");
                    layer.closeAll();
                })
            });
        },
        delNotice: function (id,callback) {
            Service.delNotice(id,callback);
        }
    },
    ready: function () {
        this.render();
    }
});

});
