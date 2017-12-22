import { setStore,getStore,removeStore,Trim,getSStore,formDate } from "@/utils/util"
import FlightCityInputer from '@/components/Flight-city.vue'
import TrainCityInputer from '@/components/Train-city.vue'
export default {
	data() {
		return {
			user:null,//用户信息
			modules:[1,2,3],//模块编号
			active:1,//激活的模块序号
			businessOut:{  //出差申请单信息
				tripPersons:"",
				tripDepartLocation :"",
				tripLocation:"",
				tripStartDate:"",
				tripEndDate:"",
				tripContent:""
			},
			showAddRoute:false,//添加行程内容的显示隐藏
			showAddHotel:false,//添加住宿内容的显示隐藏
			routeData:[],//添加的行程数据
			hotelData:[],//添加的住宿数据
			routes:{      //每条行程数据
				routeType:"1",
				deptCity:"",
				arrCity:"",
				deptDate:""
			},
			hotels:{      //每条住宿数据
				stopCity:"",
				inDate:"",
				depDate:"",
			},
			edit:false,//修改的标识
			editIndex:null,//修改的索引
		}
	},
	computed: {
		//按钮的文字
		btnText(){			
			let text = "下一步";
			let routeLength = this.routeData.length;
			let hotelLength = this.hotelData.length;
			if(this.active==2){
				text = "跳过";
				if(routeLength!=0||hotelLength!=0){
					text = "下一步";
				}				
			}
			if(this.active==3){
				text = "提交";
			}
			return text;
		}
	},
	watch:{
		
	},
	methods: {
		//取消
		cancel(){
			this.$router.push({path:"/home"});
		},
		//下一步
		next(){
			let length = this.modules.length;
			let max = this.modules[length-1];			
			if(this.active<max){
				this.active++
				return;
			}
			//提交
			/*转化日期格式*/
			let date = {
				tripStartDate:formDate(this.businessOut.tripStartDate),
				tripEndDate:formDate(this.businessOut.tripEndDate)
			}
			let data = {};
			Object.assign(data,{...this.businessOut},{hotels:this.hotelData},{routes:this.routeData},{...date});
			this.$http.post('/trip/create/1',data)
				.then((res) => {
					if(res.data.success){
						this.$Message.success('出差申请提交成功');
						this.$router.push({path:"/home"});
					}
				})
				.catch(() => {
					this.$Notice.error({
	                    title: '申请失败',
	                    desc: res.data.message
	                });
				})
		},
		//返回上一步
		pre(){
			let length = this.modules.length;
			let min = this.modules[0];
			if(this.active>min){
				this.active--
				return;
			}
		},
		//添加行程
		addRoute(){
			this.showAddRoute = true;
			//添加数据			
			this.routes = {
				routeType:"1",
				deptCity:this.businessOut.tripDepartLocation,
				arrCity:this.businessOut.tripLocation,
				deptDate:this.businessOut.tripStartDate
			}
		},
		//删除行程
		delRoute(index){
			this.routeData.splice(index,1);
			this.$Message.success('行程信息删除成功');
		},
		//修改行程
		editRoute(index){
			this.edit = true;
			this.showAddRoute = true;
			this.editIndex = index;
			this.routes = JSON.parse(JSON.stringify(this.routeData[index]));
		},
		//确定添加/修改行程
		ensureRoute () {
			this.routes.deptDate = formDate(this.routes.deptDate);
			let routes = JSON.parse(JSON.stringify(this.routes));
			if(this.edit){
				this.routeData.splice(this.editIndex,1,routes)
				this.$Message.success('行程信息修改成功');
				this.edit = false;
				return;
			}						
			this.routeData.push(routes)
            this.$Message.success('行程信息添加成功');
        },
		//添加住宿
		addHotel(){
			this.showAddHotel = true;
			//添加数据
			this.hotels = {
				stopCity:this.businessOut.tripLocation,
				inDate:this.businessOut.tripStartDate,
				depDate:"",
			}
		},
		//删除住宿
		delHotel(index){
			this.hotelData.splice(index,1);
			this.$Message.success('住宿信息删除成功');
		},
		//修改住宿
		editHotel(index){
			this.edit = true;
			this.showAddHotel = true;
			this.editIndex = index;
			this.hotels = JSON.parse(JSON.stringify(this.hotelData[index]));
		},
        //确定添加/修改住宿
		ensureHotel () {
			this.hotels.inDate = formDate(this.hotels.inDate);
			this.hotels.depDate = formDate(this.hotels.depDate);
			let hotels = JSON.parse(JSON.stringify(this.hotels));
			if(this.edit){
				this.hotelData.splice(this.editIndex,1,hotels)
				this.$Message.success('住宿信息修改成功');
				this.edit = false;
				return;
			}	
			this.hotelData.push(hotels)
            this.$Message.success('住宿信息添加成功');
        },
        // 关闭
        close () {
            this.$Message.info('Clicked cancel');
        }
	},
	components:{
		FlightCityInputer,
		TrainCityInputer,
	},
	created() {
		this.user = JSON.parse(getSStore('user'));
	}
}