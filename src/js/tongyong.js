jQuery(function($){
	//==============顶部导航JS效果
		//中英文切换
		$('.shouer_link_box').on('mouseover',function(){
			$('.shouer_link_box .chinese').css({display:'none',})
			$('.shouer_link_box .english').css({display:'block'})
		}).on('mouseout',function(){
			$('.shouer_link_box .chinese').css({display:'block',})
			$('.shouer_link_box .english').css({display:'none'})
		})
		//二维码显示隐藏效果
		var $ma = $('#head_nav .phone_link_box .app_load');
		$('.phone_link_box').on('mouseover',function(){
			$ma.css('display','block');
			$(this).css('background','#fff')
		}).on('mouseout',function(){
			$ma.css('display','none');
			$(this).css('background','#f3f3f5')
		})
		//我的优购二级菜单
		var $ygLi = $('#head_nav .register_box .right_big_box ul li.my_yg');
		var $ygSpan = $('#head_nav .register_box .right_big_box ul li.my_yg span');
		$ygLi.on('mouseover',function(){
			$(this).css({background:'#fff',border:'solid 1px #f3f3f5'});
			$ygSpan.css({display:'block',border:'solid 1px #f3f3f5',borderTop:'none'});
		}).on('mouseout',function(){
			$(this).css({background:'none',border:'none'});
			$ygSpan.css({display:'none'});
		})
		//公告二级菜单
		var $yggg = $('#head_nav .register_box .right_big_box ul li.public');
		var $yggul = $('#head_nav .register_box .right_big_box ul li.public ul');
		$yggg.on('mouseover',function(){
			$(this).css({border:'solid 1px #f3f3f5',background:'#fff'});
			$yggul.css({display:'block'});
		}).on('mouseout',function(){
			$(this).css({border:'none',background:'none'});
			$yggul.css({display:'none'});
		})
		//更多二级菜单
		var $moreLi = $('#head_nav .register_box .right_big_box ul li.more');
		var $moreUl = $('#head_nav .register_box .right_big_box ul li.more ul');
		$moreLi.on('mouseover',function(){
			$(this).css({border:'solid 1px #f3f3f5',background:'#fff'});
			$moreUl.css({display:'block'});
		}).on('mouseout',function(){
			$(this).css({border:'none',background:'none'});
			$moreUl.css({display:'none'});
		})
		//购物车二级菜单
		var $carbox = $('#logo .cart_box .cart');
		var $carshow = $('#logo .cart_box .cart .carshow');
		$carbox.on('mouseover',function(){
			$carshow.css({display:'block'});
		}).on('mouseout',function(){
			$carshow.css({display:'none'});
		})
})
