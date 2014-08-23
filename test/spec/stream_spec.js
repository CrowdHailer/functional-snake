'use strict';


describe('Stream', function () {
    var Stream, onError, onEvent, stream, _, curry;

    beforeEach(function () {
        Stream = require('../../lib/stream');
        onEvent = jasmine.createSpy('event');
        onError = jasmine.createSpy('error');
        _ = require('../../lib/utilities');
        curry = require('curry');
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
    });

    xdescribe('composition', function () {
        it('should compose nicly', function () {
            function add1(x){
                return x + 1;
            }

            function double(x){
                return 2 * x;
            }

            stream = Stream.map(double, Stream.map(add1, onError, onEvent));
            stream.append(2)
            expect(onEvent).toHaveBeenCalledWith(5)

        });

        it('second composition', function () {
            var cmap = curry.to(2, Stream.map);
            function add1(x){
                return x + 1;
            }

            function double(x){
                return 2 * x;
            }

            var stream = compose([
                cmap(add1),
                cmap(double)  
            ])(Stream.create(onError, onEvent));

            stream.append(1);
            expect(onEvent).toHaveBeenCalledWith(4)
        });

        it('curried', function () {
            var cmap = curry.to(2, Stream.map);
            function add1(x){
                return x + 1;
            }

            function double(x){
                return 2 * x;
            }
            var stream = cmap(add1, Stream.create(onError, onEvent));
            stream.append(2);
            expect(onEvent).toHaveBeenCalledWith(3)
        });
    });
});