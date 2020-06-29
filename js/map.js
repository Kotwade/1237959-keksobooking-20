'use strict';

(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var LEFT_MOUSE_CODE = 0;
  var ENTER_KEY_CODE = 'Enter';

  var isActiveState = false;
  var randomPoints = window.data.getRandomPoints(8);

  var adMap = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
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

  var startActiveMode = function () {
    isActiveState = true;
    adMap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    renderPoints(randomPoints);
    window.form.changeActivesState();
    window.pin.createMainPinLocation();
  };

  var initEvents = function (randomPoints) {
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

  window.map = {
    renderPoints: renderPoints,
    initEvents: initEvents,
    isActiveState: isActiveState,
    adForm: adForm,
    randomPoints: randomPoints
  };
})();
