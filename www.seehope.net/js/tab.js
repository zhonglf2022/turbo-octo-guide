define(function(require,exports,module){
	require("jquery-1.11.3.min.js"/*tpa=http://www.seehope.net/js/jquery-1.11.3.min.js*/);

	var $aBtn=$(".c-road-btn").find("li");
	var $aList=$(".c-road-rg").find(".c-road-list");

	/*初始化*/
	// $aBtn.first().addClass("active");
	// $aList.first().show();
	var aTab_con_ul = [];
	var aTab_con_ul_cur = 0;
	var oTimer = null;

	$aBtn.each(function(index){
		$(this).on("mouseover",function(){
			$(this).addClass("active").siblings().removeClass("active");
			$aList.eq(index).show().siblings().hide();
		});

	});

	//校区导航
	$('.c-school-nav>li').each(function(index){
		$(this).on('mouseenter', function(){
			$('.c-school-nav>li').removeClass('active');
			$('.c-school-con>li').removeClass('active');
			$(this).addClass('active');
			$('.c-school-con>li').eq(index).addClass('active');
			aTab_con_ul_cur = index;
			//console.log(aTab_con_ul_cur, aTab_con_ul[aTab_con_ul_cur])
		})
	})

	//校区环境滚动
	$('.j_hj').each(function(){
		var oCloneHtml = $(this).html();
		$(this).html(oCloneHtml + oCloneHtml)
		$(this).css({width: 303*$(this).children().length})
		aTab_con_ul.push(0);	
	})

	console.log($('.c-school-con>li.active .j_hj').width()/2)
	oTimer=setInterval(function(){
		aTab_con_ul[aTab_con_ul_cur]+=3;
		$('.c-school-con>li.active .j_hj').css({left: -aTab_con_ul[aTab_con_ul_cur]})
		if(aTab_con_ul[aTab_con_ul_cur] >= ($('.c-school-con>li.active .j_hj').width()/2)){
			aTab_con_ul[aTab_con_ul_cur] = 0;
			$('.c-school-con>li.active .j_hj').css({left: 0})
		}
	},30)


	var aTab_con_ul2 = [];
	var aTab_con_ul_cur2 = 0;
	var oTimer2 = null;

	// 校区宿舍环境滚动
	$('.c-dor-img-box').css({
		width: $('.c-dor-img').width()
	})
	$('.c-dor-img').each(function(){
		var oCloneHtml = $(this).html();
		$(this).html(oCloneHtml + oCloneHtml)
		$(this).css({width: 284*$(this).children().length})
		aTab_con_ul2.push(0);	
	})

	console.log($('.c-school-con>li.active .j_hj').width()/2)
	oTimer2=setInterval(function(){
		aTab_con_ul2[aTab_con_ul_cur]+=3;
		$('.c-school-con>li.active .c-dor-img').css({left: -aTab_con_ul2[aTab_con_ul_cur]})
		if(aTab_con_ul2[aTab_con_ul_cur] >= ($('.c-school-con>li.active .c-dor-img').width()/2)){
			aTab_con_ul2[aTab_con_ul_cur] = 0;
			$('.c-school-con>li.active .c-dor-img').css({left: 0})
		}
	},30)



	// var navBoxTop = $('.c-school-nav-box').offset().top;
	// $(window).scroll(function(){
	// 	if($(window).scrollTop() >= navBoxTop){
	// 		$('.c-school-nav-box').css({position: 'fixed', top: 0, left: 0, 'margin-top': 0})
	// 		$('.c-school-nav-box-clone').css({display: 'block'})
	// 	}else{
	// 		$('.c-school-nav-box').css({position: 'relative'})
	// 		$('.c-school-nav-box-clone').css({display: 'none'})
	// 	}
	// })
});

