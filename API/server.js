const express = require('express');     
const bodyParser = require('body-parser');

const router = require('./router.js');


const app = express();                

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API

app.use(express.static('public'));

app.use(function(req, res, next){
	console.log('something is happening');
  	next();
});
app.use('/', router);


// START THE SERVER

app.listen(port);
console.log('App listening on port ' + port);
