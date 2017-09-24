//start.js

//initialize Python shell
var PythonShell = require('python-shell');
var pyshell = new PythonShell('compute_input.py');
//Specify json data source
var data = require('./sampletransaction.json');

//send json data to python as a String
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