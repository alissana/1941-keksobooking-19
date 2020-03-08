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
    debounce: debounce
  };
})();
