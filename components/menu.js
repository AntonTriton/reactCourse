'use strict';

var React = require('react');

var MenuItem = React.createClass({

    render: function() {
        console.log('render0');

        return (
        <li>
            <a href="#">
                <i className="fa fa-plus"></i>
                <span>Add</span>
            </a>
        </li>
        );
    }

});

console.log('1223',MenuItem);

var menu = React.createClass({

    render: function() {
        console.log('render1');

        return (
            <ul>
                <MenuItem/>
            </ul>
        );
    }

});

module.exports = menu;
