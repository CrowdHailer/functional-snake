'use strict';

describe('map', function () {
    var Stream, onError, onEvent, stream, util, newStream;

    beforeEach(function () {
        Stream = require('../../lib/stream');
        onEvent = jasmine.createSpy('event');
        onError = jasmine.createSpy('error');
        util = require('../../lib/cumin/utilities');
        stream = Stream.create(onError, onEvent);
    });

    it('should map each event', function () {
        newStream = Stream.map(util.k(1), stream);
        newStream.append({});
        expect(onEvent).toHaveBeenCalledWith(1);
    });

    it('should accept curried arguments', function () {
        newStream = Stream.map(util.k(1))(stream);
        newStream.append({});
        expect(onEvent).toHaveBeenCalledWith(1);
    });
});