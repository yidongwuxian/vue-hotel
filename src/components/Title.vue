<template>
  <div id="title">
    <span class="square"></span>
    <span>{{text}}</span>
  </div>
</template>

<script>
export default {
	props:['text'],
  data() {
		return {
					
		}
	},
	computed: {
		
	},
	watch:{
		
	},
	methods: {
		
	},
	components:{
		
	},
	created() {
		
	}
  
}
</script>

<style lang="scss" scoped>
	#title{
		height:46px;
		line-height: 46px;
		font-size: 14px;
		color:#21c2f8;
		font-weight: 600;
		.square{
			display: inline-block;
			width:4px;
			height:13px;
			background:#21c2f8 ;
			transform: translateY(2px);
			margin-right: 5px;
		}
	}
</style>
