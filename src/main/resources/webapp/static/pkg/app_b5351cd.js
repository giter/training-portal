;/*!/components/component/main/check.js*/
define('main/check', function(require, exports, module) {

/**
 * Created by jack on 2015/8/26.
 */

function check($pintu,type){
    switch(type) {
        case "required":
            return /[^(^\s*)|(\s*$)]/.test($pintu);
            break;
        case "chinese":
            return /^[\u0391-\uFFE5]+$/.test($pintu);
            break;
        case "number":
            return /^\d+$/.test($pintu);
            break;
        case "integer":
            return /^[-\+]?\d+$/.test($pintu);
            break;
        case "plusinteger":
            return /^[+]?\d+$/.test($pintu);
            break;
        case "double":
            return /^[-\+]?\d+(\.\d+)?$/.test($pintu);
            break;
        case "plusdouble":
            return /^[+]?\d+(\.\d+)?$/.test($pintu);
            break;
        case "english":
            return /^[A-Za-z]+$/.test($pintu);
            break;
        case "username":
            return /^[a-z]\w{3,}$/i.test($pintu);
            break;
        case "mobile":
            return /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[0-9]\d{8}?$|170\d{8}?$|177\d{8}?$|147\d{8}?$/.test($pintu);
            break;
        case "phone":
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);
            break;
        case "tel":
            return /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[89]\d{8}?$|170\d{8}?$|147\d{8}?$/.test($pintu) || /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test($pintu);
            break;
        case "email":
            return /^[^@]+@[^@]+\.[^@]+$/.test($pintu);
            break;
        case "url":
            return /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test($pintu);
            break;
        case "ip":
            return /^[\d\.]{7,15}$/.test($pintu);
            break;
        case "qq":
            return /^[1-9]\d{4,10}$/.test($pintu);
            break;
        case "currency":
            return /^\d+(\.\d+)?$/.test($pintu);
            break;
        case "zip":
            return /^[1-9]\d{5}$/.test($pintu);
            break;
        case "card":
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test($pintu);
            break;
    }
}

module.exports ={
    check:check
};

});

;/*!/components/page/home/home.js*/
define('components/page/home/home', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");

module.exports =   Vue.extend({
   template:"<div id=\"page-home\">\r\n    <div id=\"wrap\">\r\n        <div class=\"item\">\r\n            <div class=\"spinner1\"></div>\r\n            <h5>拼命加载中<span class=\"dot\">.</span></h5>\r\n        </div>\r\n    </div>\r\n\r\n</div>"
});

});

;/*!/components/component/main/service.js*/
define('main/service', function(require, exports, module) {

/**
 * Created by jack on 2015/8/17.
 */
var prefix = "";
//var prefix = "http://115.159.116.241";

$.sync = function(url, data){

    var ret = null;

    $.ajax({
        contentType:"application/json",
        dataType:"json",
        url:url,
        async: false
    }).success(function(data){

        ret = data;
    });

    return ret;
}


$.del = function (url,callback) {
    return $.ajax({
        type:"delete",
        contentType:"application/json",
        success:callback,
        dataType:"json",
        url:url
    })
};

$.put = function (url,data,callback) {
    if(arguments.length == 3){
        return $.ajax({
            type:"put",
            contentType:"application/json",
            success:callback,
            dataType:"json",
            data:data,
            url:url
        })
    }else if(arguments.length == 2){
        return $.ajax({
            type:"put",
            contentType:"application/json",
            success:arguments[1],
            dataType:"json",
            url:arguments[0]
        })
    }

};
function findApproveuser(id,p){
    $.get(prefix+"/data/user/findapproveuser.json",id,p);
}
function unApproveuser(id,p){
    $.get(prefix+"/data/user/unapproveuser.json",id,p);
}
function Approveuser(id,p){
    $.get(prefix+"/data/user/approveuser.json",id,p);
}
function approveUsers(p){
    $.get(prefix+"/data/user/approveusers.json",p);
}
function findUsers(p){
    $.get(prefix+"/data/user/finduser.json",p);
}
function userBind(p,c){
    $.post(prefix+"/data/user/bind.json",p,c);
}
function updateUser(id,p,c){
    $.put(prefix + "/admin/data/user/"+ id+".json",p,c);
}
function getBusSeat(p,c){
    $.get(prefix+"/data/tickets.json",p,c);
}

function getWhither(c){
    $.get(prefix+"/data/whither.json", c);
}

function getCalendar(p, c){
    $.get(prefix+"/data/calendar.json", p, c);
}

function getResult(p,c){
    $.get(prefix+"/data/tickets/stats.json",p, c);
}

function getOrder(c){
    $.get(prefix+"/data/order.json", c);
}

function getUsers(p,c){
    $.get(prefix+"/data/users.json",p, c);
}

function getMyTicket(p,c){
    $.get(prefix + "/data/ticket/mine.json",p,c)
}

function orderSeat(uid,m,id,c){
    if(uid == m){
        $.put(prefix +"/data/ticket/"+id+".json",c);
    }else{
        $.put(prefix +"/data/ticket/"+uid+"/"+id+".json",c);
    }
}

function getMine(c){
    $.get(prefix+"/data/user/mine.json", c);
}

function unSubTicket(id,c){
    $.del(prefix + "/data/ticket/"+id+".json",c);
}

function getDelegation(c){
    $.get(prefix + "/data/user/delegation.json",c);
}

function addDelegation(id,c){
    $.post(prefix + "/data/user/delegation/"+id+".json",c);
}

function addForDelegation(id,c){
    $.post(prefix + "/data/user/delegate-for/"+id+".json",c);
}

function delForDelegation(id,c){
    $.del(prefix + "/data/user/delegate-for/"+id+".json",c);
}

function delDelegation(id,c){
    $.del(prefix + "/data/user/delegation/"+id+".json",c);
}

function getCompanies(c){
    $.get(prefix + "/data/companies.json",c);
}

function getCompanyTicket(p,c){
    $.get(prefix +"/data/admin/tickets.json",p,c);
}

function addRel(p,c){
    $.put(prefix + "/data/user/relation.json",p,c);
}

function getRel(c){
    $.get(prefix + "/data/user/relations.json",c);
}

function delRel(id,c){
    $.del(prefix + "/data/user/relation/"+id+".json",c);
}

function unbind(c){
    $.get(prefix + "/data/user/unbind.json",c);
}

function getHashString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    if(!window.location.hash){
        return null;
    }
    if(window.location.hash.indexOf("?")==-1){
        return null;
    }
    var r = window.location.hash.split("?")[1].match(reg);
    if (r != null) return r[2]; return null;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2]; return null;
}

var CTX = null;

function getContext(p){

    p.stamp = Math.random();
    return CTX || (CTX = $.sync(prefix +"/data/ctx.json",p).Response);
}

function filterBus(data){
    var ctx = getContext({});

    var ENDS = (ctx['config'] ?  (ctx['config']['end'] || {}) : {});
    var QUOTA = ctx['quota'] || {};

    var now = Date.parse(new Date())/1000,list = [];

    var expired = []

    for(var i=0;i<data.length;i++){

        var END = (ENDS[data[i]['whither']] || 1) * 3600;

        var time = Date.parse(new
                Date(data[i].date.replace(/-/g,"/")))/1000; var diff = time - now;

        if(diff >= END){ list.push(data[i]); }
        else{
            data[i]["expired"] = true;
            if(data[i]["order"] > 0){
                expired.push(data[i]);
            }
        }
    }

    data = list; list = [];

    lv = {}
    pc = {}

    for (var i=0;i<data.length;i++){

        var week = (new Date(data[i]['date'].replace(/-/g,"/"))).getDay();
        week = (week == 0 ? 7 : week) - 1;

        var destination = data[i]['whither'];
        var quota = QUOTA[destination][week];
        var line = data[i]["line"];

        var LEAST = quota['least'] || 3;
        var MAXIMUM = quota['maximum'] || 11;
        var PERCENTAGE = quota['percentage'] || 0.9;

        data[i]["percent"] = data[i]["order"] * 1.0 / (data[i]["void"]+data[i]["order"]);
        /*if(data[i]["void"] <= 0) continue;*/

        if(i>0){

            if(line == data[i-1]["line"]){

                if(lv[line] < LEAST){

                    list.push(data[i]);
                    lv[line] = (lv[line] || 0) + 1;

                    if(data[i]["percent"] > PERCENTAGE){
                        pc[line] = (pc[line] || 0) + 1;
                    }

                }else if ((pc[line] >= LEAST && data[i-1]["percent"] > PERCENTAGE) /*|| data[i]["order"] > 0*/){

                    list.push(data[i]);
                    lv[line] = (lv[line] || 0) + 1;
                }

            }else{

                list.push(data[i]);
                lv[line] = (lv[line] || 0) + 1;

                if(data[i]["percent"] > PERCENTAGE){
                    pc[line] = (pc[line] || 0) + 1;
                }
            }
        }else{
            list.push(data[i]);
            lv[line] = (lv[line] || 0) + 1;

            if(data[i]["percent"] > PERCENTAGE){
                pc[line] = (pc[line] || 0) + 1;
            }
        }
    }

    return expired.concat(list);
}

module.exports = {
    getHashString:getHashString,
    getQueryString:getQueryString,
    userBind:userBind,
    getBusSeat:getBusSeat,
    getWhither:getWhither,
    getCalendar:getCalendar,
    getCompanies:getCompanies,
    getResult:getResult,
    getOrder:getOrder,
    getUsers:getUsers,
    orderSeat:orderSeat,
    unSubTicket:unSubTicket,
    getMyTicket:getMyTicket,
    getMine:getMine,
    getDelegation:getDelegation,
    addForDelegation:addForDelegation,
    delForDelegation:delForDelegation,
    addDelegation:addDelegation,
    delDelegation:delDelegation,
    getCompanyTicket:getCompanyTicket,
    addRel:addRel,
    getRel:getRel,
    delRel:delRel,
    getContext:getContext,
    unbind:unbind,
    updateUser:updateUser,
    findUsers:findUsers,
    approveUsers:approveUsers,
    findApproveuser:findApproveuser,
    Approveuser:Approveuser,
    unApproveuser:unApproveuser,
    filterBus:filterBus
};

});

