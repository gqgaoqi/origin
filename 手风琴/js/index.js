
$(function(){
    $(".pic ul li").mouseover(function(){
        $(this).stop(true,true).animate({width:"789px"},1000).siblings().stop(true,true).animate({width:"100px"},1000);
    });
});
