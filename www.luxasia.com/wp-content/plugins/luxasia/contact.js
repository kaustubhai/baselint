$(function(){
	$(".contact-form").on("submit",function(e){
		e.preventDefault();
		var error = false;
		var elem = $(this);
		$(this).find(".error").remove();
		var tt = ["name","email","contact","message"];
		for(i = 0; i < tt.length; i++)
		{
			var vv = $("#" + tt[i]).val().trim();
			if(vv == "")
			{
				$("#" + tt[i]).after('<div class="body-s color-red text-left error">'+$("#" + tt[i]).attr("data-error")+'</div>');
				var error = true;
			}
		}
		var vv = $("#subject").val();
		console.log(vv);
		if(vv == "")
		{
			$("#subject-div").after('<div class="body-s color-red text-left error">'+$("#subject").attr("data-error")+'</div>');
			error = true;
		}
		response = grecaptcha.getResponse();
		console.log(response);
		if(response.length==0)
		{
			$("#captcha-div").after('<div class="body-s color-red text-left error">Please complete the captcha.</div>');
			error = true;
		}
		if(! error)
		{
			$(this).find(".global-loading").show();
			$.ajax({
				type : "post",
				dataType : "json",
				url : myAjax.ajaxurl,
				data : $(".contact-form").serialize(),
				success : function(response){
					$(".global-loading").hide();
					
					if(response == 1)
					{
						elem.hide();
						elem.prev().show();
					}
					else
					{
						alert("Sorry. The message cannot be sent. Please try again later");
					}
					
				}
			});
		}
	});
});
