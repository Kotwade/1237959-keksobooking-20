'use strict';

var PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

var PHOTOS_VALUES = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var POINT_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var TITLE_VALUES = [
  '3-х комнатная квартира',
  'Дом',
  'Бунгало',
  '2-х комнатная квартира',
  'Однокомнатная квартира-студия'
];

var CHECKIN_VALUES = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES_VALUES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var DESCRIPTION_VALUES = [
  'Квартира в самом центре',
  'Апартаменты с паркингом',
  'Дешевый вариант жилья',
  'Дом всё включено'
];

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


var getRandomItem = function (items) {
  var index = getRandomValue(0, items.length);
  return items[index];
};

var getAvatarValue = function (index) {
  return 'img/avatars/user0' + (index + 1) + '.png';
};


var getPoint = function (elementIndex) {
  var point = {
    author: {
      avatar: getAvatarValue(elementIndex)
    },
    offer: {
      title: getRandomItem(TITLE_VALUES),
      address: '600, 350',
      price: getRandomValue(10000, 20000),
      type: getRandomItem(POINT_TYPES),
      rooms: getRandomValue(1, 5),
      guests: getRandomValue(1, 10),
      checkin: getRandomItem(CHECKIN_VALUES),
      checkout: getRandomItem(CHECKIN_VALUES),
      features: getRandomItem(FEATURES_VALUES),
      description: getRandomItem(DESCRIPTION_VALUES),
      photos: getRandomItem(PHOTOS_VALUES)
    },
    location: {
      x: getRandomValue(200, 500),
      y: getRandomValue(130, 630)
    }
  };

  return point;
};


var getRandomPoints = function (count) {
  var points = [];
  for (var i = 0; i < count; i++) {

    var point = getPoint(i);
    points.push(point);
  }

  return points;
};


var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

var randomPoints = getRandomPoints(8);
renderPoints(randomPoints);


