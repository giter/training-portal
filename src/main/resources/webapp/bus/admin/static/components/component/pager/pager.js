define('pager/pager', function(require, exports, module) {

/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue");

module.exports = Vue.component("c-pager",{
    template:"<div class=\"panel-foot text-center\">\r\n    <ul class=\"pagination\"><li><a href=\"javascript:;\" v-on=\"click:prevPage\">上一页</a></li></ul>\r\n    <ul class=\"pagination pagination-group\">\r\n        <li v-on=\"click:toPage\" v-show=\"isShow($index) \" v-repeat=\"parseInt(((count-1)/limit))+1\" v-class=\"active:$index == (page)\"><a href=\"javascript:;\">{{$index+1}}</a></li>\r\n    </ul>\r\n    <ul class=\"pagination\"><li><a href=\"javascript:;\" v-on=\"click:nextPage\">下一页</a></li></ul>\r\n</div>",
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

});
