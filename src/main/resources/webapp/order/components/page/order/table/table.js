define('components/page/order/table/table', function(require, exports, module) {

/**
 * Created by jack on 2015/12/2.
 */
var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var L = require("component_modules/leaflet-src.js");
require("component_modules/leaflet.zoomify.js");
require("component_modules/leaflet.draw-src.js");
var nav = require("nav/nav.js");

module.exports = Vue.extend({
    template:"<div class=\"mui-content\" id=\"map\" :style=\"{height:height+'px'}\">\n</div>\n<c-nav view=\"order\"></c-nav>",
    data: function () {
        return {
            height:document.documentElement.clientHeight-52,
            type:0,
            scale:1,
            params:{
                mtime:"",
                mdate:"",
                num:0
            },
            table:{}
        }
    },
    methods:{
        render: function () {
            this.renderMap();
        },
        renderMap: function () {
            var w = 2484,h = 3512;
            var self = this;
            this.map = new L.map("map",{
                center:[0,0],
                zoom:2,
                minZoom:0,
                maxZoom:3,
                attributionControl:false
            });

            L.tileLayer.zoomify('./admin/static/images/tables/', {
                width: w,
                height: h,
                tolerance: 0.8,
                attribution: '二楼小餐厅分布图'
            }).addTo(this.map);

            this.featureLayer = new L.featureGroup().addTo(this.map);

            this.map.on("zoomstart", function () {
                self.map.removeLayer(self.featureLayer);
            });
            this.map.on("zoomend", function () {
                self.featureLayer.addTo(self.map);
            });

        },
        renderTable: function () {
            layer.open({type:2});
            var self = this;
            this.featureLayer.clearLayers();
            Service.getTables({mdate:this.params.mdate,mtime:this.params.mtime},function (data) {

                data.forEach(function (t) {
                    self.renderHot(t);
                });
                layer.closeAll();
            });
        },
        getStateColor: function (state) {
            switch (state){
                case 1:return "#000";break;
                default:return "blue";
            }
        },
        renderHot: function (data) {
            var self = this,feature="";
            if(data.table.position.type == "rectangle"){
                feature = new L.rectangle(data.table.position.latlngs,{weight:1,fillColor:this.getStateColor(data.state),fillOpacity:0.4,data:data}).addTo(this.featureLayer);

            }else{
                feature = new L.circle(data.table.position.latlng,data.table.position.radius,{weight:1,fillColor:this.getStateColor(data.state),data:data}).addTo(this.featureLayer);
            }
            feature.on("click", function () {
                self.table = this.options.data.table;
                if(this.options.data.user){
                    layer.open({
                        content:"该桌已被<strong> "+this.options.data.user.name +" </strong>预定!",
                        btn: ['确认'],
                        shadeClose: false,
                        yes: function(){
                            layer.closeAll();
                        }
                    });
                }else{
                    layer.open({
                        title:"订单确认",
                        content: self.getDialogInfo(),
                        btn: ['确认', '取消'],
                        shadeClose: false,
                        yes: function(){
                            self.order();
                        }, no: function(){
                        }
                    });
                }

            });

        },
        getDialogInfo: function () {
            return this.$interpolate("<table class='table-info'>" +
                "<tr><td>日期:</td><td>{{params.mdate}}</td></tr>" +
                "<tr><td>餐次:</td><td>{{params.mtime=='lunch'?'午餐':'晚餐'}}</td></tr>" +
                "<tr><td>人数:</td><td>{{params.num}}人</td></tr>" +
                "<tr><td>桌位:</td><td>{{table.type==0?'大厅':'包厢'}}{{table.no}}号</td></tr>" +
                "</table>");
        },
        order: function () {
            var self = this;
            Service.orderTable(this.table._id,JSON.stringify({
                mtime:this.params.mtime,
                mdate:this.params.mdate,
                number:parseInt(this.params.num),
                menu:[]
            }), function (rep) {
                layer.open({
                    content:"预定成功!",
                    btn:["马上去点菜"],
                    shadeClose:false,
                    yes: function () {
                        layer.closeAll();
                        store.getOrders();
                        self.$router.go("/list");
                    }
                });
            })
        }
    },
    events:{
    },
    watch:{
        "params":{
            deep:true,
            handler: function () {
                this.renderTable();
            }
        }
    },
    route:{
        data: function (transition) {
            this.params = Object.assign(this.params,transition.to.params);
            transition.next();
        }
    },
    ready: function () {
        this.render();

    }
});

});
