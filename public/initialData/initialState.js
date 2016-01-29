
const initialState = {
    activeFolderId: 0,
    editFolderId: null,
    activeNoteId: 0,
    editNoteId: null,
    showConfirmModal: false,
    showAddModal: false,
    notes: {
        isFetching: false,
        didInvalidate: false,
        items:[]
    },
    folders: {
        isFetching: false,
        didInvalidate: false,
        items:[]
    }
};

export default initialState;
