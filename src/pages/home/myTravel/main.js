
export default {
	data() {
		return {
			data:null,
			//筛选的条件
			activeFilterType:'all',
			filterType:[
				{
					name:'全部',
					type:'all',
					url:'/trip/listMyApply'
				},
				{
					name:'待审批',
					type:'pending',
					url:'/trip/listMyApply?tripState=1'
				},				
				{
					name:'已完成',
					type:'done',
					url:'/trip/listMyApply?tripState=2'
				},
				{
					name:'已驳回',
					type:'reserving',
					url:'/trip/listMyApply?tripState=3'
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
			this.getMyTravel(url)
		},
		//计算人数
		count(tripPersons){
			return tripPersons.split(";").length;
		},
		getMyTravel(url='/trip/listMyApply'){
			this.$http.get(url)
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
		}
	},
	components:{
		
	},
	created() {
		this.getMyTravel()
	}
}