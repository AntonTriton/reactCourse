
import map from 'lodash/collection/map.js';
import filter from 'lodash/collection/filter.js';
import forEach from 'lodash/collection/forEach.js';
import max from 'lodash/math/max.js';

import { EDITING_FOLDER, GET_FOLDERS_REQUEST, GET_FOLDERS_RESPONSE, CREATE_FOLDERS_REQUEST, CREATE_FOLDERS_RESPONSE,
    UPDATE_FOLDERS_REQUEST, UPDATE_FOLDERS_RESPONSE, DELETE_FOLDERS_REQUEST, DELETE_FOLDERS_RESPONSE } from '../actions/actions.js'

function foldersReducer(state = {}, action) {

    console.log(action.type, action);

    switch (action.type) {

        case EDITING_FOLDER:

            let newFoldersData = map(state.items,function(item){
                if(item.id == state.editFolderId){
                    item.name = action.value;
                }
                return item;
            });

            return Object.assign({}, state, {

                /*folders: {
                    isFetching: false,
                    didInvalidate: false,*/
                    items: newFoldersData
                //}

            });


        case GET_FOLDERS_REQUEST:

            return Object.assign({}, state, {
                //folders: {
                    isFetching: true//,
                    //didInvalidate: false
                // }
            });

        case GET_FOLDERS_RESPONSE:

            return Object.assign({}, state, {

                //folders: {
                    isFetching: false,
                //  didInvalidate: false,
                    items: action.data
                //}

            });

        case CREATE_FOLDERS_REQUEST:

            return Object.assign({}, state, {
                //folders: {
                    isFetching: true//,
                //  didInvalidate: false,
                //items: state.items
                //}
            });

        case CREATE_FOLDERS_RESPONSE:

            state.items.splice(action.data.index+1,0,action.data);

            return Object.assign({}, state, {

                //folders: {
                    isFetching: false,
                //  didInvalidate: false,
                    items: state.items
                //}

            });

        case DELETE_FOLDERS_REQUEST:

            return Object.assign({}, state, {
                //folders: {
                    isFetching: true//,
                //  didInvalidate: false
                //}
            });

        case DELETE_FOLDERS_RESPONSE:

            return Object.assign({}, state, {

                //folders: {
                    isFetching: false,
                //  didInvalidate: false,
                    items: action.data
                //}

            });

        default:
            return state
    }

}

export default foldersReducer