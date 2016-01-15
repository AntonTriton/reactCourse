import { combineReducers } from 'redux'
import map from 'lodash/collection/map.js';

import filter from 'lodash/collection/filter.js';
import max from 'lodash/math/max.js';

import { SET_FOLDER_EDIT_MODE, RESET_FOLDER_EDIT_MODE, SET_FOLDER_ACTIVE, EDITING_FOLDER,
    REMOVE_FOLDER, ADD_FOLDER } from './actions'

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

        case REMOVE_FOLDER:
            console.log(action.type,state,action);

            return Object.assign({}, state, {
                foldersData: filter(state.foldersData, function(item) {

                    return item.id != state.activeFolderId;
                })
            });

        case ADD_FOLDER:
            console.log("!!!!!",action.type,state,action);

            // activeFolderId

            return Object.assign({}, state, {
                //foldersData: state.foldersData.concat({
                foldersData: state.foldersData.splice(action.index,0,{
                    key: 1 + max(state.foldersData, function(item){
                        return item.key
                    }),
                    id: 1 + max(state.foldersData, function(item){
                        return item.id
                    }),
                    title : action.title,
                    status: 'closed',
                    isActive: false,
                    level: action.level
                })
            });

        default:
            return state
    }
}

export default reducer