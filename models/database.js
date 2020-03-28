const { Client } = require('pg');
const pgp = require('pg-promise');

var connectionString = 'postgres://darshan:darshan123@localhost:5433/viact';

const client = new Client ({
	connectionString: connectionString
});

client.connect(err => {
	if (err) {
		console.log('err - ', err);
	} else {
		console.log('Connected to database!');
	}
});

/*
client.query('SELECT * FROM owner_info', (err, result) => {
	if (err) {
		console.log('Error\n - ', err);
	} else {
		console.log(result.rows);
	}
});
*/
