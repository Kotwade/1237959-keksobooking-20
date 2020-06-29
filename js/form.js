'use strict';

(function () {
  var adFormHeader = document.querySelector('.ad-form-header');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var mapFilters = document.querySelectorAll('.map__filter');
  var mapFeatures = document.querySelector('.map__features');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
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

  var changeActivesState = function (isActiveState) {
    adFormHeader.disabled = !isActiveState;
    mapFeatures.disabled = !isActiveState;
    Array.from(adFormElements).forEach(function (element) {
      element.disabled = !isActiveState;
    });
    Array.from(mapFilters).forEach(function (element) {
      element.disabled = !isActiveState;
    });
  };

  var validateCapacity = function () {
    var roomValue = roomNumber.value;
    var capacityValue = capacity.value;

    if (roomValue === RoomType.ONE && capacityValue !== CapacityType.ONE) {
      capacity.setCustomValidity('выберите не более 1 гостя');
    } else if (roomValue === RoomType.TWO && capacityValue !== CapacityType.ONE && capacityValue !== CapacityType.TWO) {
      capacity.setCustomValidity('выберите не более 2 гостей');
    } else if (roomValue === RoomType.THREE && capacityValue === CapacityType.FOUR) {
      capacity.setCustomValidity('выберите не более 3 гостей');
    } else if (roomValue === RoomType.FOUR && capacityValue !== CapacityType.FOUR) {
      capacity.setCustomValidity('выберите не для гостей');
    } else {
      capacity.setCustomValidity('');
    }
  };

  window.map.adForm.addEventListener('change', function (evt) {
    if (evt.target.id === capacity.id || evt.target.id === roomNumber.id) {
      validateCapacity();
    }
  });

  window.form = {
    changeActivesState: changeActivesState,
    validateCapacity: validateCapacity
  };
})();
