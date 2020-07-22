'use strict';

(function () {

  var LimitX = {
    MIN: 0,
    MAX: document.querySelector('.map__pins').getBoundingClientRect().width
  };

  var LimitY = {
    MIN: 130,
    MAX: 630
  };

  var MAP_PIN_WIDTH = 62;
  var MAP_PIN_TRIANGLE_HEIGHT = 22;

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
    createMainPinLocation();
  };

  var getMainPinLocationPosition = function (left, top) {
    var mainPinLocationX = (MAP_PIN_WIDTH / 2) + left;
    var mainPinLocationY = (MAP_PIN_WIDTH / 2) + top;
    if (window.map.getActiveState()) {
      mainPinLocationY = MAP_PIN_WIDTH + top + MAP_PIN_TRIANGLE_HEIGHT;
    }

    return {x: mainPinLocationX, y: mainPinLocationY};
  };

  var createMainPinLocation = function () {
    var position = getMainPinLocationPosition(mapPinMain.offsetLeft, mapPinMain.offsetTop);
    window.form.updateAddressInput(position.x, position.y);
  };

  var initEvents = function () {
    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      if (evt.button === window.utils.LEFT_MOUSE_CODE && !isActiveState) {
        startActiveMode();
      }

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var positionX = mapPinMain.offsetLeft - shift.x;
        var positionY = mapPinMain.offsetTop - shift.y;

        var coord = getMainPinLocationPosition(positionX, positionY);

        var isCoordValid = coord.x >= LimitX.MIN && coord.x <= LimitX.MAX && coord.y >= LimitY.MIN && coord.y <= LimitY.MAX;

        if (isCoordValid) {
          window.form.updateAddressInput(coord.x, coord.y);
          mapPinMain.style.left = positionX + 'px';
          mapPinMain.style.top = positionY + 'px';
        }

      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            mapPinMain.removeEventListener('click', onClickPreventDefault);
          };
          mapPinMain.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
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
    mapPinMain: mapPinMain,
    createMainPinLocation: createMainPinLocation
  };
})();
