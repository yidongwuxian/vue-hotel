import { setStore,getStore,removeStore,Trim,setSStore } from "@/utils/util"
import { loginVerify } from "@/utils/verifys"

export default {
	name: 'login',
	data() {
		return {
			userName:"",//用户名
			passWord:"",//密码
			remember:true,//是否记住密码
			loading:false,//登录中。。。
		}
	},
	computed: {
		
	},
	watch:{
		
	},
	methods: {
		
		//登录
		login(){	
			let data = {
				username:Trim(this.userName),
				password:Trim(this.passWord)
			}
			//校验
			let verify = loginVerify(data);
			//校验结果
			if(!verify.result){
				//提示信息
				this.$Message.error(verify.msg);				
				return;
			}
			//登录请求
			this.loading = true;
			this.$http.post("/user/login",data)
				.then((res) => {
					this.loading = false;
					let msg = res.data.msg;
					if(msg&&msg=="success"){ //登录成功
						this.loading = false;//取消登录按钮的登录状态
						this.$Message.success("登录成功");		//提示登录成功
						this.isRememberPassword(data);//记住密码操作
						setSStore('user',res.data)//将登陆者的信息存入sessionStorage
						setSStore('token',res.data.token)//将登陆者token信息存入sessionStorage
						this.$router.push({ path: '/home' });//页面跳转
						return;
					}
					this.$Notice.error({
	                    title: '登录失败',
	                    desc: res.data.msg
	                });
				})	
				.catch((res) => {					
					this.loading = false;
					this.$Notice.error({
	                    title: '登录失败',
	                    desc: "请检查网络连接"
	                });
				})
		},
		//忘记密码
		forgetPassword(){
			console.log(this.passWord)
		},
		//注册
		register(){
			console.log(1)
		},
		//是否记住密码
		isRememberPassword(data){
			if(this.remember){
				setStore("loginMess",data);
				return;
			}
			if(getStore("loginMess")){
				removeStore("loginMess")
			}			
		},
		//获取用户名密码
		getLoginMess(){
			let loginMess = getStore("loginMess");
			if(loginMess){
				this.userName = loginMess.username;
				this.passWord = loginMess.password;
			}
		}
	},
	created() {
		//页面进入首先获取用户名密码
		this.getLoginMess();
		
	}
}