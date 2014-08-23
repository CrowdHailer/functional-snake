module.exports = function () {
    funcs = arguments
    return function() {
        var args, i;
        args = arguments
        i = funcs.length - 1;
        for (i; i >= 0; i--) {
            args = [funcs[i].apply(this, args)]
        };
        return args [0];
    }
}