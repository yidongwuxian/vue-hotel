import { getBirthDay,getSStore } from "@/utils/util"
/*
 * 
 * 获取下单的参数
 * 
 */
export const getOrderParams = (data, checkPrice, index, contact, passengerList) => {
	const callbackId = getSStore('flightRouteId');//所要预定的行程的ID
	if(!callbackId) return {result:false,msg:'行程ID为空'};
	let pltmOrder = {
		supplier: '6',
		supplierName: checkPrice.supplierId,
		routingType: 'OW',
		unitPrice: checkPrice.adultFacePrice,
		adultPrice: checkPrice.adultFacePrice,
		childPrice: checkPrice.childFacePrice || 0,
		infantPrice: checkPrice.infantFacePrice || 0,
		adultTFC: checkPrice.adultAirportTax || 0 + checkPrice.adultFuelTax || 0 + checkPrice.adultTax || 0,
		childTFC: checkPrice.childAirportFee || 0 + checkPrice.childFuelFee || 0 + checkPrice.childTax || 0,
		infantTFC: checkPrice.infantAirportFee || 0 + checkPrice.infantFuelFee || 0 + checkPrice.infantTax || 0,
		adultSettle: checkPrice.adultSettlePrice || 0,
		childSettle: checkPrice.childSettlePrice || 0,
		infantSettle: checkPrice.infantSettlePrice || 0,
		airportFeeAdult: checkPrice.adultAirportTax || 0,
		airportFeeChild: checkPrice.childAirportFee || 0,
		airportFeeInfant: checkPrice.infantAirportFee || 0,
		fuelTaxAdult: checkPrice.adultFuelTax || 0,
		fuelTaxChild: checkPrice.childFuelFee || 0,
		fuelTaxInfant: checkPrice.infantFuelFee || 0,
		seatClass: data.prices[index].cabinList[0].cabinRank,
		toStartAirport: data.segments[0].fromAirport,
		toEndAirport: data.segments[data.segments.length - 1].toAirport,
		toStartDate: data.segments[0].fromDate,
		adultCount: passengerList.length,
		childCount: 0,
		infantCount: 0,
		policyID: data.prices[index].policy[0].policyId,
		policyIdChd: data.prices[index].policy[0].policyIdChd,
		settlement: checkPrice.adultSettlePrice || 0,
		contactUser: contact.contactUser,
		contactMobile: contact.contactMobile,
		contactEmail: '',
		isReimburse: '',
		mailFee: '',
		receiver: '',
		receiverPhone: '',
		receiverAddress: '',
		receiverCity: '',
		callbackId: callbackId
	}

	let pltmOrderFlights = [];
	for(let i = 0; i < data.segments.length; i++) {
		let obj = {
			"arrivalCity": data.segments[i].toAirportCn,
			"arrivalTerminal": data.segments[i].toTower,
			"arrivalDate": (data.segments[i].toDate).substr(0, 10),
			"arrivalTime": (data.segments[i].toDate).substr(-5),
			"cabin": data.prices[index].cabinList[0].cabinRank,
			"cabinCode": data.prices[index].cabinList[0].cabinCode,
			"departureCity": data.segments[i].fromAirportCn,
			"departureTerminal": data.segments[i].fromTower,
			"departureDate": (data.segments[i].fromDate).substr(0, 10),
			"departureTime": (data.segments[i].fromDate).substr(-5),
			"flightId": data.segments[i].realFlightNo,
			"shareFlightNo": data.segments[i].shareFlightNo,
			"flightSegment": data.segments.length, 
			"departureCode": data.segments[i].fromAirport,
			"arrivalCode": data.segments[i].toAirport,
			"subPrdId": null,
			"stopoverInfo": data.segments[i].stopOver,
			"flightDuration": data.segments[i].flightDuration,
			"flightNumber": data.segments[i].flightNo,
			"planeModel": data.segments[i].planeModel,
			"connectInfoid": -1
		}
		pltmOrderFlights.push(obj);
	}
	
	let pltmOrderPassengerList = passengerList;
		
	let params = {
		"pltmOrder": pltmOrder,
		"pltmOrderFlights": pltmOrderFlights,
		"pltmOrderPassengerList": pltmOrderPassengerList,
		"flightType": "1",
		"flightRangeType": "OW",
		"insureOrders": []
	}

	return {result:true,data:params};
}



/*
 * 
 * 将乘客的生日添加到数据中
 * 
 */
export const addPassengerBirthDay = (passengerList) => {
	for(let i=0;i<passengerList.length;i++){
		let obj = {};
		if(passengerList[i].docType==1){
			let docId = passengerList[i].docId;
			passengerList[i].birthDate = getBirthDay(docId);
		}
	}
	return passengerList;
}
