jQuery(function($){
	//======主图图片切换效果开始
	var $big_li = $('.zhuTu .part1 .big li');
	var $small_ul = $('.zhuTu .part1 .small');
	$small_ul.on('mouseover','li',function(){
		var i = $(this).index();
		$(this).css({background:'url(../css/img/new_dpico.png) 27px -257px no-repeat'});
		$big_li.eq(i).css("display",'block').siblings().css('display','none');
		$(this).find('img').css('border-color','#e60012').siblings().css('border-color','#ddd');
	}).on('mouseout','li',function(){
		$(this).css({background:'none'});
		$(this).find('img').css('border-color','#ddd');
	})
	//======主图图片放大镜效果开始
	var $jin = $('.zhuTu .part1 .big_div .fdaj');
	var $bigImg = $('.zhuTu .bigImg');
	var $ul = $('.zhuTu .part1 .big');
	var $bigdiv = $('.zhuTu .part1 .big_div');
	var ulW = parseInt($ul.css('width'));
	var ulH = parseInt($ul.css('height'));
	var jinW = parseInt($jin.css('width'));
	var jinH = parseInt($jin.css('height'));
	$bigdiv.on('mouseenter',function(e){
		/*var x =  e.offsetX;
		var y = e.offsetY;
		//控制鼠标在放大镜的中间
		var nleft = x-jinW/2 ;
		var ntop =y-jinH/2;*/
		$jin.css({display:'block'});
		$(document).on('mousemove.fada',function(e){
			var x =  e.clientX - $bigdiv.offset().left + $(window).scrollLeft();
			var y = e.clientY - $bigdiv.offset().top + $(window).scrollTop();
			//控制鼠标在放大镜的中间
			var nleft = x-jinW/2 ;
			var ntop =y-jinH/2;
			if(nleft<=0){
				nleft = 0;
			}else if(nleft>ulW-jinW){
				nleft = ulW-jinW;
			}
			if(ntop<=0){
				ntop = 0;
			}else if(ntop>=ulH-jinH){
				ntop = ulH-jinH;
			}
			$jin.css({display:'block',left:nleft,top:ntop});
			$bigImg.css({display:'block'}).find('img').css({left:-nleft*2,top:-ntop*2});
		})
	})
	$bigdiv.mouseleave(function(){
			$(document).off('mousemove.fada');
			console.log($bigImg);
			$bigImg.css("display",'none');
			$jin.css({display:'none'});
		});
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
	if(text01.html() == '登录'){
		text01.click(function(){
			window.location.href = '../html/register.html';
		});
		text02.click(function(){
			window.location.href = '../html/login.html';
		});
	}
	//为商品详细添加动态效果
	//选择尺码
	var $choseC = $('.zhuTu .part2 .sku .count .shuxin .sColor');//颜色
	var $choseS = $('.zhuTu .part2 .sku .count .shuxin .sSize');//尺码
	var $color = $('.zhuTu .part2 .sku .color .tu');
	var $size = $('.zhuTu .part2 .sku .size .tu');
	$color.on('click','a',function(e){
		check($(this));
		var yanse = $(this).find('i').html();
		$choseC.html(yanse);
		e.preventDefault();
	})
	$size.on('click','a',function(e){
		check($(this));
		var chima = parseInt($(this).html());
		$choseS.html(chima);
		e.preventDefault();
	})
	//颜色尺码选择，公用函数封装
	function check(a){
		a.css({'border':'solid 1px red'}).siblings().css('border','none');
		a.siblings().find('i').css('display','none');
		a.find('i').css({'background':'url(../css/img/new_dpico.png) -2px -122px no-repeat','display':'block'});
	}
	//选择商品数量
	var $jia = $('.zhuTu .part2 .sku .count .jia');
	var $jian = $('.zhuTu .part2 .sku .count .jian');
	var $number = $('.zhuTu .part2 .sku .count .number');
	
	$jia.on('click',function(){
		var $nNumber = Number($number.html());
		$nNumber++;
		$number.html($nNumber);
	})
	$jian.on('click',function(){
		var $nNumber = Number($number.html());
		$nNumber--;
		if($nNumber<1){
			$nNumber =1;
		}
		$number.html($nNumber);
		
	})
	//加入购物车
	var $car = $('.zhuTu .part2 .sku .buy .sp02');
	var $good = $('.zhuTu .part2 h4').html();
	$car.on('click',function(){
		if($choseC.html() && $choseS.html()){
			var sSku = {};
			sSku.color = $choseC.html();
			sSku.size = $choseS.html();
			sSku.cont = $number.html();
			document.cookie = 'goods'+$good+ '=' +JSON.stringify(sSku)+'path=/';
		}else{
			alert('请选择颜色和尺码');
		}
	})
	
})
