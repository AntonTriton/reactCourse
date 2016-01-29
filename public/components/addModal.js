
import React, { Component } from 'react';

import {Modal, Button} from 'react-bootstrap';

import {modalStyle,backdropStyle,dialogStyle} from '../initialData/constants.js';

class AddModal extends Component {

    constructor(props){
        super(props);

        this.newFolderTitle = "";

        this.state = {
            title: this.props.title,
            folderChecked: false,
            noteChecked: false,
            folderClass: "hidden",
            noteClass: "hidden"
        }
    }

    setFolderType(){
        this.setState({ folderChecked: true, noteChecked: false, folderClass: '', noteClass: 'hidden' });
    }

    setNoteType(){
        this.setState({ folderChecked: false, noteChecked: true, noteClass: '', folderClass: 'hidden' });
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

    addCommon(){

        if(this.state.folderChecked){

            this.props.addFolder(this.newFolderTitle);

        }else if(this.state.noteChecked){

            this.props.addNote(this.newNoteTitle, this.newNoteContent);
        }

        this.props.onClose();
    }

    render(){

        var self = this;

        return (
            <Modal
                aria-labelledby='modal-label'
                style={modalStyle}
                backdropStyle={backdropStyle}
                show={self.props.is_show}
                onHide={self.props.onClose}
                >

                <div style={dialogStyle()} >

                    <h4 id='modal-label'>{self.props.message}</h4>

                    <div className="modal-item">
                        <label htmlFor="folder_type">
                            <input name="create_type"
                                   checked={self.state.folderChecked}
                                   onChange={self.setFolderType.bind(self)} id="folder_type" type="radio"/>
                            <span>Folder</span>
                        </label>
                    </div>

                    <div className="modal-item">
                        <label htmlFor="note_type">
                            <input name="create_type"
                                   checked={self.state.noteChecked}
                                   onChange={self.setNoteType.bind(self)} id="note_type" type="radio"/>
                            <span>Note</span>
                        </label>
                    </div>

                    <div className={self.state.folderClass + " modal-item"}>
                        <label htmlFor="note_type">
                            <input type="text" placeholder="Folder's name"
                                   onChange={self.setNewFolderTitle.bind(self)}
                                   className="form-control"/>
                        </label>
                    </div>

                    <div className={self.state.noteClass + " modal-item"}>
                        <label htmlFor="note_type">
                            <input type="text" placeholder="Note's title"
                                   onChange={self.setNewNoteTitle.bind(self)}
                                   className="form-control"/>
                        </label>

                        <div>
                            <textarea className="form-control" name="" id="" cols="30" rows="10"
                                      onChange={self.setNewNoteContent.bind(self)}
                                      defaultValue="Note's text"></textarea>
                        </div>
                    </div>

                    <div>
                        <Button bsStyle="primary" onClick={self.addCommon.bind(self)}>Add</Button>
                        <Button onClick={self.props.onClose}>Cancel</Button>
                    </div>

                    <div></div>
                </div>
            </Modal>
        )
    }

}

export default AddModal;
