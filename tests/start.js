//start.js
//var spawn = require('child_process').spawn,
    //py    = spawn('python', ['compute_input.py']),
    //data = require('./sampletransaction.json'),
    //dataString = '';

//py.stdout.on('data', function(data){
  //dataString += data.toString();
//});

// py.stdout.on('end', function(){
//   console.log('Sum of numbers=',dataString);
// });

// py.stdin.write(JSON.stringify(data));
// //py.stdin.end();

var PythonShell = require('python-shell');
var pyshell = new PythonShell('compute_input.py');
var data = require('./sampletransaction.json');

pyshell.send(JSON.stringify(data));

pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log('data= ', message);
});

// end the input stream and allow the process to exit
pyshell.end(function (err) {
    if (err){
        throw err;
    };

    console.log('finished');
});