;/*!/components/component/loading/loading.js*/
define('loading/loading', function(require, exports, module) {

/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-loading",{
    template:"<div class=\"layui-layer-shade\" id=\"layui-layer-shade22\" times=\"22\" style=\"z-index:19891035; background-color:#fff; opacity:0.5; filter:alpha(opacity=50);display: none\"></div>\r\n<div class=\"layui-layer layui-anim layui-layer-loading \" id=\"layui-layer22\" type=\"loading\" times=\"22\" showtime=\"0\" contype=\"string\" style=\"display: none;z-index: 19891036; \"><div class=\"layui-layer-content layui-layer-loading1\"></div><span class=\"layui-layer-setwin\"></span></div>\r\n",
    props:["show"],
    methods:{
        showLoading: function () {
            var x=parseInt($(window).width()-this.layer.outerWidth())/2;
            var y=parseInt($(window).height()-this.layer.outerHeight())/2;
            if (y<=10){y="10"}
            this.layer.css({"left":x,"top":y});
            this.mask.show();
            this.layer.show();
        },
        closeLoading: function () {
            this.mask.hide();
            this.layer.hide();
        }
    },
    watch:{
      "show": function (r) {
          if(r){
              this.showLoading();
          }else{
              this.closeLoading();
          }
      }  
    },
    ready: function () {
        this.layer = $("#layui-layer22");
        this.mask = $(".layui-layer-shade");
    }
});

});

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
          //  return /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}?$|15[089]\d{8}?$|170\d{8}?$|147\d{8}?$/.test($pintu);
            return /^0?1[0-9]\d{9}$/.test($pintu)
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
    }
}

module.exports ={
    check:check
};

});

;/*!/components/component/main/service.js*/
define('main/service', function(require, exports, module) {

/**
 * Created by jack on 2015/8/17.
 */
//var prefix = "http://127.0.0.1:8088";
var prefix = "";

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
    return $.ajax({
        type:"put",
        contentType:"application/json",
        success:callback,
        dataType:"json",
        data:data,
        url:url
    })
};
function getDepts(p){
    $.get(prefix+ "/data/user/finddepts.json",p,"json");
}
function getUsersa(p,c){
    p.stamp = Math.random();
    $.get(prefix+ "/data/user/finddeptuser.json",p, c,"json");
}

function getUsers(p,c){
    p.stamp = Math.random();
    $.get(prefix+ "/admin/data/users.json",p, c,"json");
}

function addUser(p,c){
    $.post(prefix + "/admin/data/user.json",p,c,"json")
}

function delUser(id,c){
    $.del(prefix + "/admin/data/user/"+id+".json",c);
}

function updateUser(id,p,c){
    $.put(prefix + "/admin/data/user/"+ id+".json",p,c);
}

function getBuses(p,c){
    p.stamp = Math.random();
    $.get(prefix+ "/admin/data/buses.json",p, c,"json");
}

function getBus(bid,c){
    $.get(prefix+ "/admin/data/bus/"+bid+".json", c,"json");
}

function addBus(p,c){
    $.post(prefix + "/admin/data/bus.json",p,c,"json")
}

function delBus(id,c){
    $.del(prefix + "/admin/data/bus/"+id+".json",c);
}

function updateBus(id,p,c){
    $.put(prefix + "/admin/data/bus/"+ id+".json",p,c);
}

function getSeat(bid,c){
    $.get(prefix + "/admin/data/bus/"+bid +"/seats.json",{limit:999},c);
}

function addSeat(bid,p,c){
    $.post(prefix + "/admin/data/bus/"+bid +"/seat.json",p,c);
}

function delSeat(bid,sid,c){
    $.del(prefix + "/admin/data/bus/"+bid +"/seat/"+sid+".json",c);
}

function delAllSeat(bid,c){
    $.del(prefix + "/admin/data/bus/"+bid+"/seat.json",c);
}

function updateSeat(bid,sid,p,c){
    $.put(prefix + "/admin/data/bus/"+bid +"/seat/"+sid+".json",p,c);
}

function getCompanies(c){
    $.get(prefix + "/data/companies.json",c);
}

function getCalendar(c){
    $.get(prefix + "/data/calendar.json",c);
}
function getCalendara(c){
    $.get(prefix + "/data/calendara.json",c);
}
function getWhither(c){
    $.get(prefix + "/data/whither.json",c);
}

function getSysInfo(c){
    $.get(prefix + "/data/system.json",c);
}

function getTicketStats(p,c){
    p.stamp = Math.random();
    $.get(prefix+"/data/tickets/statsa.json",p, c);
}

function getBusTickets(p,c){
    p.stamp = Math.random();
    $.get(prefix +"/data/tickets.json",p,c);
}
function getBusTicketsa(p,c){
    p.stamp = Math.random();
    $.get(prefix +"/data/ticketsa.json",p,c);
}
function userLogin(p,c){
    $.post(prefix + "/admin/user/login.json",p,c);
}

function getCompanyTicket(p,c){
    p.stamp = Math.random();
    $.get(prefix +"/admin/data/tickets.json",p,c);
}

function orderTicket(uid,id,c){
    $.put(prefix +"/admin/data/ticket/"+uid+"/"+id+".json",{},c);
}

function unTicket(uid,id,c){
    $.del(prefix +"/admin/data/ticket/"+uid+"/"+id+".json",c);
}

function getTraces(p,c){
    p.stamp = Math.random();
    $.get(prefix +"/admin/data/traces.json",p,c);
}

function getContext(p,c){
    p.stamp = Math.random();
    $.get(prefix +"/data/ctx.json",p,c);
}


function putContext(p,c){
    $.put(prefix + "/admin/data/ctx.json",p,c);
}

module.exports = {
    getUsers:getUsers,
    addUser:addUser,
    delUser:delUser,
    updateUser:updateUser,
    getBuses:getBuses,
    getBus:getBus,
    addBus:addBus,
    delBus:delBus,
    updateBus:updateBus,
    addSeat:addSeat,
    getSeat:getSeat,
    delSeat:delSeat,
    delAllSeat:delAllSeat,
    updateSeat:updateSeat,
    getCompanies:getCompanies,
    getCalendar:getCalendar,
    getWhither:getWhither,
    getSysInfo:getSysInfo,
    getTicketStats:getTicketStats,
    getBusTickets:getBusTickets,
    userLogin:userLogin,
    getCompanyTicket:getCompanyTicket,
    orderTicket:orderTicket,
    unTicket:unTicket,
    getTraces:getTraces,
    getContext:getContext,
    putContext:putContext,
    getDepts:getDepts,
    getUsersa:getUsersa,
    getCalendara:getCalendara,
    getBusTicketsa:getBusTicketsa
};

});

