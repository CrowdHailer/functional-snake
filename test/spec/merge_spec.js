'use strict';

describe('Stream', function () {
    var Stream, onError, onEvent, util, stream;

    beforeEach(function () {
        Stream = require('../../lib/stream');
        onEvent = jasmine.createSpy('event');
        onError = jasmine.createSpy('error');
        util = require('../../lib/cumin/utilities');
    });

    describe('merging', function () {
        it('should pass events from both sources', function () {
            stream = Stream.create(onError, onEvent);

            var streamA = Stream.map(util.i, stream),
                streamB = Stream.map(util.i, stream);
            streamA.append(1);
            streamB.append(2);
            expect(onEvent).toHaveBeenCalledWith(1);
            expect(onEvent).toHaveBeenCalledWith(2);
        });
    });
});