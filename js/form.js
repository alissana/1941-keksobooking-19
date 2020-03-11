'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var roomsForGuestsMap = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };
  var timeKeyMap = {
    '12:00': ['12:00'],
    '13:00': ['13:00'],
    '14:00': ['14:00']
  };
  var housingPriceMap = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };
  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var title = adForm.querySelector('#title');
  var price = adForm.querySelector('#price');
  var typeHouse = adForm.querySelector('#type');
  var rooms = adForm.querySelector('#room_number');
  var guests = adForm.querySelector('#capacity');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var successTemplate = document.querySelector('#success').content;
  var successPopup = successTemplate.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content;
  var errorPopup = errorTemplate.querySelector('.error');
  var errorContent = errorPopup.querySelector('.error__message');
  var errorButton = errorPopup.querySelector('.error__button');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var onClickResetForm = function () {
    resetPage();
  };
  var onSubmitForm = function () {
    resetPage();
    main.appendChild(successPopup);

    document.addEventListener('keydown', function (evt) {
      window.utils.onPopupEscPress(evt, function () {
        window.utils.closePopup(successPopup);
      });
    });

    document.addEventListener('click', function () {
      window.utils.closePopup(successPopup);
    });
  };

  window.utils.addAttribute(adFormFieldset, 'disabled');

  function resetPage() {
    window.map.container.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.map.filters.reset();
    window.map.filters.classList.add('mapFiltersForm--disabled');
    adForm.reset();
    window.utils.addAttribute(adFormFieldset, 'disabled');
    window.card.closeCard();
    window.pin.clearPins();
    window.avatar.preview.src = 'img/muffin-grey.svg';
    window.avatar.imageHousing.src = ' ';
    window.data.pinMain.style.left = '570px';
    window.data.pinMain.style.top = '375px';
    price.placeholder = 'от 1000';
    price.min = '1000';
    window.data.getAddress(window.data.MAIN_PIN_X, window.data.MAIN_PIN_Y);

    window.data.pinMain.addEventListener('mousedown', window.map.onMouseDownMainPin);
  }

  function onError(errorMessage) {
    main.appendChild(errorPopup);
    errorContent.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorPopup);

    errorButton.addEventListener('click', function () {
      window.utils.closePopup(errorPopup);
    });

    errorPopup.addEventListener('click', function () {
      window.utils.closePopup(errorPopup);
    });

    document.addEventListener('keydown', function (evt) {
      window.utils.onPopupEscPress(evt, function () {
        window.utils.closePopup(errorPopup);
      });
    });
  }

  title.addEventListener('input', function (evt) {
    var target = evt.target;

    switch (true) {
      case target.value.length < MIN_TITLE_LENGTH:
        target.setCustomValidity('Минимальная длина заголовка ' + MIN_TITLE_LENGTH + ' символов');
        break;
      case target.value.length > MAX_TITLE_LENGTH:
        target.setCustomValidity('Максимальная длина заголовка ' + MAX_TITLE_LENGTH + ' символов');
        break;
      default:
        target.setCustomValidity('');
        break;
    }
  });

  title.addEventListener('invalid', function () {
    switch (true) {
      case title.validity.tooShort:
        title.setCustomValidity('Минимальная длина заголовка 30 символов');
        break;
      case title.validity.tooLong:
        title.setCustomValidity('Максимальная длина заголовка 100 символов');
        break;
      case title.validity.valueMissing:
        title.setCustomValidity('Обязательное поле');
        break;
      default:
        title.setCustomValidity('');
        break;
    }
  });

  typeHouse.addEventListener('change', function (evt) {
    var target = evt.target;

    price.placeholder = 'от ' + housingPriceMap[target.value];
    price.min = housingPriceMap[target.value];
  });

  price.addEventListener('input', function (evt) {
    var target = evt.target;
    var min = target.getAttribute('min');

    switch (true) {
      case min === 0 && target.value < 0:
        target.setCustomValidity('Минимальная цена за ночь 0 рублей');
        break;
      case min === 1000 && target.value < 1000:
        target.setCustomValidity('Минимальная цена за ночь 1000 рублей');
        break;
      case min === 5000 && target.value < 50000:
        target.setCustomValidity('Минимальная цена за ночь 5000 рублей');
        break;
      case min === 10000 && target.value < 10000:
        target.setCustomValidity('Минимальная цена за ночь 10000 рублей');
        break;
      case target.value > 1000000:
        target.setCustomValidity('Максимальная цена за ночь 1 000 000 рублей');
        break;
      default:
        target.setCustomValidity('');
        break;
    }
  });

  price.addEventListener('invalid', function () {
    var min = price.getAttribute('min');

    switch (true) {
      case price.validity.rangeOverflow:
        price.setCustomValidity('Максимальная цена за ночь 1 000 000 рублей');
        break;
      case price.validity.rangeUnderflow:
        price.setCustomValidity('Минимальная цена за ночь ' + min + ' рублей');
        break;
      default:
        price.setCustomValidity('Обязательное поле');
        break;
    }
  });

  var onChangeRooms = function (evt) {
    window.utils.getValidElement(evt, rooms, guests, roomsForGuestsMap);
  };

  var onChangeTimeIn = function (evt) {
    window.utils.getValidElement(evt, timeIn, timeOut, timeKeyMap);
  };

  rooms.addEventListener('change', onChangeRooms);
  timeIn.addEventListener('change', onChangeTimeIn);

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), onSubmitForm, onError);
    evt.preventDefault();
  });

  resetButton.addEventListener('click', onClickResetForm);

  window.form = {
    adProfile: adForm,
    adProfileFieldset: adFormFieldset,
    main: main,
    onError: onError
  };
})();