;/*!/components/component/nav/nav.js*/
define('nav/nav', function(require, exports, module) {

/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue.js");

module.exports = Vue.component("c-nav",{
    template:"\r\n<div class=\"lefter\">\r\n    <div class=\"logo\"><img style=\"height: 40px\" src=\"/bus/static/images/logo.png\" alt=\"后台管理系统\" /></div>\r\n</div>\r\n<div class=\"righter nav-navicon\" id=\"admin-nav\">\r\n    <div class=\"mainer\">\r\n        <div class=\"admin-navbar\">\r\n            <span class=\"float-right\">\r\n                <a class=\"button button-little bg-yellow\" href=\"login.html\">注销登录</a>\r\n            </span>\r\n            <ul class=\"nav nav-inline admin-nav\">\r\n                <li v-class=\"active:f.key == amenu\"  v-repeat=\"f in func\" >\r\n                    <a href=\"#/{{f.key}}\" class=\"{{f.class}}\"> {{f.name}}</a>\r\n                    <ul>\r\n                        <li v-class=\"active:c.key==bmenu\" v-repeat=\"c in f.child\"><a href=\"#/{{f.key}}/{{c.key}}\">{{c.name}}</a></li>\r\n                    </ul>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"admin-bread\">\r\n            <span>您好，管理员，欢迎您的光临。</span>\r\n            <ul class=\"bread\">\r\n                <li><a href=\"#/{{bread1.key}}\" class=\"{{bread1.class}}\">&nbsp;{{bread1.name}}</a></li>\r\n                <li class=\"{{bread2.class}}\">&nbsp;\r\n                    <template v-if=\"!bread3.name\">\r\n                            {{bread2.name}}\r\n                    </template>\r\n                    <template v-if=\"bread3.name\">\r\n                        <a href=\"#/{{bread1.key}}/{{bread2.key}}\">\r\n                            {{bread2.name}}\r\n                        </a>\r\n                    </template>\r\n                </li>\r\n                <li  class=\"{{bread3.class}}\">&nbsp;{{bread3.name}}</li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n",
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

});

;/*!/components/component/main/main.js*/
define('main/main', function(require, exports, module) {


var Vue = require('component_modules/vue');
var Router = require('component_modules/director.js').Router;
var desk = require('components/page/desk/desk');
var Service = require('main/service.js');

require("loading/loading.js");
require("nav/nav.js");


window.app = new Vue({
    el:"#app",
    data:{
        "currentView":"",
        "amenu":"",
        "bmenu":"",
        "cmenu":"",
        "loading":false /*�Ƿ���ʾ����*/
    },
    components:{
        "desk":desk
    },
    ready: function () {

    }
});

/*��������*/
Vue.transition('slide', {
    enter: function (el) {
        $(el).css({
            "opacity":0,
            "margin-top":20
        }).animate({
            "opacity":1,
            "margin-top":0
        },300,"linear");
    },
    leave: function (el) {
        if(el > 0 ){
            $(el).remove();
        }
    }
});

/*����֤���*/
Vue.directive('disabled', function (value) {
    this.el.disabled = !value;
});

var router = new Router();

function doRouter(a,b,c,view,component){
    var coms = window.app.$options.components;

    if(!coms[view]){
        coms[view] = component;
    }
    app.amenu = a;
    app.bmenu = b;
    app.cmenu = c;
    app.currentView = view;
}

router.on("/home",function(){
    router.setRoute("/home/desk");
});


router.on("/login",function(){
    router.setRoute("/home/desk");
});


router.on("/home/user",function(){
    require.async(["components/page/user/user"], function (p) {
        doRouter("home","user","","user",p);
    })
});

router.on("/home/bus",function(view){
    require.async(["components/page/bus/bus"], function (p) {
        doRouter("home","bus","","bus",p);
    })
});

router.on("/home/order",function(view){
    require.async(["components/page/order/order"], function (p) {
        doRouter("home","order","","order",p);
    })
});

router.on("/home/desk",function(view){
    require.async(["components/page/desk/desk"], function (p) {
        doRouter("home","desk","","desk",p);
    })
});

router.on("/home/company",function(view){
    require.async(["components/page/company/company"], function (p) {
        doRouter("home","company","","company",p);
    })
});


router.on("/home/companyOrder",function(view){
    require.async(["components/page/companyOrder/companyOrder"], function (p) {
        doRouter("home","companyOrder","","companyOrder",p);
    })
});

router.on("/home/check",function(){
    require.async(["components/page/check/check"], function (p) {
        doRouter("home","check","","check",p);
    })
});

router.on("home/bus/:id", function (id) {
    require.async(["components/page/seat/seat"], function (p) {
        doRouter("home","bus","seat","seat",p);
    })
});

router.on("/sys",function(){
    router.setRoute("/sys/history");
});

router.on("/sys/history",function(){
    require.async(["components/page/history/history"], function (p) {
        doRouter("sys","history","","history",p);
    })
});

router.on("/sys/config",function(){
    require.async(["components/page/system/config"], function (p) {
        doRouter("sys","config","","config",p);
    })
});

router.configure({
    notfound: function () {
        router.setRoute("/error/notfound")
    }
});

router.init("/home");




});

;/*!/components/component/pager/pager.js*/
define('pager/pager', function(require, exports, module) {

/**
 * Created by jack on 2015/8/24.
 */

var Vue = require("component_modules/vue.js");

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

;/*!/components/page/user/user.js*/
define('components/page/user/user', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Check = require("main/check.js");
var pager = require("pager/pager.js");


module.exports = Vue.extend({
   inherit:true,
   template:"\r\n\r\n\r\n<table>\r\n    <tr>\r\n        <td>\r\n            <div  class=\"\">\r\n                <div id=\"treeDemo\" class=\"ztree\"></div>\r\n            </div>\r\n\r\n        </td>\r\n        <td>\r\n            <div class=\"page-user \" >\r\n\r\n                <div class=\"panel admin-panel\">\r\n                    <div class=\"panel-head\">\r\n                        <strong>\r\n                            用户列表\r\n                        </strong>\r\n                    </div>\r\n                    <div class=\"padding border-bottom\">\r\n                        <div class=\"form-inline\">\r\n                            <div class=\"form-group\">\r\n                                <div class=\"label\">\r\n                                    用户名：\r\n                                </div>\r\n                                <div class=\"field\">\r\n                                    <input type=\"text\" v-model=\"query.name\" class=\"input\" placeholder=\"用户名\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <div class=\"label\">\r\n                                    邮箱：\r\n                                </div>\r\n                                <div class=\"field\">\r\n                                    <input type=\"text\" v-model=\"query.email\" class=\"input\" placeholder=\"邮箱\">\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <button class=\"button  bg-green\" v-on=\"click:onQuery\" data-target=\"#user-dialog\" data-mask=\"1\" data-width=\"50%\"    >\r\n                                    <span class=\"icon-search\"></span>搜索</button>\r\n                                </button>\r\n\r\n                            </div>\r\n                            <div class=\"form-group\">\r\n                                <button class=\"button  bg-red-light\" v-on=\"click:onReset\" data-target=\"#user-dialog\" data-mask=\"1\" data-width=\"50%\"    >\r\n                                    <span class=\"icon-recycle\"></span>重置</button>\r\n                                </button>\r\n\r\n                            </div>\r\n\r\n                        </div>\r\n                        <input type=\"button\" class=\"button  bg-main float-right\" data-target=\"#user-dialog\" data-mask=\"1\" data-width=\"50%\"  v-on=\"click:addUser\" value=\"新增用户\" />\r\n\r\n                        <!--<input type=\"button\" class=\"button button-small bg-main\" data-target=\"#user-dialog\" data-mask=\"1\" data-width=\"50%\"  v-on=\"click:inputUser\" value=\"导入用户\" />-->\r\n                        <!--<input type=\"button\" class=\"button button-small bg-main\" data-target=\"#user-dialog\" data-mask=\"1\" data-width=\"50%\"  v-on=\"click:dellAllUser\" value=\"删除全部\" />-->\r\n                    </div>\r\n\r\n                    <table class=\"table table-hover\">\r\n                        <tr><th width=\"120\">用户名</th><th width=\"*\">邮箱</th><th width=\"100\">手机号码</th><th width=\"150\">处室</th><th width=\"150\">科室</th><th width=\"100\">用户类型</th><th width=\"100\">登录密码</th><th width=\"140\">操作</th></tr>\r\n                        <tr v-repeat=\"c in users\">\r\n                            <td>{{c.name}}</td>\r\n                            <td>{{c.email}}</td>\r\n                            <td>{{c.mobile}}</td>\r\n                            <td>{{c.department}}</td>\r\n                            <td>{{c.unit}}</td>\r\n                            <!--<td>{{c.limit?c.limit:1}}</td>-->\r\n                            <td>{{c.admin == 1?\"管理员\":\"普通用户\"}}</td>\r\n                            <td>{{c.password}}</td>\r\n                            <td><a v-on=\"click:editUser(c)\" class=\"button border-blue button-little\" href=\"javascript:;\">修改</a> <a class=\"button border-yellow button-little\" v-on=\"click:delUser(c._id)\" href=\"javascript:;\">删除</a> </td></tr>\r\n                    </table>\r\n\r\n                    <c-pager count=\"{{@ count}}\" limit=\"{{@ limit}}\" page=\"{{@ page}}\"></c-pager>\r\n\r\n                    <div class=\"dialog-mask\" style=\"display: none;\"></div>\r\n                    <div id=\"user-dialog\" class=\"dialog-win\" style=\"position: fixed; width: 50%; z-index: 11;display: none;\">\r\n                        <div class=\"dialog open\">\r\n                            <div class=\"dialog-head\">\r\n                                <span class=\"close\" v-on=\"click:closeDialog\"></span>\r\n                                <strong>{{user._type}}</strong>\r\n                            </div>\r\n                            <div class=\"dialog-body\">\r\n                                <div class=\"form-x\">\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"label\">\r\n                                            用户名\r\n                                        </div>\r\n                                        <div class=\"field\">\r\n                                            <input type=\"text\" class=\"input\" v-model=\"user.name\" placeholder=\"请填写用户名\">\r\n                                            <div v-show=\"!validation.name\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"label\">\r\n                                            邮箱\r\n                                        </div>\r\n                                        <div class=\"field\">\r\n                                            <input type=\"text\" class=\"input\" v-model=\"user.email\" placeholder=\"请填写邮箱\">\r\n                                            <div v-show=\"!validation.email\" class=\"input-help  check-error\"><ul><li>请填写邮箱格式</li></ul></div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"label\">\r\n                                            手机号\r\n                                        </div>\r\n                                        <div class=\"field\">\r\n                                            <input type=\"text\" class=\"input\" v-model=\"user.mobile\" placeholder=\"请填写手机号\">\r\n                                            <div v-show=\"!validation.mobile\" class=\"input-help  check-error\"><ul><li>请填写正确手机号码</li></ul></div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"label\">\r\n                                            处室\r\n                                        </div>\r\n                                        <div class=\"field\">\r\n                                            <input type=\"text\" class=\"input\" v-model=\"user.department\" placeholder=\"请填写处室\">\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"label\">\r\n                                            科室\r\n                                        </div>\r\n                                        <div class=\"field\">\r\n                                            <input type=\"text\" class=\"input\" v-model=\"user.unit\" placeholder=\"请填写科室\">\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"label\">\r\n                                            用户类型\r\n                                        </div>\r\n                                        <div class=\"field\">\r\n                                            <select class=\"input\" v-model=\"user.admin\" number>\r\n                                                <option value=0>普通用户</option>\r\n                                                <option value=1>管理员</option>\r\n                                                <option value=3>订票员</option>\r\n                                                <option value=4>处室负责人</option>\r\n                                            </select>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"form-group\">\r\n                                        <div class=\"label\">\r\n                                            登录密码\r\n                                        </div>\r\n                                        <div class=\"field\">\r\n                                            <input type=\"text\" class=\"input\" v-model=\"user.password\" placeholder=\"请填写登录密码\">\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"dialog-foot\">\r\n                                <button class=\"button dialog-close\" v-on=\"click:closeDialog\">取消</button>\r\n                                <button class=\"button bg-green\" v-disabled=\"isValid\" v-on=\"click:postUser\" >确认</button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                </div>\r\n\r\n            </div>\r\n        </td>\r\n    </tr>\r\n</table>\r\n\r\n\r\n",
   data: function () {
      return {

              namea:"",
              level:5
         ,
         users:[],
         count:0,
         limit:10,
         isAdmin:false,
         page:0,
         user:{
            "_type":"新增用户",
            "name":"",
            "mobile":"",
            "email":"",
            "department":"",
            "unit":"",
            "admin":0,
            "type":0, //0 普通用户 1 合作单位
            "password":"",
            "limit":1
         },
         query:{
             email:"",
            name:""

         }
      }
   },
   watch:{
      "page": function (p) {
         this.page = p;
         this.onTreepage();
      }
   },
   methods:{
      addUser: function (e) {
         this.user = {
            "_type":"新增用户",
            "name":"",
            "mobile":"",
            "email":"",
            "department":"",
            "unit":"",
            "admin":0,
            "type":0, //0 普通用户 1 合作单位
            "password":"",
            "limit":1
         };
         this.openDialog();
      },
      editUser: function (model) {
         model._type="修改用户";
         this.user = JSON.parse(JSON.stringify(model));
         this.openDialog();
      },
      onQuery: function () {
         this.getUsers();
      },
      onReset: function () {
         this.query = {
            name:"",
             email:""
         }
         this.getUsers();
      },
      getUsers:function(param){
         var self = this;
         this.loading = true;
         Service.getUsers({page:self.page,limit:self.limit,type:self.user.type,email:this.query.email?this.query.email:undefined,name:this.query.name?this.query.name:undefined},function (rep) {
            self.loading = false;
            if(rep.Code == 0){
               self.users = rep.Response.lists;
               self.count = rep.Response.count;
            }
         });
      },
      delUser: function (id) {
         var r =  confirm("确认删除？");
         if(r){
            this.loading = true;
            var self = this;
            Service.delUser(id, function (rep) {
               self.loading = false;
               if(rep.Code != 0 ){
                  alert(rep.Message);
               }else{
                  self.getUsers();
               }
            });
         }
      },
      postUser: function () {
         if (!this.isValid){
            return;
         }

         var self = this;
         this.loading = true;
         if(this.user._id){
            Service.updateUser(this.user._id,JSON.stringify(self.user),function (rep) {
               if(rep.Code != 0 ){
                  alert(rep.Message);
               }else{
                  self.getUsers();
               }
               self.loading = false;
               self.closeDialog();
            });
         }else{
            Service.addUser(JSON.stringify(self.user),function (rep) {
               if(rep.Code != 0 ){
                  alert(rep.Message);
               }else{
                  self.getUsers();
               }
               self.loading = false;
               self.closeDialog();
            });
         }
      },
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
      openDialog: function () {
         this.dialog.show();
         this.mask.show();
      },
      closeDialog: function () {
         this.dialog.hide();
         this.mask.hide();
      },
      inputUser: function () {

         $.getJSON("/admin/data/dataNew.json", function (rep) {

            var i = 0,len = rep.length;

            var timer =  setInterval(function () {
               if(i<len){
                  var p = rep[i];
                  p.limit = 1;
                  p.admin = 0;
                  p.type = 0;
                  Service.addUser(JSON.stringify(p), function (r) {
                     if(r.Code == 0){
                        console.log(i);
                     }
                  });
                  i++;
               }else{
                  clearInterval(timer);
               }

            },100)



         })
      },
      dellAllUser: function () {
         Service.getUsers({page:0,limit:999},function (rep) {
            var rep = rep.Response.lists;
            var i = 0,len = rep.length;
            var timer =  setInterval(function () {
               if(i<len){
                  Service.delUser(rep[i]._id, function (rep) {
                     if(rep.Code != 0 ){
                     }else{
                        console.log(i);
                     }
                  });
                  i++;
               }else{
                  clearInterval(timer);
               }

            },100)
         });
      },
         onTreeClick:function(event, treeId, treeNode, clickFlag){
            var aa=this;
             //this.users = [];
             aa.level=treeNode.level;
             aa.namea=treeNode.name;
             Service.getUsersa({page:aa.page,limit:aa.limit,type:aa.user.type,email:this.query.email?this.query.email:undefined,name:this.query.name?this.query.name:undefined,namea:treeNode.name?treeNode.name:undefined,level:treeNode.level?treeNode.level:undefined},function (rep) {
                 if(rep.Code == 0){
                     aa.users = rep.Response.lists;
                     aa.count = rep.Response.count;
                 }
             });
             this.dialog = $("#user-dialog");

             var x=parseInt($(window).width()-this.dialog.outerWidth())/2;
             var y=parseInt($(window).height()-this.dialog.outerHeight())/2;
             if (y<=10){y="10"}
             this.dialog.css({"left":x,"top":y});

             this.mask = $(".dialog-mask");
         },
       onTreepage:function(){
           var aa=this;
           //this.users = [];
           Service.getUsersa({page:aa.page,limit:aa.limit,type:aa.user.type,email:this.query.email?this.query.email:undefined,name:this.query.name?this.query.name:undefined,namea: aa.namea? aa.namea:undefined,level: aa.level? aa.level:undefined},function (rep) {
               if(rep.Code == 0){
                   aa.users = rep.Response.lists;
                   aa.count = rep.Response.count;
               }
           });
           this.dialog = $("#user-dialog");

           var x=parseInt($(window).width()-this.dialog.outerWidth())/2;
           var y=parseInt($(window).height()-this.dialog.outerHeight())/2;
           if (y<=10){y="10"}
           this.dialog.css({"left":x,"top":y});

           this.mask = $(".dialog-mask");
       }
   },
   computed: {
      validation: function () {
         return {
            name: Check.check(this.user.name,"required"),
            email: Check.check(this.user.email,"email"),
            mobile: Check.check(this.user.mobile,"mobile")
         }
      },
      isValid: function () {
         var validation = this.validation;
         return Object.keys(validation).every(function (key) {
            return validation[key]
         })
      }


   },
   ready: function () {
      this.getUsers();
      this.dialog = $("#user-dialog");

      var x=parseInt($(window).width()-this.dialog.outerWidth())/2;
      var y=parseInt($(window).height()-this.dialog.outerHeight())/2;
      if (y<=10){y="10"}
      this.dialog.css({"left":x,"top":y});

      this.mask = $(".dialog-mask");


       var zTree;

       var setting = {
           view: {
               dblClickExpand: false,
               showLine: false
           },
           data: {
               simpleData: {
                   enable: true
               }
           },
           check: {
               enable: false,
               autoCheckTrigger: true
           },
           callback: {
               beforeClick: null,
               onClick: this.onTreeClick
           }
       };
       // function zTreeOnClick(event, treeId, treeNode, clickFlag) {
       //     var self = this;
       //     this.loading = true;

       //
       //
       //}
       var zNodes;
       Service.getDepts(function (rep) {

                zNodes = rep.Response;

           var t = $("#treeDemo");
           t = $.fn.zTree.init(t, setting, zNodes);
       });



   }
});

});

;/*!/components/page/bus/bus.js*/
define('components/page/bus/bus', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Check = require("main/check.js");
var pager = require("pager/pager.js");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-bus\">\r\n    <div class=\"panel admin-panel\">\r\n        <div class=\"panel-head\">\r\n            <strong>\r\n                发车管理\r\n            </strong>\r\n        </div>\r\n        <div class=\"padding border-bottom\">\r\n            <input type=\"button\" class=\"button button-small bg-main\" data-mask=\"1\" data-width=\"50%\"  v-on=\"click:addBus\" value=\"新增车辆\" />\r\n        </div>\r\n        <table class=\"table table-hover\">\r\n            <tr><th width=\"120\">车辆照片</th><th width=\"120\">车辆名</th><th width=\"100\">车牌号</th><th width=\"100\">驾驶员</th><th width=\"100\">方向</th><th width=\"*\">路线</th><th width=\"80\">发车时间</th><th width=\"80\">到达时间</th><th width=\"80\">状态</th><th width=\"200\">操作</th></tr>\r\n            <tr v-repeat=\"c in buses\" >\r\n                <td ><img width=\"64\" height=\"64\"  class=\"img-border radius-small\" v-attr=\"src:c.src||'/admin/static/images/128.png'\"></td>\r\n                <td >{{c.name}}</td>\r\n                <td >{{c.sn}}</td>\r\n                <td>{{c.jsy}}</td>\r\n                <td >{{c.destination}}</td>\r\n                <td >{{c.line}}</td>\r\n                <td >{{c.goff}}</td>\r\n                <td >{{c.arrive}}</td>\r\n                <td >{{c.online == 0?\"停用\":\"启用\"}}</td>\r\n                <td >\r\n                    <a v-on=\"click:editBus(c)\" class=\"button border-blue button-little\" href=\"javascript:;\">修改</a>\r\n                    <a class=\"button border-yellow button-little\" v-on=\"click:delBus(c._id)\" href=\"javascript:;\" >删除</a>\r\n                    <a href=\"#/home/bus/{{c._id}}\" class=\"button border-blue button-little\" href=\"javascript:;\">车位管理</a>\r\n                </td>\r\n            </tr>\r\n        </table>\r\n\r\n        <c-pager count=\"{{@ count}}\" limit=\"{{@ limit}}\" page=\"{{@ page}}\"></c-pager>\r\n\r\n\r\n        <div class=\"dialog-mask\" style=\"display: none;\"></div>\r\n        <div id=\"bus-dialog\" class=\"dialog-win\" style=\"position: fixed; width: 50%; z-index: 11;display: none;\">\r\n            <div class=\"dialog open\">\r\n                <div class=\"dialog-head\">\r\n                    <span class=\"close\" v-on=\"click:closeDialog\"></span>\r\n                    <strong>{{bus._type}}</strong>\r\n                </div>\r\n                <div class=\"dialog-body\">\r\n                    <div class=\"form-x\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                车辆名\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.name\" placeholder=\"请填写车辆名\">\r\n                                <div v-show=\"!validation.name\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                车牌号\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.sn\" placeholder=\"请填写车牌号\">\r\n                                <div v-show=\"!validation.sn\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                        <div class=\"label\">\r\n                            驾驶员\r\n                        </div>\r\n                        <div class=\"field\">\r\n                            <input type=\"text\" class=\"input\" v-model=\"bus.jsy\" placeholder=\"请填写驾驶员\">\r\n\r\n                        </div>\r\n                    </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                驾驶员电话\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.tel\" placeholder=\"请填写驾驶员电话号码\">\r\n\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                方向\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.destination\" placeholder=\"请填写目的地\">\r\n                                <div v-show=\"!validation.destination\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                路线\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.line\" placeholder=\"请填写路线\">\r\n                                <div v-show=\"!validation.line\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                发车时间\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.goff\" placeholder=\"请填写目的地\">\r\n                                <div v-show=\"!validation.goff\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                到达时间\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"bus.arrive\" placeholder=\"请填写到达时间\">\r\n                                <div v-show=\"!validation.arrive\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                状态\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <select class=\"input\" v-model=\"bus.online\">\r\n                                    <option value=0>停用</option>\r\n                                    <option value=1>启用</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                发车日\r\n                            </div>\r\n                            <div class=\"field\">\r\n\r\n\t\t\t\t\t\t\t\t<label for='bus-week-0'>星期一</label>\r\n\t\t\t\t\t\t\t\t<input id='bus-week-0' type='checkbox' v-model=\"bus.weeks['0']\" number value=1 />\r\n\r\n\t\t\t\t\t\t\t\t<label for='bus-week-1'>星期二</label>\r\n\t\t\t\t\t\t\t\t<input id='bus-week-1' type='checkbox' v-model=\"bus.weeks['1']\" number value=1 />\r\n\r\n\t\t\t\t\t\t\t\t<label for='bus-week-2'>星期三</label>\r\n\t\t\t\t\t\t\t\t<input id='bus-week-2' type='checkbox' v-model=\"bus.weeks['2']\" number value=1 />\r\n\r\n\t\t\t\t\t\t\t\t<label for='bus-week-3'>星期四</label>\r\n\t\t\t\t\t\t\t\t<input id='bus-week-3' type='checkbox' v-model=\"bus.weeks['3']\" number value=1 />\r\n\r\n\t\t\t\t\t\t\t\t<label for='bus-week-4'>星期五</label>\r\n\t\t\t\t\t\t\t\t<input id='bus-week-4' type='checkbox' v-model=\"bus.weeks['4']\" number value=1 />\r\n\r\n\t\t\t\t\t\t\t\t<label for='bus-week-5'>星期六</label>\r\n\t\t\t\t\t\t\t\t<input id='bus-week-5' type='checkbox' v-model=\"bus.weeks['5']\" number value=1 />\r\n\r\n\t\t\t\t\t\t\t\t<label for='bus-week-6'>星期日</label>\r\n\t\t\t\t\t\t\t\t<input id='bus-week-6' type='checkbox' v-model=\"bus.weeks['6']\" number value=1 /> \r\n\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                照片\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <a class=\"button bg-main input-file\" href=\"javascript:void(0);\">\r\n                                    + 上传照片\r\n                                    <input size=\"100\" type=\"file\" v-on=\"change:upLoadImg\" accept=\"image/gif, image/jpeg, image/png\" />\r\n                                </a>\r\n                                <img v-if=\"bus.src\" v-attr=\"src:bus.src\"  width=\"50\" height=\"50\" class=\"img-border radius-small\" />\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n                <div class=\"dialog-foot\">\r\n                    <button class=\"button dialog-close\" v-on=\"click:closeDialog\">取消</button>\r\n                    <button class=\"button bg-green\" v-disabled=\"isValid\" v-on=\"click:postBus\">确认</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>\r\n\r\n",
   data: function () {
      return {
         buses:[],
         count:0,
         limit:10,
         page:0,
         bus:{
            "_type":"新增车辆",
            "name":"",
            "sn":"",
            "goff":"",
            "arrive":"",
            "line":"",
            "online":1,
			"weeks":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1},
            "src":"/admin/static/images/128.png"
         },
         loading:false
      }
   },
   watch:{
      "page": function (p) {
         this.page = p;
         this.getBuses();
      }
   },
   methods:{
      addBus: function (e) {
         this.bus = {
            "_type":"新增车辆",
            "name":"",
            "sn":"",
            "line":"",
            "arrive":"",
            "destination":"",
            "goff":"",
            "online":1,
			"weeks":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1},
            "src":"/admin/static/images/128.png"
         };
         this.openDialog();
      },
      editBus: function (model) {
         model._type="编辑车辆";
         this.bus = JSON.parse(JSON.stringify(model));
         this.openDialog();
      },
      getBuses:function(param){
         var self = this;
         this.loading = true;
         Service.getBuses({page:self.page,limit:self.limit},function (rep) {
            self.loading = false;
            if(rep.Code == 0){
               self.buses = rep.Response.lists;
               self.count = rep.Response.count;
            }
         });
      },
      delBus: function (id) {
         this.loading = true;
         var self = this;

         var r = confirm("确认删除？");
         if(r){
            Service.delBus(id, function (rep) {
               self.loading = false;
               if(rep.Code != 0 ){
                  alert(rep.Message);
               }else{
                  self.getBuses();
               }
            });
         }
      },
      postBus: function () {
         if (!this.isValid){
            return;
         }
         var self = this;
         this.loading = true;
         if(this.bus._id){
            Service.updateBus(this.bus._id,JSON.stringify(self.bus),function (rep) {
               if(rep.Code != 0 ){
                  alert(rep.Message);
               }else{
                  self.getBuses();
               }
               self.loading = false;
               self.closeDialog();
            });
         }else{
            Service.addBus(JSON.stringify(self.bus),function (rep) {
               if(rep.Code != 0 ){
                  alert(rep.Message);
               }else{
                  self.getBuses();
               }
               self.loading = false;
               self.closeDialog();
            });
         }
      },
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
      openDialog: function () {
         this.dialog.show();
         this.mask.show();
      },
      closeDialog: function () {
         this.dialog.hide();
         this.mask.hide();
      },
      upLoadImg: function (e) {
         var self = this;
         lrz(e.target.files[0],{width:400}, function (result) {
            self.bus.src = result.base64;
         })
      }
   },
   computed: {
      validation: function () {
         return {
            name: Check.check(this.bus.name,"required"),
            sn: Check.check(this.bus.sn,"required"),
            destination: Check.check(this.bus.destination,"required"),
            goff: Check.check(this.bus.goff,"required"),
            line: Check.check(this.bus.line,"required"),
            arrive: Check.check(this.bus.line,"required")
         }
      },
      isValid: function () {
         var validation = this.validation;
         return Object.keys(validation).every(function (key) {
            return validation[key]
         })
      }
   },
   ready: function () {
      this.getBuses();
      this.dialog = $("#bus-dialog");
      var x=parseInt($(window).width()-this.dialog.outerWidth())/2;
      var y=parseInt($(window).height()-this.dialog.outerHeight())/2;
      if (y<=10){y=10}
      this.dialog.css({"left":x,"top":y});
      this.mask = $(".dialog-mask");
   }
});

});

