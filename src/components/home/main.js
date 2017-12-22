import { setSStore,removeSStore } from "@/utils/util"

export default {
	name: 'home',
	data() {
		return {
			
		}
	},
	computed: {
		
	},
	watch:{
		
	},
	methods: {
		manageSistem(){
			this.$router.push({path:"/managesystem"})
		},
		//退出
		logOut(){
			window.sessionStorage.clear();
			this.$Message.success("退出成功");		//提示退出成功
			this.$router.push({path:'/'})
		},
		home(){
			this.$router.push({path:'/home'})
		}
	},
	components:{
		
	},
	created() {
		
	}
}