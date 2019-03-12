$(function(){
	// 是否同意用户协议
	$('#agreement_img').click(function(){
		var src = $(this).attr('src');
		var src2;
		if(src && src.indexOf('right') > 0){
			src2 = src.replace('right','round');
			$(this).attr('src',src2);
		}else{
			src2 = src.replace('round','right');
			$(this).attr('src',src2);
		}
	})
})
