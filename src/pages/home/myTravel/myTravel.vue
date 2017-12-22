<template>
	<div id="myTravel">
		<div class="list">
			<div class="listHeader">
				<p @click="chooseFilterType(item.type,item.url)" :class="{'active':item.type==activeFilterType}" v-for="item in filterType">{{item.name}}</p>
			</div>
			<div class="warp" v-for="item in data">
				<div class="shenpi">
					<div>
						<span class="iconfont">&#xe6be;</span>
						<span class="applyerName">{{item.createUserNickname}}</span>
						<span class="department" v-if="false">(技术中心)</span>
					</div>
					<div>
						<span class="iconfont">&#xe605;</span>
						<span>{{item.tripStartDate|date}} 至 {{item.tripEndDate|date}}</span>
					</div>
					<div class="prot">
						<div>
							<span class="iconfont">&#xe644;</span>
							<span>{{item.tripDepartLocation}}-{{item.tripLocation}}</span>
						</div>
						<div>
							<span>{{item.createTime|date}}</span>
						</div>
					</div>
					<div class="status">
						<span class="state">{{item.tripState|tripState}}</span>
						<router-link :to="{ path: `/home/task/mytraveldetail?id=${item.id}`}">
							<span class="applyNo">{{item.approvalCode}}</span>
						</router-link>
					</div>
				</div>
				<table>
					<tr v-for="route in item.routes">
						<td class="city">
							<span v-if="route.routeType==1" class="iconfont">&#xe6a0;</span>
							<span v-if="route.routeType==2" class="iconfont">&#xe6ca;</span>
							<span v-if="route.routeType==3" class="iconfont">&#xe608;</span>
							<span class="cityName">{{route.deptCity}}-{{route.arrCity}}</span>
						</td>
						<td class="people">
							<span>共{{count(item.tripPersons)}}人：</span>
							<span class="names">{{item.tripPersons}}</span>
						</td>
						<td class="handle">
							<div>
								<p>{{route.routeState|childState}}</p>
								<p v-if="route.routeState==2" class="dingNum">{{route.orderNumber}}</p>
							</div>							
						</td>
						<td class="date">
							<span>{{route.deptDate|date}}</span>
						</td>
					</tr>
					<tr v-for="hotel in item.hotels">
						<td class="city">
							<span class="iconfont">&#xe64c;</span>
							<span class="cityName">{{hotel.stopCity}}</span>
						</td>
						<td class="people">
							<span>共{{count(item.tripPersons)}}人：</span>
							<span class="names">{{item.tripPersons}}</span>
						</td>
						<td class="handle">
							<div>
								<p>{{hotel.hotelState|childState}}</p>
								<p v-if="hotel.hotelState==2" class="dingNum">{{hotel.orderNumber}}</p>
							</div>							
						</td>
						<td class="date">
							<span>{{hotel.inDate|date}}</span>
							<span>{{hotel.depDate|date}}</span>
						</td>
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
<style lang="scss" scoped>
	@import '../../../style/mixin.scss';
	@import '../../../style/custom.css';
	@import "./style.scss";
</style>