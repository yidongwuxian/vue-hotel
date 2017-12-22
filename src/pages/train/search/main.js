import { formDate } from '@/utils/util'
import breadcrumb from '@/components/breadcrumb.vue'
import TrainCityInputer from '@/components/Train-city.vue'
export default {
	data() {
		return {
			//面包屑导航
			breads:[
				{path:'/home',name:'首页'},
				{path:'',name:'预定火车票',current:true}
			],
			query:{
				fromStation:'',
				arrStation:'',
				departTime:null,
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
			this.query.departTime = formDate(this.query.departTime);
			this.$router.push({path:'/train/shopping',query:this.query})
		}
	},
	components:{
		breadcrumb,
		TrainCityInputer,
	},
	created() {
		const query = this.$route.query;		
		if(query.deptCity){
			this.query.fromStation = query.deptCity;
			this.query.arrStation = query.arrCity;
			this.query.departTime = query.deptDate;
		}
	}
}