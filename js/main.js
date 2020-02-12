'use strict';

var ENTER_KEY = 'Enter';
var COUNTCARDS = 8;
var TYPEHOUSE = ['palace', 'flat', 'house', 'bungalo'];
var TYPEHOUSE_LABELS = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TITLE = ['Уютная квартира на берегу залива', 'Из такой квартиры не захочется уезжать', 'Бунгало с видом на океан', 'Дом в скандинавском стиле', 'Уютные аппартаменты в Центре', 'Квартира в небоскребе на 121 этаже', 'Квартира для ценителей минимализма', 'Дом для семьи из 4 человек'];
var DESCRIPTION = ['Очень уютная квартира-студия в центре. Сделан евроремонт. Установлена вся необходимая техника: холодильник, свч, электрическая плита, посудомоечная, стиральная машина, телевизор, фен, утюг.', 'Квартира у Аквапарка Ривьера. С wi-fi кондиционером, горячая вода есть всегда! На кухне есть все необходимое что бы готовить и даже фартук.', 'Одноэтажная квартира (Лестница не используется и является частью интерьера) с отдельной спальней и совмещённой гостиной/кухней, отличный вариант как на пару, так и на компанию из 3-4 человек.', 'Удобное пространство, где могут разместиться до 3 человек. Эта квартира находится в 3 минутах езды от Синдзюку на поезде, а также недалеко от Сибуя!', 'Мой дом - типичный дом в японском стиле, расположенный в тихом жилом районе в 6 минутах ходьбы от станции Асагая.', 'Эти дизайнерские апартаменты находятся в 9 минутах ходьбы от станции MACHIYA.', 'TASU TOCO - это дизайнерская внутренняя квартира, расположенная в 15 минутах езды на поезде от станции Синдзюку.', 'Квартира находится в жилом районе, поэтому вы можете спать спокойно и спать по ночам.', 'У нас есть просторная кухня и лаундж, поэтому долгожданные гости очень приветствуются!'];

var map = document.querySelector('.map');
var mapFilters = map.querySelector('.map__filters-container');
var adForm = document.querySelector('.ad-form');
var inputAdress = adForm.querySelector('#address');
var adFormFieldset = adForm.querySelectorAll('fieldset');

var mapFiltersForm = mapFilters.querySelector('.map__filters');

var cardTemplate = document.querySelector('#card')
    .content;

var pinTemplate = document.querySelector('#pin')
    .content;
var pinTemplateElement = document.querySelector('.map__pins');

var mapPinMain = map.querySelector('.map__pin--main');

function getRandElement(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandElementArr(arr) {
  var randItem;

  for (var i = 0; i < arr.length; i++) {
    randItem = Math.floor(Math.random() * arr.length);
  }
  return arr[randItem];
}

function getRandLengthArr(arr) {
  var newArr = [];
  var newLength = getRandElement(1, arr.length);

  for (var k = 0; k < newLength; k++) {
    newArr[k] = getRandElementArr(arr);
  }

  return newArr;
}

function getCards(numberOfCards) {
  var cards = [];

  for (var i = 0; i < numberOfCards; i++) {
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
        features: getRandLengthArr(FEATURES),
        description: getRandElementArr(DESCRIPTION),
        photos: getRandLengthArr(PHOTOS)
      },
      location: {
        x: getRandElement(0, 1100) + 25,
        y: getRandElement(130, 560) + 70
      }
    };
  }
  return cards;
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


function createCard(card) {
  var cardElement = cardTemplate.cloneNode(true);
  var imageContainer = cardElement.querySelector('.popup__photos');
  var featureContainer = cardElement.querySelector('.popup__features');

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPEHOUSE_LABELS[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  renderImage(imageContainer, card.offer.photos);
  renderFeature(featureContainer, card.offer.features);

  return cardElement;
}

function renderCards(cards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < cards.length; i++) {
    fragment.appendChild(createCard(cards[i]));
  }

  map.insertBefore(fragment, mapFilters);
}

function createPin(card) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('.map__pin').style.left = card.location.x + 'px';
  pinElement.querySelector('.map__pin').style.top = card.location.y + 'px';

  pinElement.querySelector('.map__pin img').src = card.author.avatar;
  pinElement.querySelector('.map__pin img').alt = card.offer.title;

  return pinElement;
}

function renderPins(cards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < cards.length; i++) {
    fragment.appendChild(createPin(cards[i]));
  }

  pinTemplateElement.appendChild(fragment);
}

var cardsData = getCards(COUNTCARDS);
var firstCard = [cardsData[0]];

//renderCards(firstCard);

function addAttribute(tagList, attributeName) {
  if (tagList) {
    for (var i = 0; i < tagList.length; i++) {
      tagList[i].setAttribute(attributeName, 'true');
    }
  }
}

function deleteAttribute(tagList, attributeName) {
  if (tagList) {
    for (var i = 0; i < tagList.length; i++) {
      tagList[i].removeAttribute(attributeName);
    }
  }
}

var disabled = 'disabled'
addAttribute(adFormFieldset, disabled);


function logButton(e, card) {
  if (e.button === 0 || e.key === ENTER_KEY) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFiltersForm.classList.remove('mapFiltersForm--disabled');
    deleteAttribute(adFormFieldset, disabled);
    renderPins(cardsData);
  }
}

mapPinMain.addEventListener('mousedown', logButton);
mapPinMain.addEventListener('keydown', logButton);

/*
  Рабочий вариант c изменением option
*/

// var rooms = adForm.querySelector('#room_number');
// var guests = adForm.querySelector('#capacity');

// var ROOMS_FOR_GUESTS = {
//   '1': ['1'],
//   '2': ['2', '1'],
//   '3': ['3', '2', '1'],
//   '100': ['0']
// };

// var CAPACITY = {
//   '1': 'для 1 гостя',
//   '2': 'для 2 гостей',
//   '3': 'для 3 гостей',
//   '0': 'не для гостей'
// }

// function validRoomsForGuests() {
//   var roomValue = (typeof this !== 'undefined') ? this.value : 1;
//   var validRooms = ROOMS_FOR_GUESTS[roomValue];
//   var guestsHTML = '';

//   for (var i = 0; i < validRooms.length; i++) {
//     guestsHTML += '<option value="' + validRooms[i] + '">' + CAPACITY[validRooms[i]] + '</option>';
//   }

//   guests.innerHTML = guestsHTML;
// }

// rooms.addEventListener('change', validRoomsForGuests);

// validRoomsForGuests();

/*
  Рабочий вариант без изменения option
*/

var rooms = adForm.querySelector('#room_number');
var guests = adForm.querySelector('#capacity');

var ROOMS_FOR_GUESTS = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

function validRoomsForGuests() {
  var el = (typeof this !== 'undefined') ? this : rooms;
  var validRooms = ROOMS_FOR_GUESTS[el.value];

  var options = guests.querySelectorAll('option');

  if (options) {
    for (var i = 0; i < options.length; i++) {
      var optionEl = options[i];

      optionEl.disabled = (validRooms.indexOf(optionEl.value) === -1) ? true : false;
    }

    guests.querySelector('option[value="' + validRooms[0] + '"]').selected = true;
  }
}

rooms.addEventListener('change', validRoomsForGuests);
validRoomsForGuests();