jQuery(function($){
	
})

// JavaScript Document
//隐藏中间字符
function fnHidNum(sString, nStart, nEnd){
	//参数：需要隐藏的字符串, 开头显示个数, 结尾显示个数
	
	var strStart = sString.substr(0, nStart)
	//截取开头需要显示的字符串
	
	var strEnd = sString.substr(-nEnd);
	//截取结尾需要显示的字符串
	
	var sStar = "";
	for(var i=0; i<sString.length-nStart-nEnd; i++){
		sStar += "*";
	}
	//计算字符串中间的“*”
	
	var str = strStart + sStar + strEnd;
	//拼接出隐藏后的字符串
	
	return  str;//返回隐藏后的字符串
}
//加“0”
function add0(nNum){
	//传入需要加“0”的数字
	
	if(nNum<10){
		nNum = "0"+nNum;
	}
	//判断是否小于10，如果小于10，数字前加“0”
	
	return nNum;//返回加“0”后的数字
}
//日期格式化
function fnDate(dDate, sFu){
//参数：日期, 格式化符号
	
	var dYear = dDate.getFullYear();//获取年份
	var dMonth = add0(dDate.getMonth()+1);//获取月份
	var dDay = add0(dDate.getDate());//获取几号
	var sDate = "";
	if(sFu){
		sDate = dYear+sFu+dMonth+sFu+dDay;
	}else{
		sDate = dYear+"年"+dMonth+"月"+dDay+"日";
	}
	
	return sDate;//返回字符串
}
//时间格式化
function fnTime(dDate, sFu){
	var dHour = add0(dDate.getHours());
	var dMinute = add0(dDate.getMinutes());
	var dSecond = add0(dDate.getSeconds());
	var dTime = "";
	if(sFu){
		dTime = dHour+sFu+dMinute+sFu+dSecond;
	}else{
		dTime = dHour+"时"+dMinute+"分"+dSecond+"秒";
	}
	
	return dTime;
}
//星期格式化
function fnWeek(dDate){
	var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
	var dWeek = dDate.getDay();
	return weeks[dWeek];
}
//带开关的日期拼接
function fnAllDate(dDate, bDate, bTime, bWeek){
	var sDate = "";
	
	if(bDate){
		sDate += fnDate(dDate);
	}
	if(bTime){
		sDate += fnTime(dDate);
	}
	if(bWeek){
		sDate += fnWeek(dDate);
	}
	return sDate;
}
//日期拆分成数组
function fnArrDate(dDate){
	var aDate = [];
	var sDate = fnDate(dDate, "/").split("/");
	var sTime = fnTime(dDate, ":").split(":");
	var dWeek = fnWeek(dDate);
	
	aDate = aDate.concat(sDate, sTime, dWeek);
	return aDate;//[年, 月, 日, 时, 分, 秒, "星期"];
}
//在固定位置出现
function fnPosDis(sId, nHeight){//参数：(元素ID, 居于屏幕顶部的距离)
	var oDiv = document.getElementById(sId);
	window.onscroll=function(){
		var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
		if(scrollT > nHeight){
			oDiv.style.display = "block";
		}else if(scrollT <= nHeight){
			oDiv.style.display = "none";
		}
	}
}
//支持低版本浏览器的固定定位
function fixedPos(sId, nTop){//如果第二个参数为true，则元素居于底部
	var oNav = document.getElementById(sId);
	//获取元素
	
	var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
	//计算网页卷去高度
	
	if(nTop){
		nTop = document.documentElement.clientHeight-oNav.clientHeight;
		//当nTop==true(需要元素居于底部), 计算出元素居于可视区顶部的距离
	}
	oNav.style.top = scrollT+nTop+"px";
	//设置元素的top值为：卷去高度+居于可视区顶部的距离+'px'
}
//返回顶部
function fnBackTop(sId ,nX, nY, nSpeed){//参数：x轴每次滚动的距离, y轴每次滚动的距离,
	var oBox = document.getElementById(sId);
	oBox.onclick=function(){
		var timer = setInterval(function(){
			window.scrollBy(nX, nY);
			var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
			if(scrollT <= 0){
				clearInterval(timer);
			}
		}, nSpeed);
	}
}
//获取非行间样式
function getStyle(oObj, sAttr){
//参数：需要获取样式的元素对象, 需要获取的样式属性名、

	if(oObj.currentStyle){
	//如果该对象存在currentStyle属性，则使用它
	
		sAttr = oObj.currentStyle[sAttr];
		//对象.currentStyle[属性名]
		
	}else{ 
	//其他情况使用高版本浏览器所具有的getComputedStyle()方法
	
		sAttr = getComputedStyle(oObj, false)[sAttr];
		//getComputedStyle(对象, false)[属性名]
	}
	
	return sAttr;  //返回最终得到的样式
}

