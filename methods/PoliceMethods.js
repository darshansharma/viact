import { client } from '../models/database.js';
import { generateRandomId, checkValidCaseId, 
        checkValidPoliceId, getFreeOfficerId } from './CommonMethods';

export const addPoliceOfficer = function(params) {
	const id = generateRandomId(7);
	const name = params.name;
	const status = 'FREE';

	return new Promise ((resolve, reject) => {
		const query = `INSERT INTO police_info VALUES ('${id}', '${name}', '${status}');`;
		client.query(`${query}`, (err, res) => {
			if (err) {
				reject('Error while inserting data in police_info - ', err);
			} else {
				resolve('Officer added successfully');
			}
		});
	})
	
}

export const assignOfficerToCase = function (params) {
	const id = params.officerId;
	const caseId = params.caseId;
	const status = 'WORKING';
	return new Promise ((resolve, reject) => {
		checkValidPoliceId(id).then(res => {
			checkValidCaseId(caseId)
		}).then(res => {
			var query = `UPDATE police_info SET officer_status = '${status}' WHERE id = '${id}';`;
				client.query(`${query}`, (err) => {
					if (err) {
						reject(err);
					} else {
						query = `INSERT INTO police_case_info VALUES ('${id}', '${caseId}', '${status}')`;
						client.query(`${query}`, (err, res) => {
							if (err) {
								reject(err);
							} else {
								resolve('Officer assigned to case successfully');
							}
						});
					}
			});
		}).catch(err => {
			reject(err)
		})
	});
	

}

export const assignAnyFreeOfficerToCase = function (params) {
	return new Promise((resolve, reject) => {
		getFreeOfficerId().then((officerId) => {
			params['officerId'] = officerId;
			assignOfficerToCase(params);
			resolve('A Officer is assigned to this case.')
		}).catch(err => reject(err))
	});
}

export const getPoliceOfficerStatus = function () {
	const query = `SELECT * FROM police_info;`;
	return new Promise ((resolve, reject) => {
		client.query(`${query}`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.rows);
			}
		});
	});	
}

export const getOfficerAndCaseInformation = function () {
	const query = `SELECT * FROM police_case_info;`;
	return new Promise ((resolve, reject) => {
		client.query(`${query}`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.rows);
			}
		});
	});	
}

export const changeOfficerStatusToFree = function (params) {
    const caseId = params.caseId;
    let query = `UPDATE police_case_info SET officer_status='FREE' where case_id='${caseId}'`; 
	return new Promise ((resolve, reject) => {
		client.query(`${query}`, (err, res) => {
			if (err) {
                console.log('Error - ', err);
				reject(err);
			} else if (res.rowCount == 1){
                query = `UPDATE police_info SET officer_status='FREE' where id=
                        (SELECT police_id from police_case_info where case_id='${caseId}');`;
                client.query(`${query}`, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Officer status changed to FREE');
                    }
                })
			} else {
                console.log('No officer currently working on this case');
                reject ('No officer currently working on this case');
            }
		});
	});	
}