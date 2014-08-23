'use strict';

describe('Stream', function () {
    var Stream, onError, onEvent, _, compose, stream;

    beforeEach(function () {
        Stream = require('../../lib/stream');
        onEvent = jasmine.createSpy('event');
        onError = jasmine.createSpy('error');
        _ = require('../../lib/utilities');
        compose = require('../../lib/compose');
    });

    describe('merging', function () {
        it('should pass events from both sources', function () {
            stream = Stream.create(onError, onEvent);

            var streamA = Stream.map(_.i, stream)
            var streamB = Stream.map(_.i, stream)
            streamA.append(1);
            streamB.append(2);
            expect(onEvent).toHaveBeenCalledWith(1)
            expect(onEvent).toHaveBeenCalledWith(2)
        });
    })
})