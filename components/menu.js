'use strict';

import React, { Component } from 'react';

import {menuData} from './data.js';

import filter from 'lodash/collection/filter.js';

import indexOf from 'lodash/array/indexOf.js';

import {Modal, Button} from 'react-bootstrap';

import ReactDOM from 'react-dom';

const modalStyle = {
    position: 'fixed',
    zIndex: 1040,
    top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
    ...modalStyle,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.5
};

const dialogStyle = function() {

    return {
        position: 'absolute',
        width: 400,
        top: '100px',
        left: '50%',
        marginLeft: '-200px',
        border: '1px solid #e5e5e5',
        backgroundColor: 'white',
        boxShadow: '0 5px 15px rgba(0,0,0,.5)',
        padding: 20
    };
};

class MenuItem extends Component {

    constructor(props){
        super(props);

        this.state = {
            editModeClass: 'hidden',
            textModeClass: 'visible',
            title: this.props.title,
            showCreateModal : false,
            folderChecked: false,
            noteChecked: false,
            folderClass: "hidden",
            noteClass: "hidden"
        }
    }

    add(){

        if(this.state.folderChecked){

        }else if(this.state.noteChecked){

        }
        //console.log('add',this.state);
    }

    remove(){

    }

    handlerClick(){
        var action = this.props.action;

        switch (action){
            case "add":
                this.open();
                break;
            case "edit":

                // store.dispatch('SET_FOLDER_EDIT_MODE');

                this.setEditMode();
                break;
            case "remove":
                this.remove();
                break;
        }

    }

    close() {
        this.setState({ showCreateModal: false });
    }

    open() {
        this.setState({ showCreateModal: true });
    }

    setFolderType(){
        this.setState({ folderChecked: true, noteChecked: false, folderClass: '', noteClass: 'hidden' });
    }

    setNoteType(){
        this.setState({ folderChecked: false, noteChecked: true, noteClass: '', folderClass: 'hidden' });
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

    componentDidUpdate(){
        ReactDOM.findDOMNode(this.refs.folderInput).focus();
    }

    editing(event){
        this.setState({
            title: event.target.value
        })
    }

    render() {

        var self = this;

        return (
        <li>
            <a href="#" onClick={self.handlerClick.bind(this)}>
                <i className={this.props.cl}></i>
                <span className={self.state.textModeClass}>{this.state.title}</span>

                <input className={self.state.editModeClass}
                       onBlur={self.setTextMode.bind(this)}
                       onChange={self.editing.bind(this)}
                       ref="folderInput"
                       type="text" value={self.state.title}/>
            </a>

            <Modal
                aria-labelledby='modal-label'
                style={modalStyle}
                backdropStyle={backdropStyle}
                show={self.state.showCreateModal}
                onHide={self.close.bind(this)}
                >

                <div style={dialogStyle()} >

                    <h4 id='modal-label'>What do you want to add ?</h4>

                    <div className="modal-item">
                        <label htmlFor="folder_type">
                            <input name="create_type"
                                   checked={this.state.folderChecked}
                                   onChange={this.setFolderType.bind(this)} id="folder_type" type="radio"/>
                            <span>Folder</span>
                        </label>
                    </div>

                    <div className="modal-item">
                        <label htmlFor="note_type">
                            <input name="create_type"
                                   checked={this.state.noteChecked}
                                   onChange={this.setNoteType.bind(this)} id="note_type" type="radio"/>
                            <span>Note</span>
                        </label>
                    </div>

                    <div className={self.state.folderClass + " modal-item"}>
                        <label htmlFor="note_type">
                            <input type="text" placeholder="Folder's name" className="form-control"/>
                        </label>
                    </div>

                    <div className={self.state.noteClass + " modal-item"}>
                        <label htmlFor="note_type">
                            <input type="text" placeholder="Note's title" className="form-control"/>
                        </label>

                        <div>
                            <textarea className="form-control" name="" id="" cols="30" rows="10" defaultValue="Note's text"></textarea>
                        </div>
                    </div>

                    <div>
                        <Button bsStyle="primary" onClick={self.add.bind(this)}>Add</Button>
                        <Button onClick={self.close.bind(this)}>Cancel</Button>
                    </div>

                    <div></div>
                </div>
            </Modal>
        </li>
        );
    }

};

class Menu extends Component {

    constructor(props){
        super(props);

        this.state = {
            menu: menuData,
            showCreateModal: false
        }
    }

    render() {

        var menu = this.state.menu,
            page = this.props.page;

        var currentMenu = filter(menu,function(item){
            return indexOf(item.page,page) != -1
        });

        var items = currentMenu.map(function(item) {
            return <MenuItem key={item.key} title={item.title} cl={item.class} action={item.action} />
        });

        return (
            <nav className="col-md-1 left-menu">
                <ul>
                    {items}
                </ul>

            </nav>
        );
    }

};

module.exports = Menu;
