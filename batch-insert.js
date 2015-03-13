var fs = require('fs');
var parse = require('csv-parse');
var request = require('request');
var transform = require('stream-transform');

var dataFile = process.argv[2];

var parser = parse({delimiter: ',', columns: true});
var input = fs.createReadStream(dataFile);
var transformer = transform(function(record, callback){
  
  var params = {
    url: 'http://quotes-api.jonnochoo.com/api/quotes',
    json: {
      author: record.author,
      source: record.source,
      text: record.text,
      tags: []
    }
  };
  request.post(params, function(err, res, data) {
    if(err){
      throw err;
    }

    console.log(res.statusCode);
    console.log(data);
  });
});
input.pipe(parser).pipe(transformer).pipe(process.stdout);