;/*!/components/component/main/main.js*/
define('main/main', function(require, exports, module) {


var Vue = require('component_modules/vue.js');
var Router = require('component_modules/director.js').Router;
var home = require('components/page/home/home.js');
var Service = require("main/service.js");
var Fastclick = require("component_modules/fastclick.js");

Vue.config.debug = true;

window.app = new Vue({
    el:"#app",
    data:{
        "currentView":"home",
        "users":[],
        "user":[],
        "search":{
            "whither":"请选择",
            "date":null,
            "dateStr":""
        },
        "result":[],
        "bus":[],
        "calendars":[],
        "whithers":[],
        "openid":"",
        "mine":"",
        "detailTicket":"",
        "beginTime":1800,
        "endTime":10800,
        "busQuery":{
            id:"",
            date:"",
            off:false
        }
    },
    components:{
        "home":home
    },
    methods:{
        is_weixin: function () {
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
                return true;
            } else {
                return false;
            }
        }
    },
    ready:function(){
        if(true){
        //if(this.is_weixin()){
            this.openid = Service.getQueryString("openID");
            Fastclick.FastClick.attach(document.body);
            var self = this;
            Service.getMine(function (rep) {
                if(rep.Code == 0){
                    self.mine = rep.Response;
                }
            });
        }else{
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=xx&connect_redirect=1#wechat_redirect";
        }
    }
});

Vue.transition('slideInRight', {
    leave: function (el) {
        if( $(el).length>0){
            el.className = "";
        }
    }
});

var router = new Router();
function doRouter(target,page){
    var coms = window.app.$options.components;
    if(!coms[target]){
        coms[target] = page;
    }
    window.app.$data.currentView = target;
}


router.on("/bind",function(){
    require.async(["components/page/bind/bind"], function (p) {
        doRouter("bind",p);
    })
});

router.on("/home",function(){
    app.currentView = "home";
});

router.on("/order",function(){
    require.async(["components/page/order/order"], function (p) {
        window.app.$broadcast("ReloadOrder");
        doRouter("order",p);
    })
});

router.on("/order/:id",function(id){
    require.async(["components/page/order/orderdetail/orderdetail"], function (p) {
        window.app.detailTicket = id;
        doRouter("orderdetail",p);
    })
});
router.on("/tel",function(){
    require.async(["components/page/tel/tel"], function (p) {
        doRouter("tel",p);
    })
});

router.on("/list",function(){
    require.async(["page/list/list.js"], function (p) {
        doRouter("list",p);
    })
});

router.on("/history",function(){
    require.async(["components/page/history/history"], function (p) {
        doRouter("history",p);
    })
});
router.on("/approve",function(){
    require.async(["components/page/approve/approve"], function (p) {
        doRouter("approve",p);
    })
});
router.on("/approve/approvemore",function(){
    require.async(["components/page/approve/approvemore/approvemore"], function (p) {
        doRouter("approvemore",p);
    })
});
router.on("/search",function(){
    require.async(["components/page/search/search"], function (p) {
        doRouter("search",p);
    })
});
router.on("/search/result",function(){
    require.async(["components/page/search/result/result"], function (p) {
        doRouter("result",p);
    })
});

router.on("/validate",function(){
    require.async(["components/page/validate/validate"], function (p) {
        doRouter("validate",p);

    })
});

router.on("/config",function(){
    require.async(["components/page/config/config"], function (p) {
        doRouter("config",p);
    })
});

router.on("/whither",function(){
    require.async(["components/page/whither/whither"], function (p) {
        doRouter("whither",p);
    })
});

router.on("/calendar",function(){
    require.async(["components/page/calendar/calendar"], function (p) {
        doRouter("calendar",p);
    })
});

router.on("/relation",function(){
    require.async(["components/page/relation/relation"], function (p) {
        doRouter("relation",p);
    })
});
router.on("/relation/query",function(){
    require.async(["components/page/relation/query/query"], function (p) {
        doRouter("query",p);
    })
});
router.on("/relation/relatives",function(){
    require.async(["components/page/relation/relatives/relatives"], function (p) {
        doRouter("relatives",p);
    })
});

router.on("/company",function(){
    require.async(["components/page/company/company"], function (p) {
        doRouter("company",p);
    })
});

router.on("/bus/:id/:date/:off", function (id,date,off) {
    require.async(["components/page/bus/bus"], function (p) {
        window.app.$data.busQuery.id = id;
        window.app.$data.busQuery.date = date;
        window.app.$data.busQuery.off = off;

        window.app.$broadcast("busQuery");

        doRouter("bus",p);
    });
});

router.on("/bus/select", function (id) {
    require.async(["page/bus/select/select.js"], function (p) {
        doRouter("bus-select",p);
    });
});



router.configure({
    notfound: function () {
        router.setRoute("/error/notfound")
    }
});


router.init("/search");




});

;/*!/components/page/bind/bind.js*/
define('components/page/bind/bind', function(require, exports, module) {

/**
 * Created by jack on 2015/8/18.
 */

var Vue = require("component_modules/vue.js");
var Check = require("main/check.js").check;
var Server = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;

module.exports = Vue.extend({
    inherit:true,
    template:"<div class=\"bind-container mui-content\">\r\n<header class=\"mui-bar-nav mui-bar\">\r\n    <h5 class=\"mui-title\">\r\n        用户绑定\r\n    </h5>\r\n    <a class=\" mui-icon mui-icon-left-nav mui-pull-left\" href=\"#config\"></a>\r\n</header>\r\n   <div class=\"mui-content\">\r\n\r\n       <h5 style=\"text-align: center;margin: 10px;\">请输入您的企业邮箱地址进行绑定</h5>\r\n       <div class=\"mui-card\">\r\n           <form class=\"mui-input-group\">\r\n              <div class=\"mui-input-row\">\r\n                  <label>邮箱</label>\r\n                  <input type=\"text\" class=\"mui-input-clear\" v-model=\"email\" placeholder=\"请输入邮箱地址\">\r\n              </div>\r\n          </form>\r\n       </div>\r\n       <h5 style=\"color: red;text-align: center\" v-show=\"!valid\">请输入正确邮箱格式</h5>\r\n       <div style=\"padding: 15px\">\r\n        <a style=\"padding: 6px 0\" class=\"mui-btn mui-btn-block mui-btn-blue\" v-on=\"click:onBind\">绑定</a>\r\n    </div>\r\n   </div>\r\n</div>\r\n",
    data: function () {
        return {
            email:"",
            valid:true
        }
    },
    methods:{
        onBind: function () {
            if(!this.email||!Check(this.email,"email")){
                this.valid = false;
            }else{
                this.valid = true;
                Layer.open({
                    content:"提交中",
                    type:2,
                    shadeClose:false
                });
                Server.userBind(JSON.stringify({
                    openID:this.openid,
                    email:this.email
                }), function (rep) {
                    Layer.closeAll();
                    if(rep.Code == 0){
                        Layer.open({
                            content:rep.Response.value,
                            btn:["确定"],
                            yes: function () {
                                WeixinJSBridge.call('closeWindow');
                            }
                        })
                    }else{
                        Layer.open({
                            content:rep.Message,
                            btn:["确定"],
                            yes: function () {
                                WeixinJSBridge.call('closeWindow');
                            }
                        })
                    }

                })
            }
        }
    }
});

});

;/*!/components/component/navbar/navbar.js*/
define('navbar/navbar', function(require, exports, module) {

/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-nav",{
    inherit:true,
    template:"<nav class=\"mui-bar mui-bar-tab\"  >\r\n    <a class=\"mui-tab-item\" v-class=\"mui-active:view =='search'\" v-on=\"click:onClick('#search')\">\r\n        <span class=\"mui-icon mui-icon-search\"></span>\r\n        <span class=\"mui-tab-label\">搜索</span>\r\n    </a>\r\n    <a class=\"mui-tab-item\" v-class=\"mui-active:view =='order'\" v-on=\"click:onClick('#order')\"  >\r\n        <span class=\"mui-icon icon-font  mui-icon-phone\"></span>\r\n        <span class=\"mui-tab-label\">订单</span>\r\n    </a>\r\n    <a class=\"mui-tab-item\" v-class=\"mui-active:view =='validate'\"  v-on=\"click:onClick('#validate')\">\r\n        <span class=\"mui-icon mui-icon-compose\"></span>\r\n        <span class=\"mui-tab-label\">验票</span>\r\n    </a>\r\n    <a class=\"mui-tab-item\" v-class=\"mui-active:view =='config'\" v-on=\"click:onClick('#config')\">\r\n        <span class=\"mui-icon mui-icon-list\"></span>\r\n        <span class=\"mui-tab-label\">服务</span>\r\n    </a>\r\n</nav>",
    props:["view"],
    methods:{
        onClick: function (hash) {
            window.location.hash = hash;
        }
    },
    ready: function () {

    }
});

});

