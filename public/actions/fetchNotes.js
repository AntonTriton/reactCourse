
/*import {get_notes_request, create_notes_request, update_notes_request, delete_notes_request,
    get_notes_response, create_notes_response, update_notes_response, update_singlenote_response, delete_notes_response } from './index.js';*/

import * as actions from './index.js';

import fetch from 'isomorphic-fetch'

import assign from 'lodash/object/assign.js';

export function fetchNotes(method, noteData) {

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function(dispatch){

        // First dispatch: the app state is updated to inform
        // that the API call is starting.//

        var note = [],
            request_options = {method: method},
            params="";

        if(noteData) note = JSON.stringify(noteData);

        switch (method){

            case 'GET' :

                dispatch(actions.get_notes_request());

                break;

            case 'POST' :

                request_options = assign(request_options, {
                    body: note,
                    headers: {
                        'Accept': 'application/json',
                        "Content-type": "application/json"
                    }
                });

                dispatch(actions.create_notes_request());

                break;

            case 'PUT' :

                if(Array.isArray(noteData)) {
                    params = "/all";

                    request_options = assign(request_options, {
                        body: note,
                        headers: {
                            'Accept': 'application/json',
                            "Content-type": "application/json"
                        }
                    });

                    dispatch(actions.update_notes_request());

                }else{
                    params = "/"+noteData.id;

                    request_options = assign(request_options, {
                        body: note,
                        headers: {
                            'Accept': 'application/json',
                            "Content-type": "application/json"
                        }
                    });

                    dispatch(actions.update_notes_request());

                }
                break;
            case 'DELETE' :

                params = "/"+noteData.id;

                dispatch(actions.delete_notes_request());

                break;
        }

        return fetch('/notices'+params,request_options)
            .then(function(response){

                return response.json()

            })
            .then(function(data) {

                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.

                switch (method){

                    case 'GET' :

                        dispatch(actions.get_notes_response(data));

                        break;

                    case 'POST' :

                        dispatch(actions.create_notes_response(data));

                        break;

                    case 'PUT' :

                        if(params == '/all') {
                            dispatch(actions.update_notes_response(data));
                        }else{
                            dispatch(actions.update_singlenote_response(data));
                        }

                        break;

                    case 'DELETE' :

                        dispatch(actions.delete_notes_response(data));

                        break;
                }
            }
        )

    }
}
