/*
 * 验价所需要的参数
 */
export const getCheckPriceParams = (data, index) => {
	let params = {
		"adultFacePrice": null,
		"airlineCompany": '',
		"cabinRank": '',
		"childFacePrice": 0,
		"flightRange": {
			"fromCity": '',
			"toCity": '',
			"fromDate": '',
			"flightScheduled": []
		},
		"flightRangeType": "OW",
		"infantFacePrice": 0,
		"passengerNature": "",
		"policyID": "DEFAULT"
	}
	params.adultFacePrice = data.prices[index].adultFacePrice;
	params.cabinRank = data.prices[index].cabinList[0].cabinRank;

	params.flightRange.fromCity = data.segments[0].fromAirport;
	params.flightRange.toCity = data.segments[data.segments.length - 1].toCity;
	params.flightRange.fromDate = data.segments[0].fromDate;

	let obj = {
		"arriveTime": data.segments[data.segments.length-1].toDate,
		"cabin": data.prices[index].cabinList[0].cabinCode,
		"cabinRank": data.prices[index].cabinList[0].cabinRank,
		"departTime": data.segments[0].fromDate,
		"flightNo": data.segments[0].flightNo,
		"fromAirport": data.segments[0].fromAirport,
		"toAirport": data.segments[0].toAirport
	}
	params.flightRange.flightScheduled.push(obj);
	return params;
}