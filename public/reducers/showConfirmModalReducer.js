
import { SHOW_CONFIRM_MODAL,HIDE_CONFIRM_MODAL } from '../actions/actions.js'

function showConfirmModalReducer(state = false, action) {

    console.log(action.type, action);

    switch (action.type) {

        case SHOW_CONFIRM_MODAL:

            return true;

        case HIDE_CONFIRM_MODAL:

            return false;

        default:
            return state
    }

}

export default showConfirmModalReducer
