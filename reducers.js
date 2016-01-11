import { combineReducers } from 'redux'
import map from 'lodash/collection/map.js';

import { SET_FOLDER_EDIT_MODE, RESET_FOLDER_EDIT_MODE, SET_FOLDER_ACTIVE, EDITING_FOLDER } from './actions'

import { notesData,foldersData,menuData } from './components/data.js'

const initialState = {
    activeFolderId: 0,
    editFolderId: null,
    notesData: notesData,
    foldersData: foldersData,
    menuData: menuData
};

function reducer(state = initialState, action) {

    switch (action.type) {

        case SET_FOLDER_EDIT_MODE:
            console.log(action.type,state.activeFolderId);

            return Object.assign({}, state, {
                editFolderId: parseInt(state.activeFolderId)
            });

        case RESET_FOLDER_EDIT_MODE:
            console.log(action.type);

            return Object.assign({}, state, {
                editFolderId: null
            });

        case EDITING_FOLDER:

            let newFoldersData = map(state.foldersData,function(item){
                if(item.id == state.editFolderId){
                    item.title = action.value;
                }

                return item;
            });

            console.log(action.type,action.value,state.foldersData,newFoldersData);

            return Object.assign({}, state, {
                foldersData: newFoldersData
            });

        case SET_FOLDER_ACTIVE:
            console.log(action.type,action.activeFolderId,state);

            return Object.assign({}, state, {
                activeFolderId: action.activeFolderId
            });

        default:
            return state
    }
}

export default reducer