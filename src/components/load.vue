<template>
  <div id="load" :class="{'local':model.type==2}">
  	<div class="shadow" :style="{background: model.background}"></div>
    <div class="content">
    	<div class="cartoon" :class="'cartoon'+model.cartoon"></div>
    	<p :style={color:model.textColor}>{{model.text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props:{
  	model:{
  		type:Object,
  		default(){                //默认属性
  			return{
  				background:'rgba(0,0,0,0.6)',//遮罩层背景颜色及透明度
					text:'. . .',//加载文字
					textColor:'white',//加载文字颜色
					type:1,//1为全部遮罩，2位部分遮罩 需要为其父元素设置position:relative
					cartoon:1,//加载动画的方式，按照需要自行添加 对应的名称以及样式
  			}
  		}
  	}
  },
  data(){
  	return{
  		
  	}
  },
  computed:{
  	
  },
  methods:{
  	
  },
  created(){
  	
  }
}
</script>

<style lang="scss" scoped>

	#load{
		width:100%;
		height:100%;
		position: fixed;
		top:0;
		left:0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		.shadow{
			width:100%;
			height:100%;
			position: absolute;
			background:rgba(0,0,0,0.6);
		}
		.content{
			text-align: center;
			font-size: 16px;
			width:30%;
			display: flex;
			flex-direction: column;
			align-items: center;
			z-index: 1000;
			color:white;
			.cartoon{
				width:100px;
				height:100px;
				border-radius: 50%;
				background: #2d8cf0;
				margin-bottom: 30px;		
				animation:load1 1s ease-in-out infinite; 						
			}
			.cartoon1{
				background: #2d8cf0;
				animation:load1 1s ease-in-out infinite; 
			}
			.cartoon2{
				background: red;
				animation:load1 1s ease-in-out infinite; 
			}
			.cartoon3{
				background: blue;
				animation:load1 1s ease-in-out infinite; 
			}
			.cartoon4{
				background: green;
				animation:load1 1s ease-in-out infinite; 
			}
		}
	}
	.local{
		position: absolute;
	}

</style>
