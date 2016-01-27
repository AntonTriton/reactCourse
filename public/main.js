'use strict';

import React from 'react';

import ReactDOM from 'react-dom';

import { Router, Route, Link } from 'react-router'

import store from './store.js'

import { Provider } from 'react-redux'

import routeConfig from './routeConfig.js'

ReactDOM.render(
    <Provider store={store}>
        <Router routes={routeConfig} />
    </Provider>,
    document.querySelector('.app'));

