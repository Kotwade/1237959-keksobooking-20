'use strict';

(function () {

  var isActiveState = false;

  var adMap = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');

  var startActiveMode = function () {
    isActiveState = true;
    adMap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.backend.load(window.filter.initialize);
    window.form.changeActivesState(isActiveState);
    window.pin.createMainPinLocation();
  };

  var initEvents = function () {
    mapPinMain.addEventListener('mousedown', function (evt) {
      if (evt.button === window.utils.LEFT_MOUSE_CODE && !isActiveState) {
        startActiveMode();
      }
    });
    mapPinMain.addEventListener('keydown', function (evt) {
      if (evt.code === window.utils.ENTER_KEY_CODE && !isActiveState) {
        startActiveMode();
      }
    });
  };

  var getActiveState = function () {
    return isActiveState;
  };

  window.map = {
    initEvents: initEvents,
    getActiveState: getActiveState,
    adForm: adForm,
    mapPinMain: mapPinMain
  };
})();