;/*!/components/page/order/order.js*/
define('components/page/order/order', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;

module.exports = Vue.extend({
    inherit:true,
    template:"<div class=\"page-order\">\r\n    <div class=\"mui-control-content mui-active\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                已选列表\r\n            </h5>\r\n            <a class=\"mui-icon mui-icon-refresh mui-pull-right\" v-on=\"click:reload\"></a>\r\n        </header>\r\n        <div class=\"mui-content mui-scroll-wrapper\">\r\n            <div class=\"mui-scroll\">\r\n                <ul class=\"mui-table-view mui-list\">\r\n                    <div v-repeat=\"tickets in order\">\r\n                        <li class=\"mui-table-view-divider\">{{tickets.date}}</li>\r\n                        <li class=\"mui-table-view-cell mui-media\" v-repeat=\"o in tickets.data\">\r\n                            <a>\r\n                                <img style=\"width: 42px;\" class=\"mui-media-object mui-pull-left\" v-attr=\"src:o.bus.src||'/admin/static/images/128.png'\">\r\n                                <div class=\"mui-media-body\">\r\n                                    <h4 class=\"mui-ellipsis-2\"  style=\"color: blue;font-weight: bold;font-size: 14px;\"> {{o.bus.line}}</h4>\r\n                                    <p class=\"mui-ellipsis-2\" style=\"padding-right: 55px;\">{{o.user.name}}<span v-show=\"o.source\" class=\"mui-badge mui-badge-warning\">{{getSourceName(o.source)}} 代</span> {{o.bus.name}} {{o.seat.sn}}座 {{o.bus.goff}} 出发</p>\r\n                                </div>\r\n                                <button v-show=\"canRefund(o)\" class=\"mui-btn mui-btn-negative mui-btn-outlined\" v-on=\"click:unSub(o)\">\r\n                                    退订\r\n                                </button>\r\n\r\n                                <span v-show=\"!canRefund(o)\" class=\"mui-badge\">已过期</span>\r\n                            </a>\r\n                        </li>\r\n                    </div>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <c-nav view=\"order\">\r\n    </c-nav>\r\n</div>",
    data:function(){
        return {
            order:[]
        }
    },
    methods:{
        render: function () {
            var self = this;
            Layer.open({
                content:"加载中",
                type:2,
                shadeClose:false,
                shade:"background-color:rgba(0,0,0,0)"
            });
            this._getDateRange();

            Service.getMyTicket(self._getDateRange(),function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.order =self._transData(rep.Response);
                    mui(".page-order .mui-scroll-wrapper").scroll();
                }
            })
        },
        reload: function () {
            this.render();
        },
        getSourceName: function (o) {
            if(o){
                return o.name;
            }
        },
        unSub: function (o) {
            var self = this;
            Layer.open({
                content:"确定退订"+ o.date+"的"+ o.seat.sn+"号座位？",
                btn:["确定","取消"],
                shadeClose:false,
                yes: function () {
                    Layer.closeAll();
                    self._unSubTicket(o._id);
                },no: function () {
                    Layer.closeAll();
                }
            });
        },
        _unSubTicket: function (id) {
            var self = this;
            Service.unSubTicket(id, function () {
                self.reload();
            });
        },
        _transData: function (data) {
            if(data.length>0){
                var target = {};
                for(var i in data){
                    target[data[i].date] = [];
                }

                for(var i in data){
                    for(var d in target){
                        if(data[i].date == d){
                            target[d].push(data[i]);
                        }
                    }
                }
                var n = [];
                for(var i in target){
                    n.push({date:i,data:target[i]});
                }
                return n.reverse();
            }
            return [];
        },
        canRefund: function (o) {
            var now = Date.parse(new Date())/1000,list = [];
            var time = Date.parse(new Date(o.date.replace(/-/g,"/")+" "+o.bus.goff))/1000;
            var diff = now - time;

            return diff<this.beginTime*-1;
        },
        _getDateRange: function () {
            var tran = function (d) {
                if(d < 10 ){
                    return "0"+String(d);
                }
                return String(d);
            };
            var date = new Date();
            var begin = String(date.getFullYear())+"-"+tran(date.getMonth()+1)+"-"+tran(date.getDate());
            var edate = new Date(date.valueOf()+ 6*24*60*60*1000);
            var end = String(edate.getFullYear())+"-"+tran(edate.getMonth()+1)+"-"+tran(edate.getDate());

            return {begin:begin,end:end};

        }
    },
    compiled: function () {
        this.render();
        var self = this;
        this.$on("ReloadOrder", function () {
            self.reload();
        })
    }
});

});

;/*!/components/page/order/orderdetail/orderdetail.js*/
define('components/page/order/orderdetail/orderdetail', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;

module.exports = Vue.extend({
    inherit:true,
    template:"<div class=\"page-orderdetail\">\r\n    <header class=\"mui-bar-nav mui-bar\">\r\n        <h5 class=\"mui-title\">\r\n            车辆验票\r\n        </h5>\r\n        <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" href=\"#order\"></a>\r\n    </header>\r\n    <div class=\"mui-content\">\r\n\r\n        <div class=\"mui-card twinkling\" style=\"padding: 8px;\">\r\n            <h5 style=\"text-align: right;padding-top: 5px;\">\r\n               <span style=\"font-size: 16px;font-weight: bold;color: #000;float: left\">{{ticket.user.name}}</span>\r\n                <span style=\"color: #666;\">{{ticket.user.department}}{{ticket.user.unit}}</span>\r\n            </h5>\r\n            <div style=\"text-align: center;color: red;font-weight: bold;font-size: 25px;margin: 5px 0;font-weight: bold;\">\r\n                {{ticket.bus.name}} {{ticket.seat.sn}}号座\r\n            </div>\r\n            <div >\r\n                <span>   {{ticket.bus.line}}</span><span style=\"float: right\">{{ticket.bus.goff}} 开</span>\r\n            </div>\r\n            <div style=\"text-align: right\">\r\n                <h5>{{ticket.date}} </h5>\r\n            </div>\r\n            <h5 style=\"text-align: center\">\r\n\r\n            </h5>\r\n\r\n        </div>\r\n\r\n    </div>\r\n</div>",
    data:function(){
        return {
            ticket:{
                user:{},
                bus:{},
                seat:{}
            }
        }
    },
    methods:{
        render: function () {
            var self = this;
            Layer.open({
                content:"加载中",
                type:2,
                shadeClose:false,
                shade:"background-color:rgba(0,0,0,0)"
            });

            Service.getMyTicket(function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    var lst =  rep.Response;
                    for(var i =0;i<lst.length;i++){
                        if(lst[i]._id = self.detailTicket){
                            return self.ticket = lst[i];
                        }
                    }

                }
            })
        },
        reload: function () {
            this.render();
        }
    },
    compiled: function () {
        this.render();
    }
});

});

;/*!/components/page/tel/tel.js*/
define('components/page/tel/tel', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var Router = require('component_modules/director.js').Router;
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

;/*!/components/page/history/history.js*/
define('components/page/history/history', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;

module.exports = Vue.extend({
    inherit:true,
    template:"<div class=\"page-history\">\r\n    <header class=\"mui-bar-nav mui-bar\">\r\n        <h5 class=\"mui-title\">\r\n            历史订单\r\n        </h5>\r\n        <a class=\"mui-icon mui-icon-arrowleft\" href=\"#config\"></a>\r\n    </header>\r\n    <div class=\"mui-content \" style=\"height: {{height}}px;overflow-y:auto\">\r\n        <div class=\"mui-card\">\r\n            <div class=\"mui-input-group\">\r\n                <div class=\"mui-input-row\">\r\n                    <label>查询日期</label>\r\n                    <input type=\"button\" v-on=\"click:showDatePicker\" v-attr=\"value:date||'请选择时间'\" style=\"height: 40px\" >\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <ul class=\"mui-table-view\" v-show=\"order.length>0\" style=\"margin-top: 10px;\">\r\n            <li class=\"mui-table-view-cell mui-media\" v-repeat=\"o in order\">\r\n                <a>\r\n                    <img style=\"width: 42px;\" class=\"mui-media-object mui-pull-left\" v-attr=\"src:o.bus.src||'/admin/static/images/128.png'\">\r\n                    <div class=\"mui-media-body\">\r\n                        <h4 class=\"mui-ellipsis-2\"  style=\"color: blue;font-weight: bold;font-size: 14px;\"> {{o.bus.line}}</h4>\r\n                        <p class=\"mui-ellipsis-2\" style=\"padding-right: 55px;\">{{o.user.name}}<span v-show=\"o.source\" class=\"mui-badge mui-badge-warning\">{{getSourceName(o.source)}} 代</span> {{o.bus.name}} {{o.seat.sn}}座 {{o.bus.goff}} 出发</p>\r\n                    </div>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n        <h5 v-show=\"date!=''&&order.length==0\" style=\"margin-top: 10px;text-align: center\" class=\"text-center\" >对不起，没有查询到您的相关订票记录。</h5>\r\n    </div>\r\n</div>\r\n\r\n",
    data:function(){
        return {
            date:"",
            order:[],
            height:document.documentElement.clientHeight-44
        }
    },
    methods:{
        render: function () {

        },
        showDatePicker: function () {
            var self = this;
            this.picker.show(function (d) {
                self.date = d.text;
            });
        },
        getSourceName: function (o) {
            if(o){
                return o.name;
            }
        },
        getTicket: function () {
            Layer.open({
                content: "查询中",
                type: 2,
                shadeClose: false,
                shade: false
            });
            var self = this;
            Service.getMyTicket({date:this.date,old:true},function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.order = rep.Response;
                }
            })
        }
    },
    watch:{
        "date": function () {
            this.getTicket();
        }
    },
    ready: function () {
        this.picker = new mui.DtPicker({"type":"date","beginYear":2015});
    }
});

});

;/*!/components/page/approve/approve.js*/
define('components/page/approve/approve', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var Router = require('component_modules/director.js').Router;
var Layer = require('component_modules/layer.m.js').layer;
var Service =require("main/service.js");

module.exports = Vue.extend({
    inherit:true,
    template:"\r\n<div class=\"page-search-result\" >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" href=\"#config\"></a>\r\n        <h5 class=\"mui-title\">\r\n            合作单位人员审批\r\n        </h5>\r\n        <a class=\"mui-icon mui-icon-refresh mui-pull-right\" v-on=\"click:getApprove\"></a>\r\n    </header>\r\n\r\n    <div class=\"mui-content\" v-show=\"users.length>0\">\r\n\r\n        <ul class=\"mui-table-view mui-list\" style=\"margin-top: 20px;\">\r\n\r\n            <li class=\"mui-table-view-cell mui-media\" v-repeat=\"r in users\">\r\n                <a class=\"mui-navigate-right\" v-on=\"click:getApproveuser(r)\">\r\n                    <div class=\"mui-media-body\">\r\n                        {{r.name}}\r\n                        <p>单位：{{r.company}}\r\n                           </p>\r\n                    </div>\r\n                </a>\r\n            </li>\r\n\r\n        </ul>\r\n\r\n        <!--<ul class=\"mui-table-view\">-->\r\n            <!--<li class=\"mui-table-view-cell mui-media\" v-repeat=\"r in users\">-->\r\n                    <!--<div class=\"mui-media-body\" v-on=\"click:getApproveuser(r)\">-->\r\n                        <!--<h4 class=\"mui-ellipsis-2\" style=\"font-weight: bold;font-size: 14px;color: #007aff;\"> {{r.name}}</h4>-->\r\n                        <!--<p>-->\r\n                            <!--单位：{{r.company}}-->\r\n                            <!--电话：{{r.mobile}}-->\r\n                        <!--</p>-->\r\n                    <!--</div>-->\r\n            <!--</li>-->\r\n        <!--</ul>-->\r\n        <div style=\"height:50px;\"></div>\r\n    </div>\r\n\r\n\r\n\r\n\r\n</div>",
    data: function () {
        return {


        }
    },
    methods:{
        getApprove: function () {
            var self = this;
            Layer.open({
                content:"确定同意审批？",
                btn:["确定","取消"],
                shadeClose:false,
                yes: function () {
                    Layer.closeAll();
                    Layer.open({
                        content: "加载中",
                        type: 2,
                        shadeClose: false,
                        shade: false
                    });

                    Service.approveUsers(function (rep) {

                    });

                    Service.findUsers(function (rep) {
                        if(rep.Code == 0){
                            self.users = rep.Response;
                        }
                        Layer.closeAll();

                    });
                },no: function () {
                    Layer.closeAll();
                }
            });


        },

        getApproveuser: function (user) {



                        this.user = user;
                        var router = new Router();
                        return router.setRoute("approve/approvemore");




        }
    },
    ready: function () {

        var self = this;
        Service.findUsers(function (rep) {
            self.users = rep.Response
        });
    }

});

});

