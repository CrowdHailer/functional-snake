'use strict';

describe('Utilities', function () {
    var util;
    beforeEach(function () {
        util = require('../../lib/cumin/utilities');
    });

    describe('Constant', function () {
        it('should repeat the given value', function () {
            var constant = util.k(3);
            expect(constant()).toEqual(3);
        });
    });

    describe('Identity', function () {
        it('should return given value', function () {
            var obj = {};
            expect(util.i(obj)).toBe(obj);
        });
    });

});