//通过类名获取元素
function getByClass(oArea, sClass){
//参数：获取范围, 类名

	var aTag = oArea.getElementsByTagName('*');
	//使用通配符“*”获取范围内所有标签
	
	var aResult = [];
	//创建空数组，用于存放符合条件的元素
	
	for(var i=0; i<aTag.length; i++){//循环所有标签
	
		if(aTag[i].className == sClass){//如果标签类名符合要求
		
			aResult.push(aTag[i]);//将元素放进空数组中
			
		}
	}
	
	return aResult;//返回最终元素数组
	
}
//获取文本节点或元素节点
function getNodes(oObj, nNodeType){
//参数：父节点, 节点类型

	var childNodes = oObj.childNodes;
	//获取所有节点
	
	var childs = [];
	//创建数组接受新节点
	
	for(var i=0; i<childNodes.length; i++){
		if(childNodes[i].nodeType == nNodeType){
		//如果符合节点类型
		
			childs.push(childNodes[i]);
			//则放到数组中
			
		}
	}
	
	return childs;//返回新数组
}
//添加事件
function addEvent(oBox, sEvent, fn, bOpen){
//参数：元素, 事件名称, 事件处理函数, 添加或移除（true/false）
	if(bOpen){
		if(oBox.attachEvent){
			oBox.attachEvent("on"+sEvent, fn);//IE添加事件
		}else{
			oBox.addEventListener(sEvent, fn, false);//高版本添加事件
		}
	}else{
		if(oBox.dettachEvent){
			oBox.dettachEvent("on"+sEvent, fn);
		}else{
			oBox.removeEventListener(sEvent, fn, false);//高版本添加事
		}
	}
}

//插入cookie
function fnSetCookie(cookName, cookValue, nOutTime){
	//var uname = "张三";
	var dDate = new Date();
	dDate.setDate(dDate.getDate()+nOutTime);
	
	//储存用户名、密码、id
	document.cookie = cookName+"="+cookValue+"; expires="+dDate;//用户名字段=用户名; expires=过期时间
}
//清除cookie
function fnRemoveCookie(cookName){
	fnSetCookie(cookName, "", -1);
}

//查看cookie
function fnCheckCookie(cookName){
//document.cookie 已知条件  , "username=张三; userpass=123456; key=value"
	var result = "";
	var aCookie = document.cookie.split("; ");
	//先拆分成键值对数组   ["username=张三", "userpass=123456", "key=value"];
	for(var i=0; i<aCookie.length; i++){
		var aCook = aCookie[i].split("="); //["username", "张三"];
		
		if(aCook[0] == cookName){
			result = aCook[1];
		}
	}
	return result;
}
//ajax
function fnAjax(sUrl, fnSucc, fnFail){
	var xhr;
	if(typeof XMLHttpRequest != "undefined"){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject("MSXML2.XMLHttp");
	}
	xhr.open("GET", sUrl, true);
	xhr.send(null);
	xhr.onreadystatechange=function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				fnSucc(xhr.responseText);
			}else{
				fnFail(xhr.status);
			}
		}
	}
}
//运动框架
function fnMove(oObj, oJson, fn){
	clearInterval(oObj.timer);
	oObj.timer = setInterval(function(){
		var bStop = true;
		for(var attr in oJson){
			var curr;
			curr = parseInt(getStyle(oObj, attr));//当前位置
			if(attr == "opacity"){
				curr = parseInt(getStyle(oObj, attr)*100);
			}
			var speed = (oJson[attr] - curr)/7;
			//剩余距离/6
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			//大于0向上取整，小于0向下取整。
			//向上/向下取整是为了让速度等于1/-1，每次移动一个像素，直到到达目标点，此时speed为0；
			if(speed != 0){
				bStop = false;
			}
			if(attr == "opacity"){
				oObj.style[attr] = (curr + speed)/100;
				oObj.style["filter"] = "alpha(opacity:"+(curr+speed)+")"
			}else{
				oObj.style[attr] = curr + speed + "px";//每次加speed；
			}
		}
		if(bStop){
			clearInterval(oObj.timer);
			if(fn){
				fn();
			}
		}
			
	}, 30);
}
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


