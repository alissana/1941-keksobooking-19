'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content;
  var pinTemplateElement = document.querySelector('.map__pins');

  function pinSuccessHandler(cards) {
    var sortedCards = cards.filter(function (card) {
      var shouldPresent = true;

      if (typeof card.offer === 'undefined' || card.offer === '') {
        shouldPresent = false;
      }

      return shouldPresent;
    });
    renderPins(sortedCards);
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('map', node);
  }

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

  window.pin = {
    renderPins: renderPins,
    pinSuccessHandler: pinSuccessHandler,
    errorHandler: errorHandler
  };
})();
