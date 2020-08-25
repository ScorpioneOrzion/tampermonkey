// ==UserScript==
// @name         Password
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Password generator
// @match        *://*/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ScorpioneOrzion/Tampermonkey/master/AllSites/Password.user.js
// @downloadURL  https://raw.githubusercontent.com/ScorpioneOrzion/Tampermonkey/master/AllSites/Password.user.js
// ==/UserScript==

(function () {
  'use strict';
  if (window.createPassword === undefined) {
    window.createPassword = (len) => {
      const chars = "@%+\\/'!#$^?:,,(){}[]~.-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz"
      return [...Array(len)].map(() => chars[Math.floor(87 * Math.random())]).join("")
    }
  }
})();