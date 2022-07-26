const Promise = require('bluebird');                        
const csv = require('fast-csv');
const fs = require('fs');
const byline = require('byline');                           

// var CE_stream = fs.createReadStream('../34800CE.csv');
// var PE_stream = fs.createReadStream('../34800PE.csv');
//CE_stream = byline.createStream(CE_stream);

function readCSV(file, callback) {
    let stream = fs.createReadStream(file);
    stream = byline.createStream(stream);
    stream.on('data', (line) => {
      stream.pause();
      Promise.resolve(line.toString())
        .then(callback)
        .then(() => setTimeout(() => stream.resume(), 10));
    });
  }
  
module.exports = readCSV;