import {formatDate, setSStore, getSStore, removeStore, mergeArray, setPriceMinRange, setPriceMaxRange} from '../../../utils/util';
import breadcrumb from '@/components/breadcrumb.vue'
import load from '@/components/load.vue'
export default {
	name: 'shopping',
	data() {
		return {
			breads:[
				{path:'/home',name:'首页'},
				{path:'/hotel/search',name:'酒店搜索'},
				{path:'',name:'酒店列表',current:true}
			],
			shoppingItem: {
				SelCode: '北京',
				SelName: '0101',
	            layout: '',
	            checkIn: '',
	            checkOut: '',
	            keyword: ''
			},
			//查询条件 start
			filterItem:{
				region: '',
				fliterStar: '',
				priceMinRange: '',
				priceMaxRange: ''
			},
			housePrice: '',
			minCustom: '',
			maxCustom: '',
			//查询条件 end
			cityCodes: [],
			flag: 0,
			pageSize:20,
			total:0,
			ajaxHistoryData:[],
			shopLists: [],
			tempHotelName:[],
			
			/*分页*/
			isPageShow:false,
			/*加载动画*/
			isLoading:false,
			/*过滤条件*/
			isFilterStyle: false,
			/*地理位置*/
			Positions: [],
			/*过滤暂存字段*/
			priceStartRange: 0,
			priceEndRange:   0,
			/*禁用input*/
			disabledInput:false,
			/*城市代码数组*/
			cityList: [],
			/*价格区间*/
			priceRange:false
		}
	},
	computed: {
		
	},
	watch:{
		'housePrice':function(val){
			
				this.priceRange = false;
				console.log('housePrice:'+val);
			
		},
		'minCustom': function(val){
			
			console.log('minCustom:'+val);
			this.priceRange = true;	
			
		},
		'maxCustom': function(val){
			
			console.log('maxCustom:'+val);
			this.priceRange = true;
		}
	},
	methods: {
		//初始化城市代码 start
		initCityCode(){
            this.isLoading = true;
            this.$http.get("/common/hotelcity")
                .then((res) => {
                    this.isLoading = false;
                    this.cityList = res.data;
                })
                .catch((res) => {
                    this.isLoading = false;
                })
        },
        //初始化城市代码 end
        //初始化行政区代码 start
        initRegionCode(cityCode){
        	this.isLoading = true;
            this.$http.get("/common/hotelcitydistrict/"+cityCode)
                .then((res) => {
                    this.isLoading = false;
              		this.cityCodes = res.data;
                })
                .catch((res) => {
                    this.isLoading = false;
                })
        },
        //初始化行政区代码 end
        setOption(value){
            this.shoppingItem.SelName = value.label;
            this.shoppingItem.SelCode = value.value;
            //获取行政区代码
			this.initRegionCode(this.shoppingItem.SelCode);
        },
		goDetail: function(el){
			let queryData = {
				hotelIds: this.shopLists[el].HotelId
			}
			setSStore('DetailsRes', this.shopLists[el].Detail);
			this.$router.push({ path: '/hotel/details', query:queryData });
		},
		//获取历史记录信息
		getData(){
			let tempObj = this.setOriginParams();
			this.getDataVal(tempObj);
		},
	    //设置历史请求参数
		setOriginParams(){
			let searchResult = JSON.parse(getSStore('searchResult'));
			if(!searchResult){
				return;
			}
			this.shoppingItem.checkIn  = searchResult.checkIn.substr(0,10);
			this.shoppingItem.checkOut = searchResult.checkOut.substr(0,10);
			this.shoppingItem.keyword  = searchResult.keyword;
			this.filterItem.fliterStar = searchResult.layout;


			let tempObj = {
				supplierId:   "ELONG",
				cityCode:     this.shoppingItem.SelCode,
				pageIndex:    1,
				pageSize:     20,
				checkinDate:  formatDate(this.shoppingItem.checkIn),
				checkoutDate: formatDate(this.shoppingItem.checkOut),
				//星级
				starRate:     this.filterItem.fliterStar,
				//关键词
				keyword:      this.shoppingItem.keyword,
				//地区
				districtCode: this.filterItem.region,
				//价格最低范围
				minPrice:     '',
				//价格最高范围
				maxPrice:     '',
				roomNumber:   1
			};
			return tempObj;
		},
		//设置请求参数
		setParams(){
			
			//判断价格范围是自定义价格还是其它
			if(this.priceRange === true){
				this.filterItem.priceMinRange  = setPriceMinRange(this.minCustom)
				this.filterItem.priceMaxRange  = setPriceMinRange(this.maxCustom)
			}else{
				this.filterItem.priceMinRange  = setPriceMinRange(this.housePrice)
				this.filterItem.priceMaxRange  = setPriceMaxRange(this.housePrice)
			}

			let tempObj = {
				supplierId:   "ELONG",
				cityCode:     this.shoppingItem.SelCode,
				pageIndex:    1,
				pageSize:     20,
				checkinDate:  formatDate(this.shoppingItem.checkIn),
				checkoutDate: formatDate(this.shoppingItem.checkOut),
				//星级
				starRate:     this.filterItem.fliterStar,
				//关键词
				keyword:      this.shoppingItem.keyword,
				//地区
				districtCode: this.filterItem.region,
				//价格最低范围
				minPrice:     this.filterItem.priceMinRange,
				//价格最高范围
				maxPrice:     this.filterItem.priceMaxRange,
				roomNumber:   1
			};
			return tempObj;
		},
		//分页
		handleChange(index) {
			let _start = ( index - 1 ) * this.pageSize;
            let _end = index * this.pageSize;
            this.shopLists = this.ajaxHistoryData.slice(_start,_end);
            //获取地理位置经纬度
		    this.getPos(this.shopLists);
        },
        //地图显示
        mapShow(params) {
			// 创建Map实例 
			let map = new BMap.Map("allmap");                 
			    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
			    map.enableScrollWheelZoom(true);
			let index = 0;
			let myGeo = new BMap.Geocoder();
			let adds = [];
			for(var m = 0; m<params.length; m++){
				adds.push(new BMap.Point(params[m].lng,params[m].lat));				
			}
			for(var i = 0; i<params.length; i++){
				var marker = new BMap.Marker(params[i]);
				map.addOverlay(marker);
				marker.setLabel(new BMap.Label(params[i].HotelName,{offset:new BMap.Size(20,-10)}));
			}
		},
		//获取地理位置经纬度
		getPos(params){
			let mapVal = [];
			for(let k=0; k<params.length; k++){
				mapVal.push({
					'lng': params[k].Detail.Longitude,
					'lat': params[k].Detail.Latitude,
					'HotelName': params[k].Detail.HotelName
				});
			}
			//调用地图
			this.mapShow(mapVal);
		},
		//渲染数据信息
		getDataVal(val){
			this.isLoading = true;
			this.$http.post("/hotel/search",val)
				.then((res) => {
					let status = res.data.status;
					if(status&&status==1001){
						this.isLoading = false;
						this.total  = res.data.data.Count;
						this.ajaxHistoryData  = res.data.data.Hotels;
						// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
		                if(this.total <= this.pageSize){
		                    this.shopLists = this.ajaxHistoryData;
		                }else{
		                    this.shopLists = this.ajaxHistoryData.slice(0,this.pageSize);
		                }
					    //初始化获取地理位置经纬度
					    this.getPos(this.shopLists);
		                //是否显示分页
		                this.isPageShow = true;
		                return;
					}else{
						this.shopLists = null;
						this.isLoading = false;
						this.$Notice.error({
		                    title: '查询失败',
		                    desc: "请检查网络连接，或更换搜索条件"
		                });
					}
				})
				.catch((err) => {
					this.isLoading = false;
				})	
		},
		dataResult(){
			let tempObj = this.setParams();
			this.getDataVal(tempObj);
		}
	},
	components:{
		breadcrumb,
		load
	},
	created() {
		let searchResult = JSON.parse(getSStore('searchResult'));
			if(!searchResult){
				return;
			}	
			this.filterItem.fliterStar = searchResult.layout;
			this.shoppingItem.SelCode  = searchResult.SelCode;
			this.shoppingItem.SelName  = searchResult.SelName;
			this.getData();
		//获取城市代码
		this.initCityCode();
		//获取行政区代码
		this.initRegionCode(this.shoppingItem.SelCode);
	}
}