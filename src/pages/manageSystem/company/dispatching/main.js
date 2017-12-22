

export default {
	data() {
		return {
			editStatus:false,//是否处于编辑状态
			dispatchingTpye:"每年配送",
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
		},
		clear(){
			alert("clear")
		}
	},
	components:{
		
	},
	created() {
		
	}
}