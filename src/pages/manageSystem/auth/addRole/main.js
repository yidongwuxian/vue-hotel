export default {
	data() {
		return {
			edit:false,//是否是修改状态
			data: [{
				title: '企业管理系统',
				expand: true,
				children: [{
						title: '企业管理',
						expand: true,
						children: [{
								title: '企业信息'
							},
							{
								title: '配送信息'
							}
						]
					},
					{
						title: '部门管理',
						expand: true,
						children: [{
								title: '设置部门'
							},
							{
								title: '设置职级'
							}
						]
					}
				]
			}]
		}
	},
	computed: {

	},
	watch: {

	},
	methods: {
		submit(){
			console.log(this.$refs.Tree.getCheckedNodes())
		},
		back(){
			this.$router.go(-1)
		}
	},
	components: {

	},
	created() {
		let type = this.$route.query.type;
		//从修改入口进入
		if(type){
			this.edit = true;
		}
		
	}
}