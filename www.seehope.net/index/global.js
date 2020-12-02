var Common = new Object();
function fill_zero(int) {
    return int < 10 ? "0" + int : int;
}
function get_date_int(date) {
    date || (date = "");
    if (date.indexOf("-") > 0) return Date.parse(date.replace("-", "/").replace("-", "/"));
    if (date.indexOf("/") > 0) {
        var Arr = date.split("/"), d = Arr[2] + "/" + Arr[1] + "/" + Arr[0];
        return Date.parse(d);
    }
    return Date.parse(new Date);
}
function get_timer_randow(){
    return Math.ceil(Math.random()* 3210);
}
function isPoneAvailable(str) {
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    return !myreg.test(str) ? false : true;
}
//解决IE8不兼容isArray函数问题
if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
if(typeof(G) == 'undefined') var G = {};
G.func = {
    tableScrollUp:function(e){
        var table = $(e+'>table');
        var maxH = table.height();
        var tableBody = $(e+' tbody');
        var html = tableBody.html();
        tableBody.html(html+html);
        var n = 0;
        setInterval(function(){
            n++;
            if(n>maxH){
                n = 0;
            }
            table.css({
                top: -n
            })
        }, 30);
    },
    navTabSlide:function(ne,ce,func){
        $(ne).children().each(function(idx,ele){
            (function(i){
                $(ele).mouseover(function(){
                    var that = this;
                    $(ne).children('.active').removeClass('active');
                    $(that).addClass('active');
                    $(ce).children().hide();
                    $(ce).children().eq(i).show();
                    if (typeof(func) == 'function') func(i);
                });
            })(idx);
        });
    },
    commonSwiper:function(c,p,o){
        var swiperConfig = {
            autoplay : 5000,
            loop : false,
            effect: 'fade',
            lazyLoading : true,
            onInit: function(){}
        };
        if(p){
            swiperConfig.pagination = p;
            swiperConfig.paginationClickable = true;
            swiperConfig.autoplayDisableOnInteraction = false;
        }
        if (o){
            swiperConfig.onSlideChangeEnd = o;
        }
        return new Swiper(c,swiperConfig);
    },
    bannerSwiper:function(c,p,o){
        var con = c || "#banner_swiper";
        var pagination = p;
        var endEcent = o || "";
        this.commonSwiper(con,pagination,endEcent);
    },
    timeCountDown:function(e,r){
        if(!e) return;
        var eInt = get_date_int(e);
        var nInt = Date.parse(new Date());
        var difTimeInt = eInt - nInt - r * 5210;
        if(difTimeInt < 0) return {c:0,d:0,h:0,m:0,s:0};
        difTimeInt = difTimeInt / 1000;
        return {
            c:1,
            d:Math.floor((difTimeInt / 3600) / 24),
            h:Math.floor((difTimeInt / 3600) % 24),
            m:Math.floor((difTimeInt / 60) % 60),
            s:Math.floor(difTimeInt % 60)
        }
    },
    getSpeTimeHtml:function(obj){
        if(!obj)  return {};
        return "距离开班 <em>" + obj.d + "</em>天 <em>" + obj.h + "</em>时 <em>" + obj.m + "</em>分 <em>" + obj.s + "</em>秒";
    },
    getSpeStatusHtml:function(status){
        return "<span class=\""+ (!status ? "course-full" : "course-processing") + "\">"+ (!status ? "爆满已开班" : "火热报名中")+"</span>";
    },
    speFillSpan:function(idx,obj){
        var that = this;
        var tHtml = that.getSpeTimeHtml(obj);
        var sHtml = that.getSpeStatusHtml(obj.c);
        $(".course-countdown-"+idx).html(tHtml);
        $(".course-status-"+idx).html(sHtml);
    },
    speTimeCountDown:function(e,idx,f){
        var mathc = get_timer_randow();
        (function(gfunc){
            var first = gfunc.timeCountDown(e,mathc);
            if(first){
                if(!first.c){
                    setTimeout(function(){
                        gfunc.speFillSpan(idx,first);
                    },1000);
                }else{
                    setInterval(function () {
                        var obj = gfunc.timeCountDown(e,mathc);
                        gfunc.speFillSpan(idx,obj);

                        if (typeof(f) == 'function') f(obj.c);
                    }, 1000);
                }
            }
        })(this);
    },
    speLiHtml:function(aObj,cIdx){
        return "<li>" +
            "<span class=\"course-name\">"+ aObj.name +"</span>" +
            "<span class=\"course-time\">"+ aObj.time + "</span>" +
            "<span class=\"course-status course-status-"+ cIdx+"\"></span>" +
            "<span class=\"course-countdown course-countdown-"+ cIdx+"\"></span>" +
            "<a href=\"http:\/\/dkb.duokebo.com\/webchat\/chat.aspx?siteid=960355\">在线报名</a>" +
            "</li>";
    },
    speInit:function(data){
        var that = this;
        var html = "";
        $.each(data,function(key,val){
             html += "<ul class=\"course-list-item\">";
            $.each(val.fullday,function(idx,info){
                html += that.speLiHtml(info,''+key+idx);
                that.speTimeCountDown(info.time,''+key+idx);
            });
            html += "</ul>";
        });
        $(".special-course-times-list").html(html);
    },
    courseAHtml:function (cObj) {
        var timeStatus = this.timeIsExpired(cObj.time);
        return '<a href="javascript:;">' +
            '<p class="fl">' +
            '<span class="course-name">【'+ cObj.place +'】'+ cObj.name + '</span>' +
            '<span class="course-time">'+ (cObj.time).substr(5,5) +'</span>' +
            '</p>' +
            ' <span class="course-status bgc' + (timeStatus  ? '3688ff' : 'ff0000') + '">' + (timeStatus ? '开班' : '抢座') + '</span>' +
            '</a>';
    },
    comCdataToHtml:function(data) {
        var that = this;
        var html = "";
        $.each(data,function(idx,info){
            html += that.courseAHtml(info);
        });
        return html;
    },
    timeIsExpired:function(time){
        if(!time) return ;
        if(time.indexOf('-')){
            time.replace('/-/g','/');
        }
        return new Date(time).getTime() > new Date().getTime() ? 0 : 1;
    },
    addFavorite:function() {
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
    },
    idefSlide:function (ele){
        var marginWidth = Number($(ele).find('li').css('margin-right').replace('px',''));
        var eleWidth = $(ele).find('li').width()+marginWidth;
        var maxL = Math.floor(($(ele).width()-1200)/eleWidth);

        var dir = 1;
        var timer = null;

        var l = 0;
        timer = setInterval(function(){
            l+=dir;
            $(ele).css({
                "-webkit-transform": "translateX(-"+l*eleWidth+"px)",
                "-moz-transform": "translateX(-"+l*eleWidth+"px)",
                "-ms-transform": "translateX(-"+l*eleWidth+"px)",
                "transform": "translateX(-"+l*eleWidth+"px)"
            },500);
            if(l>=maxL){
                l = maxL;
                dir*=-1;
            }
            if(l<=0){
                l = 0;
                dir*=-1;
            }
        }, 3000);
    },
    fixedNavAd:function(ele){
        var timeCount = 0;
        $(ele).delegate('.close','click',function(){
            timeCount++;
            $(ele).hide();

            setTimeout(function(){
                if(timeCount < 3){
                    $(ele).show();
                }
            },5*1000);
        });
    },
    clickCustomerEvent:function(){
        //点击链接或者图片打开客服
        Detector.floatclick();
        return false;
    },
    backToTop:function(){
        $(window).scroll(function(){
            if ($(window).scrollTop()>100){
                $("#back-to-top").fadeIn(1500);
            }
            else
            {
                $("#back-to-top").fadeOut(1500);
            }
        });
        //当点击跳转链接后，回到页面顶部位置
        $("#back-to-top").click(function(){
            //$('body,html').animate({scrollTop:0},1000);
            if ($('html').scrollTop()) {
                $('html').animate({ scrollTop: 0 }, 1000);
                return false;
            }
            $('body').animate({ scrollTop: 0 }, 1000);
            return false;
        });
    },
    baiduAnalysis:function(){
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "../../hm.baidu.com/hm.js-a54a64bd033ef1227f8e231d423b5f68"/*tpa=https://hm.baidu.com/hm.js?a54a64bd033ef1227f8e231d423b5f68*/;
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    }
}
