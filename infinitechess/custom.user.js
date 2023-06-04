// ==UserScript==
// @name         InfinityChess Custom
// @namespace    http://github.com/ScorpioneOrzion/tampermonkey
// @version      0.1
// @description  custom infiniteChess
// @author       ScorpioneOrzion
// @match        https://www.infinitechess.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=infinitechess.org
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ScorpioneOrzion/tampermonkey/master/infinitechess/custom.user.js
// @downloadURL  https://raw.githubusercontent.com/ScorpioneOrzion/tampermonkey/master/infinitechess/custom.user.js
// ==/UserScript==

(function() {
    'use strict';
    legalmoves.queens = function () {
      return {
        individual: [
          [-2, 1], [-1, 2], [1, 2], [2, 1],
          [-2, -1], [-1, -2], [1, -2], [2, -1]
        ],
        horizontal: [-Infinity, Infinity],
        vertical: [-Infinity, Infinity],
        diagonalUp: [-Infinity, Infinity], // These represent the x limit of the piece sliding diagonally
        diagonalDown: [-Infinity, Infinity]
      }
    }
})();
