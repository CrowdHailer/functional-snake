'use strict';

module.exports = function (n, func) {
    var i;
    for (i = 0; i < n; i += 1) {
        func(i);
    }
};