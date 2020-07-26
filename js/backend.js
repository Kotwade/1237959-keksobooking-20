'use strict';

(function () {
  var BackendUrl = {
    URL_LOAD: 'https://javascript.pages.academy/keksobooking/data',
    URL_SAVE: 'https://javascript.pages.academy/keksobooking'
  };

  var BackendType = {
    GET: 'GET',
    POST: 'POST'
  };
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

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = 10000;

    xhr.open(type, url);
    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = createXhr(BackendType.GET, BackendUrl.URL_LOAD, onSuccess, onError);
    xhr.send();
  };

  var save = function (data, onSuccess, onError) {
    var xhr = createXhr(BackendType.POST, BackendUrl.URL_SAVE, onSuccess, onError);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
