export default {
	data() {
		return {
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
		submit() {

		},
		back() {
			this.$router.go(-1)
		},
		delAll() {

		}
	},
	components: {

	},
	created() {

	}
}