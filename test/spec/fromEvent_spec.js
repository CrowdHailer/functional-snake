'use strict';

describe('Stream', function () {
    var Stream, onError, onEvent, stream, bean;

    beforeEach(function () {
        Stream = require('../../lib/stream');
        onEvent = jasmine.createSpy('event');
        onError = jasmine.createSpy('error');
        bean = require('bean');
    });

    describe('from events', function () {
        it('should pass events', function () {
            stream = Stream.create(onError, onEvent);
            var obj = {},
                pebble = {};
            Stream.fromEvents('test', obj, stream);
            bean.fire(obj, 'test', pebble);
            expect(onEvent).toHaveBeenCalledWith(pebble);
        });
    });
});