import { combineReducers } from 'redux'

import folders from "./foldersReducer"
import notes from "./notesReducer"

import {editFolderId, activeFolderId, editNoteId, activeNoteId, showConfirmModal, showAddModal} from "./commonReducer.js"

const reducer = combineReducers({
    editFolderId,
    activeFolderId,
    editNoteId,
    activeNoteId,
    showConfirmModal,
    showAddModal,
    folders,
    notes
});

export default reducer
