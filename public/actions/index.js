/*
 * action types
 */

/* Folders actions */
export const SET_FOLDER_EDIT_MODE = 'SET_FOLDER_EDIT_MODE';
export const RESET_FOLDER_EDIT_MODE = 'RESET_FOLDER_EDIT_MODE';
export const SET_FOLDER_ACTIVE = 'SET_FOLDER_ACTIVE';
export const EDITING_FOLDER = 'EDITING_FOLDER';

/* Notes actions */
export const SET_NOTE_EDIT_MODE = 'SET_NOTE_EDIT_MODE';
export const RESET_NOTE_EDIT_MODE = 'RESET_NOTE_EDIT_MODE';
export const SET_NOTE_ACTIVE = 'SET_NOTE_ACTIVE';
export const EDITING_NOTE_TITLE = 'EDITING_NOTE_TITLE';
export const EDITING_NOTE_CONTENT = 'EDITING_NOTE_CONTENT';
export const DELETE_TAG = 'DELETE_TAG';
export const ADD_TAG = 'ADD_TAG';

export const SHOW_CONFIRM_MODAL = 'SHOW_CONFIRM_MODAL';
export const HIDE_CONFIRM_MODAL = 'HIDE_CONFIRM_MODAL';

export const SHOW_ADD_MODAL = 'SHOW_ADD_MODAL';
export const HIDE_ADD_MODAL = 'HIDE_ADD_MODAL';

export const UPDATE_NOTE_POSITION = 'UPDATE_NOTE_POSITION';

/* fetching folders actions */
export const GET_FOLDERS_REQUEST = 'GET_FOLDERS_REQUEST';
export const GET_FOLDERS_RESPONSE = 'GET_FOLDERS_RESPONSE';

export const CREATE_FOLDERS_REQUEST = 'CREATE_FOLDERS_REQUEST';
export const CREATE_FOLDERS_RESPONSE = 'CREATE_FOLDERS_RESPONSE';

export const UPDATE_FOLDERS_REQUEST = 'UPDATE_FOLDERS_REQUEST';
export const UPDATE_FOLDERS_RESPONSE = 'UPDATE_FOLDERS_RESPONSE';

export const DELETE_FOLDERS_REQUEST = 'DELETE_FOLDERS_REQUEST';
export const DELETE_FOLDERS_RESPONSE = 'DELETE_FOLDERS_RESPONSE';

/* fetching notes actions */
export const GET_NOTES_REQUEST = 'GET_NOTES_REQUEST';
export const GET_NOTES_RESPONSE = 'GET_NOTES_RESPONSE';

export const CREATE_NOTES_REQUEST = 'CREATE_NOTES_REQUEST';
export const CREATE_NOTES_RESPONSE = 'CREATE_NOTES_RESPONSE';

export const UPDATE_NOTES_REQUEST = 'UPDATE_NOTES_REQUEST';
export const UPDATE_NOTES_RESPONSE = 'UPDATE_NOTES_RESPONSE';

export const UPDATE_SINGLENOTE_RESPONSE = 'UPDATE_SINGLENOTE_RESPONSE';

export const DELETE_NOTES_REQUEST = 'DELETE_NOTES_REQUEST';
export const DELETE_NOTES_RESPONSE = 'DELETE_NOTES_RESPONSE';


/* start folder's title editing */
export function set_folder_edit_mode(activeFolderId) {
    return { type: SET_FOLDER_EDIT_MODE, activeFolderId: activeFolderId}
}

/* finish folder's title editing */
export function reset_folder_edit_mode() {
    return { type: RESET_FOLDER_EDIT_MODE}
}

/* mark folder as active in menu and show it's notes */
export function set_folder_active(id) {
    return { type: SET_FOLDER_ACTIVE, activeFolderId : id}
}

/* handler for editing folder title */
export function editing_folder(value, editFolderId) {
    return { type: EDITING_FOLDER, value : value, editFolderId: editFolderId}
}

/* start note's editing on note page */
export function set_note_edit_mode(activeNoteId) {
    return { type: SET_NOTE_EDIT_MODE, activeNoteId: activeNoteId}
}

/* finish note's editing on note page */
export function reset_note_edit_mode() {
    return { type: RESET_NOTE_EDIT_MODE}
}

/* mark note as active for displaying on note page */
export function set_note_active(id) {
    return { type: SET_NOTE_ACTIVE, activeNoteId : id}
}

