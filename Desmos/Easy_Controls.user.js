// ==UserScript==
// @name         Easy controls
// @namespace    http://tampermonkey.net/
// @version      0.1
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
      const text = controlExpression.text.split(" | ")
      let value = BigInt(getValue(text[0]))
      if (event.keyCode == text[1]) {
        value = BigInt(getValue(text[0])) - BigInt(text[3])
        if (value < BigInt(text[4])) value += BigInt(text[5]) - BigInt(text[4])
        if (value > BigInt(text[5])) value -= BigInt(text[5]) - BigInt(text[4])
        setExpression(BigInt(findId(text[0])), value, text[0])
      } else if (event.keyCode == text[2]) {
        value = BigInt(getValue(text[0])) + BigInt(text[3])
        if (value < BigInt(text[4])) value += BigInt(text[5]) - BigInt(text[4])
        if (value > BigInt(text[5])) value -= BigInt(text[5]) - BigInt(text[4])
        setExpression(BigInt(findId(text[0])), value, text[0])
      }
    }
  }

  function setExpression(id, value, variable) {
    window.Calc.setExpression({ id, latex: `${variable}=${value + ""}` })
  }

  function getValue(variable) {
    return window.Calc.expressionAnalysis[findId(variable)].evaluation.value
  }

  function findId(variable) {
    let list = window.Calc.getExpressions().filter(a => a.type == "expression").filter(a => a.latex.includes(variable + "="))
    if (list.length !== 1) return null
    return BigInt(list[0].id)
  }
})