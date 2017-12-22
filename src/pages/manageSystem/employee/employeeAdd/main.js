import {formatDate, setSStore, getSStore} from '../../../../utils/util';
export default {
	data() {
		return {
			//表单元素
			employeeAddForm: {
				username:'',
				password: '',
				name: '刘哲',
				phone: '13542154125',
				role: '30',
				surname: 'liu',
				fame: 'zhe',
				nationality: '中国',
				number: '1301',
				department: '技术部',
				rank: '',
				nickname: '',
				email: '8545878@qq.com',
				gender: '1',
				birthday: '',
				identificationType: '',
				identificationNo: '',
				identificationValidity: ''
			},
			name:'',
			employeeArrs: [],
			addForm: true,
			tipModal: false,
			typeIds: '',
			//验证规则
			ruleValidate: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { type: 'regexp', pattern: /^[\x00-\xff]{6,}$/, message: '密码至少6位以上', trigger: 'change' }

                ],
                name:[
                	{ required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机号码不能为空', trigger: 'blur' },
                    {  pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '手机号码不正确', trigger: 'blur' }
                ],
                surname:[
                	{ required: true, message: '姓(英)不能为空', trigger: 'blur' }
                ],
                fame:[
                	{ required: true, message: '姓(英)不能为空', trigger: 'blur' }
                ],
                nationality: [
                	{ required: true, message: '国籍不能为空', trigger: 'blur' }
                ],
                number: [
                	{ required: true, message: '员工编号不能为空', trigger: 'blur' }
                ],
                nickname:[
                	{ required: true, message: '昵称不能为空', trigger: 'blur' }
                ],
                email:[
                	{ required: true, message: '企业邮箱不能为空', trigger: 'blur' }
                ]
            },
		}
	},
	computed: {
		
	},
	watch:{
		
	},
	methods: {
		//新增
		add(){
	    	this.employeeAddForm.birthday = formatDate(this.employeeAddForm.birthday).substr(0,10);
			this.employeeAddForm.identificationValidity = formatDate(this.employeeAddForm.identificationValidity).substr(0,10);
			let params={
				username:                   this.employeeAddForm.username,
				password:                   this.employeeAddForm.password,
                realname:                   this.employeeAddForm.name,
				phoneNumber:                this.employeeAddForm.phone,
				userType:                   this.employeeAddForm.role,
				userState:                  '1',
				firstName:                  this.employeeAddForm.surname,
				lastName:                   this.employeeAddForm.fame,
				nationality:                this.employeeAddForm.nationality,
				identifier:                 this.employeeAddForm.number,
				nickname:                   this.employeeAddForm.nickname,
				email:                      this.employeeAddForm.email,
				gender:                     this.employeeAddForm.gender,
				birthdate:                  this.employeeAddForm.birthday,
				docType:                    this.employeeAddForm.identificationType,
				docNumber:                  this.employeeAddForm.identificationNo,
				doExpirySate:               this.employeeAddForm.identificationValidity
            };
            this.getData(params)
		},
		//编辑
		edit(){
			this.employeeAddForm.birthday = formatDate(this.employeeAddForm.birthday).substr(0,10);
			this.employeeAddForm.identificationValidity = formatDate(this.employeeAddForm.identificationValidity).substr(0,10);
			let params={
				username:                   this.employeeAddForm.username,
				password:                   this.employeeAddForm.password,
                realname:                   this.employeeAddForm.name,
				phoneNumber:                this.employeeAddForm.phone,
				userType:                   this.employeeAddForm.role,
				userState:                  '1',
				firstName:                  this.employeeAddForm.surname,
				lastName:                   this.employeeAddForm.fame,
				nationality:                this.employeeAddForm.nationality,
				identifier:                 this.employeeAddForm.number,
				nickname:                   this.employeeAddForm.nickname,
				email:                      this.employeeAddForm.email,
				gender:                     this.employeeAddForm.gender,
				birthdate:                  this.employeeAddForm.birthday,
				docType:                    this.employeeAddForm.identificationType,
				docNumber:                  this.employeeAddForm.identificationNo,
				doExpirySate:               this.employeeAddForm.identificationValidity
            };
			//发送数据 start			
			this.isLoading = true;
			this.$http.post("/user/update/"+this.typeIds, params)
				.then((res) => {
					let status = res.data.success;
					if(status&&status==true){
						this.isLoading = false;
						this.$Message.info('数据修改成功！');
						this.$router.push({ path: '/managesystem/employee/list' });
						return;
					}
				})	
				.catch((res) => {					
					this.isLoading = false;
					this.$Notice.error({
	                    title: '数据编辑失败',
	                    desc: "请检查网络连接，或更换搜索条件"
	                });
				})
				//发送数据 end	
		},
		//返回
		back(){
			this.$router.go(-1)
		},
		//数据请求
		getData(params){
			//发送数据 start			
			this.isLoading = true;
			this.$http.post("/user/save",params)
				.then((res) => {
					let status = res.data.success;
					if(status&&status==true){
						this.isLoading = false;
						this.tipModal  = true;
						return;
					}
				})	
				.catch((res) => {					
					this.isLoading = false;
					this.$Notice.error({
	                    title: '提交数据失败',
	                    desc: "请检查网络连接，或更换搜索条件"
	                });
				})
				//发送数据 end	
		},
		tipModalOk(){
			this.$router.push({ path: '/managesystem/employee/list' });
		},
		tipModalCancel(){

		},
		//获取详情接口数据
		getDetail(id){
			//发送数据 start			
			this.isLoading = true;
			this.$http.get("/user/detail/"+id)
				.then((res) => {
					let status = res.data.success;
					let data   = res.data.data;
					if(status&&status==true){
						this.isLoading = false;
						
						if(data.docType && data.docType === 1){
							this.employeeAddForm.identificationType = '1'; 
						}
						if(data.docType && data.docType === 2){
							this.employeeAddForm.identificationType = '2'; 
						}
						this.employeeAddForm.username                = data.username;
						this.employeeAddForm.name                    = data.realname;
						this.employeeAddForm.phone                   = data.phoneNumber;
						this.employeeAddForm.role                    = data.userType;
						this.employeeAddForm.surname                 = data.firstName;
						this.employeeAddForm.fame                    = data.lastName;
					    this.employeeAddForm.nationality             = data.nationality;
						this.employeeAddForm.number                  = data.identifier;
						this.employeeAddForm.department              = '';
						this.employeeAddForm.rank                    = '';
						this.employeeAddForm.nickname                = data.nickname;
						this.employeeAddForm.email                   = data.email;
						this.employeeAddForm.gender                  = data.gender;
						this.employeeAddForm.birthday                = data.birthdate;
						this.employeeAddForm.identificationNo        = data.docNumber;
						this.employeeAddForm.identificationValidity  = data.doExpirySate;
						return;
					}
				})	
				.catch((res) => {					
					this.isLoading = false;
					this.$Notice.error({
	                    title: '数据详情获取失败',
	                    desc: "请检查网络连接，或更换搜索条件"
	                });
				})
				//发送数据 end	
		},
	},
	components:{
		
	},
	created() {
		this.employeeAddForm.identificationType = '1';
		this.typeIds = this.$route.query.id;
		if(this.typeIds){
			this.addForm = false;
			this.getDetail(this.typeIds);
		}
	}
}