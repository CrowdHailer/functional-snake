function Stream (errorHandler, eventHandler) {
    function append (item) {
        eventHandler(item)
    }

    this.append = append;
}

module.exports = function (onError, onEvent) {
    return new Stream(onError, onEvent);
}