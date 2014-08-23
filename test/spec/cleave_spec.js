'use strict';

describe('Cleaving a Stream', function () {
    var Stream, onError, onEvent, stream;

    beforeEach(function () {
        Stream = require('../../lib/stream');
        onEvent = jasmine.createSpy('event');
        onError = jasmine.createSpy('error');
        stream = Stream.create(onError, onEvent);
    });

    it('should pass events to te head stream', function () {
        var newStream = Stream.cleave(2, stream);
        newStream.append(1);
        expect(onEvent).toHaveBeenCalledWith([1]);
    });

    it('should pass most recents events to head stream', function () {
        var newStream = Stream.cleave(2, stream);
        newStream.append(1);
        onEvent.calls.reset();
        newStream.append(2);
        expect(onEvent).toHaveBeenCalledWith([1, 2]);
    });

    it('should pass at most the set capacity', function () {
        var newStream = Stream.cleave(2, stream);
        newStream.append(1);
        newStream.append(2);
        onEvent.calls.reset();
        newStream.append(3);
        expect(onEvent).toHaveBeenCalledWith([2, 3]);
    });

    it('should not pass events to the tail before buffer full', function () {
        var newStream = Stream.cleave(2, null, stream);
        newStream.append(1);
        expect(onEvent).not.toHaveBeenCalledWith([1]);
    });

    it('should pass overflow elements to the tail', function () {
        var newStream = Stream.cleave(2, null, stream);
        newStream.append(1);
        newStream.append(2);
        newStream.append(3);
        expect(onEvent).toHaveBeenCalledWith(1);
    });
});