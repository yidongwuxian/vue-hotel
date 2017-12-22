import ruleTable from '../components/ruleTable.vue'
export default {
	data() {
		return {
			text:'酒店差旅规则',
			addModel:false,
			levelList:[
				{
					value: 1,
                    label: '一线城市'
               	}
			],
			rankList:[
				{
					value: 1,
                    label: '一级员工'
				},{
					value: 2,
                    label: '二级员工'
				},{
					value: 3,
                    label: '三级员工'
				},
			],
			data:null,
			
			newRule:{
				level:1,
				cityLevel:1,
				firstLevelCityPrice:null,
				secondLevelCityPrice:null,
				thirdLevelCityPrice:null,
				defaultLevelCityPrice:null,
				status:0,
			}
		}
	},
	computed: {

	},
	watch: {

	},
	methods: {
		add(){
			this.addModel = true;
		},
		//激活规则
		active(id){
			this.$http.post(`/rule/hotelRule/enable/${id}/1`)
				.then((res) => {
					let success = res.data.success;
					if(success){
						this.$Message.success('激活规则成功！');
						this.getData();
						return;
					}
					this.$Notice.error({
	                    title: '删激活失败',
	                    desc: res.data.message
	                });
				})
		},
		del(id){
			this.$http.post(`/rule/hotelRule/remove/${id}`)
				.then((res) => {
					let success = res.data.success;
					if(success){
						this.$Message.success('删除规则成功！');
						this.getData();
						return;
					}
					this.$Notice.error({
	                    title: '删除失败',
	                    desc: res.data.message
	                });
				})
		},
		sure(){
			this.$http.post('/rule/hotelRule/save',this.newRule)
				.then((res) => {
					let success = res.data.success;
					if(success){
						this.$Message.success('新增成功！');
						this.getData();
						return;
					}
					this.$Notice.error({
	                    title: '新增失败',
	                    desc: res.data.message
	                });
				})
		},
		cancel(){
			
		},
		//获取列表
		getData(){
			this.$http.get('/rule/hotelRule/list')
				.then((res) => {
					let success = res.data.success;
					if(success){
						this.data = res.data.data;
						return;
					}
					this.$Notice.error({
	                    title: '获取规则列表失败',
	                    desc: res.data.message
	                });
				})
		}
	},
	components: {
		ruleTable,
	},
	created() {
		this.getData();
	}
}