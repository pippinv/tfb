$(function(){

	// 点赞 点击事件

	var $parm = $('.zan');
	zanYesNo($parm);
	
	// 不点赞 点击事件

	var $parm = $('.nozan');
	zanYesNo($parm);
	
	// 评论
	$('.pinglun').attr('data-flag','true');
	pinglun();
	
	// 回复 
	sure_btn();
	
	//  收藏
	var collect_flag = true;
	$('#collect_btn').click(function(){



		var _this = $(this);
        var Img = $(this).find('img');
        var src = Img.attr('src');
		var good_type = Img.attr('good_type'); //1点赞帖子 2点赞评论
        var can = Img.attr('can'); //1可以操作 0不能操作


		var user_id = $('#user_id').val();
		var token = $('#token').val();
		var bbs_id = $('#bbs_id').val();


		$.ajax({
			type: "post",
			url: 'http://www.zhuazhuab.cn:8081/api/bbs/focus',
			dataType: "json",
			data: {
				user_id:user_id,
				token:token,
				type:1,
				bbs_id:bbs_id
			},
			success: function(re){
				if(re.status == 1){
					if(collect_flag){
						$(_this).addClass('on');
						var src2 = src.replace('gray','light');
						Img.attr('src',src2);
						$('.prompt').html('收藏成功');
						$('.prompt').fadeIn(200);
						collect_flag = false;
					}else{
						$(_this).removeClass('on');
						var src3 = src.replace('light','gray');
						Img.attr('src',src3);
						$('.prompt').html('取消收藏成功');
						$('.prompt').fadeIn(200);
						collect_flag = true;
					}
					setTimeout(function(){
						$('.prompt').fadeOut(200);
					},2000);
				}
			}
		});









	});
	
	// 提交评论
	var $list = $('#list');
	$('#submit_btn').click(function(){
		var val = $(this).prev().val();
		if(val == ''){
			$('.prompt').html('内容不能为空哟~');
			$('.prompt').fadeIn(200);
			
		}else{
            var user_id = $('#user_id').val();
            var token = $('#token').val();
            var bbs_id = $('#bbs_id').val();

			var content = val;
			var relation_id = bbs_id;

			var type = 1;
			var back_user_name = '';
			var headimg = $('#headimg').val();
			var username = $('#username').val();
			var _this = $(this);
            $.ajax({
                type: "post",
                url: 'http://www.zhuazhuab.cn:8081/api/bbs/comment',
                dataType: "json",
                data: {
                    user_id:user_id,
                    token:token,
                    type:type,
                    back_user_name:back_user_name,
					bbs_id:bbs_id,
                    content:content,
                    relation_id:relation_id
                },
                success: function(re){
                    if(re.status == 1){
                        $('.prompt').html('发表成功');
                        $('.prompt').fadeIn(200);
                        _this.prev().val('');

                        // 模拟发表成功
                        var li_html ='<li>'
                            +'<img src="'+headimg+'" alt="" class="img1"/>'
                            +'<div class="li-con">'
                            +'<div class="top">'
                            +'<div class="name">'+username+'</div>'
                            +'<div class="date">刚刚</div>'
                            +'</div>'
                            +'<p class="txt">'+val+'</p>'
                            +'<div class="evaluate-con">'
                            +'</div>'
                            +'<div class="clearfix">'
                            +'<div class="desc fl-rt">'
                            +'<div class="pinglun"><img src="http://www.zhuazhuab.cn:8081/pc/img/icon1_gray.png" alt="" /><span>0</span></div>'
                            +'<div class="zan"><img com_id="'+re.data+'" c_type="1" good_type="2" src="http://www.zhuazhuab.cn:8081/pc/img/icon3_gray.png" alt="" /><span>0</span></div>'
                            +'<div class="nozan"><img com_id="'+re.data+'" c_type="2" good_type="2" src="http://www.zhuazhuab.cn:8081/pc/img/icon5_gray.png" alt="" /><span>0</span></div>'
                            +'</div>'
                            +'</div>'
                            +'<div class="evaluate clearfix">'
                            +'<input type="text" />'
                            +'<div class="sure-btn fl-rt small-btn">回复</div>'
                            +'</div>'
                            +'</div>'
                            +'</li>';
                        $list.prepend(li_html);

                        // 重发触发点击事件
                        hover_icon();

                        $('.zan img').attr('data-flag','true');
                        var $parm = $('.zan');
                        zanYesNo($parm);

                        $('.nozan img').attr('data-flag','true');
                        var $parm = $('.nozan');
                        zanYesNo($parm);

                        $('.pinglun').attr('data-flag','true');
                        pinglun();

                        sure_btn();
                    }
                }
            });
		}
		setTimeout(function(){
			$('.prompt').fadeOut(200);
		},2000)
	})

});

