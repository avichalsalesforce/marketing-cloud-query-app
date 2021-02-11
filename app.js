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
app.get('/loginpage.html', function(req, res){ 
    res.send(path.join(__dirname + '/secondpage.html')); 
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running."));