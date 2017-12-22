import { formDate,getCityCode } from '@/utils/util'
import breadcrumb from '@/components/breadcrumb.vue'
import FlightCityInputer from '@/components/Flight-city.vue'
export default {
	data() {
		return {
			//面包屑导航
			breads:[
				{path:'/home',name:'首页'},
				{path:'',name:'预定机票',current:true}
			],
			query:{
				deptCity:null,
				arrCity:null,
				deptStartDate:null,
			}
		}
	},
	computed: {
		
	},
	watch:{
		
	},
	methods: {
		//搜索
		search(){
			if(this.query.deptCity==""||this.query.arrCity==""||this.query.deptStartDate==""){
				this.$Message.error('请输入完整的搜索信息');
				return false;
			}
			
			
			this.query.deptStartDate = formDate(this.query.deptStartDate);	
			
			this.$router.push({path:"/flight/shopping",query:this.query})
		}
	},
	components:{
		breadcrumb,
		FlightCityInputer,
	},
	created() {
		const query = this.$route.query;		
		if(query.deptCity){			
			this.query.deptCity = query.deptCity;
			this.query.arrCity = query.arrCity;
			this.query.deptStartDate = query.deptDate;			
		}
	}
}