import ruleTable from '../components/ruleTable.vue'
export default {
	data() {
		return {
			text:'机票差旅规则',
			addModel:false,
			data:null,
			staffLevel:[
				{
					value: 1,
                    label: '董事长'
               	},
               	{
					value: 2,
                    label: '总经理'
               	},
               	{
					value: 3,
                    label: '普通员工'
               	}
			],
			//新增机票规则的参数
			newRule:{
				level:1,
				type:1,
				discountStart:null,
				discountEnd:null,
				status:0,
			},
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
			this.$http.post(`/rule/domesticTicketRule/enable/${id}/1`)
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
		//删除规则
		del(id){
			this.$http.post(`/rule/domesticTicketRule/remove/${id}`)
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
		//模态框确定
		sure(){
			this.$http.post('/rule/domesticTicketRule/save',this.newRule)
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
		//模态框取消
		cancel(){
			
		},
		//获取列表
		getData(){
			this.$http.get('/rule/domesticTicketRule/list')
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