/* handler for editing note's title */
export function editing_note_title(value, editNoteId) {
    return { type: EDITING_NOTE_TITLE, value : value, editNoteId: editNoteId}
}

/* handler for editing note's content */
export function editing_note_content(value, editNoteId) {
    return { type: EDITING_NOTE_CONTENT, value : value, editNoteId: editNoteId}
}

/* handler for delete note's tag */
export function delete_tag(tagIndex, editFolderId) {
    return { type: DELETE_TAG, tagIndex : tagIndex, editFolderId: editFolderId}
}

/* handler for add note's tag */
export function add_tag(tagName,editFolderId) {
    return { type: ADD_TAG, tagName:tagName,editFolderId: editFolderId}
}

/* set flag for showing confirm modal, which we use for confirmation of removing smth  */
export function show_confirm_modal() {
    return { type: SHOW_CONFIRM_MODAL}
}
/* reset flag for showing confirm modal */
export function hide_confirm_modal() {
    return { type: HIDE_CONFIRM_MODAL}
}

/* set flag for showing add modal, which we use when add folder or note  */
export function show_add_modal() {
    return { type: SHOW_ADD_MODAL}
}
/* reset flag for showing add modal */
export function hide_add_modal() {
    return { type: HIDE_ADD_MODAL}
}

/* update note position immidiately */
export function update_note_position(index,atIndex,note) {
    return { type: UPDATE_NOTE_POSITION, index: index,atIndex:atIndex,note:note}
}

/* get folders from the server begin  */
export function get_folders_request() {
    return { type: GET_FOLDERS_REQUEST}
}
/* get folders from the server end  */
export function get_folders_response(data) {
    return { type: GET_FOLDERS_RESPONSE, data: data, receivedAt: Date.now()}
}
/* create folder (POST request to the server) begin  */
export function create_folders_request() {
    return { type: CREATE_FOLDERS_REQUEST}
}
/* create folder (POST request to the server) end  */
export function create_folders_response(data) {
    return { type: CREATE_FOLDERS_RESPONSE, data: data, receivedAt: Date.now()}
}
/* update folder (PUT request to the server) begin  */
export function update_folders_request() {
    return { type: UPDATE_FOLDERS_REQUEST}
}
/* update folder (PUT request to the server) end  */
export function update_folders_response(data) {
    return { type: UPDATE_FOLDERS_RESPONSE, data: data, receivedAt: Date.now()}
}
/* delete folder (DELETE request to the server) begin  */
export function delete_folders_request() {
    return { type: DELETE_FOLDERS_REQUEST}
}
/* delete folder (DELETE request to the server) end  */
export function delete_folders_response(data) {
    return { type: DELETE_FOLDERS_RESPONSE, data: data, receivedAt: Date.now()}
}

/* get notes from the server begin  */
export function get_notes_request() {
    return { type: GET_NOTES_REQUEST}
}
/* get notes from the server end  */
export function get_notes_response(data) {
    return { type: GET_NOTES_RESPONSE, data: data, receivedAt: Date.now()}
}
/* create note (POST request to the server) begin  */
export function create_notes_request() {
    return { type: CREATE_NOTES_REQUEST}
}
/* create note (POST request to the server) end  */
export function create_notes_response(data) {
    return { type: CREATE_NOTES_RESPONSE, data: data, receivedAt: Date.now()}
}
/* update note (PUT request to the server) begin  */
export function update_notes_request() {
    return { type: UPDATE_NOTES_REQUEST}
}
/* update note (PUT request to the server) end. Case when we edit note's title or drag and drop notes.  */
export function update_notes_response(data) {
    return { type: UPDATE_NOTES_RESPONSE, data: data, receivedAt: Date.now()}
}
/* update note (PUT request to the server) end. Case when we edit note on note page.  */
export function update_singlenote_response(data) {
    return { type: UPDATE_SINGLENOTE_RESPONSE, data: data, receivedAt: Date.now()}
}
/* delete note (DELETE request to the server) begin  */
export function delete_notes_request() {
    return { type: DELETE_NOTES_REQUEST}
}
/* delete note (DELETE request to the server) end  */
export function delete_notes_response(data) {
    return { type: DELETE_NOTES_RESPONSE, data: data, receivedAt: Date.now()}
}

