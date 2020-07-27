'use strict';

(function () {
  var EMPTY_STRING = '';

  var BorderStyle = {
    RED: 'solid red 1px',
    NONE: 'none'
  };

  var adForm = document.querySelector('.ad-form');
  var adFormHeader = document.querySelector('.ad-form-header');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var mapFeatures = document.querySelector('.map__features');
  var roomNumber = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var addressInput = document.querySelector('#address');
  var titleInput = document.querySelector('#title');
  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var resetButton = document.querySelector('.ad-form__reset');

  var successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var errorElement = null;

  var successElement = null;

  var offerTypesValue = {
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

    if (isActiveState) {
      adForm.classList.remove('ad-form--disabled');
    } else {
      adForm.classList.add('ad-form--disabled');
    }

    Array.from(adFormElements).forEach(function (element) {
      element.disabled = !isActiveState;
    });
  };

  titleInput.addEventListener('input', function () {
    var message = EMPTY_STRING;

    if (titleInput.validity.tooShort) {
      message = 'Заголовок должен состоять минимум из 30-ти символов';
    } else if (titleInput.validity.tooLong) {
      message = 'Заголовок не должен превышать 100 символов';
    } else if (titleInput.validity.valueMissing) {
      message = 'Обязательное поле';
    }
    titleInput.setCustomValidity(message);
    updateElementStyle(titleInput, message);
  });

  priceInput.addEventListener('input', function () {
    validatePrice();
  });

  var validatePrice = function () {
    var housingValue = typeSelect.value;
    var priceValue = priceInput.value;

    var minLimit = offerTypesValue[housingValue].minLimit;

    var message = priceValue < minLimit ? 'Цена должна быть не меньше чем ' + minLimit : '';


    priceInput.setCustomValidity(message);
    updateElementStyle(priceInput, message);
  };

  var updateHousing = function () {
    var housingValue = typeSelect.value;

    var minLimit = offerTypesValue[housingValue].minLimit;
    priceInput.setAttribute('min', minLimit);
    priceInput.setAttribute('placeholder', minLimit);
  };

  var updateCapacity = function () {
    capacitySelect.value = CapacityType.ONE;
  };

  var validateCapacity = function () {
    var roomValue = roomNumber.value;
    var capacityValue = capacitySelect.value;

    var message = EMPTY_STRING;

    if (roomValue === RoomType.ONE && capacityValue !== CapacityType.ONE) {
      message = 'выберите не более 1 гостя';
    } else if (roomValue === RoomType.TWO && capacityValue !== CapacityType.ONE && capacityValue !== CapacityType.TWO) {
      message = 'выберите не более 2 гостей';
    } else if (roomValue === RoomType.THREE && capacityValue === CapacityType.FOUR) {
      message = 'выберите не более 3 гостей';
    } else if (roomValue === RoomType.FOUR && capacityValue !== CapacityType.FOUR) {
      message = 'выберите не для гостей';
    }
    capacitySelect.setCustomValidity(message);
    updateElementStyle(capacitySelect, message);
  };

  var updateElementStyle = function (element, message) {
    element.style.border = message !== EMPTY_STRING ? BorderStyle.RED : BorderStyle.NONE;
  };

  adForm.addEventListener('change', function (evt) {
    if (evt.target.id === capacitySelect.id || evt.target.id === roomNumber.id) {
      validateCapacity();
    } else if (evt.target.id === timeInInput.id) {
      timeOutInput.value = timeInInput.value;
    } else if (evt.target.id === timeOutInput.id) {
      timeInInput.value = timeOutInput.value;
    } else if (evt.target.id === typeSelect.id) {
      updateHousing();
      validatePrice();
    }
  });

  var onLoadSuccess = function () {
    showSuccessPopup();
    deactivate();
  };

  var deactivate = function () {
    adForm.reset();
    changeActivesState(false);
    window.filter.reset();
    updateElementStyle(titleInput, EMPTY_STRING);
    updateElementStyle(priceInput, EMPTY_STRING);
    updateElementStyle(capacitySelect, EMPTY_STRING);
    updateCapacity();
    updateHousing();
    window.filter.changeActivesState(false);
    window.pin.removePoints();
    window.map.resetActiveMode();
    window.card.removePopup();
  };

  resetButton.addEventListener('click', function () {
    deactivate();
  });

  var showSuccessPopup = function () {
    successElement = successTemplate.cloneNode(true);
    addEvents(successElement);

    document.querySelector('main').insertAdjacentElement('beforebegin', successElement);
  };

  var addEvents = function () {
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeyDown);
  };

  var onDocumentClick = function () {
    removeSuccessPopup();
  };

  var onDocumentKeyDown = function (evt) {
    if (evt.code === window.utils.ESC_KEY_CODE) {
      removeSuccessPopup();
    }
  };

  var removeSuccessPopup = function () {
    successElement.remove();
    successElement = null;
    document.removeEventListener('keydown', onDocumentKeyDown);
    document.removeEventListener('click', onDocumentClick);
  };

  var onLoadError = function () {
    showErrorPopup();
  };

  var showErrorPopup = function () {
    errorElement = errorTemplate.cloneNode(true);
    addEventsError(errorElement);

    document.querySelector('main').insertAdjacentElement('beforebegin', errorElement);
  };

  var addEventsError = function () {
    var errorButton = errorElement.querySelector('.error__button');
    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onDocumentKeyDownError);
  };

  var onErrorButtonClick = function () {
    removeErrorPopup();
  };

  var onDocumentKeyDownError = function (evt) {
    if (evt.code === window.utils.ESC_KEY_CODE) {
      removeErrorPopup();
    }
  };

  var removeErrorPopup = function () {
    errorElement.remove();
    errorElement = null;
    document.removeEventListener('keydown', onDocumentKeyDownError);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onLoadSuccess, onLoadError);
  });

  var updateAddressInput = function (x, y) {
    addressInput.value = x + ', ' + y;
  };

  var initialize = function () {
    changeActivesState(false);
    updateHousing();
    updateCapacity();
    validateCapacity();
  };


  window.form = {
    initialize: initialize,
    changeActivesState: changeActivesState,
    addressInput: addressInput,
    updateAddressInput: updateAddressInput,
    showErrorPopup: showErrorPopup
  };
})();
