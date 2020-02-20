'use strict';

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
var mapPinMain = map.querySelector('.map__pin--main');
var rooms = adForm.querySelector('#room_number');
var guests = adForm.querySelector('#capacity');
var ckeckin = adForm.querySelector('#timein');
var ckeckout = adForm.querySelector('#timeout');

window.validity.getValidElement(undefined, rooms, guests, window.dictionaries.RoomsForGuests);
rooms.addEventListener('change', function (evt) {
  window.validity.getValidElement(evt, rooms, guests, window.dictionaries.RoomsForGuests);
});
ckeckin.addEventListener('change', function (evt) {
  window.validity.getValidElement(evt, ckeckin, ckeckout, window.dictionaries.TimeKey);
});
window.data.getAddress(window.const.MAIN_PIN_CIRCLE, window.const.MAIN_PIN_HALF_CIRCLE);
window.attribute.addAttribute(adFormFieldset, window.const.DISABLED);
mapPinMain.addEventListener('mousedown', window.active.activePage);
mapPinMain.addEventListener('keydown', window.active.activePage);
