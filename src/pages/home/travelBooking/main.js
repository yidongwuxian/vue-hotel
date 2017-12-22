import { getSStore,setSStore,formDate } from "@/utils/util"
export default {
	data() {
		return {
			data:null,
			cityCode: '',
			//筛选的条件
			activeFilterType:'all',
			filterType:[
				{
					name:'全部',
					type:'all',
					url:'/trip/listSubActingAll'
				},
				{
					name:'待预定',
					type:'reserving',
					url:'/trip/listSubActingAll?type=0'
				},
				{
					name:'已预订',
					type:'reserved',
					url:'/trip/listSubActingAll?type=1'
				},
				{
					name:'已完成',
					type:'done',
					url:'/trip/listSubActingAll?type=2'
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
		chooseFilterType(type,url){
			this.activeFilterType = type;
			this.getData(url)
		},
		//计算人数
		count(tripPersons){
			return tripPersons.split(";").length;
		},
		getData(url='/trip/listSubActingAll'){
			this.$http.get(url)
				.then((res) => {
					let success = res.data.success;
					if(success){
						this.data = res.data.data;						
						return;
					}
					this.$Notice.error({
	                    title: '获取数据失败',
	                    desc: res.data.message
	                });
				})
		},
		//预订
		booking(item,data,type){
			let createUser = data.createUser;
			setSStore('createUser',createUser);
			/*住宿*/
			if(type=='hotel'){
				//初始化城市代码 start
		            this.isLoading = true;
		            this.$http.get("/common/hotelcity")
		                .then((res) => {
		                    this.isLoading = false;
		                    let hotelcitys = res.data;
		                    hotelcitys.map((n,index) => {
		                    	if(n.cityName === item.tripLocation){
		                    		let params = Object.assign( {'hotelRouteId':data.id, 'cityCode': n.cityCode}, item );
									setSStore('hotelOrderData',params );				
									this.$router.push({path:'/hotel'})
		                    	}
		                    });
		                    return;
		                })
		                .catch((res) => {
		                    this.isLoading = false;
		                })

		        //初始化城市代码 end
				return;
			}
			/*行程*/
			//机票
			if(data.routeType==1){				
				setSStore('flightRouteId',data.id);
				this.$router.push({path:'/flight',query:{deptCity:data.deptCity,arrCity:data.arrCity,deptDate:formDate(data.deptDate)}});
				return;
			}
			//火车
			if(data.routeType==2){				
				setSStore('trainRouteId',data.id);
				this.$router.push({path:'/train',query:{deptCity:data.deptCity,arrCity:data.arrCity,deptDate:formDate(data.deptDate)}});
				return;
			}	
			//其他
			if(data.routeType==3){				
				alert("膜拜单车已在接您的路上，请稍等")
				return;
			}	
		},
		//订单详情
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
		this.getData()
		
	}
}