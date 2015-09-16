define('main/service', function(require, exports, module) {

/**
 * Created by jack on 2015/8/17.
 */
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
    $.post(prefix + "/data/bus/"+bid +"/seat.json",p,c);
}

function delSeat(bid,sid,c){
    $.del(prefix + "/admin/data/bus/"+bid +"/seat/"+sid+".json",c);
}
function updateSeat(bid,sid,p,c){
    $.put(prefix + "/admin/data/bus/"+bid +"/seat/"+sid+".json",p,c);
}

function getCompanies(c){
    $.get(prefix + "/data/companies.json",c);
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
    updateSeat:updateSeat,
    getCompanies:getCompanies
};

});
