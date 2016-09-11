$(function () {
    var $h1 = $(".menus h1");
    $h1.each(function () {
        $(this).on("click", function () {
            if (!$(this).parent().hasClass("active")) {
                $(this).parent().attr("class", "active");
                $(this).parent().find("dl").animate({
                    height: "40px"
                });
                $(this).parent().siblings().each(function(){
                    $(this).removeClass("active");
                    $(this).find("dl").animate({
                       height:0 
                    });
                });
            } else {
                $(this).parent().find("dl").animate({
                    height: 0
                });
                $(this).next().parent().removeClass("active");
            }
        });
    });
});