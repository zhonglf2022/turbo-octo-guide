/**
 * Created by Administrator on 2016/6/24.
 */
//uelike.com

// ;(function(c){
//     c(function(){
//         var scroller = new Scroller(c('#overview'));
//             scroller.init();
//             c('.banner-wrap').parallax();
//             c('.web-1').parallax();
//             c(".web-3").parallax();
//             c(".web-4").parallax();
//             c(".web-6").parallax();
//             c(".web-9").parallax();
//             c(".web-11").parallax();
//             c(".web-12").parallax();
//             c(".web-14").parallax();
//             c("#members").parallax();
//             c(".web-20").parallax();
      
//     });
// })(jQuery);

(function(){
    function Init(btn,list){
        this.btn=btn;
        this.list=list;
        this.btn.first().addClass("active");
        this.list.hide().first().show();
        this.showBox();
    }
    Init.prototype={
        showBox:function(){
            var that=this;
            this.btn.each(function(index){
                $(this).on("mouseover",function(){

                    $(this).addClass("active").siblings().removeClass("active");
                    that.list.hide();
                    that.list.eq(index).show();
                });

            })
        }
    };
    var showBox2=new Init($(".web-4-tp a"),$(".web4-list"));
    showBox2.showBox();
    var showBox3=new Init($(".web-14-btn2 a"),$(".web2-14-list"));
    showBox3.showBox();
    var showBox4=new Init($(".web-12-btn a"),$(".web-12-list1"));
    showBox4.showBox();
    var showBox5=new Init($(".i_course_tp a"),$(".i_course-list"));
    showBox5.showBox();
    var showBox6=new Init($(".web-14-btn3 a"),$(".web1-14-list"));
    showBox6.showBox();

})();
/*表格滚动封装*/
;(function($,window,document,undefined){
    var Init=function(opt){
        this.defaults={
            "$oWrap":null,
            "$scrollBox":null,
            "$firstList":null
        };
        this.settings= $.extend({},this.defaults,opt);
        this.n=0;
        this.timer=null;
        this.firstiH=this.settings.$firstList.outerHeight(true);
    };

    Init.prototype={
        scrollBox:function(){
            var that=this;
            doMove();
            function doMove(){
                that.settings.$oWrap[that.timer]=setInterval(function(){
                    that.n++;
                    if(that.n>that.firstiH){
                        that.n=0;
                        that.settings.$scrollBox.append(that.settings.$scrollBox.find("tr").first());
                    }
                    that.settings.$scrollBox.css("top",-that.n);
                },30);
            }
            this.settings.$oWrap.hover(function(){
                clearInterval(that.settings.$oWrap[that.timer]);
            },function(){
                doMove();
            });
        }
    };

    $.fn.tableScroll=function(options){
        var scrollx=new Init(options);
        return scrollx.scrollBox();
    }
})(jQuery,window,document);

$(".web-6-tab2").tableScroll({
    "$oWrap":$(".web-6-tab2"),
    "$scrollBox":$(".web-6-tab2").find("table"),
    "$firstList":$(".web-6-tab2").find("tr")
});

$(".web-161130>div").tableScroll({
    "$oWrap":$(".web-161130>div"),
    "$scrollBox":$(".web-161130>div").find("table"),
    "$firstList":$(".web-161130>div").find("tr")
});

/*项目实训*/
(function(){
  function Init(preBtn,nextBtn,aLi,aTxt){
      this.preBtn=preBtn;
      this.nextBtn=nextBtn;
      this.aLi=aLi;
      this.aTxt=aTxt;
      this.delay=true;
      this.MoveTime=500;

      this.arr=[
              {width:275,height:484,left:80,top:154,"z-index":5,opacity:1},
              {width:337,height:602,left:430,top:95,"z-index":6,opacity:1,iT:true},
              {width:275,height:484,left:842,top:154,"z-index":5,opacity:1},
              {width:200,height:400,left:462,top:138,"z-index":2,opacity:0}
      ];
      this.eachLi();
  }
    Init.prototype={
        constructor:Init,
        change:function(){
            this.preBtnFn();
            this.nextBtnFn();
        },
        preBtnFn:function(){
            var that=this;
            this.preBtn.on("click",function(){
                if(that.delay){
                    that.delay=false;
                    that.arr.unshift(that.arr.pop());
                    that.eachLi();
                }
            });
        },
        nextBtnFn:function(){
            var that=this;
            this.nextBtn.on("click",function(){
                if(that.delay){
                    that.delay=false;
                    that.arr.push(that.arr.shift());
                    that.eachLi();
                }
            });
        },
        eachLi:function(){
            var that=this;
            for(var i=0;i<this.arr.length;i++){

                (function(i){
                    that.aTxt.animate({"bottom":-120},100);
                    that.aLi.eq(i).animate(that.arr[i],that.MoveTime,function(){
                        if(that.arr[i].iT){
                            that.aTxt.eq(i).animate({"bottom":0},250);
                        }
                        that.delay=true;
                    });

                })(i);
            }
        }
    };

    var base=new Init($("#preBtn2"),$("#nextBtn2"),$("#pic-wrap2 li"),$("#pic-wrap2 .change-txt"));   //APP
    base.change();
    var base=new Init($("#preBtn3"),$("#nextBtn3"),$("#pic-wrap3 li"),$("#pic-wrap3 .change-txt"));   //微信
    base.change();
})();

