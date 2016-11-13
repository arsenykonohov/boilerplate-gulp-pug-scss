/*global jQuery, alert: false, confirm: false, console: true, Debug: false, opera: false, prompt: false, WSH: false */
/*jslint plusplus: true */


var myCarousel = (function ($, w) {
    "use strict";
    // ==============================================
    //  CAROUSEL - http://kenwheeler.github.io/slick/
    // ==============================================
    $(".carousel").slick({
        autoplaySpeed: 1000,
        dots: true,
        infinite: true,
        speed: 300,
        slidesToScroll: 1,
        centerMode: true,
        autoplay: true,
        variableWidth: true
    });
    
    console.log("my-slick.js");
}(jQuery, $(window) || window));