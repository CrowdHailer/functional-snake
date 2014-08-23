describe('Compose', function () {
    var compose, dummy, combined;

    beforeEach(function () {
        compose = require('../../lib/cumin/compose');
        dummy = jasmine.createSpy();
    });

    it('should compose an individual function', function () {
        combined = compose(dummy);
        combined({});
        expect(dummy).toHaveBeenCalledWith({});
    });

    it('should pass all arguments', function () {
        combined = compose(dummy);
        combined(1, 2, 3, 4);
        expect(dummy).toHaveBeenCalledWith(1, 2, 3, 4);
    });

    it('should maintain context', function () {
        combined = compose(dummy);
        var obj = {a: 4};
        combined.call(obj);
        expect(dummy.calls.mostRecent().object).toBe(obj);
    });

    it('should combine 2 functions', function () {
        dummy.and.returnValue(2);
        combined = compose(dummy, dummy);
        combined(1);
        expect(dummy).toHaveBeenCalledWith(1);
        expect(dummy).toHaveBeenCalledWith(2);
    });

    it('should return final value', function () {
        combined = compose(function (x) {
            return 2 * x;
        }, function (x) {
            return x + 1;
        })
        expect(combined(3)).toEqual(8);
    });
});