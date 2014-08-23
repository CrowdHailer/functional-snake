function Stream (errorHandler, eventHandler) {
    function append (item) {
        eventHandler(item)
    }

    this.append = append;
}

exports.create = function (onError, onEvent) {
    return new Stream(onError, onEvent);
}