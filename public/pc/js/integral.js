$(function(){
	var tixian_flag = true;
	$('#tixian_btn').click(function(){
		if(tixian_flag){
			$('#tixian_input').css({'width':'214px','border-width':'1px','margin-right':'15px'});
			$("#tip").show()
			tixian_flag = false;
		}else{
			$('#tixian_input').css({'width':'0','border-width':'0','margin-right':'0'});
			$("#tip").hide()
			tixian_flag = true;
		}
	})
	
})












