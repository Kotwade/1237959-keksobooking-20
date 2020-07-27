'use strict';

(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var displayPoints = [];

  var activePin = null;

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
    removePoints();

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < points.length; i++) {
      var point = points[i];
      var pointButton = renderPoint(point);
      addEvents(pointButton, point);
      fragment.appendChild(pointButton);

      displayPoints.push(pointButton);
    }
    pointsContainer.appendChild(fragment);
  };

  var removePoints = function () {
    displayPoints.forEach(function (point) {
      point.remove();
    });
    displayPoints = [];
  };

  var addEvents = function (pointButton, point) {
    pointButton.addEventListener('keydown', function (evt) {
      if (evt.code === window.utils.ENTER_KEY_CODE) {
        window.card.showPopup(point);
        setActivePoint(pointButton);
      }
    });
    pointButton.addEventListener('mousedown', function (evt) {
      if (evt.button === window.utils.LEFT_MOUSE_CODE) {
        window.card.showPopup(point);
        setActivePoint(pointButton);
      }
    });
  };

  var setActivePoint = function (pin) {
    activePin = pin;
    activePin.classList.add('map__pin--active');
  };

  var removeActivePoint = function () {
    if (activePin !== null) {
      activePin.classList.remove('map__pin--active');
      activePin = null;
    }
  };

  window.pin = {
    renderPoints: renderPoints,
    removePoints: removePoints,
    removeActivePoint: removeActivePoint
  };
})();
