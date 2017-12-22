/**
 * 用户名密码的校验
 */
export const loginVerify = (data) => {
	let userName = data.username;
	let passWord = data.password;
	let reg = /^[A-Za-z0-9]{6,20}$/;//6-20位字母数字组合
	if(userName==""||passWord==""){
		return {result:false,msg:"用户名密码不能为空"};
	}
	if(!reg.test(passWord)){
		return {result:false,msg:"密码为6-20位字母数字组合"};
	}
	return {result:true,msg:"success"};
}