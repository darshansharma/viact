const client = require('../database.js').client;

function createReport(ownerInfo, caseInfo) {
	
	//get owner Information
	const ownerId = ownerInfo.id;
	const ownerName = ownerInfo.name;
	const ownerContact = ownerInfo.contact;

	//get owner's case Information
	const caseId = caseInfo.id;
	const bikeModel = caseInfo.model;
	const bikeBrand = caseInfo.brand;
	const bikeNo = caseInfo.bikeNo;
	const bikeDescription = caseInfo.description;
	const stolenFrom = caseInfo.stolenFrom;
	const stolenDate = caseInfo.stolenDate;
	const reportDate = datetime.now();
	// owner Id here
	const bikeStatus = caseInfo.bikeSttaus;
	
	client.query()

}
