/*
 * action types
 */
import fetch from 'isomorphic-fetch'

import assign from 'lodash/object/assign.js';

export const SET_FOLDER_EDIT_MODE = 'SET_FOLDER_EDIT_MODE';
export const RESET_FOLDER_EDIT_MODE = 'RESET_FOLDER_EDIT_MODE';
export const SET_FOLDER_ACTIVE = 'SET_FOLDER_ACTIVE';
export const EDITING_FOLDER = 'EDITING_FOLDER';
export const REMOVE_FOLDER = 'REMOVE_FOLDER';
export const ADD_FOLDER = 'ADD_FOLDER';
export const ADD_NOTE = 'ADD_NOTE';

export const SET_NOTE_EDIT_MODE = 'SET_NOTE_EDIT_MODE';
export const RESET_NOTE_EDIT_MODE = 'RESET_NOTE_EDIT_MODE';
export const SET_NOTE_ACTIVE = 'SET_NOTE_ACTIVE';
export const EDITING_NOTE_TITLE = 'EDITING_NOTE_TITLE';
export const EDITING_NOTE_CONTENT = 'EDITING_NOTE_CONTENT';
export const REMOVE_NOTE = 'REMOVE_NOTE';


export const GET_FOLDERS_REQUEST = 'GET_FOLDERS_REQUEST';
export const GET_FOLDERS_RESPONSE = 'GET_FOLDERS_RESPONSE';
export const GET_FOLDERS_FAILURE = 'GET_FOLDERS_FAILURE';

export const CREATE_FOLDERS_REQUEST = 'CREATE_FOLDERS_REQUEST';
export const CREATE_FOLDERS_RESPONSE = 'CREATE_FOLDERS_RESPONSE';
export const CREATE_FOLDERS_FAILURE = 'CREATE_FOLDERS_FAILURE';

export const UPDATE_FOLDERS_REQUEST = 'UPDATE_FOLDERS_REQUEST';
export const UPDATE_FOLDERS_RESPONSE = 'UPDATE_FOLDERS_RESPONSE';
export const UPDATE_FOLDERS_FAILURE = 'UPDATE_FOLDERS_FAILURE';

export const DELETE_FOLDERS_REQUEST = 'DELETE_FOLDERS_REQUEST';
export const DELETE_FOLDERS_RESPONSE = 'DELETE_FOLDERS_RESPONSE';
export const DELETE_FOLDERS_FAILURE = 'DELETE_FOLDERS_FAILURE';


export const GET_NOTES_REQUEST = 'GET_NOTES_REQUEST';
export const GET_NOTES_RESPONSE = 'GET_NOTES_RESPONSE';
export const GET_NOTES_FAILURE = 'GET_NOTES_FAILURE';

export const CREATE_NOTES_REQUEST = 'CREATE_NOTES_REQUEST';
export const CREATE_NOTES_RESPONSE = 'CREATE_NOTES_RESPONSE';
export const CREATE_NOTES_FAILURE = 'CREATE_NOTES_FAILURE';

export const UPDATE_NOTES_REQUEST = 'UPDATE_NOTES_REQUEST';
export const UPDATE_NOTES_RESPONSE = 'UPDATE_NOTES_RESPONSE';
export const UPDATE_NOTES_FAILURE = 'UPDATE_NOTES_FAILURE';
export const UPDATE_SINGLENOTE_RESPONSE = 'UPDATE_SINGLENOTE_RESPONSE';

export const DELETE_NOTES_REQUEST = 'DELETE_NOTES_REQUEST';
export const DELETE_NOTES_RESPONSE = 'DELETE_NOTES_RESPONSE';
export const DELETE_NOTES_FAILURE = 'DELETE_NOTES_FAILURE';



export function set_folder_edit_mode() {
    return { type: SET_FOLDER_EDIT_MODE}
}

export function reset_folder_edit_mode() {
    return { type: RESET_FOLDER_EDIT_MODE}
}

export function set_folder_active(id) {
    return { type: SET_FOLDER_ACTIVE, activeFolderId : id}
}

export function editing_folder(value) {
    return { type: EDITING_FOLDER, value : value}
}

export function remove_folder(id) {
    return { type: REMOVE_FOLDER}
}

export function add_folder(title, level, index) {
    return { type: ADD_FOLDER, title: title, level: level, index: index}
}

export function add_note(title, content ,tags) {
    return { type: ADD_NOTE, content: content, tags: tags, title: title}
}


