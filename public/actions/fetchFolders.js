
import * as actions from './index.js';

import fetch from 'isomorphic-fetch'

import assign from 'lodash/object/assign.js';


export function fetchFolders(method, folderData) {

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function(dispatch){

        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        var folder = [],
            params="",
            request_options = {method: method};

        if(folderData) folder = JSON.stringify(folderData);

        switch (method){

            case 'GET' :

                dispatch(actions.get_folders_request());

                break;

            case 'POST' :

                request_options = assign(request_options, {
                    body: folder,
                    headers: {
                        'Accept': 'application/json',
                        "Content-type": "application/json"
                    }
                });

                dispatch(actions.create_folders_request());

                break;

            case 'PUT' :

                params = "/"+folderData.id;

                request_options = assign(request_options, {
                    body: folder,
                    headers: {
                        'Accept': 'application/json',
                        "Content-type": "application/json"
                    }
                });

                dispatch(actions.update_folders_request());

                break;

            case 'DELETE' :

                params = "/"+folderData.id;

                dispatch(actions.delete_folders_request());

                break;
        }

        return fetch('/directories'+params, request_options)

            .then(function(response){

                return response.json()
            })
            .then(function(data) {

                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.

                switch (method){

                    case 'GET' :

                        dispatch(actions.get_folders_response(data));

                        break;

                    case 'POST' :

                        dispatch(actions.create_folders_response(data));

                        break;

                    case 'PUT' :

                        dispatch(actions.update_folders_response(data));

                        break;

                    case 'DELETE' :

                        dispatch(actions.delete_folders_response(data));

                        break;
                }
            }
        )

    }
}
