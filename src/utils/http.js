import axios from 'axios'
import { getSStore,setSStore } from "./util"


//升级token
function update(res){
	let headers = res.headers;
	for(var i in headers) {
		if(i == 'x-refresh-token') {
			if(headers[i] != getSStore("token")){
				setSStore("token",headers[i]);
			}
		}
	}
}




export default {
	
	get:function(url,params){
		axios.defaults.headers.common['Authorization'] = getSStore("token");
		return axios.get(url,params)
			.then((res) => {
				update(res)
				return res;
			})
	},
	post:function(url,data){		
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.common['Authorization'] = getSStore("token");
		if(url=="/user/login"){          //登录不需要token
			axios.defaults.headers.common['Authorization'] = "";
		}
		return axios.post(url,data)
			.then((res) => {
				update(res)
				return res;
			})
	}
}












