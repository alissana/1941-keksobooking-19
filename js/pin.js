'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var X_MAIN_PIN = 84;
  var Y_MAIN_PIN = 72;
  var COUNTCARDS = 8;

  var map = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin')
  .content;
  var pinTemplateElement = document.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFilters = map.querySelector('.map__filters-container');
  var mapFiltersForm = mapFilters.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var cardsData = window.data.getCards(COUNTCARDS);

  function createPin(card) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('.map__pin').style.left = card.location.x + 'px';
    pinElement.querySelector('.map__pin').style.top = card.location.y + 'px';
    pinElement.querySelector('.map__pin img').src = card.author.avatar;
    pinElement.querySelector('.map__pin img').alt = card.offer.title;

    pinElement.querySelector('.map__pin').addEventListener('click', function () {
      var container = document.querySelector('.map');
      window.card.renderCard(container, window.card.createCard(card));
    });

    return pinElement;
  }

  function renderPins(cards) {
    for (var i = 0; i < cards.length; i++) {
      pinTemplateElement.appendChild(createPin(cards[i]));
    }
  }

  function activePage(evt) {
    if (evt.button === 0 || evt.key === ENTER_KEY) {
      var mapPin = map.querySelectorAll('.map__pin:not(.map__pin--main)');

      if (mapPin.length === 0) {
        map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');
        mapFiltersForm.classList.remove('mapFiltersForm--disabled');
        window.form.deleteAttribute(adFormFieldset, 'disabled');
        renderPins(cardsData);
        window.data.getAddress(X_MAIN_PIN, Y_MAIN_PIN);
      }
    }
  }

  mapPinMain.addEventListener('mousedown', activePage);
  mapPinMain.addEventListener('keydown', activePage);
})();
