'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card.popup');

  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var renderPhotos = function (container, photos) {
    if (photos.length === 0) {
      container.remove();
      return;
    }

    var imgTemplate = container.querySelector('.popup__photo');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var photoImage = imgTemplate.cloneNode(true);
      photoImage.src = photos[i];
      fragment.appendChild(photoImage);
    }
    container.appendChild(fragment);

    imgTemplate.remove();
  };

  var renderFeatures = function (container, features) {
    if (features.length === 0) {
      container.remove();
      return;
    }

    var featuresTemplate = container.querySelectorAll('.popup__feature');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
      var featuresFragment = featuresTemplate.cloneNode(true);
      featuresFragment.className = 'popup__feature popup__feature' + features[i];
      fragment.appendChild(featuresFragment);
    }

    container.innerHtml = '';
    container.appendChild(fragment);

    featuresTemplate.remove();
  };

  var showPopup = function (point) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = point.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = point.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = point.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__text--capacity').textContent = point.offer.rooms + ' комнаты для ' + point.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + point.offer.checkin + ' , выезд до ' + point.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = point.offer.description;
    cardElement.querySelector('.popup__avatar').src = point.author.avatar;
    renderPhotos(cardElement.querySelector('.popup__photos'), point.offer.photos);
    renderFeatures(cardElement.querySelectorAll('.popup__feature'), point.offer.features);

    mapFiltersContainer.insertAdjacentElement('beforebegin', cardElement);
  };

  window.card = {
    showPopup: showPopup
  };
})();
