var idD = 0,
    idN = 0;

module.exports = {
  setDir: function(val){
    idD = val;
  },
  setNote: function(val){
    idN = val;
  },
  getNextDir: function () {
    return ++idD;
  },
  getNextNote: function () {
    return ++idN;
  }
};
