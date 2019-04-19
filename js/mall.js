//当鼠标放在导航条上时
//在地址上
$('.location,.city').hover(
	function() {
		var locatOffset = $('.location').offset();//获取位置top和left
		$('.city').show();//鼠标悬浮时候显示
		$('.city').css('left', locatOffset.left + "px");
		$('.city').css('top', (locatOffset.top+35) + "px");
		$('.location').addClass("nav-pull-down-action");
	},
	function(){
		$('.city').hide();
		$('.location').removeClass("nav-pull-down-action");//与下面方法一致
	}
);

//在我的商城上
$('.my-shop,.my-shop-panel').hover(
	function(){
		var locatOffset = $('.my-shop').offset();//与下方一致，获取top和left
		$('.my-shop-panel').show();//显示
		$('.my-shop-panel').css('left', locatOffset.left + "px");
		$('.my-shop-panel').css('top', (locatOffset.top+35) + "px");//显示在下面一点
		$('.my-shop').addClass("nav-pull-down-action");//悬浮的时候给myshop添加此class属性//即改为白色
		$('.my-shop').children('a').css("border-left", "1px solid #fff");
	},
	function(){
		$('.my-shop-panel').hide();//没有悬浮则隐藏
		$('.my-shop').children('a').css("border-left", "1px solid #ccc");//改为原先的灰白色
		$('.my-shop').removeClass("nav-pull-down-action");
	});

//幻灯片
var nowKey = 1;//默认幻灯片在第1页图片上面
$('.carousel_img[name=1]').show();//把图片显示出来
$('.icon i[name=1]').css("color", "#f00");//小圆点设置红色
objTime = setInterval(Carousel,2500);//设置函数间隔


// 幻灯片
function Carousel() {
	var forKey = 1;
	nowKey++;
	//便利img标签
	$('.carousel_img').each(function(){
		//如果已显示
		if (!$(this).is(":hidden") && (nowKey-1) == forKey) {
			if (nowKey == 6) {//如果是第5页图片的时候初始化
				nowKey = 1;
				$('.carousel_img[name=1]').fadeIn(800);//
				console.log(nowKey);//控制台调试使用
			}else{
				$(this).next('img').fadeIn(800);//否则当前图片的下面一张淡入
			}
			$(this).fadeOut(800);//淡出，进入for-each循环
		}
		forKey++;
	});
	//下面红点跟着幻灯片动
	if (nowKey == 1) {
		$(".icon i[name=1]").css("color", "#f00");
		$(".icon i[name=5]").css("color", "#fff");//初始化的时候初始化最后一个红色圆点也初始化，不然一直为红色
	}else{
		$(".icon i[name="+nowKey+"]").css("color", "#f00");
		$(".icon i[name="+(nowKey-1)+"]").css("color", "#fff");
	}
}

//鼠标放在幻灯片上面暂停播放
$('.slide').hover(
	function(){
		clearInterval(objTime);
		$('.prevNext').show();
	},
	function(){
		objTime = setInterval(Carousel,2500);
		$('.prevNext').hide();
	}
);

//点击幻灯片的小圆点
$('.icon i').hover(function(){
		//先消失
		tempKey = parseInt($(this).attr("name"));
		$(".icon i[name="+nowKey+"]").css("color", "#fff");
		//如果选中的和上一个不一样时
		if (tempKey != nowKey)
			$(".carousel_img[name="+nowKey+"]").fadeOut(800);
		nowKey =tempKey; 
		//再出现
		$(this).css("color", "#f00");
		$(".carousel_img[name="+nowKey+"]").fadeIn(800);
		console.log(nowKey);
	},function(){});

