'use strict';

(function () {
  var MAX_POINTS_COUNT = 5;
  var ALL = 'any';
  var housingType = document.querySelector('#housing-type');
  var mapFilters = document.querySelectorAll('.map__filter');
  var formMapFilters = document.querySelector('.map__filters');
  var points = [];

  var initialize = function (items) {
    points = items;
    filterPoint();
    addFormEvent();
  };

  var filterByType = function (point) {
    return housingType.value === ALL || point.offer.type === housingType.value;
  };

  var filterPoint = function () {
    var filtredPoints = points.filter(filterByType);
    if (filtredPoints.length > MAX_POINTS_COUNT) {
      filtredPoints = filtredPoints.slice(0, MAX_POINTS_COUNT);
    }

    window.pin.renderPoints(filtredPoints);
  };

  var addFormEvent = function () {
    formMapFilters.addEventListener('change', function () {
      filterPoint();
    });
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
    resetFilters: resetFilters,
    changeActivesState: changeActivesState
  };
})();
