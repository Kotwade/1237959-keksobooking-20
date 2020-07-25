'use strict';

(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
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
    removePoint();

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < points.length; i++) {
      var point = points[i];
      var pointButton = renderPoint(point);
      addEvents(pointButton, point);
      fragment.appendChild(pointButton);
    }
    pointsContainer.appendChild(fragment);
  };

  var removePoint = function () {
    var displayPoint = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    displayPoint.forEach(function (point) {
      point.remove();
    });
  };

  var addEvents = function (pointButton, point) {
    pointButton.addEventListener('keydown', function (evt) {
      if (evt.code === window.utils.ENTER_KEY_CODE) {
        window.card.showPopup(point);
      }
    });
    pointButton.addEventListener('mousedown', function (evt) {
      if (evt.button === window.utils.LEFT_MOUSE_CODE) {
        window.card.showPopup(point);
      }
    });
  };

  window.pin = {
    renderPoints: renderPoints,
    removePoint: removePoint
  };
})();
