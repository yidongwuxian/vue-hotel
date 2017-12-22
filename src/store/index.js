import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import { getSStore } from '@/utils/util'
Vue.use(Vuex)

const state = {
	token:null,
	
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})