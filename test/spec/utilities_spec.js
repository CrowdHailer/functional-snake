'use strict';

describe('Utilities', function () {
    var _;
    beforeEach(function () {
        _ = require('../../lib/utilities');
    })

    describe('Constant', function () {
        it('should repeat the given value', function () {
            var constant = _.k(3);
            expect(constant()).toEqual(3);
        });
    });

    describe('Identity', function () {
        it('should return given value', function () {
            var obj = {}
            expect(_.i(obj)).toBe(obj);
        });
    });

    describe('Times', function () {
        // Use optional arguments in call
        it('should call a function multiple times', function () {
            var dummy = jasmine.createSpy();
            _.times(3, dummy);
            expect(dummy.calls.count()).toEqual(3);
        });

        it('should pass index', function () {
            var dummy = jasmine.createSpy();
            _.times(3, dummy);
            expect(dummy).toHaveBeenCalledWith(0);
            expect(dummy).toHaveBeenCalledWith(2);
        });
    });
});