;/*!/components/page/approve/approvemore/approvemore.js*/
define('components/page/approve/approvemore/approvemore', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var Router = require('component_modules/director.js').Router;
var Layer = require('component_modules/layer.m.js').layer;
var Service =require("main/service.js");

module.exports = Vue.extend({
    inherit:true,
    template:"\r\n<div class=\"page-search-result\" >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" href=\"#approve\"></a>\r\n        <h5 class=\"mui-title\">\r\n            合作单位人员审批\r\n        </h5>\r\n\r\n    </header>\r\n\r\n\r\n\r\n\r\n    <div class=\"mui-content\" >\r\n\r\n        <ul class=\"mui-table-view\">\r\n            <li class=\"mui-table-view-cell mui-media\" >\r\n                <div class=\"mui-media-body\" >\r\n                    <table class=\"table\">\r\n\r\n                        <tr >\r\n                            <td>姓名：</td>\r\n                            <td>{{user.name}}</td>\r\n\r\n                        </tr>\r\n                        <tr >\r\n                            <td>电话：</td>\r\n                            <td>{{user.mobile}}</td>\r\n\r\n                        </tr>\r\n                        <tr >\r\n                            <td>身份证号：</td>\r\n                            <td>{{user.sn}}</td>\r\n\r\n                        </tr>\r\n                        <tr >\r\n                            <td>单位：</td>\r\n                            <td>{{user.company}}</td>\r\n\r\n                        </tr>\r\n                        <tr >\r\n                            <td> 原因：</td>\r\n                            <td >{{user.yy}}</td>\r\n\r\n                        </tr>\r\n                    </table>\r\n                </div>\r\n\r\n            </li>\r\n        </ul>\r\n        <div style=\"height:50px;\"></div>\r\n    </div>\r\n    <button class=\"mui-btn mui-btn-block\"  v-on=\"click:isApprove(user._id)\" >\r\n        <span class=\"mui-icon mui-icon-search\"></span>同意\r\n    </button>\r\n    <button class=\"mui-btn mui-btn-block\"  v-on=\"click:unApprove(user._id)\" >\r\n        <span class=\"mui-icon mui-icon-search\"></span>不同意\r\n    </button>\r\n\r\n\r\n</div>",
    data: function () {
        return {



        }
    },
    methods:{

        isApprove: function (id) {
     var self = this;
            Layer.open({
                content:"确定同意审批？",
                btn:["确定","取消"],
                shadeClose:false,
                yes: function () {
                    Layer.closeAll();
                    Service.Approveuser({_id:id},function (rep) {
                        Service.findUsers(function (rep) {
                            if(rep.Code == 0){
                                self.users = rep.Response;
                            }

                        });
                        var router = new Router();
                        return router.setRoute("approve");
                    });
                },no: function () {
                    Layer.closeAll();
                }
            });

 },
        unApprove: function (id) {
            var self = this;
            Layer.open({
                content:"确定拒绝审批？",
                btn:["确定","取消"],
                shadeClose:false,
                yes: function () {
                    Layer.closeAll();
                    Service.unApproveuser({_id:id},function (rep) {
                        Service.findUsers(function (rep) {
                            if(rep.Code == 0){
                                self.users = rep.Response;
                            }

                        });
                        var router = new Router();
                        return router.setRoute("approve");
                    });
                },no: function () {
                    Layer.closeAll();
                }
            });



        }
    },
    ready: function () {

    }
});

});

;/*!/components/page/search/search.js*/
define('components/page/search/search', function(require, exports, module) {


   /**
    * Created by jack on 2015/8/19.
    */

   var Vue = require("component_modules/vue.js");
   var nav = require("navbar/navbar.js");
   var Router = require('component_modules/director.js').Router;
   var Layer = require('component_modules/layer.m.js').layer;
   var Service =require("main/service.js");

   module.exports = Vue.extend({
      inherit:true,
      template:"<div class=\"page-search\" >\r\n    <div class=\"mui-control-content mui-active\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                班车查询\r\n            </h5>\r\n        </header>\r\n        <div class=\"mui-content mui-scroll-wrapper\">\r\n            <div class=\"mui-scroll\">\r\n                <h5 class=\"mui-content-padded\">出发时间</h5>\r\n                <div class=\"mui-card\">\r\n                    <form class=\"mui-input-group\">\r\n                        <div class=\"mui-input-row mui-radio\" v-repeat=\"d in date\" v-on=\"click:onSelectDate(d)\">\r\n                            <label>{{d.text}}</label>\r\n                            <input name=\"radio1\" type=\"radio\" >\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n                <h5 class=\"mui-content-padded\">目的地</h5>\r\n                <div class=\"mui-card\">\r\n                    <ul class=\"mui-table-view\">\r\n                        <li class=\"mui-table-view-cell\" v-on=\"click:onSearch('昌江')\">\r\n                            <a class=\"mui-navigate-right\">\r\n                                前往昌江\r\n                            </a>\r\n                        </li>\r\n                        <li class=\"mui-table-view-cell\" v-on=\"click:onSearch('海口')\">\r\n                            <a class=\"mui-navigate-right\">\r\n                                前往海口\r\n                            </a>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n                <h5 class=\"mui-content-padded\">&nbsp;</h5>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <c-nav view=\"search\">\r\n    </c-nav>\r\n</div>",
      data: function () {
         return {
            date:[],
            style:{
               height:0
            }
         }
      },
      methods:{
         onClick: function (hash) {
            var router = new Router();
            router.setRoute(hash);
         },
         onSelectDate: function (d) {
            this.search.date  = d.value;
         },
         onSearch: function (whither) {
            this.search.whither = whither;
            if(this.valid()){
               var self = this;
               Layer.open({
                  content:"查询中",
                  type:2,
                  shadeClose:true
               });

               Service.getResult({date:self.search.date,dest:whither},function (rep) {
                  Layer.closeAll();
                  if(rep.Code == 0){
                     self.result = self._checkOutBus(self.filterBus(rep.Response));
                     var router = new Router();
                     return router.setRoute("search/result");
                  }
               })
            }
         },
         filterBus: function (data) {
            return Service.filterBus(data);
         },
         _checkOutBus: function (data) {
            var now = Date.parse(new Date());
            for(var i in data){
               var t = Date.parse(new Date(data[i].date.replace(/-/g,"/")));
               if(now > t){
                  data[i].offTime = true;
               }else{
                  data[i].offTime = false;
               }
            }
            return data;
         },
         valid: function () {
            var str = null;
            if(!this.search.date){
               str = "请先选择出发时间！";
            }
            if(this.search.whither =="请选择"){
               str = "请先选择目的地！";
            }
            if(str){
               Layer.open({
                  content:str,
                  shadeClose:false,
                  btn:["确定"],
                  yes: function () {
                     Layer.closeAll();
                  }
               })
            }
            return !str;
         }
      },
      ready: function () {

         var self = this;

         var ctx = Service.getContext({});

         var advance = ctx['config'] ? (ctx['config']['advance'] || 7) : 7;

         Service.getCalendar({max:advance}, function (rep) {

            if(rep.Code == 0){

               var target = rep.Response;
               var lst = [];
               for(var i=0;i<target.length;i++){
                  lst.push({
                     value:target[i].value,
                     text:target[i].name +" " + target[i].week + ( (i==0) ? "（今天）":"")
                  })
               }
               self.calendars =self.date = lst;

               mui(".page-search .mui-scroll-wrapper").scroll();
            }
         });
      }
   });



});

;/*!/components/page/search/result/result.js*/
define('components/page/search/result/result', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Router = require('component_modules/director').Router;
var Layer = require("component_modules/layer.m.js").layer;

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-search-result\" >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" v-on=\"click:toRouter('search')\"></a>\r\n        <h5 class=\"mui-title\">\r\n            查询结果\r\n        </h5>\r\n        <a class=\"mui-icon mui-icon-refresh mui-pull-right\" v-on=\"click:getResult\"></a>\r\n    </header>\r\n\r\n    <div class=\"mui-content\" v-show=\"result.length>0\">\r\n        <h5 class=\"mui-content-padded\">\r\n            {{result.length}}/{{result.length}}车次\r\n        </h5>\r\n        <ul class=\"mui-table-view\">\r\n            <li class=\"mui-table-view-cell mui-media\" v-repeat=\"r in result\">\r\n                <a v-if=\"r.offTime\" v-class=\"mui-navigate-right:!r.offTime\"  >\r\n                    <img style=\"max-width: 62px;width: 62px;height: 62px;\" class=\"mui-media-object mui-pull-left\" v-attr=\"src:r.src||'/admin/static/images/128.png'\">\r\n                    <div class=\"mui-media-body\">\r\n                        <h4 class=\"mui-ellipsis-2\" style=\"font-weight: bold;font-size: 14px;color: #007aff;\"> {{r.line}}</h4>\r\n                        <div style=\"color: #8f8f94\">{{r.name}} {{r.order}}/{{r.void + r.order}}</div>\r\n                        <p>\r\n                            {{r.date}}至{{r.arrive}}\r\n                        </p>\r\n                    </div>\r\n                    <span v-show=\"r.offTime\" class=\"mui-badge\">过期</span>\r\n                </a>\r\n\r\n                <a v-if=\"!r.offTime\" v-class=\"mui-navigate-right:!r.offTime\"  href=\"#bus/{{r.id}}/{{search.date}}/{{r.offTime}}\" >\r\n                    <img style=\"max-width: 62px;width: 62px;height: 62px;\" class=\"mui-media-object mui-pull-left\" v-attr=\"src:r.src||'/admin/static/images/128.png'\">\r\n                    <div class=\"mui-media-body\">\r\n                        <h4 class=\"mui-ellipsis-2\" style=\"font-weight: bold;font-size: 14px;color: #007aff;\"> {{r.line}}</h4>\r\n                        <div style=\"color: #8f8f94\">{{r.name}} {{r.order}}/{{r.void + r.order}}</div>\r\n                        <p>\r\n                            {{r.date}}至{{r.arrive}}\r\n                        </p>\r\n                    </div>\r\n                    <span v-show=\"r.offTime\" class=\"mui-badge\">过期</span>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n        <div style=\"height:50px;\"></div>\r\n    </div>\r\n    \r\n    <div v-show=\"result.length==0\" class=\"mui-content-padded mui-text-center\" style=\"padding-top: 50px;\">\r\n        <img src=\"/static/images/noticket.gif\">\r\n        <div>对不起，没有车了，您可选择其他日期。</div>\r\n    </div>\r\n\r\n    <nav class=\"mui-bar mui-bar-tab\">\r\n        <div class=\"time-nav\">\r\n            <span class=\"mui-action mui-action-previous mui-icon mui-icon-back\" v-on=\"click:btnPrev\"></span>\r\n            <span class=\"time\">{{search.date}}</span>\r\n            <span class=\"mui-action mui-action-next mui-icon mui-icon-forward\" v-on=\"click:btnNext\"></span>\r\n        </div>\r\n    </nav>\r\n</div>",
   methods:{

      btnPrev: function () {
         var i = 0;
         for(;i<this.calendars.length;i++){
            if(this.calendars[i].value == this.search.date){
               if(i>0){
                  this.search.date = this.calendars[i-1].value;
                  return this.getResult();
               }
            }
         }
      },

      btnNext: function () {
         var i = 0;
         for(;i<(this.calendars.length-1);i++){
            if(this.calendars[i].value == this.search.date){
               this.search.date = this.calendars[i+1].value;
               return this.getResult();
            }
         }
      },

      getResult: function () {
         var self = this;
         self.bus = [];
         Layer.open({
            content: "加载中",
            type: 2,
            shadeClose: false,
            shade: false
         });
         Service.getResult({date:self.search.date,dest:self.search.whither},function (rep) {

            if(rep.Code == 0){
               self.result =self._checkOutBus(self.filterBus(rep.Response));
            }
            Layer.closeAll();
         })
      },

      selectBus: function (busid,date,off) {
         if(off){
            return Layer.open({
               content: "已超过订车时间，请选择其他班车。",
               btn:["确定"]
            });
         }else{
            var self = this;
            Layer.open({
               content:"加载中",
               type:2,
               shadeClose:false,
               shade:"background-color:rgba(0,0,0,0)"
            });
            Service.getBusSeat({bus:busid,date:date},function (rep) {
               Layer.closeAll();
               if(rep.Code == 0){
                  self.bus = rep.Response;
                  var router = new Router();
                  return router.setRoute("bus");
               }
            })
         }
      },
      toRouter: function (url) {
         var router = new Router();
         return router.setRoute(url);
      },
      filterBus: function (data) {
         return Service.filterBus(data);
      },
      _checkOutBus: function (data) {
         var now = Date.parse(new Date());
         for(var i in data){
            var t = Date.parse(new Date(data[i].date.replace(/-/g,"/")));
            if(now > t){
               data[i].offTime = true;
            }else{
               data[i].offTime = false;
            }
         }
         return data;

      }
   },
   computed:{

   },
   ready: function () {

      var self = this;

      if(typeof self.search.date != "string"){
         var router = new Router();
         return router.setRoute("search");
      }

      this.$on("backReload", function () {
         self.getResult();
      })
   }
});

});

