import Title from '@/components/Title'
import { Trim,setStore,getSStore,removeStore } from "@/utils/util"
export default {
	data() {
		return {
			orderDetail: [],
			OrderRooms: []		
		}
	},
	computed: {
		
	},
	watch:{
		
	},
	methods: {
		getData(params){
			//发送数据 start			
			this.isLoading = true;
			this.$http.post("/hotel/orderDetail",{OrderId: params.OrderId})
				.then((res) => {
					let status = res.data.status;
					if(status&&status==1001){
						this.isLoading = false;
						this.orderDetail = res.data.data.result;
						this.OrderRooms = res.data.data.result.OrderRooms;
						return;
					}
					if(status&&status==1002){
						this.isLoading = false;
						this.$Notice.error({
		                    title: '获取数据失败',
		                    desc:   res.data.data.code
		                });
					}
				})	
				.catch((res) => {					
					this.isLoading = false;
					this.$Notice.error({
	                    title: '获取数据失败',
	                    desc: "请检查网络连接，或更换搜索条件"
	                });
				})
				//发送数据 end	
		},
		//返回订单列表
		goBack(){
			this.$router.push({path:'/home/task/travelbooking'});
		}
	},
	components:{
		Title
	},
	created() {
		let hoteldetailId = JSON.parse(getSStore('hoteldetailId'));
		if(hoteldetailId =='' || hoteldetailId == null){
			return;
		}
		this.getData(hoteldetailId)
	}
}