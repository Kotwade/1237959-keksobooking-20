'use strict';

(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };
  var MAP_PIN_DEFAULT_LOCATION_X = 570;
  var MAP_PIN_WIDTH = 62;
  var MAP_PIN_DEFAULT_LOCATION_Y = 375;
  var MAP_PIN_TRIANGLE_HEIGHT = 22;

  var addressInput = document.querySelector('#address');

  var createMainPinLocation = function () {
    var mainPinLocationX = (MAP_PIN_WIDTH / 2) + MAP_PIN_DEFAULT_LOCATION_X;
    var mainPinLocationY = (MAP_PIN_WIDTH / 2) + MAP_PIN_DEFAULT_LOCATION_Y;
    if (window.map.getActiveState()) {
      mainPinLocationY = MAP_PIN_WIDTH + MAP_PIN_DEFAULT_LOCATION_Y + MAP_PIN_TRIANGLE_HEIGHT;
    }
    addressInput.value = mainPinLocationX + ', ' + mainPinLocationY;
  };

  var pointTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var pointsContainer = document.querySelector('.map__pins');

  var renderPoint = function (point) {
    var buttonElement = pointTemplate.cloneNode(true);
    buttonElement.style.left = (point.location.x - PinSize.WIDTH / 2) + 'px';
    buttonElement.style.top = (point.location.y - PinSize.HEIGHT) + 'px';
    buttonElement.querySelector('img').src = point.author.avatar;
    buttonElement.querySelector('img').alt = point.offer.title;

    return buttonElement;
  };

  var renderPoints = function (points) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < points.length; i++) {
      fragment.appendChild(renderPoint(points[i]));
    }
    pointsContainer.appendChild(fragment);
  };

  window.pin = {
    createMainPinLocation: createMainPinLocation,
    renderPoints: renderPoints
  };
})();
