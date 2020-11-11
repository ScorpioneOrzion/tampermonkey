// ==UserScript==
// @name         Simulations
// @namespace    http://tampermonkey.net/
// @version      2.6
// @description  Simulations for Desmos
// @author       Scorpione Orzion
// @include      https://www.desmos.com/calculator/*
// @include      https://www.desmos.com/calculator
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ScorpioneOrzion/Tampermonkey/master/Desmos/Easy_Controls.user.js
// @downloadURL  https://raw.githubusercontent.com/ScorpioneOrzion/Tampermonkey/master/Desmos/Easy_Controls.user.js
// ==/UserScript==

(function () {
  'use strict';
  var c = setInterval(() => {
    if (window.Calc) { window.Calc.updateSettings({ clickableObjects: true }); clearInterval(c); console.log("Simulations Added") }
  }, 5)
})();
