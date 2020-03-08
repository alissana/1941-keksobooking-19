'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var DEBOUNCE_INTERVAL = 500;

  function onPopupEscPress(evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  }

  function closePopup(element) {
    if (element) {
      element.remove();
    }
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function getRandElement(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  function getRandElementArr(array) {
    var randItem;

    for (var i = 0; i < array.length; i++) {
      randItem = Math.floor(Math.random() * array.length);
    }
    return array[randItem];
  }

  function getRandLengthArr(array) {
    var newArray = [];
    var newLength = getRandElement(1, array.length);

    for (var k = 0; k < newLength; k++) {
      newArray[k] = getRandElementArr(array);
    }

    return newArray;
  }

  function debounce(cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.utils = {
    ENTER_KEY: ENTER_KEY,
    onPopupEscPress: onPopupEscPress,
    closePopup: closePopup,
    getRandElement: getRandElement,
    getRandElementArr: getRandElementArr,
    getRandLengthArr: getRandLengthArr,
    debounce: debounce
  };
})();
