'use strict';

function resize (element, container) {
  element.height( container.height() );
}

function iterateAll() {
  var $this = $(this);
  fullHeight.call($this, $this.data());
}

function iterateEach() {
  var $this = $(this);
  var $container = $($this.data().container || window);

  $container.on('resize.aranja-evt', function() {
    resize($this, $container);
  });

  resize($this, $container);
}

function fullHeight() {
  return this.each(iterateEach);
}

function loaded() {
  $('[data-full-height]').each(iterateAll);
}

$(window).on('load', loaded);

$.fn.fullHeight = fullHeight;
