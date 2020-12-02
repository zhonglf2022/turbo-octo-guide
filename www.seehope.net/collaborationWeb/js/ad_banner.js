	
$(function(){
	jQuery.ajax({
		type:"POST",
		dataType:"text",
		url:"/index.htm?cmd=getBannerAds",
		success:function(data){
			var $ad = $(data);
			$("body").append($ad);
		}
	});
})

