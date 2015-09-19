define('main/service', function(require, exports, module) {

/**
 * Created by jack on 2015/8/17.
 */
var perfix = "";
//var perfix = "http://182.254.244.191";


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
            error:error,
            dataType:"json",
            url:arguments[0]
        })
    }

};

function userBind(p,c){
    $.post(perfix+"/data/user/bind.json",p,c);
}

function getBusSeat(p,c){
    $.get(perfix+"/data/tickets.json",p,c);
}

function getWhither(c){
    $.get(perfix+"/data/whither.json", c);
}

function getCalendar(c){
    $.get(perfix+"/data/calendar.json", c);
}

function getResult(p,c){
    $.get(perfix+"/data/tickets/stats.json",p, c);
}

function getOrder(c){
    $.get(perfix+"/data/order.json", c);
}

function getUsers(c){
    $.get(perfix+"/data/users.json", c);
}

function getMyTicket(c){
    $.get(perfix + "/data/ticket/mine.json",c)
}

function orderSeat(id,c){
    $.put(perfix +"/data/ticket/"+id+".json",c);
}

function getMine(c){
    $.get(perfix+"/data/user/mine.json", c);
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
    getMyTicket:getMyTicket,
    getMine:getMine
};

});
