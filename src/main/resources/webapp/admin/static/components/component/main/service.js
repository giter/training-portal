define('main/service', function(require, exports, module) {

/**
 * Created by jack on 2015/8/17.
 */


function getCarList(p,c){
    $.getJSON("/admin/data/cars.json", function (rep) {
        if(rep.Code == 0){
            rep.Response.rows = rep.Response.rows.slice((p.page-1)*p.size, p.page* p.size);
        }
        return c.call(this,rep);
    });
}

function getCarSeat(id,c){
    $.getJSON("/admin/data/seats.json", c);
}

function getUsers(p,c){
    $.getJSON("/admin/data/users.json", function (rep) {
        if(rep.Code == 0){
            rep.Response.rows = rep.Response.rows.slice((p.page-1)*p.size, p.page* p.size);
        }
        return c.call(this,rep);
    });
}

module.exports = {
    getCarList:getCarList,
    getCarSeat:getCarSeat,
    getUsers:getUsers
}

});
