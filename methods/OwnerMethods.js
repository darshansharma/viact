import { client } from '../models/database.js';

export const getAllOwnerInformation = function () {
	const query = `SELECT * FROM owner_info;`;
	return new Promise ((resolve, reject) => {
		client.query(query, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.rows);
			}
		});
	});	
}

export const getOwnerInformationById = function (params) {
	const id = params.ownerId;
	return new Promise ((resolve, reject) => {
		const query = `SELECT * FROM owner_info where id='${id}';`;
		client.query(query, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.rows);
			}
		});
	});	
}
