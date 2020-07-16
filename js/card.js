'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card popup');

  var getPhotosFragment = function (photos) {

  };

  var showPopup = function (point) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title') = offer.title;
    cardElement.querySelector('.popup__text--address') = offer.address;
    cardElement.querySelector('.popup__text--price') = offer.price + '₽/ночь';
    cardElement.querySelector('.popup__text--capacity') = offer.rooms + 'комнаты для' + offer.guests + 'гостей';
    cardElement.querySelector('.popup__text--time') = 'Заезд после' + offer.checkin + ', выезд до' + offer.checkout;
    cardElement.querySelector('.popup__description') = offer.description;
    cardElement.querySelector('.popup__avatar').src = author.avatar;
    return cardElement;
  };

  window.card = {
    showPopup: showPopup
  };
})();
