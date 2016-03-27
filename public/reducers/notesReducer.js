
import map from 'lodash/collection/map.js';
import filter from 'lodash/collection/filter.js';
import forEach from 'lodash/collection/forEach.js';
import max from 'lodash/math/max.js';

/*import {EDITING_NOTE_TITLE, EDITING_NOTE_CONTENT,
    GET_NOTES_REQUEST, GET_NOTES_RESPONSE, CREATE_NOTES_REQUEST, CREATE_NOTES_RESPONSE,
    UPDATE_NOTES_REQUEST, UPDATE_NOTES_RESPONSE, DELETE_NOTES_REQUEST, DELETE_NOTES_RESPONSE,
    UPDATE_SINGLENOTE_RESPONSE, DELETE_TAG, ADD_TAG} from '../actions/index.js'*/

import * as actions from '../actions/index.js';

function notesReducer(state = {}, action) {

    console.log(action.type, action);

    switch (action.type) {

        case actions.UPDATE_NOTE_POSITION:

            //action.index

//            this.setState(update(this.state, {
//                notes: {
//                    $splice: [
//                        [index, 1],
//                        [atIndex, 0, note]
//                    ]
//                }
//            }));

            state.items.splice(action.index,1);
            state.items.splice(action.atIndex,0,action.note);

            /*var newNotesData = map(state.items, function (item) {
                if (item.id == action.editNoteId) {
                    item.title = action.value;
                }
                return item;
            });*/



            return Object.assign({}, state, {

                items: state.items

            });

        case actions.EDITING_NOTE_TITLE:

            var newNotesData = map(state.items, function (item) {
                if (item.id == action.editNoteId) {
                    item.title = action.value;
                }
                return item;
            });

            return Object.assign({}, state, {

                items: newNotesData

            });

        case actions.EDITING_NOTE_CONTENT:

            newNotesData = map(state.items, function (item) {
                if (item.id == action.editNoteId) {
                    item.description = action.value;
                }
                return item;
            });

            return Object.assign({}, state, {

                items: newNotesData

            });

        case actions.GET_NOTES_REQUEST:

            return Object.assign({}, state, {
                isFetching: true,
                items: state.items
            });

        case actions.GET_NOTES_RESPONSE:

            return Object.assign({}, state, {

                isFetching: false,
                items: action.data

            });

        case actions.CREATE_NOTES_REQUEST:

            return Object.assign({}, state, {
                isFetching: true,
                items: state.items
            });

        case actions.CREATE_NOTES_RESPONSE:

            var items = state.items;

            items.push({
                key: 1 + max(items, function (item) {
                    return item.key
                }).key,
                id: 1 + max(items, function (item) {
                    return item.id
                }).id,
                title: action.data.title,
                description: action.data.description,
                directoryId: action.data.directoryId,
                tags: [],
                tagsIDs: []
            });

            return Object.assign({}, state, {

                isFetching: false,
                items: items

            });

        case actions.UPDATE_NOTES_REQUEST:

            return Object.assign({}, state, {
                    isFetching: true
            });

        case actions.UPDATE_NOTES_RESPONSE:

            return Object.assign({}, state, {

                isFetching: false,
                items: action.data

            });

        case actions.UPDATE_SINGLENOTE_RESPONSE:

            items = state.items;

            forEach(items, function (item) {
                if (item.id == action.data.id) {
                    item = action.data;
                }
            });

            return Object.assign({}, state, {

                isFetching: false,
                items: items

            });

        case actions.DELETE_NOTES_REQUEST:

            return Object.assign({}, state, {
                isFetching: true
            });


        case actions.DELETE_NOTES_RESPONSE:

            console.log('===',action.data,filter(state.items, function (item) {

                return item.id != action.data.id;
            }));

            return Object.assign({}, state, {

                isFetching: false,
                items: filter(state.items, function (item) {

                    return item.id != action.data.id;
                })

            });

        case actions.DELETE_TAG:

            forEach(state.items, function (item) {

                if(item.id != action.activeNoteId){
                    item.tags.splice(action.tagIndex-1,1);
                }

            });

            return Object.assign({}, state, {

                isFetching: false,
                items: state.items

            });

        case actions.ADD_TAG:

            forEach(state.items, function (item) {

                if(item.id != action.activeNoteId){

                    if(!item.tags) item.tags = [];
                    item.tags.push(action.tagName);
                }

            });

            return Object.assign({}, state, {

                isFetching: false,
                items: state.items

            });

        default:
            return state
    }
}

export default notesReducer