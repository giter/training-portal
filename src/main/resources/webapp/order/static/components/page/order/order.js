define('components/page/order/order', function(require, exports, module) {

/**
 * Created by jack on 2015/12/2.
 */
var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div class=\"mui-content page-order\">\n\n    <div class=\"navbar\">\n        <div class=\"bd\" style=\"height: 100%;\">\n            <div class=\"weui_tab\">\n                <div class=\"weui_navbar\">\n                    <div :class=\"{weui_bar_item_on:view=='food'}\" @click=\"onChangeView('food')\" class=\"weui_navbar_item \">\n                        我要订餐\n                    </div>\n                    <div :class=\"{weui_bar_item_on:view=='goods'}\" @click=\"onChangeView('goods')\"  class=\"weui_navbar_item\">\n                        我要订货\n                    </div>\n                </div>\n                <div class=\"weui_tab_bd\">\n\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div v-show=\"view=='food'\">\n        <div class=\"weui_cells_title\">预订日期</div>\n        <form class=\"mui-input-group\">\n            <div class=\"mui-input-row mui-radio\" v-for=\"d in date\" @click=\"selectWeek(d.week)\">\n                <label :for=\"d.value\">{{d.value}} {{d.week}}</label>\n                <input name=\"date\" type=\"radio\"  v-model=\"params.mdate\"  :value=\"d.value\" :id=\"d.value\">\n            </div>\n        </form>\n        <div class=\"weui_cells_title\">就餐人数</div>\n        <div class=\"mui-input-row mui-input-range\" style=\"padding-left: 20px;\">\n            <h4 class=\"p-number\"><span class=\"number-tiaodong\">{{params.num}}</span> 人</h4>\n            <input type=\"range\" id=\"block-range\" value=\"4\" min=\"1\" max=\"20\" data-input-slider=\"4\" v-model=\"params.num\">\n        </div>\n        <div class=\"weui_cells_title\">预订餐次</div>\n        <div class=\"mui-card\">\n            <ul class=\"mui-table-view\">\n                <li class=\"mui-table-view-cell\" v-if=\"lunchShow\"  >\n                    <a class=\"mui-navigate-right\" @click=\"onSelect('lunch')\"  :class=\"{disabled:!lunch}\" >\n                        午餐 <span v-show=\"!lunch\">(今日已过期)</span>\n                    </a>\n                </li>\n                <li class=\"mui-table-view-cell\" v-if=\"dinnerShow\"  >\n                    <a  class=\"mui-navigate-right\"  @click=\"onSelect('dinner')\"    :class=\"{disabled:!dinner}\"  >\n                        晚餐 <span v-show=\"!dinner\">(今日已过期)</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div v-show=\"view=='goods'\">\n        <div v-if=\"canDH\">\n            <div v-if=\"!hasDH\">\n                <div class=\"weui_cells_title\">取货日期</div>\n                <form class=\"mui-input-group\">\n                    <div class=\"mui-input-row mui-radio\" v-for=\"d in gDate\" @click=\"selectDHdate(d)\">\n                        <label :for=\"d.week\">{{d.value}} {{d.week}}</label>\n                        <input name=\"date\" type=\"radio\"  v-model=\"gParams.mdate\"  :value=\"d.value\" :id=\"d.week\">\n                    </div>\n                </form>\n                <div class=\"weui_cells_title\">取货时间</div>\n                <div class=\"mui-card\">\n                    <ul class=\"mui-table-view\">\n                        <li class=\"mui-table-view-cell\" v-if=\"selectDH.mtime.morning\" >\n                            <a  v-if=\"!checkHasOrder(selectDH,'morning')\" v-link=\"{path:'/goods/'+selectDH.value +'/morning/all'}\" class=\"mui-navigate-right\" >\n                                上午\n                            </a>\n                            <a href=\"javascript:;\" v-else >\n                                上午   <span class=\"mui-badge \">已预订</span>\n                            </a>\n\n                        </li>\n                        <li class=\"mui-table-view-cell\" v-if=\"selectDH.mtime.noon\"   >\n                            <a  v-if=\"!checkHasOrder(selectDH,'noon')\" v-link=\"{path:'/goods/'+selectDH.value +'/noon/all'}\"  class=\"mui-navigate-right\" >\n                                中午\n                            </a>\n                            <a href=\"javascript:;\" v-else >\n                                中午   <span class=\"mui-badge \">已预订</span>\n                            </a>\n                        </li>\n                        <li class=\"mui-table-view-cell\" v-if=\"selectDH.mtime.afternoon\"   >\n                            <a  v-if=\"!checkHasOrder(selectDH,'afternoon')\"  v-link=\"{path:'/goods/'+selectDH.value +'/afternoon/all'}\"  class=\"mui-navigate-right\" >\n                                下午\n                            </a>\n                            <a href=\"javascript:;\" v-else >\n                                下午   <span class=\"mui-badge\">已预订</span>\n                            </a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n            <div v-else>\n                <ul class=\"mui-table-view\">\n                    <li class=\"mui-table-view-cell\" style=\"text-align: center\">\n                        您本周已经订货。\n                    </li>\n                </ul>\n\n                <div class=\"mui-content-padded\">\n                    <a class=\"mui-btn mui-btn-block mui-btn-success\" v-link=\"{path:'/list/goods'}\" >查看订单</a>\n                </div>\n            </div>\n        </div>\n        <div v-if=\"!canDH\">\n            <ul class=\"mui-table-view\">\n                <li class=\"mui-table-view-cell\" style=\"text-align: center\">\n                    本周开放预定已经结束,请下周预定。\n                </li>\n            </ul>\n        </div>\n        <!--<ul class=\"mui-table-view\">-->\n        <!--<li class=\"mui-table-view-cell\" v-for=\"d in gDate\">-->\n        <!--<a v-link=\"{path:'/goods/'+d.value +'/all'}\" class=\"mui-navigate-right\">-->\n        <!--{{d.value}} {{d.week}}-->\n        <!--</a>-->\n        <!--</li>-->\n        <!--</ul>-->\n    </div>\n\n</div>\n\n<c-nav view=\"order\"></c-nav>\n",
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
            selectDH:{
                mtime:{}
            },
            canDH:true,
            lunch:true,
            dinner:true,
            lunchShow:true,
            dinnerShow:true,
            view:"food",
            goods:store.state,
            hasDH:false
        }
    },
    methods:{
        render: function () {
            this.renderDate();
            this.renderGDate();
            this.selectWeek();
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

                    Service.getDate({max:7},function (date) {
                        self.canDH = self.checkDh(rep.config);
                        self.gDate = self.getGDate(rep,date);
                        if(self.gDate.length>0){
                            self.gParams.mdate = self.gDate[0].value;
                            self.selectDH = self.gDate[0];
                        }
                        layer.closeAll();
                    })


            });

        },
        selectDHdate: function (obj) {
            this.selectDH = obj;
        },
        checkDh: function (config) {
            var begin = new Date();
            var w = begin.getDay();
            if(w > config.end.week){
                return false;
            }

            begin.setDate(begin.getDate()+config.begin.week - w);
            var b = config.begin.time.split(":");
            begin.setHours(parseInt(b[0]));
            var bstr = begin.setMinutes(parseInt(b[1]));


            var end = new Date();
            end.setDate(end.getDate()+config.end.week - w);
            var e = config.end.time.split(":");
            end.setHours(parseInt(e[0]));
            var estr = end.setMinutes(parseInt(e[1]));

            var nowstr = new Date().getTime();
            if(bstr < nowstr && nowstr < estr){
                return true;
            }else{
                return false;
            }
        },
        getGDate: function (data,date) {
            var weeks = data.config.week,list = [];

            for (var i = 0; i < date.length; i++) {
                var obj = date[i];
                for(var w in weeks){
                    if(obj.week == this._weekName(w)){
                        if(weeks[w]["afternoon"]||weeks[w]["noon"]||weeks[w]["morning"]){
                            obj["mtime"] = weeks[w];
                            list.push(obj);
                        }
                    }

                }
            }
            return list;


        },
        _weekName: function (w) {
            switch (parseInt(w)){
                case 0:{
                    return "周日";
                }break;
                case 1:{
                    return "周一";
                }break;
                case 2:{
                    return "周二";
                }break;
                case 3:{
                    return "周三";
                }break;
                case 4:{
                    return "周四";
                }break;
                case 5:{
                    return "周五";
                }break;
                case 6:{
                    return "周六";
                }break;
            }
        },
        onSelect: function (type) {
            this.params.mtime = type;
            if(this[type]){
                this.$router.go({name:"table",params:{mtime:this.params.mtime,mdate:this.params.mdate,num:this.params.num}});
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
        },
        hasConfig: function (type,w) {
            var config = this.$root.config;
            return config.week[w][type];
        },
        selectWeek: function (v) {

            var w = (new Date).getDay();
            switch (v){
                case "周日":{
                    w = 0;
                }break;
                case "周一":{
                    w = 1;
                }break;
                case "周二":{
                    w = 2;
                }break;
                case "周三":{
                    w = 3;
                }break;
                case "周四":{
                    w = 4;
                }break;
                case "周五":{
                    w = 5;
                }break;
                case "周六":{
                    w = 6;
                }break;
            }

            this.lunchShow = this.hasConfig("lunch",w);
            this.dinnerShow = this.hasConfig("dinner",w);
        },
        checkHasOrder: function (obj,mtime) {
            var goods = this.goods.goods;
            var bool = false;
            goods.forEach(function (g) {
                if(g.state == 1){
                    if(g.mdate == obj.value&& g.mtime == mtime){
                        bool = true;
                    }

                }
            });
            return bool;
        },
        checkHasDh: function (goods) {
            var bool = false;
            goods.forEach(function (g) {
                if(g.state == 1){
                    bool =true;
                }
            });
            this.hasDH = bool;
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

        },
        goods:{
            deep:true,
            handler: function (state) {
                this.checkHasDh(state.goods);

            }
        }
    },
    route:{
        data: function () {
            this.checkHasDh(this.goods.goods);
        }
    },
    ready: function () {
        this.render();
    }
});

});
