define('components/page/table/table', function(require, exports, module) {

/**
 * Created by jack on 16/4/3.
 */

var Vue = require("component_modules/vue.js");
var L = require("component_modules/leaflet-src.js");
var Service = require("main/service.js");
require("component_modules/leaflet.zoomify.js");
require("component_modules/leaflet.draw-src.js");
require("form/form.js");

var model = {
    _id:"",
    type:0,
    no:0,
    position:"",
    seat:0,
    visible:1
};

module.exports = Vue.extend({
    template:"\n<div class=\"panel panel-default page-wrap content\">\n    <div class=\"panel-heading\">\n\n        <ul class=\"nav nav-pills pull-left\">\n            <li role=\"presentation\" :class=\"{active:view=='map'}\"><a href=\"javascript:;\" @click=\"onChangeView('map')\">\n                地图</a></li>\n            <li role=\"presentation\"  :class=\"{active:view=='grid'}\"><a href=\"javascript:;\" @click=\"onChangeView('grid')\">\n                表格</a></li>\n        </ul>\n\n        <div class=\"dropdown pull-right\" v-show=\"view=='map'\">\n            <a class=\"btn dropdown-toggle\" type=\"button\" id=\"dropdownMenu1\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">\n                新增热区\n                <span class=\"caret\"></span>\n            </a>\n            <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\">\n                <li><a href=\"javascript:;\" @click=\"onAddRect\" >\n                    <span class=\"glyphicon glyphicon-stop\"></span>\n                    &nbsp;矩形</a></li>\n                <li><a href=\"javascript:;\" @click=\"onAddCircle\">\n                    <span class=\"glyphicon glyphicon-record\"></span>\n                    &nbsp;圆形</a></li>\n            </ul>\n        </div>\n    </div>\n    <div class=\"panel-body\" v-show=\"view=='grid'\">\n        <table class=\"table table-bordered table-hover\">\n            <tbody>\n            <tr>\n                <th>\n                    #\n                </th>\n                <th>\n                    编号\n                </th>\n                <th>\n                    类型\n                </th>\n                <th>\n                    座位数\n                </th>\n                <th>\n                    位置\n                </th>\n                <th>\n                    状态\n                </th>\n                <th>\n                    操作\n                </th>\n            </tr>\n\n            <tr v-for=\"t in tables\">\n                <td>\n                    {{$index+1}}\n                </td>\n                <td>\n                    {{t.no}}\n                </td>\n                <td>\n                    {{t.type==0?\"包厢\":\"大厅\"}}\n                </td>\n                <td>\n                    {{t.seat}}\n                </td>\n                <td>\n                    <a href=\"javascript:;\" @click=\"goTo(t._id)\">查看</a>\n                </td>\n                <td>\n                    {{t.visible==0?\"预留\":\"启用\"}}\n                </td>\n                <td>\n                    <a href=\"\">编辑</a>\n                    <a href=\"javascript:;\" @click=\"onDelTable(t)\">删除</a>\n                </td>\n            </tr>\n\n            </tbody></table>\n        <div class=\"c-pager\">\n            <p class=\"pull-left\">共 11 条记录，每页 20 条 1/1 </p>\n\n            <ul  class=\"pagination pagination-sm\">\n                <li>\n                </li>\n                <li>\n                    <a href=\"#\" aria-label=\"Previous\">\n                        <span class=\"glyphicon glyphicon-step-backward\"></span>\n                    </a>\n                </li>\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-triangle-left\"></span></a></li>\n                <li><a href=\"#\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a></li>\n\n                <li>\n                    <a href=\"#\" aria-label=\"Next\">\n                        <span class=\"glyphicon glyphicon-step-forward\"></span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div class=\"panel-body\" id=\"map\" v-show=\"view=='map'\">\n\n    </div>\n\n\n    <c-form :config=\"modal\" @submit=\"onSubmit\">\n        <validator name=\"valid\">\n            <form class=\"form-horizontal\" novalidate >\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\" :class=\"{'has-warning':$valid.no.invalid&&$valid.no.touched}\"  >编号</label>\n                    <div class=\"col-sm-10\" :class=\"{'has-warning':$valid.no.invalid&&$valid.no.touched}\">\n                        <input type=\"number\" class=\"form-control\" placeholder=\"必填\" v-validate:no=\"['required']\" v-model=\"model.no\" number>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\">类别</label>\n                    <div class=\"col-sm-10\">\n                        <select class=\"form-control\" v-model=\"model.type\" number>\n                            <option value=\"0\">包厢</option>\n                            <option value=\"1\">大厅</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\" :class=\"{'has-warning':$valid.seat.invalid&&$valid.seat.touched}\" >座位数</label>\n                    <div class=\"col-sm-10\" :class=\"{'has-warning':$valid.seat.invalid&&$valid.seat.touched}\">\n                        <input type=\"number\" class=\"form-control\" placeholder=\"必填\" v-model=\"model.seat\" v-validate:seat=\"['required']\" number>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-sm-2 control-label\">状态</label>\n                    <div class=\"col-sm-10\">\n                        <select class=\"form-control\" v-model=\"model.visible\" number>\n                            <option value=\"0\">预留</option>\n                            <option value=\"1\">启用</option>\n                        </select>\n                    </div>\n                </div>\n            </form>\n        </validator>\n    </c-form>\n\n</div>\n",
    data: function () {
        return {
            view:"map",
            modal:{
                title:"新增餐桌",
                show:false
            },
            tables:[],
            count:0,
            model:$.extend({},model)
        }
    },
    methods:{
        render: function () {
            var self = this;
            self.renderMap();
            self.renderTable();
        },
        renderMap: function () {
            var w = 2484,h = 3512;
            this.map = new L.map("map",{
                center:[0,0],
                zoom:2,
                minZoom:0,
                maxZoom:3,
                attributionControl:false
            });

            L.tileLayer.zoomify('./static/images/tables/', {
                width: w,
                height: h,
                tolerance: 0.8,
                attribution: '二楼小餐厅分布图'
            }).addTo(this.map);

            this.featureLayer = new L.featureGroup().addTo(this.map);

            this.map.on("click", function (e) {
            });

            this.initDraw();
        },
        renderTable: function () {
            layer.load();
            var self = this;
            Service.getTable(function (rep) {

                self.tables = rep.lists;
                self.count = rep.count;
                self.featureLayer.clearLayers();
                self.tables.forEach(function (d) {
                    self.renderHot(d);
                });
                layer.closeAll();
            });
        },
        renderHot: function (data) {
            var self = this,feature;
            if(data.position.type == "rectangle"){
                feature = new L.rectangle(data.position.latlngs,{weight:1,data:data}).addTo(this.featureLayer);
                feature.on("click", function () {
                    this.options.data.position.latlngs = this._latlngs;
                    self.model = $.extend(self.model,this.options.data);
                    self.modal.title="更新餐桌";
                    self.modal.show = true;
                });

            }else{
                feature = new L.circle(data.position.latlng,data.position.radius,{weight:1,data:data}).addTo(this.featureLayer);
                feature.on("click", function () {
                    this.options.data.position.latlng = this._latlng;
                    this.options.data.position.radius = this._mRadius;
                    self.model = $.extend(self.model,this.options.data);
                    self.modal.title="更新餐桌";
                    self.modal.show = true;
                });
            }

            feature.editing.enable();


        },
        onAddRect: function () {
            this.drawRectangle.enable();
        },
        onAddCircle: function () {
            this.drawCircle.enable();
        },
        initDraw: function () {
            this.drawCircle = new L.Draw.Circle(this.map,{shapeOptions:{editable:true}});
            this.drawRectangle = new L.Draw.Rectangle(this.map,{shapeOptions:{editable:true}});

            var self = this;
            this.map.on("draw:created", function (t) {
                self.featureLayer.addLayer(t.layer);
                if(t.layerType == "circle"){
                    debugger
                    self.addTable({type: t.layerType,latlng: t.layer._latlng,radius: t.layer._mRadius});
                }else{
                    self.addTable({type: t.layerType,latlngs: t.layer._latlngs});
                }
            })
        },
        addTable: function (position) {
            this.modal.title = "新增餐桌";
            this.modal.show = true;
            this.model.position = position;
        },
        onDelTable: function (t) {
            var self = this;
            layer.confirm("确定删除该餐桌?",{btn:["确定","取消"]}, function () {
                Service.delTable(t._id, function () {
                    self.tables.$remove(t);
                    layer.closeAll();
                });
            });
        },
        onSubmit:function(){
            if(this.$valid.valid){
                layer.load(1);
                this.submit();
            }else{
                this.$validate(true);
            }
        },
        submit: function () {
            var self = this;
            layer.load();
            if(this.model._id){
                Service.updateTable(this.model._id,JSON.stringify(this.model), function (rep) {
                    self.renderTable();
                    layer.closeAll();

                });
            } else{
                Service.addTable(JSON.stringify(this.model), function (rep) {
                    self.renderTable();
                    layer.closeAll();

                })
            }
            this.modal.show = false;
        },
        goTo: function (id) {
            var self = this;
            this.view = "map";
            Vue.nextTick(function () {
                self.featureLayer.eachLayer(function (layer) {
                    if(id == layer.options.data._id){
                        setTimeout(function () {
                            self.map.setView(layer.getBounds().getCenter(),3);
                        },200);
                    }
                })
            });
        },
        onChangeView: function (v) {
            this.view = v;
        }
    },
    ready: function () {
        this.render();
    }
});

});
