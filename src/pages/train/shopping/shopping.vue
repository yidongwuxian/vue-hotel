<template>
	<div id="shopping">
		<!--返回顶部-->
		<BackTop></BackTop>
		<!--加载层-->
		<load v-if="loading"></load>
		<breadcrumb :breads="breads"></breadcrumb>
		<div class="main">
			<div class="queryWarp">
				<div class="queryInput">
					<span>
						<TrainCityInputer v-model="query.fromStation" class="inputText"/>
						<!--<Input v-model="query.fromStation" class="inputText" placeholder="出发地..."></Input>-->
					</span>
					<span class="iconfont ex">&#xe61c;</span>
					<span>
						<TrainCityInputer v-model="query.arrStation"  class="inputText"/>
						<!--<Input v-model="query.arrStation"  class="inputText" placeholder="到达地..."></Input>-->
					</span>					
					<span class="deptDate">
						<span class="deptDateText">出发日 </span>
						<DatePicker v-model="query.departTime" type="date" placeholder="Select date"></DatePicker>
					</span>
					<span class="deptDate">
						<span class="deptDateText">出发时间 </span>
						<TimePicker type="timerange" placement="bottom-end" placeholder="Select time"></TimePicker>
					</span>
				</div>
				<div><Button @click="search" class="search">搜索</Button></div>
			</div>
			<div class="trainTypeWarp">
				<span>车次类型</span>
				<span class="noLimit">不限</span>
				<span><Checkbox>GC-高铁/城际</Checkbox></span>
				<span><Checkbox>D-动车</Checkbox></span>
				<span><Checkbox>Z-直达</Checkbox></span>
				<span><Checkbox>T-特快</Checkbox></span>
				<span><Checkbox>K-特快</Checkbox></span>
				<span><Checkbox>其他</Checkbox></span>
			</div>
			<!--火车列表部分-->
			<div class="content" v-if="noRes">
				<div class="handle">
					<frontAndBack @getDate="getDate" :date='query.departTime'></frontAndBack>
					<div class="sort">
						<div class="flex">
							<span>出发时间</span>
							<sortSign></sortSign>
						</div>
						<div class="flex">
							<span>到达时间</span>
							<sortSign></sortSign>
						</div>
						<div class="flex">
							<span>历时</span>
							<sortSign></sortSign>
						</div>
						<div>共99个车次</div>
					</div>
				</div>
				<div class="table">
					<ul class="tableHead">
						<li>车次</li>
						<li class="site">出发站</br>到达站</li>
						<li>出发时间</br>到达时间</li>
						<li class="take">历时</li>
						<li>商务座</br>特等座</li>
						<li>一等座</li>
						<li>二等座</li>
						<li>高级</br>软卧</li>
						<li>软卧</li>
						<li>动卧</li>
						<li>硬卧</li>
						<li>软座</li>
						<li>硬座</li>
						<li>无座</li>
						<li>其他</li>
						<li>备注</li>
					</ul>
					<ul v-for="item in data">
						<li><b>{{item.train_code}}</b></li>
						<li class="site city">
							<div>
								<span class="iconfont start">始</span>
								<b>{{item.from_station}}</b>
							</div>
							<div>
								<span class="iconfont end">终</span>
								<b>{{item.arrive_station}}</b>
							</div>
						</li>
						<li>
							<p><b>{{item.from_time}}</b></p>
							<p class="gray">{{item.arrive_time}}</p>
						</li>
						<li class="take">
							<p><b>{{item.cost_time}}</b></p>
							<!--<p><b>当日到达</b></p>-->
						</li>
						<li><span class="gray">{{item.swz_num}}/{{item.tdz_num}}</span></li>
						<li><span class="gray">{{item.rz1_num}}</span></li>
						<li><span>{{item.rz2_num}}</span></li>
						<li>{{item.gw_num}}</span></li>
						<li>{{item.rw_num}}</span></li>
						<li>??</span></li>
						<li>{{item.yw_num}}</span></li>
						<li>{{item.rw_num}}</span></li>
						<li>{{item.yz_num}}</span></li>
						<li>{{item.wz_num}}</span></li>
						<li>{{item.rz2_num}}</span></li>
						<li><Button @click="booking(item)" class="book">预订</Button></li>
					</ul>
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