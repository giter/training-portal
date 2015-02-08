
; function t2d(ts) {
	
	var da = new Date(ts*1000);
	
	var y = da.getFullYear();
	var m = da.getMonth() + 1;
	var d = da.getDate();
	
	return y + "-" + (m<10?"0":"") + m + "-" + (d<10?"0":"") + d;
}

; function t2dt(ts) {
	
	var da = new Date(ts*1000);
	
	var y = da.getFullYear();
	var m = da.getMonth() + 1;
	var d = da.getDate();
	
	var h  = da.getHours()
	var mi = da.getMinutes()
	
	return y 
	+ "-" + (m<10?"0":"") + m 
	+ "-" + (d<10?"0":"") + d
	+ " " + (h<10?"0":"") + h
	+ ":" + (mi<10?"0":"") + mi
	;
	
}

; function JWS(url, data, options) {
	
	var defs = {
			
		url : url,
		method : "POST",
		contentType : "application/json",
		dataType : "json",
		data : JSON.stringify(data),
		error : function(e){ /*console.log(e);*/ }
	}
	
	options = $.extend(defs, options)
	
	return $.ajax(options);
}