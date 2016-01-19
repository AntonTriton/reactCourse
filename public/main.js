'use strict';

import { Router, Route, Link } from 'react-router'

import store from './store.js'

import { Provider } from 'react-redux'

import App from './components/app.js'

//import reducer from './reducers.js'

console.log('!!!');

var React = require('react');
var ReactDOM = require('react-dom');

var Main = require('./components/main.js'),
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
            { path: 'note/:id', component: Content},
            { path: 'folder/:id', component: Main}
        ]
    }
];

ReactDOM.render(
    <Provider store={store}>
        <Router routes={routeConfig} />
    </Provider>,
    document.querySelector('.app'));

