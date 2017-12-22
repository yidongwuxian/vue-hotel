<template>
	<div id="flightOrderDetail">
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
			<Title :text="'航班信息'"/>
			<div class="flightMess">
				<table>
					<tr>
						<th>航班号</th>
						<th>舱位</th>
						<th>机场</th>
						<th>航班日期</th>
						<th>机型</th>
						<th>经停</th>
						<th>中转</th>
						<th>价格</th>
						<th>基建/燃油</th>
						<th>退改签</th>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</table>
			</div>
			<Title :text="'旅客信息'"/>
			<div class="passengerMess">
				<table>
					<tr>
						<th>姓名</th>
						<th>旅客类型</th>
						<th>证件类型</th>
						<th>证件号码</th>
						<th>手机号码</th>
						<th>票号展示</th>
						<th>状态</th>
						<th>结算价/票面价</th>
						<th>基建/燃油</th>
						<th>改签单号</th>
						<th>退票单号</th>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</table>
			</div>
			<Title :text="'联系人信息'"/>
			<div class="connectMess">
				<table>
					<tr>
						<th>联系人</th>
						<th>手机</th>
						<th>邮箱</th>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</table>
			</div>
			<Title :text="'附加产品'"/>
			<div class="addMess">
				附加产品
			</div>
			<Title :text="'备注/日志'"/>
			<div class="logMess">
				<table>
					<tr>
						<th>序号</th>
						<th>姓名</th>
						<th>时间</th>
						<th>操作</th>
						<th>备注</th>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</table>
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