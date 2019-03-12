function plusReady(){
	// Android处理返回键
	var pageUrl=window.location.href; 
	plus.key.addEventListener('backbutton',function(){
	//判断是否返回到首页，是->退出,否则返回上一页
	if(pageUrl.indexOf('index') < 0){
		history.back();
		scan.close();
		// document.getElementById('index_page').style.left = '0';
		// document.getElementById('footer').style.left = '0';
		// document.getElementById('header_top').style.left = '0';
		// document.getElementById('scan_page').style.left = '100%';

	}else{
	if(confirm('确认退出？')){
		plus.runtime.quit();
	}
	}	
	},false);
}
//扩展API是否准备好，如果没有则监听“plusready"事件
if(window.plus){
plusReady();
}else{
document.addEventListener('plusready',plusReady,false);
}


//域名
// var domain_name = "http://api.hxwjshg.com/";
var common_url = 'http://www.zhuazhuab.cn:8081/api/';

$(function(){

	//开关 点击事件
	var switch_flag = true;
	$("#switch_btn,#switch_btn2").click(function(){
		if(switch_flag){
			//开
			$(".swipe-address").css({"left":".36rem","box-shadow":"none"});
			$(this).css({'border':'2px solid #fccc18','background':'#fccc18'});
			switch_flag = false;			
		}else{
			//关
			$(".swipe-address").css({"left":"0","box-shadow":"0 0 2px rgba(0,0,0,.4)"});
			$(this).css({'border':'2px solid #dcdcdc','background':'#fff'});	
			switch_flag = true;
		}
	})

})
