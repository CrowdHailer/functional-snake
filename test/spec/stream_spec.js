'use strict';

var Stream, onError, onEvent, stream;

beforeEach(function () {
    Stream = require('../../lib/stream');
    onEvent = jasmine.createSpy('event');
    onError = jasmine.createSpy('error');
});

describe('Stream', function () {
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
            var x = function () { return 1; }
            stream = Stream.map(x, onError, onEvent);
            stream.append({});
            expect(onEvent).toHaveBeenCalledWith(1);
        });
    });
});