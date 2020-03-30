import { addPoliceOfficer, assignOfficerToCase, 
		assignAnyFreeOfficerToCase, getPoliceOfficerStatus, 
		getOfficerAndCaseInformation } from '../methods/PoliceMethods';


module.exports = function (app) {

	app.post("/add-police-officer", (req, res) => {
		const params = req.query;
		addPoliceOfficer(params).then((response) => {
			res.send(response);
		}).catch(err => {
			res.send(err)
		});
	});

	app.post("/assign-officer-to-case", (req, res) => {
		const params = req.query;
		assignOfficerToCase(params).then ((response) => {
			res.send(response);
		}).catch(err => {
			res.send(err)
		});
	});

	app.post("/assign-any-free-officer-to-case", (req, res) => {
		const params = req.query;
		assignAnyFreeOfficerToCase(params).then((response) => {
			res.send(response);
		}).catch(err => {
			res.send(err)
		});
	});

	app.get("/police-officer-status", (req, res) => {
		getPoliceOfficerStatus().then((response) => {
			res.send(response);
		}).catch(err => {
			res.send(err)
		});
	});

	app.get("/police-officer-case-status", (req, res) => {
		getOfficerAndCaseInformation().then((response) => {
			res.send(response);
		}).catch(err => {
			res.send(err);
		});
	});
}