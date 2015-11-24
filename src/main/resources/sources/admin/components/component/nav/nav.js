/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-nav",{
    template:__inline("nav.html"),
    props:["amenu","bmenu","cmenu","view"],
    data: function () {

		if(window.location.search == "?3"){
				return {
				"func": [
					{
						name: "首页",
						key: "home",
						class: "icon-home",
						child: [
							{
								name: "合作单位管理",
								key: "company",
								class: "icon-user"
							},
							{
								name: "合作单位订票",
								key: "companyOrder",
								class: "icon-file-text"
							}
						]
					}
				],
				bread1: {},
				bread2: {},
				bread3:{}
			};
		}

        return {
            "func": [
                {
                    name: "首页",
                    key: "home",
                    class: "icon-home",
                    child: [
                        {
                            name: "桌面统计",
                            key: "desk",
                            class: "icon-file"
                        },
                        {
                            name: "人员管理",
                            key: "user",
                            class: "icon-user"
                        },
                        {
                            name: "发车管理",
                            key: "bus",
                            class: "icon-bus",
                            child: [
                                {
                                    name: "车位管理",
                                    key: "seat",
                                    class:"icon-shopping-cart"
                                }
                            ]
                        },
                        {
                            name: "合作单位管理",
                            key: "company",
                            class: "icon-user"
                        },
                        {
                            name: "合作单位订票",
                            key: "companyOrder",
                            class: "icon-file-text"
                        },
						{
                            name: "订票查询",
                            key: "check",
                            class: "icon-file-text"
                        }
                    ]
                },
                {
                    name: "系统",
                    key: "sys",
                    class: "icon-cog",
                    child: [
                        {
                            name: "登录日志",
                            key: "history",
                            class: "icon-file-text"
                        },
						{
                            name: "系统配置",
                            key: "config",
                            class: "icon-cog"
                        }
                    ]
                }
            ],
            bread1: {},
            bread2: {},
            bread3:{}
        }
    },
    watch:{

        "amenu": function (e) {
            for(var i in this.func){
                if(this.func[i].key == e){
                    return  this.bread1 = this.func[i];
                }
            }
        },
        "bmenu": function (e) {
            for(var i in this.bread1.child){
                if(this.bread1.child[i].key == e){
                    return this.bread2 = this.bread1.child[i];
                }
            }
        },
        "cmenu": function (e) {
            this.bread3 = {};
            var t =  this.bread2.child;
            if(t && t.length > 0){
                for(var i in t){
                    if(t[i].key == e){
                        return this.bread3 = t[i];
                    }
                }
            }
        }
    },
    methods:{

    }
});