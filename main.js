'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

console.log('!!!');

//var el = React.createElement('h1',null,'Hello, world!');
var menu = React.createElement(require('./components/menu.js'));

//console.log('menu',require('menu'));
//console.log('menu',require('/components/menu.js'));//
//console.log('menu',require('./components/menu.js'));

ReactDOM.render(
    menu,
    document.getElementById('example')
);