;/*!/components/page/order/order.js*/
define('components/page/order/order', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

Vue.filter("dateFormat", function (v) {
   var d = new Date(v);
   return d.getFullYear() + "-" + (d.getMonth()+1) +"-" + d.getDate();
});

module.exports = Vue.extend({
   inherit:true,
   template:"<div>\r\n\r\n    <div class=\"panel admin-panel\">\r\n\r\n        <div class=\"panel-head\">\r\n\r\n            <strong>\r\n                车位预订\r\n            </strong>\r\n        </div>\r\n        <div class=\"padding border-bottom\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"label\"><label >目的地&nbsp;</label></div>\r\n                    <div class=\"field\">\r\n                        <select class=\"input\" name=\"place\">\r\n                            <option>请选择</option>\r\n                            <option value=\"1\">目的地1234</option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n            <ul class=\"nav nav-menu nav-inline nav-main nav-justified nav-navicon border-green\">\r\n                <li v-class=\"dateActive:$index==0\" v-repeat=\"d in dates\"><a href=\"javascript:;\" style=\"padding-left: 0;padding-right: 0;\">{{d | dateFormat}}</a></li>\r\n            </ul>\r\n        </div>\r\n        <table class=\"table table-hover\">\r\n            <tr><th width=\"45\">选择</th><th width=\"120\">车牌号</th><th width=\"100\">驾驶员</th><th width=\"100\">汽车类型</th><th width=\"100\">发车目的地</th><th width=\"100\">发车时间</th><th width=\"100\">座位数</th><th width=\"100\">操作</th></tr>\r\n            <tr v-repeat=\"c in cars\">\r\n                <td><input type=\"checkbox\" name=\"id\" value=\"1\" /></td>\r\n                <td>{{c.name}}</td>\r\n                <td>{{c.name}}</td>\r\n                <td>大巴</td>\r\n                <td>{{c.destination}}</td>\r\n                <td>{{c.goff}}</td>\r\n                <td>{{c.number}}</td>\r\n                <td><a class=\"button border-blue button-little\" href=\"#\">预订</a> </tr>\r\n        </table>\r\n    </div>\r\n</div>",
   data: function () {
      return {
         dates:[],
         cars:[]
      }
   },
   methods:{
      getDays: function (num) {
         var n = num || 12,now = Date.parse(new Date()),list = [];

         //CONFIG.OFFTIME;

         for(var i = 0; i< n;i++){
            now+=3600000*24;
            list.push(now);
         }
         return list;
      }
   },
   ready: function () {
      this.dates = this.getDays();
      var self = this;
      Service.getCarList({page:1,size:10}, function (rep) {
         self.cars = rep.Response.rows;
      })
   }
});

});

