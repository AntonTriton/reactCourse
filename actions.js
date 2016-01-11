/*
 * action types
 */

/*export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';*/

export const SET_FOLDER_EDIT_MODE = 'SET_FOLDER_EDIT_MODE';
export const RESET_FOLDER_EDIT_MODE = 'RESET_FOLDER_EDIT_MODE';
export const SET_FOLDER_ACTIVE = 'SET_FOLDER_ACTIVE';
export const EDITING_FOLDER = 'EDITING_FOLDER';

export function set_folder_edit_mode() {
    return { type: SET_FOLDER_EDIT_MODE}
};

export function reset_folder_edit_mode() {
    return { type: RESET_FOLDER_EDIT_MODE}
};

export function set_folder_active(id) {
    return { type: SET_FOLDER_ACTIVE, activeFolderId : id}
}

export function editing_folder(value) {
    return { type: EDITING_FOLDER, value : value}
}