'use strict';

function k (K) {
    return function () {
        return K;
    };
}

describe('Stream', function () {
    var Stream, onError, onEvent, stream;

    beforeEach(function () {
        Stream = require('../../lib/stream');
        onEvent = jasmine.createSpy('event');
        onError = jasmine.createSpy('error');
    });

    describe('initialisation', function () {
        it('should append events to subscribed function', function () {
            var obj = {};
            stream = Stream.create(onError, onEvent)
            stream.append(obj);
            expect(onEvent).toHaveBeenCalledWith(obj);
        });
    });

    describe('map', function () {
        it('should map each event', function () {
            stream = Stream.map(k(1), onError, onEvent);
            stream.append({});
            expect(onEvent).toHaveBeenCalledWith(1);
        });

        it('should work with existing stream', function () {
            stream = Stream.create(onError, onEvent);
            var newStream = Stream.map(k(1), stream);
            newStream.append({});
            expect(onEvent).toHaveBeenCalledWith(1);
        });
    });

    describe('filter', function () {
        it('should not pass each false event', function () {
            stream = Stream.filter(k(false), onError, onEvent);
            stream.append({});
            expect(onEvent).not.toHaveBeenCalled();
        });

        it('should pass each true event', function () {
            stream = Stream.filter(k(true), onError, onEvent);
            stream.append({});
            expect(onEvent).toHaveBeenCalledWith({});
        });
    });
});