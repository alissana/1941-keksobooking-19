'use strict';

window.attribute = (function () {
  function addAttribute(tagList, attributeName) {
    if (tagList) {
      for (var i = 0; i < tagList.length; i++) {
        tagList[i].setAttribute(attributeName, 'true');
      }
    }
  }

  function deleteAttribute(tagList, attributeName) {
    if (tagList) {
      for (var i = 0; i < tagList.length; i++) {
        tagList[i].removeAttribute(attributeName);
      }
    }
  }

  return {
    addAttribute: addAttribute,
    deleteAttribute: deleteAttribute
  };
})();
