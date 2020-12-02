// JavaScript Document
$(function(){
	//¹ö¶¯Ìõ
	$(function() {
		//ÊúÏò
		$('.scroll-pane').jScrollPane({
			mouseWheelSpeed :100
		});
	});
	
	jQuery(".phBox").slide({mainCell:".bd ul",effect:"leftLoop",autoPlay:true});
	
	$('.dwul3 li').hover(function(){
		$(this).find('div').show();
	},function(){
		$(this).find('div').hide();
	});
	
	$('.qhbox').eq(0).show();
	$('.qh_ul li').mouseover(function(){
		$(this).addClass('on').siblings('li').removeClass('on');
		$(this).parent('.qh_ul').siblings('.qhbox').hide();
		$(this).parent('.qh_ul').siblings('.qhbox').eq($(this).index()).show();
		$('.scroll-pane').jScrollPane({
			mouseWheelSpeed :100
		});
	});
	$('.hj_box').eq(0).show();
	$('.sec11m ul li').mouseover(function(){
		$(this).addClass('on').siblings('li').removeClass('on');
		$(this).parent('ul').siblings('.hj_box').hide();
		$(this).parent('ul').siblings('.hj_box').eq($(this).index()).show();
	});
	//µ¯¿ò
	$('.zg_fcleft .fc_close').click(function(){
		$(this).parent('.zg_fcleft').hide();
		setTimeout(function(){
			$('.zg_fcleft').show();
		},1000);
	});
	
	var year=new Date().getFullYear();
	$('http://www.ujiuye.com/zt/python/js/.foe .year').text(year);
	
	$("#form").val(window.location.pathname+window.location.search);

});

$(function(){
  $('.arrow-left').on('click', function(e){
    e.preventDefault();
    mySwiper.swipePrev();
  });
  $('.arrow-right').on('click', function(e){
    e.preventDefault();
    mySwiper.swipeNext();
  });
});