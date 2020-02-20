'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var titleInput = adForm.querySelector('#title');
  var priceInput = adForm.querySelector('#price');
  var typeHouse = adForm.querySelector('#type');

  titleInput.addEventListener('input', function (evt) {
    var target = evt.target;

    switch (true) {
      case target.value.length < window.const.MIN_TITLE_LENGTH:
        target.setCustomValidity('Минимальная длина заголовка ' + window.const.MIN_TITLE_LENGTH + ' символов');
        break;
      case target.value.length > window.const.MAX_TITLE_LENGTH:
        target.setCustomValidity('Максимальная длина заголовка ' + window.const.MAX_TITLE_LENGTH + ' символов');
        break;
      default:
        target.setCustomValidity('');
        break;
    }
  });

  titleInput.addEventListener('invalid', function () {

    switch (true) {
      case titleInput.validity.tooShort:
        titleInput.setCustomValidity('Минимальная длина заголовка 30 символов');
        break;
      case titleInput.validity.tooLong:
        titleInput.setCustomValidity('Максимальная длина заголовка 100 символов');
        break;
      case titleInput.validity.valueMissing:
        titleInput.setCustomValidity('Обязательное поле');
        break;
      default:
        titleInput.setCustomValidity('');
        break;
    }
  });

  typeHouse.addEventListener('change', function (evt) {
    var target = evt.target;

    priceInput.placeholder = window.dictionaries.HousingPrice[target.value];
    priceInput.min = window.dictionaries.HousingPrice[target.value];
  });

  priceInput.addEventListener('input', function (evt) {
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

  priceInput.addEventListener('invalid', function () {
    var min = priceInput.getAttribute('min');

    switch (true) {
      case priceInput.validity.rangeOverflow:
        priceInput.setCustomValidity('Максимальная цена за ночь 1 000 000 рублей');
        break;
      case priceInput.validity.rangeUnderflow:
        priceInput.setCustomValidity('Минимальная цена за ночь ' + min + ' рублей');
        break;
      default:
        priceInput.setCustomValidity('Обязательное поле');
        break;
    }
  });
})();

window.validity = (function () {
  function getValidElement(evt, selectFirst, selectSecond, objectKeys) {
    var el = (typeof evt === 'undefined') ? selectFirst : evt.currentTarget;
    var validEl = objectKeys[el.value];
    var selectSecondOption = selectSecond.querySelectorAll('option');

    if (selectSecondOption) {
      for (var i = 0; i < selectSecondOption.length; i++) {
        var optionEl = selectSecondOption[i];

        optionEl.disabled = (validEl.indexOf(optionEl.value) === -1) ? true : false;
      }
      selectSecond.querySelector('option[value="' + validEl[0] + '"]').selected = true;
    }
  }
  return {
    getValidElement: getValidElement
  };
})();
