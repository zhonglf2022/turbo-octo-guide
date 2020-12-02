$(function(){
	alert('ces');
	var aImg = $('[data-src]');
	var winH = window.innerHeight;
	var winScrollTop = $(window).scrollTop();

	//锟斤拷锟斤拷锟�
	
	function rnd(m, n){
	    return Math.floor(Math.random()*(n-m)+m);
	}


	//锟斤拷锟斤拷循锟斤拷
	
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

	//平锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷
	var vector2d = function(x ,y){
	    var vec = {
	        //锟斤拷x锟斤拷y锟斤拷锟斤拷锟节讹拷锟斤拷锟絭x锟斤拷vy锟斤拷
	        vx: x,
	        vy: y,
	        //scale锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟脚达拷锟斤拷锟叫★拷锟斤拷锟�
	        scale: function(scale){
	            vec.vx *= scale;
	            vec.vy *= scale;
	        },
	        //锟斤拷锟斤拷锟侥加凤拷锟斤拷锟斤拷
	        add: function(vec2){
	            vec.vx += vec2.vx;
	            vec.vy += vec2.vy;
	        },
	        //锟斤拷锟斤拷锟侥硷拷锟斤拷锟斤拷锟斤拷
	        sub: function(vec2){
	            vec.vx -= vec2.vx;
	            vec.vy -= vec2.vy;
	        },
	        //锟斤拷锟斤拷取锟斤拷
	        negate: function(){
	            vec.vx = -vec.vx;
	            vec.vy = -vec.vy;
	        },
	        //锟斤拷取锟斤拷锟斤拷锟斤拷锟斤拷
	        length: function(){
	            return Math.sqrt(vec.vx * vec.vx + vec.vy * vec.vy);
	        },
	        //锟斤拷取锟斤拷锟斤拷锟斤拷锟饺碉拷平锟斤拷
	        lengthSquared: function(){
	            return vec.vx * vec.vx + vec.vy * vec.vy;
	        },
	        //锟斤拷锟斤拷锟斤拷转锟斤拷为一锟斤拷锟斤拷位锟斤拷锟斤拷
	        normalize: function(){
	            var len = Math.sqrt(vec.vx * vec.vx + vec.vy * vec.vy);
	            if(len){
	                vec.vx /=len;
	                vec.vy /=len;
	            }
	            //锟斤拷锟斤拷锟斤拷锟侥筹拷锟饺凤拷锟斤拷
	            return len;
	        },
	        //锟斤拷锟斤拷锟斤拷锟斤拷转
	        rotate: function(angle){
	            var vx = vec.vx,
	                vy = vec.vy,
	                cosVal = Math.cos(angle),
	                sinVal = Math.sin(angle);
	            vec.vx = vx * cosVal - vy * sinVal;
	            vec.vy = vx * sinVal + vy * cosVal;
	        },
	        //toString锟斤拷锟斤拷锟斤拷锟皆帮拷锟斤拷锟斤拷锟斤拷锟侥憋拷锟斤拷式锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟�
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
			src: 'banner_icon3.png',
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
			img.src = './images/'+this.img.src;
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
	//锟斤拷幕
	function Barrage(){
		this.stage = document.getElementById('barrage');
		this.txt = [
			'0锟斤拷锟斤拷学锟斤拷锟斤拷',
			'学锟窖达拷哦锟斤拷伲锟�,
			'锟斤拷业锟斤拷位锟斤拷锟斤拷些锟斤拷',
			'锟斤拷锟斤拷锟斤拷锟�元锟斤拷学锟斤拷',
			'锟斤拷业薪锟绞达拷哦锟斤拷伲锟�,
			'英锟斤拷/锟斤拷学锟斤拷锟矫匡拷锟斤拷学习锟斤拷',
			'锟斤拷锟斤拷锟斤拷锟斤拷学锟斤拷茫锟�,
			'锟斤拷位锟饺★拷锟斤拷锟斤拷频/锟轿程ｏ拷',
			'转锟叫达拷0锟斤拷始学锟斤拷锟斤拷锟斤拷',
			'一锟斤拷锟斤拷锟斤拷锟斤拷耍锟�,
			'学锟斤拷锟斤拷夜锟斤拷锟斤拷锟�,
			'女锟斤拷锟绞猴拷学习锟斤拷',
			'学锟疥工锟斤拷一锟斤拷锟斤拷锟矫讹拷锟劫ｏ拷',
			'锟斤拷锟斤拷习锟襟辅碉拷锟斤拷',
			'锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷锟斤拷',
			'锟皆凤拷住锟斤拷锟斤拷么锟届？',
			'锟斤拷锟斤拷锟斤拷锟斤拷些校锟斤拷',
			'锟斤拷锟角帮拷锟揭癸拷锟斤拷锟斤拷',
			'要学锟斤拷锟�锟较匡拷时锟斤拷锟斤拷么锟斤拷锟脚ｏ拷'
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

	//图片锟斤拷锟斤拷锟斤拷
	setTimeout(function(){
		lazyLoadImg()
	}, 100)


	// $(window).scroll(function(){
	// 	winScrollTop = $(window).scrollTop();
	// 	lazyLoadImg()
	// })

	
})