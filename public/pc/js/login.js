$(function(){
	banner();

	$("#login_btn").click(function(){
		var phone = $("#phone").val().trim();
		var reg = /^1\d{10}$/;
		var password_ = $("#password").val().trim();
		var $phone_tip = $("#phone").parent().find('.tip');
		var $password_tip = $("#password").parent().find('.tip');
		
		if(phone == ''){
			$phone_tip.html("请输入手机号");
			$phone_tip.show();
		}else if(reg.test(phone) == false){
			$phone_tip.html("手机号格式错误");
			$phone_tip.show();
		}else if(password_ == ''){
			$password_tip.html("请输入密码");
			$password_tip.show();
		}else{
			$("#frm").submit();
		}
		
//		setTimeout(function(){
//			$phone_tip.hide();
//			$password_tip.hide();
//		},2000);
	})


	
})

function banner(){
	var b_len = $(".banner-list li").length;
	var b = 0;
	var timer,timeout;
	
	timeout = function(){
		b++;
		if(b>=b_len){
			b = 0;
		}
		$(".banner-list li").eq(b).fadeIn(800).siblings().fadeOut(600);
	}
	timer = setInterval(timeout,60000);
}

















