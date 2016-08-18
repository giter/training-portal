/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-nav",{
    template:__inline("nav.html"),
    props:["amenu","bmenu","cmenu","view"],
    data: function () {
        return {
            "func": [
                {
                    name: "��ҳ",
                    key: "home",
                    class: "icon-home",
                    child: [
                        {
                            name: "����ͳ��",
                            key: "desk",
                            class: "icon-file"
                        },
                        {
                            name: "��Ա����",
                            key: "user",
                            class: "icon-user"
                        },
                        {
                            name: "��������",
                            key: "bus",
                            class: "icon-bus",
                            child: [
                                {
                                    name: "��λ����",
                                    key: "seat",
                                    class:"icon-shopping-cart"
                                }
                            ]
                        },
                        {
                            name: "��Χ����",
                            key: "company",
                            class: "icon-user"
                        },
                        {
                            name: "�а��̶�Ʊ",
                            key: "companyOrder",
                            class: "icon-file-text"
                        }
                    ]
                },
                {
                    name: "ϵͳ",
                    key: "sys",
                    class: "icon-cog",
                    child: [
                        {
                            name: "��¼��־",
                            key: "history",
                            class: "icon-file-text"
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