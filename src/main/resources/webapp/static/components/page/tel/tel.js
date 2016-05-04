define('components/page/tel/tel', function(require, exports, module) {

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
    template:"\r\n\r\n\r\n\r\n\r\n<div class=\"page-config\" style=\"height: 100%\">\r\n    <div class=\"mui-control-content mui-active\" style=\"height: 100%\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" href=\"#config\"></a>\r\n            <h5 class=\"mui-title\">\r\n                系统服务\r\n            </h5>\r\n        </header>\r\n        <div class=\"mui-content mui-scroll-wrapper\">\r\n        <div style=\"color:#66ccff;font-size: 12px; text-align:center;\">------------(内部信息请勿随意转发)------------</div>\r\n        <table style=\"margin-top: 5px;\">\r\n            <tr>\r\n                <td colspan=\"2\" style=\"color:#66ccff;font-weight:bold;\">应急报警</td>\r\n            </tr>\r\n            <tr style=\"font-size: 15px;\">\r\n                <td style=\"width: 300px\">厂区火警报警：0898-26927119</td><td style=\"text-align:right;\"><a href=\"tel://0898-26927119\">拨号</a> </td>\r\n            </tr>\r\n            <tr style=\"font-size: 15px;\">\r\n                <td  style=\"width: 300px\">厂区治安报警：0898-26927110</td><td><a href=\"tel://0898-26927110\">拨号</a> </td>\r\n            </tr>\r\n            <tr style=\"font-size: 15px;\">\r\n                <td  style=\"width: 300px\"> 治安事件应急：17789805307（梁拯）</td><td><a href=\"tel://17789805307\">拨号</a> </td>\r\n            </tr>\r\n            <tr style=\"font-size: 15px;\">\r\n                <td  style=\"width: 300px\">交通事件应急：17789805302（杨俊）</td><td><a href=\"tel://17789805302\">拨号</a> </td>\r\n            </tr>\r\n            <tr style=\"font-size: 15px;\">\r\n                <td  style=\"width: 300px\">警盾护卫队：15289933544</td><td><a href=\"tel://15289933544\">拨号</a> </td>\r\n            </tr>\r\n        </table>\r\n\r\n        <table  style=\"margin-top: 20px;\">\r\n            <tr>\r\n                <td colspan=\"2\" style=\"color:#66ccff;font-weight:bold;\">工作服务</td>\r\n            </tr>\r\n            <tr style=\"font-size: 15px;\">\r\n                <td  style=\"width: 300px\">BA会议室服务：0898-26927000</td><td><a href=\"tel://0898-26927000\">拨号</a> </td>\r\n            </tr>\r\n            <tr style=\"font-size: 15px;\">\r\n                <td  style=\"width: 300px\">现场车辆调度：17789805916（王冬）</td><td><a href=\"tel://17789805916\">拨号</a> </td>\r\n            </tr>\r\n            <tr style=\"font-size: 15px;\">\r\n                <td  style=\"width: 300px\">现场物业报修：0898-26695398</td><td><a href=\"tel://0898-26695398\">拨号</a> </td>\r\n            </tr>\r\n            <tr style=\"font-size: 15px;\">\r\n                <td  style=\"width: 300px\">IT服务中心：0898-26925400</td><td><a href=\"tel://0898-26925400\">拨号</a> </td>\r\n            </tr>\r\n            <tr style=\"font-size: 15px;\">\r\n                <td  style=\"width: 300px\">集中文印报修：0898-26927133</td><td><a href=\"tel://0898-26927133\">拨号</a> </td>\r\n            </tr>\r\n        </table>\r\n\r\n        <table  style=\"margin-top: 20px;\">\r\n            <tr>\r\n                <td colspan=\"2\" style=\"color:#66ccff;font-weight:bold;\">生活服务</td>\r\n            </tr>\r\n            <tr style=\"font-size: 15px;\">\r\n                <td  style=\"width: 300px\">互联网、固话报修：10000</td><td><a href=\"tel://10000\">拨号</a> </td>\r\n            </tr>\r\n            <tr style=\"font-size: 15px;\">\r\n                <td  style=\"width: 300px\">有线电视报修：13876530996（林经理）</td><td><a href=\"tel://13876530996\">拨号</a> </td>\r\n            </tr>\r\n            <tr style=\"font-size: 15px;\">\r\n                <td  style=\"width: 300px\">移动客户经理：18308957840（陈经理）</td><td><a href=\"tel://18308957840\">拨号</a> </td>\r\n            </tr>\r\n            <tr style=\"font-size: 15px;\">\r\n                <td  style=\"width: 300px\">电信客户经理：18907553069（杜经理）</td><td><a href=\"tel://18907553069\">拨号</a> </td>\r\n            </tr>\r\n            <tr style=\"font-size: 15px;\">\r\n                <td  style=\"width: 300px\">联通客户经理：18608911787（方经理）</td><td><a href=\"tel://18608911787\">拨号</a> </td>\r\n            </tr>\r\n            <tr style=\"font-size: 15px;\">\r\n                <td  style=\"width: 300px\">滨海贵族公寓：0898-68513295（李经理）</td><td><a href=\"tel://0898-68513295\">拨号</a> </td>\r\n            </tr>\r\n        </table>\r\n            </div>\r\n    </div>\r\n    <c-nav view=\"config\"></c-nav>\r\n</div>\r\n",
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

});
