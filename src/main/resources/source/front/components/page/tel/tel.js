/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var Router = require('component_modules/director').Router;
var Layer = require('component_modules/layer.m.js').layer;
var Service =require("main/service.js");

module.exports = Vue.extend({
    inherit:true,
    template:__inline("tel.html"),
    data: function () {
        return {
            date:[]

        }
    },
    methods:{

    },
    ready: function () {


    }
});