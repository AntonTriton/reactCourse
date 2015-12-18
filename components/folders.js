'use strict';

var React = require('react');

var FolderItem = React.createClass({

    render: function() {

        var cl;

        this.props.status == 'closed' ? cl = 'fa-folder' : cl = "fa-folder-open";

        return (

        <li>
            <i className={"fa " + cl}></i>
            {this.props.title}
        </li>

        );
    }

});

import {foldersData} from './data.js';

var folders = React.createClass({

    getInitialState: function(){

        return {
            folders: foldersData
        }
    },

    render: function() {

        var folders = this.state.folders;

        var items = folders.map(function(item) {
            return <FolderItem key={item.key} title={item.title} status={item.status} />
        });

        return (
            <ul>
                {items}
            </ul>
        );
    }

});

module.exports = folders;
