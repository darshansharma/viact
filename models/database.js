import { Client } from 'pg';
// const pgp = require('pg-promise');

var connectionString = 'postgres://darshan:darshan123@localhost:5433/viact';

export const client = new Client ({
	connectionString: connectionString
});

client.connect(err => {
	if (err) {
		console.log('err - ', err);
	} else {
		console.log('Connected to database!');
	}
});
