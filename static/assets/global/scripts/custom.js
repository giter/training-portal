
; function t2d(ts) {
	
	var da = new Date(ts*1000);
	
	var y = da.getFullYear();
	var m = da.getMonth() + 1;
	var d = da.getDate();
	
	return y + "-" + (m<10?"0":"") + m + "-" + (d<10?"0":"") + d;
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