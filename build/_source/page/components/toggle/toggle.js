/*global jQuery, alert: false, confirm: false, console: true, Debug: false, opera: false, prompt: false, WSH: false */
/*jslint plusplus: true */


var toggle = (function ($, w) {
    "use strict";
    var doc = $(document),
        toggleClass = $(".toggle");
    
    // ==============================================
    //  DROPDOWN and NAVBAR
    // ==============================================
    toggleClass.on("click", function () {
        var the           = $(this),
            theParent     = the.closest(".toggle__parent"),
            theSibling    = theParent.siblings().find(".toggle");
        the.toggleClass("active");
        if (the.hasClass("active")) {
            theSibling.removeClass("active");
        }
    });

    doc.on("mouseup", function (event) {
        var $container = $(".dropdown *"),
            $btn = $(".toggle");
        if (!$container.is(event.target) && $container.has(event.target).length === 0 && !$btn.is(event.target)) {
            $btn.removeClass("active");
        }
    });
    
    console.log("toggle.js");
}(jQuery, $(window) || window));

