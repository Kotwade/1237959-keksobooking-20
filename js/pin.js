'use strict';

(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };
  var MAP_PIN_WIDTH = 62;
  var MAP_PIN_TRIANGLE_HEIGHT = 22;

  var pointTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var pointsContainer = document.querySelector('.map__pins');

  var createMainPinLocation = function () {
    var mainPinLocationX = (MAP_PIN_WIDTH / 2) + window.map.mapPinMain.offsetLeft;
    var mainPinLocationY = (MAP_PIN_WIDTH / 2) + window.map.mapPinMain.offsetTop;
    if (window.map.getActiveState()) {
      mainPinLocationY = MAP_PIN_WIDTH + window.map.mapPinMain.offsetTop + MAP_PIN_TRIANGLE_HEIGHT;
    }
    window.form.addressInput.value = mainPinLocationX + ', ' + mainPinLocationY;
  };

  var renderPoint = function (point) {
    var buttonElement = pointTemplate.cloneNode(true);
    buttonElement.style.left = (point.location.x - PinSize.WIDTH / 2) + 'px';
    buttonElement.style.top = (point.location.y - PinSize.HEIGHT) + 'px';
    buttonElement.querySelector('img').src = point.author.avatar;
    buttonElement.querySelector('img').alt = point.offer.title;

    return buttonElement;
  };

  var renderPoints = function (points) {
    removePoint();

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < points.length; i++) {
      fragment.appendChild(renderPoint(points[i]));
    }
    pointsContainer.appendChild(fragment);
  };

  var removePoint = function () {
    var displayPoint = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    displayPoint.forEach(function (point) {
      point.remove();
    });
  };

  window.pin = {
    createMainPinLocation: createMainPinLocation,
    renderPoints: renderPoints
  };
})();
