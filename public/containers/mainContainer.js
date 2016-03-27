
import * as actions from '../actions/index.js';

import {fetchNotes} from '../actions/fetchNotes';
import {fetchFolders} from '../actions/fetchFolders';

import find from 'lodash/collection/find.js';
import filter from 'lodash/collection/filter.js';

//import { connect } from 'react-redux'

//import filter from 'lodash/collection/filter.js';

//import store from '../store.js'

//import Menu from './menu.js';

//import ConfirmModal from './ConfirmModal.js';

//import {Modal, Button} from 'react-bootstrap';

//----------------------------

import { connect } from 'react-redux'
import Main from '../components/main'

const mapStateToProps = (state) => {

    console.log('mapStateToProps',state);

    return {
        notes: state.notes,
        folders: state.folders,
        //editNoteId: state.editNoteId,
        //activeNoteId: state.activeNoteId,
        activeFolderId: state.activeFolderId,
        editFolderId: state.editFolderId,
        showConfirmModal: state.showConfirmModal,
        showAddModal: state.showAddModal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        /*setNoteEditMode:(activeNoteId)=>{
            dispatch(actions.set_note_edit_mode(activeNoteId));
        },
        resetNoteEditMode:()=>{
            dispatch(actions.reset_note_edit_mode());
        },
        editingNoteTitle:(activeNoteId,event)=>{

            dispatch(actions.editing_note_title(event.target.value,activeNoteId));
        },
        editingNoteContent:(activeNoteId,event)=>{
            dispatch(actions.editing_note_content(event.target.value,activeNoteId));
        },
        deleteTag:(activeFolderId,event)=>{
            var tagIndex = event.target.parentElement.dataset.index;

            dispatch(actions.delete_tag(tagIndex,activeFolderId));
        },
        addTag:(activeFolderId,event)=>{
            var tagName = event.target.parentElement.children[0].value;

            dispatch(actions.add_tag(tagName,activeFolderId));
        },

        setNoteActive:(id)=>{
            dispatch(actions.set_note_active(id));
        },*/



        fetchNotes:(method,data)=>{
            return dispatch(fetchNotes(method,data));
        },

        fetchFolders:(method,data)=>{
            return dispatch(fetchFolders(method,data));
        },

        setEditFolder:(activeFolderId)=>{

            dispatch(actions.set_folder_edit_mode(activeFolderId));
        },

        removeFolder:(folder)=>{

            dispatch(fetchFolders('DELETE',folder)).then(function(){
                dispatch(actions.hide_confirm_modal());
            });
        },

        addFolder:function(activeFolderId,name){

            var activeFolder= this.getFolderById(activeFolderId),
                level = activeFolder[0].level + 1,
                index = this.getFolderIndexById(activeFolderId);

            dispatch(fetchFolders('POST',{name : name, level: level, parentId: activeFolder[0].id ,index: index}));

            //console.log('addFolder',this.getFolderById);
        },

        addNote:(activeFolderId,title,content)=>{

            var directoryId = parseInt(activeFolderId);

            dispatch(fetchNotes('POST',{title : title, description: content, directoryId: directoryId}));
        },

        resetEditFolder:(currentFolder)=>{
            dispatch(actions.reset_folder_edit_mode());
            dispatch(fetchFolders('PUT',currentFolder))
        },

        editingFolder:(editFolderId,value)=>{

            dispatch(actions.editing_folder(value,editFolderId));
        },

        showConfirm:()=>{
            dispatch(actions.show_confirm_modal());
        },

        closeConfirm:()=>{
            dispatch(actions.hide_confirm_modal());
        },

        showAdd:()=>{
            dispatch(actions.show_add_modal());
        },

        closeAdd:()=>{
            dispatch(actions.hide_add_modal());
        },

        setFolderActive:(folderId)=>{
            dispatch(actions.set_folder_active(folderId));
        },

        updateNotePosition:(index,atIndex,note)=>{
            dispatch(actions.update_note_position(index,atIndex,note));
        },

        saveNotePosition:(notes)=>{
            dispatch(fetchNotes('PUT',notes));
        },

        updateNoteTitle:(notes,noteId,newTitle)=>{
            var note = find(notes,function(item){
                    return item.id == noteId
                });

            note.title = newTitle;

            dispatch(fetchNotes('PUT',note));
            //this.props.fetchNotes('PUT', note);
        },

        moveNote:function(id,atIndex){

            let { note, index } = this.props.findNote(id);

            this.props.updateNotePosition(index,atIndex,note);
        },

        findNote:function(id){

            let notes;
            if (this.notes) notes = this.notes.items;
            if (this.props && this.props.notes) notes = this.props.notes.items;

            const note = filter(notes, function(item){
                return item.id === id
            })[0];

            return {
                note,
                index: notes.indexOf(note)
            };
        }
    }
}

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)

export default MainContainer
