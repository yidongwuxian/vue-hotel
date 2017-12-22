import { setSStore,removeSStore,getSStore } from "@/utils/util"
import breadcrumb from '@/components/breadcrumb.vue'
import load from '@/components/load.vue'
import flight from './components/flight.vue'
import hotel from './components/hotel.vue'
import train from './components/train.vue'

export default {
	data() {
		return {
			payType:null,//支付来源
			//面包屑导航
			breads:'',
			model:{
				text:'支付中  . . . '
			},
			count:null,//支付的总价
			paying:false,//正在支付
		}
	},
	computed: {
		
	},
	watch:{
		
	},
	methods: {
		back(){
			this.$router.go(-1)
		},
		pay(){
			this.paying = true;
			if(this.payType=='hotel'){
				this.hotelPay();
			}
			if(this.payType=='flight'){
				this.flightPay();
			}
			if(this.payType=='train'){
				this.trainPay();
			}
		},
		hotelPay(){
			let orderId = this.$route.query.OrderId;
			let hotelOrderData = JSON.parse(getSStore('hotelOrderData'));

		    if(hotelOrderData){		    	
		        let par = {
			        orderId: orderId,
			        id:      hotelOrderData.hotelRouteId
			    }
		    	//发送数据 start			
				
				this.$http.post("/pay/hotelPay",par)
					.then((res) => {
						this.paying = false;
						let status = res.data.status;
						if(status&&status==1001){							
							this.$Notice.success({
			                    title: '支付成功',
			                    desc: res.data.message
			                });
			                this.$router.push({ path: '/home/task/travelbooking' }); 
						}else{
							this.$Notice.error({
			                    title: '支付失败',
			                    desc: res.data.message
			                });
						}
					})						
					//发送数据 end	
		   }			
		},
		flightPay(){
			let [id,orderNumber] = [getSStore('flightRouteId'),getSStore('flightOrderNo')];
			this.$http.post('pay/tmcPay',{'id':id,'orderNumber':orderNumber})
				.then((res) => {
					this.paying = false;
					let success = res.data.success;
					if(success){
						this.$Notice.success({
		                    title: '支付成功',
		                    desc: res.data.msg
		                });
		                this.$router.push({ path: '/home/task/travelbooking' }); 
					}else{
						this.$Notice.error({
		                    title: '支付失败',
		                    desc: res.data.msg
		                });
					}
				})				
		},
		trainPay(){
			this.$http.post('train/pay',{'orderId':JSON.parse(getSStore('trainOrderData')).merchant_order_id})
				.then((res) => {
					this.paying = false;
					let status = res.data.status;
					if(status==1001){
						this.$Notice.success({
		                    title: '支付成功',
		                    desc: res.data.msg
		                });
		                this.$router.push({ path: '/home/task/travelbooking' }); 
					}else{
						this.$Notice.error({
		                    title: '支付失败',
		                    desc: res.data.data.message
		                });
					}
				})			
		},
	},
	components:{
		breadcrumb,
		flight,
		hotel,
		train,
		load
	},
	created() {
		this.payType = this.$route.query.type;
		if(this.payType=='hotel'){
			this.breads = [
				{path:'/home',name:'首页'},
				{path:'/hotel/search',name:'预定酒店'},
				{path:'/hotel/shopping',name:'酒店列表'},
				{path:'/hotel/order',name:'住宿信息'},
				{path:'',name:'支付',current:true}
			]
			let roomRate = JSON.parse(getSStore('payInfo')).roomRate;//酒店总价
			let roomNum = JSON.parse(getSStore('payInfo')).roomNum;//房间数
			this.count = roomRate*roomNum;

		}else if(this.payType=='flight'){
			this.breads = [
				{path:'/home',name:'首页'},
				{path:'/flight/search',name:'预定机票'},
				{path:'/flight/shopping',name:'航班列表'},
				{path:'/flight/order',name:'乘机信息'},
				{path:'',name:'支付',current:true}
			]
			let price = JSON.parse(getSStore('checkPrice')).adultFacePrice;//机票价格
			let flightPassengersCount = JSON.parse(getSStore('flightPassengers')).length;//乘机人数
			this.count = price*flightPassengersCount;
		}else if(this.payType=='train'){
			this.breads = [
				{path:'/home',name:'首页'},
				{path:'/train/search',name:'预定火车票'},
				{path:'/train/shopping',name:'火车票列表'},
				{path:'/train/order',name:'订单信息'},
				{path:'',name:'支付',current:true}
			]
			this.count = JSON.parse(getSStore('trainOrderData')).pay_money;//火车票总价
		}
	}
}