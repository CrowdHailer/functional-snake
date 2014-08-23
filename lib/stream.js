function Stream (errorHandler, eventHandler) {
    function append (item) {
        eventHandler(item)
    }

    this.append = append;
}

exports.create = function (onError, onEvent) {
    return new Stream(onError, onEvent);
}

exports.map = function (transform, outError, outEvent) {
    var output = new Stream(outError, outEvent);

    function inError (err) {
        output.append(err);
    }

    function inEvent (evt) {
        output.append(transform(evt));
    }

    return new Stream(inError, inEvent)
}