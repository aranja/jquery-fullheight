(function() {
  'use strict';

  function resize(element, container) {
    element.height(container.height());
  }

  function fullHeight(element, options) {
    var container = $(options.container || window);

    container.on('resize.aranja', function() {
      resize(element, container);
    });

    resize(element, container);
  }

  // jQuery plugin
  $.fn.fullHeight = function() {
    fullHeight(this, this.data() || {});
    return this;
  };

  // Data attributes
  $(function() {
    $('[data-full-height]').fullHeight();
  });
})();