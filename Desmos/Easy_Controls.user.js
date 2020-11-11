// ==UserScript==
// @name         Simulations
// @namespace    http://tampermonkey.net/
// @version      2.5
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

  Calc.updateSettings({ clickableObjects: true })
})();
