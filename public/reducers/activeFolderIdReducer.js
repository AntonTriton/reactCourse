
import { SET_FOLDER_ACTIVE } from '../actions/actions.js'

function activeFolderIdReducer(state = 0, action) {

    console.log(action.type, action);

    switch (action.type) {

        case SET_FOLDER_ACTIVE:

            return action.activeFolderId;

        default:
            return state
    }

}

export default activeFolderIdReducer