;/*!/components/page/validate/validate.js*/
define('components/page/validate/validate', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;

module.exports =   Vue.extend({
   inherit:true,
   template:"<div class=\"page-service\">\r\n    <div class=\"mui-control-content mui-active\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                验票\r\n            </h5>\r\n        </header>\r\n        <div class=\"mui-content  mui-scroll-wrapper\">\r\n            <div class=\"mui-scroll\">\r\n                <h5 v-if=\"list.length==0\" style=\"text-align: center;margin-top:100px;\">注：出发前半小时开始验票</h5>\r\n\r\n                <div v-repeat=\"l in list\" v-show=\"list.length>0\" class=\"mui-card twinkling\" style=\"padding: 8px;margin-top:20px;\">\r\n                    <h5 style=\"text-align: right;padding-top: 5px;\">\r\n                        <span style=\"font-size: 16px;font-weight: bold;color: #000;float: left\">{{l.user.name}}</span>\r\n                        <span style=\"color: #666;\">{{l.user.department}}{{l.user.unit}}</span>\r\n                    </h5>\r\n                    <div style=\"text-align: center;color: red;font-weight: bold;font-size: 25px;margin: 10px 0;font-weight: bold;\">\r\n                        {{l.bus.name}} {{l.seat.sn}}号座\r\n                    </div>\r\n                    <div >\r\n                        <span>   {{l.bus.line}}</span><span style=\"float: right\">{{l.bus.goff}} 开</span>\r\n                    </div>\r\n                    <div style=\"text-align: right\">\r\n                        <h5>{{l.date}} </h5>\r\n                    </div>\r\n                    <h5 style=\"text-align: center\">\r\n\r\n                    </h5>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n    <c-nav view=\"validate\"></c-nav>\r\n</div>",
   data: function () {
      return {
         list:[]
      }
   },
   methods:{
      render: function () {
         var self = this;
         Service.getMyTicket(function (rep) {
            if(rep.Code == 0){
               self.valid(rep.Response);
               mui(".page-service .mui-scroll-wrapper").scroll();
            }
         })
      },
      valid: function (data) {
         var now = Date.parse(new Date())/1000,list = [];
         for(var i in data){
            var time = Date.parse(new Date(data[i].date.replace(/-/g,"/")+" "+data[i].bus.goff))/1000;
            var diff = now - time;

            if(diff>=-this.beginTime&&diff<=this.endTime){
               list.push(data[i]);
            }
         }
         this.list = list;
      }
   },
   ready: function () {
      var self = this;
      this.render();
      setInterval(function () {
         self.render();
      },60000)
   }
});

});

;/*!/components/page/config/config.js*/
define('components/page/config/config', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;
module.exports =   Vue.extend({
   template:"<div class=\"page-config\" style=\"height: 100%\">\r\n    <div class=\"mui-control-content mui-active\" style=\"height: 100%\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                系统服务\r\n            </h5>\r\n        </header>\r\n        <div class=\"mui-content mui-scroll-wrapper\">\r\n            <div class=\"mui-scroll\">\r\n                <ul class=\"mui-table-view mui-list\" style=\"margin-top: 20px;\">\r\n                    <i class=\" mui-pull-left iconfont icon-user\"></i>\r\n                    <li class=\"mui-table-view-cell mui-media\">\r\n                        <a class=\"mui-navigate-right\" >\r\n                            <div class=\"mui-media-body\">\r\n                                {{mine.name}}\r\n                                <p>{{mine.email}}</p>\r\n                            </div>\r\n                        </a>\r\n                    </li>\r\n\r\n                </ul>\r\n\r\n                <ul class=\"mui-table-view mui-list\" style=\"margin-top: 25px;\">\r\n                    <i class=\" mui-pull-left iconfont icon-users\"></i>\r\n                    <li class=\"mui-table-view-cell\">\r\n                        <a class=\"mui-navigate-right\" href=\"#relation\">\r\n                            代订座人维护\r\n                        </a>\r\n                    </li>\r\n\r\n                    <i class=\" mui-pull-left iconfont icon-tuangou\"></i>\r\n                    <li class=\"mui-table-view-cell\">\r\n                        <a class=\"mui-navigate-right\" href=\"#company\">合作单位订位查询\r\n                        </a>\r\n                    </li>\r\n\r\n                    <i class=\" mui-pull-left iconfont icon-tuangou\"></i>\r\n                    <li class=\"mui-table-view-cell\">\r\n                        <a class=\"mui-navigate-right\" href=\"#approve\">合作单位人员审批\r\n                        </a>\r\n                    </li>\r\n\r\n\r\n                </ul>\r\n\r\n                <h5 style=\"margin-top: 5px\" class=\"mui-content-padded\">其他应用</h5>\r\n                <ul class=\"mui-table-view mui-list \">\r\n                    <i class=\" mui-pull-left iconfont icon-plane\"></i>\r\n                    <li class=\"mui-table-view-cell mui-media\">\r\n                        <a class=\"mui-navigate-right\" href=\"http://m.ctrip.com/html5/flight/#&do_not_show_add_to_home_tip=1\">\r\n                            <div class=\"mui-media-body\">\r\n                                航班信息查询\r\n                            </div>\r\n                        </a>\r\n                    </li>\r\n                    <i class=\" mui-pull-left iconfont icon-train\"></i>\r\n                    <li class=\"mui-table-view-cell mui-media\">\r\n                        <a class=\"mui-navigate-right\" href=\"http://m.ctrip.com/webapp/train/\">\r\n                            <div class=\"mui-media-body\">\r\n                                火车信息查询\r\n                            </div>\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n                <ul class=\"mui-table-view mui-list\" style=\"margin-top: 25px;\">\r\n                    <i class=\" mui-pull-left iconfont icon-time\"></i>\r\n                    <li class=\"mui-table-view-cell\">\r\n                        <a class=\"mui-navigate-right\" href=\"#history\">\r\n                            历史订单\r\n                        </a>\r\n                    </li>\r\n                    <i class=\" mui-pull-left iconfont icon-target\"></i>\r\n                    <li class=\"mui-table-view-cell mui-media\">\r\n                        <a href=\"http://mp.weixin.qq.com/s?__biz=MzIxOTEwMDcwOQ==&mid=400376477&idx=1&sn=aaf861f22ac9ffc3a18bf13eaf858eb7&scene=18#wechat_redirect\" class=\"mui-navigate-right\" >\r\n                            帮助文档\r\n                        </a>\r\n                    </li>\r\n                    <i class=\" mui-pull-left iconfont icon-bus\"></i>\r\n                    <li class=\"mui-table-view-cell mui-media\">\r\n                        <a href=\"#tel\" class=\"mui-navigate-right\" >\r\n                            常用电话\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n                <div class=\"mui-content-padded\" style=\"margin-top: 25px;margin-bottom: 60px;\">\r\n                    <button v-on=\"click:unBind\" class=\"mui-btn mui-btn-block mui-btn-warning\" style=\"padding: 8px;\">\r\n                        解除绑定\r\n                    </button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <c-nav view=\"config\"></c-nav>\r\n</div>",
   data: function () {
      return {
         mine:{}
      }
   },
   methods:{
      unBind: function () {
         Layer.open({
            content:"确定解绑该账号？",
            btn:["确定","取消"],
            shadeClose:false,
            yes: function () {
               Service.unbind(function (rep) {
                  if(rep.Code == 0){
                     alert("解绑成功！");
                  }
                  WeixinJSBridge.call('closeWindow');
               });
               Layer.closeAll();
            },
            no: function () {
               Layer.closeAll();
            }
         });
      }
   },
   ready: function () {
      var self = this;
      Layer.open({
         content:"加载中",
         type:2,
         shadeClose:false,
         shade:"background-color:rgba(0,0,0,0)"
      });
      Service.getMine(function (rep) {
         Layer.closeAll();
         if(rep.Code == 0){
            self.mine = rep.Response;
         }
      })

      mui(".page-config .mui-scroll-wrapper").scroll();
   }
});

});

