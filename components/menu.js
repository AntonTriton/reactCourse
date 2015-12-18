'use strict';

var React = require('react');

import {menuData} from './data.js';

import filter from 'lodash/collection/filter.js';

import indexOf from 'lodash/array/indexOf.js';

var MenuItem = React.createClass({

    handlerClick: function(){
        var page = this.props.page;

    },

    render: function() {

        return (
        <li>
            <a href="#" onClick="handlerClick()">
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
            menu: menuData
        }
    },

    render: function() {

        var menu = this.state.menu,
            page = this.props.page;

        var currentMenu = filter(menu,function(item){
            return indexOf(item.page,page) != -1
        });

        var items = currentMenu.map(function(item) {
            return <MenuItem key={item.key} title={item.title} cl={item.class} action={item.action} />
        });

        return (
            <nav className="col-md-1 left-menu">
                <ul>
                    {items}
                </ul>
            </nav>
        );
    }

});

module.exports = menu;
