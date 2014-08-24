'use strict';

function Stream(errorHandler, eventHandler) {
    console.log(errorHandler);

    function append(item) {
        eventHandler(item);
    }

    this.append = append;
}

module.exports = function (onError, onEvent) {
    return new Stream(onError, onEvent);
};