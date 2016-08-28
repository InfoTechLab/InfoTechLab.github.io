$(function(){
   $("#front").on("click",function(){
       $(".img-bg").fadeIn(500);
       $("#img-front").fadeIn(500);
   });
    $("#back").on("click",function(){
       $(".img-bg").fadeIn(500);
       $("#img-back").fadeIn(500);
   });
    $(".img-bg .close").on("click",function(){
        $(".img-bg").fadeOut(500);
        $("#img-front").fadeOut(500);
        $("#img-back").fadeOut(500);
    });
});