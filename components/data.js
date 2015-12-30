'use strict';

export const notesData = [
    {
        id:0,
        key: 0,
        title : "Future",
        content: "Future is now",
        tags: ["Root"]
    },
    {
        id:1,
        key: 1,
        title : "Birthdays",
        content: "Future is now and tomorrow",
        tags: ["Root","Private","Activities"]
    },
    {
        id: 2,
        key: 2,
        title : "ToDo",
        content: "ToDo ToToDo",
        tags: ["Root","Private"]
    },
    {
        id: 3,
        key: 3,
        title : "Friend",
        content: "Friend",
        tags: ["Root","Private","Friends"]
    }
];

export const foldersData = [
    {
        key: 0,
        id: 0,
        title : "Root",
        status: 'open',
        isActive: true,
        level:0
    },
    {
        key: 1,
        id: 1,
        title : "Private",
        status: 'closed',
        parentId: 0,
        level:1
    },
    {
        id: 4,
        key: 4,
        title : "Friends",
        status: 'closed',
        parentId: 1,
        level:2
    },
    {
        id: 5,
        key: 5,
        title : "Secrets",
        status: 'closed',
        parentId: 1,
        level:2
    },
    {
        id: 2,
        key: 2,
        title : "Activities",
        status: 'closed',
        parentId: 0,
        level:1
    },
    {
        id: 6,
        key: 6,
        title : "Yoga",
        status: 'closed',
        parentId: 2,
        level:2
    },
    {
        id: 3,
        key: 3,
        title : "Corporative",
        status: 'closed',
        parentId: 0,
        level:1
    },
    {
        id: 7,
        key: 7,
        title : "Documents",
        status: 'closed',
        parentId: 3,
        level:2
    },
    {
        id: 8,
        key: 8,
        title : "Tools",
        status: 'closed',
        parentId: 3,
        level:2
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



