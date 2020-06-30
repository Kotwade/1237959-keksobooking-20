'use strict';

(function () {
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

  window.data = {
    getRandomPoints: getRandomPoints
  };
})();
