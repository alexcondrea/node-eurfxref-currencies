var express = require('express');
var router = express.Router();

var currency = require('../models/currency');

router.get('/currencies', function(req, res, next) {
  var list = currency.getCurrencyList();
  if (list) res.json({success: true, rates: list});
  else res.json({success: false, err: 'Rates could not be retrived. Try again later'});
});

router.get('/currencies/:sym', function(req, res, next) {
  var rate = currency.getRateForCurrency(req.params.sym);
  if (rate)
    res.json({success: true, rate: parseFloat(rate)});
  else
    res.json({success: false, err: 'Symbol not Found'});
});

module.exports = router;
