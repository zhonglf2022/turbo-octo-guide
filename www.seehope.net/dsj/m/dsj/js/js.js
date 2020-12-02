// JavaScript Document
$(function(){
	var data=new Date();
	 var aYear=data.getFullYear();
	 $('.zg_yetime').html(aYear)

	/*来源表单*/
		$(".from").val(window.location.pathname+window.location.search);
})