;/*!/components/page/desk/desk.js*/
define('components/page/desk/desk', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");


module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"admin\">\r\n    <div class=\"line-big\">\r\n        <div class=\"xm3\">\r\n            <div class=\"panel border-back\">\r\n                <div class=\"panel-body text-center\">\r\n                    <img src=\"/bus/static/images/admin.jpg\" width=\"120\" class=\"radius-circle\"><br>\r\n                    管理员\r\n                </div>\r\n                <div class=\"panel-foot bg-back border-back\">您好，管理员!</div>\r\n            </div>\r\n            <br>\r\n            <div class=\"panel\">\r\n                <div class=\"panel-head\"><strong>系统统计</strong></div>\r\n                <ul class=\"list-group\">\r\n                    <li><span class=\"float-right badge bg-red\">{{system.users}}</span><span class=\"icon-user\"></span> 绑定用户</li>\r\n                    <li><span class=\"float-right badge bg-main\">{{system.buses}}</span><span class=\"icon-car\"></span> 车辆</li>\r\n                    <li><span class=\"float-right badge bg-main\">{{system.seats}}</span><span class=\"icon-shopping-cart\"></span> 车位</li>\r\n                </ul>\r\n            </div>\r\n            <br>\r\n        </div>\r\n        <div class=\"xm9\">\r\n            <!--<div class=\"alert alert-green\"><strong>注意：</strong>今日预定座位总数为123个。</div>-->\r\n\r\n            <div class=\"panel\">\r\n                <table class=\"table\">\r\n                    <tbody><tr><th colspan=\"2\">服务器信息</th></tr>\r\n                    <tr><td width=\"110\" align=\"right\">操作系统：</td><td>{{system.os}}</td></tr>\r\n                    <tr><td align=\"right\">Web服务器：</td><td>{{system.web}}</td></tr>\r\n                    <tr><td align=\"right\">程序语言：</td><td>{{system.language}}</td></tr>\r\n                    <tr><td align=\"right\">数据库：</td><td>{{system.db}}</td></tr>\r\n                    <tr><td align=\"right\">当前状态：</td><td>{{system.status}}</td></tr>\r\n                    <tr><td align=\"right\">运行时间：</td><td>{{getTime}}</td></tr>\r\n                    <tr><td align=\"right\">内存使用：</td><td>{{system.memory/1048576}}MB</td></tr>\r\n                    </tbody></table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <br>\r\n</div>",
   data: function () {
      return {
         system:{}
      }
   },
   computed:{
      getTime:function(){
         var t = this.system.uptime;
         var hour = parseInt(t/3600);
         var minu = parseInt((t/3600-hour)*60);
         var sec = t - hour*3600 - minu*60;
         return hour +"小时" + minu +"分"+sec+"秒";
      }
   },
   compiled: function () {
      var self = this;
      this.loading = true;
      Service.getSysInfo(function (rep) {
         if(rep.Code == 0){
            self.system = rep.Response;
         }
         self.loading = false;

      })
   }
});

});

;/*!/components/page/company/company.js*/
define('components/page/company/company', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Check = require("main/check.js");
var pager = require("pager/pager.js");

var _user = {
   "_type":"新增用户",
   "name":"",
   "mobile":"",
   "email":"",
   "admin":0,
   "company":"",
   "effective":"",
    "yy":"",
    "sn":"",
   "booktype":"0",
   "type":1  //0 普通用户 1 外包用户
}

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-user\">\r\n    <div class=\"panel admin-panel\">\r\n        <div class=\"panel-head\">\r\n            <strong>\r\n                用户列表\r\n            </strong>\r\n        </div>\r\n        <div class=\"padding border-bottom\">\r\n            <div class=\"form-inline\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"label\">\r\n                        用户类型：\r\n                    </div>\r\n                    <div class=\"field\">\r\n                        <select class=\"input\" v-model=\"user.booktype\">\r\n                            <option value=\"0\" >长期用户</option>\r\n                            <option value=\"1\">短期用户</option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <div class=\"label\">\r\n                        合作单位：\r\n                    </div>\r\n                    <div class=\"field\">\r\n                        <select class=\"input\" v-model=\"selected\" options=\"companies\">\r\n                            <option value=\"0\">\r\n                                请选择条件筛选\r\n                            </option>\r\n                        </select>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n\r\n            <input type=\"button\" class=\"button button-small bg-main \"  data-target=\"#user-dialog\" style=\"float: right\" data-mask=\"1\" data-width=\"50%\"  v-on=\"click:addUser\" value=\"新增用户\" />\r\n        </div>\r\n        <table class=\"table table-hover\">\r\n            <tr><th width=\"150\">用户名</th>\r\n                <th width=\"*\" v-show=\"user.booktype==0\">邮箱</th>\r\n                <th width=\"200\">合作单位</th>\r\n                <th width=\"200\">手机号码</th>\r\n                <th width=\"100\">用户类型</th>\r\n                <th width=\"120\" >到期时间</th>\r\n                <th width=\"120\">状态</th>\r\n                <th width=\"100\">操作</th></tr>\r\n            <tr v-repeat=\"c in users\">\r\n                <td>{{c.name}}</td>\r\n                <td v-show=\"user.booktype==0\">{{c.email}}</td>\r\n                <td>{{c.company}}</td>\r\n                <td>{{c.mobile}}</td>\r\n                <td>{{c.booktype==1?\"短期用户\":\"长期用户\"}}</td>\r\n                <td >{{c.effective}}</td>\r\n                <td ><span class=\"badge bg-green\" v-show=\"c.zt==2\">审核通过</span>\r\n                     <span class=\"badge bg-yellow\" v-show=\"c.zt==0\">待审核</span>\r\n                     <span class=\"badge bg-red\" v-show=\"c.zt==1\">审核中</span>\r\n                     <span class=\"badge bg-red\" v-show=\"c.zt==3\">审核未通过</span>\r\n                </td>\r\n                <td><a v-on=\"click:editUser(c)\" class=\"button border-blue button-little\" href=\"javascript:;\">修改</a> <a class=\"button border-yellow button-little\" v-on=\"click:delUser(c._id)\" href=\"javascript:;\">删除</a> </td></tr>\r\n        </table>\r\n\r\n        <c-pager count=\"{{@ count}}\" limit=\"{{@ limit}}\" page=\"{{@ page}}\"></c-pager>\r\n\r\n        <div class=\"dialog-mask\" style=\"display: none;\"></div>\r\n\r\n        <div id=\"company-dialog\" class=\"dialog-win\" style=\"position: fixed; width: 50%; z-index: 11;display: none;\">\r\n            <div class=\"dialog open\">\r\n                <div class=\"dialog-head\">\r\n                    <span class=\"close\" v-on=\"click:closeDialog\"></span>\r\n                    <strong>{{user._type}}</strong>\r\n                </div>\r\n                <div class=\"dialog-body\" v-show=\"user.booktype==0\">\r\n                    <div class=\"form-x\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                用户名\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"user.name\" placeholder=\"请填写用户名\">\r\n                                <div v-show=\"!validation.name\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                身份证号\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\"  v-model=\"user.sn\" placeholder=\"请填写身份证号\">\r\n                                <div v-show=\"!validation2.sn\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                合作单位\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"user.company\" placeholder=\"请填写合作单位名称\">\r\n                                <div v-show=\"!validation.company\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                邮箱\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"user.email\" placeholder=\"请填写邮箱\">\r\n                                <div v-show=\"!validation.email\" class=\"input-help  check-error\"><ul><li>请填写正确邮箱格式</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                手机号\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"user.mobile\" placeholder=\"请填写手机号\">\r\n                                <div v-show=\"!validation.mobile\" class=\"input-help  check-error\"><ul><li>请填写正确手机号码</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                到期时间\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" id=\"effective\" v-model=\"user.effective\" placeholder=\"请填写到期时间\">\r\n                                <div v-show=\"!validation2.effective\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                原因\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\"  v-model=\"user.yy\" placeholder=\"请填写原因\">\r\n                                <div v-show=\"!validation2.yy\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"dialog-body\" v-show=\"user.booktype==1\">\r\n                    <div class=\"form-x\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                用户名\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"user.name\" placeholder=\"请填写用户名\">\r\n                                <div v-show=\"!validation2.name\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                身份证号\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\"  v-model=\"user.sn\" placeholder=\"请填写身份证号\">\r\n                                <div v-show=\"!validation2.sn\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                合作单位\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"user.company\" placeholder=\"请填写合作单位名称\">\r\n                                <div v-show=\"!validation2.company\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                手机号\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\" v-model=\"user.mobile\" placeholder=\"请填写手机号\">\r\n                                <div v-show=\"!validation2.mobile\" class=\"input-help  check-error\"><ul><li>请填写正确手机号码</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                到期时间\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\"  v-model=\"user.effective\" placeholder=\"请填写到期时间\">\r\n                                <div v-show=\"!validation2.effective\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                                原因\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <input type=\"text\" class=\"input\"  v-model=\"user.yy\" placeholder=\"请填写原因\">\r\n                                <div v-show=\"!validation2.yy\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"dialog-foot\">\r\n                    <button class=\"button dialog-close\" v-on=\"click:closeDialog\">取消</button>\r\n                    <button class=\"button bg-green\" v-disabled=\"isValid\" v-on=\"click:postUser\" >确认</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>",
   data: function () {
      return {
         users:[],
         count:0,
         limit:10,
         page:0,
         companies:[],
         selected:"",
         user:_user
      }
   },
   watch:{
      "page": function (p) {
         this.page = p;
         this.getUsers();
      },
      "selected": function (v) {
         this.getUsers(v==0?undefined:v);
      },
      "user.booktype": function (v) {
         this.getUsers();
      }
   },
   methods:{
      addUser: function (e) {
         this.initData();
         this.openDialog();
      },
      editUser: function (model) {
         model._type="修改用户";
         this.user = JSON.parse(JSON.stringify(model));
         this.openDialog();
      },
      getUsers:function(param){
         var self = this;
         this.loading = true;
         Service.getUsers({page:self.page,limit:self.limit,type:self.user.type,company:param,booktype:this.user.booktype},function (rep) {
            self.loading = false;
            if(rep.Code == 0){
               self.users = rep.Response.lists;
               self.count = rep.Response.count;
            }
         });
      },
      delUser: function (id) {
         var r = confirm("确认删除？");
         if(r){
            this.loading = true;
            var self = this;
            Service.delUser(id, function (rep) {
               self.loading = false;
               if(rep.Code != 0 ){
                  alert(rep.Message);
               }else{
                  self.getUsers();
               }
            });
         }
      },
      postUser: function () {
         if (!this.isValid){
            return;
         }
         var self = this;
         this.loading = true;
         if(this.user._id){
            Service.updateUser(this.user._id,JSON.stringify(self.user),function (rep) {
               if(rep.Code != 0 ){
                  alert(rep.Message);
               }else{
                  self.getUsers();
               }
               self.loading = false;
               self.closeDialog();
            });
         }else{
            Service.addUser(JSON.stringify(self.user),function (rep) {
               if(rep.Code != 0 ){
                  alert(rep.Message);
               }else{
                  self.getUsers();
               }
               self.loading = false;
               self.closeDialog();
            });
         }
      },
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
      openDialog: function () {

         this.dialog.show();
         this.mask.show();
      },
      closeDialog: function () {
         this.dialog.hide();
         this.mask.hide();
      },
      initData: function () {
         this.user.name = "";
         this.user.email = "";
         this.user.company = "";
         this.user.effective = "";
         this.user.mobile = "";
          this.user.yy = "";
          this.user.sn = "";
          this.user.zt = "0";
      },
      filterCompanies: function () {
         var self = this;
         Service.getCompanies(function (rep) {
            self.companies = rep.Response;
         })
      }
   },
   computed: {
      validation: function () {
         return {
            name: Check.check(this.user.name,"required"),
            email: Check.check(this.user.email,"email"),
            company: Check.check(this.user.company,"required"),
            mobile: Check.check(this.user.mobile,"mobile")
         }
      },
      validation2: function () {
         return {
            name: Check.check(this.user.name,"required"),
            effective: Check.check(this.user.effective,"required"),
            company: Check.check(this.user.company,"required"),
             yy: Check.check(this.user.yy,"required"),
             sn: Check.check(this.user.sn,"required"),
            mobile: Check.check(this.user.mobile,"mobile")
         }
      },
      isValid: function () {
         var validation = this.validation;
         var validation2 = this.validation2;
         if(this.user.booktype == 0){
            return Object.keys(validation).every(function (key) {
               return validation[key]
            })
         }else {
            return Object.keys(validation2).every(function (key) {
               return validation2[key]
            })
         }
      }
   },
   ready: function () {
      this.getUsers();
      this.filterCompanies();
      this.dialog = $("#company-dialog");
      var x=parseInt($(window).width()-this.dialog.outerWidth())/2;
      var y=parseInt($(window).height()-this.dialog.outerHeight())/2;
      if (y<=10){y="10"}
      this.dialog.css({"left":x,"top":y});
      this.mask = $(".dialog-mask");
      var self = this;
      laydate.skin('molv');
      laydate({
         elem: '#effective',
         //min:laydate.now(),
         choose: function (datas) {
            self.user.effective = datas;
         }
      })

   }

});

});

