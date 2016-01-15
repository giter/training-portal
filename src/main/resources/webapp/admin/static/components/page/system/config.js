define('components/page/system/config', function(require, exports, module) {

/**
 * Created by lee on 2015/11/16.
 */

var Vue = require("component_modules/vue");
var Service = require("main/service.js");


module.exports = Vue.extend({

   inherit:true,

   data: function () {
      return {
         data : {
            config: {
               advance: 7,
               end: {
                  '昌江': 12,
                  '海口': 1
               }
            },
            quota: {
               "海口": [
                  {week:"周一", least:3, percentage: 0.9, maximum: 11},
                  {week:"周二", least:3, percentage: 0.9, maximum: 11},
                  {week:"周三", least:3, percentage: 0.9, maximum: 11},
                  {week:"周四", least:3, percentage: 0.9, maximum: 11},
                  {week:"周五", least:3, percentage: 0.9, maximum: 11},
                  {week:"周六", least:3, percentage: 0.9, maximum: 11},
                  {week:"周日", least:3, percentage: 0.9, maximum: 11}
               ],
               "昌江": [
                  {week:"周一", least:3, percentage: 0.9, maximum: 11},
                  {week:"周二", least:3, percentage: 0.9, maximum: 11},
                  {week:"周三", least:3, percentage: 0.9, maximum: 11},
                  {week:"周四", least:3, percentage: 0.9, maximum: 11},
                  {week:"周五", least:3, percentage: 0.9, maximum: 11},
                  {week:"周六", least:3, percentage: 0.9, maximum: 11},
                  {week:"周日", least:3, percentage: 0.9, maximum: 11}
               ]
            },
            busConfig:{
               "海口":[],
               "昌江":[]
            }
         },

         week:["周一","周二","周三","周四","周五","周六","周日"]
      }
   },

   template:"<div class=\"page-history\">\r\n\r\n    <div class=\"line-big\">\r\n        <div class=\"xm12\">\r\n            <div class=\"panel\">\r\n                <div class=\"panel-head\"><strong>全局配置</strong></div>\r\n                <div class=\"panel-body\">\r\n                    <form method=\"post\"  onsubmit=\"return false;\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                <label>\r\n                                    提前订座天数</label>\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <div class=\"input-group\">\r\n                                    <input type=\"number\" class=\"input\"   v-model=\"data.config.advance\" placeholder=\"提前订座天数\">\r\n                                    <span class=\"addon\">天</span>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                <label>\r\n                                    订座截止时间[海口→昌江]</label>\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <div class=\"input-group\">\r\n                                    <input type=\"number\" class=\"input\"  v-model=\"data.config.end['昌江']\" placeholder=\"提前订座天数\">\r\n                                    <span class=\"addon\">小时</span>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                <label>\r\n                                    订座截止时间[昌江→海口]</label>\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <div class=\"input-group\">\r\n                                    <input type=\"number\" class=\"input\"   v-model=\"data.config.end['海口']\" placeholder=\"提前订座天数\">\r\n                                    <span class=\"addon\">小时</span>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n            <br>\r\n            <div class=\"panel\" style=\"display: none\">\r\n                <div class=\"panel-head\"><strong>昌江→海口</strong></div>\r\n                <div class=\"panel-body\">\r\n                    <div class=\"table-responsive\">\r\n                        <table class=\"table\">\r\n                            <tbody>\r\n                            <tr>\r\n                                <th>\r\n                                    星期\r\n                                </th>\r\n                                <th>\r\n                                    最初开启车辆数量\r\n                                </th>\r\n                                <th>\r\n                                    开启下一辆上座率\r\n                                </th>\r\n                                <th>\r\n                                    最大开启车辆台数\r\n                                </th>\r\n                            </tr>\r\n                            <tr v-repeat=\"v in data.quota['海口']\">\r\n                                <td>\r\n                                    {{v.week}}\r\n                                </td>\r\n                                <td>\r\n                                    <input type=\"number\" class=\"input input-small\" number v-model=\"v.least\">\r\n                                </td>\r\n                                <td>\r\n                                    <input type=\"number\" class=\"input input-small\" number v-model=\"v.percentage\">\r\n                                </td>\r\n                                <td>\r\n                                    <input type=\"number\" class=\"input input-small\" number v-model=\"v.maximum\">\r\n                                </td>\r\n                            </tr>\r\n                            </tbody></table>\r\n                    </div>\r\n\r\n\r\n                </div>\r\n            </div>\r\n            <br>\r\n            <div class=\"panel\" style=\"display: none\">\r\n                <div class=\"panel-head\"><strong>海口→昌江</strong></div>\r\n                <div class=\"panel-body\">\r\n                    <div class=\"table-responsive\">\r\n                        <table class=\"table\">\r\n                            <tbody><tr>\r\n                                <th>\r\n                                    星期\r\n                                </th>\r\n                                <th>\r\n                                    最初开启车辆数量\r\n                                </th>\r\n                                <th>\r\n                                    开启下一辆上座率\r\n                                </th>\r\n                                <th>\r\n                                    最大开启车辆台数\r\n                                </th>\r\n                            </tr>\r\n                            <tr v-repeat=\"v in data.quota['昌江']\">\r\n                                <td>\r\n                                    {{v.week}}\r\n                                </td>\r\n                                <td>\r\n                                    <input type=\"number\" class=\"input input-small\" number v-model=\"v.least\">\r\n                                </td>\r\n                                <td>\r\n                                    <input type=\"number\" class=\"input input-small\" number v-model=\"v.percentage\">\r\n                                </td>\r\n                                <td>\r\n                                    <input type=\"number\" class=\"input input-small\" number v-model=\"v.maximum\">\r\n                                </td>\r\n                            </tr>\r\n                            </tbody></table>\r\n                    </div>\r\n\r\n\r\n                </div>\r\n                <div class=\"panel-foot\" style=\"text-align: right\">\r\n\r\n                    <button class=\"button\" v-on=\"click:getContext\">取消</button>\r\n                    <button class=\"button bg-green\" v-disabled=\"isValid\" v-on=\"click:putContext\" >保存</button>\r\n                </div>\r\n            </div>\r\n            <br>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"panel\">\r\n        <div class=\"panel-head\"><strong>海口→昌江</strong></div>\r\n        <div class=\"panel-body\">\r\n            <div class=\"table-responsive\">\r\n                <table class=\"table table-bordered\">\r\n                    <tbody><tr>\r\n                        <th>\r\n                            星期\r\n                        </th>\r\n                        <th>\r\n                            配置\r\n                        </th>\r\n                        <th>\r\n                            初始车辆\r\n                        </th>\r\n                        <th>\r\n                            最大车辆\r\n                        </th>\r\n                    </tr>\r\n                    <tr v-repeat=\"v in data.busConfig['昌江']\">\r\n                        <td>\r\n                            {{v.week}}\r\n                        </td>\r\n                        <td>\r\n                            <table class=\"table\">\r\n                                <thead>\r\n                                <th>车辆名称</th>\r\n                                <th>路线</th>\r\n                                <th>发车-到达</th>\r\n                                <th>发车序号</th>\r\n                                <th>入座率要求</th>\r\n                                <th>启用</th>\r\n                                </thead>\r\n                                <tbody>\r\n                                <tr v-repeat=\"c in v.buss\">\r\n\r\n                                    <td>\r\n                                        {{c.name}}\r\n                                    </td>\r\n                                    <td>\r\n                                        {{c.line}}\r\n                                    </td>\r\n                                    <td>\r\n                                        {{c.goff}}-{{c.arrive}}\r\n                                    </td>\r\n                                    <td>\r\n                                        <input type=\"number\" number v-model=\"c.index\" placeholder=\"发车序号\">\r\n                                    </td>\r\n                                    <td>\r\n                                        <input type=\"number\" number v-model=\"c.percentage\" placeholder=\"入座率要求\">\r\n                                    </td>\r\n                                    <td>\r\n                                        <input type=\"checkbox\"  v-model=\"c.usable\" >\r\n                                    </td>\r\n                                </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </td>\r\n                        <td><input type=\"number\" number style=\"width: 100px\" v-model=\"v.min\"></td>\r\n                        <td><input type=\"number\" number style=\"width: 100px\" v-model=\"v.max\"></td>\r\n                    </tr>\r\n\r\n                    </tbody></table>\r\n            </div>\r\n\r\n\r\n        </div>\r\n        <div class=\"panel-foot\" style=\"text-align: right\">\r\n\r\n            <button class=\"button\" v-on=\"click:getContext\">取消</button>\r\n            <button class=\"button bg-green\" v-disabled=\"isValid\" v-on=\"click:putContext\" >保存</button>\r\n        </div>\r\n    </div>\r\n\r\n    <br>\r\n    <div class=\"panel\">\r\n        <div class=\"panel-head\"><strong>昌江→海口</strong></div>\r\n        <div class=\"panel-body\">\r\n            <div class=\"table-responsive\">\r\n                <table class=\"table table-bordered\">\r\n                    <tbody><tr>\r\n                        <th>\r\n                            星期\r\n                        </th>\r\n                        <th>\r\n                            配置\r\n                        </th>\r\n                        <th >\r\n                            初始车辆\r\n                        </th>\r\n                        <th >\r\n                            最大车辆\r\n                        </th>\r\n                    </tr>\r\n                    <tr v-repeat=\"v in data.busConfig['海口']\">\r\n                        <td>\r\n                            {{v.week}}\r\n                        </td>\r\n                        <td>\r\n                            <table class=\"table\">\r\n                                <thead>\r\n                                <th>车辆名称</th>\r\n                                <th>路线</th>\r\n                                <th>发车-到达</th>\r\n                                <th>发车序号</th>\r\n                                <th>入座率要求</th>\r\n                                <th>启用</th>\r\n                                </thead>\r\n                                <tbody>\r\n                                <tr v-repeat=\"c in v.buss\">\r\n                                    <td>\r\n                                        {{c.name}}\r\n                                    </td>\r\n                                    <td>\r\n                                        {{c.line}}\r\n                                    </td>\r\n                                    <td>\r\n                                        {{c.goff}}-{{c.arrive}}\r\n                                    </td>\r\n                                    <td>\r\n                                        <input type=\"number\" number v-model=\"c.index\" placeholder=\"发车序号\">\r\n                                    </td>\r\n                                    <td>\r\n                                        <input type=\"number\" number v-model=\"c.percentage\" placeholder=\"入座率要求\">\r\n                                    </td>\r\n                                    <td>\r\n                                        <input type=\"checkbox\"  v-model=\"c.usable\" >\r\n                                    </td>\r\n\r\n                                </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        <td><input type=\"number\"  style=\"width: 100px\" number v-model=\"v.min\"></td>\r\n                        <td><input type=\"number\"  style=\"width: 100px\" number v-model=\"v.max\"></td>\r\n                        </td>\r\n\r\n\r\n                    </tr>\r\n                    </tbody></table>\r\n            </div>\r\n\r\n\r\n        </div>\r\n        <div class=\"panel-foot\" style=\"text-align: right\">\r\n\r\n            <button class=\"button\" v-on=\"click:getContext\">取消</button>\r\n            <button class=\"button bg-green\" v-disabled=\"isValid\" v-on=\"click:putContext\" >保存</button>\r\n        </div>\r\n    </div>\r\n</div>",

   compiled: function () {
   },

   computed: {
      validation: function () {
         return {
         }
      },
      isValid: function () {
         var validation = this.validation;
         return Object.keys(validation).every(function (key) {
            return validation[key]
         })
      }
   },

   watch:{
   },
   methods:{

      getContext: function () {

         var self = this;
         self.loading = false;
         self.loading = true;

         Service.getContext({}, function (rep) {
            self.loading = false;
            if(rep.Code == 0){
              // var d = $.extend( JSON.parse(JSON.stringify(self.data)),rep.Response||{});
               self.data = self.extend(rep.Response,JSON.parse(JSON.stringify(self.data)))
            }
         })
      },
      extend: function (rep,target) {
         target.config.advance = parseInt(rep.config.advance)||2;
         target.config.end["昌江"] = parseFloat(rep.config.end["昌江"])||14;
         target.config.end["海口"] = parseFloat(rep.config.end["海口"])||0.5;

         var trans  = function (t1,r1) {
            for (var i = 0; i < t1.length; i++) {
               t1[i].max = r1[i].max;
               t1[i].min = r1[i].min;

               var tbus = t1[i].buss;
               var rbus = r1[i].buss;
               for (var j = 0; j < tbus.length; j++) {
                  var tb = tbus[j];

                  for (var k = 0; k < rbus.length; k++) {
                     var rb = rbus[k];
                     if(tb.name == rb.name && tb.goff == rb.goff){
                        $.extend(tb,rb);
                     }
                  }

               }
            }
         }


         var r1 = rep.busConfig["昌江"];
         var t1 = target.busConfig["昌江"];
         trans(t1,r1);
         var r2 = rep.busConfig["海口"];
         var t2 = target.busConfig["海口"];
         trans(t2,r2);

         return target;
      },
      putContext: function () {

         if (!this.isValid){
            return;
         }

         var self = this;
         this.loading = true;

         Service.putContext(JSON.stringify(self.data),function (rep) {
            if(rep.Code != 0 ){
               alert(rep.Message);
            }else{
               alert("保存成功!");
               self.getContext();
            }
            self.loading = false;
         });
      },

      getBus: function () {
         var self = this;
         this.loading = true;
         Service.getBuses({page:0,limit:999},function (rep) {
            var bus = rep.Response.lists;
            self.getConfig(bus);
            self.getContext();

         });
      },
      getConfig: function (bus) {

         var cjList = [];
         for(var i = 0;i<bus.length;i++){
            if(bus[i].destination == "昌江"){
               cjList.push(bus[i]);
            }
         }
         for(var i = 0;i<this.week.length;i++){
            var tbuss = [];
            for(var c = 0;c<cjList.length;c++){
               if(cjList[c].weeks[i]){
                  tbuss.push({
                     line:cjList[c].line,
                     name:cjList[c].name,
                     goff:cjList[c].goff,
                     arrive:cjList[c].arrive,
                     index:c+1,
                     percentage:0.95,
                     usable:true
                  });
               }
            }
            this.data.busConfig["昌江"].push({
               week:this.week[i],
               min:1,
               max:3,
               buss:tbuss
            })
         }

         var hkList = [];
         for(var i = 0;i<bus.length;i++){
            if(bus[i].destination == "海口"){
               hkList.push(bus[i]);
            }
         }
         for(var i = 0;i<this.week.length;i++){
            var tbuss = [];
            for(var c =0;c<hkList.length;c++){
               if(hkList[c].weeks[i]){
                  tbuss.push({
                     line:hkList[c].line,
                     name:hkList[c].name,
                     goff:hkList[c].goff,
                     arrive:hkList[c].arrive,
                     index:c+1,
                     percentage:0.95,
                     usable:true
                  });
               }
            }
            this.data.busConfig["海口"].push({
               week:this.week[i],
               buss:tbuss,
               min:1,
               max:3
            })
         }
      }
   },
   ready: function () {
      this.getBus();
   }
});

});
