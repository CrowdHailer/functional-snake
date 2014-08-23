'use strict';

function k (K) {
    return function () {
        return K;
    };
}

function adjoin(f) {
    return function (g) {
      return function () {
        return f.call(this, (g.apply(this, arguments)));
      };
    };
  }

function compose(arr) {
    return function () {
        return arr[0].call(this, (arr[1].apply(this, arguments)));
    };
}

var curry = require('curry');

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
        var newStream
        beforeEach(function () {
            stream = Stream.create(onError, onEvent);
        });

        it('should not pass each false event', function () {
            newStream = Stream.filter(k(false), stream);
            newStream.append({});
            expect(onEvent).not.toHaveBeenCalled();
        });

        it('should pass each true event', function () {
            newStream = Stream.filter(k(true), stream);
            newStream.append({});
            expect(onEvent).toHaveBeenCalledWith({});
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