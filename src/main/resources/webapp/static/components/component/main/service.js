define('main/service', function(require, exports, module) {

/**
 * Created by jack on 2015/8/17.
 */
var perfix = "";


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

function userBind(p,c){
    $.post(perfix+"/data/user/bind.json",p,c);
}

function getBusSeat(p,c){
    $.getJSON(perfix+"/data/tickets.json",p,c);
}

function getWhither(c){
    $.getJSON(perfix+"/data/whither.json", c);
}

function getCalendar(c){
    $.getJSON(perfix+"/data/calendar.json", c);
}

function getResult(p,c){
    $.getJSON(perfix+"/data/tickets/stats.json",p, c);
}

function getOrder(c){
    $.getJSON(perfix+"/data/order.json", c);
}

function getUsers(c){
    $.getJSON(perfix+"/data/users.json", c);
}

function orderSeat(id,p,c){
    $.put(perfix +"/data/ticket/"+id+".json",p,c);
}

function getHashString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.hash.split("?")[1].match(reg);
    if (r != null) return r[2]; return null;
}

module.exports = {
    getHashString:getHashString,
    userBind:userBind,
    getBusSeat:getBusSeat,
    getWhither:getWhither,
    getCalendar:getCalendar,
    getResult:getResult,
    getOrder:getOrder,
    getUsers:getUsers,
    orderSeat:orderSeat
};

});