;/*!/components/page/companyOrder/ticketsStats/ticketsStats.js*/
define('components/page/companyOrder/ticketsStats/ticketsStats', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-ticketsStats\">\r\n <table class=\"table\">\r\n  <tbody><tr>\r\n   <th width=\"200\">名称</th>\r\n   <th width=\"100\">可预订</th>\r\n   <th width=\"100\">已预订</th>\r\n   <th width=\"100\">总座位</th>\r\n   <th width=\"*\">操作</th>\r\n  </tr>\r\n  </tbody></table>\r\n <div  v-style=\"tableStyle\">\r\n  <table class=\"table table-hover\">\r\n   <tbody>\r\n   <tr v-repeat=\"b in tStats\" >\r\n    <td width=\"200\">\r\n     {{b.name}}\r\n    </td>\r\n    <td width=\"100\">\r\n     {{b.void}}\r\n    </td>\r\n    <td width=\"100\">\r\n     {{b.order}}\r\n    </td>\r\n    <td width=\"100\">\r\n     {{b.order + b.void}}\r\n    </td>\r\n    <td width=\"*\">\r\n     <a  class=\"button border-blue button-little\" v-on=\"click:getBusSeat(b.id)\" href=\"javascript:;\">去预订</a>\r\n    </td>\r\n   </tr>\r\n   </tbody>\r\n  </table>\r\n </div>\r\n</div>",
   methods:{
      getBusSeat: function (id) {
         var self = this;
         Service.getBusTickets({bus:id,date:this.selectCalendar}, function (rep) {
            self.bus = rep.Response;
            self.childView = "seats";
         });
      }

   }
});


});

;/*!/components/page/companyOrder/busSeat/busSeat.js*/
define('components/page/companyOrder/busSeat/busSeat', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Check = require("main/check.js");
var IScroll = require("component_modules/iscroll-zoom.js");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-busSeat\" style=\"height:{{tableStyle2.height}};\">\r\n <div class=\" mui-scroll-wrapper\" style=\"top:151px;height:{{tableStyle2.height}};overflow: hidden\">\r\n  <div class=\"mui-scroll\">\r\n   <div class=\"bus-header\">\r\n    <span>车头方向</span>\r\n    <a class=\"void\"></a> 可选\r\n    <a class=\"order\"></a> 已选\r\n   </div>\r\n   <table class=\"bus-body\" >\r\n    <tr v-repeat=\"r in bus.rows\">\r\n     <td v-repeat=\"bus.cols\" class=\"seat\" data-id=\"{{getSeatId(r,$index)}}\"  v-class=\"seatClass(r,$index)\" style=\"position: relative;\">\r\n      <a style=\"cursor: pointer\" class=\"iconfont\" v-text=\"getText(r,$index)\"  v-on=\"click:clickSeat(this,r,$index)\" >\r\n      </a>\r\n\t  <p class=\"user-name\" v-text=\"getSeatUserName(r,$index)\"></p>\r\n     </td>\r\n    </tr>\r\n   </table>\r\n  </div>\r\n </div>\r\n</div>",
   data: function () {
     return {

     }
   },
   methods:{
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

	  getSeatUserName: function (r,c) {
            var seat = this.getSeatId(r,c);
            if(seat){
                var seat = JSON.parse(seat);
                if(seat.entity.user){
                    return seat.entity.user.name;
                }
            }
        },

      clickSeat: function (e,r,c) {
         var $t = $(e.$el);
         if($t.hasClass("icon-seat-void")){
            $(".bus-body").find("td").removeClass("icon-seat-select");
            $t.addClass("icon-seat-select");
            this.selectSeat = $t.data("id").ticket;
         }
      },
      renderScroll: function () {
         myScroll = new IScroll($(".page-busSeat > .mui-scroll-wrapper")[0], {
            zoom: true,
            scrollX: true,
            scrollY: true,
            mouseWheel: true,
            wheelAction: 'zoom'
         });
      }
   },
   watch:{

   },
   ready: function () {
      var self = this;
      Vue.nextTick(function () {
         self.renderScroll();
      })
   }
});


});

;/*!/components/page/companyOrder/companyOrder.js*/
define('components/page/companyOrder/companyOrder', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Check = require("main/check.js");

var tStats = require("components/page/companyOrder/ticketsStats/ticketsStats");
var bSeat = require("components/page/companyOrder/busSeat/busSeat");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-companyOrder container-layout\">\r\n    <div class=\"line\">\r\n        <div class=\"x5\">\r\n            <div class=\"panel admin-panel\">\r\n                <div class=\"padding border-bottom\">\r\n                    <div class=\"form-inline\">\r\n                        <div class=\"form-group\">\r\n\r\n                            <div class=\"field\">\r\n                                <select class=\"input\" v-model=\"selectCompany\" options=\"companies\">\r\n                                    <option >请选择合作单位</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <div class=\"field\">\r\n                                <select class=\"input\" v-model=\"selectCalendar\" options=\"calendar\">\r\n                                    <option value=\"\">请选择日期</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <!--<button class=\"button bg-main float-right\" v-on=\"click:getCompanyUser\" >查询</button>-->\r\n                </div>\r\n\r\n                <table class=\"table\">\r\n                    <tr>\r\n                        <th width=\"60\">序号</th>\r\n                        <th width=\"100\">姓名</th>\r\n                        <th width=\"100\">车辆</th>\r\n                        <th width=\"100\">车位</th>\r\n                        <th width=\"*\">操作</th>\r\n                    </tr>\r\n                </table>\r\n                <div v-style=\"tableStyle\" >\r\n                    <table class=\"table \">\r\n                        <tr v-repeat=\"u in users\" style=\"cursor: pointer\" v-on=\"click:clickUser(u._id)\" v-class=\"bg-main:u._id == selectUser\">\r\n                            <td width=\"60\">\r\n                                {{$index+1}}\r\n                            </td>\r\n                            <td width=\"100\">\r\n                                {{u.name}}\r\n                            </td>\r\n                            <td width=\"100\">\r\n                                {{u.bus}}\r\n                            </td>\r\n                            <td width=\"100\">\r\n                                {{u.seat}}\r\n                            </td>\r\n                            <td width=\"*\">\r\n                                <button v-if=\"u.seat\" v-on=\"click:unSub(u._id,u.ticket)\" class=\"button bg-yellow\">退订</button>\r\n                            </td>\r\n                        </tr>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"x7\" style=\"padding-left: 5px;\">\r\n            <div class=\"panel admin-panel\">\r\n                <div class=\"padding border-bottom\">\r\n                    <div class=\"form-inline\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"label\">\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <select v-attr=\"disabled:users.length==0\" v-on=\"change:searchTicketStats\" class=\"input\" v-model=\"selectWhither\" options=\"whither\">\r\n                                    <option>请选择目的地</option>\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                        <span class=\"badge bg-sub\">{{selectCalendar}}</span>\r\n                    </div>\r\n                    <button v-on=\"click:onOrder\" class=\"button bg-main float-right\"  v-attr=\"disabled:!selectSeat||!selectUser\">预订</button>\r\n\r\n                </div>\r\n\r\n                <div v-component=\"{{childView}}\" keep-alive ></div>\r\n\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>",
   components:{
      stats:tStats,
      seats:bSeat,
      bus:{}
   },
   data: function () {
      return {
         companies:[],
         selectCompany:null,
         selectUser:null,
         calendar:[],
         selectCalendar:null,
         selectSeat:null,
         whither:[],
         selectWhither:null,
         users:[],
         tableStyle:{
            "height":document.documentElement.clientHeight-282 +"px",
            "overflow-y":"auto"
         },tableStyle2:{
            "height":document.documentElement.clientHeight-245 +"px",
            "overflow-y":"auto"
         },
         bus:{},
         childView:"",
         tStats:[] /*查票*/
      }
   },
   methods:{
      getUser: function () {
         var self =this;
         this.loading = true;
         if(!this.selectCompany){
            return this.users = [];
         }
         Service.getUsers({
            page:0,
            limit:999,
            type:1,
            booktype:1,
            effective:true,
            company:self.selectCompany
         }, function (rep) {
            if(rep.Code == 0){
               var users = rep.Response.lists;

               Service.getCompanyTicket({
                  page:0,
                  limit:999,
                  company:self.selectCompany,
                  date:self.selectCalendar
               }, function (rep) {
                  if(rep.Code == 0){
                     var list = rep.Response;
                     for(var u = 0;u< users.length; u++){
                        for(var i =0;i< list.length; i++){
                           if(users[u]._id == list[i].user._id){
                              users[u].bus = list[i].bus.name;
                              users[u].seat = list[i].seat.sn;
                              users[u].ticket = list[i]._id;
                           }
                        }
                     }
                     self.users =users;
                  }
                  self.loading = false;
               })

            }
         })
      },
      btnSearch: function () {

      },
      valid: function () {

      },
      searchTicketStats: function () {
         if(this.selectCalendar&&this.selectWhither){
            this.loading = true;
            var self = this;
            Service.getTicketStats({dest:this.selectWhither,date:this.selectCalendar}, function (rep) {
               self.loading = false;
               if(rep.Code == 0){
                  self.tStats = rep.Response;
                  self.childView = "stats";
               }
            })
         }
      },
      getCompanyUser: function () {
         this.selectUser = "";
         this.getUser();
      },
      clickUser: function (id) {
         this.selectUser = id;
      },
      onOrder: function () {
         var self = this;
         this.loading = true;
         Service.orderTicket(this.selectUser,this.selectSeat, function (rep) {
            self.loading = false;
            if(rep.Code == 0){
               self.getUser();
               self.selectSeat = null;
               $(".page-busSeat .icon-seat-select").removeClass("icon-seat-select").addClass("icon-seat-order");
            }else{
               alert(rep.Message);
            }
         })
      },
      unSub: function (uid,id) {
         var r = confirm("确定退订？");
         var self = this;
         if(r){
            this.loading = true;
            Service.unTicket(uid,id, function (rep) {
               this.loading = false;
               self.getUser();
            })
         }

      }
   },
   watch:{
      "selectCompany": function (v) {
         if(v && this.selectCalendar){
            this.getCompanyUser();
         }
      },
      "selectCalendar": function (v) {
         if(v && this.selectCalendar){
            this.getCompanyUser();
            this.searchTicketStats();
         }
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
            for(var i=0;i<target.length;i++){
               lst.push({
                  value:target[i].value,
                  text:target[i].name +"-" +target[i].week + (i==0?"（今天）":"")
               })
            }
            self.calendar = lst;
         }
      });
      Service.getWhither(function (rep) {
         if(rep.Code == 0){
            var target = rep.Response;
            var lst = [];
            for(var i in target){
               for(var d in target[i].list){
                  lst.push(target[i].list[d].id);
               }
            }
            self.whither = lst;
         }
      })
   }
});


});

