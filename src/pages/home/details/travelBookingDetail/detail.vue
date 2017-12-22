<template>
	<div id="detail">
		<breadcrumb :fontColor="'black'" :breads="breads"></breadcrumb>
		<detailTop :data="applyData"></detailTop>
		<div class="main">
			<div class="rout"><detailRoute :data="applyData"></detailRoute></div>
			<div class="flow"><detailFlow></detailFlow></div>
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
<style lang="scss" scoped>
	@import '../../../../style/mixin.scss';
	@import "./style.scss";
</style>