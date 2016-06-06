$(function() {
	
	$("select.select2").each(function(){
		var placeholder = $(this).attr("placeholder") || null;
		$(this).select2({
			minimumResultsForSearch: Infinity,
			placeholder: placeholder
		})
	});
	
	function placeholderSupport() {
		return 'placeholder' in document.createElement('input');
	}
	
	// 判断浏览器是否支持 placeholder
	if (!placeholderSupport()) {

		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
			}
		}).blur(
				function() {
					var input = $(this);
					if (input.val() == ''
							|| input.val() == input.attr('placeholder')) {
						input.addClass('placeholder');
						input.val(input.attr('placeholder'));
					}
				}).blur().parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
				}
			})
		});
	};

	var hover = function() {
		$(this).addClass("hover");
	};

	var hout = function() {
		$(this).removeClass("hover");
	};

	$(".hoverable").hover(hover, hout)
	$(".clickable").addClass("c-ptr").click(function() {
		$(this).find("a").first().each(function() {
			this.click();
		})
	});

	$(
			"#block-newhouse-focus, #block-newhouse-recommends, #block-newhouse-opens")
			.each(
					function() {
						var that = this;
						$(that).find(".bd ul li dl").hover(
								function() {
									$(that).find(".bd ul li dl.active").removeClass("active");
									$(this).addClass("active");
								})
					})

	$("form").first().each(function() {

		jQuery.validator.addMethod("mobile", function(value, element) {
			return /^(13|14|15|18)[0-9]{9}$/.test(value);
		}, 'Please enter a valid mobile.');

		jQuery.validator.addClassRules("mobile", {
			mobile : true
		})
	})

	$("form").submit(function() {

		if (!$(this).valid()) {
			$(".error").first().focus()
			return false
		}
	})
});
