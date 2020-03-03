'use strict';

(function () {
  var X_MAIN_PIN = 65;
  var Y_MAIN_PIN = 84;
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFilters = map.querySelector('.map__filters-container');
  var mapFiltersForm = mapFilters.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var error = document.querySelector('#error').content;
  var errorElement = error.querySelector('.error');
  var errorContent = errorElement.querySelector('.error__message');
  var errorButton = errorElement.querySelector('.error__button');

  function pinSuccessHandler(cards) {
    var sortedCards = cards.filter(function (card) {
      var shouldPresent = true;

      if (typeof card.offer === 'undefined' || card.offer === '') {
        shouldPresent = false;
      }

      return shouldPresent;
    });
    window.pin.renderPins(sortedCards);
  }

  function errorHandler(errorMessage) {
    main.appendChild(errorElement);
    errorContent.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
    errorButton.addEventListener('click', function () {
      window.utils.closePopup(errorElement);
    });
    errorElement.addEventListener('click', function () {
      window.utils.closePopup(errorElement);
    });
    document.addEventListener('keydown', function (evt) {
      window.utils.onPopupEscPress(evt, function () {
        window.utils.closePopup(errorElement);
      });
    });
  }


  function pinSuccessHandler(cards) {
    var sortedCards = cards.filter(function (card) {
      var shouldPresent = true;

      if (typeof card.offer === 'undefined' || card.offer === '') {
        shouldPresent = false;
      }

      return shouldPresent;
    });
    window.pin.renderPins(sortedCards);
  }

  function pinErrorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('map', node);
  }

  function activePage(evt) {
    if (evt.button === 0 || evt.key === window.utils.ENTER_KEY) {
      var mapPin = map.querySelectorAll('.map__pin:not(.map__pin--main)');

      if (mapPin.length === 0) {
        map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');
        mapFiltersForm.classList.remove('mapFiltersForm--disabled');
        window.form.deleteAttribute(adFormFieldset, 'disabled');
        window.backend.download(pinSuccessHandler, errorHandler);
        window.data.getAddress(X_MAIN_PIN, Y_MAIN_PIN);
      }
    }
  }

  mapPinMain.addEventListener('mousedown', activePage);
  mapPinMain.addEventListener('keydown', activePage);

  window.map = {
    X_MAIN_PIN: X_MAIN_PIN,
    Y_MAIN_PIN: Y_MAIN_PIN,
    map: map,
    mapFiltersForm: mapFiltersForm,
    mapPinMain: mapPinMain,
    activePage: activePage,
    errorHandler: errorHandler
  };
})();
