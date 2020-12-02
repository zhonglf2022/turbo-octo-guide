var _hmt = _hmt || []; /*百度统计使用*/

$(function(){
	jQuery.ajaxSetup({async: false});
	
	/* Navigators module START */
	
	// Top navigator's item focusing.
	$('.header .topNav >.color-alterable-svg-wrapper').click(function() {
	
		// Toggle this item style.
		$('.header .topNav >.color-alterable-svg-wrapper').removeClass('activated');
		$(this).addClass('activated');
	
	});
	$('.header .contact .more').click(function() {
		// Toggle this item style.
		if(!$(".header .contact .sec-contact").is(":animated")){
		 	$('.header .contact .sec-contact').slideToggle();
		 };
	});
	
	/* Navigators module START */
	jQuery.ajaxSetup({async: true});
	
	$(".school_btn").mousemove(function(){
		$(".school_title img").attr("src","http://www.itsource.cn/img/triangle_sfont.png")
	})
	$(".school_btn").mouseleave(function(){
		$(".school_title img").attr("src","http://www.itsource.cn/img/triangle.png")
	})
	
	var sz = {};
    var zid;
    var pd1 = 0;
    var pd2 = 0;
    $(".nzz").hover(function () {
        zid = $(this).attr('id');
        sz[zid + '_timer'] = setTimeout(function () {
            $('#zt').addClass('mh');
            $(".nn").css("display", "none");
            $(".nav-zi").css("display", "block");
            $("#n" + zid).css("display", "block");
            $("#n" + zid).addClass("nadc");
            $(".nzz").removeClass("nav-zibg");
            $("#" + zid).addClass("nav-zibg");
            pd1 = 1;
        }, 300);
    },
    function () {
        clearTimeout(sz[zid + '_timer']);
    });

    var closeNzz = function () {
        $(".nav-zi").css("display", "none");
        $('#zt').removeClass('mh');
        $(".nzz").removeClass("nav-zibg");
    }	
    $(".yn").mouseleave(function(){closeNzz()});
    $(".m0 a:not(.nzz) .sort").mouseenter(function(){closeNzz()});
    
	/*53客服*/
	/*百度统计*/
	var hm = document.createElement("script");hm.src = "https://hm.baidu.com/hm.js?428ccdffe9f0a55e8093f4a4fcb8b252";var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm, s);
});
