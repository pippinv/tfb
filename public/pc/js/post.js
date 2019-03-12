$(function(){
	// 上传图片前端部分
	$('#input_file').change(function(){
		// 限制图片数量
		var len = $('#add_img img').length;
		if(len >= 5){
			$('.prompt').html('最多可上传5张图片');
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
	        $img.attr('src',imgFile);	
	        $span.append($img);
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
});

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

$('.public-btn').bind('click', function () {
	var title = $('#title').val();
	var content = ue.getContent();
	var content_text = ue.getContentTxt();
    var user_id = $('#user_id').val();
    var token = $('#token').val();
	var data = {
		from_val : 2,
        title : title,
        content : content,
        content_text : content_text,
		user_id : user_id,
        token : token
	};
    $.ajax({
        dataType: 'json',
        type: "POST",
        url: "http://www.zhuazhuab.cn:8081/api/bbs/post",
        data: data,

        success: function (data) {
			if (data.status == 1) {
				window.location.href = 'http://www.zhuazhuab.cn:8081/web/forum';
			} else {
				alert(data.massage);
			}
        },
        error: function () {

        }
    });
});
