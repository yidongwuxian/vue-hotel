<template>
	<div id="search">
		<div>
			<breadcrumb :breads="breads"></breadcrumb>			
			<div class="main">
				<p class="title">预定机票</p>
				<div>
					<div class="inputWarp">
						<div class="inputText">
							<p class="tag">出发城市</p>
							<div>
								<FlightCityInputer v-model="query.deptCity"/>
							</div>
						</div>
						<div>
							<span class="iconfont">&#xe61c;</span>
						</div>
						<div class="inputText">
							<p class="tag">出发城市</p>
							<div>
								<FlightCityInputer v-model="query.arrCity"/>
							</div>
						</div>
					</div>
					<div class="dateWarp">
						<DatePicker v-model="query.deptStartDate" type="date" placeholder="Select date" style="width: 100%"></DatePicker>
					</div>
				</div>
				<div>
					<div class="searchBtn" @click="search">搜索</div>
				</div>
			</div>
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
	@import '../../../style/mixin.scss';
	@import "./style.scss";
</style>