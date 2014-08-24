'use strict';

module.exports = function (obj) {
    return function (key) {
        return arguments.length ? obj[key] : obj;
    };
};