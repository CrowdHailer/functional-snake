module.exports = function (n, func) {
    var i;
    for(i = 0; i < n; i++){
        func(i);
    }
};