;/*!/components/page/whither/whither.js*/
define('components/page/whither/whither', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var nav = require("navbar/navbar.js");
var service = require("main/service.js");
var Router = require('component_modules/director').Router;
var Layer =  require('component_modules/layer.m.js').layer;
module.exports =   Vue.extend({
   inherit:true,
   template:"<div class=\"page-whither\">\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" v-on=\"tap:toRouter('search')\"></a>\r\n        <h5 class=\"mui-title\">\r\n            选择目的地\r\n        </h5>\r\n    </header>\r\n    <div class=\"mui-content\">\r\n        <div id='list' class=\"mui-indexed-list\">\r\n            <div class=\"mui-indexed-list-search mui-input-row mui-search\">\r\n                <input type=\"search\" class=\"mui-input-clear mui-indexed-list-search-input\" placeholder=\"搜查名称或首字母\">\r\n            </div>\r\n            <div class=\"mui-indexed-list-bar\">\r\n                <a>A</a>\r\n                <a>B</a>\r\n                <a>C</a>\r\n                <a>D</a>\r\n                <a>E</a>\r\n                <a>F</a>\r\n                <a>G</a>\r\n                <a>H</a>\r\n                <a>I</a>\r\n                <a>J</a>\r\n                <a>K</a>\r\n                <a>L</a>\r\n                <a>M</a>\r\n                <a>N</a>\r\n                <a>O</a>\r\n                <a>P</a>\r\n                <a>Q</a>\r\n                <a>R</a>\r\n                <a>S</a>\r\n                <a>T</a>\r\n                <a>U</a>\r\n                <a>V</a>\r\n                <a>W</a>\r\n                <a>X</a>\r\n                <a>Y</a>\r\n                <a>Z</a>\r\n            </div>\r\n            <div class=\"mui-indexed-list-alert\"></div>\r\n            <div class=\"mui-indexed-list-inner\">\r\n                <div class=\"mui-indexed-list-empty-alert\">没有数据</div>\r\n                <ul class=\"mui-table-view\" id=\"whither-list\">\r\n                   <li data-group=\"{{v.group}}\" v-repeat=\"v in whithers\" data-index=\"{{$index}}\" class=\"mui-table-view-divider mui-indexed-list-group\">\r\n                        {{v.group}}\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n</div>",
   data: function () {
   },
   ready: function () {
      var self = this;
      Layer.open({
         content:"加载中",
         type:2,
         shadeClose:false,
         shade:"background-color:rgba(0,0,0,0)"
      });
      service.getWhither(function (rep) {
         Layer.closeAll();
         if(rep.Code == 0){
            self.whithers = rep.Response;
            Vue.nextTick(function () {
               self.render();
            })
         }
      });
   },
   methods:{
      toRouter: function (url) {
         var router = new Router();
         router.setRoute(url);
      },
      render: function () {
         var self = this,$list = $("#whither-list");
         self.router = new Router();

         var lst = $list.find(".mui-indexed-list-group");
         lst.each(function (index,target) {
            for(var i=0;i<self.whithers.length;i++){
               if($(target).data("group") == self.whithers[i].group){
                  var ws = self.whithers[i].list;
                  for(var l=0;l<ws.length;l++){
                     $(target).after(' <li data-value='+ws[l].id+' data-index='+l+' data-name='+ws[l].name+' data-tags='+ws[l].tag+' class="mui-table-view-cell mui-indexed-list-item">'+ws[l].name+'</li>');
                  }
               }
            }
         });

         $list.delegate(".mui-indexed-list-item","click", function (e) {
            var v = $(e.target).data("value"),name = $(e.target).data("name"),index = $(e.target).data("index");
            self.search.whither = name;
            self.router.setRoute("search");
         });

         var header = $("header.mui-bar");
         var list = $("#list");
         list.height(document.body.offsetHeight - header[0].offsetHeight);
         new mui.IndexedList(list[0]);
      }
   }
});

});

;/*!/components/page/calendar/calendar.js*/
define('components/page/calendar/calendar', function(require, exports, module) {

/**
 * Created by jack on 2015/9/10.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Router = require('component_modules/director.js').Router;
var Layer = require("component_modules/layer.m.js").layer;

module.exports = Vue.extend({
    inherit:true,
    template:"<div class=\"page-calendar\"  >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\" mui-icon mui-icon-left-nav mui-pull-left\" v-on=\"tap:toRouter('search')\"></a>\r\n        <h5 class=\"mui-title\">\r\n            日期选择\r\n        </h5>\r\n    </header>\r\n    <div class=\"mui-content\">\r\n        <h5 class=\"mui-content-padded\">\r\n            可以预订未来7天坐票\r\n        </h5>\r\n        <ul class=\"mui-table-view\">\r\n            <li v-repeat=\"c in calendars\" class=\"mui-table-view-cell mui-media\">\r\n                <a class=\"mui-navigate-right\" v-on=\"click:onSelect($index)\">\r\n                    <div class=\"mui-media-body\" >\r\n                        {{c.name}}\r\n                        <p>{{c.week}}  {{c.other}}</p>\r\n                    </div>\r\n                </a>\r\n            </li>\r\n\r\n        </ul>\r\n    </div>\r\n</div>",
    ready: function () {
        var self = this;
        Layer.open({
            content:"加载中",
            type:2,
            shadeClose:false,
            shade:"background-color:rgba(0,0,0,0)"
        });
        Service.getCalendar(function (rep) {
            Layer.closeAll();
            if(rep.Code == 0){
                self.calendars = rep.Response;
            }
        })
    },
    methods:{
        onSelect: function (r) {
            this.search.date = r;
            var router = new Router();
            router.setRoute("search");
        },
        toRouter: function (url) {
            var router = new Router();
            router.setRoute(url);
        }
    }
});

});

;/*!/components/page/relation/relation.js*/
define('components/page/relation/relation', function(require, exports, module) {

/**
 * Created by jack on 2015/9/10.
 */

var Vue = require("component_modules/vue.js");
var Layer = require("component_modules/layer.m.js").layer;
var Service = require("main/service.js");

module.exports =   Vue.extend({
    inherit:true,
    template:"<div class=\"page-relation\" >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" href=\"#config\"></a>\r\n        <h5 class=\"mui-title\">\r\n            代订座人\r\n        </h5>\r\n        <a class=\"mui-pull-right mui-icon mui-icon-refresh\" v-on=\"click:reload\"></a>\r\n    </header>\r\n    <div class=\"mui-content\">\r\n        <h5 class=\"mui-content-padded\">\r\n            每个用户最多可以绑定四个代订座人\r\n        </h5>\r\n        <ul class=\"mui-table-view\">\r\n            <li class=\"mui-table-view-cell mui-media\" v-repeat=\"u in delegations\">\r\n                <a >\r\n                    <div class=\"mui-media-body\" >\r\n                        {{u.name}}\r\n                        <p>{{u.department}}</p>\r\n                    </div>\r\n                    <button class=\"mui-btn mui-btn-negative mui-btn-outlined\" v-on=\"click:delDelegation(u._id)\">\r\n                        删除\r\n                    </button>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n        <div style=\"padding: 15px;\">\r\n\r\n            <a style=\"padding: 5px;\" v-if=\"(delegations.length+relatives.length)<4\" class=\"mui-btn mui-btn-primary mui-btn-block\" href=\"#relation/query\">\r\n                <span class=\"mui-icon mui-icon-plus\"></span>\r\n                添加本公司人员</a>\r\n        </div>\r\n\r\n        <ul class=\"mui-table-view\">\r\n            <li class=\"mui-table-view-cell mui-media\" v-repeat=\"u in relatives\">\r\n                <a >\r\n                    <div class=\"mui-media-body\" >\r\n                        {{u.name}}\r\n                        <p>{{u.relation}}</p>\r\n                    </div>\r\n                    <button class=\"mui-btn mui-btn-negative mui-btn-outlined\" v-on=\"click:delRel(u._id)\">\r\n                        删除\r\n                    </button>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n        <div style=\"padding: 15px;\">\r\n            <a style=\"padding: 5px;\" v-if=\"(delegations.length+relatives.length)<4\" class=\"mui-btn mui-btn-primary mui-btn-block\" href=\"#relation/relatives\">\r\n                <span class=\"mui-icon mui-icon-plus\"></span>\r\n                添加非本公司人员</a>\r\n        </div>\r\n\r\n        <h5 style=\"text-align: center\">刷新页面查看最新关联。</h5>\r\n    </div>\r\n</div>",
    data: function () {
        return {
            delegations:[],
            relatives:[],
            len:0
        }
    },
    methods:{
        getDelegation: function () {
            var self = this;
            Layer.open({
                content: "加载中",
                type: 2,
                shadeClose: false,
                shade: false
            });
            Service.getUsers({delegateTo:self.mine._id},function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.delegations = rep.Response.lists;
                }
            })
        },
        getRelatives: function () {
            var self = this;
            Layer.open({
                content: "加载中",
                type: 2,
                shadeClose: false,
                shade: false
            });
            Service.getRel(function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.relatives = rep.Response;
                }
            })
        },
        delDelegation: function (id) {
            var self = this;
            Layer.open({
                content: "提交中",
                type: 2,
                shadeClose: false,
                shade: false
            });
            Service.delForDelegation(id,function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.getDelegation();
                }
            })
        },
        delRel: function (id) {
            Layer.open({
                content: "提交中",
                type: 2,
                shadeClose: false,
                shade: false
            });
            var self = this;
            Service.delRel(id, function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.getRelatives();
                }
            })
        },
        reload: function () {
            this.getDelegation();
            this.getRelatives();
        }
    },
    compiled: function () {
        if(!this.mine){
            window.location.href="/"
        }

        this.getDelegation();
        this.getRelatives();

        var self = this;
        this.$on("backReload", function (type) {
            if(type == "relation"){
                self.getDelegation();
                self.getRelatives();
            }
        });
    }
});

});

