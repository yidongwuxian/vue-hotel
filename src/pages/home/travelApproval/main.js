import { getSStore,setSStore } from "@/utils/util"
export default {
	data() {
		return {
			data:null,
			//筛选的条件
			activeFilterType:'0',
			filterType:[
				{
					name:'全部',
					type:'0'
				},
				{
					name:'待审批',
					type:'1'
				},
				{
					name:'已审批',
					type:'2'
				},
			],
		}
	},
	computed: {
		
	},
	watch:{
		
	},
	methods: {
		//过滤
		chooseFilterType(type){
			this.activeFilterType = type;
			this.getData(this.activeFilterType)
		},
		//计算人数
		count(tripPersons){
			return tripPersons.split(";").length;
		},
		getData(type){
			this.$http.get(`/trip/listActingAll/${type}`)
				.then((res) => {
					let success = res.data.success;
					if(success){
						this.data = res.data.data;						
					}else{
						this.$Notice.error({
		                    title: '获取数据失败',
		                    desc: res.data.message
		                });
					}
				})
		},
		toOrder(data,type){
			/*住宿*/
			if(type=='hotel'){	
				let params = {
					'OrderId': data.orderNumber || '171880784'
				}
				setSStore('hoteldetailId', params)
				window.open('#/home/hotelorderdetail')
				return;
			}
			/*行程*/
			const orderNumber = data.orderNumber;
			//机票
			if(data.routeType==1){				
				window.open('#/home/flightorderdetail?orderNumber'+orderNumber)
				return;
			}
			//火车
			if(data.routeType==2){
				window.open('#/home/trainorderdetail?orderNumber'+orderNumber)
				return;
			}
			//其他
			if(data.routeType==3){
				alert("请稍等")
				return;
			}
			
		}
	},
	components:{
		
	},
	created() {
		this.getData(this.activeFilterType)
	}
}