'use strict';

window.data = (function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  function getCards(numberOfCards) {
    var cards = [];

    for (var i = 0; i < numberOfCards; i++) {
      cards[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: window.random.getRandElementArr(window.const.TITLE),
          address: getAddress(window.const.X_OTHER_PIN, window.const.Y_OTHER_PIN),
          price: window.random.getRandElement(1000, 100000),
          type: window.random.getRandElementArr(window.const.TYPEHOUSE),
          rooms: window.random.getRandElement(1, 3),
          guests: window.random.getRandElement(1, 3),
          checkin: window.random.getRandElementArr(window.const.TIME),
          checkout: window.random.getRandElementArr(window.const.TIME),
          features: window.random.getRandLengthArr(window.const.FEATURES),
          description: window.random.getRandElementArr(window.const.DESCRIPTION),
          photos: window.random.getRandLengthArr(window.const.PHOTOS)
        },
        location: {
          x: window.random.getRandElement(0, 1100) + (window.const.X_OTHER_PIN / 2),
          y: window.random.getRandElement(130, 560) + window.const.Y_OTHER_PIN
        }
      };
    }
    return cards;
  }

  function getAddress(xPin, yPin) {
    var inputAddress = adForm.querySelector('#address');
    var left = mapPinMain.style.left;
    var top = mapPinMain.style.top;
    var xLocation = Math.floor(Number(left.replace('px', '')) + (xPin / 2));
    var yLocation = Math.floor(Number(top.replace('px', '')) + yPin);

    xLocation = (xLocation <= 0) ? 0 : xLocation;
    xLocation = (xLocation >= 1200) ? 1200 : xLocation;
    yLocation = (yLocation <= 130) ? 130 : yLocation;
    yLocation = (yLocation >= 630) ? 630 : yLocation;

    inputAddress.value = (xLocation + ', ' + yLocation);

    return xLocation + ', ' + yLocation;
  }

  function renderImage(container, photos) {
    container.innerHTML = '';

    for (var i = 0; i < photos.length; i++) {
      var img = document.createElement('img');

      img.src = photos[i];
      img.className = 'popup__photo';
      img.width = 45;
      img.height = 40;
      img.alt = 'Фотография жилья';

      container.appendChild(img);
    }
  }

  function renderFeature(container, features) {
    container.innerHTML = '';

    for (var i = 0; i < features.length; i++) {
      var li = document.createElement('li');

      li.textContent = features[i];
      li.className = 'popup__feature popup__feature--' + li.textContent;

      container.appendChild(li);
    }
  }

  return {
    getCards: getCards,
    getAddress: getAddress,
    renderImage: renderImage,
    renderFeature: renderFeature
  };
})();
