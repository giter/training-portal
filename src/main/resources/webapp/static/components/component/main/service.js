define('main/service', function(require, exports, module) {

/**
 * Created by jack on 2015/8/17.
 */
var prefix = "";
//var prefix = "http://115.159.116.241";

$.sync = function(url, data){
    data.stamp = Math.random();
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
    p.stamp = Math.random();
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

/*第一版*/
/*function filterBus(data){
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
        /!*if(data[i]["void"] <= 0) continue;*!/

        if(i>0){

            if(line == data[i-1]["line"]){

                if(lv[line] < LEAST){

                    list.push(data[i]);
                    lv[line] = (lv[line] || 0) + 1;

                    if(data[i]["percent"] > PERCENTAGE){
                        pc[line] = (pc[line] || 0) + 1;
                    }

                }else if ((pc[line] >= LEAST && data[i-1]["percent"] > PERCENTAGE) /!*|| data[i]["order"] > 0*!/){

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
}*/

/*第二版*/
function filterBus(data){

    if(data.length == 0){
        return [];
    }

    var ctx = getContext({});
    var WEEK =  (new Date(data[0]['date'].replace(/-/g,"/"))).getDay();
    WEEK = (WEEK == 0 ? 7 : WEEK) - 1;
    var ENDS = (ctx['config'] ?  (ctx['config']['end'] || {}) : {});
    var Destination = data[0].whither;
    var QUOTA = ctx['busConfig'] || {};

    var now = Date.parse(new Date())/1000,list = [];

    var expired = [];


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


    des = {},list = [];  /*目的地*/

    for(var i in data){
        des[data[i].line] = [];
    }
    
    var isUsable  = function (d) {
        var destination = d['whither'];
        var quota = QUOTA[Destination][WEEK];
        var usable = true;
        for(var i=0;i< quota.buss.length;i++){
            if(quota.buss[i].name == d["name"]){
                usable == quota.buss[i].usable;
                d.percentage = quota.buss[i].percentage;
                d.index = quota.buss[i].index;
            }
        }
        return usable;
    }

    /*按目的地分类*/
    var nlist = [];
    for(var i in des){
        for(var d in data){
            if(data[d].line == i && isUsable(data[d])){
                des[i].push(data[d]);
            }
        }
    }

    /*排序*/
    for(var i in des){
        if(des[i].length >1){
            des[i] = des[i].sort(function (a,b) {
                return a.index - b.index;
            })
        }
    }

    var quota = QUOTA[Destination][WEEK];
    var min = quota.min,max = quota.max;
    for(var i in des){

        if(des[i].length <= min){
            list = list.concat(des[i]);
        }else{

            var temp = [];
            for(var t =0;t<min;t++){
                temp.push(des[i][t]);
            }
            
            var isValid = function (ll) {
                var v = true;
                for(var i in ll){
                    var p  = ll[i].order*1.0 /(ll[i].void + ll[i].order);
                    if(p < ll[i].percentage){
                        v = false;
                    }
                }
                return v;
            }
            
            for(var t = temp.length;t<max;t++){
                if(isValid(temp)&&t<des[i].length){
                    if(!des[i][t].expired || des[i][t] >0){
                        temp.push(des[i][t]);
                    }
                }

            }

            list = list.concat(temp);

        }

    }

    return list;
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
