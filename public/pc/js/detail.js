$(function(){
	
	//  收藏
	// var collect_flag = true;
	// $('#collect_btn').click(function(){
	// 	var Img = $(this).find('img');
	// 	var src = Img.attr('src');
	// 	if(collect_flag){
	// 		$(this).addClass('on');
	// 		var src2 = src.replace('gray','light');
	// 		Img.attr('src',src2);
	// 		$('.prompt').html('收藏成功');
	// 		$('.prompt').fadeIn(200);
	// 		collect_flag = false;
	// 	}else{
	// 		$(this).removeClass('on');
	// 		var src3 = src.replace('light','gray');
	// 		Img.attr('src',src3);
	// 		$('.prompt').html('取消收藏成功');
	// 		$('.prompt').fadeIn(200);
	// 		collect_flag = true;
	// 	}
	// 	setTimeout(function(){
	// 		$('.prompt').fadeOut(200);
	// 	},2000)
	// })
		
	// 切换导航
	$('#read_list li').click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		
		var index = $(this).index()
		
		 $("#wrapper .item").eq(index).css({'display':'block'}).siblings().css({'display':'none'})
	})
	
	// 上传图片前端部分
	$('#input_file').change(function(){
		// 限制图片数量
		var len = $('#add_img img').length;
		if(len >= 10){
			$('.prompt').html('最多可上传10张图片');
			$('.prompt').show();
			setTimeout(function(){
				$('.prompt').hide();
			},2000);
			return
		}		
		
		//获取文件  
		var file = $("#img_wrapper").find("input")[0].files[0]; 
		
		//创建读取文件的对象  
	    var reader = new FileReader();  
	    
	    //创建文件读取相关的变量  
	    var imgFile;
	    
	    //为文件读取成功设置事件  
	    reader.onload=function(e) {  
	        imgFile = e.target.result;   
	        //$("#imgContent").attr('src', imgFile);  
	        var span = document.createElement('span');
	        var img = document.createElement('img');
	        var i = document.createElement('i');
	        var $img = $(img), // DOM对象转成jQuery对象
		        $span = $(span),
		        $I = $(i);
		    var img = "<img class='imgs' src='"+imgFile+"'>" +
                "<input type='hidden' name='img[]' value='"+imgFile+"'>";
	        //$img.attr('src',imgFile);	
	        $span.append(img);
	        $span.append($I);
	        $('#add_img').append($span);
	        $('#add_img i').html('X');
	        $('#add_img i').attr('title','删除');
	    };  
	    
	    //正式读取文件  
	    reader.readAsDataURL(file);
	    
	    // 删除图片
	    setTimeout(function(){
	    	delete_img();
	    },1000)
	})
	
	// 提交评论
	// $('#submit_btn').click(function(){
	// 	var index = $('#write_list li.on').index();
	// 	var val = $(this).prev().val();
	// 	var $ul = $('#wrapper .item').eq(index).find('ul');
	// 	if(val == ''){
	// 		$('.prompt').html('内容不能为空哟~');
	// 		$('.prompt').fadeIn(200);
			
	// 	}else{
	// 		$('.prompt').html('发表成功');
	// 		$('.prompt').fadeIn(200);
	// 		$(this).prev().val('');
			
	// 		// 模拟发表成功
	// 		var li_html = '<li>'
	// 						+'<img src="../img/avatar3.jpg" alt="" class="img1"/>'
	// 						+'<div class="li-con">'
	// 							+'<div class="top">'
	// 								+'<div class="name">a风一样的女纸</div>'
	// 								+'<div class="date">11／23   12:50</div>'
	// 							+'</div>'
	// 							+'<p class="txt">'+val+'</p>'
	// 						+'</div>'
	// 					+'</li>';	
	// 		$ul.prepend(li_html);
			
	// 		// 两个导航位置相应对应
	// 		$('#read_list li').eq(index).click();
	// 	}
	// 	setTimeout(function(){
	// 		$('.prompt').fadeOut(200);
	// 	},2000)
	// })

	$("#submit_btn").click(function(){
		$("#frms").submit();
		setTimeout(function(){
			$('.prompt').hide();
		},1500);
	})
	
})
function delete_img(){
	$('#add_img span i').click(function(){
		$(this).parent().remove();
		$('.prompt').html('删除成功');
		$('.prompt').show();
		
		setTimeout(function(){
	    	$('.prompt').hide();
	    },1500)
	})
}