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
			}
		  }
      }
   },

   template:"<div class=\"page-history\">\r\n    <div class=\"panel admin-panel\">\r\n        <div class=\"panel-head\">\r\n            <strong>\r\n                系统配置\r\n            </strong>\r\n        </div>\r\n\r\n\t\t<div class=\"padding border-bottom\">\r\n\r\n\t\t\t<label>\r\n\t\t\t\t提前订座天数：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.config.advance\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t订座截止时间[昌江]（小时）：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.config.end['昌江']\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t订座截止时间[海口]（小时）：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.config.end['海口']\">\r\n\t\t\t</label>\r\n\r\n\t\t\t海口<br/>\r\n\t\t\t周一<br/>\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][0].least\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][0].percentage\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][0].maximum\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t海口<br/>\r\n\t\t\t周二<br/>\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][1].least\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][1].percentage\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][1].maximum\">\r\n\t\t\t\t\t</label>\r\n\t\t\t\r\n\t\t\t海口<br/>\r\n\t\t\t周三<br/>\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][2].least\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][2].percentage\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][2].maximum\">\r\n\t\t\t\t\t</label>\r\n\t\t\t\r\n\t\t\t海口<br/>\r\n\t\t\t周四<br/>\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][3].least\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][3].percentage\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][3].maximum\">\r\n\t\t\t\t\t</label>\r\n\t\t\t\r\n\t\t\t海口<br/>\r\n\t\t\t周五<br/>\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][4].least\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][4].percentage\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][4].maximum\">\r\n\t\t\t\t\t</label>\r\n\t\t\t\r\n\t\t\t海口<br/>\r\n\t\t\t周六<br/>\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][5].least\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][5].percentage\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][5].maximum\">\r\n\t\t\t\t\t</label>\r\n\t\t\t\r\n\t\t\t海口<br/>\r\n\t\t\t周日<br/>\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][6].least\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][6].percentage\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][6].maximum\">\r\n\t\t\t\t\t</label>\r\n\t\t\t\r\n\t\t\t\r\n\r\n\t\t\t昌江<br/>\r\n\t\t\t周一<br/>\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][0].least\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][0].percentage\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][0].maximum\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t昌江<br/>\r\n\t\t\t周二<br/>\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][1].least\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][1].percentage\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][1].maximum\">\r\n\t\t\t\t\t</label>\r\n\t\t\t\r\n\t\t\t昌江<br/>\r\n\t\t\t周三<br/>\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][2].least\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][2].percentage\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][2].maximum\">\r\n\t\t\t\t\t</label>\r\n\t\t\t\r\n\t\t\t昌江<br/>\r\n\t\t\t周四<br/>\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][3].least\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][3].percentage\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][3].maximum\">\r\n\t\t\t\t\t</label>\r\n\t\t\t\r\n\t\t\t昌江<br/>\r\n\t\t\t周五<br/>\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][4].least\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][4].percentage\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][4].maximum\">\r\n\t\t\t\t\t</label>\r\n\t\t\t\r\n\t\t\t昌江<br/>\r\n\t\t\t周六<br/>\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][5].least\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][5].percentage\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][5].maximum\">\r\n\t\t\t\t\t</label>\r\n\t\t\t\r\n\t\t\t昌江<br/>\r\n\t\t\t周日<br/>\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][6].least\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][6].percentage\">\r\n\t\t\t\t\t</label>\r\n\r\n\t\t\t\t\t<label>\r\n\t\t\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][6].maximum\">\r\n\t\t\t\t\t</label>\r\n\t\t\t\r\n\t\t\t\r\n\r\n\r\n             <button class=\"button\" v-on=\"click:getContext\">取消</button>\r\n             <button class=\"button bg-green\" v-disabled=\"isValid\" v-on=\"click:putContext\" >保存</button>\r\n\t\t</div>\r\n\r\n    </div>\r\n</div>",

   compiled: function () {
      this.getContext();
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
         self.loading = true;

         Service.getContext({}, function (rep) {

            self.loading = false;

            if(rep.Code == 0){
               self.data = $.extend(self.data, rep.Response||{});
            }
         })
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
   }
});

});
