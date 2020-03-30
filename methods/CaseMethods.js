import { client } from '../models/database.js';
import { generateRandomId } from './CommonMethods';

export const createReport = function (params) {
	
	//get owner Information
	const ownerId = generateRandomId(8);
	const ownerName = params.name;
	const ownerContact = params.contact;

	//get owner's case Information
	const caseId = generateRandomId(8);
	const bikeModel = params.model;
	const bikeBrand = params.brand;
	const bikeNo = params.bikeNo;
	const bikeDescription = params.description;
	const stolenFrom = params.stolenFrom;	
	const stolenDate = params.stolenDate;
	const reportDate = (new Date()).toISOString().split('T')[0];
	const bikeStatus = 'STOLEN';

	return new Promise ((resolve, reject) => {
		const ownerQuery = `INSERT INTO owner_info VALUES 
						('${ownerId}', '${ownerName}', '${ownerContact}');`;
		const caseQuery = `INSERT INTO case_info VALUES 
							('${caseId}', '${bikeModel}', '${bikeBrand}', 
							'${bikeNo}', '${bikeDescription}', '${stolenFrom}', 
							'${stolenDate}', '${reportDate}', '${ownerId}', '${bikeStatus}');`

		client.query(`${ownerQuery}`, (err, res) => {
			if (err) {
				reject('Error while inserting data in owner_info - ', err);
			} else {
				console.log('Data inserted successfully in owner_info');

				client.query(`${caseQuery}`, (err, res) => {
					if (err) {
						reject('Error while inserting data in case_info', err);
					} else {
						console.log('Data inserted successfully in case_info');
						resolve('Report created successfully')
					}
				})
			}
		});
	})

}

export const getAllCasesInformation = function () {
	const query = `SELECT * FROM case_info;`;
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

export const getCaseInformationById = function (params) {
	const id = params.caseId;
	return new Promise ((resolve, reject) => {
		const query = `SELECT * FROM case_info where id='${id}';`;
		client.query(`${query}`, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.rows);
			}
		});
	});	
}