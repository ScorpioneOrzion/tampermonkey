// ==UserScript==
// @name         Auto Ready
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Ready on join, start game if everyone is ready (only if host) and Randomizes Rock Paper Scissors (if able).
// @author       Scorpione Orzion
// @include      https://duelingnexus.com/game/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/tijmentij/Tampermonkey/master/DuelingNexus/Auto_Ready.user.js
// @downloadURL  https://raw.githubusercontent.com/tijmentij/Tampermonkey/master/DuelingNexus/Auto_Ready.user.js
// ==/UserScript==

(function () {
  'use strict';
  let num = -1;
  function t4() {
    if (document.querySelector("#game-rps-move-opponent").src == document.querySelector("#game-rps-move-player").src) {
      if ((document.querySelector("#game-rps-scissors").src == document.querySelector("#game-rps-move-opponent").src ||
        document.querySelector("#game-rps-paper").src == document.querySelector("#game-rps-move-opponent").src ||
        document.querySelector("#game-rps-rock").src == document.querySelector("#game-rps-move-opponent").src) &&
        document.querySelector("#game-rps-result").style.display !== "none") {
        setTimeout(t2, 250)
      } else {
        setTimeout(t4, 250)
      }
    }
  }
  function t3() {
    if (document.querySelector("#game-start-button") !== null) {
      setTimeout(t3, 50)
    } else {
      setTimeout(t2, 250)
    }
  }
  function t2() {
    switch (num) {
      case 0:
        document.querySelector("#game-rps-rock").click()
        break;
      case 1:
        document.querySelector("#game-rps-paper").click()
        break;
      case 2:
        document.querySelector("#game-rps-scissors").click()
        break;
      default:
        break;
    }
    if (document.querySelector("#game-rps-move-opponent").src == document.querySelector("#game-rps-move-player").src) {
      if ((document.querySelector("#game-rps-scissors").src == document.querySelector("#game-rps-move-opponent").src ||
        document.querySelector("#game-rps-paper").src == document.querySelector("#game-rps-move-opponent").src ||
        document.querySelector("#game-rps-rock").src == document.querySelector("#game-rps-move-opponent").src) &&
        document.querySelector("#game-rps-result").style.display !== "none") {
        num = Math.floor(Math.random() * 3)
        setTimeout(t2, 250)
      } else {
        setTimeout(t4, 250)
      }
    }
  }
  function t1() {
    if (document.querySelector("#game-start-button").classList.contains("engine-button-disabled")) {
      setTimeout(t1, 50)
    } else {
      if (document.querySelector("#game-start-button").style.display !== "none") {
        document.querySelector("#game-start-button").click()
      }
      num = Math.floor(Math.random() * 3)
      setTimeout(t3, 50)
    }
  }
  if (document.querySelector("#game-not-ready-button")) {
    setTimeout(() => {
      if (document.querySelector("#game-not-ready-button").style.display !== "none") {
        document.querySelector("#game-not-ready-button").click()
      }
    }, 2500)
  }
  t1();
})();