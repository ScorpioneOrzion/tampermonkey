// ==UserScript==
// @name         Easy controls
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Easy setting controls for desmos games
// @author       Tijmentij
// @include      https://www.desmos.com/calculator/*
// @include      https://www.desmos.com/calculator
// @grant        none
// @updateURL    https://raw.githubusercontent.com/tijmentij/Tampermonkey/master/Desmos/Easy_Controls.user.js
// @downloadURL  https://raw.githubusercontent.com/tijmentij/Tampermonkey/master/Desmos/Easy_Controls.user.js
// ==/UserScript==

(function () {
  'use strict';

  const keyboard = {};
  let checkState = false;

  window.addEventListener("keydown", event => {
    if (event.composedPath()[0] !== document.body) return;
    if (typeof window.Calc == undefined) return;
    keyboard[event.keyCode] = true
    if (!checkState) {
      checkState = true
      checkMovement()
    }
  })

  window.addEventListener("keyup", event => {
    if (event.composedPath()[0] !== document.body) return;
    if (typeof window.Calc == undefined) return;
    keyboard[event.keyCode] = false
    if (!checkState) {
      checkState = true
      checkMovement()
    }
  })

  function checkMovement() {
    requestAnimationFrame(checkMovement)
    const calculator = window.Calc;
    const expressions = calculator.getState().expressions.list;
    for (const folderExpression of expressions) {
      if (folderExpression.type !== "folder") continue
      if (folderExpression.title !== "controls") continue
      if (folderExpression.hidden === true) continue
      const id = folderExpression.id
      for (const controlExpression of expressions) {
        if (controlExpression.type !== "text") continue
        if (controlExpression.folderId !== id) continue
        if (controlExpression.hidden === true) continue
        if (controlExpression.text.includes("^{")) continue
        const text = controlExpression.text.split(" | ")
        let value = getValue(text[0])
        const keySub = getVar(text, 1)
        const keyAdd = getVar(text, 2)
        const step = getVar(text, 3)
        const min = getVar(text, 4)
        const max = getVar(text, 5)
        let mode = 0
        // if (text.length > 6) {
          // mode = getVar(text, 6)
        // }
        if (!keyboard.hasOwnProperty(keySub)) keyboard[keySub] = false
        if (!keyboard.hasOwnProperty(keyAdd)) keyboard[keyAdd] = false
        if (keyboard[keySub] ^ keyboard[keyAdd]) {
          if (keyboard[keySub] == true) {
            value = getValue(text[0]) - step
            if (mode == 1) {
              if (value < min) value = min
              if (value > max) value = max
            } else {
              if (value < min) value += max - min + step
              if (value > max) value -= max - min - step
            }
            setExpression(findId(text[0]), value, text[0])
          } else if (keyboard[keyAdd] == true) {
            value = getValue(text[0]) + step
            if (mode == 1) {
              if (value < min) value = min
              if (value > max) value = max
            } else {
              if (value < min) value += max - min - step
              if (value > max) value -= max - min + step
            }
            setExpression(findId(text[0]), value, text[0])
          }
        }
      }
    }
  }

  function getVar(text, index) {
    return isNaN(text[index]) ? getValue(text[index]) : BigInt((text[index] + "").split(".")[0])
  }

  function setExpression(id, value, variable) {
    window.Calc.setExpression({ id, latex: `${variable}=${value + ""}` })
  }

  function getValue(variable) {
    return BigInt((window.Calc.expressionAnalysis[findId(variable)].evaluation.value + "").split(".")[0])
  }

  function findId(variable) {
    let list = window.Calc.getExpressions().filter(a => a.type == "expression").filter(a => a.latex.includes(variable + "="))
    if (list.length !== 1) return null
    return BigInt((list[0].id + "").split(".")[0])
  }
})();