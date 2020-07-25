'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var URL1 = 'https://javascript.pages.academy/keksobooking';
  var createXhr = function (type, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.open(type, url);
    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = createXhr('GET', URL, onSuccess, onError);
    xhr.send();
  };

  var save = function (data, onSuccess, onError) {
    var xhr = createXhr('POST', URL1, onSuccess, onError);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
