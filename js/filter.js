'use strict';

(function () {
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

  var applyFilters = function (data) {
    return data
      .filter(function (offer) {
        return (
          filterHousingType(offer)
        );
      });
  };

  function filterHousingType(card) {
    var housing = window.map.mapFiltersForm.querySelector('#housing-type');
    return housing.value === 'any' ? true : card.offer.type === housing.value;
  }
})();
