define([
  'app/TwitterStreamWidget3x',

  'dojo/dom-construct'
], function(
  WidgetUnderTest,

  domConstruct
) {
  describe('app/TwitterStreamWidget3x', function() {
    var widget;
    var destroy = function (widget) {
      if (widget && widget.destroyRecursive) {
        widget.destroyRecursive();
        widget = null;
      }
    };

    beforeEach(function() {
      widget = new WidgetUnderTest(null, domConstruct.create('div', null, document.body));
    });

    afterEach(function() {
      destroy(widget);
    });

    describe('Sanity', function() {
      it('should create a TwitterStreamWidget3x', function() {
        expect(widget).to.be.a(WidgetUnderTest);
      });
    });
  });
});
