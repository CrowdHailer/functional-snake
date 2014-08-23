exports.k = function (x) {
    return function () {
        return x;
    }
};

exports.i = function (x) {
    return x;
};

exports.times = function (n, func) {
    var i;
    for(i = 0; i < n; i++){
        func(i);
    }
};