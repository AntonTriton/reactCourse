'use strict';

import React, { Component } from 'react';

import {foldersData} from './data.js';

import filter from 'lodash/collection/filter.js';

import Menu from './menu.js';

import Folders from './folders.js';

import Notes from './notes.js';

/*var Menu = require('./menu.js'),
    Folders = require('./folders.js'),
    Notes = require('./notes.js');*/

class Main extends Component {

    constructor(props){
        super(props);

        this.state = {
            showModal : false
        }
    }

    getFolderById(id){

        return filter(foldersData, function(item){
            return item.id == id
        });

    }

    render() {

        var folder = foldersData[0],
            folderId = this.props.params.id || 0;

        if(folderId) folder = this.getFolderById(folderId)[0];

        return (
            <div>
                <Menu page="main" />
                <section className="folders col-md-3"><Folders activeFolderId={folderId}/></section>
                <section className="notes col-md-8"><Notes folder={folder} /></section>


            </div>
        );
    }

};

module.exports = Main;
