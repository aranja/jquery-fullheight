var box = $('[data-full-height]').fullHeight();

describe('viewport', function() {
  it('should have height of viewport', function () {
    expect(box.height()).to.equal($(window).height());
  });
});
