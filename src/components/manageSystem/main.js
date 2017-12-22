import { setStore,getStore,removeStore,Trim } from "../../utils/util"

export default {
	name: 'manageSystem',
	data() {
		return {
			routes:null,//整合过的路由信息
		}
	},
	computed: {
		//是否显示页面内的其他组件
		isSingle(){
			let currentPath = this.$route.path;
			for(let i=0;i<this.routes.length;i++){				
				if(this.routes[i].children){
					let children = this.routes[i].children;
					for(let j=0;j<children.length;j++){
						let single = children[j].single;
						let path = children[j].path;
						if(single&&path==currentPath){
							return false;
						}
					}
				}				
			}
			return true;
		}
	},
	watch:{
		
	},
	methods: {
		//获取要显示的路由菜单的信息
		getRoute(){
			let routes = this.$router.options.routes;			
			for(let i=0;i<routes.length;i++){
				if(routes[i].name=="manageSystem"){
					this.routes = routes[i].children;
					break;
				}
			}
		},
		//菜单是否激活
		isActive(route){
			let currentPath = this.$route.path;
			if(route.leaf){
				if(currentPath==route.path){
					return true;
				}
			}
			for(let i in route.children){
				if(currentPath == route.children[i].path){
					return true;
				}
			}
			return false;
		}
	},
	components:{
		
	},
	created() {
		this.getRoute();
	}
}