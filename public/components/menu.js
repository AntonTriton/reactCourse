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

        this.newFolderTitle = "";

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

    addCommon(){

        console.log('addCommon');

        if(this.state.folderChecked){

            console.log('addFolder',this.newFolderTitle);

            this.props.addFolder(this.newFolderTitle);

        }else if(this.state.noteChecked){
            console.log('addNote',this.newFolderTitle);

            this.props.addNote(this.newNoteTitle, this.newNoteContent);
        }

        this.close();
        //console.log('add',this.state);
    }

    remove(){

    }

    handlerClick(event){
        event.preventDefault();

        var action = this.props.action;

        switch (action){
            case "add":
                this.open();
                break;
            case "edit":
                this.props.set_edit();
                console.log('menu edit click');
                break;
            case "remove":
                console.log('remove 1');

                if(this.props.page == 'main') {
                    this.props.removeFolder();
                }else if(this.props.page == 'note'){
                    //this.props.removeNote();
                }

                break;
            case "back":
                console.log('back',this.props.back);
                this.props.back();
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

    setNewFolderTitle(event){
        this.newFolderTitle = event.target.value;
    }

    setNewNoteTitle(event){
        this.newNoteTitle = event.target.value;
    }

    setNewNoteContent(event){
        this.newNoteContent = event.target.value;
    }

    render() {

        var self = this;

        //console.log('menu item',this.props);

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
                            <input type="text" placeholder="Folder's name"
                                   onChange={self.setNewFolderTitle.bind(this)}
                                   className="form-control"/>
                        </label>
                    </div>

                    <div className={self.state.noteClass + " modal-item"}>
                        <label htmlFor="note_type">
                            <input type="text" placeholder="Note's title"
                            onChange={self.setNewNoteTitle.bind(this)}
                            className="form-control"/>
                        </label>

                        <div>
                            <textarea className="form-control" name="" id="" cols="30" rows="10"
                            onChange={self.setNewNoteContent.bind(this)}
                            defaultValue="Note's text"></textarea>
                        </div>
                    </div>

                    <div>
                        <Button bsStyle="primary" onClick={self.addCommon.bind(this)}>Add</Button>
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

        console.log('menu render !!!',this.props);

        var self = this,
            menu = self.state.menu,
            page = self.props.page,
            set_edit=self.props.set_edit;

        var currentMenu = filter(menu,function(item){
            return indexOf(item.page,page) != -1
        });

        var items = currentMenu.map(function(item) {
            return <MenuItem key={item.key}
            title={item.title}
            cl={item.class}
            set_edit={set_edit}
             removeFolder={self.props.removeFolder}
            removeNote={self.props.removeNote}
             addFolder={self.props.addFolder}
             addNote={self.props.addNote}
                page={page}
            back={self.props.back}
            action={item.action} />
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

export default Menu;
