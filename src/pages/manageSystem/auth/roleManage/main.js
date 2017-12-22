

export default {
	data() {
		return {
			
		}
	},
	computed: {
		
	},
	watch:{
		
	},
	methods: {
		//添加角色
		addRole(){
			this.$router.push({path:'/managesystem/auth/addrole'})
		},
		//修改角色
		editRole(){
			this.$router.push({path:'/managesystem/auth/editrole',query:{type:'edit'}})
			
		},
		//删除角色
		deleteRole(){
			console.log("1")
			
		},
		//角色成员管理
		memberManage(){
			this.$router.push({path:'/managesystem/auth/membermanage'})
			
		}
	},
	components:{
		
	},
	created() {
		
	}
}