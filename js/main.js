'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var cardTemplate = document.querySelector('#card')
    .content;
var cardTemplateElement = cardTemplate.querySelector('.popup');

var pinTemplate = document.querySelector('#pin')
    .content;
var pinTemplateElement = document.querySelector('.map__pins');

var TYPEHOUSE = ['palace', 'flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TITLE = ['Уютная квартира на берегу залива', 'Из такой квартиры не захочется уезжать', 'Бунгало с видом на океан', 'Дом в скандинавском стиле', 'Уютные аппартаменты в Центре', 'Квартира в небоскребе на 121 этаже', 'Квартира для ценителей минимализма', 'Дом для семьи из 4 человек'];
var DESCRIPTION = ['Очень уютная квартира-студия в центре. Сделан евроремонт. Установлена вся необходимая техника: холодильник, свч, электрическая плита, посудомоечная, стиральная машина, телевизор, фен, утюг.', 'Квартира у Аквапарка Ривьера. С wi-fi кондиционером, горячая вода есть всегда! На кухне есть все необходимое что бы готовить и даже фартук.', 'Одноэтажная квартира (Лестница не используется и является частью интерьера) с отдельной спальней и совмещённой гостиной/кухней, отличный вариант как на пару, так и на компанию из 3-4 человек.', 'Удобное пространство, где могут разместиться до 3 человек. Эта квартира находится в 3 минутах езды от Синдзюку на поезде, а также недалеко от Сибуя!', 'Мой дом - типичный дом в японском стиле, расположенный в тихом жилом районе в 6 минутах ходьбы от станции Асагая.', 'Эти дизайнерские апартаменты находятся в 9 минутах ходьбы от станции MACHIYA.', 'TASU TOCO - это дизайнерская внутренняя квартира, расположенная в 15 минутах езды на поезде от станции Синдзюку.', 'Квартира находится в жилом районе, поэтому вы можете спать спокойно и спать по ночам.', 'У нас есть просторная кухня и лаундж, поэтому долгожданные гости очень приветствуются!'];

function getRandElement(min, max) {
  var rand;
  rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getRandElementArr(arr) {
  var randItem;

  for (var i = 0; i < arr.length; i++) {
    randItem = Math.floor(Math.random() * arr.length);
  }
  return arr[randItem];
}

function getCard(countCards) {
  var cards = [];

  for (var i = 0; i < countCards; i++) {
    cards[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandElementArr(TITLE),
        address: (getRandElement(0, 1100) + 25) + ', ' + (getRandElement(130, 560) + 70),
        price: getRandElement(1000, 100000),
        type: getRandElementArr(TYPEHOUSE),
        rooms: getRandElement(1, 3),
        guests: getRandElement(1, 3),
        checkin: getRandElementArr(TIME),
        checkout: getRandElementArr(TIME),
        features: getRandElementArr(FEATURES),
        description: getRandElementArr(DESCRIPTION),
        photos: getRandElementArr(PHOTOS)
      },
      location: {
        x: getRandElement(0, 1100) + 25,
        y: getRandElement(130, 560) + 70
      }
    };
  }

  return cards;
}

function createCard(card) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price;
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + 'комнаты для' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__photos').textContent = card.offer.photos;

  return cardElement;
}

function copyCard(cards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < cards.length; i++) {
    fragment.appendChild(createCard(cards[i]));
  }

  cardTemplateElement.appendChild(fragment);
}

function createPin(card) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('.map__pin').style.left = card.location.x + 'px';
  pinElement.querySelector('.map__pin').style.top = card.location.y + 'px';

  pinElement.querySelector('.map__pin img').src = card.author.avatar;
  pinElement.querySelector('.map__pin img').alt = card.offer.title;

  return pinElement;
}

function copyPin(cards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < cards.length; i++) {
    fragment.appendChild(createPin(cards[i]));
  }

  pinTemplateElement.appendChild(fragment);
}

var countCards = 8;
var cardsData = getCard(countCards);

copyCard(countCards);
copyPin(cardsData);

