'use strict';

exports.k = function (x) {
    return function () {
        return x;
    };
};

exports.i = function (x) {
    return x;
};
