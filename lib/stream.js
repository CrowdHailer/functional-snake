var curry = require('./cumin/curry');
var bean = require('bean');

exports.create = require('./stream/create');
exports.map = curry(require('./stream/map'));
exports.filter = curry(require('./stream/filter'));
exports.cleave = require('./stream/cleave');
exports.reduce = require('./stream/reduce');

exports.fromEvents = function (eventName, element, stream) {
    bean.on(element, eventName, stream.append)
}