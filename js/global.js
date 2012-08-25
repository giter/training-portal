(function($){$(function(){
	if($(".wmd-panel").size() > 0){
		$(".wmd-preview-toggle").click(function(){
			$(".wmd-preview").fadeToggle('slow');	
			return false;
		});
		var converter = Markdown.getSanitizingConverter();
		var editor = new Markdown.Editor(converter);
		editor.run();
	}
	
	var sel = "#main .content pre,#main .content code";
	if($(sel).size() > 0){
		$(sel).addClass("prettyprint");
		prettyPrint();
	}
});})(jQuery);
