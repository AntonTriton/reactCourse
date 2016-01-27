import { combineReducers } from 'redux'

import folders from "./foldersReducer"
import notes from "./notesReducer"
import editFolderId from "./editFolderIdReducer"
import activeFolderId from "./activeFolderIdReducer"
import editNoteId from "./editNoteIdReducer"
import activeNoteId from "./activeNoteIdReducer"
import showConfirmModal from "./showConfirmModalReducer.js"

/*const reducer = combineReducers({
    foldersReducer,
    notesReducer
});*/

const reducer = combineReducers({
    editFolderId,
    activeFolderId,
    editNoteId,
    activeNoteId,
    showConfirmModal,
    folders,
    notes
});

export default reducer
