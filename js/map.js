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

  var onSuccessDownload = function (cards) {
    loadPins(cards);
  };

  function activePage(evt) {
    if (evt.button === 0 || evt.key === window.utils.ENTER_KEY) {
      map.classList.remove('map--faded');
      window.backend.download(onSuccessDownload, window.form.onError);
      window.form.adProfile.classList.remove('ad-form--disabled');
      window.utils.deleteAttribute(window.form.adProfileFieldset, 'disabled');
      window.data.getAddress(X_MAIN_PIN, Y_MAIN_PIN);
    }
  }

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
    filters: filters
  };
})();
