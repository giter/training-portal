define('components/page/gOrder/order', function(require, exports, module) {

/**
 * Created by jack on 16/4/4.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

require("form/form.js");



module.exports = Vue.extend({
    template:"<div class=\"page-menu\">\n    <div class=\"panel panel-default  content\">\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" class=\"active\"><a href=\"#\">\n                    订单</a></li>\n            </ul>\n\n        </div>\n        <div class=\"panel-body\">\n            <div class=\"form-inline\">\n                <div class=\"form-group\">\n                    <label>日期</label>\n                    <input id=\"mdate\" type=\"text\" class=\"form-control\" @click=\"onDateClick\" v-model=\"query.mdate\" placeholder=\"请选择\">\n                </div>\n                <a href=\"javascript:;\" class=\"btn btn-default\" @click=\"onQuery\">\n                    <span class=\"glyphicon glyphicon-search\"></span>\n                    查询</a>\n            </div>\n            <hr>\n            <table class=\"table table-bordered table-hover\">\n                <tbody>\n                <tr>\n                    <th>\n                        #\n                    </th>\n                    <th>\n                        取货时间\n                    </th>\n                    <th>\n                        下单人\n                    </th>\n                    <th>\n                        下单时间\n                    </th>\n                    <th>\n                        订单详情\n                    </th>\n                    <th>\n                        操作\n                    </th>\n                </tr>\n                <tr v-for=\"o in orders\" track-by=\"_id\">\n                    <td>{{$index+1 + 10*query.page}}</td>\n                    <td>{{o.mdate}}</td>\n                    <td>{{o.user.name}}</td>\n                    <td>{{(new Date(o.created)).Format(\"yyyy-MM-dd hh:mm\")}}</td>\n                    <td><a v-link=\"{path:'/order/goods/'+o._id}\" >查看</a></td>\n                    <td><a @click=\"onCancel(o)\" href=\"javascript:;\">取消订单</a></td>\n                </tr>\n                </tbody></table>\n            <div class=\"c-pager\">\n                <p class=\"pull-left\">共 {{count}} 条记录，每页 10 条 {{query.page+1}}/{{Math.ceil(count/10)}} </p>\n\n                <ul  class=\"pagination pagination-sm\">\n                    <li>\n                    </li>\n                    <!--<li>-->\n                    <!--<a href=\"#\" aria-label=\"Previous\">-->\n                    <!--<span class=\"glyphicon glyphicon-step-backward\"></span>-->\n                    <!--</a>-->\n                    <!--</li>-->\n                    <li><a href=\"javascript:;\" :disabled=\"query.page==0\" @click=\"toPre\"><span class=\"glyphicon glyphicon-triangle-left\"></span></a></li>\n                    <li><a href=\"javascript:;\" @click=\"toNext\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a></li>\n\n                    <!--<li>-->\n                    <!--<a href=\"#\" aria-label=\"Next\">-->\n                    <!--<span class=\"glyphicon glyphicon-step-forward\"></span>-->\n                    <!--</a>-->\n                    <!--</li>-->\n                </ul>\n            </div>\n        </div>\n    </div>\n\n\n\n\n</div>\n",
    data: function () {
        return {
            orders:[],
            count:0,
            query:{
                page:0,
                limit:10,
                mdate:"",
                sorts:'{"mdate":-1}'
            }
        }
    },
    methods:{
        render: function () {
            this.renderOrders();
        },
        renderOrders: function () {
            var self = this;
            layer.load();
            this.query.mdate = $("#mdate").val();
            var query = JSON.parse(JSON.stringify(this.query));
            for(var i in query){
                if(!query[i]){
                    delete query[i];
                }
            }

            Service.getGoodsOrder(query,function (rep) {
                self.orders = rep.lists;
                self.count = rep.count;
                layer.closeAll();
            })
        },
        onDateClick: function () {
            var self = this;
            laydate({istime: true, format: 'YYYY-MM-DD',choose: function (datas) {
                self.query.mdate = datas;
            }});
        },
        onQuery: function () {
            this.query.page = 0;
            this.renderOrders();
        },
        onCancel: function (o) {
            var self = this;
            layer.confirm("是否取消该订单?",{btn:["确定","取消"]}, function () {
                Service.delGoodsOrder(o._id,function (rep) {
                    layer.closeAll();
                    layer.alert("取消成功!");
                    self.orders.$remove(o);
                })
            });
        },
        toPre: function () {
           if(this.query.page>0){
               this.query.page--;
               this.renderOrders();
           }
        },
        toNext: function () {
            if(this.query.page < Math.ceil(this.count/10)-1){
                this.query.page++;
                this.renderOrders();
            }
        }
    },
    ready: function () {
        this.render();
    }
});

});
