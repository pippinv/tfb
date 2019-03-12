$(function(){
    var url ='http://'+window.location.host;
	// 页面入口
	var parm =  window.location.href;

	if(parm){
		parm = parm.substr(6);
		$("#nav_list li").eq(parm).addClass('on').siblings().removeClass('on');
		$("#index_main .container").eq(parm).css({'display':'block'}).siblings().css({'display':'none'})
	}


	// 二级导航
	$("#nav_list li").click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		var index = $(this).index()

		$("#index_main .container").eq(index).css({'display':'block'}).siblings().css({'display':'none'})
	});

	// 我的发布 我的操作  我的收藏
	$('.main-nav li').click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		// var txt = $(this).text();
		// $('#collect_location').html(txt);

		var index = $(this).index();
		var $container = $(this).parents('.container');

		$container.find(".wrapper .item").eq(index).css({'display':'block'}).siblings().css({'display':'none'})
	});

	// 我的资料
	var data_flag = true;
	var arr1 = [];
	$('#data_btn').click(function(){

		var len = $('.data-con .item1 ul li').length;
		if(data_flag){
			$(this).html('保存');
			$('.data-con .item1').css({'display':'none'})
			$('.data-con .item2').css({'display':'block'})
			data_flag = false
			
			arr1 = [];

		}else{
			var user_id = $("#name").attr('user_id');
            var username = $("#name").val();
            if(username == ''){
              alert('昵称不能为空');
              return false;
			}
            $.ajax({
                type: "post",
                url: url+"/web/edit_username",
                dataType: "json",
                data: {
                    user_id: user_id,
                    username: username
                },
                success: function(re){
                    if(re.status == 1){
                        location.reload();
                    }else {
                       alert('修改失败');
                    }
                }
            });

		}
	});

    // 充值
    $('#recharge').attr('data-flag','one');
    $('#recharge').click(function(){
        var atr = $(this).attr('data-flag');
        var val = $('.recharge-wrapper input').val();

        if(atr == 'one'){
            $('.recharge-wrapper').slideDown(200);
            $(this).html("确认");

            $(this).attr('data-flag','two');
        }else{
            if ((/(^[1-9]\d*$)/.test(val))) {
                // 正整数
                $('.recharge-wrapper').slideDown(200);
                $(this).html("确认");

                $('.bg').fadeIn(100);
                $('.pay-popup').fadeIn(300);
                $(this).attr('data-flag','two');
            }else{
                // 负数或空
                $('.recharge-wrapper').slideUp(200);
                $(this).html("充值");
                $(this).attr('data-flag','one');
            }
        }
    });

    $('.bg,#close').click(function(){
        $('.bg').fadeOut(100);
        $('.pay-popup').fadeOut(300);
    });

    $('#code_close').click(function(){
        $('#code').html('');
        $('.bg_code').fadeOut(100);
        $('.code-popup').fadeOut(300);
    });
	
	// 上传图片前端部分
	$('#input_file').change(function(){
		
		//获取文件  
		var file = $(".banner").find("input")[0].files[0]; 
		
		//创建读取文件的对象  
	    var reader = new FileReader();  
	    
	    //创建文件读取相关的变量  
	    var imgFile;
	    
	    //为文件读取成功设置事件  
	    reader.onload=function(e) {  
	        imgFile = e.target.result;  
	        console.log(imgFile)
	        $(".banner").css({'background-image':'url('+imgFile+')'});
	        //$("#imgContent").attr('src', imgFile);  
//	        var img = document.createElement('img');
//	        $img.attr('src',imgFile);			        
//	        $('#add_img').append($img);
	    };  
	    
	    //正式读取文件  
	    reader.readAsDataURL(file);
	})

    $('#wxpay').bind('click', function () {
        $.ajax({
            type: "post",
            url: 'http://www.zhuazhuab.cn:8081/api/payorder',
            dataType: "json",
            data: {
                user_id:$("#name").attr('user_id'),
                money:$('#point').val()/10,
                pay_type:'pcWeixin'
            },
            success: function(re){
                if(re.status == 1){

                    $("#code").qrcode({
                        render: "canvas", //table或canvas
                        width: 200, //宽度
                        height:200, //高度
                        text: re.data.code_url //内容
                    });

                    $('.bg').fadeOut(100);
                    $('.pay-popup').fadeOut(300);
                    $('#pay_msg').html('请使用微信扫码完成付款');

                    $('.bg_code').fadeIn(100);
                    $('.code-popup').fadeIn(300);
                    code_pay_check(re.data.order_sn);

                }
            }
        });
    });

    $('#alipay').bind('click', function () {
        $.ajax({
            type: "post",
            url: 'http://www.zhuazhuab.cn:8081/api/payorder',
            dataType: "json",
            data: {
                user_id:$("#name").attr('user_id'),
                money:$('#point').val()/10,
                pay_type:'pcAlipay'
            },
            success: function(re){
                if(re.status == 1){

                    $("#code").qrcode({
                        render: "canvas", //table或canvas
                        width: 200, //宽度
                        height:200, //高度
                        text: re.data.qr_code //内容
                    });

                    $('.bg').fadeOut(100);
                    $('.pay-popup').fadeOut(300);
                    $('#pay_msg').html('请使用支付宝扫码完成付款');

                    $('.bg_code').fadeIn(100);
                    $('.code-popup').fadeIn(300);
                    code_pay_check(re.data.order_sn);

                }
            }
        });
    });






    function code_pay_check (order_sn)
    {
        $.ajax({
            type: "post",
            url: 'http://www.zhuazhuab.cn:8081/api/code_pay_status',
            dataType: "json",
            data: {
                user_id:$("#name").attr('user_id'),
                order_sn:order_sn
            },
            success: function(re){
                if(re.status == 1){
                    if (re.data.status == 2) {
                        $('.bg_code').fadeOut(100);
                        $('.code-popup').fadeOut(300);
                        alert('充值成功');
                        location.reload();
                    } else {
                        setTimeout(function () {
                            code_pay_check(order_sn)
                        }, 2000);
                    }
                } else {
                    alert('系统错误 请稍后再试');
                }
            }
        });
    }

});











