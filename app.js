// create an express app
const express = require("express");
const app = express();
const bodyParser=require('body-parser');
const path = require('path');
var HTTP = require("http");
const axios = require('axios');

// use the express-static middleware
app.use(express.static("marketing-cloud-query-app"));
app.use(bodyParser.urlencoded({extended:true}));

// define the first route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/loginpage.html'));
})
app.set('view engine', 'html');
app.post("/secondpage", function (req, res) {
  // res.sendFile(path.join(__dirname + '/secondpage.html'));
  console.log(req);
  console.log(req.body);
   var clientidSource = req.body.clientid;
   var clientsecretSource = req.body.clientsecret;
   var clinentauthurl= req.body.authurl;
   console.log('Avi'+ clientidSource,'Avi1'+ clientsecretSource,'Avi2'+ clinentauthurl);
   //alert('Avi'+ clientidSource,'Avi1'+ clientsecretSource,'Avi2'+ clinentauthurl);
   
   var FormData = require('form-data');
   var data = new FormData();
   data.append('grant_type', 'client_credentials');
   data.append('client_id', 'jye6cem725bblk5cghdzes5g');
   data.append('client_secret', 'vC2k5frAF8vdiyexkCJPCb4Q');
   data.append('account_id', '514011820');
   
   var config = {
     method: 'post',
     url: 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com/v2/token',
     headers: { 
       'Content-Type': 'application/json', 
       ...data.getHeaders()
     },
     data : data
   };
   
   axios(config)
   .then(function (response) {
     console.log(JSON.stringify(response.data));
   })
   .catch(function (error) {
     console.log(error);
   });

   
   res.sendFile(path.join(__dirname + '/secondpage.html'));

});


// Platform.Load("Core", "1");
/* create the payload in JSON format */
/* var payload = '{"grant_type":"client_credentials",';
payload += '"client_id":"jye6cem725bblk5cghdzes5g",';
payload += '"client_secret":"vC2k5frAF8vdiyexkCJPCb4Q",';
payload += '"scope":null,';
payload += '"account_id":"514011820"}';
var url = "https://mc6vgk-sxj9p08pqwxqz9hw9-4my.rest.marketingcloudapis.com/v2/token";
var contentType = 'application/json';
try {
 var accessTokenResult = HTTP.Post(url, contentType, payload);
 var tokenObj = Platform.Function.ParseJSON(accessTokenResult["Response"][0]);
 var accessToken = tokenObj.access_token;
 console.log("OAuth 2.0 Access Token: " + accessToken);
// Write("OAuth 2.0 Access Token: " + accessToken);
} catch(e) {
//Write(Stringify(e));
console.log(e);
} */

   



// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running."));