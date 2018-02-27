var DETAIL_IMAGE_SELECTOR = "[data-image-role=\"target\"]";
var DETAIL_TITLE_SELECTOR = "[data-image-role=\"title\"]";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role=\"trigger\"]";

function setDetails(imageUrl, titleText) {
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function leftButton() {
  "use strict";
  var left = document.querySelector(".display-left");

  left.addEventListener("click", function() {
    var currentTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    var array = getThumbnailsArray();

    for (var i = 0; i < array.length; i++) {
      if (array[i].getAttribute("data-image-title") == currentTitle.textContent) {
        if (i == 0) { // make it wrap to the end
          var title = titleFromThumb(array[array.length-1]);
          var image = imageFromThumb(array[array.length-1]);
          setDetails(image, title);
          break;
        } else if (i != 0) {
          image = imageFromThumb(array[i - 1]);
          title = titleFromThumb(array[i - 1]);
          setDetails(image, title);
        }
      }
    }
  });
}

function rightButton() {
  "use strict";
  var right = document.querySelector(".display-right");

  right.addEventListener("click", function() {
    var currentTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    var array = getThumbnailsArray();

    for (var i = 0; i < array.length; i++) {
      if (array[i].getAttribute("data-image-title") == currentTitle.textContent) {
        if (i == array.length-1) { // make it wrap to the end
          var title = titleFromThumb(array[0]);
          var image = imageFromThumb(array[0]);
          setDetails(image, title);
        } else {
          image = imageFromThumb(array[i + 1]);
          title = titleFromThumb(array[i + 1]);
          setDetails(image, title);
          break;
        }
      }
    }
  });
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);

  leftButton();
  rightButton();
}

initializeEvents();