;/*!/components/page/check/ticketsStats/ticketsStats.js*/
define('components/page/check/ticketsStats/ticketsStats', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-ticketsStats\">\r\n <table class=\"table\">\r\n  <tbody><tr>\r\n   <th width=\"200\">名称</th>\r\n   <th width=\"300\">线路</th>\r\n   <th width=\"100\">可预订</th>\r\n   <th width=\"100\">已预订</th>\r\n   <th width=\"100\">总座位</th>\r\n   <th width=\"*\">操作</th>\r\n  </tr>\r\n  </tbody></table>\r\n <div  v-style=\"tableStyle\">\r\n  <table class=\"table table-hover\">\r\n   <tbody>\r\n   <tr v-repeat=\"b in tStats\" >\r\n    <td width=\"300\">\r\n     {{b.name}}\r\n    </td>\r\n\t<td width=\"200\">\r\n     {{b.line}}\r\n    </td>\r\n    <td width=\"100\">\r\n     {{b.void}}\r\n    </td>\r\n    <td width=\"100\">\r\n     {{b.order}}\r\n    </td>\r\n    <td width=\"100\">\r\n     {{b.order + b.void}}\r\n    </td>\r\n    <td width=\"*\">\r\n     <a  class=\"button border-blue button-little\" v-on=\"click:getBusSeat(b)\" href=\"javascript:;\">查看</a>\r\n    </td>\r\n   </tr>\r\n   </tbody>\r\n  </table>\r\n </div>\r\n</div>",
   methods:{
      getBusSeat: function (b) {
         var self = this;
         self.line = b.line;
         self.busname = b.name;
         Service.getBusTicketsa({bus: b.id,date:this.selectCalendar}, function (rep) {
            self.bus = rep.Response;
            self.childView = "seats";
         });
      }

   }
});


});

;/*!/components/page/check/busSeat/busSeat.js*/
define('components/page/check/busSeat/busSeat', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Check = require("main/check.js");
var IScroll = require("component_modules/iscroll-zoom.js");

module.exports = Vue.extend({
   inherit:true,
   template:"<style>\r\n\t@media print {\r\n\t\t@page { size: A4 portrait;}\r\n\t\t.lefter {display:none;}\r\n\t\t#admin-nav{display:none;}\r\n\t\t.admin { left:0; top:0; padding: 0;width: 100%;}\r\n\t\t.printer {display:none;}\r\n\t\t.bus-body { width: auto;}\r\n\t\t.page-companyOrder {padding: 0;}\r\n\t\t.page-busSeat .bus-header{padding: 10px 0;}\r\n\t}\r\n\r\n</style>\r\n\r\n<div class=\"page-busSeat\">\r\n <div class=\" mui-scroll-wrapper\" style=\"top:151px;\">\r\n  <div class=\"mui-scroll\">\r\n   <div class=\"bus-header\">\r\n    <span>车头方向</span>\r\n    <a class=\"void\"></a> 可选\r\n    <a class=\"order\"></a> 已选\r\n\r\n\t<button v-on=\"click:onPrint\" class=\"button bg-main float-right printer\" >打印</button>\r\n\r\n   </div>\r\n   <table class=\"bus-body\" style='width: 100%;margin: 0 auto;'>\r\n       <tr><td colspan=\"5\">驾驶员：{{bus.jsy}}车牌号：{{bus.sn}}</td></tr>\r\n    <tr v-repeat=\"r in bus.rows\">\r\n     <td v-repeat=\"bus.cols\" style=\"position: relative;padding:0;width:80px; border: 1px solid #000;\">\r\n      <a style=\"cursor: default; line-height: 16px; height: 16px;\" class=\"iconfont\" v-text=\"getText(r,$index)\" >\r\n      </a>\r\n\t  <p class=\"user-name\" v-text=\"getSeatUserName(r,$index)\" style='margin-bottom: 4px;'></p>\r\n         <p class=\"user-name\" v-text=\"getSeatUserSource(r,$index)\" style='margin-bottom: 4px;'></p>\r\n\r\n     </td>\r\n    </tr>\r\n   </table>\r\n  </div>\r\n </div>\r\n</div>",
   data: function () {
     return {

     }
   },
   methods:{
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

	  getSeatUserName: function (r,c) {

            var seat = this.getSeatId(r,c);

            if(seat){
                var seat = JSON.parse(seat);
                if(seat.entity.user){
                    var a=seat.entity.user.name;
                    var b=seat.entity.user.department;
                    if(seat.entity.user.department==null){
                        b="";
                    }
                    if(seat.entity.source){
                        if(seat.entity.source.relation!=null) {
                            b = seat.entity.source.relation;
                        }
                    }


                    var c=a+"("+b+")";
                    return c;

                }
            }

			return "";
        },

       getSeatUserSource: function (r,c) {

           var seat = this.getSeatId(r,c);

           if(seat){
               var seat = JSON.parse(seat);
               if(seat.entity.source){
                   var a=seat.entity.source.name;
                   var b=seat.entity.source.department;

                   var c="代订人："+a+"("+b+")";
                   return c;
               }
           }

           return "";
       },


      clickSeat: function (e,r,c) {
         var $t = $(e.$el);
         if($t.hasClass("icon-seat-void")){
            $(".bus-body").find("td").removeClass("icon-seat-select");
            $t.addClass("icon-seat-select");
            this.selectSeat = $t.data("id").ticket;
         }
      }
   },
   watch:{

   },
   ready: function () {
      var self = this;
      Vue.nextTick(function () {
      })
   }
});


});

;/*!/components/page/check/check.js*/
define('components/page/check/check', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Check = require("main/check.js");

var tStats = require("components/page/check/ticketsStats/ticketsStats");
var bSeat = require("components/page/check/busSeat/busSeat");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-companyOrder container-layout\">\r\n    <div class=\"line\">\r\n        \r\n        <div class=\"x12\" style=\"padding-left: 5px;\">\r\n            <div class=\"panel admin-panel\">\r\n                <div class=\"padding border-bottom\">\r\n                    <div class=\"form-inline\">\r\n                        <div class=\"form-group\">\r\n\r\n                            \r\n\r\n\t\t\t\t\t\t\t<div class=\"field\">\r\n                                <label>查询日期</label>\r\n                                <!--<select class=\"input\" v-model=\"selectCalendar\" options=\"calendar\" >-->\r\n                                    <!--<option value=\"\">请选择日期</option>-->\r\n                                <!--</select>-->\r\n                                <!--<input type=\"button\" v-on=\"click:showDatePicker\" v-attr=\"value:date||'请选择时间'\" style=\"height: 40px\" >-->\r\n                                <!--<input type=\"text\" style=\"height: 40px\"  v-model=\"selectCalendar\"  name=\"bdter\" id=\"bdter\"readonly=\"\" class=\"textbox\"   value=\"\" />-->\r\n                             <input class=\"input\" id=\"selectCalendar\" onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})\"/>\r\n                                <!--<option value=\"\">请选择日期</option>-->\r\n                                <!--</select>-->\r\n                                <!--<input type=\"test\" id=\"selectCalendar\" v-on=\"change:aa()\" v-model=\"selectCalendar\"/>-->\r\n                            </div>\r\n\t\t\t\t\t\t\t<div class=\"label\">\r\n\t\t\t\t\t\t\t\t&nbsp;&nbsp;&nbsp;&nbsp;\r\n                            </div>\r\n                            <div class=\"field\">\r\n\r\n                                <select v-on=\"change:searchTicketStats\" class=\"input\" v-model=\"selectWhither\" options=\"whither\">\r\n                                    <option>请选择目的地</option>\r\n                                </select>\r\n                            </div>\r\n                            <div class=\"label\">\r\n                                &nbsp;&nbsp;&nbsp;&nbsp;\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <button class=\"button  bg-green\" v-on=\"click:searchTicketStats\" data-target=\"#user-dialog\" data-mask=\"1\" data-width=\"50%\"    >\r\n                                    <span class=\"icon-search\"></span>搜索</button>\r\n                                </button>\r\n                               <!--<input type=\"button\" v-on=\"click:searchTicketStats\" value=\"查询\">-->\r\n                            </div>\r\n                        </div>\r\n                        <span class=\"badge bg-sub\">{{selectCalendar}}</span>\r\n                        <span class=\"badge bg-sub\">{{busname}}</span>\r\n                        <span class=\"badge bg-sub\">{{line}}</span>\r\n                    </div>\r\n                </div>\r\n\r\n                <div v-component=\"{{childView}}\" keep-alive ></div>\r\n\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>",
   components:{
      stats:tStats,
      seats:bSeat,
      bus:{}
   },
   data: function () {
      return {
         companies:[],
         selectCompany:null,
         selectUser:null,
         calendar:[],
         selectCalendar:null,
         selectSeat:null,
         whither:[],
         selectWhither:null,
         users:[],
         tableStyle:{
            "height":document.documentElement.clientHeight-282 +"px",
            "overflow-y":"auto"
         },tableStyle2:{
            "height":document.documentElement.clientHeight-245 +"px",
            "overflow-y":"auto"
         },
         bus:{},
         line:"",
         busname:"",
         childView:"",
         tStats:[] /*查票*/
      }
   },
   methods:{
       //showDatePicker: function () {
       //    var self = this;
       //    this.picker.show(function (d) {
       //        self.date = d.text;
       //    });
       //},
      btnSearch: function () {

      },
      valid: function () {

      },
      searchTicketStats: function () {
          //alert(this.selectCalendar);
          //alert(this.selectWhither);
          //alert($('#selectCalendar').val())
          this.selectCalendar=$('#selectCalendar').val();
         if(this.selectCalendar&&this.selectWhither){
            this.loading = true;
            var self = this;
            Service.getTicketStats({dest:this.selectWhither,date:this.selectCalendar}, function (rep) {
               self.loading = false;
               if(rep.Code == 0){
                  self.tStats = rep.Response;
                  self.childView = "stats";
               }
            })
         }
      },
      getCompanyUser: function () {
         this.selectUser = "";
         this.getUser();
      },
      clickUser: function (id) {
         this.selectUser = id;
      },
      onPrint: function () {
         print();
      },

      unSub: function (uid,id) {
         var r = confirm("确定退订？");
         var self = this;
         if(r){
            this.loading = true;
            Service.unTicket(uid,id, function (rep) {
               this.loading = false;
               self.getUser();
            })
         }

      },
       aa:function(){
           alert( this.selectCalendar)
           if( this.selectCalendar){
               //this.getCompanyUser();
               this.searchTicketStats();
           }
       }
   },
   watch:{
      "selectCompany": function (v) {
         if(v && this.selectCalendar){
            this.getCompanyUser();
         }
      },
      "selectCalendar": function (v) {
         if(v && this.selectCalendar){
            //this.getCompanyUser();
            this.searchTicketStats();
         }
      }
   },
   ready: function () {
      var self = this;
      Service.getCompanies(function (rep) {
         self.companies = rep.Response;
      });
      Service.getCalendara(function (rep) {
         if(rep.Code == 0){
            var target = rep.Response;
            var lst = [];
            for(var i=0;i<target.length;i++){
               lst.push({
                  value:target[i].value,
                  text:target[i].name +"-" +target[i].week + (i==10?"（今天）":"")
               })
            }
            self.calendar = lst;
         }
      });
      Service.getWhither(function (rep) {
         if(rep.Code == 0){
            var target = rep.Response;
            var lst = [];
            for(var i in target){
               for(var d in target[i].list){
                  lst.push(target[i].list[d].id);
               }
            }
            self.whither = lst;
         }
      })


           //this.picker = new mui.DtPicker({"type":"date","beginYear":2016});

   }
});


});

