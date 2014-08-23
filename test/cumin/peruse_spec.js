describe('Peruse', function () {
    var peruse, obj, config;

    beforeEach(function () {
        peruse = require('../../lib/cumin/peruse');
        obj = {a: 2, b: 3};
        config = peruse(obj);
    });

    it('should fetch items from an objec', function () {
        expect(config('a')).toEqual(2);
    });

    it('should return the object given no arguments', function () {
        expect(config()).toEqual(obj);
    });

    it('should return nil if given a falsy key', function () {
        expect(config(undefined)).toEqual();
    });
});