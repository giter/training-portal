define('main/service', function(require, exports, module) {

/**
 * Created by jack on 2015/8/17.
 */
//var prefix = "";
var prefix = "http://115.159.116.241";

$.sync = function(url, data){
	
	var ret = null;

	$.ajax({
        contentType:"application/json",
        dataType:"json",
        url:url, 
		async: false
    }).success(function(data){
		
		ret = data;
	});

	return ret;
}


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

function getCalendar(p, c){
    $.get(prefix+"/data/calendar.json", p, c);
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

var CTX = null;

function getContext(p){

    p.stamp = Math.random();
    return CTX || (CTX = $.sync(prefix +"/data/ctx.json",p).Response);
}

function filterBus(data){

	 var ctx = getContext({}); 

	 var ENDS = (ctx['config'] ?  (ctx['config']['end'] || 0) : 0) * 3600;
	 var QUOTA = ctx['quota'] || {};

	 var now = Date.parse(new Date())/1000,list = [];

	 for(var i=0;i<data.length;i++){

		var END = ENDS[data[i]['whither']] || 1;

		var time = Date.parse(new 
		Date(data[i].date.replace(/-/g,"/")))/1000; var diff = time - now;

		if(diff >= END){ list.push(data[i]); } 
	}

	 data = list; list = [];

	 lv = {}
	 pc = {}

	 for(var i=0;i<data.length;i++){

		var week = (new Date(data[i]['date'])).getDay();
		week = (week == 0 ? 7 : week) - 1;

		var destination = data[i]['whither'];
		var quota = QUOTA[destination][week];
		var line = data[i]["line"];

		var LEAST = quota['least'] || 3;
		var MAXIMUM = quota['maximum'] || 11;
		var PERCENTAGE = quota['percentage'] || 0.9;
		
		data[i]["percent"] = data[i]["order"] * 1.0 / data[i]["void"]; 
		if(data[i]["order"] >= data[i]["void"]) continue;

		if(i>0){

			if(line == data[i-1]["line"]){

				if(lv[line] < LEAST){

					list.push(data[i]); 
					lv[line] = (lv[line] || 0) + 1;

					if(data[i]["percent"] > PERCENTAGE){
						pc[line] = (pc[line] || 0) + 1;
					}

				}else if (pc[line] >= LEAST && data[i-1]["line"]["percent"] > PERCENTAGE){

					list.push(data[i]); 
					lv[line] = (lv[line] || 0) + 1;
				}

			}else{

				list.push(data[i]); 
				lv[line] = (lv[line] || 0) + 1;
				
				if(data[i]["percent"] > PERCENTAGE){
					pc[line] = (pc[line] || 0) + 1;
				}
			} 
		}else{
			list.push(data[i]); 
			lv[line] = (lv[line] || 0) + 1;
			
			if(data[i]["percent"] > PERCENTAGE){
				pc[line] = (pc[line] || 0) + 1;
			}
		}
	 }

	 return list;
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
    delRel:delRel,
	getContext:getContext,
	filterBus: filterBus
};

});
