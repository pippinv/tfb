$(function(){
    // 导航
	$(function(){
		$('.nav-list li').click(function(){
            $(this).addClass('on').siblings().removeClass('on');
			var index = $(this).index();
            switch ($(this).html())
            {
                case '系统消息':
                    $('#msg_type_now').val(1);
                    break;
                case '案件消息':
                    $('#msg_type_now').val(2);
                    break;
                case '论坛消息':
                    $('#msg_type_now').val(3);
                    break;

            }
		    $("#news_wrapper .item").eq(index).css({'display':'block'}).siblings().css({'display':'none'})
		})
	});
	

	$('.evaluate-btn').attr('data-flag','true');

    Isread();
    renderXt(1);
    renderAj(1);
    renderLt(1);
});


function evaluate_btn(el){
    var flag = $(el).attr('data-flag');
    if(flag === 'true'){
        $(el).parent().find('.evaluate').slideDown();
        $(el).attr('data-flag','false')
    }else{
        $(el).parent().find('.evaluate').slideUp();
        $(el).attr('data-flag','true')
    }
}

$('#prev_page').bind('click', function () {
    var msg_type_now = $('#msg_type_now').val();
    switch (msg_type_now)
    {
        case '1':     //系统消息
            var length = $('#xt_index').find('li').length;
            var page_now = parseInt(length/10)+1;
            renderXt(2, page_now+1);
            break;

        case '2':     //案件消息
            var length = $('#aj_index').find('li').length;
            var page_now = parseInt(length/10)+1;
            renderAj(2, page_now+1);
            break;

        case '3':     //论坛消息
            var length = $('#lt_index').find('li').length;
            var page_now = parseInt(length/10)+1;
            renderLt(2, page_now+1);
            break;
    }
});



function evaluate_ok(el, msg_type) {      //1案件消息 2论坛消息
    // 点击确认
    var user_id = $('#user_id').val();
    var token = $('#token').val();
    var case_id = $(el).attr('case_id');
    var val = $(el).prev().val();
    var username = $('#username').val();
    var headimg = $('#headimg').val();
    var content = '';

    var evaluate = $(el).parents('li').find('.evaluate');
    var evaluateBtn = $(el).parents('li').find('.evaluate-btn');
    var ul = $(el).parents('ul');
    if(val == ''){
        alert('内容不能为空哟~');
        $('.prompt').fadeIn(200);
    }else{
        if (msg_type == 1) {
            content = $(el).prev().val();
            $.ajax({					            //提交案件评论
                type: "post",
                url: 'http://www.zhuazhuab.cn:8081/api/add_comment',
                dataType: "json",
                data: {
                    user_id:user_id,
                    token:token,
                    content:content,
                    case_id:case_id
                },
                success: function(re){
                    if(re.status == 1){
                        alert('发表成功');
                        $('.prompt').fadeIn(200);
                        evaluate.hide();
                        evaluateBtn.attr('data-flag','true');

                        var li_html = $(el).parents('li').html();
                        ul.prepend('<li>'+li_html+'</li>');
                        ul.find('li:first-child .name').html(username);
                        ul.find('li:first-child .txt').html(val);
                        ul.find('li:first-child .date').html('刚刚');
                        ul.find('img').attr('src', 'http://www.zhuazhuab.cn:8081/'+headimg);
                        evaluate_btn();

                        setTimeout(function(){
                            $('.prompt').fadeOut(200);
                        },2000)
                    }
                }
            });
        } else if (msg_type == 2) {
            content = $(el).prev().val();
            var bbs_id = $(el).attr('bbs_id');
           
            $.ajax({					            //提交案件评论
                type: "post",
                url: 'http://www.zhuazhuab.cn:8081/api/bbs/comment',
                dataType: "json",
                data: {
                    user_id:user_id,
                    token:token,
                    type:1,
                    relation_id:bbs_id,
                    content:content,
                    bbs_id:bbs_id
                },
                success: function(re){
                    if(re.status == 1){
                        alert('发表成功');
                        $('.prompt').fadeIn(200);
                        evaluate.hide();
                        evaluateBtn.attr('data-flag','true');

                        var li_html = $(el).parents('li').html();
                        ul.prepend('<li>'+li_html+'</li>');
                        ul.find('li:first-child .name').html(username);
                        ul.find('li:first-child .txt').html(val);
                        ul.find('li:first-child .date').html('刚刚');
                        ul.find('img').attr('src', 'http://www.zhuazhuab.cn:8081/'+headimg);
                        evaluate_btn();

                        setTimeout(function(){
                            $('.prompt').fadeOut(200);
                        },2000)
                    }
                }
            });
        }
    }
}