;/*!/components/page/seat/seat.js*/
define('components/page/seat/seat', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");
var Service = require("main/service.js");
var Check = require("main/check.js");

module.exports = Vue.extend({
   inherit:true,
   template:"<div class=\"page-seat\">\r\n    <div class=\"panel admin-panel\">\r\n        <div class=\"panel-head\">\r\n            <strong>\r\n                车位管理\r\n            </strong>\r\n\r\n        </div>\r\n        <div class=\"padding border-bottom\">\r\n            <button class=\"button win-back icon-arrow-left\" style=\"float: right\" onclick=\"javascript:window.history.go(-1)\"> 后退</button>\r\n            <input type=\"button\" class=\"button button-small bg-dot\" data-mask=\"1\" data-width=\"50%\" v-on=\"click:btnInit\"  value=\"初始化\" />\r\n            <i>{{bus.rows}} x {{bus.cols}}</i>\r\n        </div>\r\n       <div class=\"seat-container\">\r\n           <h4 class=\"bus-info\">\r\n               {{bus.name}}-{{bus.sn}}\r\n           </h4>\r\n           <table>\r\n               <tr v-repeat=\"r in bus.rows\">\r\n                   <td v-repeat=\"bus.cols\" style=\"position: relative;\">\r\n                       <a v-on=\"click:seatClick(r,$index,this)\">\r\n                           {{r}}-{{$index}}\r\n                           <div v-show=\"seat.row==r&&seat.col==$index\">\r\n                               <input type=\"text\" class=\"input\" v-model=\"seat.sn\" placeholder=\"请输入位号\">\r\n                               <div style=\"margin-top: 5px;\">\r\n                                   <input type=\"button\" style=\"padding: 2px 5px;\" class=\"button button-small bg-dot\" v-on=\"click:addSeat\" value=\"保存\">\r\n                                   <input type=\"button\" style=\"padding: 2px 5px;\" class=\"button button-small\" v-on=\"click:btnCancel\" value=\"取消\">\r\n                               </div>\r\n                           </div>\r\n                            <h3 class=\"seat-sn\" v-text=\"seatSn(r,$index).sn\" v-if=\"seat.row!=r||seat.col!=$index\">\r\n\r\n                            </h3>\r\n                       </a>\r\n                       <button style=\"position: absolute;left:100px;top:8px;\" v-if=\"(r+1)==bus.rows&&($index+1)==bus.cols\" class=\"button icon icon-minus bg-main\" v-on=\"click:minusBusRow\">删除行</button>\r\n                   </td>\r\n               </tr>\r\n           </table>\r\n           <div style=\"text-align: center\">\r\n               <button class=\"button icon icon-plus bg-main\" v-on=\"click:plusBusRow\">增加行</button>\r\n           </div>\r\n       </div>\r\n    </div>\r\n    <div class=\"dialog-mask\" style=\"display: none;\"></div>\r\n    <div id=\"init-dialog\"  class=\"dialog-win\" style=\"position: fixed; width: 50%; z-index: 11;display: none\">\r\n        <div class=\"dialog open\">\r\n            <div class=\"dialog-head\">\r\n                <span class=\"close\" v-on=\"click:btnClose\"></span>\r\n                <strong>初始化</strong>\r\n            </div>\r\n            <div class=\"dialog-body\">\r\n                <div class=\"form-x\">\r\n\r\n                    <div class=\"form-group\">\r\n                        <div class=\"alert alert-yellow\"><strong>注意：</strong>初始化会清空所有座位信息。</div>\r\n                        <div class=\"label\">\r\n                            行数\r\n                        </div>\r\n                        <div class=\"field\">\r\n                            <input type=\"number\" class=\"input\" v-model=\"rows\" placeholder=\"请填写行数\">\r\n                            <div v-show=\"!validation.rows\" class=\"input-help  check-error\"><ul><li>必填</li></ul></div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"label\">\r\n                            列数\r\n                        </div>\r\n                        <div class=\"field\">\r\n                            <input type=\"number\" class=\"input\" v-model=\"cols\" placeholder=\"请填列数\">\r\n                            <div v-show=\"!validation.cols || !validation.larger\" class=\"input-help  check-error\"><ul><li>必填，最大不超过8列</li></ul></div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"dialog-foot\">\r\n                <button class=\"button dialog-close\" v-on=\"click:btnClose\">取消</button>\r\n                <button class=\"button bg-green\" v-disabled=\"isValid\" v-on=\"click:busInit\" >确认</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n",
   data: function () {
      return {
         busid:"",
         bus:{},
         seats:[],
         cols:"",
         rows:"",
         seat:{
            _id:null,
            row:null,
            col:null,
            sn:null
         }
      }
   },
   methods:{
      seatClick: function (row,col,e) {
         var target = this.seatSn(row,col);
         this.seat.row = parseInt(row);
         this.seat.col = parseInt(col);
         this.seat.sn = target.sn;
         this.seat._id = target._id;

         var $input = $(e.$el).find(".input");
         Vue.nextTick(function () {
            $input[0].focus();
            $input[0].select();
         })
      },
      btnCancel: function (e) {
         this.seat.row = null;
         this.seat.col = null;
         this.seat.sn = null;
         this.seat._id = null;
         if(e){
            e.stopPropagation();
         }
      },
      addSeat: function (e) {
         var self = this;
         self.loading = true;
         if(this.seat.sn){
            if(this.seat._id){
               Service.updateSeat(this.busid,this.seat._id, JSON.stringify(this.seat),function (rep) {
                  self.loading = false;
                  self.btnCancel();
                  self.init();
               });

            }else{
               Service.addSeat(this.busid,JSON.stringify(this.seat), function (rep) {
                  self.loading = false;
                  if(rep.Code == 0){
                     self.seats.push(rep.Response);
                     self.btnCancel();
                  }
               })
            }
         }else if(this.seat._id){
            Service.delSeat(this.busid,this.seat._id, function (rep) {
               self.loading = false;
               self.btnCancel();
               self.init();
            });
         }else{
            self.loading = false;
            self.btnCancel(e);
         }

      },
      seatSn: function (row,col) {
         var list = this.seats;
         for(var i in list){
            if(list[i].row == row&&list[i].col == col){
               return list[i];
            }
         }
         return "";
      },
      busInit: function () {
         if(this.isValid){
            var r = confirm("初始化改删除全部座位，确定初始化？");
            if(r){
               this.delAllSeat(this.seats);
               this.bus.rows = parseInt(this.rows);
               this.bus.cols = parseInt(this.cols);
               this.busUpdate();
            }
         }
      },
      busUpdate: function () {
         var self = this;
         Service.updateBus(this.busid,JSON.stringify(this.bus), $.proxy(function (rep) {
            if(rep.Code == 0){
               this.bus = rep.Response;
               self._closeInitDialog();
               self.init();
            }
         }),this);
      },
      btnInit: function () {
         this.cols = "";
         this.rows = "";
         this._openInitDialog();
      },
      btnClose: function () {
         this._closeInitDialog();
      },
      _openInitDialog: function () {
         this.dialog.show();
         this.mask.show();
      },
      _closeInitDialog: function () {
         this.dialog.hide();
         this.mask.hide();
      },
      delAllSeat: function (list) {
            Service.delAllSeat(this.busid,function(rep){
            })
      },
      plusBusRow: function () {
         this.bus.rows +=1;
         this.busUpdate();
      },
      minusBusRow: function () {
         var valid = false;
         for(var i in this.seats){
            if(this.seats[i].row ==(this.bus.rows-1) ){
               valid = true;
            }
         }

         if(valid){
            alert("请先删除最后一列的座位！");
         }else{
            this.bus.rows -=1;
            this.busUpdate();
         }


      },
      init: function () {
         this.busid = window.location.hash.replace("#/home/bus/","");
         var self = this;
         this.loading = true;

         Service.getBus(this.busid, function (rep) {
            if(rep.Code == 0){
               self.bus = rep.Response;
               Service.getSeat(self.busid,function (rep) {
                  self.loading = false;
                  if(rep.Code == 0){
                     self.seats = rep.Response.lists;
                  }
               })
            }
         });
      }
   },
   computed:{
      validation: function () {
         return {
            rows: Check.check(this.rows,"required"),
            cols: Check.check(this.cols,"required"),
            larger:this.cols<9
         }
      },
      isValid: function () {
         var validation = this.validation;
         return Object.keys(validation).every(function (key) {
            return validation[key]
         })
      }
   },
   ready: function () {
      this.dialog = $("#init-dialog");
      var x=parseInt($(window).width()-this.dialog.outerWidth())/2;
      var y=parseInt($(window).height()-this.dialog.outerHeight())/2;
      if (y<=10){y="10"}
      this.dialog.css({"left":x,"top":y});
      this.mask = $(".dialog-mask");

   },
   compiled: function () {
      this.init();
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
var pager = require("pager/pager.js");

module.exports = Vue.extend({
   inherit:true,
   data: function () {
      return {
         traces:[],
         count:0,
         page:0,
         limit:10
      }
   },
   template:"<div class=\"page-history\">\r\n    <div class=\"panel admin-panel\">\r\n        <div class=\"panel-head\">\r\n            <strong>\r\n                登陆日志\r\n            </strong>\r\n        </div>\r\n\r\n        <table class=\"table table-hover\">\r\n            <tr><th width=\"200\">用户名</th><th width=\"*\">邮箱</th><th width=\"200\">操作</th><th width=\"200\">时间</th></tr>\r\n            <tr v-repeat=\"v in traces\">\r\n                <td>{{v.user.name}}</td>\r\n                <td>{{v.user.email}}</td>\r\n                <td>{{getAction(v.action)}}</td>\r\n                <td>{{getTime(v.created)}}</td>\r\n            </tr>\r\n        </table>\r\n\r\n        <c-pager count=\"{{@ count}}\" limit=\"{{@ limit}}\" page=\"{{@ page}}\"></c-pager>\r\n\r\n    </div>\r\n\r\n</div>",
   compiled: function () {
      this.getLog();
   },
   watch:{
      "page": function (p) {
         this.page = p;
         this.getLog();
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
      getTime: function (t) {
         var d = new Date(t);
         return d.getFullYear() + "-" +(d.getMonth()+1)+"-"+ d.getDate() +" " + d.getHours()+":"+ d.getMinutes()+":"+ d.getSeconds();
      },
      getAction: function (t) {
         switch (t){
            case 1:{
               return "后台登录"
            }break;
            case  10000:{
               return "前台登录"
            }break;
         }
      },
      getLog: function () {
         var self = this;
         self.loading = true;
         Service.getTraces({page:this.page,limit:this.limit}, function (rep) {
            self.loading = false;
            if(rep.Code == 0){
               self.traces = rep.Response.lists;
               self.count = rep.Response.count;
            }
         })
      }
   }
});

});

;/*!/components/page/system/config.js*/
define('components/page/system/config', function(require, exports, module) {

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

   template:"<div class=\"page-history\">\r\n\r\n\t<div class=\"line-big\">\r\n\t\t<div class=\"xm12\">\r\n\t\t\t<div class=\"panel\">\r\n\t\t\t\t<div class=\"panel-head\"><strong>全局配置</strong></div>\r\n\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t<form method=\"post\"  onsubmit=\"return false;\">\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<div class=\"label\">\r\n\t\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t\t\t提前订座天数</label>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"field\">\r\n\t\t\t\t\t\t\t\t<div class=\"input-group\">\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input\"   v-model=\"data.config.advance\" placeholder=\"提前订座天数\">\r\n\t\t\t\t\t\t\t\t\t<span class=\"addon\">天</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<div class=\"label\">\r\n\t\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t\t\t订座截止时间[海口→昌江]</label>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"field\">\r\n\t\t\t\t\t\t\t\t<div class=\"input-group\">\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input\"  v-model=\"data.config.end['昌江']\" placeholder=\"提前订座天数\">\r\n\t\t\t\t\t\t\t\t\t<span class=\"addon\">小时</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<div class=\"label\">\r\n\t\t\t\t\t\t\t\t<label>\r\n\t\t\t\t\t\t\t\t\t订座截止时间[昌江→海口]</label>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"field\">\r\n\t\t\t\t\t\t\t\t<div class=\"input-group\">\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input\"   v-model=\"data.config.end['海口']\" placeholder=\"提前订座天数\">\r\n\t\t\t\t\t\t\t\t\t<span class=\"addon\">小时</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</form>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<br>\r\n\t\t\t<div class=\"panel\">\r\n\t\t\t\t<div class=\"panel-head\"><strong>昌江→海口</strong></div>\r\n\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t<div class=\"table-responsive\">\r\n\t\t\t\t\t\t<table class=\"table\">\r\n\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t星期\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t最初开启车辆数量\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t开启下一辆上座率\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t最大开启车辆台数\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr v-repeat=\"v in data.quota['海口']\">\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t{{v.week}}\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input input-small\" number v-model=\"v.least\">\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input input-small\" number v-model=\"v.percentage\">\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input input-small\" number v-model=\"v.maximum\">\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t</tbody></table>\r\n\t\t\t\t\t</div>\r\n\r\n\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<br>\r\n\t\t\t<div class=\"panel\">\r\n\t\t\t\t<div class=\"panel-head\"><strong>海口→昌江</strong></div>\r\n\t\t\t\t<div class=\"panel-body\">\r\n\t\t\t\t\t<div class=\"table-responsive\">\r\n\t\t\t\t\t\t<table class=\"table\">\r\n\t\t\t\t\t\t\t<tbody><tr>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t星期\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t最初开启车辆数量\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t开启下一辆上座率\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t\t<th>\r\n\t\t\t\t\t\t\t\t\t最大开启车辆台数\r\n\t\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr v-repeat=\"v in data.quota['昌江']\">\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t{{v.week}}\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input input-small\" number v-model=\"v.least\">\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input input-small\" number v-model=\"v.percentage\">\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"input input-small\" number v-model=\"v.maximum\">\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t</tbody></table>\r\n\t\t\t\t\t</div>\r\n\r\n\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"panel-foot\" style=\"text-align: right\">\r\n\r\n\t\t\t\t\t<button class=\"button\" v-on=\"click:getContext\">取消</button>\r\n\t\t\t\t\t<button class=\"button bg-green\" v-disabled=\"isValid\" v-on=\"click:putContext\" >保存</button>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<br>\r\n\t\t</div>\r\n\r\n\r\n\t</div>\r\n\r\n\r\n\t<!--\t<div class=\"panel admin-panel\">\r\n            <div class=\"panel-head\">\r\n                <strong>\r\n                    系统配置\r\n                </strong>\r\n            </div>\r\n\r\n            <div class=\"padding border-bottom\">\r\n\r\n                <label>\r\n                    提前订座天数：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.config.advance\">\r\n                </label>\r\n\r\n                <label>\r\n                    订座截止时间[海口→昌江]（小时）：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.config.end['昌江']\">\r\n                </label>\r\n\r\n                <label>\r\n                    订座截止时间[昌江→海口]（小时）：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.config.end['海口']\">\r\n                </label>\r\n\r\n                昌江→海口<br/>\r\n                周一<br/>\r\n                <label>\r\n                    最初开启车辆数量：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][0].least\">\r\n                </label>\r\n\r\n                <label>\r\n                    开启下一辆上座率：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][0].percentage\">\r\n                </label>\r\n\r\n                <label>\r\n                    最大开启车辆台数：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][0].maximum\">\r\n                </label>\r\n\r\n                昌江→海口<br/>\r\n                周二<br/>\r\n                <label>\r\n                    最初开启车辆数量：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][1].least\">\r\n                </label>\r\n\r\n                <label>\r\n                    开启下一辆上座率：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][1].percentage\">\r\n                </label>\r\n\r\n                <label>\r\n                    最大开启车辆台数：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][1].maximum\">\r\n                </label>\r\n\r\n                昌江→海口<br/>\r\n                周三<br/>\r\n                <label>\r\n                    最初开启车辆数量：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][2].least\">\r\n                </label>\r\n\r\n                <label>\r\n                    开启下一辆上座率：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][2].percentage\">\r\n                </label>\r\n\r\n                <label>\r\n                    最大开启车辆台数：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][2].maximum\">\r\n                </label>\r\n\r\n                昌江→海口<br/>\r\n                周四<br/>\r\n                <label>\r\n                    最初开启车辆数量：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][3].least\">\r\n                </label>\r\n\r\n                <label>\r\n                    开启下一辆上座率：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][3].percentage\">\r\n                </label>\r\n\r\n                <label>\r\n                    最大开启车辆台数：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][3].maximum\">\r\n                </label>\r\n\r\n                昌江→海口<br/>\r\n                周五<br/>\r\n                <label>\r\n                    最初开启车辆数量：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][4].least\">\r\n                </label>\r\n\r\n                <label>\r\n                    开启下一辆上座率：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][4].percentage\">\r\n                </label>\r\n\r\n                <label>\r\n                    最大开启车辆台数：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][4].maximum\">\r\n                </label>\r\n\r\n                昌江→海口<br/>\r\n                周六<br/>\r\n                <label>\r\n                    最初开启车辆数量：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][5].least\">\r\n                </label>\r\n\r\n                <label>\r\n                    开启下一辆上座率：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][5].percentage\">\r\n                </label>\r\n\r\n                <label>\r\n                    最大开启车辆台数：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][5].maximum\">\r\n                </label>\r\n\r\n                昌江→海口<br/>\r\n                周日<br/>\r\n                <label>\r\n                    最初开启车辆数量：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][6].least\">\r\n                </label>\r\n\r\n                <label>\r\n                    开启下一辆上座率：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][6].percentage\">\r\n                </label>\r\n\r\n                <label>\r\n                    最大开启车辆台数：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['海口'][6].maximum\">\r\n                </label>\r\n\r\n\r\n\r\n                海口→昌江<br/>\r\n                周一<br/>\r\n                <label>\r\n                    最初开启车辆数量：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][0].least\">\r\n                </label>\r\n\r\n                <label>\r\n                    开启下一辆上座率：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][0].percentage\">\r\n                </label>\r\n\r\n                <label>\r\n                    最大开启车辆台数：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][0].maximum\">\r\n                </label>\r\n\r\n                海口→昌江<br/>\r\n                周二<br/>\r\n                <label>\r\n                    最初开启车辆数量：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][1].least\">\r\n                </label>\r\n\r\n                <label>\r\n                    开启下一辆上座率：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][1].percentage\">\r\n                </label>\r\n\r\n                <label>\r\n                    最大开启车辆台数：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][1].maximum\">\r\n                </label>\r\n\r\n                海口→昌江<br/>\r\n                周三<br/>\r\n                <label>\r\n                    最初开启车辆数量：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][2].least\">\r\n                </label>\r\n\r\n                <label>\r\n                    开启下一辆上座率：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][2].percentage\">\r\n                </label>\r\n\r\n                <label>\r\n                    最大开启车辆台数：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][2].maximum\">\r\n                </label>\r\n\r\n                海口→昌江<br/>\r\n                周四<br/>\r\n                <label>\r\n                    最初开启车辆数量：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][3].least\">\r\n                </label>\r\n\r\n                <label>\r\n                    开启下一辆上座率：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][3].percentage\">\r\n                </label>\r\n\r\n                <label>\r\n                    最大开启车辆台数：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][3].maximum\">\r\n                </label>\r\n\r\n                海口→昌江<br/>\r\n                周五<br/>\r\n                <label>\r\n                    最初开启车辆数量：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][4].least\">\r\n                </label>\r\n\r\n                <label>\r\n                    开启下一辆上座率：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][4].percentage\">\r\n                </label>\r\n\r\n                <label>\r\n                    最大开启车辆台数：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][4].maximum\">\r\n                </label>\r\n\r\n                海口→昌江<br/>\r\n                周六<br/>\r\n                <label>\r\n                    最初开启车辆数量：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][5].least\">\r\n                </label>\r\n\r\n                <label>\r\n                    开启下一辆上座率：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][5].percentage\">\r\n                </label>\r\n\r\n                <label>\r\n                    最大开启车辆台数：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][5].maximum\">\r\n                </label>\r\n\r\n                海口→昌江<br/>\r\n                周日<br/>\r\n                <label>\r\n                    最初开启车辆数量：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][6].least\">\r\n                </label>\r\n\r\n                <label>\r\n                    开启下一辆上座率：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][6].percentage\">\r\n                </label>\r\n\r\n                <label>\r\n                    最大开启车辆台数：\r\n                    <input type=\"text\" class=\"input\" number v-model=\"data.quota['昌江'][6].maximum\">\r\n                </label>\r\n\r\n\r\n\r\n\r\n            </div>\r\n\r\n        </div>-->\r\n</div>",

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

});

;/*!/components/component/main/pintuer.js*/
define('main/pintuer', function(require, exports, module) {

/**
 * Created by jack on 2015/8/26.
 */

function showdialog(e){
    e = $(e.target);
    var trigger=e.attr("data-toggle");
    var getid=e.attr("data-target");
    var data=e.attr("data-url");
    var mask=e.attr("data-mask");
    var width=e.attr("data-width");
    var detail="";
    var masklayout=$('<div class="dialog-mask"></div>');
    if(width==null){width="80%";}

    if (mask=="1"){
        $("body").append(masklayout);
    }
    detail='<div class="dialog-win" style="position:fixed;width:'+width+';z-index:11;">';
    if(getid!=null){detail=detail+$(getid).html();}
    if(data!=null){detail=detail+$.ajax({url:data,async:false}).responseText;}
    detail=detail+'</div>';

    var win=$(detail);
    win.find(".dialog").addClass("open");
    $("body").append(win);
    var x=parseInt($(window).width()-win.outerWidth())/2;
    var y=parseInt($(window).height()-win.outerHeight())/2;
    if (y<=10){y="10"}
    win.css({"left":x,"top":y});
    win.find(".dialog-close,.close").each(function(){
        $(this).click(function(){
            win.remove();
            $('.dialog-mask').remove();
        });
    });
    masklayout.click(function(){
        win.remove();
        $(this).remove();
    });
}

module.exports ={
    showdialog:showdialog
}

});

;/*!/components/page/home/home.js*/
define('components/page/home/home', function(require, exports, module) {

/**
 * Created by jack on 2015/8/19.
 */

var Vue = require("component_modules/vue.js");


module.exports = Vue.extend({
   inherit:true,
   template:"<div>123</div>"
});

});
