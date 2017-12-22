<template>
  <div id="breadcrumb">
  	<span v-for="bread in breads">
  		<router-link :to="{ path: bread.path}" v-if="!bread.current">
  				<span :style="{color:fontColor}" class="breadName">{{bread.name}}</span>
  		</router-link>
  		<span :style="{color:fontColor}" v-else>{{bread.name}}</span>
  		<span :style="{color:fontColor}" v-if="!bread.current"> > </span>
  	</span>		
	</div>
</template>

<script>
export default {
  props:['breads','fontColor'],
		data() {
			return {

			}
		},
		computed: {

		},
}
</script>

<style lang="scss" scoped>
	#breadcrumb{
		height:60px;
		line-height: 60px;
		span{
			color:white;
		}		
		.breadName:hover{
			color: #1fc6f3;
		}
	}
</style>