function formatDate(now) {
	now = new Date(now*1000);
    var year=now.getFullYear();
	var month=now.getMonth()+1;
    var date=now.getDate();
    var hour=now.getHours();
    var minute=now.getMinutes();
    return year+"年"+month+"月"+date+"日"+'　'+hour+":"+minute;
}


function openDetail(ele) {



    var $mask = $(ele).parents('li').find('.mask');
    var flag = $(ele).attr('flag');
    if(flag == 'true'){
    	var ms_id = $(ele).next().val();
		var msg_type_now = $('#msg_type_now').val();
        var user_id = $('#user_id').val();
        var token = $('#token').val();


        if (msg_type_now == 1 || msg_type_now == 2) {
            $.ajax({					//  系统/论坛 消息已读
                type: "post",
                url: 'http://www.zhuazhuab.cn:8081/api/xt_read',
                dataType: "json",
                data: {
                    user_id:user_id,
                    token:token,
                    ms_id:ms_id,
                    type:msg_type_now
                },
                success: function(re){
                    if(re.status == 1){
                        $(ele).prev().removeClass('two-ellipsis');
                        $mask.removeClass('on');
                        $mask.html('已读');
                        $(ele).attr('flag','false');
                    }
                    $('#xt_index').find('div').each(function () {
                        var has_new = 0;
                        if($(this).hasClass('on')) {
                            has_new = 1;
                        }
                        if (has_new == 0) {     //没有新消息了
                            $('.nav-list li:first-child').removeClass('active');
                        }
                    })

                }
            });
		}
	}else{
        $(ele).prev().addClass('two-ellipsis');
        $(ele).attr('flag','true');
    }

    var on_len = $('.mask.on').length;
    if(on_len == 0){
        $('.nav-list li:first-child').removeClass('active');
    }


}

function renderXt (msg_type, page) {		//渲染系统消息        type 1 初始渲染  type 2 添加更多
	var user_id = $('#user_id').val();
    var token = $('#token').val();
    if (!page) {
        page = 1;
    }

    $.ajax({
        type: "post",
        url: 'http://www.zhuazhuab.cn:8081/api/xt_index',
        dataType: "json",
        data: {
            user_id:user_id,
            token:token,
            page:page
        },
        success: function(re){
            if(re.status == 1){
                var el = '';
                $(re.data.data).each(function () {
                    el += '<li><img src="http://www.zhuazhuab.cn:8081/pc/img/logo.jpg" alt="" class="img1"/>';
                    el += '<div class="li-con"><div class="name-box"><div class="name">'+this.title+'</div>';
                    el += '<div class="date">'+formatDate(this.time)+'</div>';
                    if (!this.status) {
                        el += '<div class="mask on">未读</div></div>';
                    } else {
                        el += '<div class="mask">已读</div></div>';
                    }
                    el += '<p class="p1 two-ellipsis">'+this.content+'</p> <div class="open" flag="true" onclick="openDetail(this)">【展开】</div><input type="hidden" name="ms_id" value="'+this.ms_id+'"></div></li>';
                });
                if (msg_type == 1) {
                    $('#xt_index').html(el);
                } else if (msg_type == 2) {
                    if (el.length) {
                        $("#xt_index").append(el);
                    } else {
                        alert('已经到底啦');
                    }
                }
            }
        }
    });
}

