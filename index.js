'use strict';
var $ = require('jquery');

/**
 * Makes element the same size as another element, usually a viewport like window.
 * Updates when window is resized.
 * @param el - the element to resize
 * @param options.container - the element to resize based on. Defaults to `window`.
 * @param options.offset - number of pixels to subtract size.
 * @param options.property - which property to set when resizing. Defaults to `height` while `min-height`
 *                           and `max-height` can also be useful.
 * @constructor
 */
function ViewportHeight(el, options) {
  this.el = $(el);

  options = $.extend({}, ViewportHeight.DEFAULTS, options, this.el.data());
  this.container = $(options.container || window);
  this.offset = parseInt((options.offset || '0'), 10);
  this.property = options.property || 'height';

  this.resize();
  this.container.on('resize.aranja.viewportheight', $.proxy(function() {
    this.resize();
  }, this));
}

ViewportHeight.prototype.resize = function() {
  var newHeight = this.container.height() - this.offset;
  this.el.css(this.property, newHeight);
};

ViewportHeight.prototype.dispose = function() {
  this.container.off('resize.aranja.viewportheight');
};


// jQuery plugin
$.fn.fullHeight = function(options) {
  return this.each(function() {
    var el = $(this);
    var data = el.data('aranja.viewportheight');
    var opts = typeof options === 'object' && options;

    if (!data) { el.data('aranja.viewportheight', (data = new ViewportHeight(el, opts))); }
    if (typeof options == 'string') { data[options](); }
  });
};


// Data attributes
$(function() {
  $('[data-full-height]').fullHeight();
});
