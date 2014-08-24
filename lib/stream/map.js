'use strict';

var create = require('./create');

module.exports = function map(transform, output) {

    function inError(err) {
        output.append(err);
    }

    function inEvent(evt) {
        output.append(transform(evt));
    }

    return create(inError, inEvent);
};