<template>
	<div id="applyTrip">
		<p class="crumbs"><span>首页 </span> > <span>出差申请</span></p>
		<div class="main">
			<div class="mainTop">
				<li class="active"><span class="iconfont">&#xe62f;</span>填写申请单</li>
				<li :class='{"active":active>1}'><span class="iconfont">&#xe690;</span>选择行程，住宿(选填)</li>
				<li :class='{"active":active>2}'><span class="iconfont">&#xe66b;</span>完成</li>
				<li @click="cancel" class="cancel">取消<span class="iconfont">&#xe60a;</span></li>
			</div>
			<div class="flows">
				<ul>
<!-----------------------------------------------------------填写申请单------------------------------------------------------>
					<li class="applyForm" v-if="modules[0]==active">
						<p class="applyFormTop"><span class="name">{{user.name}}</span>申请人</p>
						<p class="title"><span>*</span>出差人员</p>
						<div>
							<Input v-model="businessOut.tripPersons" placeholder="Enter someone..."></Input>
							<p class="shuoming">请输入并选择企业员工或个人通讯录中人员，如果添加其他人，请输入姓名后以 ; 结束</p>
						</div>
						<p class="title"><span>*</span>出差地点</p>
						<div>
							<Input v-model="businessOut.tripDepartLocation" placeholder="Enter where..." style="width: 172px"></Input>
							<span style="margin:0 8px;"> 至 </span>
							<Input v-model="businessOut.tripLocation" placeholder="Enter where..." style="width: 172px"></Input>
						</div>
						<p class="title"><span>*</span>出发时间</p>
						<div>
							<DatePicker v-model="businessOut.tripStartDate" type="date" placeholder="Select date"></DatePicker>
							<span style="margin:0 8px;"> 至 </span>
							<DatePicker v-model="businessOut.tripEndDate" type="date" placeholder="Select date"></DatePicker>
							<p class="shuoming">只有在出差事件范围内出行的产品才能关联次申请单，请正确填写出差时间</p>
						</div>
						<p class="title"><span>*</span>出差事由</p>
						<div>
							<Input v-model="businessOut.tripContent" type="textarea" :autosize="true" placeholder="Enter reason..."></Input>
						</div>
					</li>
<!-------------------------------------------------选择行程，住宿----------------------------------------------------------->
					<li class="chooseRoute" v-if="modules[1]==active">
						<div>
							<p class="title"><span class="iconfont">&#xe690;</span>行程</p>
							<ul>
								<li class="route" v-for="(item,index) in routeData">
									<p class="sign">
										<span v-if="item.routeType==1" class="iconfont">&#xe62d;</span>
										<span v-if="item.routeType==2" class="iconfont">&#xe6ca;</span>
										<span v-if="item.routeType==3" class="iconfont">&#xe608;</span>
									</p>
									<p class="city">{{item.deptCity}} - {{item.arrCity}}</p>
									<p class="date">{{item.deptDate}}</p>
									<p class="handle">
										<span class="iconfont" @click="editRoute(index)">&#xe62f;</span>
										<span class="iconfont" @click="delRoute(index)">&#xe638;</span>
									</p>
								</li>
							</ul>
							<div class="add" @click="addRoute">
								<span class='text'>添加行程</span>
								<span class="iconfont">&#xe600;</span>
							</div>
						</div>
						<div>
							<p class="title"><span class="iconfont">&#xe64c;</span>住宿</p>
							<ul>
								<li class="hotel" v-for="(item,index) in hotelData">
									<p class="sign"><span class="iconfont">&#xe64c;</span></p>
									<div class="date">
										<p>{{item.inDate}} <span>入住</span></p>
										<p>{{item.depDate}} <span>离店</span></p>
									</div>
									<p class="handle">
										<span class="iconfont" @click="editHotel(index)">&#xe62f;</span>
										<span class="iconfont" @click="delHotel(index)">&#xe638;</span>
									</p>
								</li>
							</ul>
							<div class="add" @click="addHotel">
								<span class='text'>添加住宿</span>
								<span class="iconfont">&#xe600;</span>
							</div>
						</div>
					</li>
