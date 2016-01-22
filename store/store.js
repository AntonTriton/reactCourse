var idGenerator = require('./id-generator')

var store = {
  /*directories: [{
    id: idGenerator.getNext(),
    name: 'root'
  }],*/
  directories: [
    {
      key: 0,
      id: 0,
      name : "Root",
      status: 'open',
      level:0
    },
    {
      key: 1,
      id: 1,
      name : "Private",
      status: 'closed',
      parentId: 0,
      level:1
    },
    {
      id: 4,
      key: 4,
      name : "Friends",
      status: 'closed',
      parentId: 1,
      level:2
    },
    {
      id: 5,
      key: 5,
      name : "Secrets",
      status: 'closed',
      parentId: 1,
      level:2
    },
    {
      id: 2,
      key: 2,
      name : "Activities",
      status: 'closed',
      parentId: 0,
      level:1
    },
    {
      id: 6,
      key: 6,
      name : "Yoga",
      status: 'closed',
      parentId: 2,
      level:2
    },
    {
      id: 3,
      key: 3,
      name : "Corporative",
      status: 'closed',
      parentId: 0,
      level:1
    },
    {
      id: 7,
      key: 7,
      name : "Documents",
      status: 'closed',
      parentId: 3,
      level:2
    },
    {
      id: 8,
      key: 8,
      name : "Tools",
      status: 'closed',
      parentId: 3,
      level:2
    }
  ],
  notices: [
    {
      id:0,
      key: 0,
      title : "Future",
      description: "Future is now",
      tags: ["Root"],
      directoryId: 0,
      position:0,
      tagsIDs: [0]
    },
    {
      id:1,
      key: 1,
      title : "Birthdays",
      description: "Future is now and tomorrow",
      tags: ["Root","Private","Activities"],
      directoryId: 1,
      position:0,
      tagsIDs: [0,1,2]
    },
    {
      id: 2,
      key: 2,
      title : "ToDo",
      description: "ToDo ToToDo",
      tags: ["Root","Private"],
      directoryId: 2,
      position:0,
      tagsIDs: [0,1]
    },
    {
      id: 3,
      key: 3,
      title : "Friend",
      description: "Friend",
      tags: ["Root","Private","Friends"],
      directoryId: 4,
      position:0,
      tagsIDs: [0,1,4]
    },
    {
      id: 4,
      key: 4,
      title : "Past",
      description: "Past",
      tags: ["Root","Private","Friends"],
      directoryId: 0,
      position:1,
      tagsIDs: [0]
    }]
};

module.exports = store
