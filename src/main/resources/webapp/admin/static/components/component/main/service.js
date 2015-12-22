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

function getWhither(c){
    $.get(prefix + "/data/whither.json",c);
}

function getSysInfo(c){
    $.get(prefix + "/data/system.json",c);
}

function getTicketStats(p,c){
    p.stamp = Math.random();
    $.get(prefix+"/data/tickets/stats.json",p, c);
}

function getBusTickets(p,c){
    p.stamp = Math.random();
    $.get(prefix +"/data/tickets.json",p,c);
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
    getUsersa:getUsersa
};

});
