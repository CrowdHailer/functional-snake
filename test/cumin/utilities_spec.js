'use strict';

describe('Utilities', function () {
    var _;
    beforeEach(function () {
        _ = require('../../lib/cumin/utilities');
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

});

