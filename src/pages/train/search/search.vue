<template>
	<div id="search">
		<breadcrumb :breads='breads'></breadcrumb>
		<div class="main">
			<p class="title">预定火车票</p>
			<div class="condition1">
				<div>
					<div>
						<p class="tag">出发地</p>
						<div>
							<TrainCityInputer v-model="query.fromStation" class="inputText"/>
							<!--<Input v-model="query.fromStation" class="inputText"></Input>-->
						</div>
					</div>
					<div>
						<span class="iconfont ex">&#xe61c;</span>
					</div>
					<div>
						<p class="tag">到达地</p>
						<div>
							<TrainCityInputer v-model="query.arrStation" class="inputText"/>
							<!--<Input v-model="query.arrStation" class="inputText"></Input>-->
						</div>
					</div>
				</div>
				<div>
					<div>
						<p class="tag">出发日期</p>
						<div>
							<DatePicker v-model="query.departTime" class="inputText" type="date" placeholder="Select date"></DatePicker>
						</div>
					</div>
					<div>
						<p class="tag">出发时间</p>
						<div>
							<TimePicker class="inputText" type="timerange" placement="bottom-end" placeholder="Select time"></TimePicker>
						</div>
					</div>
				</div>
			</div>
			<div class="types">
				<div>
					<div class="stance">
						<span>车次类型</span>
						<span class="noLimit">不限</span>
					</div>
					<div>
						<Checkbox>GC-高铁/城际</Checkbox>
						<Checkbox>D-动车</Checkbox>
						<Checkbox>Z-直达</Checkbox>
						<Checkbox>T-特快</Checkbox>
					</div>
				</div>
				<div>
					<div class="stance"></div>
					<div>
						<Checkbox>K-特快</Checkbox>
						<Checkbox>其他</Checkbox>
					</div>
				</div>
			</div>
			<div class="searchWarp">
				<Button @click="search" class="search">搜索</Button>
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