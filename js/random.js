'use strict';

window.random = (function () {
  function getRandElement(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  function getRandElementArr(arr) {
    var randItem;

    for (var i = 0; i < arr.length; i++) {
      randItem = Math.floor(Math.random() * arr.length);
    }
    return arr[randItem];
  }

  function getRandLengthArr(arr) {
    var newArr = [];
    var newLength = getRandElement(1, arr.length);

    for (var k = 0; k < newLength; k++) {
      newArr[k] = getRandElementArr(arr);
    }

    return newArr;
  }

  return {
    getRandElement: getRandElement,
    getRandElementArr: getRandElementArr,
    getRandLengthArr: getRandLengthArr
  };
})();
