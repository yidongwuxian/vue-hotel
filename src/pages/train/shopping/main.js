import { formDate,setSStore } from '@/utils/util'
import breadcrumb from '@/components/breadcrumb.vue'
import frontAndBack from '@/components/frontAndBack.vue'
import sortSign from '@/components/sortSign.vue'
import load from '@/components/load.vue'
import TrainCityInputer from '@/components/Train-city.vue'
export default {
	data() {
		return {
			//面包屑导航
			breads:[
				{path:'/home',name:'首页'},
				{path:'/train/search',name:'预定火车票'},
				{path:'',name:'火车票列表',current:true}
			],
			query:{
				fromStation:null,
				arrStation:null,
				departTime:null,
			},
			loading:false,
			data:null,
		}
	},
	computed: {
		noRes(){
			if(this.data==null){
				return false;
			}
			return true;
		}
	},
	watch:{
		
	},
	methods: {
		search(){	
			this.query.departTime = formDate(this.query.departTime);
			this.shopping(this.query);	
		},
		booking(item){			
			let that = this;
			that.loading = true;
			let params = {
				"trainCode":item.train_code,
				"departTime":formDate(this.query.departTime),
				"fromStation":item.from_station,
				"arrStation":item.arrive_station
			}
			//验证 余票 
			function checkTicket(){
				that.$http.post("/train/checkTicket",params)
					.then((res) => {
						that.loading = false;
						let status = res.data.status;
						if(status==1001){
							let resData = res.data.data;
							resData.travel_time = formDate(that.query.departTime);
							setSStore('trainCheckTicket',resData)
							g.next();							
						}else{
							that.$Notice.error({
			                    title: '验证余票失败',
			                    desc: res.data.message
			                });
						}						
					})
			}
			function* gen(){
				yield checkTicket();
				that.$router.push({path:'/train/order'})
			}
			let g = gen()
			g.next()
		},
		
		//前一天//后一天
		getDate(Date){
			this.query.departTime = Date;
			this.search();
		},
		shopping(params){
			this.loading = true;
			this.$http.post("/train/search",params)
				.then((res) => {
					this.loading = false;
					let status = res.data.status;
					if(status&&status==1001){
						let train_data = res.data.data.train_data;
						this.data = train_data;
						//列车为空
						if(train_data.length==0){
							this.data = null;
							this.$Message.info("搜索的列车为空");
							return;
						}	
						return;
					}
					this.$Notice.error({
	                    title: '查询失败',
	                    desc: res.data.data.message
	                });
					this.data = null;
				})
				.catch((res) => {
					this.loading = false;
					this.data = null;
					this.$Notice.error({
	                    title: '查询失败',
	                    desc: "请检查网络连接，或更换搜索条件"
	                });
				})
		}
	},
	components:{
		breadcrumb,
		frontAndBack,
		sortSign,
		load,
		TrainCityInputer
	},
	created() {
		//获取路由中的查询条件
		let query = {...this.$route.query};
		//查询
		if(JSON.stringify(query) != '{}'){
			this.shopping(query);
		}	
		//赋值给当前页面
		Object.assign(this.query,query);
		
	}
}