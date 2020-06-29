'use strict';

(function () {

  var LEFT_MOUSE_CODE = 0;
  var ENTER_KEY_CODE = 'Enter';

  var isActiveState = false;
  var randomPoints = window.data.getRandomPoints(8);

  var adMap = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');

  var startActiveMode = function () {
    isActiveState = true;
    adMap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.pin.renderPoints(randomPoints);
    window.form.changeActivesState(isActiveState);
    window.pin.createMainPinLocation();
  };

  var initEvents = function () {
    mapPinMain.addEventListener('mousedown', function (evt) {
      if (evt.button === LEFT_MOUSE_CODE && !isActiveState) {
        startActiveMode(randomPoints);
      }
    });
    mapPinMain.addEventListener('keydown', function (evt) {
      if (evt.code === ENTER_KEY_CODE && !isActiveState) {
        startActiveMode(randomPoints);
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
    randomPoints: randomPoints
  };
})();
