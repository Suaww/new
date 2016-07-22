
jQuery(function($){
//分类文字二级菜单效果
	var $more = $('#classify .classify .more');
	$more.on('mouseover',function(){
		$(this).css({'border-color':'#cccccc'}).find('.show_hide').css('display','block');
		$(this).siblings().find('.show_hide').css('display','none');
		$(this).find('i').css('background','url(../css/img/arrow_up.png)');
	}).on('mouseout',function(){
		$(this).css({'border-color':'#fff'}).find('.show_hide').css('display','none');
		$(this).find('i').css('background','url(../css/img/down_arrow.png)');
	})
	//点击X删除分类
	var $span = $('#classify .classify .keXuan');
	$span.on('click','i',function(){
		$(this).closest('span').css('display','none');
	});
//点击更多切换效果
	var $more2 = $('#xuanZheK .xuanZheK .dl01 dd  .more');
	var $checkMore = $('#xuanZheK .xuanZheK .dl01 dd .checkMore');
	var $uls = $('#xuanZheK .xuanZheK .dl01 dd ul');
	var $dt = $('#xuanZheK .xuanZheK .dl01 dt');
	$more2.on('click',function(){
		var $sphtml= $more2.find('span').html();
		if($sphtml == '更多'){
			$more2.find('span').html('收起');
			$more2.find('i').css('background','url(../css/img/arrow_up.png) no-repeat');
			$uls.eq(1).css('display','block');
			$uls.eq(0).css('display','none');
			$dt.css('height','90');
		}else{
			$more2.find('span').html('更多');
			$more2.find('i').css('background','url(../css/img/down_arrow.png) no-repeat');
			$uls.eq(1).css('display','none');
			$uls.eq(0).css('display','block');
			$dt.css('height','69');
		}
		
	})
//更多筛选下拉菜单
	var $nanxie = $('#xuanZheK .xuanZheK .dl04 dd .youBian');
	var $funqin = $('#xuanZheK .xuanZheK .dl04 dd .youBian .nanxie .fuqin');
	$nanxie.on('mouseover','.nanxie',function(){
		$funqin.eq($(this).index()).css('border-color','#ccc');
		$funqin.eq($(this).index()).find('.posi').css('display','block');
		$funqin.eq($(this).index()).find('.xian').css('display','block');
	}).on('mouseout','.nanxie',function(){
		$funqin.eq($(this).index()).css('border-color','#fff');
		$funqin.eq($(this).index()).find('.posi').css('display','none');
		$funqin.eq($(this).index()).find('.xian').css('display','none');
	})
//排序方式下拉菜单
	var $input = $('.paiXun .price .p1 input');
	var $price = $('.paiXun .price ');
	var $more3 = $('.paiXun .price .more');
	var $fu = $('.paiXun .price .p1 .money');
	$input.on('focus',function(){
		$fu.css('display','none');
		$input.css('width','100%');
		$more3.css('display','block');
		$price.css({background:'#fff','border-color':'#aaa'});
	}).on('blur',function(){
		$fu.css('display','block');
		$input.css('width','29');
		$more3.css('display','none');
		$price.css({background:'none','border-color':'#f5f5f5'});
	})
	//==========登录效果
	//获取cookie，同时将cookie通过； 拆分成由多条cookie组成数组
	var _cookie = document.cookie.split('; ');
	var text01 = $('#head_nav .register_box .right_big_box .login');
	var text02 = $('#head_nav .register_box .right_big_box .register_text');
	//console.log(_cookie);
	var rRge = /denlu/;
	$.each(_cookie, function(idx,val) {    
		var sname = val.split('=')[0];
		//console.log(sname,rRge.test(sname));
		if(rRge.test(sname)){
			text01.html(val.split('=')[1]);
			text02.html('退出');
		}
		text02.click(function(){
			var bb = '';
			var dDate = new Date();
			dDate.setDate(dDate.getDate()-1);
			//console.log(dDate);
			document.cookie = 'denlu= ; expires='+dDate+';path=/';
			text01.html('登录');
			text02.html('注册');
		});
	});
	//为登录，注册两个元素添加点击事件，当里面的内容为未登录状态时执行
	console.log(text01.html());
	if(text01.html() == '登录'){
		text01.click(function(){
			window.location.href = '../html/register.html';
		});
		text02.click(function(){
			window.location.href = '../html/login.html';
		});
	}
});
