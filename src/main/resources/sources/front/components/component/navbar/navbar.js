/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-nav",{
    inherit:true,
    template:__inline("navbar.html"),
    props:["view"],
    methods:{
        onClick: function (hash) {
            window.location.hash = hash;
        }
    },
    ready: function () {

    }
});