'use strict';

export const notesData = [
    {
        id:0,
        key: 0,
        title : "Future",
        content: "Future is now",
        tags: ["Corporative"]
    },
    {
        id:1,
        key: 1,
        title : "Birthdays",
        content: "Future is now and tomorrow",
        tags: ["Private","Activities"]
    },
    {
        id: 2,
        key: 2,
        title : "ToDo",
        content: "ToDo ToToDo",
        tags: ["Private"]
    }
];

export const foldersData = [
    {
        key: 0,
        title : "Corporative",
        status: 'closed'
    },
    {
        key: 1,
        title : "Private",
        status: 'closed'
    },
    {
        key: 2,
        title : "Activities",
        status: 'closed'
    }
];

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



