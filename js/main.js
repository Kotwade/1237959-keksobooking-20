'use strict';

var RoomType = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  FOUR: '100'
};

var CapacityType = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  FOUR: '0'
};

var LEFT_MOUSE_CODE = 0;
var ENTER_KEY_CODE = 'Enter';

var isActiveState = false;

var adMap = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');

var adFormHeader = document.querySelector('.ad-form-header');
var adFormElements = document.querySelectorAll('.ad-form__element');
var mapFilters = document.querySelectorAll('.map__filter');
var mapFeatures = document.querySelector('.map__features');
var mapPinMain = document.querySelector('.map__pin--main');

var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

// var changeActivesState = function () {
//   adFormHeader.disabled = !isActiveState;
//   mapFeatures.disabled = !isActiveState;
//   Array.from(adFormElements).forEach(function (element) {
//     element.disabled = !isActiveState;
//   });
//   Array.from(mapFilters).forEach(function (element) {
//     element.disabled = !isActiveState;
//   });
// };

// var startActiveMode = function () {
//   isActiveState = true;
//   adMap.classList.remove('map--faded');
//   adForm.classList.remove('ad-form--disabled');
//   window.map.renderPoints(randomPoints);
//   window.form.changeActivesState();
//   window.pin.createMainPinLocation();
// };
//
// var initEvents = function (randomPoints) {
//   mapPinMain.addEventListener('mousedown', function (evt) {
//     if (evt.button === LEFT_MOUSE_CODE && !isActiveState) {
//       startActiveMode(randomPoints);
//     }
//   });
//   mapPinMain.addEventListener('keydown', function (evt) {
//     if (evt.code === ENTER_KEY_CODE && !isActiveState) {
//       startActiveMode(randomPoints);
//     }
//   });
// };

// var validateCapacity = function () {
//   var roomValue = roomNumber.value;
//   var capacityValue = capacity.value;
//
//   if (roomValue === RoomType.ONE && capacityValue !== CapacityType.ONE) {
//     capacity.setCustomValidity('выберите не более 1 гостя');
//   } else if (roomValue === RoomType.TWO && capacityValue !== CapacityType.ONE && capacityValue !== CapacityType.TWO) {
//     capacity.setCustomValidity('выберите не более 2 гостей');
//   } else if (roomValue === RoomType.THREE && capacityValue === CapacityType.FOUR) {
//     capacity.setCustomValidity('выберите не более 3 гостей');
//   } else if (roomValue === RoomType.FOUR && capacityValue !== CapacityType.FOUR) {
//     capacity.setCustomValidity('выберите не для гостей');
//   } else {
//     capacity.setCustomValidity('');
//   }
// };
//
// adForm.addEventListener('change', function (evt) {
//   if (evt.target.id === capacity.id || evt.target.id === roomNumber.id) {
//     validateCapacity();
//   }
// });

var pageLoad = function () {
  window.pin.createMainPinLocation();
  window.form.validateCapacity();
  window.form.changeActivesState();
};

// var randomPoints = window.data.getRandomPoints(8);

pageLoad();

window.map.initEvents(window.map.randomPoints);


