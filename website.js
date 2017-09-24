
const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const async = require('async');
const bodyParser = require('body-parser');
const axios = require('axios');
const querystring = require('querystring');
const config = require('./config.json');

var app = express();

app.use(express.static(path.join(__dirname, 'views')));


var router = express.Router();
  
  
// app.use("/",router);
  
// router.get("/product",function(req, res){
//   res.sendFile(path + "product.html");});
  
// router.get("/about",function(req, res){
//   res.sendFile(path + "about.html");
// });

router.get("/",function(req, res){
  res.sendFile(path.join(__dirname + "/views/main.html"));
});
  
router.get("/product",function(req, res){
  res.sendFile(path.join(__dirname + "/views/product.html"));});
  
app.use("*",function(req, res){
  res.send("Error 404: Not Found!");
});
  
// app.listen(3000,function(){
//   console.log("Server running at Port 3000");
// });