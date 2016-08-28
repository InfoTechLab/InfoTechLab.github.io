$(function () {
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
    slide();
});
    /*首页特效*/
    function slide() {
        if ($(".main-1").length && $(".main-2").length) {
            var main1Left = $(".main-1 .left").offset().top,
                main1Center = $(".main-1 .center").offset().top,
                main1Right = $(".main-1 .right").offset().top,
                main2Left = $(".main-2 .left").offset().top,
                main2Center = $(".main-2 .center").offset().top,
                main2Right = $(".main-2 .right").offset().top,
                nowPosition = $(window).height() + $(document).scrollTop();
            show(".main-1", main1Left, main1Center, main1Right, nowPosition);
            show(".main-2", main2Left, main2Center, main2Right, nowPosition);
            $(document).on("scroll", function () {
                nowPosition = $(window).height() + $(document).scrollTop();
                show(".main-1", main1Left, main1Center, main1Right, nowPosition);
                show(".main-2", main2Left, main2Center, main2Right, nowPosition);
            });
        } else {
            return;
        }
    }

function show(main, Left, Center, Right, nowPosition) {
    if (nowPosition >= Left + 100) {
        $(main + " .left").animate({
            left: 0
        }, 1500);
    }
    if (nowPosition >= Center + 100) {
        $(main + " .center").animate({
            left: 0,
            opacity: 1
        }, 1500);
    }
    if (nowPosition >= Right + 100) {
        $(main + " .right").animate({
            left: 0
        }, 1500);
    }
}