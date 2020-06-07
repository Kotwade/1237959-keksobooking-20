'use strict';

var PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

var LocationX = {
  X_MIN: 200,
  X_MAX: 500
};

var LocationY = {
  Y_MIN: 130,
  Y_MAX: 630
};

var Price = {
  PRICE_MIN: 10000,
  PRICE_MAX: 20000
};

var Rooms = {
  ROOMS_MIN: 1,
  ROOMS_MAX: 5
};

var Guests = {
  GUESTS_MIN: 1,
  GUESTS_MAX: 10
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
  return Math.floor(min + Math.random() * (max - min));
};


var getRandomItem = function (items) {
  var index = getRandomValue(0, items.length);
  return items[index];
};

var getAvatarValue = function (index) {
  return 'img/avatars/user0' + (++index) + '.png';
};


var getPoint = function (elementIndex) {
  var point = {
    author: {
      avatar: getAvatarValue(elementIndex)
    },
    offer: {
      title: getRandomItem(TITLE_VALUES),
      address: '600, 350',
      price: getRandomValue(Price.PRICE_MIN, Price.PRICE_MAX),
      type: getRandomItem(POINT_TYPES),
      rooms: getRandomValue(Rooms.ROOMS_MIN, Rooms.ROOMS_MAX),
      guests: getRandomValue(Guests.GUESTS_MIN, Guests.GUESTS_MAX),
      checkin: getRandomItem(CHECKIN_VALUES),
      checkout: getRandomItem(CHECKIN_VALUES),
      features: getRandomItem(FEATURES_VALUES),
      description: getRandomItem(DESCRIPTION_VALUES),
      photos: getRandomItem(PHOTOS_VALUES)
    },
    location: {
      x: getRandomValue(LocationX.X_MIN, LocationX.X_MAX),
      y: getRandomValue(LocationY.Y_MIN, LocationY.Y_MAX)
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


