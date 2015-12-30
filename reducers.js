import { combineReducers } from 'redux'
import { SET_FOLDER_EDIT_MODE, SET_FOLDER_TEXT_MODE } from './actions'
//const { SHOW_ALL } = VisibilityFilters;

/*function visibilityFilter(state, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state
    }
}*/

function reducer(state, action) {
    switch (action.type) {
        case SET_FOLDER_EDIT_MODE:
            return {
                id: action.folderId,
                editFolderClass : "visible",
                textFolderClass : "hidden"
            };
        default:
            return state
    }
}

/*function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                todo(undefined, action)
            ];
        case COMPLETE_TODO:
            return state.map(t =>
                    todo(t, action)
            );
        default:
            return state
    }
}*/

/*const todoApp = combineReducers({
    visibilityFilter,
    todos
});*/

export default reducer