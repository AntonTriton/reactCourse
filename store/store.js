/*var idGenerator = require('./id-generator')

var store = {
  directories: [{
    id: idGenerator.getNext(),
    name: 'root'
  }],
  notices: []
}*/

import { createStore } from 'redux'

import reducer from './public/reducers.js'

export default createStore(reducer);


