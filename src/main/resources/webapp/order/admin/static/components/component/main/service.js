define('main/service', function(require, exports, module) {

/**
 * Created by jack on 16/2/21.
 */

//var source = "http://xs.demo.hddznet.com:9015/";
//var prefix = "http://localhost:8002";
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
            window.location.href="login.html";
        }
    }
}

$.del = function (url,callback) {
    return $.ajax({
        url:url,
        type:"delete",
        contentType:"application/json",
        dataType:"json",
        success:callback,
        error:callback
    })
};

$.put = function (url,p,callback) {
    return $.ajax({
        url:url,
        type:"put",
        data:p,
        contentType:"application/json",
        dataType:"json",
        success:callback,
        error:callback
    });
};

$.get_s = function (url,p,callback) {
    return $.ajax({
        url:url,
        type:"get",
        data:p,
        contentType:"application/json",
        dataType:"json",
        success:callback,
        error:callback
    });
};


function getDate(c){
    $.get_s(prefix +"/api/date.json",{}, co(c));
}

function getTable(c){
    $.get_s(prefix +"/admin/data/table/items.json",{},co(c));
}

function addTable(p,c){
    $.post(prefix +"/admin/data/table/insert.json",p,co(c));
}

function delTable(id,c){
    $.del(prefix +"/admin/data/table/{id}.json".replace("{id}",id),co(c));
}

function updateTable(id,p,c){
    $.put(prefix +"/admin/data/table/{id}.json".replace("{id}",id), p,co(c));
}

//菜品管理
function getMenus(p,c){
    $.get_s(prefix +"/admin/data/dish/items.json",p,co(c));
}

function updateMenu(id,p,c){
    $.put(prefix +"/admin/data/dish/{id}.json".replace("{id}",id),p,co(c));
}

//上传照片
function upPicture(p,c){
    $.post(prefix +"/admin/data/image.json",p,co(c));
}

//添加菜品
function addMenu(p,c){
    $.post(prefix +"/admin/data/dish/insert.json",p,co(c));
}

function delMenu(id,c){
    $.del(prefix +"/admin/data/dish/{id}.json".replace("{id}",id),co(c));
}

function getNotices(c){
    $.get_s(prefix +"/admin/data/notice/items.json",{},co(c));
}

function putCtx(id,p,c){
    $.put(prefix +"/admin/data/ctx.json?app="+id,p,co(c));
}

function getCtx(id,c){
    $.get_s(prefix +"/data/ctx.json?app="+id,{},co(c));
}

function getOrders(p,c){
    $.get_s(prefix +"/admin/data/order/items.json",p,co(c));
}
function getOrder(id,c){
    $.get_s(prefix +"/admin/data/order/{id}.json".replace("{id}",id),{},co(c));
}

function delOrder(id,c){
    $.del(prefix +"/admin/data/order/{id}.json".replace("{id}",id),co(c));
}

function delNotice(id,c){
    $.del(prefix +"/admin/data/notice/{id}.json".replace("{id}",id),co(c));
}

function getGoods(p,c){
    $.get_s(prefix +"/admin/data/goods/items.json",p,co(c));
}

function insertGoods(p,c){
    $.post(prefix +"/admin/data/goods/insert.json",p,co(c));
}

function updateGoods(id,p,c){
    $.put(prefix +"/admin/data/goods/{id}.json".replace("{id}",id),p,co(c));
}

function delGoods(id,c){
    $.del(prefix +"/admin/data/goods/{id}.json".replace("{id}",id),co(c));
}

function getGoodsOrder(p,c){
    $.get_s(prefix +"/admin/data/basket/items.json",p,co(c));
}

function delGoodsOrder(id,c){
    $.del(prefix +"/admin/data/basket/{id}.json".replace("{id}",id),co(c));
}

function getGoodsOrderById(id,c){
    $.get_s(prefix +"/admin/data/basket/{id}.json".replace("{id}",id),{},co(c));
}

module.exports = {
    getDate:getDate,
    getTable:getTable,
    delTable:delTable,
    updateTable:updateTable,
    getMenus:getMenus,
    delMenu:delMenu,
    updateMenu:updateMenu,
    upPicture:upPicture,
    addMenu:addMenu,
    addTable:addTable,
    getNotices:getNotices,
    putCtx:putCtx,
    getCtx:getCtx,
    getOrders:getOrders,
    getOrder:getOrder,
    delOrder:delOrder,
    delNotice:delNotice,
    getGoods:getGoods,
    insertGoods:insertGoods,
    updateGoods:updateGoods,
    delGoods:delGoods,
    getGoodsOrder:getGoodsOrder,
    delGoodsOrder:delGoodsOrder,
    getGoodsOrderById:getGoodsOrderById
};

});
