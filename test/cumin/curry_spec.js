describe('Curry', function () {
    var curry, addPair, addThree, joinAll;
    beforeEach(function () {
        curry = require('../../lib/cumin/curry');
        addPair = function(a, b) {
            return a + b;
        }

        addThree = function(a, b, c) {
            return a + b + c;
        }

        joinAll = function () {
            return Array.prototype.join.call(arguments, '');
        }
    })

    it('should curry a 2 argument function', function () {
        var curried = curry(addPair);
        expect(curried(2)(3)).toEqual(5);
    });

    it('should be able to pass both arguments together', function () {
        var curried = curry(addPair);
        expect(curried(2, 3)).toEqual(5);
    });

    it('should curry longer functions', function () {
        var curried = curry(addThree);
        expect(curried(2)(3)(3)).toEqual(8);
    });

    it('should accept multiple arguments at a time', function () {
        var curried = curry(addThree);
        expect(curried(2)(3, 3)).toEqual(8);
    });

    it('should pass empty calls', function () {
        var curried = curry(addPair);
        expect(curried(1)()(2)).toEqual(3)        
    });

    it('should accept and optional length argument', function () {
        var curried = curry(4, joinAll);
        expect(curried('a')('b')('c', 'd')).toEqual('abcd');
    });

    it('should work twice', function () {
        var curried = curry(addPair);
        expect(curried(2)(3)).toEqual(5);
        var curried = curry(addPair);
        expect(curried(2)(3)).toEqual(5);
    });

    it('should be usable twice', function () {
        var curried = curry(addPair);
        expect(curried(2)(3)).toEqual(5);
        expect(curried(1)(0)).toEqual(1);
    });
});