
document.write("<script language='javascript' src='/js/jquery.validate.js'></script>");
$(function(){
	jQuery.validator.addMethod("mobile", function(legalUser) {
		var length = legalUser.length;
		var mobile = /^1[3456789]\d{9}$/;
		var tel = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
		if( (tel.test(legalUser)) || (length == 11 && mobile.test(legalUser))){
			return true;
		}
		return false;
	}, "输入的号码格式错误");
	
		$('#enrollForm').validate({
			rules:{
				trueName:{
					required :true,
					remote : {
                        url :'/enroll.htm?cmd=checkTrueName',
                        type:'post',
                        data:{
                        	trueName : function(){
                                return $("input[name='trueName']").val();
                            },
                            xuekeName:function(){
                            	return $("input[name='xuekeName']").val();
                            },
                            tel:function(){
                            	return $("input[name='tel']").val();
                            }
                        }
                    }
				},
				tel:{
					required :true,
					mobile:'mobile'
				},
				r_trueName:{
					required :true
				},
				r_tel:{
					required :true,
					mobile:'mobile'
				}
				
			},
			messages:{
				trueName:{
					required:"<font style='color:red;font-size:15px;'>必填</font>",
					remote:"<font style='color:red;font-size:15px;'>你已报过名,我们老师会尽快联系你!</font>"
				},
				tel:{
					required:"<font style='color:red;font-size:15px;'>必填</font>",
					mobile:"<font style='color:red;font-size:15px;'>请填写正确的手机号码</font>"
				},
				r_trueName:{
					required:"<font style='color:red;font-size:15px;'>必填</font>"
				},
				r_tel:{
					required:"<font style='color:red;font-size:15px;'>必填</font>",
					mobile:"<font style='color:red;font-size:15px;'>请填写正确的手机号码</font>"
				}
			}
		});
		
		$(".enrollBtn").on("click",function(){
			if($('#enrollForm').valid()){
				var trueName = $("input[name='trueName']").val();
				var tel = $("input[name='tel']").val();
				var area = $("input[name='area']").val();
				var qq = $("input[name='qq']").val();
				var xuekeName = $("input[name='xuekeName']").val();
				jQuery.ajax({
					type:"POST",
					dataType:"text",
					url:"/enroll.htm",
					data:{
						cmd:"save",
						trueName:trueName,
						tel : tel,
						area : area,
						qq : qq,
						xuekeName:xuekeName
					},
					success:function(data){
						var obj =  eval("("+data+")")
						if(obj.success){
							alert(obj.msg);
							$("#enrollForm")[0].reset();
						}else{
							alert(obj.msg);
						}
						clear();
					}
				});
			}
		});
		
		// 试听报名表单
		$("#enrollBtn").on("click",function(){
			if($('#enrollForm').valid()){
				var trueName = $("input[name='trueName']").val();
				var tel = $("input[name='tel']").val();
				var qq = $("input[name='qq']").val();
				var xuekeName = $("input[name='xuekeName']").val();
				var schoolId = $("#schoolId option:selected").val();
				var openSquadType = $("#openSquadType option:selected").val();
				jQuery.ajax({
					type:"POST",
					dataType:"text",
					url:"/enroll.htm",
					data:{
						cmd:"save",
						trueName:trueName,
						tel : tel,
						qq : qq,
						xuekeName:xuekeName,
						schoolId:schoolId,
						openSquadType:openSquadType
					},
					success:function(data){
						var obj =  eval("("+data+")")
						if(obj.success){
							alert(obj.msg);
							$("#enrollForm")[0].reset();
						}else{
							alert(obj.msg);
						}
						clear();
					}
				});
			}
		});
		
		// 推荐报名页面使用
		$("#enrollBtn2").on("click",function(){
			if($('#enrollForm').valid()){
				var trueName = $("input[name='trueName']").val();
				var tel = $("input[name='tel']").val();
				var qq = $("input[name='qq']").val();
				var xuekeName = $("input[name='xuekeName']").val();
				var r_trueName = $("input[name='r_trueName']").val();
				var r_tel = $("input[name='r_tel']").val();
				jQuery.ajax({
					type:"POST",
					dataType:"text",
					url:"/enroll.htm",
					data:{
						cmd:"save",
						trueName:trueName,
						tel : tel,
						qq : qq,
						xuekeName:xuekeName,
						intro:"推荐人：" + r_trueName + ",联系电话：" + r_tel
					},
					success:function(data){
						var obj =  eval("("+data+")")
						if(obj.success){
							alert(obj.msg);
							$("#enrollForm")[0].reset();
						}else{
							alert(obj.msg);
						}
						$("input[name='trueName']").val("");
						$("input[name='tel']").val("");
						$("input[name='qq']").val("");
						$("input[name='r_trueName']").val("");
						$("input[name='r_tel']").val("");
					}
				});
			}
		});
		
		// 领取视频教程页面使用
		$("#enrollBtn3").on("click",function(){
			if($('#enrollForm').valid()){
				var trueName = $("input[name='name']").val();
				var tel = $("input[name='tel']").val();
				var qq = $("input[name='qq']").val();
				var xuekeName = $("input[name='xuekeName']").val();
				var openSquadType = $("#openSquadType option:selected").val();
				jQuery.ajax({
					type:"POST",
					dataType:"text",
					url:"/enroll.htm",
					data:{
						cmd:"save",
						trueName:trueName,
						tel : tel,
						qq : qq,
						xuekeName:xuekeName,
						openSquadType:openSquadType
					},
					success:function(data){
						var obj =  eval("("+data+")")
						var p = parseInt(openSquadType)
						if (p == 1) {
							var x = '<span>视频链接:&nbsp;</span><a href="https://pan.baidu.com/s/1av5TwfJTw5YW5nV5BaKYug">Java开发-B2C商城(爱购网)</a><br/><span>提取码:&nbsp;lten</span>'
								+ '<br/><span>更多免费资料请加群:&nbsp;</span><a target="_blank" href="https://jq.qq.com/?_wv=1027&k=5ZfKJAc"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="Java学习交流群" title="Java学习交流群"></a>';
						} else if(p == 327681){
							var x = '<span>视频链接:&nbsp;</span><a href="https://pan.baidu.com/s/1fHaFbDJRjKQnvJ3iS5pwxA">Python从零基础到进阶教程</a><br/><span>提取码:&nbsp;nfeh</span>'
								+ '<br/><span>更多免费资料请加群:&nbsp;</span><a target="_blank" href="https://jq.qq.com/?_wv=1027&k=5JJA3RA"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="Python资源分享" title="Python资源分享"></a>';
						} else if(p == 131072){
							var x = '<span>视频链接:&nbsp;</span><a href="https://pan.baidu.com/s/1zq4d5L3kV5Y0qUOdfgYtQQ">AI教程</a><br/><span>提取码:&nbsp;8ty3</span>'
								+ '<br/><span>更多免费资料请加群:&nbsp;</span><a target="_blank" href="https://jq.qq.com/?_wv=1027&k=5UaBfGf"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="UI交互设计学习交流群" title="UI交互设计学习交流群"></a>';
						} else if(p == 294912){
							var x = '<span>视频链接:&nbsp;</span><a href="https://pan.baidu.com/s/1O2TYeIFsCYKG11w0De7L9w">H5前端开发进阶课程</a><br/><span>提取码:&nbsp;nrwj</span>'
								+ '<br/><span>更多免费资料请加群:&nbsp;</span><a target="_blank" href="https://jq.qq.com/?_wv=1027&k=5SQ2H5y"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="web前端开发交流群" title="web前端开发交流群"></a>';
						} else if(p == 2){
							var x = '<span>视频链接:&nbsp;</span><a href="https://pan.baidu.com/s/1o5_eWUEco6CajleY1T32sA">PHP开发企业网站-新手入门项目详解</a><br/><span>提取码:&nbsp;q007</span>'
								+ '<br/><span>更多免费资料请加群:&nbsp;</span><a target="_blank" href="https://jq.qq.com/?_wv=1027&k=55KGqSO"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="PHP技术交流群" title="PHP技术交流群"></a>';
						}
						layer.alert(x, {icon: 6});
						clear();
					}
				});
			}
		});
		//
		$("#enrollBtn4").on("click",function(){
			var mobile = /^1[345789]\d{9}$/;
			var tel = $("#enForm input[name='tel']").val();
			if(tel == null || tel == ''){
				layer.alert("手机号码不能为空~");
				return false;
			} else if (tel.length != 11 || !mobile.test(tel)){
				layer.alert("请填写正确的手机号码~");
				return false;
			}
			var source = $("#enForm input[name=source]").val();
			var schoolId = $("#enForm input[name=schoolId]").val();
			jQuery.ajax({
				type:"POST",
				dataType:"text",
				url:"/enroll.htm",
				data:{
					cmd:"save",
					tel:tel,
					source:source,
					schoolId:schoolId
				},
				success:function(data){
					var obj =  eval("("+data+")")
					if(obj.success){
						$("#enForm")[0].reset();
						layer.alert(obj.msg);
//	 					location.reload();
					}else{
						$("#enForm")[0].reset();
						layer.alert(obj.msg);
					}
				}
			});
		});
		
});
function clear(){
	var trueName = $("input[name='trueName']").val("");
	var tel = $("input[name='tel']").val("");
	var area = $("input[name='area']").val("");
	var qq = $("input[name='qq']").val("");
	var trueName = $("input[name='name']").val("");
}


