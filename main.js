'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var menu = React.createElement(require('./components/menu.js')),
    folders = React.createElement(require('./components/folders.js')),
    notes = React.createElement(require('./components/notes.js'));

ReactDOM.render(
    menu,
    document.querySelector('.left-menu')
);

ReactDOM.render(
    folders,
    document.querySelector('.folders')
);

ReactDOM.render(
    notes,
    document.querySelector('.notes')
);
