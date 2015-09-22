define('main/service', function(require, exports, module) {

/**
 * Created by jack on 2015/8/17.
 */
//var prefix = "";
var prefix = "http://182.254.244.191";


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
            error:error,
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

function userBind(p,c){
    $.post(prefix+"/data/user/bind.json",p,c);
}

function getBusSeat(p,c){
    $.get(prefix+"/data/tickets.json",p,c);
}

function getWhither(c){
    $.get(prefix+"/data/whither.json", c);
}

function getCalendar(c){
    $.get(prefix+"/data/calendar.json", c);
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

function getMyTicket(c){
    $.get(prefix + "/data/ticket/mine.json",c)
}

function orderSeat(id,c){
    $.put(prefix +"/data/ticket/"+id+".json",c);
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

function delDelegation(id,c){
    $.del(prefix + "/data/user/delegation/"+id+".json",c);
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


module.exports = {
    getHashString:getHashString,
    getQueryString:getQueryString,
    userBind:userBind,
    getBusSeat:getBusSeat,
    getWhither:getWhither,
    getCalendar:getCalendar,
    getResult:getResult,
    getOrder:getOrder,
    getUsers:getUsers,
    orderSeat:orderSeat,
    unSubTicket:unSubTicket,
    getMyTicket:getMyTicket,
    getMine:getMine,
    getDelegation:getDelegation,
    addDelegation:addDelegation,
    delDelegation:delDelegation
};

});