;/*!/components/page/relation/query/query.js*/
define('components/page/relation/query/query', function(require, exports, module) {

/**
 * Created by jack on 2015/9/10.
 */

var Vue = require("component_modules/vue.js");
var Layer = require("component_modules/layer.m.js").layer;
var Service = require("main/service.js");
var Router = require('component_modules/director').Router;

module.exports =   Vue.extend({
    template:"<div class=\"page-query\"  >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <div class=\"mui-input-row mui-search mui-pull-left\" style=\"width: 80%\">\r\n            <input type=\"search\" class=\"mui-input-clear\" placeholder=\"请输入姓名查询\" v-model=\"name\" >\r\n        </div>\r\n        <a class=\"mui-pull-right mui-btn-link\" v-on=\"click:backTo('relation')\">取消</a>\r\n    </header>\r\n    <div class=\"mui-content\" v-if=\"list.length>0\">\r\n        <ul class=\"mui-table-view  mui-media\">\r\n            <li class=\"mui-table-view-cell mui-media-body\" v-repeat=\"u in list\">\r\n                {{u.name}}({{u.department}})\r\n                <p>{{u.email}}</p>\r\n                <button class=\"mui-btn mui-btn-outlined mui-btn-negative\" v-on=\"click:addDelegation(u._id)\">添加</button>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n</div>",
    data: function () {
        return {
            list:[],
            name:""
        }
    },
    methods:{
        query: function (name) {
            var self = this;
            self.list = [];
            Service.getUsers({name:name}, function (rep) {
                self.list = rep.Response.lists;
            })
        },
        backTo: function (url) {
            this.$parent.$broadcast("backReload","relation");
            var router = new Router();
            router.setRoute(url);
        },
        addDelegation: function (id) {
            Layer.open({
                content: "提交中",
                type: 2,
                shadeClose: false,
                shade: false
            });
            var self = this;
            Service.getDelegation(function (rep) {
                if(rep.Response.length < 2){
                    self._add(id);
                }else{
                    Layer.open({
                        content: "最多可以添加四个委托！",
                        shadeClose: false,
                        btn:["确定"],
                        yes: function () {
                            Layer.closeAll();
                        }
                    });
                }
            });


        },
        _add: function (id) {
            Service.addForDelegation(id, function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    Layer.open({
                        content: "已成功添加其为您的代订座人！",
                        shadeClose: false,
                        btn:["确定"],
                        yes: function () {
                            Layer.closeAll();
                        }
                    });
                }else{
                    Layer.open({
                        content: rep.Message,
                        shadeClose: false,
                        btn:["确定"],
                        yes: function () {
                            Layer.closeAll();
                        }
                    });
                }

            });
        }
    },
    watch:{
        "name": function (v) {
            this.query(v);
        }
    },
    ready: function () {
        //mui(".page-query input").input();
    }
});

});

;/*!/components/page/relation/relatives/relatives.js*/
define('components/page/relation/relatives/relatives', function(require, exports, module) {

/**
 * Created by jack on 2015/9/10.
 */

var Vue = require("component_modules/vue.js");
var Layer = require("component_modules/layer.m.js").layer;
var Service = require("main/service.js");
var Router = require('component_modules/director').Router;
var Check = require("main/check.js");

module.exports =   Vue.extend({
    template:"<div class=\"page-relatives\">\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" v-on=\"click:backTo('relation')\"></a>\r\n        <h5 class=\"mui-title\">\r\n            添加非公司人员\r\n        </h5>\r\n    </header>\r\n    <div class=\"mui-content\">\r\n        <div class=\"mui-card\">\r\n            <div class=\"mui-input-group\">\r\n                <div class=\"mui-input-row\">\r\n                    <label>姓名</label>\r\n                    <input type=\"text\" class=\"mui-input-clear\" v-model=\"rel.name\" placeholder=\"请输入姓名\">\r\n                </div>\r\n            </div>\r\n            <div class=\"mui-input-group\">\r\n                <div class=\"mui-input-row\">\r\n                    <label>身份证</label>\r\n                    <input type=\"text\" class=\"mui-input-clear\" v-model=\"rel.sn\" placeholder=\"请输入身份证后四位\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <h5 class=\"mui-content-padded\">性别</h5>\r\n        <div class=\"mui-card\">\r\n            <form class=\"mui-input-group\">\r\n                <div class=\"mui-input-row mui-radio\">\r\n                    <label>男</label>\r\n                    <input name=\"style\" type=\"radio\" v-model=\"rel.sex\" checked value=\"男\">\r\n                </div>\r\n                <div class=\"mui-input-row mui-radio\">\r\n                    <label>女</label>\r\n                    <input name=\"style\" type=\"radio\" v-model=\"rel.sex\" value=\"女\">\r\n                </div>\r\n            </form>\r\n        </div>\r\n        <div class=\"mui-card\" style=\"margin-top: 10px;\">\r\n            <div class=\"mui-input-group\">\r\n                <div class=\"mui-input-row\">\r\n                    <label>年龄</label>\r\n                    <input type=\"text\" class=\"mui-input-clear\" v-model=\"rel.age\" placeholder=\"请输入年龄\" >\r\n                </div>\r\n            </div>\r\n            <div class=\"mui-input-group\">\r\n                <div class=\"mui-input-row\">\r\n                    <label>手机</label>\r\n                    <input type=\"text\" class=\"mui-input-clear\" v-model=\"rel.tel\" placeholder=\"请输入手机号\">\r\n                </div>\r\n            </div>\r\n            <div class=\"mui-input-group\">\r\n                <div class=\"mui-input-row\">\r\n                    <label>关系</label>\r\n                    <input type=\"text\" class=\"mui-input-clear\" v-model=\"rel.relation\" placeholder=\"请输入关系\">\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n        <!--<h5 class=\"mui-content-padded mui-text-center\">如为合作单位请填写单位名称</h5>-->\r\n        <div style=\"padding: 15px;\">\r\n            <a  style=\"padding: 5px\" class=\"mui-btn mui-btn-primary mui-btn-block\" v-on=\"click:addRel\">\r\n                <span class=\"mui-icon mui-icon-plus\"></span>\r\n                添加</a>\r\n        </div>\r\n    </div>\r\n</div>",
    data: function () {
        return {
            rel:{
                name:"",
                sn:"",
                sex:"",
                age:"",
                relation:"",
                tel:""
            }
        }
    },
    watch:{
        "rel.sn": function () {
            if(Check.check(this.rel.sn,"card")){
                var a = this.rel.sn.substr(6,4);
                var b = (new Date()).getFullYear();
                this.rel.age = (b-a);
            }
        }
    },
    methods:{
        addRel: function () {
            if(this.valid()=="OK"){

                Layer.open({
                    content:"提交中",
                    type:2,
                    shadeClose:false,
                    shade: false
                });
                Service.addRel(JSON.stringify(this.rel), function (rep) {
                    Layer.closeAll();
                    if(rep.Code == 0){
                        Layer.open({
                            content:"关联成功！",
                            shadeClose:false,
                            btn:["确定"],
                            yes: function () {
                                Layer.closeAll();
                                var router = new Router();
                                router.setRoute("relation");
                            }
                        })
                    }else{
                        Layer.open({
                            content:rep.Message,
                            btn:["确定"],
                            yes: function () {
                                Layer.closeAll();
                            }
                        })
                    }
                })
            }else{
                Layer.open({
                    content:this.valid(),
                    btn:["确定"],
                    yes: function () {
                        Layer.closeAll();
                    }
                })
            }
        },
        valid: function () {
            var rel = this.rel;
            if(!rel.name){
                return "姓名不能为空！"
            }
            if(!rel.sn){
                return "身份证不能为空！"
            }
            if(rel.sn.length != 4){
                return "请输入身份证后四位！"
            }
            if(!rel.age){
                return "年龄不能为空！"
            }
            if(!rel.relation){
                return "关系不能为空！"
            }
            if(!Check.check(rel.tel,"mobile")){
                return "请填写正确手机号"
            }

            return "OK"
        },
        backTo: function (url) {
            this.$parent.$broadcast("backReload","relation");
            var router = new Router();
            router.setRoute(url);
        }
    },
    compiled: function () {

    },
    ready: function () {
        mui("input").input();
    }
});

});

;/*!/components/page/company/company.js*/
define('components/page/company/company', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Layer = require("component_modules/layer.m.js").layer;
var Service = require("main/service.js");


module.exports = Vue.extend({
    template:"<div class=\"page-company\">\r\n    <div class=\"mui-control-content mui-active\" v-show=\"!isQuery\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                合作单位订位查询\r\n            </h5>\r\n            <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" href=\"#config\"></a>\r\n        </header>\r\n        <div class=\"mui-content\">\r\n            <ul class=\"mui-table-view mui-list\">\r\n                <i class=\" iconfont icon-users\"></i>\r\n                <li class=\"mui-table-view-cell\">\r\n                    <a >合作单位\r\n                        <select class=\"company-select\" v-model=\"selectCompany\" options=\"companies\">\r\n                            <option>请选择</option>\r\n                        </select>\r\n                    </a>\r\n                </li>\r\n                <i class=\"iconfont icon-time\"></i>\r\n                <li class=\"mui-table-view-cell\">\r\n                    <a  >出发时间\r\n                        <select class=\"company-select\" v-model=\"selectDate\" options=\"date\">\r\n                            <option>请选择</option>\r\n                        </select>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n            <div class=\"mui-content-padded\" style=\"text-align: center\">\r\n                <h5>手机端只支持查询，订位请到PC管理后台。</h5>\r\n            </div>\r\n            <button class=\"mui-btn mui-btn-block\" id=\"btn-search\" v-on=\"click:onSearch()\" >\r\n                <span class=\"mui-icon mui-icon-search\"></span>查询\r\n            </button>\r\n\r\n        </div>\r\n\r\n    </div>\r\n    <div class=\"mui-control-content mui-active\" v-show=\"isQuery\">\r\n        <header class=\"mui-bar-nav mui-bar\">\r\n            <h5 class=\"mui-title\">\r\n                查询结果\r\n            </h5>\r\n            <a class=\"mui-icon mui-icon-left-nav mui-pull-left\" v-on=\"tap:toBack\"></a>\r\n        </header>\r\n        <div class=\"mui-content\" style=\"height: {{height}}px;overflow-y: auto;\">\r\n            <table class=\"table\">\r\n                <thead>\r\n                <th>序号</th>\r\n                <th>姓名</th>\r\n                <th>车辆</th>\r\n                <th>车位</th>\r\n                </thead>\r\n                <tr v-repeat=\"u in users\">\r\n                    <td>{{$index+1}}</td>\r\n                    <td>{{u.name}}</td>\r\n                    <td>{{u.bus}}</td>\r\n                    <td>{{u.seat}}</td>\r\n                </tr>\r\n            </table>\r\n\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>",
    data:function(){
        return {
            selectDate:"",
            date:[],
            selectCompany:"",
            companies:[],
            isQuery:false,
            users:[],
            height:document.documentElement.clientHeight -44
        }
    },
    methods:{
        onSearch: function () {
            if(this.selectDate&&this.selectCompany){

                this._search();

            }else{
                Layer.open({
                    content: "请选择完整!",
                    shadeClose: false,
                    btn:["确定"],
                    yes: function () {
                        Layer.closeAll();
                    }
                })
            }
        },
        toBack: function () {
            this.isQuery = false;
            this.users =[];
        },
        _search: function () {
            var self = this;
            Layer.open({
                content: "加载中",
                type: 2,
                shadeClose: false,
                shade: false
            });
            Service.getUsers({
                page:0,
                limit:999,
                type:1,
                company:self.selectCompany
            }, function (rep) {
                if(rep.Code == 0){
                    var users = rep.Response.lists;
                    Service.getCompanyTicket({
                        page:0,
                        limit:999,
                        company:self.selectCompany,
                        date:self.selectDate
                    }, function (rep) {
                        if(rep.Code == 0){
                            var list = rep.Response;
                            for(var u = 0;u< users.length; u++){
                                for(var i =0;i< list.length; i++){
                                    if(users[u]._id == list[i].user._id){
                                        users[u].bus = list[i].bus.sn;
                                        users[u].seat = list[i].seat.sn;
                                        users[u].ticket = list[i]._id;
                                    }
                                }
                            }
                            self.users =users;
                        }
                        Layer.closeAll();
                        self.isQuery =true;
                    })

                }
            })
        }
    },
    ready: function () {
        var self = this;
        Service.getCompanies(function (rep) {
            self.companies = rep.Response;
        });
        Service.getCalendar(function (rep) {
            if(rep.Code == 0){
                var target = rep.Response;
                var lst = [];
                for(var i in target){
                    lst.push({
                        value:target[i].value,
                        text:target[i].name
                    })
                }
                self.date = lst;
            }
        });
    }

});

});

