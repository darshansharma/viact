import { createReport, getAllCasesInformation, 
        getCaseInformationById } from '../methods/CaseMethods';

module.exports = function (app) {
	app.post("/create-report", (req, res) => {
		const params = req.query;
		createReport(params).then((response) => {
			res.send(response);
		}).catch(err => {
			res.send(err)
		});
	});

	app.get("/all-cases-information", (req, res) => {
		getAllCasesInformation().then((response) => {
			res.send(response);
		}).catch(err => {
			res.send(err);
		});
	});

	app.post("/case-info", (req, res) => {
		const params = req.query;
		getCaseInformationById(params).then((response) => {
			res.send(response);
		}).catch(err => {
			res.send(err);
		});
	});
}