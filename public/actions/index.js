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


export function set_folder_edit_mode(activeFolderId) {
    return { type: SET_FOLDER_EDIT_MODE, activeFolderId: activeFolderId}
}

export function reset_folder_edit_mode() {
    return { type: RESET_FOLDER_EDIT_MODE}
}

export function set_folder_active(id) {
    return { type: SET_FOLDER_ACTIVE, activeFolderId : id}
}

export function editing_folder(value, editFolderId) {
    return { type: EDITING_FOLDER, value : value, editFolderId: editFolderId}
}


export function set_note_edit_mode(activeNoteId) {
    return { type: SET_NOTE_EDIT_MODE, activeNoteId: activeNoteId}
}

export function reset_note_edit_mode() {
    return { type: RESET_NOTE_EDIT_MODE}
}

export function set_note_active(id) {
    return { type: SET_NOTE_ACTIVE, activeNoteId : id}
}

export function editing_note_title(value, editNoteId) {
    return { type: EDITING_NOTE_TITLE, value : value, editNoteId: editNoteId}
}
export function editing_note_content(value, editNoteId) {
    return { type: EDITING_NOTE_CONTENT, value : value, editNoteId: editNoteId}
}
export function delete_tag(tagIndex, editFolderId) {
    return { type: DELETE_TAG, tagIndex : tagIndex, editFolderId: editFolderId}
}
export function add_tag(tagName,editFolderId) {
    return { type: ADD_TAG, tagName:tagName,editFolderId: editFolderId}
}

export function show_confirm_modal() {
    return { type: SHOW_CONFIRM_MODAL}
}
export function hide_confirm_modal() {
    return { type: HIDE_CONFIRM_MODAL}
}
export function show_add_modal() {
    return { type: SHOW_ADD_MODAL}
}
export function hide_add_modal() {
    return { type: HIDE_ADD_MODAL}
}

export function get_folders_request() {
    return { type: GET_FOLDERS_REQUEST}
}
export function get_folders_response(data) {
    return { type: GET_FOLDERS_RESPONSE, data: data, receivedAt: Date.now()}
}
export function create_folders_request() {
    return { type: CREATE_FOLDERS_REQUEST}
}
export function create_folders_response(data) {
    return { type: CREATE_FOLDERS_RESPONSE, data: data, receivedAt: Date.now()}
}
export function update_folders_request() {
    return { type: UPDATE_FOLDERS_REQUEST}
}
export function update_folders_response(data) {
    return { type: UPDATE_FOLDERS_RESPONSE, data: data, receivedAt: Date.now()}
}
export function delete_folders_request() {
    return { type: DELETE_FOLDERS_REQUEST}
}
export function delete_folders_response(data) {
    return { type: DELETE_FOLDERS_RESPONSE, data: data, receivedAt: Date.now()}
}


export function get_notes_request() {
    return { type: GET_NOTES_REQUEST}
}
export function get_notes_response(data) {
    return { type: GET_NOTES_RESPONSE, data: data, receivedAt: Date.now()}
}
export function create_notes_request() {
    return { type: CREATE_NOTES_REQUEST}
}
export function create_notes_response(data) {
    return { type: CREATE_NOTES_RESPONSE, data: data, receivedAt: Date.now()}
}
export function update_notes_request() {
    return { type: UPDATE_NOTES_REQUEST}
}
export function update_notes_response(data) {
    return { type: UPDATE_NOTES_RESPONSE, data: data, receivedAt: Date.now()}
}
export function update_singlenote_response(data) {
    return { type: UPDATE_SINGLENOTE_RESPONSE, data: data, receivedAt: Date.now()}
}
export function delete_notes_request() {
    return { type: DELETE_NOTES_REQUEST}
}
export function delete_notes_response(data) {
    return { type: DELETE_NOTES_RESPONSE, data: data, receivedAt: Date.now()}
}

