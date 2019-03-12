$(function(){

	//选择警种
	$("#select_jtype").click(function(){
		$(".bg").css({"z-index": "113","opacity":"1"});
		$(".popup").css({
			"transform": "scale(1) translate3d(0,-50%,0)",
			"-webkit-transform": "scale(1) translate3d(0,-50%,0)",
			"-moz-transform": "scale(1) translate3d(0,-50%,0)",
			"-ms-transform": "scale(1) translate3d(0,-50%,0)",
			"z-index":"115","opacity":"1"
		});
	})
	$(".bg").click(function(){
		$(".bg").css({"z-index": "-1","opacity":"0"});
		$(".popup").css({
			"transform": "scale(0.5) translate3d(0,-50%,0)",
			"-webkit-transform": "scale(0.5) translate3d(0,-50%,0)",
			"-moz-transform": "scale(0.5) translate3d(0,-50%,0)",
			"-ms-transform": "scale(0.5) translate3d(0,-50%,0)",
			"z-index":"-1","opacity":"0"
		});
	})


	//案例类型
	$.ajax({
		type: "post",
		url: common_url+"get_police_type",
		dataType: "json",
		data: {},
		success: function(re){
			if(re.status == 1){
				//console.log(JSON.stringify(re.data));
				var li = '';
				for(var i=0;i<re.data.length;i++){
					var j = i+1;
					li += '<li class="'+re.data[i].id+'"><label class="fl-lt" for="radio'+j+'">'+re.data[i].name+'</label><input type="radio" name="t_radio" class="fl-rt" id="radio'+j+'"></li>'
				}
				$("#type_list").append(li);
				
				//填入案件类型
				$("#type_list li").click(function(){
					var type = $(this).find("label").html();
					var id = $(this).attr('class');
					$('#type_show').val(type);
					$('#type_id').val(id);
				})
				
			}
		}
	})

})
