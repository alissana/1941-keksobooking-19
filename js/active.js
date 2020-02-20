'use strict';

window.active = (function () {
  function activePage(evt) {
    var map = document.querySelector('.map');
    var adForm = document.querySelector('.ad-form');
    var mapFilters = map.querySelector('.map__filters-container');
    var mapFiltersForm = mapFilters.querySelector('.map__filters');
    var adFormFieldset = adForm.querySelectorAll('fieldset');
    var cardsData = window.data.getCards(window.const.COUNTCARDS);

    if (evt.button === 0 || evt.key === window.const.ENTER_KEY) {
      var mapPin = map.querySelectorAll('.map__pin:not(.map__pin--main)');

      if (mapPin.length === 0) {
        map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');
        mapFiltersForm.classList.remove('mapFiltersForm--disabled');
        window.attribute.deleteAttribute(adFormFieldset, window.const.DISABLED);
        window.pin.renderPins(cardsData);
        window.data.getAddress(window.const.X_MAIN_PIN, window.const.Y_MAIN_PIN);
      }
    }
  }
  return {
    activePage: activePage
  };
})();
