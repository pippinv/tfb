$(function(){

	/* 分页样式 */
    /*var page_length = $($('.page-nav').find('li')).length;

    $($('.page-nav').find('li')[page_length-1]).css('font-size', '14px');
    $($('.page-nav').find('li')[page_length-1]).text('下一页');

    $($('.page-nav').find('li')[0]).css('font-size', '14px');
    $($('.page-nav').find('li')[0]).text('上一页');*/
	/* 分页样式 */

	// 头部图标hover
	$('#header_icons li').hover(function(e){
		e.preventDefault();
		var Img = $(this).find('.img1');
		var src = Img.attr('src');
		if(src && src.indexOf('gray') > 0){
			var src2 = src.replace('gray','light');
			Img.attr('src',src2);
		}
		
		var index = $(this).index();
		if(index == 0){ // hover 搜索
			$('.search-wrapper').stop().slideDown(200);
		}else if(index == 1){ // hover上传
			$('.upload-wrapper').stop().slideDown(200);
		}
		
	},function(){
		var Img = $(this).find('.img1');
		var src = Img.attr('src');
		if(src && src.indexOf('light') > 0){
			var src2 = src.replace('light','gray');
			Img.attr('src',src2);
		}
		
		var index = $(this).index();
		if(index == 0){ // hover 搜索
			$('.search-wrapper').stop().slideUp(100);
		}else if(index == 1){ // hover上传
			$('.upload-wrapper').stop().slideUp(100);
		}
	})	
	
	// 头像hover
	$('#header_avatar').hover(function(){
		$('.my-nav-wrapper').stop().slideDown(200);
	},function(){
		$('.my-nav-wrapper').stop().slideUp(200);
	})
	
	//返回顶部
	var w_h = $(window).height();
	$(window).scroll(function () {
		var scrollTop = $(window).scrollTop();
		var dist = $('body').height() - scrollTop - w_h;
    	if(scrollTop > w_h*1.5){
    		$('.backTop').fadeIn();
    	}else{
    		$('.backTop').fadeOut()
    	}
    });
    $('.backTop').click(function(){
		var scrollTop = $(window).scrollTop();
		$("html,body").animate({ scrollTop: 0 }, 400);
	})
    
    // 登录 与 退出登录
    $('.login-out').click(function(){
    	$('.avatar').hide();
    	$('.login').show();
    	$('.my-nav-wrapper').hide();
    })
    
    
})









