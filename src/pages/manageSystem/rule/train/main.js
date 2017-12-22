import ruleTable from '../components/ruleTable.vue'
export default {
	data() {
		return {
			text:'火车差旅规则',
			addModel:false,
			
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
				trainType:1,
				seatLevel:1,				
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
			this.$http.post(`/rule/trainTicketRule/enable/${id}/1`)
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
			this.$http.post(`/rule/trainTicketRule/remove/${id}`)
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
			if(this.newRule.seatLevel<=4){
				this.newRule.trainType = 1
			}
			if(4<this.newRule.seatLevel<=10){
				this.newRule.trainType = 2
			}
			if(10<this.newRule.seatLevel){
				this.newRule.trainType = 3
			}
			this.$http.post('/rule/trainTicketRule/save',this.newRule)
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
			this.$http.get('/rule/trainTicketRule/list')
				.then((res) => {
					let success = res.data.success;
					if(success){
						this.data = res.data.data;
						if(this.data.length==0){
							this.$Notice.info({
			                    title: '尚无规则',
			                    desc: "赶紧添加规则吧"
			                });
						}
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