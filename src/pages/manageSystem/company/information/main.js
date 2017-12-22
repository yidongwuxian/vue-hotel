

export default {
	data() {
		return {
			editStatus:false,//编辑状态
			
		}
	},
	computed: {
		
	},
	watch:{
		
	},
	methods: {
		edit(){
			this.editStatus = true;
		},
		submit(){
			this.editStatus = false;
		}
	},
	components:{
		
	},
	created() {
		
	}
}