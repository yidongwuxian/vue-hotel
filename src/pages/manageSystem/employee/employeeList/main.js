import {setSStore, getSStore} from '../../../../utils/util';
export default {
	data() {
		return {
			employeeLists:[],
			searchParams: '',
			userType: '',
			userTypeStr: '',
			userState: '',
			userStateStr:'',
			delItemModal:false,
			delAllModal:false,
			/*是否选中*/
			isItemCheck: false,
			/*分页*/
			isPageShow:false,
			pageSize:4,
			total:0
		}
	},
	computed: {
	},
	watch:{
		
	},
	methods: {
		//展示数据
		initData(){
			let params = {
				 queryString: this.searchParams || '',
		         pageIndex:1,
		         pageSize:10
			};
			this.getData(params)
		},
		//数据请求
		getData(params){
			//发送数据 start			
			this.isLoading = true;
			this.$http.post("/user/list",params)
				.then((res) => {
					let status = res.data.success;
					if(status&&status==true){
						this.isLoading = false;
						this.ajaxData = res.data.data.data;
						if(this.ajaxData == ''){
							return;
						}
						//调用分页 start    
						this.total  = res.data.data.total;
						// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
		                if(this.total <= this.pageSize){
		                    this.employeeLists = this.ajaxData;
		                }else{
		                    this.employeeLists = this.ajaxData.slice(0,this.pageSize);
		                }
		                //是否显示分页
		                this.isPageShow = true;
		                //调用分页 end    
						return;
					}
				})	
				.catch((res) => {					
					this.isLoading = false;
					this.$Notice.error({
	                    title: '数据查询失败',
	                    desc: "请检查网络连接，或更换搜索条件"
	                });
				})
				//发送数据 end	
		},
		//搜索数据
		searchFn(){
			this.initData();
		},
		//分页
		handleChange(index) {
			let _start = ( index - 1 ) * this.pageSize;
            let _end = index * this.pageSize;
 			this.employeeLists = this.ajaxData.slice(_start,_end);
        },
		//编辑员工
		editItem(id){
			this.$router.push({ path: '/managesystem/employee/add', query:{id:id} });
		},
		//删除员工
		delItem(id,n){
			this.delItemModal = true;
			
		},
		//删除数据
		delData(id,n){
			//发送数据 start			
			this.isLoading = true;
			this.$http.post("/user/remove/"+id)
				.then((res) => {
					let status = res.data.success;
					if(status&&status==true){
						this.isLoading = false;
						this.$Message.info('数据删除成功！');
						this.employeeLists.splice(n, 1);
						this.initData();
						return;
					}
				})	
				.catch((res) => {					
					this.isLoading = false;
					this.$Notice.error({
	                    title: '数据删除失败',
	                    desc: "请检查网络连接，或更换搜索条件"
	                });
				})
				//发送数据 end	
		},
		//删除当前选中记录
		delItemModalOk(id,n){
			this.delData(id,n);
			this.handleChange(n);
		},
		delItemModalCancel(){},
		//删除全部
		delAllItem(){
			this.delAllModal = true;
		},
		delAllModalOk(){
			this.$Message.info('全部数据删除成功！');
			this.employeeLists = [];
		},
		delAllModalCancel(){}
	},
	components:{	
	},
	created() {
		this.initData()
	}
}