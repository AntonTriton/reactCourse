/*
 * action types
 */

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

export function remove_note(id) {
    return { type: REMOVE_NOTE}
}