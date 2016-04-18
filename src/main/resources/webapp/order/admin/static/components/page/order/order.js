define('components/page/order/order', function(require, exports, module) {

/**
 * Created by jack on 16/4/4.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

require("form/form.js");



module.exports = Vue.extend({
    template:"<div class=\"page-menu\">\n    <div class=\"panel panel-default  content\">\n        <div class=\"panel-heading\">\n            <ul class=\"nav nav-pills pull-left\">\n                <li role=\"presentation\" class=\"active\"><a href=\"#\">\n                    订单</a></li>\n            </ul>\n            <a href=\"javascript:;\" class=\"btn pull-right\">\n                <span class=\"glyphicon glyphicon-plus\"></span>\n                新增\n            </a>\n        </div>\n        <div class=\"panel-body\">\n            <div class=\"form-inline\">\n                <div class=\"form-group\">\n                    <label>日期</label>\n                    <input type=\"text\" class=\"form-control\" @click=\"onDateClick\" v-model=\"query.mdate\" placeholder=\"请选择\">\n                </div>\n                <div class=\"form-group\">\n                    <label >餐次 </label>\n                    <select class=\"form-control\" v-model=\"query.mtime\">\n                        <option value=\"\">全部</option>\n                        <option value=\"lunch\">午餐</option>\n                        <option value=\"dinner\">晚餐</option>\n                    </select>\n                </div>\n                <button class=\"btn btn-default\" @click=\"onQuery\">\n                    <span class=\"glyphicon glyphicon-search\"></span>\n                    查询</button>\n            </div>\n            <hr>\n            <table class=\"table table-bordered table-hover\">\n                <tbody>\n                <tr>\n                    <th>\n                        #\n                    </th>\n                    <th>\n                        时间\n                    </th>\n                    <th>\n                        餐次\n                    </th>\n                    <th>\n                        下单人\n                    </th>\n                    <th>\n                        人数\n                    </th>\n                    <th>\n                        餐桌\n                    </th>\n                    <th>\n                        菜单\n                    </th>\n                    <th>\n                        操作\n                    </th>\n                </tr>\n                <tr v-for=\"o in orders\" track-by=\"_id\">\n                    <td>{{$index+1 + 10*query.page}}</td>\n                    <td>{{o.mdate}}</td>\n                    <td>{{o.mtime==\"dinner\"?\"晚餐\":\"午餐\"}}</td>\n                    <td>{{o.user.name}}</td>\n                    <td>{{o.number}}</td>\n                    <td>{{o.table.no}}</td>\n                    <td><a v-link=\"{path:'order/'+o._id}\" >查看</a></td>\n                    <td><a href=\"\">取消订单</a></td>\n                </tr>\n                </tbody></table>\n            <div class=\"c-pager\">\n                <p class=\"pull-left\">共 {{count}} 条记录，每页 10 条 {{query.page+1}}/{{Math.ceil(count/10)}} </p>\n\n                <ul  class=\"pagination pagination-sm\">\n                    <li>\n                    </li>\n                    <!--<li>-->\n                        <!--<a href=\"#\" aria-label=\"Previous\">-->\n                            <!--<span class=\"glyphicon glyphicon-step-backward\"></span>-->\n                        <!--</a>-->\n                    <!--</li>-->\n                    <li><a href=\"javascript:;\" :disabled=\"query.page==0\" @click=\"toPre\"><span class=\"glyphicon glyphicon-triangle-left\"></span></a></li>\n                    <li><a href=\"javascript:;\" @click=\"toNext\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a></li>\n\n                    <!--<li>-->\n                        <!--<a href=\"#\" aria-label=\"Next\">-->\n                            <!--<span class=\"glyphicon glyphicon-step-forward\"></span>-->\n                        <!--</a>-->\n                    <!--</li>-->\n                </ul>\n            </div>\n        </div>\n    </div>\n\n\n\n\n</div>\n",
    data: function () {
        return {
            orders:[],
            count:0,
            query:{
                page:0,
                limit:10,
                mtime:"",
                mdate:""
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
            var query = JSON.parse(JSON.stringify(this.query));
            for(var i in query){
                if(!query[i]){
                    delete query[i]
                }
            }
            Service.getOrders(query,function (rep) {
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
