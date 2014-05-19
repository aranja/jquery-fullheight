
describe('element', function() {
  it('should have height of viewport', function () {
    var box = $('<div></div>').fullHeight();
    expect(box.height()).to.equal($(window).height());
  });

  it('should have parent height', function () {
    var parent = $('<div style="height: 500px;"></div>');
    var child = $('<div></div>');

    child.fullHeight({
      container: parent
    });

    expect(child.height()).to.equal(500);
  });
});
