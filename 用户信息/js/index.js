$(function(){
	$("button").click(function(){
		$("#kuang").show();
		$("#content1").attr("class","opp");

	});
	$("#kuang ul li").click(function(){
		$("#kuang").hide();
		$("#content1").removeClass("opp");
	});
});


