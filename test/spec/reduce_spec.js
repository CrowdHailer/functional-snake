'use strict';

describe('Reducing a stream', function () {
    var Stream, onError, onEvent, stream, add;

    beforeEach(function () {
        Stream = require('../../lib/stream');
        onEvent = jasmine.createSpy('event');
        onError = jasmine.createSpy('error');
        stream = Stream.create(onError, onEvent);
        add = function (a, b) {
            return a + b;
        };
    });

    describe('Starting with initial value', function () {
        it('should add events to a running total', function () {
            var newStream = Stream.reduce(add, 0, stream);
            newStream.append(1);
            expect(onEvent).toHaveBeenCalledWith(1);
        });

        it('should add events to a running total', function () {
            var newStream = Stream.reduce(add, 0, stream);
            newStream.append(1);
            onEvent.calls.reset();
            newStream.append(2);
            expect(onEvent).toHaveBeenCalledWith(3);
        });

        it('should pass the seed value downstream', function () {
            Stream.reduce(add, 0, stream);
            expect(onEvent).toHaveBeenCalledWith(0);
        });
    });
});