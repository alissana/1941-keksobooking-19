'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content;
  var pinTemplateElement = document.querySelector('.map__pins');

  function createPin(card) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('.map__pin').style.left = card.location.x + 'px';
    pinElement.querySelector('.map__pin').style.top = card.location.y + 'px';
    pinElement.querySelector('.map__pin img').src = card.author.avatar;
    pinElement.querySelector('.map__pin img').alt = card.offer.title;

    pinElement.querySelector('.map__pin').addEventListener('click', function (evt) {
      var container = document.querySelector('.map');
      var activeElement = evt.currentTarget;
      var activePin = window.map.mapArea.querySelector('.map__pin--active');

      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }

      activeElement.classList.add('map__pin--active');
      window.card.renderCard(container, window.card.createCard(card));
    });

    return pinElement;
  }

  function renderPins(cards) {
    var takeNumber = cards.length > 5 ? 5 : cards.length;
    for (var i = 0; i < takeNumber; i++) {
      pinTemplateElement.appendChild(createPin(cards[i]));
    }
  }

  function clearPins() {
    var buttonPin = window.map.mapArea.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < buttonPin.length; i++) {
      pinTemplateElement.removeChild(buttonPin[i]);
    }
  }

  window.pin = {
    renderPins: renderPins,
    clearPins: clearPins,
  };
})();
