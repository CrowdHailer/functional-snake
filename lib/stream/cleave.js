'use strict';

var create = require('./create');

module.exports = function (capacity, head, tail) {
    var slidingWindow = [];

    function onError(err) {
        console.log(err);
    }

    function onEvent(evt) {
        slidingWindow.push(evt);
        if (head) {
            head.append(slidingWindow);
        }
        if (slidingWindow.length > capacity) {
            var overflow = slidingWindow.shift();
            if (tail) {
                tail.append(overflow);
            }
        }
    }

    return create(onError, onEvent);
};