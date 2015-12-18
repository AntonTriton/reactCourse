'use strict';

var React = require('react');

console.log('app');

var App = React.createClass({

    render: function() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

});

module.exports = App;
