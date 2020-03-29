import { client } from '../models/database.js';

function generateRandomString(length) {
	let randString = '';
	const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const charsLength = allowedChars.length;
	for (var i=0; i<length; i++) {
		randString += allowedChars.charAt(Math.floor(Math.random() * charsLength));
	}
	return randString;
}

function checkValidCaseId(caseId) {
	let query = `SELECT * FROM case_info where id = '${caseId}';`;
	return new Promise ( (resolve, reject) => {
		client.query(`${query}`, (err, res) => {
			if (err) {
				console.log('Error - ', err);
				return reject(err);
			} else if(res.rowCount == 1) {
				resolve(res);
			} else {
				console.log('Error - invalid caseId supplied');
				reject(err);
			}
		});
	})
}

function checkValidPoliceId(id) {
	let query = `SELECT * FROM police_info where id = '${id}';`;
	return new Promise( (resolve, reject) => {
		client.query(`${query}`, (err, res) => {
			if (err) {
				console.log('Error- ', err);
				reject(err)
			} else if (res.rowCount == 1) {
				resolve(res);
			} else {
				console.log('Error - invalid police Id supplied');
				reject(err);
			}
		});
	});
	
}

export const createReport = function (params) {
	
	//get owner Information
	const ownerId = generateRandomString(8);
	const ownerName = params.name;
	const ownerContact = params.contact;

	//get owner's case Information
	const caseId = generateRandomString(8);
	const bikeModel = params.model;
	const bikeBrand = params.brand;
	const bikeNo = params.bikeNo;
	const bikeDescription = params.description;
	const stolenFrom = params.stolenFrom;	
	const stolenDate = '2020-01-04';
	const reportDate = (new Date()).toISOString().split('T')[0];
	const bikeStatus = 'STOLEN';

	const ownerQuery = `INSERT INTO owner_info VALUES 
						('${ownerId}', '${ownerName}', '${ownerContact}');`;
	const caseQuery = `INSERT INTO case_info VALUES 
						('${caseId}', '${bikeModel}', '${bikeBrand}', 
						'${bikeNo}', '${bikeDescription}', '${stolenFrom}', 
						'${stolenDate}', '${reportDate}', '${ownerId}', '${bikeStatus}');`

	client.query(`${ownerQuery}`, (err, res) => {
		if (err) {
			console.log('Error while inserting data in owner_info - ', err);
		} else {
			console.log('Data inserted successfully in owner_info');

			client.query(`${caseQuery}`, (err, res) => {
				if (err) {
					console.log('Error while inserting data in case_info', err);
				} else {
					console.log('Data inserted successfully in case_info');
				}
			})
		}
	});

}

export const addPoliceOfficer = function(params) {
	const id = generateRandomString(7);
	const name = params.name;
	const status = 'FREE';

	const query = `INSERT INTO police_info VALUES ('${id}', '${name}', '${status}');`;
	console.log('query - ', query);
	client.query(`${query}`, (err, res) => {
		if (err) {
			console.log('Error while inserting data in police_info - ', err);
		} else {
			console.log('Officer added successfully');
		}
	});
}

export const assignOfficerToCase = function (params) {
	const id = params.id;
	const caseId = params.caseId;
	const status = 'WORKING';

	checkValidPoliceId(id).then(res => {
		return checkValidCaseId(caseId)
	}).then(res => {
		var query = `UPDATE police_info SET officer_status = '${status}' WHERE id = '${id}';`;
			client.query(`${query}`, (err) => {
				if (err) {
					console.log('Error - ', err);
				} else {
					query = `INSERT INTO police_case_info VALUES ('${id}', '${caseId}', '${status}')`;
					client.query(`${query}`, (err, res) => {
						if (err) {
							console.log('Error while inserting data in police_case_info - ', err);
						} else {
							console.log('Officer assigned to case successfully');
						}
					});
				}
		});
	}).catch(err => {
		console.log('Error - ', err);
	})

}


