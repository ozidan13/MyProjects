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
    
    $("header .go2features").click(function () {
        $("html, body").animate({
            scrollTop: $(".features").offset().top
        }, 1000);
    });
    
    $("header .go2our-work").click(function () {
        $("html, body").animate({
            scrollTop: $(".our-work").offset().top
        }, 1000);
    });
    
    $("header .go2contact").click(function () {
        $("html, body").animate({
            scrollTop: $(".contact").offset().top
        }, 1000);
    });
    
    $(".hidden").hide();
    $(".show-more").click(function () {
        $(".hidden").toggle();
    });
    
    $(".w-links").hide();
    
    $(".links").click(function () {
        $(".w-links").toggle();
    });
    
    $("header .intro h1").slideDown(700).animate({opacity: "1"}, 1000);
    $("header .intro p").slideDown();
    
});