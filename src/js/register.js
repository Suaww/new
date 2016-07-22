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