/*!
 * jQuery Validation Plugin 1.11.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

(function($) {

$.extend($.fn, {
	// http://docs.jquery.com/Plugins/Validation/validate
	validate: function( options ) {

		// if nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) {
			if ( options && options.debug && window.console ) {
				console.warn( "Nothing selected, can't validate, returning nothing." );
			}
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data( this[0], "validator" );
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr( "novalidate", "novalidate" );

		validator = new $.validator( options, this[0] );
		$.data( this[0], "validator", validator );

		if ( validator.settings.onsubmit ) {

			this.validateDelegate( ":submit", "click", function( event ) {
				if ( validator.settings.submitHandler ) {
					validator.submitButton = event.target;
				}
				// allow suppressing validation by adding a cancel class to the submit button
				if ( $(event.target).hasClass("cancel") ) {
					validator.cancelSubmit = true;
				}

				// allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
				if ( $(event.target).attr("formnovalidate") !== undefined ) {
					validator.cancelSubmit = true;
				}
			});

			// validate the form on submit
			this.submit( function( event ) {
				if ( validator.settings.debug ) {
					// prevent form submit to be able to see console output
					event.preventDefault();
				}
				function handle() {
					var hidden;
					if ( validator.settings.submitHandler ) {
						if ( validator.submitButton ) {
							// insert a hidden input as a replacement for the missing submit button
							hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val( $(validator.submitButton).val() ).appendTo(validator.currentForm);
						}
						validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if ( validator.submitButton ) {
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						return false;
					}
					return true;
				}

				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}

		return validator;
	},
	// http://docs.jquery.com/Plugins/Validation/valid
	valid: function() {
		if ( $(this[0]).is("form")) {
			return this.validate().form();
		} else {
			var valid = true;
			var validator = $(this[0].form).validate();
			this.each(function() {
				valid = valid && validator.element(this);
			});
			return valid;
		}
	},
	// attributes: space seperated list of attributes to retrieve and remove
	removeAttrs: function( attributes ) {
		var result = {},
			$element = this;
		$.each(attributes.split(/\s/), function( index, value ) {
			result[value] = $element.attr(value);
			$element.removeAttr(value);
		});
		return result;
	},
	// http://docs.jquery.com/Plugins/Validation/rules
	rules: function( command, argument ) {
		var element = this[0];

		if ( command ) {
			var settings = $.data(element.form, "validator").settings;
			var staticRules = settings.rules;
			var existingRules = $.validator.staticRules(element);
			switch(command) {
			case "add":
				$.extend(existingRules, $.validator.normalizeRule(argument));
				// remove messages from rules, but allow them to be set separetely
				delete existingRules.messages;
				staticRules[element.name] = existingRules;
				if ( argument.messages ) {
					settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
				}
				break;
			case "remove":
				if ( !argument ) {
					delete staticRules[element.name];
					return existingRules;
				}
				var filtered = {};
				$.each(argument.split(/\s/), function( index, method ) {
					filtered[method] = existingRules[method];
					delete existingRules[method];
				});
				return filtered;
			}
		}

		var data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules(element),
			$.validator.attributeRules(element),
			$.validator.dataRules(element),
			$.validator.staticRules(element)
		), element);

		// make sure required is at front
		if ( data.required ) {
			var param = data.required;
			delete data.required;
			data = $.extend({required: param}, data);
		}

		return data;
	}
});

// Custom selectors
$.extend($.expr[":"], {
	// http://docs.jquery.com/Plugins/Validation/blank
	blank: function( a ) { return !$.trim("" + $(a).val()); },
	// http://docs.jquery.com/Plugins/Validation/filled
	filled: function( a ) { return !!$.trim("" + $(a).val()); },
	// http://docs.jquery.com/Plugins/Validation/unchecked
	unchecked: function( a ) { return !$(a).prop("checked"); }
});

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

$.validator.format = function( source, params ) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.validator.format.apply( this, args );
		};
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray(arguments).slice(1);
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each(params, function( i, n ) {
		source = source.replace( new RegExp("\\{" + i + "\\}", "g"), function() {
			return n;
		});
	});
	return source;
};

$.extend($.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $([]),
		errorLabelContainer: $([]),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function( element, event ) {
			this.lastActive = element;

			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.addWrapper(this.errorsFor(element)).hide();
			}
		},
		onfocusout: function( element, event ) {
			if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
				this.element(element);
			}
		},
		onkeyup: function( element, event ) {
			if ( event.which === 9 && this.elementValue(element) === "" ) {
				return;
			} else if ( element.name in this.submitted || element === this.lastElement ) {
				this.element(element);
			}
		},
		onclick: function( element, event ) {
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element(element);
			}
			// or option elements, check parent select in that case
			else if ( element.parentNode.name in this.submitted ) {
				this.element(element.parentNode);
			}
		},
		highlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName(element.name).addClass(errorClass).removeClass(validClass);
			} else {
				$(element).addClass(errorClass).removeClass(validClass);
			}
		},
		unhighlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName(element.name).removeClass(errorClass).addClass(validClass);
			} else {
				$(element).removeClass(errorClass).addClass(validClass);
			}
		}
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
	setDefaults: function( settings ) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format("Please enter no more than {0} characters."),
		minlength: $.validator.format("Please enter at least {0} characters."),
		rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
		range: $.validator.format("Please enter a value between {0} and {1}."),
		max: $.validator.format("Please enter a value less than or equal to {0}."),
		min: $.validator.format("Please enter a value greater than or equal to {0}.")
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $(this.settings.errorLabelContainer);
			this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
			this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = (this.groups = {});
			$.each(this.settings.groups, function( key, value ) {
				if ( typeof value === "string" ) {
					value = value.split(/\s/);
				}
				$.each(value, function( index, name ) {
					groups[name] = key;
				});
			});
			var rules = this.settings.rules;
			$.each(rules, function( key, value ) {
				rules[key] = $.validator.normalizeRule(value);
			});

			function delegate(event) {
				var validator = $.data(this[0].form, "validator"),
					eventType = "on" + event.type.replace(/^validate/, "");
				if ( validator.settings[eventType] ) {
					validator.settings[eventType].call(validator, this[0], event);
				}
			}
			$(this.currentForm)
				.validateDelegate(":text, [type='password'], [type='file'], select, textarea, " +
					"[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
					"[type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], " +
					"[type='range'], [type='color'] ",
					"focusin focusout keyup", delegate)
				.validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);

			if ( this.settings.invalidHandler ) {
				$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
			}
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/form
		form: function() {
			this.checkForm();
			$.extend(this.submitted, this.errorMap);
			this.invalid = $.extend({}, this.errorMap);
			if ( !this.valid() ) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
				this.check( elements[i] );
			}
			return this.valid();
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/element
		element: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );
			this.lastElement = element;
			this.prepareElement( element );
			this.currentElements = $(element);
			var result = this.check( element ) !== false;
			if ( result ) {
				delete this.invalid[element.name];
			} else {
				this.invalid[element.name] = true;
			}
			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
		showErrors: function( errors ) {
			if ( errors ) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[name],
						element: this.findByName(name)[0]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function( element ) {
					return !(element.name in errors);
				});
			}
			if ( this.settings.showErrors ) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$(this.currentForm).resetForm();
			}
			this.submitted = {};
			this.lastElement = null;
			this.prepareForm();
			this.hideErrors();
			this.elements().removeClass( this.settings.errorClass ).removeData( "previousValue" );
		},

		numberOfInvalids: function() {
			return this.objectLength(this.invalid);
		},

		objectLength: function( obj ) {
			var count = 0;
			for ( var i in obj ) {
				count++;
			}
			return count;
		},

		hideErrors: function() {
			this.addWrapper( this.toHide ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if ( this.settings.focusInvalid ) {
				try {
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
					.filter(":visible")
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger("focusin");
				} catch(e) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function( n ) {
				return n.element.name === lastActive.name;
			}).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// select all valid inputs inside the form (no submit or reset buttons)
			return $(this.currentForm)
			.find("input, select, textarea")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() {
				if ( !this.name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this);
				}

				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength($(this).rules()) ) {
					return false;
				}

				rulesCache[this.name] = true;
				return true;
			});
		},

		clean: function( selector ) {
			return $(selector)[0];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.replace(" ", ".");
			return $(this.settings.errorElement + "." + errorClass, this.errorContext);
		},

		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $([]);
			this.toHide = $([]);
			this.currentElements = $([]);
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor(element);
		},

		elementValue: function( element ) {
			var type = $(element).attr("type"),
				val = $(element).val();

			if ( type === "radio" || type === "checkbox" ) {
				return $("input[name='" + $(element).attr("name") + "']:checked").val();
			}

			if ( typeof val === "string" ) {
				return val.replace(/\r/g, "");
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $(element).rules();
			var dependencyMismatch = false;
			var val = this.elementValue(element);
			var result;

			for (var method in rules ) {
				var rule = { method: method, parameters: rules[method] };
				try {

					result = $.validator.methods[method].call( this, val, element, rule.parameters );

					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					}

					if ( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch(e) {
					if ( this.settings.debug && window.console ) {
						console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
					}
					throw e;
				}
			}
			if ( dependencyMismatch ) {
				return;
			}
			if ( this.objectLength(rules) ) {
				this.successList.push(element);
			}
			return true;
		},

		// return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		customDataMessage: function( element, method ) {
			return $(element).data("msg-" + method.toLowerCase()) || (element.attributes && $(element).attr("data-msg-" + method.toLowerCase()));
		},

		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[name];
			return m && (m.constructor === String ? m : m[method]);
		},

		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for(var i = 0; i < arguments.length; i++) {
				if ( arguments[i] !== undefined ) {
					return arguments[i];
				}
			}
			return undefined;
		},

		defaultMessage: function( element, method ) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customDataMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call(this, rule.parameters, element);
			} else if (theregex.test(message)) {
				message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
			}
			this.errorList.push({
				message: message,
				element: element
			});

			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		},

		addWrapper: function( toToggle ) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements;
			for ( i = 0; this.errorList[i]; i++ ) {
				var error = this.errorList[i];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if ( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if ( this.settings.success ) {
				for ( i = 0; this.successList[i]; i++ ) {
					this.showLabel( this.successList[i] );
				}
			}
			if ( this.settings.unhighlight ) {
				for ( i = 0, elements = this.validElements(); elements[i]; i++ ) {
					this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not(this.invalidElements());
		},

		invalidElements: function() {
			return $(this.errorList).map(function() {
				return this.element;
			});
		},

		showLabel: function( element, message ) {
			var label = this.errorsFor( element );
			if ( label.length ) {
				// refresh error/success class
				label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
				// replace message on existing label
				label.html(message);
			} else {
				// create label
				label = $("<" + this.settings.errorElement + ">")
					.attr("for", this.idOrName(element))
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				}
				if ( !this.labelContainer.append(label).length ) {
					if ( this.settings.errorPlacement ) {
						this.settings.errorPlacement(label, $(element) );
					} else {
						label.insertAfter(element);
					}
				}
			}
			if ( !message && this.settings.success ) {
				label.text("");
				if ( typeof this.settings.success === "string" ) {
					label.addClass( this.settings.success );
				} else {
					this.settings.success( label, element );
				}
			}
			this.toShow = this.toShow.add(label);
		},

		errorsFor: function( element ) {
			var name = this.idOrName(element);
			return this.errors().filter(function() {
				return $(this).attr("for") === name;
			});
		},

		idOrName: function( element ) {
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
		},

		validationTargetFor: function( element ) {
			// if radio/checkbox, validate first element in group instead
			if ( this.checkable(element) ) {
				element = this.findByName( element.name ).not(this.settings.ignore)[0];
			}
			return element;
		},

		checkable: function( element ) {
			return (/radio|checkbox/i).test(element.type);
		},

		findByName: function( name ) {
			return $(this.currentForm).find("[name='" + name + "']");
		},

		getLength: function( value, element ) {
			switch( element.nodeName.toLowerCase() ) {
			case "select":
				return $("option:selected", element).length;
			case "input":
				if ( this.checkable( element) ) {
					return this.findByName(element.name).filter(":checked").length;
				}
			}
			return value.length;
		},

		depend: function( param, element ) {
			return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
		},

		dependTypes: {
			"boolean": function( param, element ) {
				return param;
			},
			"string": function( param, element ) {
				return !!$(param, element.form).length;
			},
			"function": function( param, element ) {
				return param(element);
			}
		},

		optional: function( element ) {
			var val = this.elementValue(element);
			return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
		},

		startRequest: function( element ) {
			if ( !this.pending[element.name] ) {
				this.pendingRequest++;
				this.pending[element.name] = true;
			}
		},

		stopRequest: function( element, valid ) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if ( this.pendingRequest < 0 ) {
				this.pendingRequest = 0;
			}
			delete this.pending[element.name];
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
				$(this.currentForm).submit();
				this.formSubmitted = false;
			} else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
				this.formSubmitted = false;
			}
		},

		previousValue: function( element ) {
			return $.data(element, "previousValue") || $.data(element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}

	},

	classRuleSettings: {
		required: {required: true},
		email: {email: true},
		url: {url: true},
		date: {date: true},
		dateISO: {dateISO: true},
		number: {number: true},
		digits: {digits: true},
		creditcard: {creditcard: true}
	},

	addClassRules: function( className, rules ) {
		if ( className.constructor === String ) {
			this.classRuleSettings[className] = rules;
		} else {
			$.extend(this.classRuleSettings, className);
		}
	},

	classRules: function( element ) {
		var rules = {};
		var classes = $(element).attr("class");
		if ( classes ) {
			$.each(classes.split(" "), function() {
				if ( this in $.validator.classRuleSettings ) {
					$.extend(rules, $.validator.classRuleSettings[this]);
				}
			});
		}
		return rules;
	},

	attributeRules: function( element ) {
		var rules = {};
		var $element = $(element);
		var type = $element[0].getAttribute("type");

		for (var method in $.validator.methods) {
			var value;

			// support for <input required> in both html5 and older browsers
			if ( method === "required" ) {
				value = $element.get(0).getAttribute(method);
				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if ( value === "" ) {
					value = true;
				}
				// force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr(method);
			}

			// convert the value to a number for number inputs, and for text for backwards compability
			// allows type="date" and others to be compared as strings
			if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
				value = Number(value);
			}

			if ( value ) {
				rules[method] = value;
			} else if ( type === method && type !== 'range' ) {
				// exception: the jquery validate 'range' method
				// does not test for the html5 'range' type
				rules[method] = true;
			}
		}

		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if ( rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength) ) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function( element ) {
		var method, value,
			rules = {}, $element = $(element);
		for (method in $.validator.methods) {
			value = $element.data("rule-" + method.toLowerCase());
			if ( value !== undefined ) {
				rules[method] = value;
			}
		}
		return rules;
	},

	staticRules: function( element ) {
		var rules = {};
		var validator = $.data(element.form, "validator");
		if ( validator.settings.rules ) {
			rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
		}
		return rules;
	},

	normalizeRules: function( rules, element ) {
		// handle dependency check
		$.each(rules, function( prop, val ) {
			// ignore rule when param is explicitly false, eg. required:false
			if ( val === false ) {
				delete rules[prop];
				return;
			}
			if ( val.param || val.depends ) {
				var keepRule = true;
				switch (typeof val.depends) {
				case "string":
					keepRule = !!$(val.depends, element.form).length;
					break;
				case "function":
					keepRule = val.depends.call(element, element);
					break;
				}
				if ( keepRule ) {
					rules[prop] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[prop];
				}
			}
		});

		// evaluate parameters
		$.each(rules, function( rule, parameter ) {
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		});

		// clean number parameters
		$.each(['minlength', 'maxlength'], function() {
			if ( rules[this] ) {
				rules[this] = Number(rules[this]);
			}
		});
		$.each(['rangelength', 'range'], function() {
			var parts;
			if ( rules[this] ) {
				if ( $.isArray(rules[this]) ) {
					rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
				} else if ( typeof rules[this] === "string" ) {
					parts = rules[this].split(/[\s,]+/);
					rules[this] = [Number(parts[0]), Number(parts[1])];
				}
			}
		});

		if ( $.validator.autoCreateRanges ) {
			// auto-create ranges
			if ( rules.min && rules.max ) {
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			}
			if ( rules.minlength && rules.maxlength ) {
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function( data ) {
		if ( typeof data === "string" ) {
			var transformed = {};
			$.each(data.split(/\s/), function() {
				transformed[this] = true;
			});
			data = transformed;
		}
		return data;
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
	addMethod: function( name, method, message ) {
		$.validator.methods[name] = method;
		$.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
		if ( method.length < 3 ) {
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		}
	},

	methods: {

		// http://docs.jquery.com/Plugins/Validation/Methods/required
		required: function( value, element, param ) {
			// check if dependency is met
			if ( !this.depend(param, element) ) {
				return "dependency-mismatch";
			}
			if ( element.nodeName.toLowerCase() === "select" ) {
				// could be an array for select-multiple or a string, both are fine this way
				var val = $(element).val();
				return val && val.length > 0;
			}
			if ( this.checkable(element) ) {
				return this.getLength(value, element) > 0;
			}
			return $.trim(value).length > 0;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/email
		email: function( value, element ) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/url
		url: function( value, element ) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/date
		date: function( value, element ) {
			return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
		dateISO: function( value, element ) {
			return this.optional(element) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/number
		number: function( value, element ) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/digits
		digits: function( value, element ) {
			return this.optional(element) || /^\d+$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function( value, element ) {
			if ( this.optional(element) ) {
				return "dependency-mismatch";
			}
			// accept only spaces, digits and dashes
			if ( /[^0-9 \-]+/.test(value) ) {
				return false;
			}
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (var n = value.length - 1; n >= 0; n--) {
				var cDigit = value.charAt(n);
				nDigit = parseInt(cDigit, 10);
				if ( bEven ) {
					if ( (nDigit *= 2) > 9 ) {
						nDigit -= 9;
					}
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return (nCheck % 10) === 0;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/minlength
		minlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
			return this.optional(element) || length >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
		maxlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
			return this.optional(element) || length <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
		rangelength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
			return this.optional(element) || ( length >= param[0] && length <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/min
		min: function( value, element, param ) {
			return this.optional(element) || value >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/max
		max: function( value, element, param ) {
			return this.optional(element) || value <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/range
		range: function( value, element, param ) {
			return this.optional(element) || ( value >= param[0] && value <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
		equalTo: function( value, element, param ) {
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $(param);
			if ( this.settings.onfocusout ) {
				target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
					$(element).valid();
				});
			}
			return value === target.val();
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/remote
		remote: function( value, element, param ) {
			if ( this.optional(element) ) {
				return "dependency-mismatch";
			}

			var previous = this.previousValue(element);
			if (!this.settings.messages[element.name] ) {
				this.settings.messages[element.name] = {};
			}
			previous.originalMessage = this.settings.messages[element.name].remote;
			this.settings.messages[element.name].remote = previous.message;

			param = typeof param === "string" && {url:param} || param;

			if ( previous.old === value ) {
				return previous.valid;
			}

			previous.old = value;
			var validator = this;
			this.startRequest(element);
			var data = {};
			data[element.name] = value;
			$.ajax($.extend(true, {
				url: param,
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				success: function( response ) {
					validator.settings.messages[element.name].remote = previous.originalMessage;
					var valid = response === true || response === "true";
					if ( valid ) {
						var submitted = validator.formSubmitted;
						validator.prepareElement(element);
						validator.formSubmitted = submitted;
						validator.successList.push(element);
						delete validator.invalid[element.name];
						validator.showErrors();
					} else {
						var errors = {};
						var message = response || validator.defaultMessage( element, "remote" );
						errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
						validator.invalid[element.name] = true;
						validator.showErrors(errors);
					}
					previous.valid = valid;
					validator.stopRequest(element, valid);
				}
			}, param));
			return "pending";
		}

	}

});

// deprecated, use $.validator.format instead
$.format = $.validator.format;

}(jQuery));

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
(function($) {
	var pendingRequests = {};
	// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) {
		$.ajaxPrefilter(function( settings, _, xhr ) {
			var port = settings.port;
			if ( settings.mode === "abort" ) {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = xhr;
			}
		});
	} else {
		// Proxy ajax
		var ajax = $.ajax;
		$.ajax = function( settings ) {
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if ( mode === "abort" ) {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = ajax.apply(this, arguments);
				return pendingRequests[port];
			}
			return ajax.apply(this, arguments);
		};
	}
}(jQuery));

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
(function($) {
	$.extend($.fn, {
		validateDelegate: function( delegate, type, handler ) {
			return this.bind(type, function( event ) {
				var target = $(event.target);
				if ( target.is(delegate) ) {
					return handler.apply(target, arguments);
				}
			});
		}
	});
}(jQuery));


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

jQuery(function($){
	var $form = $('#denglu .box .part1 form');
	var $tab = $('#denglu .box .top');
	$tab.on('click','a',function(){
		var i = $(this).index();
		$(this).addClass('email').siblings().removeClass('email');
		$form.eq(i).css('display','block').siblings().css('display','none')
	})
	//点击生成验证码和手机验证码
		var $change = $('.box .part1 .form01 p.text i.change');
		var $change2 = $('.box .part1 .form02 p.text i.change');
		var $duanxian = $('#denglu .box .part1 .form02 p.text span.spyz');
		var $ma = $('.box .part1 .form01 p.text i.ma');
		var $ma21 = $('.box .part1 .form02 p.text i.ma');
		var $ma22 = $('.box .part1 .form02 p.text i.ma2');
		var arr = ['0','1','2','3','4','5','6','7','a','b','c','d','e']
		$change.on('click',function(){
			$ma.html(shechen());
		});
		$change2.on('click',function(){
			$ma21.html(shechen());
		});
		$duanxian.on('click',function(){
			$ma22.html(shechen());
		})
		//生成验证码函数
		function shechen(){
			var str = '';
			for(var i=0;i<=3;i++){
				var a = Math.floor(Math.random()*13);
				str += arr[a];
			}	
			return str;
		}
	//验证用户名开始
	 //通过判断顶部的邮箱注册和手机注册是否有‘email’，类名来确定正则规则
	 var $eml = $('#denglu .box .top a.a1');
	 var $phone = $('#denglu .box .top a.a2');
	 var num = 0;
	 //邮箱注册
	 if($eml.hasClass('email')){
	 	var $name =$('#denglu .box .part1 .form01 .text input.text01');
	 	var $pass01 = $('#denglu .box .part1 .form01 .text input.pass01');
	 	var $pass02 = $('#denglu .box .part1 .form01 .text input.pass02');
	 	var $yzm = $('#denglu .box .part1 .form01 p.text .yzm');
	 	var $scyz = $('#denglu .box .part1 .form01 p.text i.ma');
	 	var rRge01 = /^[0-9a-zA-Z]+[@][0-9a-zA-Z]+[.][a-zA-Z]{2,4}$/;
	 	var rRge02 = /^[0-9a-zA-Z_]{6,10}$/;
	 	var kaiguan = false;
	 	$name.on('blur',function(){
	 		var text01 = $name.val();
	 		if(!rRge01.test(text01)){
	 			$(this).siblings('.err').html('邮箱格式不正确');
	 			kaiguan = false;
	 		}else{
	 			$(this).siblings('.err').html('')
	 			kaiguan = true;
	 		}
	 	})
	 	$pass01.on('blur',function(){
	 		var text02 = $pass01.val();
	 		if(!rRge02.test(text02)){
	 			$(this).siblings('.err').html('密码必须为6-8');
	 			kaiguan = false;
	 		}else{
	 			$(this).siblings('.err').html('');
	 			kaiguan = true;
	 		}
	 	})
	 	$pass02.on('blur',function(){
	 		var text03 = $pass02.val();
	 		if(!($pass01.val() === text03)){
	 			$(this).siblings('.err').html('两次输入的密码不同');
	 			kaiguan = false;
	 		}else{
	 			$(this).siblings('.err').html('');
	 			kaiguan = true;
	 		}
	 	})
	 	$yzm.on('blur',function(){
	 		if(!($yzm.val() == $scyz.html())){
	 			$(this).siblings('.err').html('验证码不正确');
	 			kaiguan = false;
	 		}else{
	 			$(this).siblings('.err').html('');
	 			kaiguan = true;
	 		}
	 	})
	 	//如果以上所有条件均满足，则可以注册
	 	var $submit = $('#denglu .box .part1 .form01 p.delu input');
	 	$submit.on('click',function(e){
	 		if(kaiguan && $name.val()!='' && $pass01.val()!='' && $pass02.val()!='' && $yzm.val() != ''){
	 			alert('恭喜注册成功，赶快去登录吧');
	 			num++;
	 			var dDate = new Date();
	 			dDate.setDate(dDate.getDate()+7);
	 			var user = 'user'+num;
	 			//创建一个对象保存用户信息
	 			var value = {};
	 			value.name = $name.val();
	 			value.pass = $pass01.val();
	 			//通过json.stringify将json对象转换成json对象
	 			document.cookie = user+'='+JSON.stringify(value)+';expires='+dDate+';path=/';
	 		}else{
	 			alert('请将信息填写完整');
	 		}
	 		e.preventDefault();
	 	})
	 }
	 //手机注册，此处必须为点击事件。因为在DOM树构建完成时，手机注册部分没有被添加这个类名
	 $phone.click(function(){
	 	var $name =$('#denglu .box .part1 .form02 .text input.text01');
	 	var $pass01 = $('#denglu .box .part1 .form02 .text input.pass01');
	 	var $pass02 = $('#denglu .box .part1 .form02 .text input.pass02');
	 	var $yz01 = $('#denglu .box .part1 .form02 p.text .yz01');
	 	var $yz02 = $('#denglu .box .part1 .form02 p.text .yz02');
	 	var $scyz = $('#denglu .box .part1 .form02 p.text i.ma');
	 	var rRge01 = /^1[0-9]{10}$/;
	 	var rRge02 = /^[0-9a-zA-Z_]{6,10}$/;
	 	$name.on('blur',function(){
	 		var text01 = $name.val();
	 		if(!rRge01.test(text01)){
	 			$(this).siblings('.err').html('手机号码格式不正确');
	 			kaiguan = false;
	 		}else{
	 			$(this).siblings('.err').html('');
	 			kaiguan = true;
	 		}
	 	})
	 	$pass01.on('blur',function(){
	 		var text02 = $pass01.val();
	 		if(!rRge02.test(text02)){
	 			$(this).siblings('.err').html('密码必须为6-8');
	 			kaiguan = false;
	 		}else{
	 			$(this).siblings('.err').html('');
	 			kaiguan = true;
	 		}
	 	})
	 	$pass02.on('blur',function(){
	 		var text03 = $pass02.val();
	 		console.log($pass02);
	 		if(!($pass01.val() === text03)){
	 			$(this).siblings('.err').html('两次输入的密码不同');
	 			kaiguan = false;
	 		}else{
	 			$(this).siblings('.err').html('');
	 			kaiguan = true;
	 		}
	 	})
	 	$yz01.on('blur',function(){
	 		if(!($yz01.val() == $scyz.html())){
	 			$(this).siblings('.err').html('验证码不正确');
	 			kaiguan = false;
	 		}else{
	 			$(this).siblings('.err').html('');
	 			kaiguan = true;
	 		}
	 	})
	 	$yz02.on('blur',function(){
	 		if(!($yz02.val() == $ma22.html())){
	 			$(this).siblings('.err').html('验证码不正确');
	 			kaiguan = false;	
	 		}else{
	 			$(this).siblings('.err').html('');
	 			kaiguan = true;
	 		}
	 	})
	 	//如果以上所有条件均满足，则可以注册
	 	var $submit = $('#denglu .box .part1 .form02 p.delu input');
	 	//定义一个index用来存储多个用户
	 	$submit.on('click',function(){
	 		if(kaiguan && $name.val()!='' && $pass01.val()!='' && $pass02.val()!='' && $yz01.val() != '' && $yz02.val() != ''){
	 			alert('恭喜注册成功，赶快去登录吧');
	 			num++;
	 			var dDate = new Date();
	 			dDate.setDate(dDate.getDate()+7);
	 			var user = 'user'+num;
	 			//创建一个对象保存用户信息
	 			var value = {};
	 			value.name = $name.val();
	 			value.pass = $pass01.val();
	 			//通过json.stringify将json对象转换成json对象
	 			document.cookie = user+'='+JSON.stringify(value)+'expires='+dDate+'path=/';
	 		}else{
	 			alert('请将信息填写完整');
	 		}
	 	})
	 })

})








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

jQuery(function($){
	var $form = $('#denglu .box .part1 form');
	var $submit = $('#denglu .box .part1 form .delu input');
	//获取cookie，同时将cookie通过； 拆分成由多条cookie组成数组
	var _cookie = document.cookie.split('; ');
	console.log(_cookie);
	//遍历cookie
	$submit.click(function(e){
		//点击按钮时获取输入框中的值
		var $text = $(':text').val();
		var $password = $(':password').val();
		//定义一个开关
		var kai = false;
		//定义一个用户名
		var username = '';
		$.each(_cookie, function(idx,val) {    
			//将json数据通过‘=’将json数据拆分为数组；在将数组中的第二个元素转换成为jison对象
			var a = JSON.parse(val.split('=')[1]);
			if($text == a.name && $password == a.pass){
				kai = true;
				username = a.name;
				e.preventDefault();
			}
		});
		if(kai){
			window.location.href = '../index.html';
			//存入用户名
			var dDate = new Date();
	 		dDate.setDate(dDate.getDate()+7);
	 		//删除的时候也要加path,否则也无法删除
			document.cookie = 'denlu='+username+';path=/';
		}else{
			alert('用户名或密码不正确');
		}
	});
})

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
