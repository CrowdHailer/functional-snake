'use strict';

module.exports = function () {
    var funcs = arguments;
    return function () {
        var args, i;
        args = arguments;
        i = funcs.length - 1;
        for (i; i >= 0; i -= 1) {
            args = [funcs[i].apply(this, args)];
        }
        return args[0];
    };
};