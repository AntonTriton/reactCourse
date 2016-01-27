'use strict';

export const menuData = [
    {
        key: 0,
        title : "Add",
        action: "add",
        page: ["main"],
        class: 'fa fa-plus'
    },
    {
        key: 1,
        title : "Edit",
        action: "edit",
        page: ["main","note"],
        class: 'fa fa-pencil'
    },
    {
        key: 2,
        title : "Remove",
        action: "remove",
        page: ["main","note"],
        class: 'fa fa-remove'
    },
    {
        key: 3,
        title : "Back",
        action: "back",
        page: ["note"],
        class: 'fa fa-arrow-left'
    }
];



