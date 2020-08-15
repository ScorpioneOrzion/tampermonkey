// ==UserScript==
// @name         Easy controls
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Easy setting controls for desmos games
// @author       Tijmentij
// @include      https://www.desmos.com/calculator/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/tijmentij/Tampermonkey/master/Desmos/Easy_Controls.user.js
// @downloadURL  https://raw.githubusercontent.com/tijmentij/Tampermonkey/master/Desmos/Easy_Controls.user.js
// ==/UserScript==

window.addEventListener("keydown", event => {
  if (event.composedPath()[0] !== document.body) return;
  if (typeof window.Calc == undefined) return;
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
      const keySub = isNaN(text[1]) ? getValue(text[1]) : BigInt(text[1])
      const keyAdd = isNaN(text[2]) ? getValue(text[2]) : BigInt(text[2])
      const step = isNaN(text[3]) ? getValue(text[3]) : BigInt(text[3])
      const min = isNaN(text[4]) ? getValue(text[4]) : BigInt(text[4])
      const max = isNaN(text[5]) ? getValue(text[5]) : BigInt(text[5])
      if (event.keyCode == keySub) {
        value = getValue(text[0]) - step
        if (value < min) value += max - min
        if (value > max) value -= max - min
        setExpression(findId(text[0]), value, text[0])
      } else if (event.keyCode == keyAdd) {
        value = getValue(text[0]) + step
        if (value < min) value += max - min
        if (value > max) value -= max - min
        setExpression(findId(text[0]), value, text[0])
      }
    }
  }

  function setExpression(id, value, variable) {
    window.Calc.setExpression({ id, latex: `${variable}=${value + ""}` })
  }

  function getValue(variable) {
    return BigInt(window.Calc.expressionAnalysis[findId(variable)].evaluation.value)
  }

  function findId(variable) {
    let list = window.Calc.getExpressions().filter(a => a.type == "expression").filter(a => a.latex.includes(variable + "="))
    if (list.length !== 1) return null
    return BigInt(list[0].id)
  }
})