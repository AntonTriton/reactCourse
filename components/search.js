'use strict';

var React = require('react');

var MenuItem = React.createClass({

    render: function() {

        return (
        <li>
            <a href="#">
                <i className={this.props.cl}></i>
                <span>{this.props.title}</span>
            </a>
        </li>
        );
    }

});

var menu = React.createClass({

    getInitialState: function(){

        return {
            menu: [
                {
                    key: 0,
                    title : "Add",
                    class: 'fa fa-plus'
                },
                {
                    key: 1,
                    title : "Edit",
                    class: 'fa fa-pencil'
                },
                {
                    key: 2,
                    title : "Remove",
                    class: 'fa fa-remove'
                }
            ]
        }
    },

    render: function() {

        var menu = this.state.menu;

        var items = menu.map(function(item) {
            return <MenuItem key={item.key} title={item.title} cl={item.class} />
        });

        return (
            <ul>
                {items}
            </ul>
        );
    }

});

module.exports = menu;
