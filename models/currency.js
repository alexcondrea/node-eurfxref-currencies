// Private
var list = [];

module.exports = {

  setCurrencyList: function (l) {
    list = l;
  },

  getCurrencyList: function () {
    return list;
  },

  getRateForCurrency: function (sym) {
    if (sym && sym.length === 3) return list[sym];
    else return null;
  }

};
