/**
Server.JS
Version: 1.0.0
Date: 4/26/2017

A server file written for express that serves a basic webpage flow to demonstrate connection to a Citi API.

Uses Async for synchronous API calls, Axios for HTTP requests, and body-parser for formatting data.
*/

//Library imports
const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const async = require('async');
const bodyParser = require('body-parser');
const axios = require('axios');
const querystring = require('querystring');
const config = require('./config.json');


//Constants for API access
const TOKEN_URL = "https://sandbox.apihub.citi.com/gcb/api/authCode/oauth2/token/us/gcb"; //HTTPS endpoint to retrieve token
const ACCOUNTS_URL = "https://sandbox.apihub.citi.com/gcb/api/v2/accounts"; //HTTPS endpoint to retrieve account summary
const CONTENT_TYPE = "application/x-www-form-urlencoded"; //content type for header
const GRANT_TYPE = "authorization_code";
const REDIRECT_URI = "https://127.0.0.1:3000/accounts/retrieve"; //URI to redirect to after successfully logging in at Citi redirect
const SAMPLE_UUID = "a293fe0a-51ff-4b03-9376-022f1a1b453e"; //UUID - can be any generated value
const ACCEPT = "application/json"; 

//create encoded secret by concatenating ID and Secret with a colon, converting to base64, and prepending with 'Basic '
const CLIENT_ID = config.CLIENT_ID; //Client ID generated from your application page
const CLIENT_SECRET = config.CLIENT_SECRET;


var tempEncoding = new Buffer(CLIENT_ID + ":" + CLIENT_SECRET);
const ENCODED_ID_SECRET = "Basic " + tempEncoding.toString('base64');

//initialize express
const ex = require("express");
const app = express();

// app.use(express.static(path.join(__dirname, 'views'), {index: 'login.html'}))
//app.use(express.static(path.join(__dirname, 'views'), {index: '_'}));
//app.use(express.static('/views/', {index: 'login.html'}))

//routing for entry point of application, handles all urls except for accounts/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + "/login.html"));
});


app.use(ex.static(__dirname));
app.use(ex.static("views"));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//options for https server - use certificate generated by openssl
var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: config.CERTIFICATE_PASSWORD
};

//page that your redirect URI points to. 
app.get('/accounts/*', function (req, res) {
	var code = req.query.code;
	//error path - no code variable passed through url
	if(typeof code === 'undefined' || code === null){
		res.send("<h1>You need to be redirected here from the Citi Login page. Please return to <a href='https://127.0.0.1:3000'>localhost</a> to try the oath flow over.</h1>");
	} else {
		//code exists, use it to fetch account information
		async.waterfall( //synchronous calls to get token first, then account
			[	//bootstrapping function to pass code into fetchToken
				function(callback){ 
					callback(null, code);
				},
				fetchToken, //function to retrieve access_token
				fetchAccount //function to retrieve account
			],
			function(err, successfulAccount){
				//error case: https request
				if(err){
					res.send('<h1>Something Went Wrong. Try again.</h1><p>Error: ' + err + '</p>');
				} else {
					//Success: send account information
					// res.send(
					// 	'<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script><pre class="prettyprint">' +
					// 	successfulAccount + 
					// 	'</pre>'
					// 	);
					//start.js
					var spawn = require('child_process').spawn,
					    py    = spawn('python', ["telesign.py"]),
					    dataString = '';

					py.stdout.on('data', function(data){
					  dataString += data.toString();
					});
					py.stdout.on('end', function(){
					  console.log('Message=',"This is a huge purchase that doesn't seem to fall within your usual spending habits. Are you sure you are okay with it?");
					});

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

					res.sendFile(path.join(__dirname + "/views/index.html"));
				}
			}
		);
	}
});

// app.get('/index.css', function(req, res) {
//   res.sendFile(path.join(__dirname + "/views/index.css"));
// });

// app.get('/index.js', function(req, res) {
//   res.sendFile(path.join(__dirname + "/views/index.js"));
// });

// app.get('/index', function (req, res) {
//   res.sendFile(path.join(__dirname + "/views/index.html"));
// });

// app.get('/about', function (req, res) {
//   res.sendFile(path.join(__dirname + "/views/about.html"));
// });

// app.get('/product', function (req, res) {
//   res.sendFile(path.join(__dirname + "/views/product.html"));
// });

//port assignment for local server
const port = process.env.PORT || '3000';
app.set('port', port);

//create https server with options for https
const server = https.createServer(options, app);

//display console message for where server is listening
server.listen(port, () => console.log(`API running on localhost:${port}`));

/**
takes a code, and a callback function for use with async waterfall

calls Citi endpoint to exchange a code for an access token.
*/
function fetchToken(code, callback) {
	//https request
	axios({
		method: 'post',
		url: TOKEN_URL,
		headers:{
			"Authorization": ENCODED_ID_SECRET,
			"Content-Type": CONTENT_TYPE
		},
		data: querystring.stringify({
			"grant_type": GRANT_TYPE,
			"redirect_uri": REDIRECT_URI,
			"code":code
		})
	}).then(function(response){
		var access_token = response.data['access_token'];
		callback(null, access_token);

	}).catch(function(error){
		//pass error to async.waterfall
		callback(error, null);
	});
}

/**
takes an access_token and a callback function for use with async waterfall

calls citi endpoint with a client ID and access token to retrieve account information
*/
function fetchAccount(token, callback) {
	access_token = "Bearer " + token;
	axios({
		method: 'get',
		url: ACCOUNTS_URL,
		headers: {
			"Authorization": access_token,
			"uuid": SAMPLE_UUID,
			"Accept": ACCEPT,
			"client_id": CLIENT_ID
		}
	}).then(function(response){
		var successfulAccount = JSON.stringify(response.data, undefined, 2);
		callback(null, successfulAccount);
	}).catch(function(error){
		callback(error, null);
	});
}
