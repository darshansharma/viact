// const app = require('../index.js').app;
import { createReport, addPoliceOfficer, assignOfficerToCase } from '../methods/methods';


module.exports = function (app) {
	app.post("/create-report", async (req, res) => {
		try{
			const params = req.query;
			createReport(params);
			return res.send('Report created successfully');
		}
		catch (err) {
			console.log('error - ', err);
			return false;
		}	
		});

	app.post("/add-police-officer", async(req, res) => {
		try {
			const params = req.query;
			addPoliceOfficer(params);
			return res.send('Police officer added successfully')
		}
		catch (err) {
			console.log('Error - ', err);
			return false;
		}
	});

	app.post("/assign-officer-to-case", async(req, res) => {
		try {
			const params = req.query;
			assignOfficerToCase(params);
			return res.send('Police officer assigned to this case successfully')
		}
		catch (err) {
			console.log('Error - ', err);
			return false;
		}
	});
}