'use strict';

(function () {
  var adFormHeader = document.querySelector('.ad-form-header');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var mapFilters = document.querySelectorAll('.map__filter');
  var mapFeatures = document.querySelector('.map__features');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var addressInput = document.querySelector('#address');
  var titleInput = document.querySelector('#title');
  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');

  var offerTypesValues = {
    'bungalo': {
      minLimit: 0
    },
    'flat': {
      minLimit: 1000
    },
    'house': {
      minLimit: 5000
    },
    'palace': {
      minLimit: 10000
    }
  };

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

  titleInput.addEventListener('input', function () {
    var message = '';

    if (titleInput.validity.tooShort) {
      message = 'Заголовок должен состоять минимум из 30-ти символов';
    } else if (titleInput.validity.tooLong) {
      message = 'Заголовок не должен превышать 100 символов';
    } else if (titleInput.validity.valueMissing) {
      message = 'Обязательное поле';
    }
    titleInput.setCustomValidity(message);
  });

  var validatePrice = function () {
    var housingValue = typeSelect.value;
    var priceValue = priceInput.value;

    var minLimit = offerTypesValues[housingValue].minLimit;

    var message = priceValue < minLimit ? 'Цена должна быть не меньше чем ' + minLimit : '';


    priceInput.setCustomValidity(message);
  };

  var updateHousing = function () {
    var housingValue = typeSelect.value;

    var minLimit = offerTypesValues[housingValue].minLimit;
    priceInput.setAttribute('min', minLimit);
    priceInput.setAttribute('placeholder', minLimit);
  };

  var validateCapacity = function () {
    var roomValue = roomNumber.value;
    var capacityValue = capacity.value;

    var message = '';

    if (roomValue === RoomType.ONE && capacityValue !== CapacityType.ONE) {
      message = 'выберите не более 1 гостя';
    } else if (roomValue === RoomType.TWO && capacityValue !== CapacityType.ONE && capacityValue !== CapacityType.TWO) {
      message = 'выберите не более 2 гостей';
    } else if (roomValue === RoomType.THREE && capacityValue === CapacityType.FOUR) {
      message = 'выберите не более 3 гостей';
    } else if (roomValue === RoomType.FOUR && capacityValue !== CapacityType.FOUR) {
      message = 'выберите не для гостей';
    }
    capacity.setCustomValidity(message);
  };

  window.map.adForm.addEventListener('change', function (evt) {
    if (evt.target.id === capacity.id || evt.target.id === roomNumber.id) {
      validateCapacity();
    } else if (evt.target.id === timeInInput.id) {
      timeOutInput.value = timeInInput.value;
    } else if (evt.target.id === timeOutInput.id) {
      timeInInput.value = timeOutInput.value;
    } else if (evt.target.id === typeSelect.id) {
      updateHousing();
      validatePrice();
    } else if (evt.target.id === typeSelect.id || evt.target.id === priceInput.id) {
      validatePrice();
    }
  });

  var updateAddressInput = function (x, y) {
    addressInput.value = x + ', ' + y;
  };


  window.form = {
    changeActivesState: changeActivesState,
    validateCapacity: validateCapacity,
    addressInput: addressInput,
    updateHousing: updateHousing,
    updateAddressInput: updateAddressInput
  };
})();
