define('main/service', function(require, exports, module) {

/**
 * Created by jack on 2015/8/17.
 */
var prefix = "http://182.254.244.191";
//var prefix = "";

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


function getUsers(p,c){
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
    $.get(prefix + "/admin/data/bus/"+bid +"/seats.json",c);
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

function getWhither(c){
    $.get(prefix + "/data/whither.json",c);
}

function getSysInfo(c){
    $.get(prefix + "/data/system.json",c);
}

function getTicketStats(p,c){
    $.get(prefix+"/data/tickets/stats.json",p, c);
}

function getBusTickets(p,c){
    $.get(prefix +"/data/tickets.json",p,c);
}

function userLogin(p,c){
    $.post(prefix + "/admin/user/login.json",p,c);
}

function getCompanyTicket(p,c){
    $.get(prefix +"/admin/data/tickets.json",p,c);
}

function orderTicket(uid,id,c){
    $.put(prefix +"/admin/data/ticket/"+uid+"/"+id+".json",{},c);
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
    orderTicket:orderTicket
};

});
