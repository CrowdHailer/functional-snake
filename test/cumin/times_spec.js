'use strict';

describe('Times', function () {
    // Use optional arguments in call
    // Maintain context
    // curry
    var times;

    beforeEach(function () {
        times = require('../../lib/cumin/times');
    });

    it('should call a function multiple times', function () {
        var dummy = jasmine.createSpy();
        times(3, dummy);
        expect(dummy.calls.count()).toEqual(3);
    });

    it('should pass index', function () {
        var dummy = jasmine.createSpy();
        times(3, dummy);
        expect(dummy).toHaveBeenCalledWith(0);
        expect(dummy).toHaveBeenCalledWith(2);
    });
});