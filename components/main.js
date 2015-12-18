'use strict';

var React = require('react'),
    Menu = require('./menu.js'),
    Folders = require('./folders.js'),
    Notes = require('./notes.js');

var Main = React.createClass({

    render: function() {
        return (
            <div>
                <Menu page="main" />
                <section className="folders col-md-3"><Folders /></section>
                <section className="notes col-md-8"><Notes /></section>
            </div>
        );
    }

});

module.exports = Main;
