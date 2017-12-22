import { getSStore,removeSStore } from "@/utils/util"

export default {
	name: 'task',
	data() {
		return {	
			user:null,
			menus:[
				{
					name:'我的差旅',
					auth:true,					
					count:'',
					path:'/home/task/mytravel'
				},
				{
					name:'差旅审批',
					auth:true,
					count:'',
					path:'/home/task/travelapproval'					
				},
				{
					name:'行程预定',
					auth:true,
					count:'',
					path:'/home/task/travelbooking'					
				}
			],			
		}
	},
	computed: {
		
	},
	watch:{
		
	},
	methods: {
		
		//个人设置
		personalSetting(){
			this.$router.push({path:'/home/task/personalsetting'})
		}
	},
	components:{
		
	},
	created() {	
		this.user = JSON.parse(getSStore('user'));
	}
}