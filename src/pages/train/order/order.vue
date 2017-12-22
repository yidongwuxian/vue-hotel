<template>
	<div id="order">
		<load v-if="loading"></load>
		<breadcrumb :breads="breads"></breadcrumb>
		<div class="main">
			<div>
				<p class="title"><span>列车信息</span> (以下余票信息仅供参考)</p>
				<div class="trainWarp">
					<div class="mess">
						<span>2017-10-10 ( 周二  )</span>
						<span>{{data.train_code}} <span class="normal"> 次 </span></span>
						<span>{{data.from_station}}<span class="normal"> 站 </span>({{data.from_time}}开) - {{data.arrive_station}}<span class="normal"> 站 </span>( {{data.arrive_time}}到 )</span>
					</div>
					<div class="priceDetail">
						<p>高级软卧 ( <span class="price">￥{{data.gw}}</span> ) {{data.gw_num}}张票</p>
						<p>软卧 ( <span class="price">￥{{data.rw}}</span> ) {{data.rw_num}}张票</p>
						<p>一等座 ( <span class="price">￥{{data.rz1}}</span> ) {{data.rz1_num}}张票</p>
						<p>二等座 ( <span class="price">￥{{data.rz2}}</span> ) {{data.rz2_num}}张票</p>
						<p>软座 ( <span class="price">￥{{data.rz}}</span> ) {{data.rz_num}}张票</p>
						<p>商务座 ( <span class="price">￥{{data.swz}}</span> ) {{data.swz_num}}张票</p>
						<p>特等座 ( <span class="price">￥{{data.tdz}}</span> ) {{data.tdz_num}}张票</p>
						<p>无座 ( <span class="price">￥{{data.wz}}</span> ) {{data.wz_num}}张票</p>
						<p>硬卧 ( <span class="price">￥{{data.yw}}</span> ) {{data.yw_num}}张票</p>
						<p>硬座 ( <span class="price">￥{{data.yz}}</span> ) {{data.yz_num}}张票</p>
					</div>
				</div>
			</div>
			<div>
				<div class="head">
					<p>乘客信息</p>
					<Button @click="add" class="add">新增乘客</Button>
				</div>
				<div class="passengerWarp">
					<div class="nameList">
						<Checkbox>石松岩</Checkbox>
						<Checkbox>李正勇</Checkbox>
						<Checkbox>李数</Checkbox>
						<Checkbox>大鹏</Checkbox>
					</div>
					<table>
						<tr>
							<th>序号</th>
							<th>席别</th>
							<th>票种</th>
							<th>姓名</th>
							<th>证件类型</th>
							<th>证件号码</th>
							<th>手机号码</th>
							<th></th>
						</tr>
						<tr v-for="(item,index) in passengers">
							<td>{{index+1}}</td>
							<td>
								<Select v-model="seatType">
							        <Option v-for="item in seatTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
							    </Select>
							</td>
							<td>
								<Select v-model="item.ticketType">
							        <Option v-for="item in ticketType" :value="item.value" :key="item.value">{{ item.label }}</Option>
							    </Select>
							</td>
							<td>
								<Input v-model="item.userName"></Input>
							</td>
							<td>
								<Select v-model="item.idsType">
							        <Option v-for="item in idsType" :value="item.value" :key="item.value">{{ item.label }}</Option>
							    </Select>
							</td>
							<td>
								<Input v-model="item.userIds"></Input>
							</td>
							<td>
								<Input value="不需要"></Input>
							</td>
							<td><span @click="del(index)" class="iconfont del">&#xe604;</span></td>
						</tr>
					</table>
				</div>
			</div>
			<div class="btnWarp">
				<p @click="back" class="back"><<返回上一页</p>
				<Button @click="submit" class="submit">提交订单</Button>
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