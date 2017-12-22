import { formDate,getSStore,setSStore } from '@/utils/util'
import breadcrumb from '@/components/breadcrumb.vue'
import load from '@/components/load.vue'
export default {
	data() {
		return {
			//面包屑导航
			breads:[
				{path:'/home',name:'首页'},
				{path:'/train/search',name:'预定火车票'},
				{path:'/train/shopping',name:'火车票列表'},
				{path:'',name:'订单信息',current:true}
			],
			data:null,
			loading:false,
			ticketType:[
				{ value: '0', label: '成人票' },
				{ value: '1', label: '儿童票' },
			],
			seatTypes:[
				{ value: '0', label: '商务座' },
				{ value: '1', label: '特等座' },
				{ value: '2', label: '一等座' },
				{ value: '3', label: '二等座' },
				{ value: '4', label: '高级软卧' },
				{ value: '5', label: '软卧' },
				{ value: '6', label: '硬卧' },
				{ value: '7', label: '软座' },
				{ value: '8', label: '硬座' },
				{ value: '9', label: '无座' },
				{ value: '10', label: '其他' },
			],
			idsType:[
				{ value: '1', label: '一代身份证' },
				{ value: '2', label: '二代身份证' },
				{ value: '3', label: '港澳通行证' },
				{ value: '4', label: '台湾通行证' },
				{ value: '5', label: '护照' },
			],
			seatType:'0',
			passengers:[{
				bx:0,
				idsType:'2',
				ticketType:'0',
				userIds:null,
				userName:null,
			}]
			
		}
	},
	computed: {
		
	},
	watch:{
		
	},
	methods: {
		add(){
			this.passengers.push({
				bx:0,
				idsType:'2',
				ticketType:'0',
				userIds:null,
				userName:null,
			})
		},
		del(index){
			if(this.passengers.length>1){
				this.passengers.splice(index,1)
			}			
		},
		back(){
			this.$router.go(-1)
		},
		submit(){
			this.passengers.forEach((item) => {
				item.seattype = this.seatType;
			})
			let params = {
				'passengers':this.passengers,
				'merchantOrderId':null,
				'orderLevel':'0',
				'orderResultUrl':null,
				'bookResultUrl':null,
				'arriveStation':this.data.arrive_station,
				'arriveTime':this.data.arrive_time,
				'bxInvoice':null,
				'bxInvoiceAddress':null,
				'bxInvoicePhone':null,
				'bxInvoiceReceiver':null,
				'bxInvoiceZipcode':null,
				'fromStation':this.data.from_station,
				'fromTime':this.data.from_time,
				'linkAddress':null,
				'linkMail':null,
				'linkName':null,
				'linkPhone':null,
				'seatType':this.seatType,
				'smsNotify':null,
				'sumAmount':null,
				'ticketPrice':null,
				'trainCode':this.data.train_code,
				'travelTime':this.data.travel_time,
				'wzExt':null,
				'callbackId': getSStore('trainRouteId'),
			}
			this.loading = true;
			this.$http.post("/train/create",params)
				.then((res) => {
					this.loading = false;
					let status = res.data.status;
					if(status==1001){
						this.$Message.info("下单成功");
						setSStore('trainOrderData',res.data.data)
						setSStore('trainOrderPassengers',this.passengers)
						this.$router.push({path:'/train/pay',query:{type:'train'}})
					}
				})
		}
	},
	components:{
		load,
		breadcrumb,
	},
	created() {
		this.data = JSON.parse(getSStore('trainCheckTicket'));
	}
}