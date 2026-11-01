(function () {
  "use strict";

  function initLightbox() {
    if (window.GLightbox) {
      window.GLightbox({
        selector: ".glightbox",
        touchNavigation: true,
        loop: true,
        openEffect: "fade",
        closeEffect: "fade"
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLightbox();
  });
})();
