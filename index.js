const express = require('express');
const pg = require('pg');
const client = require('./database.js').client;
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello world!'));

app.listen(port, ()=> console.log('App running on port 3000'));

app.post("/create-report", async (req, res) => {
try{
		console.log('fetching params');
		
		console.log(client);
		return res.send('Report created successfully');
	}
	catch (e) {
		console.log('error - ', e);
		return false;
	}	
});



