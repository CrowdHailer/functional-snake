'use strict';

var create = require('./create');

module.exports = function (aggregator, seed, stream) {
    stream.append(seed);

    function onError(err) {
        console.log(err);
    }

    function onEvent(evt) {
        seed = aggregator(seed, evt);
        stream.append(seed);
    }

    return create(onError, onEvent);
};