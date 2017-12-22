import { setSStore } from "@/utils/util"
import breadcrumb from '@/components/breadcrumb.vue'//面包屑
export default {
	data() {
		return {
			//面包屑导航
			breads:[
				{path:'/home',name:'首页'},
				{path:'',name:'个人设置',current:true}
			],
			setting:false,
			file:null,//选择的头像
			fileName:null,//图片的名字
			imgUrl:"",//图片预览的地址
		}
	},
	computed: {
		
	},
	watch:{
		
	},
	methods: {
		imgPreview (file) {
            let self = this;
            // 看支持不支持FileReader
            if (!file || !window.FileReader) return;
    
            if (/^image/.test(file.type)) {
                // 创建一个reader
                var reader = new FileReader();
                // 将图片将转成 base64 格式
                reader.readAsDataURL(file);
                // 读取成功后的回调
                reader.onloadend = function () {
                    self.imgUrl = this.result;
                }
            }
        },
		handleFileChange(e){
			let inputDOM = this.$refs.inputer;
            // 通过DOM取文件数据
            this.file    = inputDOM.files[0];
            let size = Math.floor(this.file.size / 1024);
            if (size > 2048) {
                // 这里可以加个文件大小控制
				alert("上传图片过大")
                return false
            }
            this.fileName = this.file.name;
            this.imgPreview(this.file);
		}
	},
	components:{
		breadcrumb
	},
	created() {
		
	}
}