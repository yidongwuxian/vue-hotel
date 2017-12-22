import {formatDate, setSStore, getSStore, removeStore} from '../../../utils/util';
import load from '@/components/load.vue'
export default {
	name: 'order',
	data() {
		return {
			formItem: {
                SelCode: '',
                SelName: '',
                layout: [],
                checkIn: '',
                checkOut: '',
                keyword: ''
            },
            cityList: [],
            isLoading: false,
            isTempData: false
		}
	},
	computed: {
		
	},
	watch:{
		
	},
    components:{
        load
    },
	methods: {
        //初始化城市代码 start
		initCityCode(){
            this.isLoading = true;
            this.$http.get("/common/hotelcity")
                .then((res) => {
                    this.isLoading = false;
                    this.cityList = res.data;
                    return
                })
                .catch((res) => {
                    this.isLoading = false;
                })
        },
        //初始化城市代码 end
        initData(){
            let hotelOrderData = JSON.parse(getSStore('hotelOrderData'));
            if(hotelOrderData){
                this.isTempData = true;
                this.formItem.SelCode  = hotelOrderData.cityCode || '';
                this.formItem.SelName  = hotelOrderData.tripLocation || '';
                this.formItem.checkIn  = hotelOrderData.tripStartDate || '';
                this.formItem.checkOut = hotelOrderData.tripEndDate || '';
            }
        },
        setOption(value){
            this.formItem.SelName = value.label;
        },
        //搜索结果
        searchResult(){
			this.formItem.checkIn = formatDate(this.formItem.checkIn);
			this.formItem.checkOut = formatDate(this.formItem.checkOut);

            if(this.formItem.checkIn === this.formItem.checkOut){
                this.$Message.info('入住时间和退房时间不能相同，请重新选择！');
                return;
            }
            if(this.formItem.checkIn > this.formItem.checkOut){
                this.$Message.info('退房时间不能早于入住时间，请重新选择！');
                return;
            }    
            setSStore('searchResult',this.formItem);
            this.$router.push({ path: '/hotel/shopping' });//页面跳转
		}
	},
	created() {
		this.initCityCode();
        this.initData();
	}
}