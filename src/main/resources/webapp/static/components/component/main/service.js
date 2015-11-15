define('main/service', function(require, exports, module) {

/**
 * Created by jack on 2015/8/17.
 */
var prefix = "";
//var prefix = "http://115.159.116.241";


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
    delRel:delRel
};

});
