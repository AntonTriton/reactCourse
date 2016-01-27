
import { menuData } from '../components/data.js'

const initialState = {
    activeFolderId: 0,
    editFolderId: null,
    activeNoteId: 0,
    editNoteId: null,
    showConfirmModal: false,
    notes: {
        isFetching: false,
        didInvalidate: false,
        items:[]
    },
    folders: {
        isFetching: false,
        didInvalidate: false,
        items:[]
    },
    menuData: menuData
};

export default initialState;
