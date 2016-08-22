/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-pager",{
    template:__inline("pager.html"),
    props:["count","limit","page"],
    data: function () {
    },
    watch:{


    },
    computed:{
      "lens": function () {
          return 5
      }
    },
    methods:{
        toPage: function (e) {
            this.page = parseInt(e.target.innerHTML)-1;
        },
        nextPage: function (e) {
            var t = parseInt(((this.count-1)/this.limit));
            if(this.page < t){
                this.page +=1;
            }
        },
        prevPage: function () {
            if(this.page > 0){
                this.page -=1;
            }
        },
        isShow: function ($index) {
            if(this.page <6){
                return $index<10;
            }else{
                return this.page < $index+6 && this.page > $index-5;
            }
        }
    }
});