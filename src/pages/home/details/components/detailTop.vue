<template>
	<div id="detailTop">
		<div class="xinxi">
			<div>
				<div class="avatar"></div>
				<div>
					<p>
						<b class="name">{{data.createUserNickname}}</b>
						<span v-if="false">（技术中心）</span>
					</p>
					<p>
						<b style="color:#f65859">{{data.tripState|tripState}}</b>
					</p>
				</div>
			</div>
			<div>
				<p>
					<span class="title">审批编号</span>
					<b>{{data.approvalCode}}</b>
				</p>
				<p>
					<span class="title">出差地</span>
					<b>{{data.tripDepartLocation}}-{{data.tripLocation}}</b>
				</p>
				<p>
					<span class="title">出差时间</span>
					<b>{{data.tripStartDate|date}}至{{data.tripEndDate|date}}</b>
				</p>
			</div>
			<div>
				<p>
					<span class="title">出差人员</span>
					<b>{{data.tripPersons}}</b>
				</p>
				<p>
					<span class="title">出差事由</span>
					<b>{{data.tripContent}}</b>
				</p>
			</div>
		</div>
		<div class="reason" v-if="data.tripState==3">
			<b>驳回原因:</b>
			<span>{{data.logs[data.logs.length-1].approveRemark}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['data'],
		data() {
			return {

			}
		},
		computed: {

		},
		created() {

		}
	}
</script>

<style lang="scss" scoped>
	#detailTop {		
		border: 1px solid #d2cedf;
		.xinxi {			
			height: 98px;
			background: #eae3f5;
			display: flex;
			color: #343434;
			>div {
				min-width: 320px;
				display: flex;
				line-height: 20px;
				.title {
					display: inline-block;
					width: 60px;
					color: #897ea6;
				}
				&:first-child {
					align-items: center;
					.name {
						font-size: 14px;
					}
					.avatar {
						width: 54px;
						height: 54px;
						border-radius: 50%;
						background: palegreen;
						margin: 0 20px;
					}
				}
				&:nth-of-type(2) {
					flex-direction: column;
					justify-content: center;
				}
				&:nth-of-type(3) {
					flex-direction: column;
					justify-content: center;
				}
			}
		}
		.reason{
			padding:0 20px;
			height:30px;
			line-height: 30px;
			background: #dfd4f4;
		}
	}
</style>