/*
 * action types
 */

export const SET_FOLDER_EDIT_MODE = 'SET_FOLDER_EDIT_MODE';
export const RESET_FOLDER_EDIT_MODE = 'RESET_FOLDER_EDIT_MODE';
export const SET_FOLDER_ACTIVE = 'SET_FOLDER_ACTIVE';
export const EDITING_FOLDER = 'EDITING_FOLDER';
export const REMOVE_FOLDER = 'REMOVE_FOLDER';
export const ADD_FOLDER = 'ADD_FOLDER';

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