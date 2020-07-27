'use strict';

(function () {
  var MAX_POINTS_COUNT = 5;
  var ALL = 'any';

  var OfferPriceType = {
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };

  var OfferPriceLimit = {
    MIN: 10000,
    MAX: 50000
  };
  var housingType = document.querySelector('#housing-type');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingPrice = document.querySelector('#housing-price');
  var mapFilters = document.querySelectorAll('.map__filter');
  var formMapFilters = document.querySelector('.map__filters');
  var points = [];

  var initialize = function (items) {
    points = items;
    filterPoints();
    addFormEvent();
  };

  var filterByType = function (point) {
    return housingType.value === ALL || point.offer.type === housingType.value;
  };

  var filterByRooms = function (point) {
    return housingRooms.value === ALL || point.offer.rooms === +housingRooms.value;
  };

  var filterByGuests = function (point) {
    return housingGuests.value === ALL || point.offer.guests === +housingGuests.value;
  };

  var filterByPrice = function (point) {
    switch (housingPrice.value) {
      case OfferPriceType.MIDDLE: return point.offer.price >= OfferPriceLimit.MIN && point.offer.price <= OfferPriceLimit.MAX;
      case OfferPriceType.LOW: return point.offer.price < OfferPriceLimit.MIN;
      case OfferPriceType.HIGH: return point.offer.price > OfferPriceLimit.MAX;
      default: return true;
    }
  };

  var filterByFeatures = function (point, checkedFeatures) {
    return checkedFeatures.every(function (feature) {
      return point.offer.features.includes(feature);
    });
  };

  var filterPoints = function () {
    var filtredPoints = [];

    var checkedFeatures = Array.from(document.querySelectorAll('.map__checkbox:checked'))
      .map(function (feature) {
        return feature.value;
      });

    for (var i = 0; i < points.length; i++) {
      var point = points[i];

      var isPointFiltred = filterByType(point) && filterByPrice(point) && filterByFeatures(point, checkedFeatures) && filterByRooms(point) && filterByGuests(point);
      if (isPointFiltred) {
        filtredPoints.push(point);
        if (filtredPoints.length === MAX_POINTS_COUNT) {
          break;
        }
      }
    }

    window.card.removePopup();
    window.pin.renderPoints(filtredPoints);
  };

  var addFormEvent = function () {
    formMapFilters.addEventListener('change', window.debounce(function () {
      filterPoints();
    }));
  };

  var resetFilters = function () {
    formMapFilters.reset();
  };

  var changeActivesState = function (isActiveState) {
    Array.from(mapFilters).forEach(function (element) {
      element.disabled = !isActiveState;
    });
  };

  window.filter = {
    initialize: initialize,
    reset: resetFilters,
    changeActivesState: changeActivesState
  };
})();
