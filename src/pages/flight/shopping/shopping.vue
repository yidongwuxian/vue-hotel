<template>
	<div id="shopping">
		<!--返回顶部-->
		<BackTop></BackTop>
		<!--加载动画-->
		<Spin size="large" fix v-if="spinShow"></Spin>
		<!--面包屑导航-->
		<breadcrumb :breads="breads"></breadcrumb>
		<!--价格调整的模态框-->
		<Modal
	        v-model="priceChange"
	        title="价格调整通知"
	        @on-ok="sureBuy"
	        @on-cancel="cancelBuy">
	        <p>当前实际价格为：￥{{realAdultFacePrice}} , 继续购买请点击确定按钮。</p>	        
	    </Modal>
		<!--搜索条件-->		
		<div class="query">
			<div>
				<FlightCityInputer v-model="query.deptCity" class="city"/>
			</div>
			<div @click="exchange"><span class="iconfont">&#xe61c;</span></div>
			<div>
				<FlightCityInputer v-model="query.arrCity" class="city"/>
			</div>
			<div>
				<DatePicker v-model="query.deptStartDate" class="date" type="date"></DatePicker>
			</div>
			<div>
				<Select class="limit" v-model="query.seatClass">
					<Option v-for="item in type1" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</div>
			<div>
				<Select class="limit" v-model="query.adtCnt">
					<Option v-for="item in type2" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</div>
			<div class="btnWarp">
				<Button @click="search" class="search">搜索</Button>
			</div>
		</div>
		<!--搜索结果-->
		<div class="main">
			<!--日期和排序-->
			<div v-if="noRes" class="panel">
				<frontAndBack @getDate="getDate" :date='query.deptStartDate'></frontAndBack>
				<div class="sort">
					<div @click="departSort" class="flex">
						<span>起飞时间</span>
						<sortSign :type='sortWay.depart'></sortSign>
					</div>
					<div @click="priceSort" class="flex">
						<span>价格</span>
						<sortSign :type='sortWay.price'></sortSign>
					</div>
					<div>共{{data.length}}条航班信息</div>
				</div>
			</div>
			<div v-if="noRes" class="content">
				<div v-for="item in data">
					<div class="item">
						<div class="airline">
							<div class="airSign">
								<img :src="'/static/airlines/' + getImgUrl(item.segments[0].flightNo)" alt="" />
							</div>
							<div>
								<p>
									<span class="airlineName">{{item.segments[0].airlineChn}}</span>
									<span>{{item.segments[0].flightNo}}</span>
								</p>
								<p class="model">{{item.segments[0].planeModel}}</p>
							</div>
						</div>
						<div class="routeTime">
							<div class="deptDate">
								<p class="time">{{item.segments[0].fromDate|getTime}}</p>
								<p>{{item.segments[0].fromAirportCn}}{{item.segments[0].fromTower}}</p>
							</div>
							<div class="interval">
								<p class="duration">{{duration(item.segments)|getHour}}</p>
								<p class="to">
									<img src="../../../images/shopping/arrows.png" alt="" />
								</p>
							</div>
							<div class="arrDate">
								<p class="time">{{item.segments[item.segments.length-1].toDate|getTime}}</p>
								<p>{{item.segments[item.segments.length-1].fromAirportCn}}{{item.segments[item.segments.length-1].fromTower}}</p>
							</div>
						</div>
						<div class="food" @mouseenter="endorseS(item.prices[0],item)" @mouseleave="endorseH(item.prices[0])">
							<p class="endorse">退改签</p>
							<div class="endorseRules" v-if="item.prices[0].show">
								<p class="tag">退改签规则</p>
								<li class="ruleItem" v-for="rule in endorseRules">
									<div>{{rule.title}}</div>
									<div>{{rule.content}}</div>
								</li>
							</div>
						</div>
						<div class="extraFee">
							<p>基建+燃油</p>
							<p class="money">￥{{item.prices[0].adultAirportFee}}+￥{{item.prices[0].adultFuelFee}}</p>
						</div>
						<div class="jiage">
							<p class="price">
								<span>￥{{item.prices[0].adultFacePrice}}</span>
								<span class="ruleSign" v-if="item.prices[0].cabinList[0].rule=='notinrule'">
									{{item.prices[0].cabinList[0].rule|rule}}
								</span>
							</p>
							<p class="disCount">{{item.prices[0].cabinList[0].cabinRank|cabinRank}} {{item.prices[0].cabinList[0].discount/10}}折</p>
						</div>
						<div class="handle">
							<p>
								<Button @click="preDing(item)" class="preDing">预订</Button>
							</p>
							<p class="showHide" @click="showHide(item)" v-if="item.prices.length>1">
								<span v-if="!item.show">展开舱位</span>
								<span v-if="item.show">收起舱位</span>
								<span class="iconfont" v-if="!item.show">&#xe6f2;</span>
								<span class="iconfont" v-if="item.show">&#xe7a1;</span>
							</p>
						</div>
					</div>
					<!--隐藏部分的舱位信息-->
					<div class="seatWarp" v-if="item.show">
						<div class="item" v-for="(price,index) in item.prices" v-if="index!=0">
							<div class="cang">
								<p>
									<span>{{price.cabinList[0].cabinRank|cabinRank}}{{price.cabinList[0].discount/10}}折</span>									
								</p>
							</div>
							<div class="endorse">
								<span>退改签</span>
							</div>
							<div class="price">
								<span>￥{{price.adultFacePrice}}</span>
								<span class="ruleSign" v-if="price.cabinList[0].rule=='notinrule'">
									{{price.cabinList[0].rule|rule}}
								</span>
							</div>
							<div class="hand">								
								<div>
									<Button @click="preDing(item,index)" class="preDing">预订</Button>
									<p>剩余{{price.cabinList[0].seatCount}}张</p>
								</div>
							</div>							
						</div>						
					</div>
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
	@import '../../../style/mixin.scss';
	@import "./style.scss";
</style>