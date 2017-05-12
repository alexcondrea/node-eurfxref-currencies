var schedule = require('node-schedule');
var fs = require('fs');
var https = require('https');
var unzip = require('unzip');
var through = require('through2');
var csvjson = require('csvjson');

var currency = require('../models/currency');



function init() {
  schedule.scheduleJob('0 0 0 * * *', readCSVFile);
  readCSVFile();
}

function readCSVFile() {

  https.get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref.zip', function(response) {
    response
          .pipe(unzip.Parse())
          .on('entry', function (entry) {
            var fileName = entry.path;
            var type = entry.type; // 'Directory' or 'File'
            var size = entry.size;
            if (fileName === "eurofxref.csv") {
              entry.pipe(through.obj(function(contents) {
                console.log(contents.toString());
                var jsonData = csvjson.toObject(contents.toString(), {delimiter: ', '})[0];
                delete jsonData[''];
                currency.setCurrencyList(jsonData);
              }))
            } else {
              entry.autodrain();
            }
          })
  });
}

module.exports = {init : init};
