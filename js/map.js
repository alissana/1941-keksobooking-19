'use strict';

(function () {
  var X_MAIN_PIN = 65;
  var Y_MAIN_PIN = 84;
  var map = document.querySelector('.map');
  var filters = document.querySelector('.map__filters');

  function loadPins(cards) {
    window.map.dataPins = cards;
    window.filter.updatePins(window.map.dataPins);
    filters.classList.remove('mapFiltersForm--disabled');
  }

  function activePage(evt) {
    if (evt.button === 0 || evt.key === window.utils.ENTER_KEY) {
      var mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

      if (mapPins.length === 0) {
        map.classList.remove('map--faded');
        window.form.adProfile.classList.remove('ad-form--disabled');
        window.utils.deleteAttribute(window.form.adProfileFieldset, 'disabled');
        window.backend.download(onSuccessDownload, window.form.onError);
        window.data.getAddress(X_MAIN_PIN, Y_MAIN_PIN);
      }
    }
    window.data.pinMain.removeEventListener('mousedown', onMouseDownMainPin);
    window.data.pinMain.removeEventListener('keydown', onKeyDownMainPin);
  }

  var onSuccessDownload = function (cards) {
    loadPins(cards);
  };
  var onMouseDownMainPin = function (evt) {
    activePage(evt);
  };
  var onKeyDownMainPin = function (evt) {
    activePage(evt);
  };

  window.data.pinMain.addEventListener('mousedown', onMouseDownMainPin);
  window.data.pinMain.addEventListener('keydown', onKeyDownMainPin);

  window.map = {
    X_MAIN_PIN: X_MAIN_PIN,
    Y_MAIN_PIN: Y_MAIN_PIN,
    container: map,
    filters: filters,
    onMouseDownMainPin: onMouseDownMainPin
  };
})();
