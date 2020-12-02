;(function(){
	//设置foot下的当前时间
	var nowtime=new Date();
	var nowyear=nowtime.getFullYear();
	$(".nowtime").html(nowyear);
	/*来源表单*/
	$(".from").val(window.location.pathname+window.location.search);	
//	悬浮窗
	$(".fixBtnOpen").click(function(){
		$(".indexFix").stop().animate({left:0},500);
		//$(".fixBtnOpen").addClass("fixBtnClose");
		$(".fixBtnOpen").hide();
		$(".fixBtnClose").show();
		});
	$(".fixBtnClose").click(function(){
		$(".fixBtnOpen").show();
		$(".fixBtnClose").hide();
		$(".indexFix").animate({left:-162},500);
	});
//	六大优惠动画
	var timer=null;
    $(".quan").hover(function(){ 
		// 判断浏览器
		var browser=navigator.appName 
		var b_version=navigator.appVersion 
		var version=b_version.split(";"); 
		var trim_Version=version[1].replace(/[ ]/g,""); 
		if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0"){ 
			$(this).find("img").hide(); 
			$(this).find(".worder").show();
			return;
		} 
		else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0"){ 
			$(this).find("img").hide(); 
			$(this).find(".worder").show();
			return;
		} 
		else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0"){ 
			$(this).find("img").hide(); 
			$(this).find(".worder").show();
			return;
		} 
		else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0"){ 
			$(this).find("img").hide(); 
			$(this).find(".worder").show();
			return; 
		} 
        var index=$(this).index();
       	timer=setTimeout(function(){
    		$(".quan img").eq(index).hide();
    		$(".quan .worder").eq(index).show();
//  		$(".quan .worder").css("animation","").eq(index).css({"animation":"word 0.6s forwards"});
    	},800)
        $(".quan img").css("animation","").eq(index).css({"animation":"imgs 1s forwards"});
//      $(".quan .worder").css("animation","").eq(index).css({"animation":"word 0.7s 0.6s forwards","display":"block"});
    },function(){
    	clearTimeout(timer);
    	$(".quan img").show();
    	$(".quan .worder").hide();
        var index=$(this).index()
        $(".quan img").css("animation","");
//      $(".quan .worder").css({"animation":"","display":"none"})
    });
//	行业大咖切换
	imgauto();
	function imgauto(){
		var txt=$('.zg_imolcont ul').html();
		$('.zg_imolcont ul').append(txt);
		var sum=$('.zg_imolcont ul li').size();
		var wid=$('.zg_imolcont ul li').outerWidth(true);
		var num=0;
		$('.zg_imolcont ul').css('width',wid*sum);
		$('.zg_iksirg').click(function(){
			$('.zg_imolcont').find('ul').stop(true,true);
			if(num==sum/2-1){
				num=0;
				$('.zg_imolcont ul').css('left',-wid*num);
			}
			num++;
			$('.zg_imolcont ul').animate({'left':-wid*num});
		});
		$('.zg_ikslet').click(function(){
			$('.zg_imolcont').find('ul').stop(true,true);
			if(num==0){
				num=sum/2
				$('.zg_imolcont ul').css('left',-wid*num);
			}
			num--;
			$('.zg_imolcont ul').animate({'left':-wid*num});
		});
		$('.zg_imolcont li').click(function(){
		$('.zg_imolcont li').removeClass('on');
		$(this).addClass('on');
		if($(this).index()>sum/2-1){
			var thin=$(this).index()-7
			$('.zg_imolcont li').eq(thin).addClass('on');
		}else{
			var thin=$(this).index()
			$('.zg_imolcont li').eq(thin+7).addClass('on');
		}
			$('.zg_opso').eq(thin).show().siblings('.zg_opso').hide();
		});
	}
})();

$(function(){
jQuery(".banner").slide({titCell:".ban_tip",mainCell:".ban_list",autoPage:true,effect:"leftLoop",autoPlay:true,vis:1,interTime:3000});			
//$(window).resize(function(){
//	$(".banner .tempWrap").css("width","100%");
//})
jQuery(".txtMarquee-top").slide({mainCell:".bd ul",autoPlay:true,effect:"topMarquee",vis:7,interTime:50});	
jQuery(".zhusu").slide({titCell:".hd",mainCell:".bd ul",autoPage:true,effect:"leftLoop",autoPlay:true,vis:1,interTime:2000});	
});
$(function(){
	$('.dsj_scroll').niceScroll({

		cursorcolor: "#d5d5d5",//#CC0071 光标颜色



		cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0



		touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备



		cursorwidth: "4px", //像素光标的宽度

		cursorheight: "10px",
		
		cursorborder: "0", // 	游标边框css定义



		cursorborderradius: "0px",//以像素为光标边界半径

		 hwacceleration: true,
		 
		 cursorborderradius: "5px",
		 
		 cursorheight: "50px", 
		 
		 railoffset: "right",

		autohidemode: false //是否隐藏滚动条



	});
	$(".dsj_kc_list").mouseenter(function(){
		$(".dsj_kc_list").removeClass("on");
		$(this).addClass("on");
		$(".dsj_blue_right").hide();
		$(".dsj_blue_right").eq($(this).index(".dsj_kc_list")).show();
	});
})
