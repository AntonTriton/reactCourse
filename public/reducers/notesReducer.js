
import map from 'lodash/collection/map.js';
import filter from 'lodash/collection/filter.js';
import forEach from 'lodash/collection/forEach.js';
import max from 'lodash/math/max.js';

import {EDITING_NOTE_TITLE, EDITING_NOTE_CONTENT,
    GET_NOTES_REQUEST, GET_NOTES_RESPONSE, CREATE_NOTES_REQUEST, CREATE_NOTES_RESPONSE,
    UPDATE_NOTES_REQUEST, UPDATE_NOTES_RESPONSE, DELETE_NOTES_REQUEST, DELETE_NOTES_RESPONSE,
    UPDATE_SINGLENOTE_RESPONSE} from '../actions/actions.js'

function notesReducer(state = {}, action) {

    console.log(action.type, action);

    switch (action.type) {

        case EDITING_NOTE_TITLE:

            var newNotesData = map(state.items, function (item) {
                if (item.id == state.editNoteId) {
                    item.title = action.value;
                }
                return item;
            });

            return Object.assign({}, state, {

                /*notes: {
                    isFetching: false,
                    didInvalidate: false,*/
                    items: newNotesData
                //}

            });

        case EDITING_NOTE_CONTENT:

            var newNotesData = map(state.items, function (item) {
                if (item.id == state.editNoteId) {
                    item.description = action.value;
                }
                return item;
            });

            return Object.assign({}, state, {

                /*notes: {
                    isFetching: false,
                    didInvalidate: false,*/
                    items: newNotesData
                //}

            });

        case GET_NOTES_REQUEST:

            console.log('state',state);

            return Object.assign({}, state, {
                //notes: {
                    isFetching: true,
                    //didInvalidate: false,
                    items: state.items
                //}
            });

        case GET_NOTES_RESPONSE:

            return Object.assign({}, state, {

                //notes: {
                    isFetching: false,
                    //didInvalidate: false,
                    items: action.data
                //}

            });

        case CREATE_NOTES_REQUEST:

            return Object.assign({}, state, {
                //notes: {
                    isFetching: true,
                    //didInvalidate: false,
                    items: state.items
                //}
            });

        case CREATE_NOTES_RESPONSE:

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
                tagsIDs: action.data.tags
            });

            return Object.assign({}, state, {

                //notes: {
                    isFetching: true,
                    //didInvalidate: false,
                    items: items
                //}

            });

        case UPDATE_NOTES_REQUEST:

            return Object.assign({}, state, {
                //notes: {
                    isFetching: true/*,
                    didInvalidate: false,
                    items: state.items
                }*/
            });

        case UPDATE_NOTES_RESPONSE:

            return Object.assign({}, state, {

                //notes: {
                    isFetching: false,
                    //didInvalidate: false,
                    items: action.data
                //}

            });

        case UPDATE_SINGLENOTE_RESPONSE:

            items = state.items;

            forEach(items, function (item) {
                if (item.id == action.data.id) {
                    item = action.data;
                }
            });

            return Object.assign({}, state, {

                //notes: {
                    isFetching: false,
                  //  didInvalidate: false,
                    items: items
                //}

            });

        case DELETE_NOTES_REQUEST:

            return Object.assign({}, state, {
                //notes: {
                    isFetching: true/*,
                    didInvalidate: false
                }*/
            });


        case DELETE_NOTES_RESPONSE:

            return Object.assign({}, state, {

                //notes: {
                    isFetching: false,
                    //didInvalidate: false,
                    items: filter(state.items, function (item) {

                        return item.id != state.activeNoteId;
                    })
                //}

            });

        default:
            return state
    }
}

export default notesReducer