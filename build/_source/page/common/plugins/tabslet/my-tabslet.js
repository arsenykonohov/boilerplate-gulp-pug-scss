/*global jQuery, alert: false, confirm: false, console: true, Debug: false, opera: false, prompt: false, WSH: false */
/*jslint plusplus: true */



var myTab = (function ($, w) {
    "use strict";
    // ==============================================
    //  TABS - http://vdw.github.io/Tabslet/
    // ==============================================
    $(".tab").tabslet();
    
    console.log("my-tab.js");
}(jQuery, $(window) || window));