/*实训项目-pc*/
(function(){
    function MovePic(oUl,aBtn){
        this.oUl=oUl;
        this.aBtn=aBtn;
        this.aLi=this.oUl.find("li");
        this.delayTime=2500;
        this.moveTime=300;
        this.timer=null;
        this.iWidth= 880; //this.aLi.first().width();
        this.aBtn.first().addClass("active");
        this.iLen=this.aBtn.length;
        this.n=0;
    }
    MovePic.prototype={
        constructor:MovePic,
        move:function(){

            this.setInter();
            this.btnMove();
        },
        btnMove:function(){
            var that=this;
            this.aBtn.each(function(index){
                $(this).on("mouseover",function(){
                    clearInterval(that.timer);
                    that.n=index;
                    that.baseMove();
                });
                $(this).on("mouseout",function(){
                    that.setInter();
                });
            });
        },
        setInter:function(){
            var that=this;
            this.timer=setInterval(function(){
                that.n++;
                if(that.n>that.iLen-1){
                    that.n=0;
                }

                that.baseMove();
            },this.delayTime);
        },
        baseMove:function(){
            this.oUl.animate({"left":-this.iWidth*this.n},this.moveTime);
            this.aBtn.eq(this.n).addClass("active").siblings().removeClass("active");
        }
    };
    var base=new MovePic($("#pic-move ul"),$(".pic-move-btn a"));
    base.move();
})();

//banner

// (function(){

//     function Particle(x, y, radius) {
//         this.init(x, y, radius);
//     }

//     Particle.prototype = {

//         init : function(x, y, radius) {

//             this.alive = true;

//             this.radius = radius || 10;
//             this.wander = 0.15;
//             this.theta = random(TWO_PI);
//             this.drag = 0.92;
//             this.color = '#fff';

//             this.x = x || 0.0;
//             this.y = y || 0.0;

//             this.vx = 0.0;
//             this.vy = 0.0;
//         },

//         move : function() {

//             this.x += this.vx;
//             this.y += this.vy;

//             this.vx *= this.drag;
//             this.vy *= this.drag;

//             this.theta += random(-0.5, 0.5) * this.wander;
//             this.vx += sin(this.theta) * 0.1;
//             this.vy += cos(this.theta) * 0.1;

//             this.radius *= 0.96;
//             this.alive = this.radius > 0.5;
//         },

//         draw : function(ctx) {

//             ctx.beginPath();
//             ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
//             ctx.fillStyle = this.color;
//             ctx.fill();
//         }
//     };


//     var MAX_PARTICLES = 280;
//     var COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900',
//         '#FF4E50', '#F9D423' ];

//     var particles = [];
//     var pool = [];

//     var moveMs = Sketch.create({
//         container : document.getElementsByClassName('banner-wrap')[0]
//     });

//     moveMs.setup = function() {

//         // Set off some initial particles.
//         var i, x, y;

//         //  for ( i = 0; i < 20; i++ ) {
//         x = (moveMs.width * 0.5) + random(-100, 100);
//         y = (moveMs.height * 0.5) + random(-100, 100);
//         moveMs.spawn(0, 999);
//         // }
//     };

//     moveMs.spawn = function(x, y) {

//         if (particles.length >= MAX_PARTICLES)
//             pool.push(particles.shift());

//         particle = pool.length ? pool.pop() : new Particle();
//         //particle.init(x, y, random(5, 10));

//         particle.wander = random(0.5, 2.0);
//         particle.color = random(COLOURS);
//         particle.drag = random(0.9, 0.99);

//         theta = random(TWO_PI);
//         force = random(2, 8);

//         particle.vx = sin(theta) * force;
//         particle.vy = cos(theta) * force;

//         particles.push(particle);
//     };

//     moveMs.update = function() {

//         var i, particle;

//         for (i = particles.length - 1; i >= 0; i--) {

//             particle = particles[i];

//             if (particle.alive)
//                 particle.move();
//             else
//                 pool.push(particles.splice(i, 1)[0]);
//         }
//     };

//     moveMs.draw = function() {

//         moveMs.globalCompositeOperation = 'lighter';

