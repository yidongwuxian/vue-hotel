<template>
	<div id="trainOrderDetail">
		<header>
			<p>
				<span>订单号：</span>
				<b>123456789</b>
			</p>
			<p>
				<span>外部订单号：</span>
				<b>123456789</b>
			</p>
			<p>
				<span>供应商：</span>
				<b>TDXD</b>
			</p>
			<p>
				<span>订单状态：</span>
				<b>已退款</b>
			</p>
		</header>
		<div>
			<Title :text="'支付信息'"/>
			<div class="payMess">
				<p>
					<b class="money">￥3380</b>
					<span>X</span>
					<span>3</span>
				</p>
				<p class="smallFont">
					<span>订单总价</span>
				</p>
				<p>
					<span>支付方式：</span>
					<b>微信</b>
				</p>
				<p class="smallFont">
					<span>支付流水号：</span>
					<span>123456987456321</span>
				</p>
			</div>
			<Title :text="'火车详情'"/>
			<div class="trainMess">
				<table>
					<tr>
						<th>出发-到达</th>
						<th>车次</th>
						<th>席位</th>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</table>
			</div>
			<Title :text="'乘客信息'"/>
			<div class="passengerMess">
				<table>
					<tr>
						<th>姓名</th>
						<th>证件号</th>
						<th>单价</th>
						<th>状态</th>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</table>
			</div>
			<Title :text="'日志/备注'"/>
			<div class="logMess">
				日志/备注
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
<style lang="scss">
	@import "./style.scss";
</style>