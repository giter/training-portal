define('main/service', function(require, exports, module) {

/**
 * Created by jack on 16/2/21.
 */

//var source = "http://xs.demo.hddznet.com:9015/";
var prefix = "";


Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};


function co(callback){
    return function (rep) {
        if(rep.Code == 0){
            callback.call(this,rep.Response);
        }else{
            alert("操作失败,请重试!");
        }
    }
}

$.del = function (url,callback) {
    return $.ajax({
        url:url,
        type:"delete",
        contentType:"application/json",
        dataType:"json",
        success:callback
    })
};

$.put = function (url,data,callback) {
    return $.ajax({
        url:url,
        type:"put",
        data:data,
        contentType:"application/json",
        dataType:"json",
        success:callback
    })
};

function getDate(p,c){
    $.get(prefix +"/data/calendar.json",p, co(c));
}

function getTables(p,c){
    $.get(prefix +"/data/tables.json",p,co(c));
}

function getDishes(c){
    $.get(prefix +"/data/dishes.json",co(c));
}

function getNotices(c){
    $.get(prefix +"/data/notices.json",co(c));
}

function getCtx(id,c){
    $.get(prefix +"/data/ctx.json?app="+id,co(c));
}

function orderTable(id,p,c){
    $.put(prefix+"/data/table/{id}.json".replace("{id}",id),p,co(c));
}
//我的订单
function getOrders(p,c){
    $.get(prefix +"/data/order/mine.json",p, co(c));
}

//点单
function putMenu(id,p,c){
    $.post(prefix+"/data/order/{id}.json".replace("{id}",id),p,co(c));
}

function getOrder(id,c){
    $.get(prefix +"/data/order/{id}.json".replace("{id}",id),co(c));
}

function delOrder(id,c){
    $.del(prefix +"/data/order/{id}.json".replace("{id}",id),co(c));
}

function dishPlus(oid,dish,c){
    $.put(prefix +"/data/order/"+oid+"/dish/"+dish+"/plus.json",{},co(c));
}

module.exports = {
    getDate:getDate,
    getTables:getTables,
    getDishes:getDishes,
    getNotices:getNotices,
    getCtx:getCtx,
    getOrders:getOrders,
    orderTable:orderTable,
    putMenu:putMenu,
    getOrder:getOrder,
    delOrder:delOrder,
    dishPlus:dishPlus
};

});
