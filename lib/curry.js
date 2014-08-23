module.exports = function (func) {
    var length = func.length
    var args = []
    function wait() {
        args = args.concat(Array.prototype.slice.call(arguments));
        if (length <= args.length) {
            return func.apply(null, args)
        };
        return wait
    }
    return wait
}