;/*!/components/page/bus/bus.js*/
define('components/page/bus/bus', function(require, exports, module) {

/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Layer = require("component_modules/layer.m.js").layer;
var IScroll = require("component_modules/iscroll-zoom.js");
var Router = require("component_modules/director.js").Router;

module.exports = Vue.extend({
    inherit:true,
    template:"<div class=\"page-bus\" >\r\n    <header class=\"mui-bar mui-bar-nav\">\r\n        <h5 class=\"mui-title\" style=\"line-height: 18px;margin-top: 5px;\">{{bus.name}}  车牌号：{{bus.sn}}\r\n            <p>{{bus.line}} {{bus.goff}}</p>\r\n\r\n        </h5>\r\n        <a class=\" mui-icon mui-icon-left-nav mui-pull-left\" v-on=\"click:backTo('search/result')\"></a>\r\n        <a class=\"mui-icon  mui-icon-home-filled mui-pull-right\" href=\"#search\"></a>\r\n    </header>\r\n    <div class=\"mui-content\">\r\n        <nav class=\"mui-bar mui-bar-tab user-bar\">\r\n            <a v-repeat=\"u in delegate\" class=\"mui-tab-item\" v-on=\"click:selectUser(u)\" v-class=\"mui-active:u.value==selectDelegate.value\" >\r\n                <span class=\"mui-icon mui-icon-contact\"></span>\r\n                <span class=\"mui-tab-label\">{{u.text}}</span>\r\n            </a>\r\n        </nav>\r\n    </div>\r\n    <div class=\" mui-scroll-wrapper\" style=\"top:95px;\">\r\n        <div class=\"mui-scroll\" >\r\n            <div class=\"bus-header\">\r\n                <img class=\"bus-driver\" src=\"/static/images/bus-driver.png\">\r\n\r\n                <a class=\"void\"></a> 可选\r\n                <a class=\"order\"></a> 已选\r\n\r\n                <span class=\"bus-door\">前门</span>\r\n            </div>\r\n            <div bus-header> 驾驶员：{{bus.jsy}}（{{bus.tel}}）</div>\r\n            <table class=\"bus-body\">\r\n                <tr v-repeat=\"r in bus.rows\">\r\n                    <td v-repeat=\"bus.cols\" class=\"seat\" data-id=\"{{getSeatId(r,$index)}}\"  v-on=\"click:selectSeat(this,r,$index)\" v-class=\"seatClass(r,$index)\" style=\"position: relative;\">\r\n                        <button  v-text=\"getText(r,$index)\"  ></button>\r\n                        <p class=\"user-name\" v-text=\"getSeatUserName(r,$index)\"></p>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n\r\n            <span class=\"bus-backDoor\"></span>\r\n\r\n            <ul class=\"mui-table-view silder-nav\" style=\"\">\r\n                <li class=\"mui-table-view-cell\" v-repeat=\"bus.rows\">\r\n                    {{$index+1}}\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n<c-nav view=\"search\"></c-nav>",
    data: function () {
        return {
            seat:null,
            delegate:[],
            selectDelegate:{}
        }
    },
    computed:{
        "selectText": function () {
            if(this.seat){
                return (this.seat.row+1) +"排" +(this.seat.col+1)+"列  "+this.seat.sn+"座";
            }else{
                return "请选择";
            }
        }
    },
    methods:{
        "seatClass": function (r,c) {
            var list = this.bus.seats;
            for(var i =0;i<list.length;i++){
                if(list[i].col == c && list[i].row == r){
                    if(list[i].state){

                        if(!parseInt(list[i].sn)&&typeof list[i].sn == "string"){
                            return "icon-seat-none bus-text"
                        }

                        switch (list[i].state){
                            case 0:{
                                return "icon-seat-none";
                            }break;
                            case 1:{
                                return "icon-seat-void";
                            }break;
                            case 2:{
                                return "icon-seat-order";
                            }break;
                            default: {
                                return "icon-seat-none";
                            }
                        }
                    }
                }
            }

        },
        "getText": function (r,c) {
            var list = this.bus.seats;
            for(var i =0;i<list.length;i++) {
                if (list[i].col == c && list[i].row == r) {
                    return list[i].sn;
                }
            }
        },
        "getSeatId": function (r,c) {
            var list = this.bus.seats;
            for(var i =0;i<list.length;i++) {
                if (list[i].col == c && list[i].row == r) {
                    return JSON.stringify(list[i]);
                }
            }
        },
        getSeatUserName: function (r,c) {
            var seat = this.getSeatId(r,c);
            if(seat){
                var seat = JSON.parse(seat);
                if(seat.entity.user){
                    return seat.entity.user.name;
                }
            }
        },
        "selectSeat": function (e,r,c) {
            var $t = $(e.$el);
            if($t.hasClass("icon-seat-void")){
                $(".bus-body").find("td").removeClass("icon-seat-select");
                $t.addClass("icon-seat-select");
                this.seat = $t.data("id");
                var user = this.selectDelegate;
                //

                //if(!user.ticket){
                //    this.orderSeat(this.seat.ticket, function (ticket) {
                //        user.ticket = ticket;
                //    });
                //}else{
                //    this._unSubTicket(user.ticket._id, function () {
                //        self.orderSeat(self.seat.ticket, function (ticket) {
                //            user.ticket = ticket;
                //        });
                //    });
                //}
                var self = this;
                this._unSubTicket(function () {
                    self.orderSeat(self.seat.ticket, function (ticket) {
                        user.ticket = ticket;
                    });
                })

            }
        },
        orderSeat: function (id,callback) {
            Layer.closeAll();
            Layer.open({
                content:"订票中",
                type:2,
                shadeClose:false
            });
            var self = this;
            Service.orderSeat(self.selectDelegate.value,self.mine._id,id, function (rep) {
                Layer.closeAll();
                $(".bus-body").find("td").removeClass("icon-seat-select");
                self.seat = null;
                if(rep.Code == 0){
                    callback?callback.call(this,rep.Response):null;
                    self.reloadSeat();
                }else{
                    alert(rep.Message);
                }
            });
        },
        renderScroll: function () {
            myScroll = new IScroll($(".page-bus > .mui-scroll-wrapper")[0], {
                zoom: true,
                scrollX: true,
                scrollY: true,
                mouseWheel: true,
                wheelAction: 'zoom'
            });
        },
        reloadSeat: function () {
            var self = this;
            Layer.open({
                content:"加载中",
                type:2,
                shadeClose:false
            });
            Service.getBusSeat({bus:self.bus._id,date:self.search.date},function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.bus = rep.Response;
                    var router = new Router();
                    return router.setRoute("bus");
                }
            })
        },
        backTo: function (url) {
            this.$parent.$broadcast("backReload","search");
            var router = new Router();
            router.setRoute(url);
        },
        getDelegate: function () {
            var self = this;
            Service.getUsers({delegateTo:this.mine._id},function (rep) {
                if(rep.Code == 0){
                    var list = [{text:self.mine.name,value:self.mine._id,ticket:""}],target = rep.Response.lists;
                    for(var i in target){
                        list.push({
                            text:target[i].name,
                            value:target[i]._id,
                            ticket:""
                        })
                    }
                    self.delegate = list;
                    self.selectDelegate = list[0];

                    self.getRels();
                }
            })
        },
        getRels: function () {
            var self = this;
            Service.getUsers({relatedTo:this.mine._id}, function (rep) {
                if(rep.Code == 0){
                    var lst = rep.Response.lists;
                    for(var i=0;i<lst.length;i++){
                        self.delegate.push({text:lst[i].name,value:lst[i]._id,ticket:""});
                    }
                }
            })
        },
        _unSubTicket: function (callback) {
            var self = this,seats = this.bus.seats;
            var tid = null;
            for(var i= 0;i<seats.length;i++){
                if(seats[i].entity.user){
                    if(seats[i].entity.user._id == this.selectDelegate.value){
                        tid = seats[i].ticket;
                    }
                }
            }

            if(tid){
                Service.unSubTicket(tid, function () {
                    callback.call(this);
                });
            }else{
                callback.call(this);
            }
        },
        selectUser: function (u) {
            this.selectDelegate = u;
        },
        getBus: function (callback) {
            var self = this;
            Layer.open({
                content:"加载中",
                type:2,
                shadeClose:false,
                shade:"background-color:rgba(0,0,0,0)"
            });
            Service.getBusSeat({bus:this.busQuery.id,date:this.busQuery.date},function (rep) {
                Layer.closeAll();
                if(rep.Code == 0){
                    self.bus = rep.Response;
                    callback.call(this);
                }
            })
        }
    },
    ready: function () {
        if(typeof this.search.date !="string"){
            var router = new Router();
            router.setRoute("search");
            window.location.reload();
        }

        var self = this;

        this.getBus(
            function () {
                Vue.nextTick(function () {
                    self.renderScroll();
                    self.getDelegate();
                })
            }
        );


        this.$on("busQuery", function () {
            this.getBus(
                function () {
                    Vue.nextTick(function () {
                        self.renderScroll();
                        self.getDelegate();
                    })
                }
            );
        })


    }
});

});
