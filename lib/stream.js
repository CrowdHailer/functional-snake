var curry = require('./cumin/curry');
var bean = require('bean');

var create = require('./stream/create');
var map = require('./stream/map');
var filter = require('./stream/filter');

exports.create = create

exports.map = curry(map);

exports.filter = curry(filter);

exports.fromEvents = function (eventName, element, stream) {
    bean.on(element, eventName, stream.append)
}