<!---------------------------------------------------完成内容------------------------------------------------------------------------------>
					<li class="accomplish" v-if="modules[2]==active">
						<div class="mainContent">
							<div class="applyMess">
								<p class="title">申请单信息</p>
								<li>
									<span class="tag">出差人</span>
									<span>{{businessOut.tripPersons}}</span>
								</li>
								<li>
									<span class="tag">出差地点</span>
									<span>{{businessOut.tripLocation}}</span>
								</li>
								<li>
									<span class="tag">出差时间</span>
									<span>{{businessOut.tripStartDate?businessOut.tripStartDate.toLocaleDateString():""}} 至 {{businessOut.tripEndDate?businessOut.tripEndDate.toLocaleDateString():""}}</span>
								</li>
								<li>
									<span class="tag">出差事由</span>
									<span>{{businessOut.tripContent}}</span>
								</li>
							</div>
							<div class="auditMess">
								<p class="title">审批信息</p>
								<li>
									<span class="tag"><span class="no">1</span>第一级审批</span>
									<span>刘震，周兴</span>
								</li>
							</div>
						</div>
						<p class="attention"><span class="iconfont">&#xe619;</span>注意：申请单未审批通过您预订产品时只能使用个人支付，审批通过后您预订产品时可以使用企业支付和个人支付</p>
					</li>
				</ul>
			</div>
<!---------------------------------------------------按钮部分------------------------------------------------------------------------------>
			<div class="btn">
				<p class="pre" @click="pre" v-if="active!=1">返回上一步</p>
				<div class="next" @click="next">
					<span>{{btnText}}</span>					
				</div>
			</div>
<!--------------------------------------------添加行程和酒店的模态框------------------------------------------------>
			<!--添加行程的框子-->
		    <Modal
		        v-model="showAddRoute"
		        title="添加行程"
		        @on-ok="ensureRoute"
		        @on-cancel="close"
		        width=580px>
		        <div class="type">
		        	<li class="title">出行方式</li>
		        	<RadioGroup v-model="routes.routeType">
				        <Radio label="1">
				            <span>飞机</span>
				        </Radio>
				        <Radio label="2">
				            <span>火车</span>
				        </Radio>
				        <Radio label="3">
				            <span>其他</span>
				        </Radio>
				    </RadioGroup>
		        </div>
		        <div class="flex wrap">
		        	<li>
		        		<p class="title">出发城市</p>
		        		<p>
		        			<FlightCityInputer v-if="routes.routeType==1" v-model="routes.deptCity"/>
		        			<TrainCityInputer v-if="routes.routeType==2" v-model="routes.deptCity"/>
		        			<!--<Input v-model="routes.deptCity" placeholder="Enter where you go..."></Input>-->
		        		</p>
		        	</li>
		        	<li>
		        		<p class="title">到达城市</p>
		        		<p>
		        			<FlightCityInputer v-if="routes.routeType==1" v-model="routes.arrCity"/>
		        			<TrainCityInputer v-if="routes.routeType==2" v-model="routes.arrCity"/>
		        			<!--<Input v-model="routes.arrCity" placeholder="Enter where you go..."></Input>-->
		        		</p>
		        	</li>
		        	<li>
		        		<p class="title">出发日期</p>
		        		<p><DatePicker v-model="routes.deptDate" type="date" placeholder="Select date"></DatePicker></p>
		        	</li>
		        </div>
		    </Modal>
		    <!--添加酒店的框子-->
		    <Modal
		        v-model="showAddHotel"
		        title="添加住宿"
		        @on-ok="ensureHotel"
		        @on-cancel="close"
		        width=580px>		        
		        <div class="flex wrap">
		        	<li>
		        		<p class="title">入住城市</p>
		        		<p><Input v-model="hotels.stopCity" placeholder="Enter where you go..."></Input></p>
		        	</li>
		        	<li>
		        		<p class="title">入住日期</p>
		        		<p><DatePicker v-model="hotels.inDate" type="date" placeholder="Select date"></DatePicker></p>
		        	</li>
		        	<li>
		        		<p class="title">离店日期</p>
		        		<p><DatePicker v-model="hotels.depDate" type="date" placeholder="Select date"></DatePicker></p>
		        	</li>
		        </div>
		    </Modal>
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