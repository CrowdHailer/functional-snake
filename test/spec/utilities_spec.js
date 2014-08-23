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
});

