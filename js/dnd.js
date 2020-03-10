'use strict';

(function () {
  window.data.pinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragger = false;

      var onMouseMove = function (moveEvt) {
        var limits = {
          top: window.data.TOP_Y_MAP - window.map.Y_MAIN_PIN,
          right: Math.round(window.data.RIGHT_X_MAP - window.map.X_MAIN_PIN / 2),
          bottom: window.data.BOTTOM_Y_MAP - window.map.Y_MAIN_PIN,
          left: window.data.LEFT_X_MAP - Math.floor(window.map.X_MAIN_PIN / 2)
        };
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        var left = window.data.pinMain.offsetLeft - shift.x;
        var top = window.data.pinMain.offsetTop - shift.y;

        moveEvt.preventDefault();
        dragger = true;

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (left > limits.right) {
          left = limits.right;
        } else if (left < limits.left) {
          left = limits.left;
        }

        if (top < limits.top) {
          top = limits.top;
        } else if (top > limits.bottom) {
          top = limits.bottom;
        }

        window.data.pinMain.style.left = left + 'px';
        window.data.pinMain.style.top = top + 'px';
        window.data.getAddress(window.map.X_MAIN_PIN, window.map.Y_MAIN_PIN);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        if (dragger === true) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            window.data.pinMain.removeEventListener('click', onClickPreventDefault);
          };
          window.data.pinMain.addEventListener('click', onClickPreventDefault);
        }

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });
})();
