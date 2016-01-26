
import { SET_FOLDER_EDIT_MODE, RESET_FOLDER_EDIT_MODE } from '../actions/actions.js'

function editFolderIdReducer(state = null, action) {

    console.log(action.type, action);

    switch (action.type) {

        case SET_FOLDER_EDIT_MODE:

            return Object.assign({}, state, {
                editFolderId: parseInt(state.activeFolderId)
            });

        case RESET_FOLDER_EDIT_MODE:

            return Object.assign({}, state, {
                editFolderId: null
            });

        default:
            return state
    }

}

export default editFolderIdReducer
