'use strict';

(function () {
  var StatusCode = {
    OK: 200
  };

  var Url = {
    GET_CARDS: 'https://js.dump.academy/keksobooking/data',
    SEND_FORM: 'https://js.dump.academy/keksobooking'
  };

  var Method = {
    GET: 'GET',
    POST: 'POST'
  };

  var TIMEOUT_IN_MS = 10000;
  function load(data, url, method, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
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
    xhr.send(data);
  }

  window.backend = {
    Method: Method,
    Url: Url,
    load: load
  };
})();
