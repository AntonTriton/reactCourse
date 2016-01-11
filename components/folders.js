'use strict';

import React, { Component, PropTypes } from 'react';

import ReactDOM from 'react-dom';

//import {foldersData} from './data.js';

import { Link } from 'react-router';

import store from '../store.js'

class FolderItem extends Component {

    constructor(props){
        super(props);

        this.state = {
            margin: this.props.level*30 + "px",
            id: this.props.id
        }
    }

    editing(event){
        this.props.editingFolder(event.target.value);
        /*this.setState({
            value: event.target.value
        })*/
    }

    showNotes(){

    }

    componentDidUpdate(){
        ReactDOM.findDOMNode(this.refs.folderInput).focus();
    }

    render() {

        console.log('folder item render',this.props.title);

        var cl,
            self = this,
            isActive = this.props.isActive ? "active" : "",
            textModeClass = 'visible',
            editModeClass = 'hidden',
            reset_edit= this.props.reset_edit,
            title = this.props.title;

        this.props.status == 'closed' ? cl = 'fa-folder' : cl = "fa-folder-open";

        if(this.props.isEdit){
            textModeClass = 'hidden';
            editModeClass = 'visible';
        }

        return (

        <li style={{marginLeft : self.state.margin}} className={isActive} onClick={self.showNotes}>
            <Link to={"/folder/"+self.state.id}>
                <i className={"fa " + cl}></i>
                <span className="note-title">
                    <span className={textModeClass+" note-title"}>{title}</span>

                    <input className={editModeClass}
                           onBlur={reset_edit}
                           onChange={self.editing.bind(this)}
                           ref="folderInput"
                           type="text" value={title}/>
                </span>
            </Link>
        </li>

        );
    }

};

class folders extends Component {

    constructor(){
        super();

        /*this.state = {
            folders: foldersData
        }*/
    }

    render(){

        var folders = store.getState().foldersData,
            activeFolderId = this.props.activeFolderId,
            reset_edit = this.props.reset_edit,
            editingFolder = this.props.editingFolder,
            editFolderId = store.getState().editFolderId;

        console.log('folders render',folders);

        var items = folders.map(function(item) {

            var isActive = false,
                isEdit = false;

            if(item.id == activeFolderId) isActive = true;
            if(item.id == editFolderId) isEdit = true;

            //console.log('folders',item.id,activeFolderId,editFolderId);

            return <FolderItem key={item.key}
                               isActive={isActive}
                               isEdit={isEdit}
                               level={item.level}
                               id={item.id}
                               title={item.title}
                               reset_edit={reset_edit}
                               editingFolder={editingFolder}
                               status={item.status} />
        });

        return (
            <ul>
                {items}
            </ul>
        );
    }

};

export default folders;
