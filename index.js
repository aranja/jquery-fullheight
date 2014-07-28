'use strict';
var $ = require('jquery');

// Device check for limiting resize handling.
var IS_DEVICE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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
  this.container = $(options.container);
  this.offset = parseInt((options.offset), 10);
  this.property = options.property;

  // Chrome for Android resizes the browser a lot when scrolling due to the address bar collapsing.
  // This causes a lot of arbitrary layout jumps and slow image resize operations with this plugin.
  // So for device UA where height should not change, we only update if the width changes as well (f.ex.
  // orientation changes).
  this.allowDeviceHeightResize = !(options.allowDeviceHeightResize == null || options.allowDeviceHeightResize === false || options.allowDeviceHeightResize === 'false');
  this.lastWidth = this.container.width();

  // Watch for screen resize.
  this.container.on('resize.aranja.viewportheight', $.proxy(this, '_onResize'));

  // Apply the height.
  this.update();
}

/**
 * Default Options
 * @type {Object}
 */
ViewportHeight.DEFAULTS = {
  allowDeviceHeightResize: false,
  container: window,
  offset: 0,
  property: 'height'
};

ViewportHeight.prototype._onResize = function() {
  var newWidth = this.container.width();
  var allowResize = !IS_DEVICE || this.allowDeviceHeightResize || newWidth !== this.lastWidth;

  // Do the update if expected.
  if (allowResize) {
    this.update();
  }

  this.lastWidth = newWidth;
};

ViewportHeight.prototype.update = function() {
  var newHeight = this.container.height() - this.offset;
  this.el.css(this.property, newHeight);
};

ViewportHeight.prototype.dispose = function() {
  this.container.off('.aranja.viewportheight');
  this.el.css(this.property, '');
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


/**
 * CommonJS export
 */
module.exports = ViewportHeight;
