
; function t2d(ts) {
	
	var da = new Date(ts*1000);
	
	var y = da.getFullYear();
	var m = da.getMonth() + 1;
	var d = da.getDate();
	
	return y + "-" + (m<10?"0":"") + m + "-" + d;
}