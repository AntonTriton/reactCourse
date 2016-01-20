var idGenerator = require('./id-generator')

var store = {
  directories: [{
    id: idGenerator.getNext(),
    name: 'root'
  }],
  notices: [
    {
      id:0,
      key: 0,
      title : "Future",
      content: "Future is now",
      tags: ["Root"],
      tagsIDs: [0]
    },
    {
      id:1,
      key: 1,
      title : "Birthdays",
      content: "Future is now and tomorrow",
      tags: ["Root","Private","Activities"],
      tagsIDs: [0,1,2]
    },
    {
      id: 2,
      key: 2,
      title : "ToDo",
      content: "ToDo ToToDo",
      tags: ["Root","Private"],
      tagsIDs: [0,1]
    },
    {
      id: 3,
      key: 3,
      title : "Friend",
      content: "Friend",
      tags: ["Root","Private","Friends"],
      tagsIDs: [0,1,4]
    }]
};

module.exports = store
