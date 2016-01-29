'use strict';

import React, { Component } from 'react';

import filter from 'lodash/collection/filter.js';

import indexOf from 'lodash/array/indexOf.js';

import {Modal, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

import {menuData, modalStyle,backdropStyle,dialogStyle} from '../initialData/constants.js';

import ReactDOM from 'react-dom';


class MenuItem extends Component {

    constructor(props){
        super(props);

        this.newFolderTitle = "";

        this.state = {
            title: this.props.title,
            showCreateModal : false,
            folderChecked: false,
            noteChecked: false,
            folderClass: "hidden",
            noteClass: "hidden"
        }
    }

    handlerClick(event){
        event.preventDefault();

        var self= this,
            action = this.props.action;

        switch (action){
            case "add":

                this.props.showAdd();

                break;

            case "edit":

                this.props.set_edit();

                if(this.props.page == 'note') {
                    self.is_note_edit_mode ? self.is_note_edit_mode = false : self.is_note_edit_mode = true;
                }

                break;

            case "remove":

                if(this.props.page == 'main') {
                    this.props.removeFolder();
                }else if(this.props.page == 'note'){
                    this.props.removeNote();
                }

                break;

            case "back":

                this.props.back();

                break;
        }
    }

    render() {

        var self = this,
            title = this.state.title,

            tooltip = (
                <Tooltip id="tooltip1">{self.props.tooltip}</Tooltip>
            );

        if(title == "Edit" && self.is_note_edit_mode){

            title = "Save";

        }

        return (
        <li>
            <OverlayTrigger placement="right" overlay={tooltip}>
                <a href="#" onClick={self.handlerClick.bind(this)}>
                        <i className={self.props.cl}></i>
                        <span>{title}</span>
                </a>
            </OverlayTrigger>


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

        var self = this,
            menu = self.state.menu,
            page = self.props.page,
            is_note_edit_mode = self.props.editModeClass == 'visible',
            set_edit = self.props.set_edit,
            tooltip;

        var currentMenu = filter(menu,function(item){
            return indexOf(item.page,page) != -1
        });

        var items = currentMenu.map(function(item) {

            if(page == 'main' || item.tooltips.length == 1){

                tooltip = item.tooltips[0];

            }else{

                tooltip = item.tooltips[1];
            }

            return <MenuItem key={item.key}
            title={item.title}
            cl={item.class}
            set_edit={set_edit}
             removeFolder={self.props.removeFolder}
            removeNote={self.props.removeNote}
             addFolder={self.props.addFolder}
             addNote={self.props.addNote}
                page={page}
             tooltip={tooltip}
            back={self.props.back}
             showAdd={self.props.showAdd}
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


