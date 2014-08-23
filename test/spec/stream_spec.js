'use strict';

describe('Stream', function () {
    var Stream, onError, onEvent, stream, _, curry, compose;

    beforeEach(function () {
        Stream = require('../../lib/stream');
        onEvent = jasmine.createSpy('event');
        onError = jasmine.createSpy('error');
        _ = require('../../lib/cumin/utilities');
        compose = require('../../lib/cumin/compose');
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
        var newStream;

        beforeEach(function () {
            stream = Stream.create(onError, onEvent);
        });

        it('should map each event', function () {
            newStream = Stream.map(_.k(1), stream);
            newStream.append({});
            expect(onEvent).toHaveBeenCalledWith(1);
        });

        it('should accept curried arguments', function () {
            newStream = Stream.map(_.k(1))(stream);
            newStream.append({});
            expect(onEvent).toHaveBeenCalledWith(1);
        });
    });

    describe('filter', function () {
        var newStream
        beforeEach(function () {
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

    describe('composition', function () {
        it('should compose nicly', function () {
            function add1(x){
                return x + 1;
            }

            function double(x){
                return 2 * x;
            }

            var pipe = compose(
                Stream.map(add1),
                Stream.map(double),
                Stream.map(add1)
            )

            stream = pipe(Stream.create(onError, onEvent));
            stream.append(2)
            expect(onEvent).toHaveBeenCalledWith(7)
        });

    });
});