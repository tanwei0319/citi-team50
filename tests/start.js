//start.js
var spawn = require('child_process').spawn,
    py    = spawn('python', ['compute_input.py']),
    data = require('./sampletransaction.json'),
    dataString = '';

py.stdout.on('data', function(data){
  dataString += data.toString();
});
py.stdout.on('end', function(){
  console.log('Sum of numbers=',dataString);
});
py.stdin.write(JSON.stringify(data));
py.stdin.end();