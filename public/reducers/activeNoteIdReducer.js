
import { SET_NOTE_ACTIVE } from '../actions/actions.js'

function activeNoteIdReducer(state = 0, action) {

    console.log(action.type, action);

    switch (action.type) {

        case SET_NOTE_ACTIVE:

            return Object.assign({}, state, {
                activeNoteId: action.activeNoteId
            });

        default:
            return state
    }

}

export default activeNoteIdReducer