function sure_btn(){



    $('.sure-btn').click(function(){
		var val = $(this).prev().val();
		var $li = $(this).parents('li');
		var $evaluate = $li.find('.evaluate');
		var $evaluateBtn = $li.find('.pinglun');
		var $evaluateCon = $li.find('.evaluate-con');
		var $span = $li.find('.pinglun span');
		var num = parseInt($span.html());
		if(val == ''){
			$('.prompt').html('内容不能为空哟~');
			$('.prompt').fadeIn(200);
			
		}else{

            var user_id = $('#user_id').val();
            var token = $('#token').val();
            var bbs_id = $('#bbs_id').val();

            var content = val;


            var type = 2;
            var back_user_name = '';
            var headimg = $('#headimg').val();
            var username = $('#username').val();
            var _this = $(this);

            var reply_name = $('#reply_name').val();
            var reply_id = $('#reply_id').val();

            var relation_id = '';

            if (reply_name && reply_id) {

                relation_id = reply_id;   //回复评论的评论  @someone
                back_user_name = reply_name;

            } else {

                relation_id = $(this).attr('com_id');   //回复主评论
            }

            $.ajax({
                type: "post",
                url: 'http://www.zhuazhuab.cn:8081/api/bbs/comment',
                dataType: "json",
                data: {
                    user_id:user_id,
                    token:token,
                    type:type,
                    back_user_name:back_user_name,
                    bbs_id:bbs_id,
                    content:content,
                    relation_id:relation_id
                },
                success: function(re){
                    if(re.status == 1) {
						$('.prompt').html('发表成功');
                        $('.prompt').fadeIn(200);
                        $evaluate.hide();
                        $evaluateBtn.attr('data-flag', 'true');
                        $(_this).prev().val('');

                        var p = '<p><span>'+username+'</span>' + val + '</p>';
                        if (reply_name && reply_id) {
                             p = '<p><span>'+username+'</span>' + '回复' + '<span>' + back_user_name + '</span>' + val + '</p>';
                        }

                        $evaluateCon.append(p);
                        num = Number(num) + 1;
                        $span.html(num);
                    }
                }
            });






		}
		setTimeout(function(){
			$('.prompt').fadeOut(200);
		},2000)
	})
}

function pinglun(){
	$('.pinglun').click(function(){

        $('#reply_name').val('');
        $('#reply_id').val('');
		var $evaluate = $(this).parents('li').find('.evaluate');
		if($(this).attr('data-flag') == 'true'){
            var reply_name = $('#reply_name').val();
			$evaluate.slideDown(200);
			$(this).attr('data-flag','false');
		}else{
			$evaluate.slideUp(200);
			$(this).attr('data-flag','true');
		}

	})
}

function hover_icon(){
	$('.content .desc div').hover(function(){
		var Img = $(this).find('img');
		var src = Img.attr('src');
		var src2 = src.replace('gray','light')
		Img.attr('src',src2)
	},function(){
		var Img = $(this).find('img');
		if(Img.attr('data-flag') !== 'false'){
			var src = Img.attr('src');
			var src2 = src.replace('light','gray')
			Img.attr('src',src2)
		}
	})
}

function zanYesNo($parm){
	$parm.unbind('click').click(function(){
		var Img = $(this).find('img');
		var src = Img.attr('src');
		var $span = $(this).find('span');
		var num = parseInt($span.html());

		var good_type = Img.attr('good_type'); //1点赞帖子 2点赞评论
        var can = Img.attr('can'); //1可以操作 0不能操作


            var user_id = $('#user_id').val();
            var token = $('#token').val();
            var bbs_id = $('#bbs_id').val();

            if (good_type == 1) {
                $.ajax({
                    type: "post",
                    url: 'http://www.zhuazhuab.cn:8081/api/bbs/focus',
                    dataType: "json",
                    data: {
                        user_id:user_id,
                        token:token,
                        type:2,
                        bbs_id:bbs_id
                    },
                    success: function(re){
                        if(re.status == 1){

                            if(Img.attr('data-flag') == 'true'){
                                var src2 = src.replace('gray','light');
                                Img.attr('src',src2);
                                num = Number(num) + 1;
                                $span.html(num);
                                Img.attr('data-flag','false')
                            }else{
                                var src3 = src.replace('light','gray');
                                Img.attr('src',src3);
                                num = Number(num) - 1;
                                $span.html(num);
                                Img.attr('data-flag','true')
                            }
                        }
                    }
                });
            }

        if (good_type == 2) {
            var c_type = Img.attr('c_type');	//1赞2踩
            var com_id = Img.attr('com_id');	//1赞2踩
            $.ajax({
                type: "post",
                url: 'http://www.zhuazhuab.cn:8081/api/bbs/com_focus',
                dataType: "json",
                data: {
                    type:c_type,		//1赞2踩
                    token:token,
                    user_id:user_id,
					com_id:com_id
                },
                success: function(re){
                    if(re.status == 1){

                        if(Img.attr('data-flag') == 'true'){
                            var src2 = src.replace('gray','light');
                            Img.attr('src',src2);
                            num = Number(num) + 1;
                            $span.html(num);
                            Img.attr('data-flag','false')
                        }else{
                            var src3 = src.replace('light','gray');
                            Img.attr('src',src3);
                            num = Number(num) - 1;
                            $span.html(num);
                            Img.attr('data-flag','true')
                        }
                    }
                }
            });
        }




    })
}


$('.comment_son').bind('click', function () {
    $(this).parent().next().find('img')[0].click();

    var reply_name = $(this).find('span')[0].innerHTML;

    $('#reply_name').val(reply_name);

    $('#reply_id').val($(this).attr('com_id'));

    var placeholder_val = '@'+ reply_name;

    $($(this).parent().next().next().find('input')[0]).val();
    $($(this).parent().next().next().find('input')[0]).attr('placeholder', placeholder_val);

});







