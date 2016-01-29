
export const modalStyle = {
    position: 'fixed',
    zIndex: 1040,
    top: 0, bottom: 0, left: 0, right: 0
};

export const backdropStyle = {
    ...modalStyle,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.5
};

export const dialogStyle = function() {

    return {
        position: 'absolute',
        width: 400,
        top: '100px',
        left: '50%',
        marginLeft: '-200px',
        border: '1px solid #e5e5e5',
        backgroundColor: 'white',
        boxShadow: '0 5px 15px rgba(0,0,0,.5)',
        padding: 20
    };
};

export const menuData = [
    {
        key: 0,
        title : "Add",
        action: "add",
        page: ["main"],
        tooltips: ["Add folder or note"],
        class: 'fa fa-plus'
    },
    {
        key: 1,
        title : "Edit",
        action: "edit",
        page: ["main","note"],
        tooltips: ["Edit folder", "Edit note"],
        class: 'fa fa-pencil'
    },
    {
        key: 2,
        title : "Remove",
        action: "remove",
        page: ["main","note"],
        tooltips: ["Remove folder", "Remove note"],
        class: 'fa fa-remove'
    },
    {
        key: 3,
        title : "Back",
        action: "back",
        page: ["note"],
        tooltips: ["Go back"],
        class: 'fa fa-arrow-left'
    }
];