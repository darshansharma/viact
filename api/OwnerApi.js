import { getAllOwnerInformation, getOwnerInformationById } from '../methods/OwnerMethods';


module.exports = function (app) {
	app.get("/all-owner-information", (req, res) => {
		getAllOwnerInformation().then((response) => {
			res.send(response);
		}).catch(err => {
			res.send(err);
		});
	});

	app.post("/owner-info", (req, res) => {
		const params = req.query;
		getOwnerInformationById(params).then((response) => {
			res.send(response);
		}).catch(err => {
			res.send(err);
		});
	});
}