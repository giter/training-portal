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

   template:"<div class=\"page-history\">\r\n\r\n\t<div class=\"line-big\">\r\n\t\t<div class=\"xm12\">\r\n\t\t\t<div class=\"panel\">\r\n\t\t\t\t<div class=\"panel-head\"><strong>全局配置</strong></div>\r\n\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t<form method=\"post\"  onsubmit=\"return false;\">\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<div class=\"label\">\r\n\t\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t\t\t提前订座天数</label>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"field\">\r\n\t\t\t\t\t\t\t\t<div class=\"input-group\">\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input\"   v-model=\"data.config.advance\" placeholder=\"提前订座天数\">\r\n\t\t\t\t\t\t\t\t\t<span class=\"addon\">天</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<div class=\"label\">\r\n\t\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t\t\t订座截止时间[海口→昌江]</label>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"field\">\r\n\t\t\t\t\t\t\t\t<div class=\"input-group\">\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input\"  v-model=\"data.config.end['昌江']\" placeholder=\"提前订座天数\">\r\n\t\t\t\t\t\t\t\t\t<span class=\"addon\">小时</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<div class=\"label\">\r\n\t\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t\t\t订座截止时间[昌江→海口]</label>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"field\">\r\n\t\t\t\t\t\t\t\t<div class=\"input-group\">\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input\"   v-model=\"data.config.end['海口']\" placeholder=\"提前订座天数\">\r\n\t\t\t\t\t\t\t\t\t<span class=\"addon\">小时</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</form>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<br>\r\n\t\t\t<div class=\"panel\">\r\n\t\t\t\t<div class=\"panel-head\"><strong>海口→昌江</strong></div>\r\n\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t<div class=\"table-responsive\">\r\n\t\t\t\t\t\t<table class=\"table\">\r\n\t\t\t\t\t\t\t<tbody><tr>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t星期\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t最初开启车辆数量\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t开启下一辆上座率\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t最大开启车辆台数\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr v-repeat=\"v in data.quota['海口']\">\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t{{v.week}}\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input input-small\" number v-model=\"v.least\">\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input input-small\" number v-model=\"v.percentage\">\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input input-small\" number v-model=\"v.maximum\">\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t</tbody></table>\r\n\t\t\t\t\t</div>\r\n\r\n\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<br>\r\n\t\t\t<div class=\"panel\">\r\n\t\t\t\t<div class=\"panel-head\"><strong>昌江→海口</strong></div>\r\n\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t<div class=\"table-responsive\">\r\n\t\t\t\t\t\t<table class=\"table\">\r\n\t\t\t\t\t\t\t<tbody><tr>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t星期\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t最初开启车辆数量\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t开启下一辆上座率\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t最大开启车辆台数\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr v-repeat=\"v in data.quota['昌江']\">\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t{{v.week}}\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input input-small\" number v-model=\"v.least\">\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input input-small\" number v-model=\"v.percentage\">\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input input-small\" number v-model=\"v.maximum\">\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t</tbody></table>\r\n\t\t\t\t\t</div>\r\n\r\n\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"panel-foot\" style=\"text-align: right\">\r\n\r\n\t\t\t\t\t\t\t<button class=\"button\" v-on=\"click:getContext\">取消</button>\r\n\t\t\t\t\t\t\t<button class=\"button bg-green\" v-disabled=\"isValid\" v-on=\"click:putContext\" >保存</button>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<br>\r\n\t\t</div>\r\n\r\n\r\n\t</div>\r\n\r\n\r\n<!--\t<div class=\"panel admin-panel\">\r\n\t\t<div class=\"panel-head\">\r\n\t\t\t<strong>\r\n\t\t\t\t系统配置\r\n\t\t\t</strong>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"padding border-bottom\">\r\n\r\n\t\t\t<label>\r\n\t\t\t\t提前订座天数：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.config.advance\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t订座截止时间[海口→昌江]（小时）：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.config.end['昌江']\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t订座截止时间[昌江→海口]（小时）：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.config.end['海口']\">\r\n\t\t\t</label>\r\n\r\n\t\t\t昌江→海口<br/>\r\n\t\t\t周一<br/>\r\n\t\t\t<label>\r\n\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][0].least\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][0].percentage\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][0].maximum\">\r\n\t\t\t</label>\r\n\r\n\t\t\t昌江→海口<br/>\r\n\t\t\t周二<br/>\r\n\t\t\t<label>\r\n\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][1].least\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][1].percentage\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][1].maximum\">\r\n\t\t\t</label>\r\n\r\n\t\t\t昌江→海口<br/>\r\n\t\t\t周三<br/>\r\n\t\t\t<label>\r\n\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][2].least\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][2].percentage\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][2].maximum\">\r\n\t\t\t</label>\r\n\r\n\t\t\t昌江→海口<br/>\r\n\t\t\t周四<br/>\r\n\t\t\t<label>\r\n\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][3].least\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][3].percentage\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][3].maximum\">\r\n\t\t\t</label>\r\n\r\n\t\t\t昌江→海口<br/>\r\n\t\t\t周五<br/>\r\n\t\t\t<label>\r\n\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][4].least\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][4].percentage\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][4].maximum\">\r\n\t\t\t</label>\r\n\r\n\t\t\t昌江→海口<br/>\r\n\t\t\t周六<br/>\r\n\t\t\t<label>\r\n\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][5].least\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][5].percentage\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][5].maximum\">\r\n\t\t\t</label>\r\n\r\n\t\t\t昌江→海口<br/>\r\n\t\t\t周日<br/>\r\n\t\t\t<label>\r\n\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][6].least\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][6].percentage\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][6].maximum\">\r\n\t\t\t</label>\r\n\r\n\r\n\r\n\t\t\t海口→昌江<br/>\r\n\t\t\t周一<br/>\r\n\t\t\t<label>\r\n\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][0].least\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][0].percentage\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][0].maximum\">\r\n\t\t\t</label>\r\n\r\n\t\t\t海口→昌江<br/>\r\n\t\t\t周二<br/>\r\n\t\t\t<label>\r\n\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][1].least\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][1].percentage\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][1].maximum\">\r\n\t\t\t</label>\r\n\r\n\t\t\t海口→昌江<br/>\r\n\t\t\t周三<br/>\r\n\t\t\t<label>\r\n\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][2].least\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][2].percentage\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][2].maximum\">\r\n\t\t\t</label>\r\n\r\n\t\t\t海口→昌江<br/>\r\n\t\t\t周四<br/>\r\n\t\t\t<label>\r\n\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][3].least\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][3].percentage\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][3].maximum\">\r\n\t\t\t</label>\r\n\r\n\t\t\t海口→昌江<br/>\r\n\t\t\t周五<br/>\r\n\t\t\t<label>\r\n\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][4].least\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][4].percentage\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][4].maximum\">\r\n\t\t\t</label>\r\n\r\n\t\t\t海口→昌江<br/>\r\n\t\t\t周六<br/>\r\n\t\t\t<label>\r\n\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][5].least\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][5].percentage\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][5].maximum\">\r\n\t\t\t</label>\r\n\r\n\t\t\t海口→昌江<br/>\r\n\t\t\t周日<br/>\r\n\t\t\t<label>\r\n\t\t\t\t最初开启车辆数量：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][6].least\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t开启下一辆上座率：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][6].percentage\">\r\n\t\t\t</label>\r\n\r\n\t\t\t<label>\r\n\t\t\t\t最大开启车辆台数：\r\n\t\t\t\t<input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][6].maximum\">\r\n\t\t\t</label>\r\n\r\n\r\n\r\n\r\n\t\t</div>\r\n\r\n\t</div>-->\r\n</div>",

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
