'use strict'

window.addEventListener("load", initFuncs);

function initFuncs() {
  var buttons = document.getElementsByClassName("plusMinus");
  var articles = document.getElementsByClassName("expandArticle");
  var toggles = [];
  var showTable = document.getElementsByTagName("button")[0];
  var tableShell = document.getElementsByClassName("tableShell")[0];
  var x = document.getElementsByClassName("x")[0];
  var table = document.getElementById("trigramTable")

  showTable.onclick =  function () { tableShell.style.display = "block";
    window.location.assign("#" + table.id)
    tableShell.scrollIntoView;
    x.onclick = function () { tableShell.style.display = "none"; }
  };

  for (var i = 0; i < buttons.length; i++) {
    toggles[i] = 0;
    assigner(buttons[i], articles[i], i);
    function assigner(click, article, num) {
      click.onclick = function () { textModal(article, click, num); };
    }
  }

  function textModal(text, sign, index) {

    function openModal(elm, char, int) {
      elm.style.display = "block";
      char.innerHTML = "&ndash;";
      toggles[int] = 1;
    }

    function closeModal(elm, char, int) {
      elm.style.display = "none";
      char.innerHTML = "+";
      toggles[int] = 0;
    }

    for (var i = 0; i < toggles.length; i++) {
      if (toggles[i] == 1 && i != index) {
        closeModal(articles[i],buttons[i],i)
      }
    }
    if (toggles[index] == 0) {
      openModal(text, sign, index)
    } else if (toggles[index] == 1) {
      closeModal(text, sign, index)
    }
  }
}
