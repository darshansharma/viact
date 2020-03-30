import { client } from '../models/database.js';

export function generateRandomId(length) {
	let randString = '';
	const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const charsLength = allowedChars.length;
	for (var i=0; i<length; i++) {
		randString += allowedChars.charAt(Math.floor(Math.random() * charsLength));
	}
	return randString;
}

export function checkValidCaseId(caseId) {
	let query = `SELECT * FROM case_info where id = '${caseId}';`;
	return new Promise ((resolve, reject) => {
		client.query(`${query}`, (err, res) => {
			if (err) {
				console.log('Error - ', err);
				return reject(err);
			} else if(res.rowCount == 1) {
				resolve(res);
			} else {
				console.log('Error - Invalid caseId supplied');
				reject(err);
			}
		});
	})
}

export function checkValidPoliceId(id) {
	let query = `SELECT * FROM police_info where id = '${id}';`;
	return new Promise((resolve, reject) => {
		client.query(`${query}`, (err, res) => {
			if (err) {
				console.log('Error- ', err);
				reject(err)
			} else if (res.rowCount == 1) {
				resolve(res);
			} else {
				console.log('Error - Invalid police Id supplied');
				reject('Error - Invalid police Id supplied');
			}
		});
	});
	
}

export function getFreeOfficerId() {
    let query = `SELECT * FROM police_info WHERE officer_status='FREE';`;
	return new Promise((resolve, reject) => {
		client.query(query, (err, res) => {
			if (err) {
				reject(err);
			} else if (res.rowCount >= 1) {
				const rowIndex = Math.floor((Math.random() * res.rowCount)) // selecting officer randomly
                const id = res.rows ? res.rows[rowIndex].id : 0;
				resolve(id);
			} else {
				console.log('Error - No free officer right now');
				reject('Error - No free officer right now');
			}
		});
	})
}
