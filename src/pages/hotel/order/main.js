import {setSStore, getSStore, formatWeek, formatRoomDay, isDot} from '../../../utils/util';
import breadcrumb from '@/components/breadcrumb.vue'
import load from '@/components/load.vue'
export default {
	name: 'order',
	data() {
		return {
			breads:[
				{path:'/home',name:'首页'},
				{path:'/hotel/search',name:'预定酒店'},
				{path:'/hotel/shopping',name:'酒店列表'},
				{path:'',name:'预定信息',current:true}
			],
			counterVal:1,
			roomRate: '',
			roomVal: '',
			originRate:'',
			info: {
				checkIn:'',
				checkOut:'',
				checkInTime:'',
				checkOutTime:'',
				checkNum:0,
				weekIn:'',
				weekOut:''
			},
			formValidate: {
				ContactName:'',
				ContactGender: 'Maile',
				ContactMobile: '',
				ContactEmail: '',
				ContactPhone: null,
				ContactFax: null,
				ruleContent: '',
				infoArr:[{
					Name:'',
					Gender: 'Female',
					Mobile: '',
					Email: null,
					Phone: null,
					Fax: null,
					Nationality: ''
				}]
			},
			roomInfos:[],
			hotelInfo: [{
				name: '',
				address: '',
				roomType: '',
				roomLey: '',
				area: '',
				Broadnet:'',
				Floor: '',
				person: 0,
				Description: '',
				breakfast: '无'
			}],
			/*加载动画*/
			isLoading: false,
			/*请求参数*/
			CurrencyCode:'',
			PaymentType: null,
			RatePlanId: null,
			RoomTypeId: null,
			rule: null,
			hotelId: '',
			/*是否含有早餐*/
			valueAdds: [],
			/*是否超售*/
			isNotinrule:false
		}
	},
	computed: {
		
	},
	watch:{
		counterVal:function (val) {
			this.addNum();
			this.minus(val);
			if(val > 1){
				let sRate     = this.originRate * val;
				this.roomRate = isDot(sRate);
			}else{
				let eRate     = this.originRate;
				this.roomRate = isDot(eRate);
			}
		}	
	},
	methods: {
		//验证表单
		handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                	if(valid === true){
                		this.goPay();
                		return false;
                	}
                } else {
                    return false;	
                }
            })
        },
		addNum(){
			this.counterVal++;	
		    this.formValidate.infoArr.push({
				Name:'',
				Gender: 'Female',
				Mobile: '',
				Email: null,
				Phone: null,
				Fax: null,
				Nationality: ''
			})
		},
		minus(index){
			if(this.counterVal === 1){
				let eRate     = this.originRate;
				this.roomRate = isDot(eRate);
				return false;
			}
			let sRate = this.originRate / index;
			this.roomRate = isDot(sRate);
			this.counterVal--;

			if(this.formValidate.infoArr.length > 1) {
				this.formValidate.infoArr.splice(index, 1);
			}
		},
		backDetails(){
			this.$router.push({ path: '/hotel/' });
		},
		goPay(){
			for(let k of this.formValidate.infoArr){
				this.roomInfos.push({
					'Customers': {
						Name:        k.Name,
						Gender:      k.Gender,
						Mobile:      k.Mobile,
						Email:       k.Email,
						Phone:       k.Phone,
						Fax:         k.Fax,
						Nationality: k.Nationality
					}
				})
			}

			let detailsResult = JSON.parse(getSStore('DetailItems'));
			//let DetailsRes    = JSON.parse(getSStore('DetailsRes'));
			let params = {
				  "IsCreateOrderOnly": true,
				  "OrderValidation": null,
				  "Coupon": null,
				  "AffiliateConfirmationId": this.hotelId || '',
				  "ArrivalDate": this.info.checkIn  || '',
				  "ConfirmationType": "NotAllowedConfirm",
				  "Contact": {
					  	"Name":   this.formValidate.ContactName,
						"Gender": this.formValidate.ContactGender,
						"Mobile": this.formValidate.ContactMobile,
						"Email":  this.formValidate.ContactEmail,
						"Phone":  this.formValidate.ContactPhone,
						"Fax":    this.formValidate.ContactFax
				   }|| {},
				  "CreditCard": null,
				  "CurrencyCode": this.CurrencyCode,
				  "CustomerIPAddress": "106.39.87.104",
				  "CustomerPrice": null,
				  "CustomerType": "ChinaGuest",
				  "DepartureDate": this.info.checkOut || '',
				  "EarliestArrivalTime": this.info.checkInTime,
				  "ExtendInfo": null,
				  "HotelId": detailsResult.HotelId || '',
				  "Invoice": null,
				  "IsForceGuarantee": null,
				  "IsGuaranteeOrCharged": false,
				  "IsNeedInvoice": false,
				  "LatestArrivalTime": this.info.checkOutTime,
				  "NightlyRates": null,
				  "NoteToElong": null,
				  "NoteToHotel": null,
				  "NumberOfCustomers": this.counterVal || 1,
				  "NumberOfRooms": this.counterVal || 1,
				  "OrderRooms": this.roomInfos,
				  "PaymentType":this.PaymentType,
				  "RatePlanId": this.RatePlanId,
				  "RoomTypeId": this.RoomTypeId,
				  "SupplierCardNo": null,
				  "TotalPrice": this.roomRate || 0,
				  "HotelName":  this.hotelInfo.name
			};

			//发送数据 start			
			this.isLoading = true;
			this.$http.post("/hotel/orderNew",params)
				.then((res) => {
					let status = res.data.status;
					if(status&&status==1001){
						this.isLoading = false;
						let orderData = Object.assign({'roomRate':this.roomRate, 'roomNum':this.counterVal},this.info);
						let query = {
							'OrderId': res.data.data.result.OrderId,
							'type':    'hotel'
						}
						setSStore('payInfo', orderData);
						this.$Notice.error({
		                    title: '下单成功',
		                    desc: res.data.data.result.PaymentMessage
		                });
						this.$router.push({ path: '/hotel/pay', query });
						return;
					}
					if(status&&status==1002){
						this.isLoading = false;
						this.$Notice.error({
		                    title: '提交数据失败',
		                    desc:   res.data.data.code
		                });
					}
				})	
				.catch((res) => {					
					this.isLoading = false;
					this.$Notice.error({
	                    title: '提交数据失败',
	                    desc: "请检查网络连接，或更换搜索条件"
	                });
				})
				//发送数据 end	

		}
	},
	components:{
		breadcrumb,
		load
	},
	created() {
		//初始化请求数据
		let searchResult  = JSON.parse(getSStore('searchResult'));
		let detailsResult = JSON.parse(getSStore('DetailItems'));
		let DetailsRes    = JSON.parse(getSStore('DetailsRes'));
		let hotelOrderData  = JSON.parse(getSStore('hotelOrderData'));
		if(!searchResult || !detailsResult || !DetailsRes || !hotelOrderData){
			return;
		}
		this.info.checkIn  = searchResult.checkIn.substr(0,10)  || '';
		this.info.checkOut = searchResult.checkOut.substr(0,10) || '';
		this.info.checkInTime = searchResult.checkIn  || '';
		this.info.checkOutTime = searchResult.checkOut  || '';

		this.info.weekIn   = formatWeek((searchResult.checkIn).substr(0,10))   || '';
		this.info.weekOut  = formatWeek((searchResult.checkOut).substr(0,10))  || '';

		this.info.checkNum = formatRoomDay(searchResult.checkIn,searchResult.checkOut) || 0;

		this.originRate = detailsResult.TotalRate || 0;
		this.roomRate = isDot(this.originRate);

		this.hotelInfo.name = DetailsRes.HotelName || '';
		this.hotelInfo.address = DetailsRes.Address || '';
		this.hotelInfo.roomType = detailsResult.Name || '';

		this.hotelInfo.roomLey = detailsResult.BedType || '';
		this.hotelInfo.area    = detailsResult.Area || '';
		//是否有宽带 start
		let tempNum = '';
		if(detailsResult.Broadnet){
			switch(detailsResult.Broadnet){
				case '0':
				  tempNum = '无'
				  break;
				case '1':
				  tempNum = '免费宽带'
				  break;
				case '2':
				  tempNum = '收费宽带'
				  break;
				case '3':
				  tempNum = '免费WIFI'
				  break;
				case '4':
				  tempNum = '收费WIFI'
				  break;  
			}
			this.hotelInfo.Broadnet = tempNum;
		}
		//是否有宽带 end
		this.hotelInfo.Floor = detailsResult.Floor || '';
		this.hotelInfo.person = detailsResult.Capcity || 0;
		this.hotelInfo.Description = detailsResult.Description || '';
	
		this.hotelId  = hotelOrderData.hotelRouteId;
		this.CurrencyCode = detailsResult.CurrencyCode;
		this.PaymentType = detailsResult.PaymentType;
		this.RatePlanId  = detailsResult.RatePlanId;
		this.RoomTypeId  = detailsResult.RoomTypeId;
		if(detailsResult.rule == 'notinrule'){
			this.isNotinrule = true;
			this.rule = detailsResult.rule;
		}
	}
}