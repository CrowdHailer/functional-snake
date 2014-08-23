module.exports = function (arity, func) {
    if (typeof arity === 'function') {
        func = arity;
        arity = func.length;
    }
    var args = []
    function wait() {
        args = args.concat(Array.prototype.slice.call(arguments));
        if (arity <= args.length) {
            return func.apply(null, args)
        };
        return wait
    }
    return wait
}