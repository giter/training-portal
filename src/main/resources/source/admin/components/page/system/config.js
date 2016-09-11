/**
 * Created by lee on 2015/11/16.
 */

var Vue = require("component_modules/vue.js");
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

   template:__inline("config.html"),

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