function renderAj (msg_type, page) {		//渲染案件消息
    var user_id = $('#user_id').val();
    var token = $('#token').val();
    if (!page) {
        page = 1;
    }


    $.ajax({
        type: "post",
        url: 'http://www.zhuazhuab.cn:8081/api/message',
        dataType: "json",
        data: {
            user_id:user_id,
            token:token,
            page:page
        },
        success: function(re){
            if(re.status == 1){
                var el = '';
                $(re.data.data).each(function () {
                    el += '<li><img src="http://www.zhuazhuab.cn:8081/'+this.headimg+'" alt="" class="img1"/>';
                    el += '<div class="li-con"><div class="name-box"><div class="name">'+this.username+'</div>';
                    el += '<div class="date">'+formatDate(this.add_time)+'</div>';
                    el += '<p class="txt">'+this.content+'</p><div class="evaluate clearfix"><input type="text" /><div case_id="'+this.case_id+'" class="sure-btn fl-rt small-btn" onclick="evaluate_ok(this, 1)">确认</div></div>';
                    el += '<a class="li-desc" href="http://www.zhuazhuab.cn:8081/web/index/detail/'+this.case_id+'">';
                    el += '<div class="title">'+this.case_name+'</div>';
                    el += '<p class="two-ellipsis">'+this.discribe+'</p></div></a></div></div><div class="evaluate-btn small-btn" data-flag="true" onclick="evaluate_btn(this)">评论</div></li>';
                });
                if (msg_type == 1) {
                    $('#aj_index').html(el);
                } else if (msg_type == 2) {
                    $("#aj_index").append(el);
                }
            }
        }
    });
}

function renderLt (msg_type, page) {		//渲染论坛消息
    var user_id = $('#user_id').val();
    var token = $('#token').val();
    if (!page) {
        page = 1;
    }

    $.ajax({
        type: "post",
        url: 'http://www.zhuazhuab.cn:8081/api/my_bbs_msg',
        dataType: "json",
        data: {
            user_id:user_id,
            token:token,
            page:page
        },
        success: function(re){
            if(re.status == 1){
                console.log(re.data.data);
                var el = '';
                $(re.data.data).each(function () {
                    el += '<li><img src="http://www.zhuazhuab.cn:8081/'+this.headimg+'" alt="" class="img1"/>';
                    el += '<div class="li-con"><div class="name-box"><div class="name">'+this.username+'</div>';
                    el += '<div class="date">'+formatDate(this.created)+'</div></div>';
                    el += '<p class="txt">'+this.content+'</p><div class="evaluate clearfix"><input type="text" /><div bbs_id="'+this.bbs_id+'" class="sure-btn fl-rt small-btn" onclick="evaluate_ok(this, 2)">确认</div></div>';
                    el += '<a class="li-desc" href="http://www.zhuazhuab.cn:8081/web/forum/detail?bbs_id='+this.bbs_id+'">';
                    el += '<div class="li-desc-con"><div class="title">'+this.title+'</div>';
                    el += '<p class="two-ellipsis">'+this.content_text+'</p>';
                    el += '</div></a></div><div class="evaluate-btn small-btn" data-flag="true" onclick="evaluate_btn(this)">回复</div></li>';
                });
                if (msg_type == 1) {
                    $('#lt_index').html(el);
                } else if (msg_type == 2) {

                    $("#lt_index").append(el);
                }
            }
        }
    });
}

function Isread () {			    				// 判断是否有未读消息
    var system_msg = $('#system_msg').val();
    var case_msg = $('#case_msg').val();
    var bbs_msg = $('#bbs_msg').val();

    if(system_msg > 0){
        $('.nav-list li:first-child').addClass('active');
    }

    //
    // if(system_msg){
    //     $('#system_msg:first-child').addClass('active');
    // }
    // if(case_msg){
    //     $('#case_msg:first-child').addClass('active');
    // }
    // if(bbs_msg){
    //     $('#bbs_msg:first-child').addClass('active');
    // }
}







