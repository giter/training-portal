
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

;var FlashDetect=new function(){var self=this;self.installed=false;self.raw="";self.major=-1;self.minor=-1;self.revision=-1;self.revisionStr="";var activeXDetectRules=[{"name":"ShockwaveFlash.ShockwaveFlash.7","version":function(obj){return getActiveXVersion(obj);}},{"name":"ShockwaveFlash.ShockwaveFlash.6","version":function(obj){var version="6,0,21";try{obj.AllowScriptAccess="always";version=getActiveXVersion(obj);}catch(err){}
return version;}},{"name":"ShockwaveFlash.ShockwaveFlash","version":function(obj){return getActiveXVersion(obj);}}];var getActiveXVersion=function(activeXObj){var version=-1;try{version=activeXObj.GetVariable("$version");}catch(err){}
return version;};var getActiveXObject=function(name){var obj=-1;try{obj=new ActiveXObject(name);}catch(err){obj={activeXError:true};}
return obj;};var parseActiveXVersion=function(str){var versionArray=str.split(",");return{"raw":str,"major":parseInt(versionArray[0].split(" ")[1],10),"minor":parseInt(versionArray[1],10),"revision":parseInt(versionArray[2],10),"revisionStr":versionArray[2]};};var parseStandardVersion=function(str){var descParts=str.split(/ +/);var majorMinor=descParts[2].split(/\./);var revisionStr=descParts[3];return{"raw":str,"major":parseInt(majorMinor[0],10),"minor":parseInt(majorMinor[1],10),"revisionStr":revisionStr,"revision":parseRevisionStrToInt(revisionStr)};};var parseRevisionStrToInt=function(str){return parseInt(str.replace(/[a-zA-Z]/g,""),10)||self.revision;};self.majorAtLeast=function(version){return self.major>=version;};self.minorAtLeast=function(version){return self.minor>=version;};self.revisionAtLeast=function(version){return self.revision>=version;};self.versionAtLeast=function(major){var properties=[self.major,self.minor,self.revision];var len=Math.min(properties.length,arguments.length);for(i=0;i<len;i++){if(properties[i]>=arguments[i]){if(i+1<len&&properties[i]==arguments[i]){continue;}else{return true;}}else{return false;}}};self.FlashDetect=function(){if(navigator.plugins&&navigator.plugins.length>0){var type='application/x-shockwave-flash';var mimeTypes=navigator.mimeTypes;if(mimeTypes&&mimeTypes[type]&&mimeTypes[type].enabledPlugin&&mimeTypes[type].enabledPlugin.description){var version=mimeTypes[type].enabledPlugin.description;var versionObj=parseStandardVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revisionStr=versionObj.revisionStr;self.revision=versionObj.revision;self.installed=true;}}else if(navigator.appVersion.indexOf("Mac")==-1&&window.execScript){var version=-1;for(var i=0;i<activeXDetectRules.length&&version==-1;i++){var obj=getActiveXObject(activeXDetectRules[i].name);if(!obj.activeXError){self.installed=true;version=activeXDetectRules[i].version(obj);if(version!=-1){var versionObj=parseActiveXVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revision=versionObj.revision;self.revisionStr=versionObj.revisionStr;}}}}}();};FlashDetect.JS_RELEASE="1.0.4";

; $.fn.extend({
	
	upload: function (options) {
		
		var succ = options.success
		delete options.success
		
		if(FlashDetect.installed){
			
			options = $.extend(
				options,
				{'swf': '/assets/global/plugins/uploadify/uploadify.swf'}
			)
			
			if(succ){
				options['onUploadSuccess'] = succ
			}
			
			return $(this).uploadify(options);
		}
		
		if(succ){
			options['onUploadComplete'] = succ
		}
		
		return $(this).uploadifive(options);
	}
});