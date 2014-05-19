
describe('viewport', function() {
  it('should have height of viewport', function () {
    var box = $('<div></div>').fullHeight();
    expect(box.height()).to.equal($(window).height());
  });
});
