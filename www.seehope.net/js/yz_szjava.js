$(function(){
	var aImg = $('[data-src]');
	var winH = window.innerHeight;
	var winScrollTop = $(window).scrollTop();
	
	//随机数
	function rnd(m, n){
	    return Math.floor(Math.random()*(n-m)+m);
	}


	//动画循环
	window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame 
	|| window.oRequestAnimationFrame || window.msRequestAnimationFrame || 
	function(callback) { 
		return window.setTimeout(function() { 
			return callback(Date.now()); 
		}, 1000 / 60);
	});

	window.cancelAnimationFrame || (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || 
	function(timeid) {
		return clearTimeout(timeid); 
	});

	//平面向量计算
	var vector2d = function(x ,y){
	    var vec = {
	        //把x、y保存在对象的vx、vy中
	        vx: x,
	        vy: y,
	        //scale方法可以让我们来放大或缩小向量
	        scale: function(scale){
	            vec.vx *= scale;
	            vec.vy *= scale;
	        },
	        //向量的加法运算
	        add: function(vec2){
	            vec.vx += vec2.vx;
	            vec.vy += vec2.vy;
	        },
	        //向量的减法运算
	        sub: function(vec2){
	            vec.vx -= vec2.vx;
	            vec.vy -= vec2.vy;
	        },
	        //方向取反
	        negate: function(){
	            vec.vx = -vec.vx;
	            vec.vy = -vec.vy;
	        },
	        //获取向量长度
	        length: function(){
	            return Math.sqrt(vec.vx * vec.vx + vec.vy * vec.vy);
	        },
	        //获取向量长度的平方
	        lengthSquared: function(){
	            return vec.vx * vec.vx + vec.vy * vec.vy;
	        },
	        //将向量转化为一个单位向量
	        normalize: function(){
	            var len = Math.sqrt(vec.vx * vec.vx + vec.vy * vec.vy);
	            if(len){
	                vec.vx /=len;
	                vec.vy /=len;
	            }
	            //把向量的长度返回
	            return len;
	        },
	        //向量的旋转
	        rotate: function(angle){
	            var vx = vec.vx,
	                vy = vec.vy,
	                cosVal = Math.cos(angle),
	                sinVal = Math.sin(angle);
	            vec.vx = vx * cosVal - vy * sinVal;
	            vec.vy = vx * sinVal + vy * cosVal;
	        },
	        //toString方法可以把向量以文本形式输出，方便程序调试
	        toString: function(){
	            return '(' + vec.vx.toFixed(3) + ',' + vec.vy.toFixed(3) + ')';
	        }
	    };
	    return vec;
	};

	function BannerAnimate(){
		this.canvas = document.getElementById('banner_ani');
		this.canvas.style.width = '100%';
		this.canvas.style.height = '100%';
		this.canvas.style.position = 'absolute';
		this.canvas.style.top = '0';
		this.canvas.style.left = "0";
		this.ctx = this.canvas.getContext('2d');
		this.w = this.canvas.width = $('.banner').width();
		this.h = this.canvas.height = $('.banner').height();
		this.img = {
			src: 'banner_icon3.png'
			width: 100,
			height: 100
		};
		this.aImg = [];
		this.aSprint = [];
		this.addTimer = null;
		this.timer = null;
		this.init();
	}
	BannerAnimate.prototype = {
		constructor: BannerAnimate,
		init: function(){
			this.loadImg()
		},
		loadImg: function(){
			var img = document.createElement('img');
			var _this = this;
			img.onload = function(){
				_this.aImg.push(this);
				_this.addTime = setInterval(_this.add.bind(_this), 100)
				_this.start();
			}
			img.src = './images/yz_szJava/'+this.img.src;
		},
		add: function(){
			this.aSprint.push({
				img: this.aImg[0],
				w: this.aImg[0].width,
				h: this.aImg[0].height,
				x: rnd(0,this.w),
				y: -100,
				opacity: Math.random(),
				v: vector2d(0, rnd(5, 10)),
				scale: rnd(10, 50)/100,
			})
			//console.log(this.aSprint)
		},
		start: function(){
			timer = requestAnimationFrame(this.animation.bind(this));
		},
		animation: function(){
			this.ctx.clearRect(0,0,this.w, this.h);
			for(var i=0; i<this.aSprint.length; i++){
				this.ctx.globalAlpha = this.aSprint[i].opacity;
				this.ctx.drawImage(this.aSprint[i].img, this.aSprint[i].x, this.aSprint[i].y, this.aSprint[i].w*this.aSprint[i].scale, this.aSprint[i].h*this.aSprint[i].scale);
				this.aSprint[i].y+=this.aSprint[i].v.vy;

				if(this.aSprint[i].y >= this.h-100){
					this.aSprint.splice(i, 1);
					i--;
				}
			}

			timer = requestAnimationFrame(this.animation.bind(this));
		}
	}
	new BannerAnimate();
	//弹幕
	function Barrage(){
		this.stage = document.getElementById('barrage');
		this.txt = [
			'0基础能学懂吗？',
			'学费大概多少？',
			'就业岗位有哪些？',
			'如何申请0元入学？',
			'就业薪资大概多少？',
			'英语/数学不好可以学习吗？',
			'最多可以试学多久？',
			'如何获取免费视频/课程？',
			'转行从0开始学可以吗？',
			'一个班多少人？',
			'学完好找工作吗？',
			'女生适合学习吗？',
			'学完工资一般能拿多少？',
			'晚自习求辅导？',
			'年龄有限制吗？',
			'吃饭住宿怎么办？',
			'你们有哪些校区？',
			'你们包找工作吗？',
			'要学多久 上课时间怎么安排？'
		];
		this.fontSize = [14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
		this.bgc = ['#333', '#ff9900', '#cc0000'];

		this.aTag = [];
		this.addTimer = null;
		this.timer = null;
		this.a = 1;
		this.l1 = 0;
		this.t1 = 0;
		this.init();	
	}
	Barrage.prototype = {
		constructor: Barrage,
		init: function(){
			this.addTag();
			this.start();
			var _this = this;
			setTimeout(function(){
				_this.mousemove();
			}, 500)
		},
		addTag: function(){
			var _this = this;
			this.addTimer = setInterval(function(){
				var ele = $('<a href="http://wpa.qq.com/msgrd?v=3&uin=294008938&site=qq&menu=yes" target="_blank">'+_this.txt[rnd(0, _this.txt.length)]+'</a>');
				var fz = _this.fontSize[rnd(0, _this.fontSize.length)];
				var bg = _this.bgc[rnd(0, _this.bgc.length)];
				var t = rnd(0, 260-32);
				var v = vector2d(-rnd(1, 6), 0);
				_this.aTag.push({
					ele: ele,
					fontSize: fz,
					bgc: bg,
					left: 1700,
					top: t,
					v: v,
					status: 'run'
				})

				ele.css({
					top: t,
					backgroundColor: bg,
					fontSize: fz,
					width: ele.html().length*fz*1.2,
					height: fz*1.5,
					left: 1700,
				})

				_this.stage.appendChild(ele[0]);

			}, 1000)
		},
		start: function(){
			this.timer = requestAnimationFrame(this.animation.bind(this));
		},
		animation: function(){
			for(var i=0; i<this.aTag.length; i++){

				this.aTag[i].ele.css({
					left: this.aTag[i].left
				})

				if(this.aTag[i].status == 'run'){
					this.aTag[i].left+=this.aTag[i].v.vx;
				}

				if(this.aTag[i].left <=-500){
					this.stage.removeChild(this.aTag[i].ele[0])
					this.aTag.splice(i, 1)
					i--;
				}
			}

			this.timer = requestAnimationFrame(this.animation.bind(this));
		},
		mousemove: function(){
			var _this = this;
			this.stage.addEventListener('mousemove', this.fnmove.bind(this), false)
		},
		fnmove: function(ev){
			var src = ev.target;
			if(src.tagName == 'A'){
				this.aTag[$(src).index()].status = 'stop';
			}else{
				for(var i=0; i<this.aTag.length; i++){
					this.aTag[i].status = 'run';
				}
			}
		}
	};


	new Barrage();

	(function(){
		var cur = 0;

		$('.btn_l_01').click(function(){
			cur--;
			if(cur == -1){
				cur = $('.tab1_cont li').length-1;
			}
			$('.tab1_cont li').removeClass('active')
			$('.tab1_cont li').eq(cur).addClass('active')
		})
		$('.btn_r_01').click(function(){
			cur++;
			if(cur == $('.tab1_cont li').length){
				cur = 0;
			}
			$('.tab1_cont li').removeClass('active')
			$('.tab1_cont li').eq(cur).addClass('active')
		})

	})();

	(function(){
		var cur = 0;

		$('.btn_l_05').click(function(){
			cur--;
			if(cur == -1){
				cur = $('.tab5_cont li').length-1;
			}
			$('.tab5_cont li').removeClass('active')
			$('.tab5_cont li').eq(cur).addClass('active')
		})
		$('.btn_r_05').click(function(){
			cur++;
			if(cur == $('.tab5_cont li').length){
				cur = 0;
			}
			$('.tab5_cont li').removeClass('active')
			$('.tab5_cont li').eq(cur).addClass('active')
		})

	})();

	$('.tab2_btn li').each(function(index, el) {
		$(this).mouseenter(function(event) {
			/* Act on the event */
			$('.tab2_btn li').removeClass('active')
			$(this).addClass('active')
			$('.tab2_cont li').removeClass('active')
			$('.tab2_cont li').eq(index).addClass('active')
		});		
	});

	new WOW().init();

	//

	//图片懒加载
	setTimeout(function(){
		lazyLoadImg()
	}, 100)


	// $(window).scroll(function(){
	// 	winScrollTop = $(window).scrollTop();
	// 	lazyLoadImg()
	// })

	function lazyLoadImg(){
		for(var i=0; i<aImg.length; i++){
			if(aImg[i].tagName == 'IMG'){
				aImg[i].src= 'http://www.seehope.net/images/yz_szJava/'+aImg.eq(i).attr('data-src');
			}else{
				//console.log(aImg.eq(i).css('backgroundImage'))
				if(aImg.eq(i).css('backgroundImage') == 'none'){
					aImg.eq(i).css({
						backgroundImage:  'url(http://www.seehope.net/images/yz_szJava/'+aImg.eq(i).attr('data-src')+')'
					})

				}
			}
		}
	}
})