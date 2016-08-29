$(function () {  
    /*首页特效*/
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
});

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