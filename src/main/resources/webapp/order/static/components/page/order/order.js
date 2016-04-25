define('components/page/order/order', function(require, exports, module) {

/**
 * Created by jack on 2015/12/2.
 */
var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div class=\"mui-content page-order\">\n\n    <div class=\"navbar\">\n        <div class=\"bd\" style=\"height: 100%;\">\n            <div class=\"weui_tab\">\n                <div class=\"weui_navbar\">\n                    <div :class=\"{weui_bar_item_on:view=='food'}\" @click=\"onChangeView('food')\" class=\"weui_navbar_item \">\n                        我要订餐\n                    </div>\n                    <div :class=\"{weui_bar_item_on:view=='goods'}\" @click=\"onChangeView('goods')\"  class=\"weui_navbar_item\">\n                        我要订货\n                    </div>\n                </div>\n                <div class=\"weui_tab_bd\">\n\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div v-show=\"view=='food'\">\n        <div class=\"weui_cells_title\">预订日期</div>\n        <form class=\"mui-input-group\">\n            <div class=\"mui-input-row mui-radio\" v-for=\"d in date\">\n                <label :for=\"d.value\">{{d.value}} {{d.week}}</label>\n                <input name=\"date\" type=\"radio\"  v-model=\"params.mdate\"  :value=\"d.value\" :id=\"d.value\">\n            </div>\n        </form>\n        <div class=\"weui_cells_title\">预订人数</div>\n        <div class=\"mui-input-row mui-input-range\" style=\"padding-left: 20px;\">\n            <h4 class=\"p-number\"><span>{{params.num}}</span> 人</h4>\n            <input type=\"range\" id=\"block-range\" value=\"5\" min=\"1\" max=\"20\" data-input-slider=\"4\" v-model=\"params.num\">\n        </div>\n        <div class=\"weui_cells_title\">预订餐次</div>\n        <div class=\"mui-card\">\n            <ul class=\"mui-table-view\">\n                <li class=\"mui-table-view-cell\"  >\n                    <a class=\"mui-navigate-right\" @click=\"onSelect('lunch')\"  :class=\"{disabled:!lunch}\" >\n                        午餐 <span v-show=\"!lunch\">(今日已过期)</span>\n                    </a>\n                </li>\n                <li class=\"mui-table-view-cell\"  >\n                    <a  class=\"mui-navigate-right\"  @click=\"onSelect('dinner')\"  :class=\"{disabled:!dinner}\"  >\n                        晚餐 <span v-show=\"!dinner\">(今日已过期)</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div v-show=\"view=='goods'\">\n        <div class=\"weui_cells_title\">预订日期</div>\n        <ul class=\"mui-table-view\">\n            <li class=\"mui-table-view-cell\" v-for=\"d in gDate\">\n                <a v-link=\"{path:'/order/goods/'+d.value}\" class=\"mui-navigate-right\">\n                   {{d.value}} {{d.week}}\n                </a>\n\n            </li>\n        </ul>\n    </div>\n\n</div>\n\n<c-nav view=\"order\"></c-nav>\n",
    data: function () {
        return {
            date:[],
            gDate:[],
            params:{
                mtime:"",
                mdate:"",
                num:5
            },
            gParams:{
                mdate:""
            },
            lunch:true,
            dinner:true,
            view:"food"
        }
    },
    methods:{
        render: function () {
            this.renderDate();
            this.renderGDate();
        },
        renderDate: function () {
            layer.open({type:2});
            var self = this;
            Service.getDate({max:this.$root.config.pre},function (date) {
                self.date = date;
                self.params.mdate = date[0].value;
                layer.closeAll();
            })
        },
        renderGDate: function () {
            layer.open({type:2});
            var self = this;
            Service.getCtx("dh_config", function (rep) {
                var max = rep.config.pre||3;
                Service.getDate({max:max},function (date) {
                    self.gDate = date;
                    self.gParams.mdate = date[0].value;
                    layer.closeAll();
                })
            });

        },

        onSelect: function (type) {
            this.params.mtime = type;
            if(this[type]){
                router.go({name:"table",params:{mtime:this.params.mtime,mdate:this.params.mdate,num:this.params.num}});
            }
        },
        check: function (mt) {
            var config = this.$root.config;
            var t  = config[mt];
            var now = (new Date()).Format("hh:mm"),last = t.lastOrder;
            return parseInt((now.split(":")[0]*60+now.split(":")[1]*1)) <parseInt( (last.split(":")[0]*60+ last.split(":")[1]*1))
        },
        onChangeView: function (v) {
            this.view = v;
        }

    },
    watch:{
        "params.mdate": function (v) {
            var index = 0;
            for (var i = 0; i < this.date.length; i++) {
                var obj = this.date[i];
                if(obj.value == v){
                    index = i;
                }
            }

            if(index==0){
                this.lunch = this.check("lunch");
                this.dinner = this.check("dinner");
            }else{
                this.lunch = true;
                this.dinner = true;
            }

        }
    },
    ready: function () {
        this.render();
    }
});

});
