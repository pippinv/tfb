$(function(){
	
	//wow.js,实现滚动加载css3动画
	if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
		new WOW().init();
	};
	// wow滚动动画
	$(".wrapper li").addClass("slideInUp animated");
	
	banner();
	
	// 导航
	$("#nav_list li").click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		var index = $(this).index()
		
		$("#wrapper .item").eq(index).css({'display':'block'}).siblings().css({'display':'none'});
		
		//wow.js,实现滚动加载css3动画
		if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
			new WOW().init();
		};
		// wow滚动动画
		$(".wrapper li").addClass("slideInUp animated");
	})
	
})

function banner(){
	var b_len = $(".banner-list li").length;
	
	//part1中的banner图切换效果
	var b = 0;
	var timer,timeout;
	$(".arrow-left").click(function(){
		clearInterval(timer);
		b--;
		if(b == '-1'){
			b = b_len - 1
		}
		$(".banner-list li").eq(b).fadeIn(800).siblings().fadeOut(600);
	})
	$(".arrow-right").click(function(){
		clearInterval(timer);
		b++;
		if(b >=  b_len){
			b = 0
		}
		
		$(".banner-list li").eq(b).fadeIn(800).siblings().fadeOut(600);
	})
	
	timeout = function(){
		b++;
		if(b>=b_len){
			b = 0;
		}
		$(".banner-list li").eq(b).fadeIn(800).siblings().fadeOut(600);
		$(".banner-btn-list li").eq(b).addClass('light').siblings().removeClass('light');
	}
	//放下面
	timer = setInterval(timeout,3000);
}




