//         for ( var i = particles.length - 1; i >= 0; i--) {
//             particles[i].draw(moveMs);
//         }
//     };

//     moveMs.mousemove = function() {

//         var particle, theta, force, touch, max, i, j, n;

//         for (i = 0, n = moveMs.touches.length; i < n; i++) {

//             touch = moveMs.touches[i], max = random(1, 4);
//             for (j = 0; j < max; j++) {
//                 moveMs.spawn(touch.x, touch.y);
//             }

//         }
//     };

// })();


(function(a) {
    a(function() {
        a.extend({}, {
            curI: 0,
            curG: 0,
            goToLock: !0,
            introImgList: []
        });
        var c;
        a.YZJY = function(b) {
            c = a.extend({}, b);
            c.init()
        };
        a.YZJY({
            w: function() {
                return a(window).width()
            },
            h: function() {
                return a(window).height()
            },

            btn: function() {
                a.fn.bouncy = function(b) {
                    var c = c || {
                                x: 0,
                                y: 0,
                                onMove: function(a) {
                                    this.x = a.clientX;
                                    this.y = a.clientY
                                }
                            },
                        e = a(this),
                        f = e.attr("data-bgColor"),
                        g = e.offset().top,
                        k = e.offset().left,
                        h = e.width(),
                        r = e.height(),
                        p = e.attr("data-bgColor"),
                        l = e.attr("data-bgHover"),
                        n = e.attr("data-radius"),
                        m = e.attr("data-ratio"),
                        t = e.attr("data-vertext"),
                        q = e.attr("data-spring"),
                        y = e.attr("data-friction"),
                        w = !0,
                        f = {
                            bg: f,
                            top: g,
                            left: k,
                            width: h,
                            height: r,
                            bgColor: p,
                            hover: l,
                            radius: n,
                            ratio: m,
                            vertext: t,
                            spring: q,
                            friction: y
                        };
                    e.on("mousemove", c.onMove.bind(c)).on("mouseleave", function() {
                        c.x = 0;
                        c.y = 0
                    });
                    b = a.extend(f, b);
                    var s = a("<canvas></canvas>").prependTo(e)[0],
                        z = s.getContext("2d");
                    s.width = b.width;
                    s.height = b.height;
                    s.style.top = "0px";
                    s.style.left = "0px";
                    s.style.position = "absolute";
                    var v = {
                            x: 0,
                            y: 0,
                            ox: 0,
                            oy: 0,
                            maxX: 0,
                            maxY: 0,
                            targetX: 0,
                            targetY: 0,
                            dist: 0,
                            maxDist: 0,
                            velocityX: 0,
                            velocityY: 0,
                            update: function(a, c) {
                                var d = a - this.ox,
                                    l = c - this.oy;
                                this.dist = Math.sqrt(d * d + l * l);
                                this.dist < this.maxDist ? (d = 1 - this.dist / this.maxDist, this.targetX = this.ox + (this.maxX - this.ox) * d, this.targetY = this.oy + (this.maxY - this.oy) * d) : (this.targetX = this.ox, this.targetY = this.oy);
                                this.velocityX += (this.targetX - this.x) * b.spring;
                                this.velocityX *= b.friction;
                                this.x += this.velocityX;
                                this.velocityY += (this.targetY - this.y) * b.spring;
                                this.velocityY *= b.friction;
                                this.y += this.velocityY
                            }
                        },
                        f = function() {
                            this.ctx = z;
                            this.vertext = b.vertext || 50;
                            this.radius = b.radius || 40;
                            this.vertices = [];
                            for (var a = b.ratio * this.radius, c = this.angle = 0; c < this.vertext; c++) {
                                var d = Object.create(v);
                                d.x = d.ox = d.targetX = this.radius * Math.cos(2 * Math.PI / b.vertext * c) + b.width / 2;
                                d.y = d.oy = d.targetY = this.radius * Math.sin(2 * Math.PI / b.vertext * c) + b.width / 2;
                                d.maxX = a * Math.cos(2 * Math.PI / b.vertext * c) + b.width / 2;
                                d.maxY = a * Math.sin(2 * Math.PI / b.vertext * c) + b.width / 2;
                                d.maxDist = a;
                                this.vertices[c] = d
                            }
                        };
                    f.prototype.draw = function(c, d) {
                        var l = c - this.x,
                            k = d - this.y,
                            g = b.width / 2 - l,
                            h = b.height / 2 - k,
                            f = Math.sqrt(g * g + h * h),
                            g = Math.atan2(g, h);
                        w = f < b.radius * b.ratio ? !0 : !1;
                        var n = this,
                            m = this.ctx;
                        a(window).on("resize", function() {
                            b.top = n.y = e.offset().top;
                            b.left = n.x = e.offset().left
                        });
                        m.clearRect(0, 0, b.width, b.height);
                        m.fillStyle = b.bgColor;
                        w ? (m.fillStyle = b.hover, s.style.cursor = "pointer", this.angle = g) : (s.style.cursor = "", this.angle = 0);
                        m.beginPath();
                        this.vertices.forEach(function(a) {
                            a.update(l, k);
                            m.lineTo(a.x, a.y)
                        });
                        m.closePath();
                        m.fill()
                    };
                    var u = new f;
                    (function A() {
                        requestAnimationFrame(A);
                        u.draw(c.x, c.y);
                        u.x = k = e.offset().left;
                        u.y = g = e.offset().top;
                        u.onRender && u.onRender(this)
                    })();
                    return u
                };
                a(".btn-bouncy").each(function() {
                    var c = a(this);
                    c.bouncy();
                    c.on("click", function(a) {
                        a.preventDefault()
                    })
                })
            },
            init: function() {
                c.btn();
                c.works();
                c.members();
            },

            works: function() {
                var b = a("#works"),
                    d = a(".works-ct");

                b.on("mousemove", function(a) {
                    var b = a.clientY - c.h() / 2;
                    a = a.clientX - c.w() / 2;
                    TweenLite.to(d, 1.6, {
                        css: {
                            rotationX: b / -20,
                            rotationY: a / 30
                        },
                        ease: Expo.easeOut
                    })
                }).on("mouseleave", function() {
                    TweenLite.to(d, 1.2, {
                        css: {
                            rotationX: 0,
                            rotationY: 0
                        },
                        ease: Expo.easeOut
                    })
                });
                c.works.inview = function() {
                    a("#works").parallax("enable")
                };
                c.works.negative = function() {
                    a("#works").parallax("disable")
                }
            },
            members: function() {
                var b = a("#members-preview"),
                    d = b.find("ul"),
                    e = b.find("http://www.seehope.net/html5/js/.members-btn.prev"),
                    f = b.find("http://www.seehope.net/html5/js/.members-btn.next"),
                    g = !0;
                e.click(function() {
                    if (g) {
                        g = !1;
                        b.find(".members-item:not(:eq(2))").removeClass("left").removeClass("right").removeClass("current");
                        var c = a("#members-preview ul li.members-item:last").clone();
                        a("#members-preview ul li.members-item:last").remove();
                        d.prepend(c);
                        TweenLite.set(d, {
                            x: -305
                        });
                        b.find(".members-item:eq(0)").addClass("left");
                        b.find(".members-item:eq(1)").addClass("current");
                        b.find(".members-item:eq(2)").addClass("right");
                        TweenLite.to(d, 0.6, {
                            x: 0,
                            ease: Cubic.easeInOut,
                            force3D: !0,
                            onComplete: function() {
                                g = !0
                            }
                        })
                    }
                });
                f.click(function() {
                    if (g) {
                        g = !1;
                        b.find(".members-item:not(:first)").removeClass("left").removeClass("right").removeClass("current");
                        var c = a("#members-preview ul li.members-item:first").clone();
                        b.find(".members-item:last").after(c);
                        b.find(".members-item:eq(1)").addClass("left");
                        b.find(".members-item:eq(2)").addClass("current");
                        b.find(".members-item:eq(3)").addClass("right");
                        TweenLite.to(d, 0.6, {
                            x: -305,
                            ease: Cubic.easeInOut,
                            force3D: !0,
                            onComplete: function() {
                                TweenLite.set(d, {
                                    x: 0
                                });
                                a("#members-preview .members-item:first").remove();
                                g = !0
                            }
                        })
                    }
                });
                (function() {
                    a(document).on("mouseenter", "#members-preview .left", function() {
                        a("#members-preview li").removeClass("l").removeClass("c").removeClass("r");
                        a(this).addClass("c");
                        a(".current").addClass("r")
                    }).on("mouseleave", "#members-preview .left", function() {
                        a("#members-preview li").removeClass("l").removeClass("c").removeClass("r")
                    });
                    a(document).on("mouseenter", "#members-preview .right", function() {
                        a("#members-preview li").removeClass("l").removeClass("c").removeClass("r");
                        a(this).addClass("c");
                        a(".current").addClass("l")
                    }).on("mouseleave", "#members-preview .right", function() {
                        a("#members-preview li").removeClass("l").removeClass("c").removeClass("r")
                    })
                })();
                e.trigger("click");
                c.members.inview = function() {
                    a("#members").parallax("enable")
                };
                c.members.negative = function() {
                    a("#members").parallax("disable")
                }
            }
        });

    })
})(jQuery);
/*运动效果*/
jQuery.extend(jQuery.easing,{
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    }
});







