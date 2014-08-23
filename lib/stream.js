var curry = require('./curry');

function Stream (errorHandler, eventHandler) {
    function append (item) {
        eventHandler(item)
    }

    this.append = append;
}

function map (transform, output) {

    function inError (err) {
        output.append(err);
    }

    function inEvent (evt) {
        output.append(transform(evt));
    }

    return new Stream(inError, inEvent)
}

exports.create = function (onError, onEvent) {
    return new Stream(onError, onEvent);
}

exports.map = curry(map);

exports.filter = function (predicate, output) {

    function inEvent (evt) {
        if (predicate(evt)) {
            output.append(evt);
        }
    }

    function inError (err) {
        output.append(err);
    }

    return new Stream(inError, inEvent);
}