'use strict'

window.addEventListener("load", initFuncs);

function initFuncs() {

  var pLines = document.getElementsByClassName("line");
  var pTrigrams = document.getElementsByClassName("triQuads");
  var pMovers = document.getElementsByClassName("movers");
  var pReaders = document.getElementsByClassName("reading");
  var buttons = document.getElementsByTagName("button");
  var inputs = document.getElementsByTagName("input");

  var yangLine = "___";
  var yinLine = "_ &#160;_";
  var placeHold = "0";
  var triBinArr = [ "000", "001", "010", "011", "100", "101", "110", "111" ];
  var triNamesArr = [ "Earth", "Mountain", "Water", "Wind",
                      "Thunder", "Fire", "Lake", "Sky" ];
  var triCharCodes = [ "&#9783;", "&#9782;", "&#9781;", "&#9780;",
                     "&#9779;", "&#9778;", "&#9777;", "&#9776;" ];

  var hexLog = [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ];
  var inBinArr = [ "", "", "", "" ];
  var userTrigrams = [ "", "", "", "" ];
  var userHexNames = [ "error", "", "" ];
  var userHexNums = [ -1, -1, -1];

  var oddEven = 0;
  var whichInpt = 0;

  for (var h = 0; h < 6; h++) {
    pMovers[h].innerHTML = placeHold;
    pMovers[h].style.color = "#0d0d0d";
    pLines[h].innerHTML = placeHold;
    pLines[h].style.color = "#0d0d0d";
    pLines[h+6].innerHTML = placeHold;
    pLines[h+6].style.color = "#0d0d0d";
  }

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.padding = "0 0.2em 0.75em 0.2em";
    if (i % 2 != 0) {
      oddEven = 1;
      whichInpt = (i-1)/2;
    } else {
      oddEven = 0;
      whichInpt = i/2;
    }
    assigner(buttons[i], oddEven, inputs[whichInpt], whichInpt);

    function assigner(button, lineVal, inpt, indexNum) {
      button.onclick = function () {
      var inputVal = Number(lineVal);

      hexLog[indexNum] = lineVal;
      pLines[indexNum].style.color = "red";
      pLines[indexNum].innerHTML = (lineVal == 0)? yinLine : yangLine;
      validateTrigram(indexNum);
      validateHexagram(indexNum);
      return;
      }
    }
  }

  function validateTrigram(lineNum) {
    var loopStart = (Math.floor(lineNum/3)*3);
    var loopEnd = loopStart + 3;
    var node = Math.floor(lineNum/3);
    var triCheck = 0;
    for (var j = loopStart; j < loopEnd; j++) {
      if (hexLog[j] != -1) {
        triCheck++;
      }
    }
    if (triCheck >= 3) {
      getTrigram(hexLog[j-1], hexLog[j-2], hexLog[j-3], node);
      triCheck = 0;
      return;
    } else {
      return;
    }
  }

  function getTrigram(bottom, middle, top, pos) {
     var b = bottom.toString();
     var m = middle.toString();
     var t = top.toString();

     var triBinString = b + m + t;
     var triLookup = triBinArr.indexOf(triBinString);
     inBinArr[pos] = triBinString;
     userTrigrams[pos] = triNamesArr[triLookup] + " " + triCharCodes[triLookup];
     pTrigrams[pos].innerHTML = userTrigrams[pos];
  }

  function validateHexagram(lineIn) {
    var loopStart = (lineIn > 5)? 6 : 0;
    var loopEnd = loopStart + 6;
    var hexCheck = 0;
    var userHexBin = "";
    var whichHex = (lineIn > 5)? 2 : 1;
    var whichBin = (lineIn > 5)? 3 : 1;
    var displaySelect = (loopStart == 0)? 0 : 1;
    for (var k = loopStart; k < loopEnd; k++) {
      if (hexLog[k] != -1) {
        hexCheck++;
      }
    }
    if (hexCheck >= 6) {
      userHexBin = inBinArr[whichBin] + inBinArr[whichBin-1];
      getHexagram(userHexBin, whichHex, displaySelect);
      //buildTinyHex(whichHex);
      hexCheck = 0;
      return;
    } else {
      return;
    }
  }

  function getHexagram(binary, slot, tag) {
    var displayHexNames = document.getElementsByClassName("hexName");
    var theseMods = document.getElementsByClassName("thinmoduleButton");
    var readerShells = document.getElementsByClassName("pageShellBuilder");
    var Xs = document.getElementsByClassName("x");
    theseMods[tag].style.display = "block";
    userHexNums[slot] = hexBinArr.indexOf(binary);
    userHexNames[slot] = hexNameArr[userHexNums[slot]];
    displayHexNames[tag].innerHTML = userHexNames[slot];
    displayHexNames[tag].style.fontSize = "18px";
    theseMods[tag].onmouseover = function () {
      displayHexNames[tag].style.opacity = "1"; };
    theseMods[tag].onmouseout = function () {
      displayHexNames[tag].style.opacity = "0.4"; };
    theseMods[tag].onclick = function () {
      readerShells[tag].style.display = "block"; };
    Xs[tag].onclick = function () { readerShells[tag].style.display = "none"};
    validateMovingLines();
  }

  function readerModal(shell, x, index) {
    shell.style.display = "block";
    x.onclick = function () { shell.style.display = "none"; };
  }

  function validateMovingLines() {
   var cleanMovingString = "";
      for (var l = 0; l < 6; l++) {
        pMovers[l].innerHTML = placeHold;
        if (userHexNums[1] == userHexNums[2]) {
          pMovers[2].style.color = "whitesmoke";
          pMovers[2].innerHTML = "still";
          pMovers[3].style.color = "whitesmoke";
          pMovers[3].innerHTML = "lines";
          userHexNums[0] = 0;
        } else if (userHexNums[1] != -1 && userHexNums[2] != -1) {
          if ( hexLog[l] + hexLog[l+6] == 1) {
            pMovers[l].style.color = "whitesmoke";
            pMovers[l].innerHTML = l + 1;
            cleanMovingString += l + 1;
            userHexNums[0] = 1;
          }
        } else if (userHexNums[1] != -1 && userHexNums[2] == -1) {
          pMovers[2].style.color = "whitesmoke";
          pMovers[2].innerHTML = "still";
          pMovers[3].style.color = "whitesmoke";
          pMovers[3].innerHTML = "lines";
          userHexNums[0] = 0;
        }
      }
  getReading(cleanMovingString);
  }

  function getReading(cleanLines) {
    var innerMovers = "";
    var outerMovers = "";
    if (userHexNums[0] == 1) {
      var cleanLinesArr = cleanLines.split("");
      for (var m = 0; m < cleanLinesArr.length; m++ ) {
        innerMovers += movingStillLinesInner[userHexNums[1]][cleanLinesArr[m]]
                       + "<br/>";
        outerMovers += movingStillLinesOuter[userHexNums[1]][cleanLinesArr[m]]
                       + "<br/>";
      }
    }
    pReaders[0].innerHTML = userHexNames[1] + "<br/>" + "<br/>" +
                            purportsOuter[userHexNums[1]];
    pReaders[1].innerHTML = userHexNames[1] + "<br/>" + "<br/>" +
                            purportsInner[userHexNums[1]];
    pReaders[4].innerHTML = (userHexNums[0] == 0)? placeHold : userHexNames[2] +
                            "<br/>" + "<br/>" + purportsOuter[userHexNums[2]];
    pReaders[5].innerHTML = (userHexNums[0] == 0)? placeHold : userHexNames[2] +
                            "<br/>" + "<br/>" + purportsInner[userHexNums[2]];
    pReaders[2].innerHTML = (userHexNums[0] == 0)?
                         movingStillLinesInner[userHexNums[1]][0] : innerMovers;
    pReaders[3].innerHTML = (userHexNums[0] == 0)?
                         movingStillLinesOuter[userHexNums[1]][0] : outerMovers;
    pReaders[6].innerHTML = (userHexNums[0] == 0)? placeHold :
                         movingStillLinesInner[userHexNums[2]][0];
    pReaders[7].innerHTML = (userHexNums[0] == 0)? placeHold :
                         movingStillLinesOuter[userHexNums[2]][0];
  }

  function buildTinyHex(side) {
    var pLittles = document.getElementsByClassName("littleHex");
    var littleLookup1 = (side == 1)? triBinArr.indexOf(inBinArr[0]) :
                                     triBinArr.indexOf(inBinArr[2]);
    var littleLookup2 = (side == 1)? triBinArr.indexOf(inBinArr[1]) :
                                     triBinArr.indexOf(inBinArr[3]);
    pLittles[side-1].innerHTML = triCharCodes[littleLookup1] + "<br/>" + "<br/>"
                     + triCharCodes[littleLookup2];
  }
}
