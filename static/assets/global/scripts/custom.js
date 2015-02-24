
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
; function btn_id(data){
	return "<input type='checkbox' value='"+ data +"' />"
}

; function btn_disable(data){
	return "<input class='btn-disable' type='checkbox' value='1' " + (data?"":"checked") + " />" 
}

; function btn_recommend(data){
	return "<input class='btn-recommend' type='checkbox' value='1' " + (data?"checked":"") + " />"
}

; function btn_index(data){
	return "<input class='btn-index' type='checkbox' value='1' " + (data?"checked":"") + " />"
}

; function text_attention(data){
	return "<input type='text' class='text-attention' style='width:80px' value='" + (data?data:"") + "' />"
}

; function text_recommendation(data){
	return "<input type='text' class='text-recommendation' style='width:80px' value='" + (data?data:"") + "' />"
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
; function gridBindings(grid, options){
	
	options = $.extend({
		saveUrl : "./upsert.json",
		editUrl : "./form.html"
	}, options || {});
	
	$("#button-add").click(function(){
    	
    	$("#modal-form form").first().each(function(){
    		
    		this.reset();
    		$(this).validate().resetForm();
    	})
    });
    
    $("#button-search").click(function(){
    	
    	var title = $("#search-name").val().trim();
        grid.setAjaxParam("name", title);
        grid.getDataTable().ajax.reload();
        grid.clearAjaxParams();
    });
    
    $("#button-save").click(function(){
    	
    	if(!$("#modal-form form").valid()){
    		return;
    	}
    	
    	var obj = $("#modal-form form").serializeJSON();
    	
    	$.ajax({
    		
    		"url": options.saveUrl,
    		"method": "POST",
    		"dataType":"JSON",
    		"contentType":"application/json",
    		"data": JSON.stringify(obj)
    	}).success(function(){
    		
    		$("#modal-form").modal("hide");
    		grid.getDataTable().ajax.reload();
    		
    		Metronic.alert({
                type: 'success',
                icon: 'check',
                message: '更新成功...',
                container: grid.getTableWrapper(),
                place: 'prepend',
                closeInSeconds: 3
            });
    		
    	}).fail(function(){
    		
    		$("#modal-form").modal("hide");
    		Metronic.alert({
                type: 'danger',
                icon: 'danger',
                message: '更新失败...',
                container: grid.getTableWrapper(),
                place: 'prepend'
            });
    	})
    });
	
	grid.getTableWrapper().on('click', '.btn-disable', function(e){
    	
		var that = this;
	
    		
    	$(that).parents('tr').first().find("input[type=checkbox]").first().each(function(){
    		
    		grid.setAjaxParam("action", "disable");
            grid.setAjaxParam("id[]", $(this).val());
            grid.setAjaxParam("value", !$(that).is(":checked"))
            grid.getDataTable().ajax.reload();
            grid.clearAjaxParams();
    	})
    });
	
	grid.getTableWrapper().on('click', '.btn-index', function(e){
    	
		var that = this;
		
			
		$(that).parents('tr').first().find("input[type=checkbox]").first().each(function(){

    		grid.setAjaxParam("action", "index");
            grid.setAjaxParam("id[]", $(this).val());
            grid.setAjaxParam("value", $(that).is(":checked"))
            grid.getDataTable().ajax.reload();
            grid.clearAjaxParams();
    	})
    });
	
	grid.getTableWrapper().on('keyup', '.text-recommendation', function(e){
    	
		var that = this;
		
		var code = e.which;
		
		if(code==13){
			
			e.preventDefault();
			
			$(that).parents('tr').first().find("input[type=checkbox]").first().each(function(){

	    		grid.setAjaxParam("action", "recommendation");
	            grid.setAjaxParam("id[]", $(this).val());
	            grid.setAjaxParam("value", $(that).val())
	            grid.getDataTable().ajax.reload();
	            grid.clearAjaxParams();
	    	});
		}
    });
	
	grid.getTableWrapper().on('keyup', '.text-attention', function(e){
    	
		var that = this;
		
		var code = e.which;
		
		if(code==13){
			
			e.preventDefault();
			
			$(that).parents('tr').first().find("input[type=checkbox]").first().each(function(){

	    		grid.setAjaxParam("action", "attention");
	            grid.setAjaxParam("id[]", $(this).val());
	            grid.setAjaxParam("value", $(that).val())
	            grid.getDataTable().ajax.reload();
	            grid.clearAjaxParams();
	    	});
		}
    });
	
	grid.getTableWrapper().on('click', '.btn-recommend', function(e){
    	
		var that = this;
		
			
		$(that).parents('tr').first().find("input[type=checkbox]").first().each(function(){

    		grid.setAjaxParam("action", "recommend");
            grid.setAjaxParam("id[]", $(this).val());
            grid.setAjaxParam("value", $(that).is(":checked"))
            grid.getDataTable().ajax.reload();
            grid.clearAjaxParams();
    	})
    });
	
	grid.getTableWrapper().on('click', '.edit', function(e){
    	
    	$(this).parents("table").first().find(".selected").removeClass("selected");
    	$(this).parents("tr").first().addClass("selected");
		
    	$("#modal-form form").first().each(function(){
    		
    		this.reset();
    		$(this).validate().resetForm();
    	})
    	var row = grid.getDataTable().row(".selected").data();
    	window.location.href = options.editUrl + "?Id=" + row.Id;
    });
	
	grid.getTableWrapper().on('click', '.delete', function(e){
    	
    	var that = this;
    	
    	bootbox.confirm("是否确认删除?", function(ok) {
    		
    		if(!ok) return;
    		
        	$(that).parents('tr').first().find("input[type=checkbox]").trigger("click")
        	grid.setAjaxParam("action", "delete");
            grid.setAjaxParam("id[]", grid.getSelectedRows());
            grid.getDataTable().ajax.reload();
            grid.clearAjaxParams();
        }); 
    })
	
    grid.getTableWrapper().on('click', '.table-group-action-submit', function (e) {
    	
        e.preventDefault();
        
        var action = $(".table-group-action-input", grid.getTableWrapper());
        if (action.val() != "" && grid.getSelectedRowsCount() > 0) {
        	
        	bootbox.confirm("是否确认删除?", function(ok) {
        		
        		if(!ok) return;
        		
                grid.setAjaxParam("action", action.val());
                grid.setAjaxParam("id", grid.getSelectedRows());
                grid.getDataTable().ajax.reload();
                grid.clearAjaxParams();
        	});
        } else if (action.val() == "") {
        	
            Metronic.alert({
                type: 'warning',
                icon: 'warning',
                message: '请选择一种操作...',
                container: grid.getTableWrapper(),
                place: 'prepend'
            });
        } else if (grid.getSelectedRowsCount() === 0) {
        	
            Metronic.alert({
                type: 'warning',
                icon: 'warning',
                message:'未选中任何数据...',
                container: grid.getTableWrapper(),
                place: 'prepend'
            });
        }
    });
}

;