<template>
	<div id="order">
		<!--面包屑导航-->
		<breadcrumb :breads="breads"></breadcrumb>
		<load v-if="isLoading" :model="model"></load>
		<div class="main">
			<div class="content">
				<div class="pass">
					<div class="passengers" v-for="(passenger,index) in passengerList">													
						<div class="xinzeng">
							<p class="title">乘客{{index+1}}</p>
							<p v-if="index==0" class="add" @click="add">新增乘机人</p>
						</div>
						<div class="passenger">
							<span @click="del(index)" class="iconfont del">&#xe60a;</span>
							<li>
								<input v-model="passenger.lastName_cn" type="text" placeholder="姓名"/>
							</li>
							<li class="certificate">
								<div>
									 <Select v-model="passenger.docType" placeholder="证件类型" style="width:200px" class="selectCard">
								        <Option v-for="item in certificates" :value="item.value" :key="item.value">{{ item.label }}</Option>
								    </Select>
								</div>
								<div class="certificateNo">
									<input v-model="passenger.docId" type="text" placeholder="证件号码"/>
								</div>
							</li>
							<li>
								<input v-model="passenger.mobile" type="text" placeholder="手机号码"/>
							</li>
						</div>
					</div>
					<div class="contact">
						<p class="title">联系人</p>
						<div class="contactor">
							<li>
								<input v-model="contact.contactUser" type="text" placeholder="姓名"/>
							</li>
							<li>
								<input v-model="contact.contactMobile" type="text" placeholder="手机号码"/>
							</li>
						</div>
					</div>
				</div>
				<div class="order">
					<div>
						<div class="route">
							<p class="survey">
								<span> {{data.segments[0].fromDate|getDate}} </span>
								<span> {{data.segments[0].fromDate|getWeek}} </span>
								<span> {{data.segments[0].fromCityCn}}-{{data.segments[data.segments.length-1].toCityCn}} </span>
							</p>
							<p class="airline">
								<span> {{data.segments[0].airlineChn}} </span>
								<span> {{data.segments[0].flightNo}} </span>
								<span> {{data.segments[0].planeModel}} </span>
								<span> {{data.prices[index].cabinList[0].cabinRank|cabinRank}} </span>
							</p>
							<div class="detail">
								<div>
									<p class="time">{{data.segments[0].fromDate|getTime}}</p>
									<p>{{data.segments[0].fromAirportCn}}{{data.segments[0].fromTower}}</p>
								</div>
								<div class="to">
									<p class="duration">{{duration(data.segments)|getHour}}</p>
									<img src="../../../images/shopping/arrows.png" alt="" />
								</div>
								<div>
									<p class="time">{{data.segments[data.segments.length-1].toDate|getTime}}</p>
									<p>{{data.segments[data.segments.length-1].toAirportCn}}{{data.segments[data.segments.length-1].toTower}}</p>
								</div>
							</div>
						</div>
						<div class="feeDetail">
							<div>
								<li>
									<div>
										<span class="title">成人套餐</span>
										<span class="tag">退改签</span>
										<span class="tag">行李额</span>
									</div>
									<div>
										<span class="fee">￥{{checkPrice.adultFacePrice}}</span>
										<span class="shuliang">×{{passengerList.length}}</span>
									</div>
								</li>
								<li>
									<div>
										<span class="passengerType">成人</span>										
									</div>
									<div>
										<span class="fee">￥{{checkPrice.adultFacePrice}}</span>
										<span class="shuliang">×{{passengerList.length}}</span>
									</div>
								</li>
							</div>
							<div>
								<li>
									<div>
										<span class="title">基建</span>										
									</div>
									<div>
										<span class="fee">￥{{checkPrice.adultAirportTax}}</span>
										<span class="shuliang">×{{passengerList.length}}</span>
									</div>
								</li>
								<li>
									<div>
										<span class="title">燃油</span>										
									</div>
									<div>
										<span v-if="checkPrice.adultFuelTax" class="fee">￥{{checkPrice.adultFuelTax}}</span>
										<span v-if="checkPrice.adultFuelTax" class="shuliang">×1</span>
										<span v-else class="shuliang">免费</span>
									</div>
								</li>
							</div>
						</div>
						<div class="priceCount">
							<span>￥</span>
							<span class="fee">{{(checkPrice.adultFacePrice + checkPrice.adultFuelTax + checkPrice.adultAirportTax)*(passengerList.length)}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="btn">
				<div @click="pay" class="payBtn">预订</div>
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
	@import '../../../style/mixin.scss';
	@import '../../../style/custom.css';
	@import "./style.scss";
</style>