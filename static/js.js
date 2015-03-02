$(function(){


  var hover = function(){
    $(this).addClass("hover");
  };
  
  var hout = function(){
    $(this).removeClass("hover");
  };
  
  $(".hoverable").hover(hover,hout)
  $(".clickable").addClass("c-ptr").click(function(){ $(this).find("a").first().each(function(){ this.click(); }) });
  
  $("#block-newhouse-focus, #block-newhouse-recommends, #block-newhouse-opens").each(function(){
	  var that = this;
	  $(that).find(".bd ul li dl").hover(function(){
		  $(that).find(".bd ul li.pic img").attr("src", $(this).attr("data-cover"))
	  })
  })
  
  $("form").first().each(function(){
	  
	  jQuery.validator.addMethod("mobile", function(value, element) {
		  return /^(13|14|15|18)[0-9]{9}$/.test( value );
	  }, 'Please enter a valid mobile.');

	  jQuery.validator.addClassRules("mobile", { mobile: true})
  })
  
  $("form").submit(function(){
	  
	if(!$(this).valid()){
		$(".error").first().focus()
		return false
	}
  })
});

