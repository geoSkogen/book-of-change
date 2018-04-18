'use strict'

window.addEventListener("load", initFuncs);

function initFuncs() {

  var defLines = document.getElementsByTagName("h2");
  var buttons = document.getElementsByTagName("button");
  var pElms = document.getElementsByTagName("p");
  var triElms = document.getElementsByClassName("trigram");
  var hexElms = document.getElementsByClassName("hexName");
  var buttonShell = document.getElementsByClassName("widemodule")[0];
  var hexShell = document.getElementsByClassName("hexShell")[0];
  var Xs = document.getElementsByClassName("x");
  var pageShells = document.getElementsByClassName("pageShell");
  var menuShell = document.getElementsByClassName("menuShell")[0];
  var menuShellTitle = document.getElementById("menuShellTitle");
  var options = document.getElementsByClassName("option2");
  var Ls = document.getElementsByClassName("L");
  var Rs = document.getElementsByClassName("R");
  var coinConsole = document.getElementsByClassName("widemodule")[0];
  var hideTitles =  document.getElementsByClassName("hides");
  var thinMods = document.getElementsByClassName("thinmodule");
  var coinTossMod = document.getElementById("coinToss");


  var hex1Lines = [" ", " ", " ", " ", " ", " "];
  var hex2Lines = [" ", " ", " ", " ", " ", " "];
  var hex1Log = [ -1, -1, -1, -1, -1, -1 ];
  var hex2Log = [ -1, -1, -1, -1, -1, -1 ];

  var yinLine = "&#160;" + "_ &#160;_ ";
  var yangLine = "___";

  var moving = 0;
  var movingHex = [0,0,0,0,0,0];
  var cleanMovingHex = [];

  var inBinArr = [ "", "", "", "" ];
  var userTrigrams = [ "", "", "", "" ];
  var userHexNames = [ "error", "" , "" ];
  var userHexNums = [ -1, -1 , -1];

  var triBinArr = [ "000", "001", "010", "011", "100", "101", "110", "111" ];
  var triNamesArr = [ "Earth", "Mountain", "Water", "Wind",
                      "Thunder", "Fire", "Lake", "Sky" ];
  var triCharCodes = [ "&#9783;", "&#9782;", "&#9781;", "&#9780;",
                       "&#9779;", "&#9778;", "&#9777;", "&#9776;" ];
  var buttoned = 0;
  var butGet = document.createElement("button");
  butGet.id = "cliq";
  var butReset = document.createElement("button");
  butReset.id = "clear";
  var butRefresh = document.createElement("button");
  butReset.id = "refresh";
  var linkRefresh = document.createElement("a");
  linkRefresh.setAttribute("href", "index.html");
  linkRefresh.innerHTML = "start over";
  butRefresh.appendChild(linkRefresh);
  var butInterp = document.getElementsByClassName("click")[0];
  butInterp.onclick = function () {
    var div = document.getElementById("appendMe");
    arrayCleaner();
    getReading(1, Ls);
    if (moving != 0) {
      getReading(2, Rs);
    }
    hexShell.style.display = "none";
    buttonShell.style.opacity = "0";
    butGet.style.display = "none";
    butReset.style.display = "none";
    for (var i = 0; i < hideTitles.length; i++ ) {
      hideTitles[i].style.display = "none";
      thinMods[i].style.cursor = "pointer";
      var thisMod =  thinMods[i];
      openMenuShell(thisMod, i);
    }

    function openMenuShell(mod, number) {
      mod.onclick = function () {
        menuShell.style.display = "block";
        menuShellTitle.innerHTML = userHexNames[number+1];
        div.appendChild(butRefresh);
        //butRefresh.onclick = location.assign("index.html");
        for (var i = 0; i < thinMods.length; i++) {
            thinMods[i].style.opacity = "0.3";
            this.style.opacity = "1";
        }
        assignOption(number);
      };
    }
  };

    function assignOption(hex) {
      var pageNo = (hex == 0)? 0 : 4;
      var pageNoArr = [ pageNo, pageNo+2, pageNo+1, pageNo+3 ];
      for (i = 0; i < options.length; i++) {
        assignClick(options[i],pageNoArr[i]);

        function assignClick(button, index) {
          button.onclick = function () { openPageModal(index); };
        }
      }
    }

    function openPageModal(index) {
      for (i = 0; i < pageShells.length; i++) {
        pageShells[i].style.display = "none";
      }
      menuShell.style.display = "none";
      thinMods[0].style.display = "none";
      thinMods[1].style.display = "none";
      butRefresh.style.display = "none";
      pageShells[index].style.display = "block";
      Xs[index].onclick = function () {
        pageShells[index].style.display = "none";
        menuShell.style.display = "block";
        thinMods[0].style.display = "block";
        thinMods[1].style.display = "block";
        butRefresh.style.display = "block";
      };
    }

  for (var i = 0; i < 6; i++) {
    var thisButt = buttons[i];
    assigner(thisButt, i);

    function assigner(button, number) {
      button.onclick = function () { coinToss(number); };
    }
  }

  function coinToss(lineIndex) {
  /*  if (lineIndex === 0) {
      clearFields();
    }*/
    var coin = Math.random();
      if (coin > 0 && coin <= 0.25) {
        hex1Lines[lineIndex] = yangLine;
        hex2Lines[lineIndex] = yangLine;
        hex1Log[lineIndex] = 1;
        hex2Log[lineIndex] = 1;
      } else if (coin > 0.25 && coin <= 0.5) {
        hex1Lines[lineIndex] = yinLine;
        hex2Lines[lineIndex] = yinLine;
        hex1Log[lineIndex] = 0;
        hex2Log[lineIndex] = 0;
      } else if (coin > 0.5 && coin <= 0.75) {
        hex1Lines[lineIndex] = yinLine;
        hex2Lines[lineIndex] = yangLine;
        hex1Log[lineIndex] = 0;
        hex2Log[lineIndex] = 1;
        moving = 1;
        movingHex[lineIndex] = 1;
      } else if (coin > 0.75 && coin < 1){
        hex1Lines[lineIndex] = yangLine;
        hex2Lines[lineIndex] = yinLine;
        hex1Log[lineIndex] = 1;
        hex2Log[lineIndex] = 0;
        moving = 1;
        movingHex[lineIndex] = 1;
      }
   defLines[0].innerHTML = hex1Lines[5] + "<br/>" + hex1Lines[4] + "<br/>" +
                           hex1Lines[3] + "<br/>" + hex1Lines[2] + "<br/>" +
                           hex1Lines[1] + "<br/>" + hex1Lines[0] + "<br/>" +
                           "<br/>";
   defLines[1].innerHTML = (moving == 0)? "" : hex2Lines[5] + "<br/>" +
                           hex2Lines[4] + "<br/>" + hex2Lines[3] + "<br/>" +
                           hex2Lines[2] + "<br/>" + hex2Lines[1] + "<br/>" +
                           hex2Lines[0] + "<br/>" + "<br/>";
    checkComplete();

    function checkComplete() {
      var countSix = 0;
      for (var i = 0; i < hex1Log.length; i++) {
        if (hex1Log[i] != -1) {
          countSix += 1;
        }
      }
      if (countSix == 6) {
        if (buttoned == 0) {
          buttoned = 1;
          createButtons();
        }
        initTrigrams();
      }
    }
  }

  function clearFields() {
     buttonShell.style.opacity = "1";

     hex1Lines = [" ", " ", " ", " ", " ", " "];
     hex2Lines = [" ", " ", " ", " ", " ", " "];
     for (i = 0; i < defLines.length; i++) {
       defLines[i].innerHTML = "";
     }
     hex1Log = [];
     hex2Log = [];

     moving = 0;
     movingHex = [0,0,0,0,0,0];

     inBinArr = [ "", "", "", "" ];
     userTrigrams = [ "", "", "", "" ];
     userHexNames = [ "error", "" , "" ];
     userHexNums = [ -1, -1 , -1];


  }

  function initTrigrams() {
        getTrigram(hex1Log[0], hex1Log[1], hex1Log[2], 1);
        getTrigram(hex2Log[0], hex2Log[1], hex2Log[2], 3);
        getTrigram(hex1Log[3], hex1Log[4], hex1Log[5], 0);
        getTrigram(hex2Log[3], hex2Log[4], hex2Log[5], 2);
  }

  function getTrigram(l1, l2, l3, n) {
     var triArr = [ l1, l2, l3 ];
     var triPos;
     var triDisplay;

    for (var j = 0; j < 3; j++) {
      inBinArr[n] += triArr[j];
    }
    triPos = triBinArr.indexOf(inBinArr[n]);
    userTrigrams[n] = triNamesArr[triPos];
    var triDisplay = userTrigrams[n] + " " + triCharCodes[triPos];
      if (moving == 0 && n > 1) {
        triDisplay = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "still lines" +
                             "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
      }
    triElms[n].innerHTML = triDisplay;
  }

  function createButtons() {
    var div = document.getElementById("appendMe");

    div.appendChild(butGet);
    butGet.innerHTML = "read";
    butGet.onclick = openHexModal;

    div.appendChild(butReset);
    butReset.innerHTML = "reset";
    butReset.onclick = clearFields;

    buttonShell.style.opacity = "0";
  }

  function openHexModal() {
    var parent = document.getElementById("appendMe");
    hexShell.style.display = "block";
    parent.childNodes[0].style.opacity = "0.25";
    parent.childNodes[1].style.opacity = "0.25";
    document.getElementById("hexX").onclick = function () {
      hexShell.style.display = "none";
      parent.childNodes[0].style.opacity = "0.95";
      parent.childNodes[1].style.opacity = "0.95";
    }
    initHex(1, hex1Log);
    if (moving != 0) {
      initHex(2, hex2Log);
    }
  }


  /* function initHexagrams() {
     for (var k = 0; k < 2; k++) {
       var lookup = inBinArr[k+2] + inBinArr[k];
       var hexNum = hexBinArr.indexOf(lookup);
       var slot = k + 1;
       var pos = k;
       userHexNums[slot] = hexNum;
       if (k == 1 && moving == 0){
         hexElms[k].innerHTML = "still lines";
       } else {
         hexElms[k].innerHTML = hexNum  + "<br/>";
       }
       getHexagram(hexNum, slot, pos);
     }
    //displayButtons();
   }
   function getHexagram(hexLookup, num, elm) {
     userHexNames[num] = hexNameArr[hexLookup];
     if (num == 2 && moving == 0) {
       hexElms[elm].innerHTML += "still lines";
     } else {
       hexElms[elm].innerHTML += userHexNames[num];
    }
  }*/
  function initHex(hex, hexLog) {
    var hexString = "";
    for (var i = 0; i < 6; i++ ) {
      hexString += hexLog[i];
    }
    userHexNums[hex] = hexBinArr.indexOf(hexString);
    userHexNames[hex] = hexNameArr[userHexNums[hex]];
    hexElms[hex-1].innerHTML = userHexNums[hex] + "<br/><br/>" + userHexNames[hex];
  }

  /* function displayButtons() {
     mods[0].appendChild(but1);
     but1.onclick = function () { getReading(1, 6, 7, 10, 11); };
     but1.innerHTML = hex1Lines[5] + "<br/>" + hex1Lines[4] + "<br/>" +
                      hex1Lines[3] + "<br/>" + hex1Lines[2] + "<br/>" +
                      hex1Lines[1] + "<br/>" + hex1Lines[0] + "<br/>" +
                      "<br/>";
     if (moving != 0) {
       mods[1].appendChild(but2);
       arrayCleaner();
       but2.onclick = function () { getReading(2, 8, 9, 12, 13); };
       but2.innerHTML =  hex2Lines[5] + "<br/>" + hex2Lines[4] +
                        "<br/>" + hex2Lines[3] + "<br/>" + hex2Lines[2] +
                        "<br/>" + hex2Lines[1] + "<br/>" + hex2Lines[0] +
                        "<br/>" + "<br/>";
     }
   }*/

   function arrayCleaner() {
     var string = "";
     for (var m = 0; m < movingHex.length; m++) {
       if (movingHex[m] == 1) {
           string += m + 1 + " ";
       }
     }
     cleanMovingHex = string.split(" ");
   }


  /* function getReading(hex, innerA, outerA, innerB, outerB) {
     var innerString = "";
     var outerString = "";
     pElms[innerA].innerHTML = userHexNames[hex] + "<br/>" + "<br/>" +
                               purportsInner[userHexNums[hex]];
     pElms[outerA].innerHTML = userHexNames[hex] + "<br/>" + "<br/>" +
                               purportsOuter[userHexNums[hex]];
     for (var p = 0; p < cleanMovingHex.length - 1; p++) {
       innerString += movingStillLinesInner[userHexNums[hex]][cleanMovingHex[p]]
                      + "<br/>";
       outerString += movingStillLinesOuter[userHexNums[hex]][cleanMovingHex[p]]
                      + "<br/>";
     }
     pElms[innerB].innerHTML = (moving == 0)?
                               movingStillLinesInner[userHexNums[hex]][0] :
                               innerString;
     pElms[outerB].innerHTML = (moving == 0)?
                               movingStillLinesOuter[userHexNums[hex]][0] :
                               outerString;
     if (hex == 2) {
       pElms[innerB].innerHTML = movingStillLinesInner[userHexNums[hex]][0];
       pElms[outerB].innerHTML = movingStillLinesOuter[userHexNums[hex]][0];
     }
   }*/

   function getReading(hex, arr) {
     var innerMoversString = "";
     var outerMoversString = "";
     for (var p = 0; p < cleanMovingHex.length - 1; p++) {
       innerMoversString +=
         movingStillLinesInner[userHexNums[hex]][cleanMovingHex[p]] + "<br/>";
       outerMoversString +=
         movingStillLinesOuter[userHexNums[hex]][cleanMovingHex[p]] + "<br/>";
     }
      arr[0].innerHTML = userHexNames[hex] + "<br/><br/>" +
        purportsInner[userHexNums[hex]];
      arr[1].innerHTML = userHexNames[hex] + "<br/><br/>" +
       purportsOuter[userHexNums[hex]];
      arr[2].innerHTML = (hex == 2 || moving == 0)?
       movingStillLinesInner[userHexNums[hex]][0] : innerMoversString;
      arr[3].innerHTML = (hex == 2 || moving == 0)?
       movingStillLinesOuter[userHexNums[hex]][0] : outerMoversString;
   }
}
