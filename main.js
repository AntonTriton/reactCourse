'use strict';

import { Router, Route, Link } from 'react-router'

var React = require('react');
var ReactDOM = require('react-dom');

var App = require('./components/app.js'),
    Main = require('./components/main.js'),
    Content = require('./components/content.js');

/*ReactDOM.render(
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
);*/

const routeConfig = [
    { path: '/',
        component: App,
        indexRoute: { component: Main },
        childRoutes: [
            { path: 'note/:id', component: Content}
        ]
    }
];

ReactDOM.render(<Router routes={routeConfig} />, document.querySelector('.app'));

