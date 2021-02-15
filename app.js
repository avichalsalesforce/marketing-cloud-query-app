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
   data.append('client_id', clientidSource);
   data.append('client_secret', clientsecretSource);
   // data.append('account_id', '514011820');
   
   var config = {
     method: 'post',
     url: clinentauthurl,
     headers: { 
       'Content-Type': 'application/json', 
       ...data.getHeaders()
     },
     data : data
   };
   
   axios(config)
   .then(function (response) {
    // console.log(JSON.stringify(response.data));
     var token=response.data.access_token;
     console.log(token);
   })
   .catch(function (error) {
     console.log(error);
   });


   res.sendFile(path.join(__dirname + '/secondpage.html'));

});




// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running."));




  
  var data1 = '<?xml version="1.0" encoding="UTF-8"?>\r\n<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\r\n    <s:Header>\r\n        <a:Action s:mustUnderstand="1">Retrieve</a:Action>\r\n        <a:To s:mustUnderstand="1">https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx</a:To>\r\n        <fueloauth xmlns="http://exacttarget.com">eyJhbGciOiJIUzI1NiIsImtpZCI6IjEiLCJ2ZXIiOiIxIiwidHlwIjoiSldUIn0.eyJhY2Nlc3NfdG9rZW4iOiJZeUZCUHNkZkttZzNQVHhaeFFIamlXdW8iLCJjbGllbnRfaWQiOiJqeWU2Y2VtNzI1YmJsazVjZ2hkemVzNWciLCJlaWQiOjExMDAwNTY5MCwic3RhY2tfa2V5IjoiUzExIiwicGxhdGZvcm1fdmVyc2lvbiI6MiwiY2xpZW50X3R5cGUiOiJTZXJ2ZXJUb1NlcnZlciJ9.pkvkKcwyZsEnkUlFVCYVpNZ4oyU_MUiOyrXVoXgHBmo.uE4VQfKaf12-zt1HtvgEduVfEo43D20YSUVz_nNZKBVS0R2lKb8cS9yVnqpLel5rJrmNBmlaDqnh_fetJoDqZKbH9eXaXkwmQ8axonDCzM7mCNe5zCGr98J0wyzHbiVbqjkEg4V5kMhsZ8OiqGw5HjApxh2pMJiEHP0iZpogX9ShVfc2vkl</fueloauth>\r\n    </s:Header>\r\n    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\r\n        <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI">\r\n            <RetrieveRequest>\r\n                <ObjectType>DataExtension</ObjectType>\r\n                <Properties>ObjectID</Properties>\r\n                <Properties>CustomerKey</Properties>\r\n                <Properties>Name</Properties>\r\n                <Properties>IsSendable</Properties>\r\n                <Properties>SendableSubscriberField.Name</Properties>\r\n               \r\n            </RetrieveRequest>\r\n        </RetrieveRequestMsg>\r\n    </s:Body>\r\n</s:Envelope>';
  
  var config = {
    method: 'post',
    url: 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
    headers: { 
      'Content-Type': 'text/xml', 
      'SoapAction': 'Retrieve'
    },
    data : data1
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  