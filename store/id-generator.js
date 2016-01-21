var id = 0;

module.exports = {
  set: function(val){
    id = val;
  },
  getNext: function () {
    return ++id;
  }
};
