define('form/form', function(require, exports, module) {

/**
 * Created by jack on 16/4/7.
 */

var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-form",{
    template:"<div class=\"c-form\">\n    <div class=\"modal fade\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\"  aria-label=\"Close\"><span aria-hidden=\"true\"  @click=\"hideModal\">&times;</span></button>\n                    <h4 class=\"modal-title\">{{config.title}}</h4>\n                </div>\n                <div class=\"modal-body\">\n                   <slot>\n\n                   </slot>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\"  @click=\"hideModal\">取消</button>\n                    <button type=\"button\" class=\"btn btn-primary\" @click=\"onSubmit\">确定</button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>",
    props:["config"],
    data: function () {
        return {
        }
    },
    methods:{
        toggle:function(){
            this.config.show?this.$modal.modal("show"):this.$modal.modal("hide");
        },
        hideModal: function () {
            this.config.show = false;
        },
        onSubmit: function () {
            this.$dispatch("submit");
        }
    },
    watch:{
        config:{
            deep:true,
            handler:function(){
                this.toggle();
            }
        }
    },
    ready:function(){
        var self = this;
        this.$modal = $(this.$el).find(".modal");
        this.$modal.on("click", function (e) {
            if($(e.target).hasClass("in")){
                self.config.show =false;
            }

            e.stopPropagation();
        })
    }
});

});
