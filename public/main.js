'use strict';

import React from 'react';

import ReactDOM from 'react-dom';

import { Router, Route, Link } from 'react-router'

import store from './store.js'

import { Provider } from 'react-redux'

import App from './components/app.js'
import Main from './components/main.js'
import Content from './components/content.js'

import { routeConfig } from 'routeConfig.js'

ReactDOM.render(
    <Provider store={store}>
        <Router routes={routeConfig} />
    </Provider>,
    document.querySelector('.app'));

