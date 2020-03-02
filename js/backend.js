'use strict';

(function () {
  var STATUS_CODE = {
    OK: 200
  };

  var URL = {
    GET_CARDS: 'https://js.dump.academy/keksobooking/data'
  };

  var METHOD = {
    GET: 'GET',
    POST: 'POST'
  };

  var TIMEOUT_IN_MS = 10000;
  function load(url, method, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    xhr.send();
  }

  window.backend = {
    METHOD: METHOD,
    URL: URL,
    load: load
  };
})();
