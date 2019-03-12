$(function(){
	//同意用户协议前的小图标
	$(".agreements").click(function(){
		var imgObj = $(this).find("img");
		if(imgObj.attr('src') == '../img/right.png'){
			imgObj.attr('src','../img/round.png');
		}else{
			imgObj.attr('src','../img/right.png');
		}
	})		
	
	//点击获取短信验证码
	var totalTime = 60;
	var flag5 = true;
	var flag4 = false;
	$('.get-code-btn').click(function(){
		var reg1 = /^1\d{10}$/;
		var phone = $("#register_telephone").val().trim();
		
		if(phone == ''){
			$(".prompt").html("<span>请输入手机号</span>");
			$('.prompt').css({'opacity':'1','z-index':'113'});
			flag4 = false;
		}else if(reg1.test(phone) == false){
			$(".prompt").html("<span>手机号格式错误</span>");
			$('.prompt').css({'opacity':'1','z-index':'113'});
			flag4 = false;
		}else{
			flag4 = true;
			
			$.ajax({
				type: "post",
				url: "http://www.zhuazhuab.cn:8081/api/captcha",
				dataType: "json",
				data: {
					phone: phone,
					type: 1,
				},
				success: function(re){
					if(re.status == 1){
						$(".prompt").html("<span>验证码发送成功</span>");
						$('.prompt').css({'opacity':'1','z-index':'113'});
						if(flag4&&flag5){
							timer = setInterval(function(){
								totalTime--;
								if(totalTime >= 0){
									var second = totalTime % 60;
									if(second < 10){
										second = "0" + second;
									}
				
									if(totalTime > 0){
										$(".get-code-btn").html("").append('<div style="color: #808080;">重发('+'<u>'+second+'</u>'+'&nbsp;s)</div>');						
									}else if(totalTime == 0){
										$(".get-code-btn").html("").append('获取验证码');
									}
									flag5 = false;
								}else{
									totalTime = 60;
									flag5 = true;
									clearInterval(timer);
								}
							},1000)
						}
												
					}
					if(re.status == 0){
                        $(".prompt").html("<span>re.message</span>");
                        $('.prompt').css({'opacity':'1','z-index':'113'});
                    }
                    if(re.status == 2){
                        $(".prompt").html("<span>re.message</span>");
                        $('.prompt').css({'opacity':'1','z-index':'113'});
                    }


					if(re.status == 3){
						$(".prompt").html("<span>re.message</span>");
						$('.prompt').css({'opacity':'1','z-index':'113'});
					}
				}
			})
		}
		setTimeout(function(){
			$('.prompt').css({'opacity':'0','z-index':'-1'});
		},1500);
	})
	
	//点击注册
	$("#register_btn").click(function(){
		var phone = $("#register_telephone").val().trim();
		var reg1 = /^1\d{10}$/;
		var nickname = $("#nickname").val().trim();
		var password_ = $("#password").val().trim();
		var sure_password = $("#sure_password").val().trim();
		var r_phone = $("#r_phone").val().trim();
		var code = $(".code-input").val().trim();
		var area_ = $("#input-address1").val().trim();
		var fenju = $("#fenju").val().trim();
		var j_type = $('#type_show').val().trim();		
		var reg2 = /^[A-Za-z0-9]{6,12}$/;
        var img_id =  $("#img_id").val();

        var img_len = $("#img_length").text();

		if(phone == ""){
			$(".prompt").html("<span>请输入手机号</span>");
			$('.prompt').css({'opacity':'1','z-index':'113'});
		}else if(reg1.test(phone) == false){
			$(".prompt").html("<span>手机号格式错误</span>");
			$('.prompt').css({'opacity':'1','z-index':'113'});
		}else if(nickname == ""){
			$(".prompt").html("<span>请输入您的昵称</span>");
			$('.prompt').css({'opacity':'1','z-index':'113'});
		}else if(password_ == ""){
			$(".prompt").html("<span>请输入密码</span>");
			$('.prompt').css({'opacity':'1','z-index':'113'});
		}else if(reg2.test(password_) == false){
			$(".prompt").html("<span>密码格式错误</span>");
			$('.prompt').css({'opacity':'1','z-index':'113'});
		}else if(sure_password == ""){
			$(".prompt").html("<span>请确认密码</span>");
			$('.prompt').css({'opacity':'1','z-index':'113'});
		}else if(reg2.test(sure_password) == false){
			$(".prompt").html("<span>两次密码不一致</span>");
			$('.prompt').css({'opacity':'1','z-index':'113'});
		}else if(code == ""){
			$(".prompt").html("<span>请输入验证码</span>");
			$('.prompt').css({'opacity':'1','z-index':'113'});
		}else if(area_ == ""){
			$(".prompt").html("<span>请选择所属城市</span>");
			$('.prompt').css({'opacity':'1','z-index':'113'});
		}else if(fenju == ""){
			$(".prompt").html("<span>请输入具体单位</span>");
			$('.prompt').css({'opacity':'1','z-index':'113'});
		}else if(j_type == ""){
			$(".prompt").html("<span>请选择警种</span>");
			$('.prompt').css({'opacity':'1','z-index':'113'});
		}else if($("#agree_img").attr("src") !== "../img/right.png"){
			$(".prompt").html("<span>同意用户协议后可注册</span>");
			$('.prompt').css({'opacity':'1','z-index':'113'});
		}
		else if(r_phone !== '' && reg1.test(r_phone) == false){
				$(".prompt").html("<span>推荐人手机号格式错误</span>");
				$('.prompt').css({'opacity':'1','z-index':'113'});			
		}
		else if(img_len != 2){
			$(".prompt").html("<span>请上传两张图片</span>");
			$('.prompt').css({'opacity':'1','z-index':'113'});
		}
		else{
			//if(flag4){	
				//var r_code = $("#r_code").val().trim();//推荐码
				if(r_phone == ''){
					r_phone = 0;
				}
				var arr = area_.split(' '),
					province = arr[0],
					city = arr[1],
					area = arr[2];
				var police_type_id = $('#type_id').val();

				//alert(code+' .... '+1+' '+phone+' '+password_+' '+nickname+' '+province+' '+city+' '+area+' '+fenju+' '+police_type_id+' ,'+r_phone+', '+img_id);

				$.ajax({
					type: "post",
					url: "http://www.zhuazhuab.cn:8081/api/reg",
					dataType: "json",
					data: {						
						code: code,
						type: 1,//民警
						phone: phone,
						password: password_,
						username: nickname,
						province: province,
						city: city,
						area: area,
						station: fenju,
						police_type_id: police_type_id,
						parent_phone: r_phone,
						//parent_code: r_code,
						img: img_id
					},
					success: function(re){
						//alert(JSON.stringify(re));
						if(re.status == 1){
							var message = '系统正在审核您的资料，请稍后....!';
                            window.location.href="http://www.zhuazhuab.cn:8081/down";
						}else {
                            var message = re.message;
						}
						
						$(".prompt").html('<span>'+message+'</span>');
						$('.prompt').css({'opacity':'1','z-index':'113'});
						
						setTimeout(function(){
							$('.prompt').css({'opacity':'0','z-index':'-1'});
						},3000);
					},
					error: function(re){
						//alert(JSON.stringify('error'+re));
					}
				})
			//}
		}
		
		setTimeout(function(){
			$('.prompt').css({'opacity':'0','z-index':'-1'});
		},1500);
	})
	
	
})
