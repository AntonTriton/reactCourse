'use strict';

import React, { Component, PropTypes } from 'react';

import ReactDOM from 'react-dom';

import {foldersData} from './data.js';

import { Link } from 'react-router';


class FolderItem extends Component {

    constructor(props){
        super(props);

        console.log('constr',this.props);

        this.state = {
            editModeClass: 'hidden',
            textModeClass: 'visible',
            value: this.props.title,
            margin: this.props.level*30 + "px",
            id: this.props.id
        }
    }

    setEditMode(){
        this.setState({
            editModeClass : "visible",
            textModeClass : "hidden"
        })
    }

    setTextMode(){
        this.setState({
            editModeClass : "hidden",
            textModeClass : "visible"
        })
    }

    editing(event){
        this.setState({
            value: event.target.value
        })
    }

    showNotes(){

    }

    componentDidUpdate(){
        ReactDOM.findDOMNode(this.refs.folderInput).focus();
    }

    render() {

        console.log('folder',this.props);

        var cl,
            self = this,
            isActive = this.props.isActive ? "active" : "";

        this.props.status == 'closed' ? cl = 'fa-folder' : cl = "fa-folder-open";

        return (

        <li style={{marginLeft : self.state.margin}} className={isActive} onClick={self.showNotes}>
            <Link to={"/notes/"+self.state.id}>
                <i className={"fa " + cl}></i>
                <span className="note-title">
                    <span className={self.state.textModeClass+" note-title"}>{self.state.value}</span>

                    <input className={self.state.editModeClass}
                           onBlur={self.setTextMode.bind(this)}
                           onChange={self.editing.bind(this)}
                           ref="folderInput"
                           type="text" value={self.state.value}/>
                </span>
            </Link>
        </li>

        );
    }

};

class folders extends Component {

    constructor(){
        super();

        this.state = {
            folders: foldersData
        }
    }

    render() {

        var folders = this.state.folders;

        var items = folders.map(function(item) {
            return <FolderItem key={item.key}
                               isActive={item.isActive}
                               level={item.level}
                               id={item.id}
                               title={item.title}
                               status={item.status} />
        });

        return (
            <ul>
                {items}
            </ul>
        );
    }

};

module.exports = folders;