export function set_note_edit_mode() {
    return { type: SET_NOTE_EDIT_MODE}
}

export function reset_note_edit_mode() {
    return { type: RESET_NOTE_EDIT_MODE}
}

export function set_note_active(id) {
    return { type: SET_NOTE_ACTIVE, activeNoteId : id}
}

export function editing_note_title(value) {
    return { type: EDITING_NOTE_TITLE, value : value}
}
export function editing_note_content(value) {
    return { type: EDITING_NOTE_CONTENT, value : value}
}

export function remove_note() {
    return { type: REMOVE_NOTE}
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

export function fetchFolders(method, folderData) {

    console.log('actions fetchFolders0');

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function(dispatch){

        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        var folder = [],
            params="",
            request_options = {method: method};
        if(folderData) folder = JSON.stringify(folderData);

        switch (method){
            case 'GET' :
                dispatch(get_folders_request());
                break;
            case 'POST' :
                request_options = assign(request_options, {
                    body: folder,
                    headers: {
                        'Accept': 'application/json',
                        "Content-type": "application/json"
                    }
                });

                dispatch(create_folders_request());
                break;
            case 'PUT' :
                console.log('actions fetchFolders PUT');

                params = "/"+folderData.id;

                request_options = assign(request_options, {
                    body: folder,
                    headers: {
                        'Accept': 'application/json',
                        "Content-type": "application/json"
                    }
                });

                dispatch(update_folders_request());
                break;
            case 'DELETE' :
                params = "/"+folderData.id;

                dispatch(delete_folders_request());
                break;
        }

        console.log('actions fetchFolders1',folder);

        return fetch('/directories'+params, request_options)
            .then(function(response){
                console.log('actions fetchFolders2');
                return response.json()
            })
            .then(function(data) {

                console.log('actions fetchFolders3',data);
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.

                switch (method){
                    case 'GET' :
                        dispatch(get_folders_response(data));
                        break;
                    case 'POST' :
                        dispatch(create_folders_response(data));
                        break;
                    case 'PUT' :
                        dispatch(update_folders_response(data));
                        break;
                    case 'DELETE' :
                        dispatch(delete_folders_response(data));
                        break;
                }
            }
        )

    }
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

export function fetchNotes(method, noteData) {

    console.log('actions fetchNotes 0');

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function(dispatch){

        // First dispatch: the app state is updated to inform
        // that the API call is starting.//

        console.log('actions fetchNotes 111',Array.isArray(noteData));

        var note = [],
            request_options = {method: method},
            params="";
        if(noteData) note = JSON.stringify(noteData);

        switch (method){
            case 'GET' :
                dispatch(get_notes_request());
                break;
            case 'POST' :
                console.log('actions fetchNotes 2',note);

                request_options = assign(request_options, {
                    body: note,
                    headers: {
                        'Accept': 'application/json',
                        "Content-type": "application/json"
                    }
                });
                dispatch(create_notes_request());
                break;
            case 'PUT' :
                console.log('actions fetchNotes PUT11',note,Array.isArray(noteData));

                if(Array.isArray(noteData)) {
                    params = "/all";

                    request_options = assign(request_options, {
                        body: note,
                        headers: {
                            'Accept': 'application/json',
                            "Content-type": "application/json"
                        }
                    });
                    dispatch(update_notes_request());
                }else{

                    params = "/"+noteData.id;

                    request_options = assign(request_options, {
                        body: note,
                        headers: {
                            'Accept': 'application/json',
                            "Content-type": "application/json"
                        }
                    });

                    dispatch(update_notes_request());

                }
                break;
            case 'DELETE' :
                params = "/"+noteData.id;

                dispatch(delete_notes_request());
                break;
        }

        return fetch('/notices'+params,request_options)
            .then(function(response){
                console.log('actions fetchNotes 22',response);
                return response.json()
            })
            .then(function(data) {

                console.log('actions fetchNotes 3',data);
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.

                switch (method){
                    case 'GET' :
                        dispatch(get_notes_response(data));
                        break;
                    case 'POST' :
                        dispatch(create_notes_response(data));
                        break;
                    case 'PUT' :
                        if(params == '/all') {
                            dispatch(update_notes_response(data));
                        }else{
                            dispatch(update_singlenote_response(data));
                        }
                        break;
                    case 'DELETE' :
                        dispatch(delete_notes_response(data));
                        break;
                }
            }
        )

    }
}