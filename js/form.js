'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
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
  var resetButton = document.querySelector('.ad-form__reset');

  var successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var errorElement = null;

  var successElement = null;

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

  adForm.addEventListener('change', function (evt) {
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

  var onLoadSuccess = function () {
    showSuccessPopup();
    deactivate();
  };

  var deactivate = function () {
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    changeActivesState(false);
    window.filter.resetFilters();
    window.pin.removePoint();
    window.map.resetActiveMode();
  };

  resetButton.addEventListener('mousedown', function (evt) {
    if (evt.button === window.utils.LEFT_MOUSE_CODE) {
      deactivate();
    }
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
    document.addEventListener('click', onDocumentClickError);
    document.addEventListener('keydown', onDocumentKeyDownError);
  };

  var onDocumentClickError = function () {
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
    document.removeEventListener('click', onDocumentClickError);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onLoadSuccess, onLoadError);
  });

  var updateAddressInput = function (x, y) {
    addressInput.value = x + ', ' + y;
  };


  window.form = {
    changeActivesState: changeActivesState,
    validateCapacity: validateCapacity,
    addressInput: addressInput,
    updateHousing: updateHousing,
    updateAddressInput: updateAddressInput,
    adForm: adForm
  };
})();
