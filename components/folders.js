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

var folders = React.createClass({

    getInitialState: function(){

        return {
            folders: [
                {
                    key: 0,
                    title : "Corporative",
                    status: 'closed'
                },
                {
                    key: 1,
                    title : "Private",
                    status: 'closed'
                },
                {
                    key: 2,
                    title : "Activities",
                    status: 'closed'
                }
            ]
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
