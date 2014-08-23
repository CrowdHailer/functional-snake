'use strict';

var create = require('./create');

module.exports = function (capacity, head, tail) {
    var slidingWindow = []

    function onError (err){
    }

    function onEvent (evt) {
        slidingWindow.push(evt);
        head && head.append(slidingWindow)
        if (slidingWindow.length > capacity) {
            var overflow = slidingWindow.shift()
            tail && tail.append(overflow);
        }
    };

    return create(onError, onEvent);
};