'use strict';

var create = require('./create');

module.exports = function filter(predicate, output) {

    function onEvent(evt) {
        if (predicate(evt)) {
            output.append(evt);
        }
    }

    function onError(err) {
        output.append(err);
    }

    return create(onError, onEvent);
};