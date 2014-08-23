console.log('hello');

window.$ = document.querySelector.bind(document);

var _ = require('../../lib/utilities');
_.dot = require('cumin-dot');
var curry = require('../../lib/curry');

var VECTORS = {
    117: {x: -50, y: -86}, // u
    105: {x: 50, y: -86}, // i
    107: {x: 100, y: 0}, // k
    109: {x: 50, y: 86}, // m
    110: {x: -50, y: 86}, // n
    104: {x: -100, y: 0}, // h
};

var Stream = require('../../lib/stream');
var socket = io();

var stream = Stream.create(function (err) {
    console.warn(err);
}, function (evt) {
    console.log(evt);
    socket.emit('data', evt);
})

Stream.fromEvents('keypress', document, 
    Stream.map(_.dot('keyCode'), stream)
);