//点击上一张下一张
function PrevNextClick(flag){
	if (flag == 1){
		if (nowKey>1) {
			$(".icon i[name="+nowKey+"]").css("color", "#fff");
			$(".carousel_img[name="+nowKey+"]").fadeOut(800);
			nowKey--;
		}
	}
	else if (flag == 2){
		if (nowKey<5) {
			$(".icon i[name="+nowKey+"]").css("color", "#fff");
			$(".carousel_img[name="+nowKey+"]").fadeOut(800);
			nowKey++;
		}
	}
	$(".icon i[name="+nowKey+"]").css("color", "#f00");
	$(".carousel_img[name="+nowKey+"]").fadeIn(800);
}


//显示商品详细信息
var navIndex = -1;//默认不显示，去掉也没关系
$('.nav-side li,.detail-item-panel').hover(//当鼠标悬浮在.nav-side li,与.detail-item-panel进行连接
	function(){
		var slideOffset = $('.nav-side').offset();//获取.nav-side的top和left offset value
		navIndex = $('.nav-side li').index($(this));//获得当前鼠标悬浮的元素相对于.nav-side l位置
		if (navIndex%2) {//如果距离不为偶数，则显示panel1
			$('.panel-1').show();
		}else{//否则显示panel2(偶数距离时候)
			$('.panel-2').show();
		}
		
		$('.detail-item-panel').css("top",slideOffset.top + "px");
		$('.detail-item-panel').css("left",(slideOffset.left + 200) + "px");//显示在左菜单右方
	},function(){
		if (navIndex%2) {
			$('.panel-1').hide();
		}else{
			$('.panel-2').hide();//鼠标不在上面的时候全部隐藏
		}
	});


//倒计时
function countDowm(){
	var seconds = parseInt($('.count-down-seconds').html());//获取html里面对应的second值
	if (seconds == 0) {
		var minute = parseInt($('.count-down-minute').html());//获取对应分值
		minute = minute - 1;
		if (minute < 10) {
			$('.count-down-minute').html('0' + minute);//把小于10的数字化成0+数字类型
		}else{
			$('.count-down-minute').html(minute);//否则不变
		}
		$('.count-down-seconds').html('59');//分钟变化之后second重新变为59s
	}else{
		seconds = seconds - 1;
		if (seconds < 10) {
			$('.count-down-seconds').html('0' + seconds);
		}else{
			$('.count-down-seconds').html(seconds);//seconds轮回
		}
	}
}
setInterval(countDowm,1000);


//鼠标经过限时秒杀商品时使得商品向上移动
$('.seckill-item').hover(//使用animate的队列功能实现此效果
	function(){
		$(this).children('.seckill-item-img').children('img').animate({//使用内置的animate，此时为hover时候的css
			'margin-top':'-8px'
		},380);//一直到为0px才停止,同样以380ms的速度，在鼠标悬浮在上面时候执行
	},
	function(){
		$(this).children('.seckill-item-img').children('img').animate({
			'margin-top':'0px'
		},380);//一直到上前8px后才停止，以380ms的速度，鼠标放开后执行
	});

$('.other-user-buy-item-box').hover(
    function(){
        $(this).children('.other-user-buy-item-img').children('img').animate({
            'margin-top':'-8px'
        },380);
    },
    function(){
        $(this).children('.other-user-buy-item-img').children('img').animate({
            'margin-top':'0px'
        },380);
    });



//鼠标滑动商品向左滑//商品区
$('.item-big-img,.item-content-bottom-img').hover(//与上滑一致
	function(){
		$(this).children('img').animate({
			'margin-left':'-8px'
		},380);
	},
	function(){
		$(this).children('img').animate({
			'margin-left':'0px'
		},380);
	});
//鼠标放在四个框商品时图片向左滑
$('.item-four-detail').hover(
	function(){
		$(this).children('.item-four-detail-img').children('img').animate({
			'margin-left':'-8px'
		},380);
	},
	function(){
		$(this).children('.item-four-detail-img').children('img').animate({
			'margin-left':'0px'
		},380);
	});

//点击转换
$('.item-row').click(function(){//简单的定位转化问题,点击响应
	window.location = 'item_detail.html';
})

$('.item-row1').click(function(){
    window.location = 'item_detail1.html';
})