import { setStore, getStore, removeStore, Trim, getSStore, getBirthDay,setSStore } from "@/utils/util"
import breadcrumb from '@/components/breadcrumb.vue'
import load from '@/components/load.vue'
import { getOrderParams, addPassengerBirthDay } from './rules'
export default {
	data() {
		return {
			//面包屑导航
			breads: [
				{ path: '/home', name: '首页' },
				{ path: '/flight/search', name: '预定机票' },
				{ path: '/flight/shopping', name: '机票列表' },
				{ path: '', name: '乘机信息', current: true }
			],
			isLoading:false,
			//loading框的设置
			model:{
				text:'下单中 . . . ',
			},
			//证件类型
			certificates: [
				{ value: '1', label: '身份证' },
				{ value: '2', label: '护照' }
			],
			data: null, //航班信息
			index: null, //prices索引
			checkPrice: null, //验价后的实际价格信息
			//联系人
			contact: { 
				contactUser: '石松岩',
				contactMobile: '15516507061'
			},
			//乘机人
			passengerList: [{
				birthDate: "",
				lastName_cn: '石松岩',
				docId: '410423199209189056',
				passageType: 1,
				mobile: '15516507061',
				docType: '1'
			}], 
		}
	},
	computed: {

	},
	watch: {

	},
	methods: {
		//添加乘机人
		add() {
			this.passengerList.push({
				birthDate: "",
				lastName_cn: '',
				docId: '',
				passageType: 1,
				mobile: '',
				docType: '1'
			});
		},
		//删除乘机人
		del(index) {
			if(this.passengerList.length > 1) {
				this.passengerList.splice(index, 1);
			}
		},
		//支付
		pay() {
			
			let passengerList = addPassengerBirthDay(this.passengerList);
			let params = getOrderParams(this.data ,this.checkPrice, this.index,this.contact,passengerList);
			if(!params.result){
				this.$Message.error(params.msg);	
				return;
			}
			this.isLoading = true;
			this.$http.post('/order/create',params.data)
			.then((res) => {
				this.isLoading = false;
				let success = res.data.success;
				if(success){
					setSStore("flightOrderNo",res.data.obj)
					setSStore("flightPassengers",this.passengerList)
					this.$Message.success("下单成功");		
					this.$router.push({path:'/flight/pay',query:{type:'flight'}})
					return 
				}
				this.$Notice.error({
                    title: '下单失败',
                    desc: res.data.msg
                });
			})

		},
		
		//飞行时长
		duration(data) {
			var duration = 0;
			for(var i = 0; i < data.length; i++) {
				duration += data[i].flightDuration;
			}
			return duration;
		},
	},
	components: {
		breadcrumb,
		load
	},
	created() {
		this.data = JSON.parse(getSStore('flightData')).data;
		this.index = JSON.parse(getSStore('flightData')).index;
		this.checkPrice = JSON.parse(getSStore('checkPrice'));
	}
}