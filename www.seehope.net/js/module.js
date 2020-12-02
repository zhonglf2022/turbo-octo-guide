		function addFavorite2() {
		    var url = window.location;
		    var title = document.title;
		    var ua = navigator.userAgent.toLowerCase();
		    if (ua.indexOf("360se") > -1) {
		        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
		    }
		    else if (ua.indexOf("msie 8") > -1) {
		        window.external.AddToFavoritesBar(url, title); //IE8
		    }
		    else if (document.all) {
		  try{
		   window.external.addFavorite(url, title);
		  }catch(e){
		   alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
		  }
		    }
		    else if (window.sidebar) {
		        window.sidebar.addPanel(title, url, "");
		    }
		    else {
		  alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
		    }
		}
		setTimeout($('.annone').addClass('none'),6000)
		function tabTeacherios(){
				$('.allsider').addClass('none');
				$('.hios').removeClass('none');
			}
		function tabTeacherandeoid(){
				$('.allsider').addClass('none');
				$('.handroid').removeClass('none');
			}
		function tabTeacherhfive(){
				$('.allsider').addClass('none');
				$('.hfive').removeClass('none');
			}

$(function(){

	var bannerSwiper = new Swiper('#banner_swiper', {
		loop: true,
		autoplay: 10000,
		pagination : '#banner_pagination',
		prevButton:'#banner_prev',
		nextButton:'#banner_next',
		paginationClickable :true,
		effect : 'fade'

	})
	$('#classification').click(function(){
		var display =$("#nav_slide").css('display');
		if (display == 'none') {
			
			$(this).addClass("acit");
		}else{
		
			$(this).removeClass("acit");						
		}
	})
	$('#nav-box a').click(function(){
		return;
	})


    imgLazyLoad('data-src')
    function imgLazyLoad(str){
        //获取元素
        var $aImg = $('['+str+']');
        //滚动距离
        var scrollTop = 0;
        //屏幕高度
        var clientHeight = $(window).height();

        $(window).on("scroll", function(){
            scrollTop = $(window).scrollTop();
            imgLoad()
        })


        imgLoad()
        function imgLoad(){
            for(var i=0; i<$aImg.length; i++){
                if($($aImg[i]).offset().top <scrollTop+clientHeight){
                    if($aImg[i].tagName == 'IMG'){
                        $aImg[i].src = $($aImg[i]).attr(str);
                    }else{
                        $($aImg[i]).css({
                            "background-image": "url("+$($aImg[i]).attr(str)+")"
                        })
                    }
                }
            }
        }
    }

    $(window).bind("scroll", function () {  
        var sTop = $(window).scrollTop();  
        var sTop = parseInt(sTop);  
         if (sTop > 1000) {
        	$(".go-top").slideDown();  
         }else {  
         	$(".go-top").slideUp();
        }   
    });

    //开班时间
    $('.translation-list li').each(function(){
    	var timeStr = $(this).find('.w121').html();
    	var Y = timeStr.split('-')[0];
    	var M = timeStr.split('-')[1];
    	var D = timeStr.split('-')[2];

    	setTime({
    		y: Y,
    		m: M,
    		d: D,
    		day: $(this).find('.b_D'),
    		hours: $(this).find('.b_H'),
    		mous: $(this).find('.b_M'),
    		mues: $(this).find('.b_S'),

    	}, $(this).find('.w180'))
    })


	/*讲师切换*/
	$('.btn-box>span').click(function(){
		$('.btn-box>span').removeClass('btn-box-btn-hover');
		$(this).addClass('btn-box-btn-hover');
	})

	/*校区切换*/	

	/* 校区图片滚动 */
	//单个Li宽度241px
	var aTab_con_ul = [];
	var aTab_con_ul_cur = 0;
	var oTimer = null;

	$('#tab_con>ul').each(function(){
		var oCloneHtml = $(this).html();
		$(this).html(oCloneHtml + oCloneHtml)
		$(this).css({width: 241*$(this).children().length})
		aTab_con_ul.push(0);	
	})

	oTimer = setInterval(function(){
		aTab_con_ul[aTab_con_ul_cur]+=2;

		$('#tab_con>ul.fdiv').css({left: -aTab_con_ul[aTab_con_ul_cur]})
		if(aTab_con_ul[aTab_con_ul_cur] >= $('#tab_con>ul.fdiv').width()/2){
			aTab_con_ul[aTab_con_ul_cur] = 0;
			$('#tab_con>ul.fdiv').css({left: 0})
		}
	},30)


	//育知动态板块选项卡
	fnTab('.j_tab')
	var aSrc = [
		['images/yzdt.jpg'/*tpa=http://www.seehope.net/js/images/yzdt.jpg*/, 'images/jyjb.jpg'/*tpa=http://www.seehope.net/js/images/jyjb.jpg*/, ], 
		['images/xxbj.jpg'/*tpa=http://www.seehope.net/js/images/xxbj.jpg*/, 'images/yzdt2.jpg'/*tpa=http://www.seehope.net/js/images/yzdt2.jpg*/], 
		['images/mtbd.jpg'/*tpa=http://www.seehope.net/js/images/mtbd.jpg*/, 'images/yzdt1.jpg'/*tpa=http://www.seehope.net/js/images/yzdt1.jpg*/]
	]
	function fnTab(sName){
		var aTab = $(sName);
		for(var i=0; i<aTab.length; i++){
			(function(index){
				aTab.eq(index).find('.j_tab_btn').each(function(){
					$(this).on('mouseenter', function(){
						$(this).parent().children().eq(2).attr({href: $(this).attr('href')})
						aTab.eq(index).find('.j_tab_cont').removeClass('active');
						aTab.eq(index).find('.j_tab_btn').removeClass('active')
						aTab.eq(index).find('.j_tab_img').removeClass('active')
						$(this).addClass('active')
						aTab.eq(index).find('.j_tab_cont').eq($(this).index()).addClass('active')
						aTab.eq(index).find('.j_tab_img').eq($(this).index()).addClass('active')
					})
				})
			})(i)
		}
	}

	$('.study-box-smal>span').click(function(){
		$('.study-box-smal>span').removeClass('study-box-smal-span-hover');
		
		$(this).addClass('study-box-smal-span-hover');
		
	})
	$('.beijhbtn').click(function(){
		$('.study-box>div>ul').removeClass('fdiv');
		$('.beijh').addClass('fdiv');
		aTab_con_ul_cur = 0;
	})
	$('.shenzhenhbtn').click(function(){
		$('.study-box>div>ul').removeClass('fdiv');
		$('.shenzhenh').addClass('fdiv');
		aTab_con_ul_cur = 1;
	})

	$('.translation>span').mouseenter(function(){
		$('.translation>span').removeClass('study-box-smal-span-hover');
		$(this).addClass('study-box-smal-span-hover');
	})

	/*地区切换*/
	$('.Place-box>.tabs').click(function(){
		var text = $(this).text();
		/*$('#place').text(text);*/
	})
	$('.map').click(function(){
		$(".zhebox").slideUp(1000);
	})
	$('.map').mouseleave(function(){
		$(".zhebox").slideDown(1000);
	})
	/**/
	$('.vedio-box>.left').mouseover(function(){

		$(this).find('.vedio-box-tip').stop().slideDown();
	})

	$('.vedio-box>.right').mouseover(function(){
		
		$(this).find('.vedio-box-tip').stop().slideDown();
	})
	$('.vedio-box>.right').mouseout(function(){
		var opacity = $(this).css('opacity');
	
		if (opacity=='1') {
			$(this).find('.vedio-box-tip').stop().slideUp();
		}
	})
	$('.vedio-box>.left').mouseout(function(){
		var opacity = $(this).css('opacity');
	
		if (opacity=='1') {
			$(this).find('.vedio-box-tip').stop().slideUp();
		}
	})
	$('#nav_slide').mouseleave(function(){
		$('.level1').hide();
		$('.silder1-box-right>p').css('background','url(./images/comright.png) no-repeat center');
		$('.silder1-box').css('background','#e4e8ee');
		$('.silder1imging').css('background-position','-63px 0')
		$('.silder1-box').css({'border':'none', 'border-bottom' : '1px solid #f1f2f3'})
	})
	$('.bimg1').mouseover(function(){
		$(this).css('background-position','0 2px')
	})


	$('.bimg2').mouseover(function(){
		$(this).css('background-position','-216px 5px')
	})

	$('.bimg3').mouseover(function(){
		$(this).css('background-position','-420px -2px')
	})

	$('.bimg4').mouseover(function(){
		$(this).css('background-position','-635px 0')
	})

	$('.bimg5').mouseover(function(){
		$(this).css('background-position','-826px 0')
	})

	$('.bimg6').mouseover(function(){
		$(this).css('background-position','-1009px 0')
	})


	$('.bimg7').mouseover(function(){
		$(this).css('background-position','0 -98px')
	})


	$('.bimg8').mouseover(function(){
		$(this).css('background-position','-216px -98px')
	})

	$('.bimg9').mouseover(function(){
		$(this).css('background-position','-420px -100px')
	})

	$('.bimg10').mouseover(function(){
		$(this).css('background-position','-634px -98px')
	})

	$('.bimg11').mouseover(function(){
		$(this).css('background-position','-826px -98px')
	})

	$('.bimg12').mouseover(function(){
		$(this).css('background-position','-1011px -98px')
	})

	$('.bimg13').mouseover(function(){
		$(this).css('background-position','0 -188px')
	})

	$('.bimg14').mouseover(function(){
		$(this).css('background-position','-216px -188px')
	})

	$('.bimg15').mouseover(function(){
		$(this).css('background-position','-420px -188px ')
	})

	$('.bimg16').mouseover(function(){
		$(this).css('background-position','-629px -188px')
	})

	$('.bimg17').mouseover(function(){
		$(this).css('background-position','-826px -183px')
	})

	$('.bimg18').mouseover(function(){
		$(this).css('background-position','-1004px -182px')
	})




	$('.vedio-box-tip1').click(function(){
		window.open('../live/index.htm#html5'/*tpa=http://www.seehope.net/live/#html5*/);
	})
	$('.vedio-box-tip2').click(function(){
		window.open('../live/index.htm#java'/*tpa=http://www.seehope.net/live/#java*/);
	})

	$('.vd1').click(function(){
		window.open('../publicList/index.htm#HTML5'/*tpa=http://www.seehope.net/publicList/#HTML5*/);
	})
	$('.vd2').click(function(){
		window.open('../publicList/index.htm#HTML5'/*tpa=http://www.seehope.net/publicList/#HTML5*/);
	})
	$('.vd3').click(function(){
		window.open('../publicList/index.htm#HTML5'/*tpa=http://www.seehope.net/publicList/#HTML5*/);
	})
	$('.vd4').click(function(){
		window.open('../publicList/index.htm#HTML5'/*tpa=http://www.seehope.net/publicList/#HTML5*/);
	})

	$('.javase1').click(function(){
		window.open('../publicList/index.htm#Java'/*tpa=http://www.seehope.net/publicList/#Java*/);
	})
	$('.vrjc1').click(function(){
		window.open('../publicList/index.htm#Java'/*tpa=http://www.seehope.net/publicList/#Java*/);
	})
	$('.javadsj1').click(function(){
		window.open('../publicList/index.htm#Android'/*tpa=http://www.seehope.net/publicList/#Android*/);
	})
	$('.iosgd').click(function(){
		window.open('../publicList/index.htm#Android'/*tpa=http://www.seehope.net/publicList/#Android*/);
	})


	$('.zhoboket').click(function(){
		window.open('../live/index.htm'/*tpa=http://www.seehope.net/live/*/)
	})
	$('.shipinjiaoc').click(function(){
		window.open('../publicList/index.html'/*tpa=http://www.seehope.net/publicList/index.html*/)
	})
	$('.shenzadd').click(function(){
		window.open('http://sz.yztcedu.com/')
	})

	 function initMap(){
        createMap();
        setMapEvent();
        addMapControl();
        addMarker();
    }
    

    function createMap(){
        var map = new BMap.Map("dituContent");
        var point = new BMap.Point(116.352677,40.068527);
        map.centerAndZoom(point,18);
        window.map = map;
    }
    

    function setMapEvent(){
        map.enableDragging();
        map.enableScrollWheelZoom();
        map.enableDoubleClickZoom();
        map.enableKeyboard();
    }
    

    function addMapControl(){
      
	var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
	map.addControl(ctrl_nav);
    
	var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:0});
	map.addControl(ctrl_ove);
   
	var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	map.addControl(ctrl_sca);
    }
    

    var markerArr = [{title:"北京育知同创科技有限公司",content:"校区地址：	北京市昌平区三旗百汇物美大卖场二层（8号线育新地铁站A口北侧100米）<br/>邮编：	100085<br/>咨询热线：	010-82583705<br/>面授课程：	HTML5开发培训课程、Java开发培训课程<br/>附近地铁站：	8号线育新地铁站A口",point:"116.352843|40.068893",isOpen:1,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
		 ];

    function addMarker(){
        for(var i=0;i<markerArr.length;i++){
            var json = markerArr[i];
            var p0 = json.point.split("|")[0];
            var p1 = json.point.split("|")[1];
            var point = new BMap.Point(p0,p1);
			var iconImg = createIcon(json.icon);
            var marker = new BMap.Marker(point,{icon:iconImg});
			var iw = createInfoWindow(i);
			var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
			marker.setLabel(label);
            map.addOverlay(marker);
            label.setStyle({
                        borderColor:"#808080",
                        color:"#333",
                        cursor:"pointer"
            });
			
			(function(){
				var index = i;
				var _iw = createInfoWindow(i);
				var _marker = marker;
				_marker.addEventListener("click",function(){
				    this.openInfoWindow(_iw);
			    });
			    _iw.addEventListener("open",function(){
				    _marker.getLabel().hide();
			    })
			    _iw.addEventListener("close",function(){
				    _marker.getLabel().show();
			    })
				label.addEventListener("click",function(){
				    _marker.openInfoWindow(_iw);
			    })
				if(!!json.isOpen){
					label.hide();
					_marker.openInfoWindow(_iw);
				}
			})()
        }
    }

    function createInfoWindow(i){
        var json = markerArr[i];
        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
        return iw;
    }

    function createIcon(json){
        var icon = new BMap.Icon("../../app.baidu.com/index.htm"/*tpa=http://app.baidu.com/map/images/us_mk_icon.png*/, new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
        return icon;
    }
    initMap();
    $('.beijmap').click(function(){
	    function initMap(){
	        createMap();
	        setMapEvent();
	        addMapControl();
	        addMarker();
	    }
	    

	    function createMap(){
	        var map = new BMap.Map("dituContent");
	        var point = new BMap.Point(116.352677,40.068527);
	        map.centerAndZoom(point,18);
	        window.map = map;
	    }
	    

	    function setMapEvent(){
	        map.enableDragging();
	        map.enableScrollWheelZoom();
	        map.enableDoubleClickZoom();
	        map.enableKeyboard();
	    }
	    

	    function addMapControl(){
	      
		var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
		map.addControl(ctrl_nav);
	    
		var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:0});
		map.addControl(ctrl_ove);
	   
		var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
		map.addControl(ctrl_sca);
	    }
	    

	    var markerArr = [{title:"北京育知同创科技有限公司",content:"校区地址：	北京市昌平区三旗百汇物美大卖场二层（8号线育新地铁站A口北侧100米）<br/>邮编：	100085<br/>咨询热线：	010-82583705<br/>面授课程：	HTML5开发培训课程、Java开发培训课程<br/>附近地铁站：	8号线育新地铁站A口",point:"116.352843|40.068893",isOpen:1,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
			 ];

	    function addMarker(){
	        for(var i=0;i<markerArr.length;i++){
	            var json = markerArr[i];
	            var p0 = json.point.split("|")[0];
	            var p1 = json.point.split("|")[1];
	            var point = new BMap.Point(p0,p1);
				var iconImg = createIcon(json.icon);
	            var marker = new BMap.Marker(point,{icon:iconImg});
				var iw = createInfoWindow(i);
				var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
				marker.setLabel(label);
	            map.addOverlay(marker);
	            label.setStyle({
	                        borderColor:"#808080",
	                        color:"#333",
	                        cursor:"pointer"
	            });
				
				(function(){
					var index = i;
					var _iw = createInfoWindow(i);
					var _marker = marker;
					_marker.addEventListener("click",function(){
					    this.openInfoWindow(_iw);
				    });
				    _iw.addEventListener("open",function(){
					    _marker.getLabel().hide();
				    })
				    _iw.addEventListener("close",function(){
					    _marker.getLabel().show();
				    })
					label.addEventListener("click",function(){
					    _marker.openInfoWindow(_iw);
				    })
					if(!!json.isOpen){
						label.hide();
						_marker.openInfoWindow(_iw);
					}
				})()
	        }
	    }

	    function createInfoWindow(i){
	        var json = markerArr[i];
	        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
	        return iw;
	    }

	    function createIcon(json){
	        var icon = new BMap.Icon("../../app.baidu.com/index.htm"/*tpa=http://app.baidu.com/map/images/us_mk_icon.png*/, new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
	        return icon;
	    }
	    initMap();
    })

/*shenzhen*/
    $('.shenzhenmap').click(function(){
	     function initMap(){
        createMap();//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        addMarker();//向地图中添加marker
    }
    
    //创建地图函数：
    function createMap(){
        var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
        var point = new BMap.Point(113.916484,22.584451);//定义一个中心点坐标
        map.centerAndZoom(point,18);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
    }
    
    //地图事件设置函数：
    function setMapEvent(){
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
    }
    
    //地图控件添加函数：
    function addMapControl(){
        //向地图中添加缩放控件
	var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
	map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
	var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
	map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
	var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	map.addControl(ctrl_sca);
    }
    
    //标注点数组
    var markerArr = [{title:"育知同创科技有限公司",content:"校区地址：	广东省深圳市宝安区创业二路北二巷5号七星创意工场南楼3层<br/>邮编：	518000<br/>咨询热线：	0755—66618850<br/>面授课程：	HTML5开发培训课程、Java开发培训课程</br>附近地铁站：	地铁5号线洪浪北站C出口",point:"113.916525|22.584843",isOpen:1,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
		 ];
    //创建marker
    function addMarker(){
        for(var i=0;i<markerArr.length;i++){
            var json = markerArr[i];
            var p0 = json.point.split("|")[0];
            var p1 = json.point.split("|")[1];
            var point = new BMap.Point(p0,p1);
			var iconImg = createIcon(json.icon);
            var marker = new BMap.Marker(point,{icon:iconImg});
			var iw = createInfoWindow(i);
			var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
			marker.setLabel(label);
            map.addOverlay(marker);
            label.setStyle({
                        borderColor:"#808080",
                        color:"#333",
                        cursor:"pointer"
            });
			
			(function(){
				var index = i;
				var _iw = createInfoWindow(i);
				var _marker = marker;
				_marker.addEventListener("click",function(){
				    this.openInfoWindow(_iw);
			    });
			    _iw.addEventListener("open",function(){
				    _marker.getLabel().hide();
			    })
			    _iw.addEventListener("close",function(){
				    _marker.getLabel().show();
			    })
				label.addEventListener("click",function(){
				    _marker.openInfoWindow(_iw);
			    })
				if(!!json.isOpen){
					label.hide();
					_marker.openInfoWindow(_iw);
				}
			})()
        }
    }
    //创建InfoWindow
    function createInfoWindow(i){
        var json = markerArr[i];
        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
        return iw;
    }
    //创建一个Icon
    function createIcon(json){
        var icon = new BMap.Icon("../../app.baidu.com/index.htm"/*tpa=http://app.baidu.com/map/images/us_mk_icon.png*/, new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
        return icon;
    }
    
    initMap();//创建和初始化地图
    })
})





