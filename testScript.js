'use strict'

window.addEventListener("load", initFuncs)

function initFuncs() {

  function fillDeadLines() {
    var dead
    var text
    var columns = document.getElementsByClassName("thinmoduleColumn")
    var lines = [[],[]]
    for (let i = 0; i < columns.length; i++) {
      for (let j = 0; j < 13; j++) {
        dead = document.createElement("div")
        dead.className = "deadline"
        dead.style.color = "red"
        columns[i].appendChild(dead)
        if (j%2 == 0 && j != 12) {
          lines[i].push(dead)
        }
      }
    }
    return lines
  }

  function buildYinLine() {
    var yinline = document.createElement("div")
    var flexBox = document.createElement("div")
    var bits = []
    yinline.className = "yinline"
    flexBox.className = "flexOuter"
    for (let i = 0; i < 3; i++) {
      bits[i] = document.createElement("div")
      bits[i].className = "yinbitT"
      if (i%2 != 0) {
        bits[i].className = "yinbitF"
      }
      flexBox.appendChild(bits[i])
    }
    yinline.appendChild(flexBox)
    return yinline
  }

  function buildYangLine() {
    var yangline = document.createElement("div")
    yangline.className = "yangline"
    return yangline
  }

  function fillLivingLines(parentElm, blankHex) {
    var testStat = 0     
    var newline
    for (let i = 0; i < blankHex.length; i++) {
      testStat = Math.random()
      if (testStat >= 0.5) {
        newline = buildYangLine()
      } else {
        newline = buildYinLine()
      }
      parentElm.replaceChild(newline,blankHex[i])
    }
  }

  var hexLines// = fillDeadLines()
  var columnBoxes = document.getElementsByClassName("thinmoduleColumn")
  var intervalObj = setInterval( function () {
      //document.getElementById("test").innerHTML = window.innerHeight
      window.scrollTo(0,document.body.scrollHeight)
      hexLines = fillDeadLines()
      for (let i = 0; i < columnBoxes.length; i++) {
        fillLivingLines(columnBoxes[i],hexLines[i])
      }
    }, 1000)
}
