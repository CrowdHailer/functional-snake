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

function filter (predicate, output) {

    function onEvent (evt) {
        if (predicate(evt)) {
            output.append(evt);
        }
    }

    function onError (err) {
        output.append(err);
    }

    return new Stream(onError, onEvent);
}

exports.create = function (onError, onEvent) {
    return new Stream(onError, onEvent);
}

exports.map = curry(map);

exports.filter = curry(filter)