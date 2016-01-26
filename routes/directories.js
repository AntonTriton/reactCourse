var express = require('express')
  , _ = require('lodash')
  , router = express.Router()
  , store = require('./../store/store')
  , idGenerator = require('./../store/id-generator');

idGenerator.setDir(8);

router
  .get('/', function (req, res) {
    res.send(store.directories)
  })
  .post('/', function (req, res) {

    var directory = _.pick(req.body, [
          'parentId',
          'name',
          'index',
          'level'
        ]
      )
      , parent = _.find(store.directories, function (dir) {
        return dir.id == directory.parentId
      })

    if (parent) {

      var id = idGenerator.getNextDir();

      _.assign(directory, { id: id , key: id });

      store.directories.splice(directory.index+1,0,directory);

      res.send(directory)

    } else {
      res.status(500).send('no parent')
    }
  })
  .put('/:id', function (req, res) {

    var directory = _.pick(req.body, [
          'id',
          'parentId',
          'name',
          'index',
          'level'
        ]
      )
      , oldEntityIndex = _.findIndex(store.directories, function (dir) {
        return dir.id == req.params.id
      })


    if (oldEntityIndex !== -1) {

      store.directories.splice(oldEntityIndex, 1, directory)

      res.send(directory)

    } else {
      res.status(500).send('no entity')
    }
  })
  .delete('/:id', function (req, res) {

    var directoryId = req.params.id;

    if (directoryId == 0) {
      res.send(500).send('can not remove root directory')
      return
    }

    var entityIndex = _.findIndex(store.directories, function (dir) {
        return dir.id == directoryId
      })
      , directory = store.directories[entityIndex],
        stopIndex = entityIndex+1;

    if (entityIndex !== -1) {

        for(var i  = entityIndex+1, len = store.directories.length; i < len; i++){

            if(store.directories[i].level <= directory.level || i == len-1){

                stopIndex = i;

                if(i == len-1 && store.directories[i].level > directory.level) stopIndex++;

                break;
            }
        }

        store.directories.splice(entityIndex, stopIndex-entityIndex);

      res.send(store.directories)
    } else {
      res.status(500).send('no entity')
    }
  })

module.exports = router
