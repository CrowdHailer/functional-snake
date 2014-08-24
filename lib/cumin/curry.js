'use strict';

module.exports = function (arity, func) {
    if (typeof arity === 'function') {
        func = arity;
        arity = func.length;
    }
    return function () {
        var args = [];
        args = args.concat(Array.prototype.slice.call(arguments));
        if (arity <= args.length) {
            return func.apply(null, args);
        }
        function wait() {
            args = args.concat(Array.prototype.slice.call(arguments));
            if (arity <= args.length) {
                return func.apply(null, args);
            }
            return wait;
        }
        return wait;
    };
};