<template>
	<div id="analyze">
		<div>
			<p class="title">
				<span class="titleText">类别分析</span>			
			</p>
			<Fenxi/>
		</div>
		<div>
			<p class="title">
				<span class="titleText">部门分析</span>			
			</p>	
			<Fenxi/>
		</div>
	</div>
</template>

<script>
	import main from './main';
	export default {
		...main
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	@import '../../../style/mixin.scss';
	@import '../../../style/custom.css';
	@import "./style.scss";
</style>