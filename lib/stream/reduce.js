var create = require('./create');

module.exports = function (aggregator, seed, stream) {
    stream.append(seed)

    function onError (err) {

    }

    var memo;
    function onEvent (evt) {
        seed = aggregator(seed, evt)
        stream.append(seed)
    }

    return create(onError, onEvent);
}