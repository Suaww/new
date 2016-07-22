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







