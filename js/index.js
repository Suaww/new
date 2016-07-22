jQuery(function($){
	//==============楼梯JS效果
	var $floor = $('#floor');
	var $ul = $('#floor ul');
	$(window).on('scroll',function(e){
		var $top = $(window).scrollTop();
		if($top>245){
			$floor.css('top',$top);
		}else{
			$floor.css('top',245);
		}
	});
	$ul.on('click','li',function(){
		var i = $(this).index();
		if(i<=6){
			$(window).scrollTop( 1307 + i*553);
		}
	})
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
	//==========导航菜单 二级菜单
		var $meniuUl = $('#bannerbox .banner .menu_list .xianshi');
		$meniuUl.on('mouseover','li',function(){
			$(this).css({background:'#666666',color:'#fff'});
			$(this).find('p').find('a').css("color",'#fff');
			$(this).find('.popmenu').css('display','block');
			$(this).siblings('li').find('.popmenu').css('display','none');
			$(this).find('h3').css('background','url(css/img/tab_bg.png) no-repeat 16px 3px');
			var $dl = $(this).find('dl');
			$dl.on('mouseover','dt',function(){
				$(this).css({marginLeft:10})
			})
		}).on('mouseout','li',function(){
			$(this).css({background:'none',color:'#666'});
			$(this).find('p').find('a').css("color",'#666');
			$(this).find('h3').css('background','url("css/img/star_bg.png") no-repeat 16px 3px')
			$meniuUl.find('.popmenu').css('display','none');
			var $dl = $(this).find('dl');
			$dl.on('mouseout','dt',function(){
				$(this).css({marginLeft:0})
			})
		})
	//==========轮播效果
		//获取元素
		var $ul = $(".banner_img")
		var $li = $("#bannerbox .banner_img li");
		var $doc_span = $('.doc_span');
		//生成点击按钮
		for(var j=0; j<$li.length; j++){
			$('<span></span>').addClass('span_style').appendTo($doc_span);
		}
		//获取按钮
		var $spans = $doc_span.find('span');
		var i = 0;
		//初始化
		show();
		//自动轮播
		var timer = setInterval(function(){
			i++
			show();
		},3000);
		//鼠标移上停止。移开继续轮播
		$ul.on('mouseover',function(){
			clearInterval(timer);
		}).on('mouseout',function(){
			timer = setInterval(function(){
				i++
				show();
			},3000);
		})
		//点击按钮跳到当前页
		$doc_span.on('click','span',function(){
			i = $(this).index();
			show();
		})
		//显示当前图片函数封装
		function show(){
			if(i == $li.length){
				i=0;
			}
			$li.eq(i).fadeIn().siblings().fadeOut();
			$spans.eq(i).css("background",'red').siblings().css('background','#000')
		}
	//==========品牌展示轮播效果
		var $next = $('.brand_imgs .next');
		var $prev = $('.brand_imgs .prev');
		var $brandLi = $('.img_show li');
		var now01 = 0;
		$next.click(function(){
			now01++;
			if(now01>$brandLi.length){
				now01 = $brandLi.length-1;
			}
			$brandLi.eq(now01).css("display",'block').siblings().css("display",'none');
		});
		$prev.click(function(){
			now01--;
			if(now01<0){now01 = 0}
			$brandLi.eq(now01).css("display",'block').siblings().css("display",'none');
		});
	//==========分类切换效果
		var $changeUl = $('.sale_box .part1 ul');
		var $changeLi2 = $('.sale_box .part2 .big_box > div');
		$changeUl.on('mouseover','li',function(){
			var now02 = $(this).index();
			$(this).removeClass('pink');
			$(this).addClass('addclassLi');
			$(this).find('i').css('display','block');
			$(this).find('a').css('color','#fff');
			$changeLi2.eq(now02).css('display','block').siblings().css('display','none');
		}).on('mouseout','li',function(){
			var now02 = $(this).index();
			if(now02>6){
				$(this).addClass('pink');
			}
			$(this).removeClass('addclassLi');
			$(this).find('i').css('display','none');
			$(this).find('a').css('color','#666');
			$changeLi2.css('display','block');
		})
	//==========品牌切换效果2
		var $pre03 = $('#guide_box .big_box .box .top .prev');
		var $next03 = $('#guide_box .big_box .box .top .next');
		var $ul03 = $('#guide_box .big_box .box .top .lunbo .long ul');
		var now03 = 0;
		$pre03.on('click',function(){
			now03--;
			if(now03<0){
				now03 = 0;
			}
			$ul03.eq(now03).css('display','block').siblings().css('display','none');
		})
		$next03.on('click',function(){
			now03++;
			if(now03>3){
				now03 = 3;
			}
			$ul03.eq(now03).css('display','block').siblings().css('display','none');
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
	if(text01.html() == '登录'){
		text01.click(function(){
			window.location.href = 'html/register.html';
		});
		text02.click(function(){
			window.location.href = 'html/login.html';
		});
	}
	
	
})

