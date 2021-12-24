/*global $, alert, console*/

$(function () {
    "use strict";
    $("html").niceScroll();
    $("header").height($(window).height());
    $("header .arrow i").click(function () {
        $("html, body").animate({
            scrollTop: $(".features").offset().top
        }, 1000);
    });
    
    // Show hidden fugures from work
    
    $(".show-more").click(function () {
        $(".hidden").fadeIn();
    });
    $(".w-links").hide();
    $(".links").click(function () {
        $(".w-links").toggle();
    });
    
});