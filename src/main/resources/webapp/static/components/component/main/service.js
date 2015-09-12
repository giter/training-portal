define('main/service', function(require, exports, module) {

/**
 * Created by jack on 2015/8/17.
 */


function getCarList(c){
    $.getJSON("/data/cars.json", c);
}

function getCarSeat(id,c){
    $.getJSON("/data/seats.json", c);
}

function getWhither(c){
    $.getJSON("/data/whither.json", c);
}

function getCalendar(c){
    $.getJSON("/data/calendar.json", c);
}

function getResult(c){
    $.getJSON("/data/result.json", c);
}

function getOrder(c){
    $.getJSON("/data/order.json", c);
}

function getUsers(c){
    $.getJSON("/data/users.json", c);
}



module.exports = {
    getCarList:getCarList,
    getCarSeat:getCarSeat,
    getWhither:getWhither,
    getCalendar:getCalendar,
    getResult:getResult,
    getOrder:getOrder,
    getUsers:getUsers
}

});
