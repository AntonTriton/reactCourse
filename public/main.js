'use strict';

import React from 'react';

import ReactDOM from 'react-dom';

import store from './store.js'

import routeConfig from './routeConfig.js'

import { Router, Route, Link } from 'react-router'

import { Provider } from 'react-redux'


ReactDOM.render(
    <Provider store={store}>
        <Router routes={routeConfig} />
    </Provider>,
    document.querySelector('.app'));

