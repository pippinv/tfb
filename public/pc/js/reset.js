$(function(){
    var url ='http://'+window.location.host;
    
	//点击获取短信验证码
	var totalTime = 60;
	var flag_time = true;
	$('.get-code-btn').click(function(){
		var reg1 = /^1\d{10}$/;
		var phone = $("#check_phone_input").val().trim();
		
		if(phone == ''){
			$(".prompt").html("请输入手机号");
			$('.prompt').show();
			flag4 = false;
		}else if(reg1.test(phone) == false){
			$(".prompt").html("手机号格式错误");
			$('.prompt').show();
			flag4 = false;
		}else{
			if(flag_time){
                $.ajax({
                    type: "post",
                    url: url+"/api/captcha",
                    dataType: "json",
                    data: {
                        phone: phone,
                        type: 2,
                    },
                    success: function(re){
                        if(re.status == 1){
                        	alert(re.status);
                            $(".prompt").html("验证码发送成功");
                            $('.prompt').show();
                            timer = setInterval(function(){
                                totalTime--;
                                if(totalTime >= 0){
                                    var second = totalTime % 60;
                                    if(second < 10){
                                        second = "0" + second;
                                    }

                                    if(totalTime > 0){
                                        $(".get-code-btn").html("").append('<div style="color: #808080;background:#ddd;">重发('+'<b>'+second+'</b>'+'&nbsp;s)</div>');
                                    }else if(totalTime == 0){
                                        $(".get-code-btn").html("").append('获取验证码');
                                    }
                                    flag5 = false;
                                }else{
                                    totalTime = 60;
                                    flag_time = true;
                                    clearInterval(timer);
                                }
                            },1000);

                            setTimeout(function(){
                                $('.prompt').hide();
                            },1500);
                        }else {
                            $(".prompt").html(re.message);
                            $('.prompt').show();
                            setTimeout(function(){
                                $('.prompt').hide();
                            },2000);
                        }
                    }
                });
				
			}
		}	
		setTimeout(function(){
			$('.prompt').hide();
		},1500);
	})
	
	//点击下一步
	$('.next-btn').click(function(){



		var reg1 = /^1\d{10}$/;
		var phone = $("#check_phone_input").val().trim();
		var code = $(".get-code-input").val().trim();
		
		if(phone == ''){
			$(".prompt").html("请输入手机号");
			$('.prompt').show();
		}else if(reg1.test(phone) == false){
			$(".prompt").html("手机号格式错误");
			$('.prompt').show();
		}else if(code == ''){
			$(".prompt").html("请输入验证码");
			$('.prompt').show();
		}else{

            $.ajax({
                type: "post",
                url: url+"/api/retrieve_pwd",
                dataType: "json",
                data: {
                    phone: phone,
                    code: code,
                },
                success: function(re){
                    if(re.status == 1){
                        $('.item1').hide();
                        $('.item2').show();
                        //重置密码
                        new_key(phone);
					}else {
                        $(".prompt").html(re.message);
                        $('.prompt').show();
					}
                }
            });

		}
		setTimeout(function(){
			$('.prompt').hide();
		},1500);
	})
	
})

function new_key(phone){

	//点击完成
	$('.complete-btn').click(function(){
		var name = $('#new_key_input').val().trim();
		var sure_name = $('#sure_key_input').val().trim();
		var reg = /^[\w]{6,12}$/;
		
		if(name == ''){
			$('.prompt').html('请输入密码');
		}else if(reg.test(name) == false){
			$('.prompt').html('密码格式错误');
		}else if(name !== sure_name){
			$('.prompt').html('两次密码不一致');
		}else{

            var url ='http://'+window.location.host;

            $.ajax({
                type: "post",
                url: url+"/api/edit_password",
                dataType: "json",
                data: {
                    user_phone: phone,
                    pwd: name,
                },
                success: function(re){
                    if(re.status == 1){
                        $(".prompt").html(re.message);
                        $('.prompt').show();
                        setTimeout(function(){
                            location.href=url+'/web/login';
                        },1000);
                    }else {
                        $(".prompt").html(re.message);
                    }
                }
            });

		};
		
		$('.prompt').show();
		setTimeout(function(){
			$('.prompt').hide();
		},1500);
		
	});

    $('#reset_back').click(function(){
        $('.item1').show();
        $('.item2').hide();
    });
}

