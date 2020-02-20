'use strict';

window.popup = (function () {
  var map = document.querySelector('.map');

  function onPopupEscPress(evt) {
    if (evt.key === window.const.ESC_KEY) {
      closePopup();
    }
  }

  function closePopup() {
    var popup = map.querySelector('.popup');

    if (popup) {
      popup.remove();
    }

    document.removeEventListener('keydown', onPopupEscPress);
  }

  return {
    onPopupEscPress: onPopupEscPress,
    closePopup: closePopup
  };
})();
