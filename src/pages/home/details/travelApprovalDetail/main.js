import breadcrumb from '@/components/breadcrumb.vue'//面包屑
import detailTop from '@/pages/home/details/components/detailTop.vue'//上部申请信息
import detailRoute from '@/pages/home/details/components/detailRoute.vue'//行程信息
import detailFlow from '@/pages/home/details/components/detailFlow.vue'//流程信息

export default {
	data() {
		return {
			//面包屑导航
			breads:[
				{path:'/home/task/travelapproval',name:'差旅审批'},
				{path:'',name:'审批详情',current:true}
			],
			applyData: {},
			passModal:false,
			refuseModal:false,
			remark:''
		}
	},
	computed: {

	},
	watch: {

	},
	methods: {
		//提交审核结果
		result(res) {
			this.$http.post(`/trip/audit/${res}`, { businessTripId: this.$route.query.id, remark: this.remark })
				.then((res) => {
					let success = res.data.success;
					if(success) {
						this.$Message.success("审批成功");
						this.$router.go(-1);
						return;
					}
					this.$Notice.error({
						title: '审批失败',
						desc: res.data.message
					});
				})
		},		
		//确定审核通过
		surePass(){
			this.result('1')
		},
		//确定审核失败
		sureRefuse(){
			this.result('2')
		},
		//获取审批信息
		getDetail() {
			this.$http.get(`/trip/applyDetail/${this.$route.query.id}`)
				.then((res) => {
					let success = res.data.success;
					if(success) {
						this.applyData = res.data.data;	
					} else {
						this.$Notice.error({
							title: '获取审批信息失败，请联系开发人员',
							desc: res.data.message
						});
					}
				})
		}
	},
	components: {
		breadcrumb,
		detailTop,
		detailRoute,
		detailFlow
	},
	created() {
		this.getDetail();
	}
}