'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var points = [];
  var HousType = {
    ANY: 'any',
    PALACE: 'palace',
    FLAT: 'flat',
    HOUSE: 'house',
    BUNGALO: 'bungalo'
  };

  var init = function (points) {
    points = points;
    filterPoint();
  };

  var filterByType = function () {
    var housingTypeValue = housingType.value;
    if (housingTypeValue === HousType.ANY) {

    } else if (housingTypeValue === HousType.PALACE) {

    } else if (housingTypeValue === HousType.FLAT) {

    } else if (housingTypeValue === HousType.HOUSE) {

    } else if (housingTypeValue === HousType.BUNGALO) {

    }
  };

  var filterPoint = function () {
    var filtredPoints = points.filter(function (point) {
      return this.filterByType(point);
    });

    var displayPoints = filtredPoints.length > 5 ? points.slice(0, 5) : points;

    window.pin.renderPoints(displayPoints);
  };

  var initFormEvent = housingType.addEventListener('change', function () {
    filterPoint();
  });

  window.filter = {
    init: init
  };
})();
