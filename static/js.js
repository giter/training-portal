$(function(){
	
  var hover = function(){
    $(this).addClass("hover");
  };
  
  var hout = function(){
    $(this).removeClass("hover");
  };
  
  $(".hoverable").hover(hover,hout)
  $(".clickable").css("cursor", "pointer").click(function(){ $(this).find("a").first().each(function(){ this.click(); }) });

});
