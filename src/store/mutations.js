import {
	USER,	
} from './mutation-types.js'

import { 
	setSStore,
} from '@/utils/util'

export default {
	//验证登录
	[USER](state,val){
		state.user = setSStore('user',val);		
	}
}