// create an express app
const express = require("express")
const app = express()
const path = require('path');

// use the express-static middleware
app.use(express.static("marketing-cloud-query-app"))

// define the first route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/loginpage.html'));
})
app.post("/secondpage", (req, res) => {
  // res.sendFile(path.join(__dirname + '/secondpage.html'));
  console.log(req);
  console.log(req.body);
   var clientidSource = req.body.clientid;
   var clientsecretSource = req.body.clientsecret;
   var clinentauthurl= req.body.authurl;
   console.log('Avi'+ clientidSource,'Avi1'+ clientsecretSource,'Avi2'+ clinentauthurl);
//alert('Avi'+ clientidSource,'Avi1'+ clientsecretSource,'Avi2'+ clinentauthurl);
   res.render("secondpage.html");

});
   



// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running."));