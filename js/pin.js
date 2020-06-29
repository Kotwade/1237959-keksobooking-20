'use strict';

(function () {
  var MAP_PIN_DEFAULT_LOCATION_X = 570;
  var MAP_PIN_WIDTH = 62;
  var MAP_PIN_DEFAULT_LOCATION_Y = 375;
  var MAP_PIN_TRIANGLE_HEIGHT = 22;

  var addressInput = document.querySelector('#address');

  var createMainPinLocation = function () {
    var mainPinLocationX = (MAP_PIN_WIDTH / 2) + MAP_PIN_DEFAULT_LOCATION_X;
    var mainPinLocationY = (MAP_PIN_WIDTH / 2) + MAP_PIN_DEFAULT_LOCATION_Y;
    if (isActiveState) {
      mainPinLocationY = MAP_PIN_WIDTH + MAP_PIN_DEFAULT_LOCATION_Y + MAP_PIN_TRIANGLE_HEIGHT;
    }
    addressInput.value = mainPinLocationX + ', ' + mainPinLocationY;
  };

  window.pin = {
    createMainPinLocation: createMainPinLocation
  };
})();
