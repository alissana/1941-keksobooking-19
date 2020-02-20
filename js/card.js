'use strict';

window.card = (function () {
  var cardTemplate = document.querySelector('#card')
    .content;

  function createCard(card) {
    var cardElement = cardTemplate.cloneNode(true);

    var imageContainer = cardElement.querySelector('.popup__photos');
    var featureContainer = cardElement.querySelector('.popup__features');
    var closeButton = cardElement.querySelector('.popup__close');

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.const.TYPEHOUSE_LABELS[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    document.addEventListener('keydown', function (evt) {
      window.popup.onPopupEscPress(evt);
    });

    closeButton.addEventListener('click', function () {
      window.popup.closePopup();
    });

    window.data.renderImage(imageContainer, card.offer.photos);
    window.data.renderFeature(featureContainer, card.offer.features);

    return cardElement;
  }

  function renderCard(container, card) {
    window.popup.closePopup();
    container.appendChild(card);
  }

  return {
    createCard: createCard,
    renderCard: renderCard
  };
})();
