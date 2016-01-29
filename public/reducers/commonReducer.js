
import { SET_FOLDER_ACTIVE, SET_NOTE_ACTIVE, SET_FOLDER_EDIT_MODE, RESET_FOLDER_EDIT_MODE,
    SET_NOTE_EDIT_MODE, RESET_NOTE_EDIT_MODE, SHOW_CONFIRM_MODAL, HIDE_CONFIRM_MODAL,
    SHOW_ADD_MODAL, HIDE_ADD_MODAL} from '../actions/index.js'


function activeFolderId(state = 0, action) {

    console.log(action.type, action);

    switch (action.type) {

        case SET_FOLDER_ACTIVE:

            return action.activeFolderId;

        default:
            return state
    }

}

function activeNoteId(state = 0, action) {

    console.log(action.type, action);

    switch (action.type) {

        case SET_NOTE_ACTIVE:

            return action.activeNoteId;

        default:
            return state
    }

}

function editFolderId(state = null, action) {

    console.log(action.type, action);

    switch (action.type) {

        case SET_FOLDER_EDIT_MODE:

            return parseInt(action.activeFolderId);

        case RESET_FOLDER_EDIT_MODE:

            return null;

        default:
            return state
    }

}

function editNoteId(state = null, action) {

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

function showConfirmModal(state = false, action) {

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

function showAddModal(state = false, action) {

    console.log(action.type, action);

    switch (action.type) {

        case SHOW_ADD_MODAL:

            return true;

        case HIDE_ADD_MODAL:

            return false;

        default:
            return state
    }

}

export {editFolderId, activeFolderId, editNoteId, activeNoteId, showConfirmModal, showAddModal}

