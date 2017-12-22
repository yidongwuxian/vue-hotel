import { formDate,setSStore,getSStore,getCityCode } from '@/utils/util'
import sortSign from '@/components/sortSign'
import breadcrumb from '@/components/breadcrumb.vue'
import frontAndBack from '@/components/frontAndBack.vue'
import FlightCityInputer from '@/components/Flight-city.vue'
import lodash from 'lodash'
import { getCheckPriceParams } from './rules'
export default {
	data() {
		return {
			breads:[
				{path:'/home',name:'首页'},
				{path:'/flight/search',name:'预定机票'},
				{path:'',name:'航班列表',current:true}
			],
			//类型1
			type1:[
				{value:'Y',label:'经济舱'},
				{value:'F',label:'头等舱'},
				{value:'C',label:'商务舱'}
			],
			//类型2
			type2:[
				{value:'1',label:'1人'},
				{value:'2',label:'2人'},
				{value:'3',label:'3人'},
				{value:'4',label:'4人'},
				{value:'5',label:'5人'},
				{value:'6',label:'6人'},
				{value:'7',label:'7人'},
				{value:'8',label:'8人'},
				{value:'9',label:'9人'},
			],
			//验价实际价格
			realAdultFacePrice:null,
			//价格调整模态框
			priceChange:false,
			data:null,
			defaultQuery:{deptEndDate:"",seatClass:'Y',routingType:'OW',adtCnt:'0',chdCnt:'0',infCnt:'0',sortType:'price_asc',applyUser:getSStore('createUser')},
			query:{
				deptCity:null,
				arrCity:null,
				deptStartDate:null,
				seatClass:null,
				adtCnt:null
			},
			/*加载动画*/
			spinShow:false,
			/*排序*/
			sortWay:{
				price:null,
				depart:null
			},
			//退改签的规则
			endorseRules:[],
		}
	},
	computed: {
		noRes(){
			if(this.data==null){
				return false;
			}
			return true;
		}
	},
	watch:{
		
	},
	methods: {
		//点击搜索
		search(){
			let params = Object.assign(this.query,{deptStartDate:formDate(this.query.deptStartDate)})
			this.shopping(params)
		},
		//点击预定
		preDing(data,index=0){
			setSStore('flightData',{'index':index,'data':data});			
			this.checkPrice(data,index)
		},
		//验价
		checkPrice(data,index){
			this.spinShow = true;
			let params = getCheckPriceParams(data,index)			
			this.$http.post('/shopping/orderConfirm',params)
				.then((res) => {
					this.spinShow = false;
					let status = res.data.status;
					if(status==1001){  //验价成功
						setSStore('checkPrice',res.data.data);//存入验价后的信息
						let realAdultFacePrice = res.data.data.adultFacePrice;//实际价格
						let adultFacePrice = data.prices[index].adultFacePrice;//当前显示价格
						//价格相符
						if(realAdultFacePrice == adultFacePrice){ 
							this.$router.push({path:'/flight/order'});
						}else{
							this.realAdultFacePrice = realAdultFacePrice;
							//价格调整
							this.priceChange = true;
						}						
					}else{
						this.$Notice.error({
		                    title: '验价失败',
		                    desc: res.data.message
		                });	
					}									
				})
				.catch((err) => {
					this.spinShow = false;
				})
		},
		/*价格调整确定购买*/
		sureBuy(){
			this.$router.push({path:'/flight/order'});
		},
		/*价格调整取消购买*/
		cancelBuy(){
			this.search();
		},
		//舱位的显示隐藏
		showHide(data){
			data.show = !data.show;
		},
		//城市交换
		exchange(){
			let ex = this.query.deptCity;
			this.query.deptCity = this.query.arrCity;
			this.query.arrCity = ex;
		},
		//前一天//后一天
		getDate(Date){
			this.query.deptStartDate = Date;
			this.search();
		},
		//退改签规则
		endorseS(data,item){
			data.show = true;
			const params = {
				airCompany:(item.segments[0].flightNo).substr(0,2),
				fromAirport:item.segments[0].fromAirport,
				toAirport:item.segments[0].toAirport,
				cabinInfo:data.cabinList[0].cabinCode,
				fromDate:(item.segments[0].fromDate).substr(0,10),
				lastUpdateTime:null,
				pageNo:1,
				countPerPage:10,
			}
			this.$http.post('refundEndorse/rule',params)
				.then((res) => {
					this.endorseRules = [
						{'title':'退票规定:','content':res.data.data.endorsementRule[0].refundRule},
						{'title':'签转规定:','content':res.data.data.endorsementRule[0].endorseRule},
						{'title':'更改规定:','content':res.data.data.endorsementRule[0].changeRule},
						{'title':'备注:','content':res.data.data.endorsementRule[0].remark}
					];
				})
		},
		endorseH(data){
			data.show = false;
		},
		//价格排序
		priceSort(){
			if(this.sortWay.price == null){
				this.data = _.orderBy(this.data, 'minAdultFacePrice'); //由低到高
				this.sortWay.price = true;
				return 
			}
			if(this.sortWay.price){
				this.data = _.orderBy(this.data, 'minAdultFacePrice').reverse(); //由高到低
				this.sortWay.price = false;
				return 
			}
			this.data = _.orderBy(this.data, 'minAdultFacePrice'); //由低到高
			this.sortWay.price = true;
		},
		//起飞时间排序
		departSort(){
			if(this.sortWay.depart == null){
				this.data = _.orderBy(this.data, 'segments[0].fromDate'); //由低到高
				this.sortWay.depart = true;
				return 
			}
			if(this.sortWay.depart){
				this.data = _.orderBy(this.data, 'segments[0].fromDate').reverse(); //由高到低
				this.sortWay.depart = false;
				return 
			}
			this.data = _.orderBy(this.data, 'segments[0].fromDate'); //由低到高
			this.sortWay.depart = true;
		},
		//飞行时长
		duration(data){
			var duration = 0;
			for(var i=0;i<data.length;i++){
				duration+=data[i].flightDuration;
			}
			return duration;
		},
		//获取航空公司的图标
		getImgUrl(flightNo){
			var name = flightNo.slice(0,2);			
			return name+".PNG";			
		},
		//搜索函数
		shopping(params){
			this.spinShow = true;
			params = Object.assign({},params,{deptCity:getCityCode(params.deptCity),arrCity:getCityCode(params.arrCity)})
			this.$http.get("/shopping/query?",{params:params})
				.then((res) => {
					this.spinShow = false;
					let status = res.data.status;
					if(status&&status==1001){
						this.data = res.data.data;
						//航班为空
						if(this.data.length==0){
							this.data = null;
							this.$Message.info("搜索的航班为空");
							return;
						}
						//添加舱位显示隐藏的字段
						for(let i in this.data){
							this.$set(this.data[i],'show',false); 
							//添加退改签规则显示隐藏的字段
							for(let j in this.data[i].prices){
								this.$set(this.data[i].prices[j],'show',false); 
							}
						}	
						return
					}
					this.$Notice.error({
	                    title: '查询失败'
	                });
					this.data = null;
				})
				.catch((res) => {
					this.spinShow = false;
					this.data = null;
					this.$Notice.error({
	                    title: '查询失败',
	                    desc: "请检查网络连接，或更换搜索条件"
	                });
				})
		},
		
	},
	components:{
		sortSign,
		breadcrumb,
		frontAndBack,
		FlightCityInputer
	},
	created() {
		//获取路由中的查询条件
		let query = {...this.$route.query};
		//整合查询条件
		Object.assign(query,this.defaultQuery);
		//查询
		if(JSON.stringify(this.$route.query) != '{}'){
			this.shopping(query);
		}	
		//赋值给当前页面
		Object.assign(this.query,query);
			
	}
}