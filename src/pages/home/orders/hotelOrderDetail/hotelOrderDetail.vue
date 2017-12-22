<template>
	<div id="hotelOrderDetail">
		<div>
			<header>
				<p>
					<span>订单号：</span>
					<b></b>
				</p>
				<p>
					<span>外部订单号：</span>
					<b></b>
				</p>
				<p>
					<span>供应商：</span>
					<b></b>
				</p>
				<p>
					<span>订单状态：</span>
					<b></b>
				</p>
			</header>
			<div>
				<Title :text="'支付信息'" />
				<div class="payMess">
					<p v-if="orderDetail.TotalPrice">
						<b class="money">￥{{orderDetail.TotalPrice/ orderDetail.NumberOfRooms}}</b>
						<span>X</span>
						<span>{{orderDetail.NumberOfRooms}}</span>
					</p>
					<p class="smallFont">
						<span>订单总价</span>
					</p>
					<p>
						<span>支付方式：</span>
						<b>
							<span v-if="orderDetail.PaymentType === 'Prepay' ">预付</span>
							<span v-else>前台现付</span>
						</b>
					</p>
					<p class="smallFont">
						<span>支付流水号：</span>
						<span></span>
					</p>
				</div>
				<Title :text="'酒店详情'" />
				<div class="hotelMess">
					<table>
						<tr>
							<th>酒店名</th>
							<th>房型</th>
							<th>入住日期</th>
							<th>离店日期</th>
							<th>房间数</th>
							<th>单价</th>
							<th>付款类型</th>
							<th>状态</th>
						</tr>
						<tr>
							<td>{{orderDetail.HotelName}}</td>
							<td>{{orderDetail.RoomTypeName}}</td>
							<td>{{orderDetail.ArrivalDate}}</td>
							<td>{{orderDetail.DepartureDate}}</td>
							<td>{{orderDetail.NumberOfRooms}}</td>
							<td>{{orderDetail.CustomerPrice}}</td>
							<td>
								<span>{{orderDetail.PenaltyCurrencyCode}}</span>
							</td>
							<td>
								<span v-if="orderDetail.Status      === 'N' ">新单</span>
								<span v-else-if="orderDetail.Status === 'A' ">已确认</span>
								<span v-else-if="orderDetail.Status === 'F' ">已入住</span>
								<span v-else-if="orderDetail.Status === 'C' ">已结帐</span>
								<span v-else-if="orderDetail.Status === 'Z' ">删除另换酒店</span>
								<span v-else-if="orderDetail.Status === 'D' ">删除</span>
								<span v-else-if="orderDetail.Status === 'B' ">NO SHOW</span>
								<span v-else-if="orderDetail.Status === 'O' ">满房</span>
								<span v-else-if="orderDetail.Status === 'G' ">变价</span>
								<span v-else-if="orderDetail.Status === 'U' ">特殊满房</span>
								<span v-else-if="orderDetail.Status === 'H' ">变更</span>
								<span v-else-if="orderDetail.Status === 'B1' ">有预定未查到</span>
								<span v-else-if="orderDetail.Status === 'B2' ">待查</span>
								<span v-else-if="orderDetail.Status === 'B3' ">暂不确定</span>
								<span v-else-if="orderDetail.Status === 'S' "> 特殊</span>
								<span v-else></span>
							</td>
						</tr>
					</table>
				</div>
				<Title :text="'入住人'" />
				<div class="guestMess">
					<table v-for="(m,index) in OrderRooms" :key="index">
						<tr>
							<th>姓名</th>
							<th>性别</th>
							<th>电话</th>							
						</tr>
						<tr v-for="(n,_index) in m.Customers" :key="_index">
							<td>{{n.Name}}</td>
							<td>{{n.Gender}}</td>
							<td>{{n.Phone}}</td>							
						</tr>
					</table>
				</div>
				<Title :text="'联系人'" />
				<div class="connectMess">
					<table>
						<tr>
							<th>姓名</th>
							<th>电话</th>							
						</tr>
						<tr v-if="orderDetail.Contact">
							<td>{{orderDetail.Contact.Name}}</td>
							<td>{{orderDetail.Contact.Phone}}</td>							
						</tr>
					</table>
				</div>
				<Title :text="'备注日志'" />
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
							<td>1</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>							
						</tr>
					</table>
				</div>
				<div class="backClass">
					<Button type="primary" size="large" @click="goBack" class="preDing">返回</Button>
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
<style lang="scss">
	@import "./style.scss";
</style>