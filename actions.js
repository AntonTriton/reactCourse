/*
 * action types
 */

/*export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';*/

export const SET_FOLDER_EDIT_MODE = 'SET_FOLDER_EDIT_MODE';

/*
 * other constants
 */

/*export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};*/

/*
 * action creators
 */

/*let nextTodoId = 0;

export function addTodo(text) {
    return {
        type: ADD_TODO,
        id: nextTodoId++,
        text
    };
}

export function completeTodo(id) {
    return { type: COMPLETE_TODO, id }
}

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
}*/

export function set_folder_edit_mode(id) {
    return { type: SET_FOLDER_EDIT_MODE, folderId : id }
}