'use strict';

describe('Filter', function () {
    var Stream, onError, onEvent, stream, _, newStream;

    beforeEach(function () {
        Stream = require('../../lib/stream');
        onEvent = jasmine.createSpy('event');
        onError = jasmine.createSpy('error');
        _ = require('../../lib/cumin/utilities');
        stream = Stream.create(onError, onEvent);
    });

    it('should not pass each false event', function () {
        newStream = Stream.filter(_.k(false), stream);
        newStream.append({});
        expect(onEvent).not.toHaveBeenCalled();
    });

    it('should pass each true event', function () {
        newStream = Stream.filter(_.k(true), stream);
        newStream.append({});
        expect(onEvent).toHaveBeenCalledWith({});
    });

    it('should take curried arguments', function () {
        newStream = Stream.filter(_.i)(stream);
        newStream.append(true);
        newStream.append(false);
        expect(onEvent).toHaveBeenCalledWith(true);
        expect(onEvent).not.toHaveBeenCalledWith(false);
    });
});