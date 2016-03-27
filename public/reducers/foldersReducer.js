
import map from 'lodash/collection/map.js';
import filter from 'lodash/collection/filter.js';
import forEach from 'lodash/collection/forEach.js';
import max from 'lodash/math/max.js';

/*import { EDITING_FOLDER, GET_FOLDERS_REQUEST, GET_FOLDERS_RESPONSE, CREATE_FOLDERS_REQUEST, CREATE_FOLDERS_RESPONSE,
    UPDATE_FOLDERS_REQUEST, UPDATE_FOLDERS_RESPONSE, DELETE_FOLDERS_REQUEST, DELETE_FOLDERS_RESPONSE } from '../actions/index.js'*/

import * as actions from '../actions/index.js';

function foldersReducer(state = {}, action) {

    console.log(action.type, action);

    switch (action.type) {

        case actions.EDITING_FOLDER:

            let newFoldersData = map(state.items,function(item){
                if(item.id == action.editFolderId){
                    item.name = action.value;
                }
                return item;
            });

            return Object.assign({}, state, {

                items: newFoldersData

            });

        case actions.GET_FOLDERS_REQUEST:

            return Object.assign({}, state, {
                isFetching: true
            });

        case actions.GET_FOLDERS_RESPONSE:

            return Object.assign({}, state, {

                isFetching: false,
                items: action.data

            });

        case actions.CREATE_FOLDERS_REQUEST:

            return Object.assign({}, state, {
                isFetching: true
            });

        case actions.CREATE_FOLDERS_RESPONSE:

            state.items.splice(action.data.index+1,0,action.data);

            return Object.assign({}, state, {

                isFetching: false,
                items: state.items

            });

        case actions.DELETE_FOLDERS_REQUEST:

            return Object.assign({}, state, {
                isFetching: true
            });

        case actions.DELETE_FOLDERS_RESPONSE:

            return Object.assign({}, state, {

                isFetching: false,
                items: action.data

            });

        default:
            return state
    }

}

export default foldersReducer