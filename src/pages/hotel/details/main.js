import {formatDate, setSStore, getSStore, removeStore} from '../../../utils/util';
import breadcrumb from '@/components/breadcrumb.vue'
import load from '@/components/load.vue'
import iswiper from '@/components/Banner.vue'
import pic1 from '../../../images/hotel/details/pic1.jpg'
import pic2 from '../../../images/hotel/details/pic2.jpg'
import pic3 from '../../../images/hotel/details/pic3.jpg'
import pic4 from '../../../images/hotel/details/pic4.jpg'
import pic5 from '../../../images/hotel/details/pic5.jpg'
import pic6 from '../../../images/hotel/details/pic6.jpg'
export default {
	name: 'details',
	data() {
		return {
			breads:[
				{path:'/home',name:'首页'},
				{path:'/hotel/search',name:'预定酒店'},
				{path:'/hotel/shopping',name:'酒店列表'},
				{path:'',name:'酒店详情',current:true}
			],
			detailCarousel: 0,
			setting: {
                autoplay: false,
                autoplaySpeed: 2000,
                dots: 'inside',
                radiusDot: false,
                trigger: 'click',
                arrow: 'hover'
            },
            checkIn: '',
            checkOut: '',
            checkNum: 1,
            detailItems: [],
            RatePlans: [],
            roomItems: [],
            ArrItems: [],
            infoArrs:[],
            valueAdds:[],
            isLoading:false,
            breakfast: '无',
            Broadnet: '',
            tempNum: '',
            isOrder: false,
            listImg:[
            	{  
            		'url': pic1
            	},
            	{
            		'url': pic2
            	},
            	{
            		'url': pic3
            	},
            	{
            		'url': pic4
            	},
            	{
            		'url': pic5
            	},
            	{
            		'url': pic6
            	}
            ]
		}
	},
	computed: {
		
	},
	watch:{
		
	},
	mounted: function () {
	  this.$nextTick(function () {
	  	this.getOriginData();
	  })
	},
	methods: {
		getOriginData(){
			//初始化请求数据
			let hotelIds = this.$route.query.hotelIds;
			let searchResult = JSON.parse(getSStore('searchResult'));
			let createUser   = JSON.parse(getSStore('createUser'));
			if(!searchResult){
				return;
			}
			this.checkIn  = searchResult.checkIn;
			this.checkOut = searchResult.checkOut;

			let detailObj = {
			  "supplierId":"ELONG",
			  "hotelIds":hotelIds,
			  "departureDate":searchResult.checkOut.substr(0,10),
			  "arrivalDate":searchResult.checkIn.substr(0,10),
			  "applyUser": createUser || ''
			}

			//初始化酒店信息
			let DetailsRes = JSON.parse(getSStore('DetailsRes'));
			if(!DetailsRes){
				return;
			}
			this.infoArrs = DetailsRes;
			//调用获取数据
			this.getData(detailObj,DetailsRes);
		},
		getData(params,mapData){
			//获取数据 start			
			this.isLoading = true;
			this.$http.post("/hotel/detail",params)
				.then((res) => {
					let status = res.data.status;
					if(status&&status==1001){
						this.isLoading = false;
						this.detailItems = res.data.data.Hotels;
						this.roomItems = res.data.data.Hotels[0].Rooms;
						
						//前台页面展示是否有早餐 start
						if(this.roomItems){
							for(let k of this.roomItems){
								if(k.ValueAddIds !=''){
									this.valueAdds = res.data.data.Hotels[0].ValueAdds;
								}else{
									this.breakfast = '无';
								}
								//判断是否有宽带
								if(k.Broadnet){
									switch(k.Broadnet){
										case '0':
										  this.tempNum = '无'
										  break;
										case '1':
										  this.tempNum = '免费宽带'
										  break;
										case '2':
										  this.tempNum = '收费宽带'
										  break;
										case '3':
										  this.tempNum = '免费WIFI'
										  break;
										case '4':
										  this.tempNum = '收费WIFI'
										  break;  
									}
									this.Broadnet = this.tempNum;
								}
								//如NightlyRates没有值，预定不可点击
								for(let m of k.RatePlans){
									if(m.NightlyRates == ''){
										this.isOrder = true;
									}else{
										this.isOrder = false;
									}
								}
							}
						}
						
						
						if(this.valueAdds){
							let str = '';
							for(let m of this.valueAdds){
								if(m.TypeCode =="01" && m.IsInclude == true){
									str = '含早'
								}
								if(m.TypeCode =="01" && m.IsInclude == false){
									str = '不含早'
								}
							}
							this.breakfast = str;
						}
						//前台页面展示是否有早餐 end

						//重新存储查询数据
						this.checkIn  = formatDate(this.checkIn);
			            this.checkOut = formatDate(this.checkOut);
			            let searchResult = JSON.parse(getSStore('searchResult'));
			            let par = {
			            	'SelName': searchResult.SelName || '',
			            	'SelCode': searchResult.SelCode || '',
                			'layout':  searchResult.layout  || '',
			            	'checkIn':  this.checkIn,
			            	'checkOut': this.checkOut,
			            	'keyword': searchResult.keyword || ''
			            }
			            setSStore('searchResult', par);

						if(!this.roomItems){
							this.$Notice.error({
			                    title: '目前暂无房源信息',
			                    desc: "请检查网络连接，或更换搜索条件"
			                });
			                return;
						}
						//调用地图
						this.getOriginMap(mapData);
						return;
					}else{
						this.$Notice.error({
		                    title: '获取数据失败',
		                    desc: "请检查网络连接，或更换搜索条件"
		                });
					}	
				})	
				.catch((res) => {					
					this.isLoading = false;
					
				})
				//获取数据 end	
		},
		getOriginMap(params){
			// 创建Map实例 
			let map = new BMap.Map("detailsMap");   
			var point = new BMap.Point(params.Longitude, params.Latitude);
			
			var marker = new BMap.Marker(point);
			map.addOverlay(marker);
			map.centerAndZoom(point, 11);
			marker.setLabel(new BMap.Label(params.HotelName,{offset:new BMap.Size(20,-10)}));
		},
		//重新检索
		reSearch(){
			let createUser   = JSON.parse(getSStore('createUser'));
			this.detailItems = null;
			this.roomItems = null;
			let hotelIds = this.$route.query.hotelIds;
			let reDataObj = {
			  "supplierId":"ELONG",
			  "hotelIds":hotelIds,
			  "departureDate":formatDate(this.checkOut).substr(0,10),
			  "arrivalDate":formatDate(this.checkIn).substr(0,10),
			  "applyUser": createUser || ''
			}
			//初始化酒店信息
			let DetailsRes = JSON.parse(getSStore('DetailsRes'));
			if(!DetailsRes){
				return;
			}
			//调用获取数据
			this.getData(reDataObj,DetailsRes);
		},
		goOrder(item,m){
			let tempObj = {
				'HotelId': this.$route.query.hotelIds,
				'Area':item.Area,
				'BedType': item.BedType,
				'Broadnet': item.Broadnet,
				'Capcity': item.Capcity,
				'Comments': item.Comments,
				'Description':item.Description,
				'Floor': item.Floor,
				'Name':item.Name
			}
			let params = Object.assign( tempObj, m);
			setSStore('DetailItems', params);
			this.$router.push({ path: '/hotel/order' });
		}
	},
	components:{
		breadcrumb,
		load,
		iswiper
	},
	created() {

	}
}