'use strict';

(function () {
  function updatePins(cards) {
    var sortedCards = cards.filter(function (card) {
      var shouldPresent = true;

      if (typeof card.offer === 'undefined' || card.offer === '') {
        shouldPresent = false;
      }
      return shouldPresent;
    });
    window.pin.renderPins(sortedCards);
  }

  function reloadPins() {
    var popup = window.map.map.querySelector('.popup');
    window.utils.closePopup(popup);
    window.pin.clearPins();
    window.pin.renderPins(window.map.filteredOffers);
  }

  window.map.mapFiltersForm.addEventListener('change', function () {
    window.map.filteredOffers = applyFilters(window.map.dataPins);
    reloadPins();
  });

  function applyFilters(data) {
    return data
      .filter(function (offer) {
        return (
          filterHousingType(offer) &&
          filterHousingPrice(offer) &&
          filterHousingRooms(offer) &&
          filterHousingGuests(offer) &&
          filterHousingFeatures(offer)
        );
      });
  }

  function filterHousingType(card) {
    var housingType = window.map.mapFiltersForm.querySelector('#housing-type');
    return housingType.value === 'any' ? true : card.offer.type === housingType.value;
  }

  function filterHousingPrice(card) {
    var housingPrice = window.map.mapFiltersForm.querySelector('#housing-price');
    var result;

    switch (housingPrice.value) {
      case 'low':
        result = card.offer.price < 10000;
        break;
      case 'middle':
        result = card.offer.price >= 10000 && card.offer.price <= 50000;
        break;
      case 'high':
        result = card.offer.price > 50000;
        break;
      case 'any':
      default:
        result = true;
        break;
    }

    return result;
  }

  function filterHousingRooms(card) {
    var housingRooms = window.map.mapFiltersForm.querySelector('#housing-rooms');
    return housingRooms.value === 'any' ? true : card.offer.rooms === +housingRooms.value;
  }

  function filterHousingGuests(card) {
    var housingGuests = window.map.mapFiltersForm.querySelector('#housing-guests');
    return housingGuests.value === 'any' ? true : card.offer.guests === +housingGuests.value;
  }

  function filterHousingFeatures(card) {
    var housingFeatures = window.map.mapFiltersForm.querySelectorAll('.map__checkbox');

    var featuresFiltered = Array.from(housingFeatures, function (el) {
      return el.checked === false ? true : card.offer.features.indexOf(el.value) !== -1;
    });

    var featuresFilteredValue = featuresFiltered.filter(function (feature) {
      return feature === false;
    });

    return !featuresFilteredValue.length;
  }

  window.filter = {
    updatePins: updatePins
  };
})();
