
import {SET_NOTE_EDIT_MODE, RESET_NOTE_EDIT_MODE} from '../actions/actions.js'

function editNoteIdReducer(state = null, action) {

    console.log(action.type, action);

    switch (action.type) {

        case SET_NOTE_EDIT_MODE:

            return action.activeNoteId;

        case RESET_NOTE_EDIT_MODE:

            return null;

        default:
            return state
    }
}

export default editNoteIdReducer
