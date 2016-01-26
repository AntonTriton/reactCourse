import { combineReducers } from 'redux'

import folders from "./foldersReducer"
import notes from "./notesReducer"
import editFolderId from "./editFolderIdReducer"
import activeFolderId from "./activeFolderIdReducer"
import editNoteId from "./editNoteIdReducer"
import activeNoteId from "./activeNoteIdReducer"

/*const reducer = combineReducers({
    foldersReducer,
    notesReducer
});*/

const reducer = combineReducers({
    editFolderId,
    activeFolderId,
    editNoteId,
    activeNoteId,
    folders,
    notes
});

export default reducer
