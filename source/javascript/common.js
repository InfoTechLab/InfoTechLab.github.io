$(function(){
    /*回到顶部*/
    var $goTop = $(".go-top-gray").next(),
        a = $(".header-menu").find("a"),
        $division = $(".division"),
        open = false,
        num;
    $(".go-top-gray").on("mouseover", function () {
        $(this).animate({
            opacity: 0
        });
        $goTop.animate({
            opacity: 1
        });
    }).on("mouseout", function () {
        $(this).animate({
            opacity: 1
        });
        $goTop.animate({
            opacity: 0
        });
    }).on("click", function () {
        $(this).css("display", "none");
        $("body,html").animate({
            scrollTop: 0
        });
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() !== 0) {
            $(".wrap-go-top,.go-top-gray,.go-top").fadeIn();
        } else {
            $(".wrap-go-top,.go-top-gray,.go-top").fadeOut();
        }
    });
    /*导航特效*/
    $(a).each(function (i) {
        if ($(this).parent().hasClass("active")) {
            num = i; //记住有active类的下标，当鼠标移出时用到
            $division.css({
                marginLeft: (100 / a.length) * i + "%"
            });
        }

        $(this).on("mouseover", function () {
            $division.stop().animate({
                marginLeft: (100 / a.length) * i + "%"
            }, 300);
        }).on("mouseout", function () {
            $division.stop().animate({
                marginLeft: (100 / a.length) * num + "%"
            }, 300);
        });
    });
    $(".drop-menu-button").on("click", function () {
        if (!open) {
            $(this).find(".iconfont").css("color", "#53a1ab");
            $(".drop-menu").animate({
                height: "300px"
            });
            open = true;
        } else {
            $(this).find(".iconfont").css("color", "#60deed");
            $(".drop-menu").animate({
                height: 0
            });
            open = false;
        }
    });
});