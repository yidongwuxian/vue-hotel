<template>
  <div id="detailFlow" v-if="false">
  	<ul>
  		<li v-for="i in 3" class="shenpirenList">
  			<div class="nameMess">
  				<div class="avatar"></div>
  				<div class="name">王泽旭</div>
  			</div>
  			<div class="status">
  				<p><b>发起申请</b></p>
  				<p><span class="time">12-12 10:30</span></p>
  			</div>
  		</li>
  	</ul>
  	<p class="shuoming">抄送人 审批发起时和审批通过后，都通知抄送人</p>
  	<ul>
  		<li v-for="i in 2" class="chaosongrenList">
  			<div >
  				<div class="avatar"></div>
  				<div class="name">王建峰</div>
  			</div>
  		</li>
  	</ul>
	</div>
</template>

<script>
export default {
  props:['breads'],
		data() {
			return {

			}
		},
		computed: {

		},
}
</script>

<style lang="scss" scoped>
	#detailFlow{		
		border:1px solid #dedede;
		background: white;
		padding:0 20px;
		.shuoming{
			height:50px;
			line-height: 50px;
			color:#aaaaaa;
		}
		.name{
			color:black;
			font-weight: 900;
		}
		.avatar{
			width:45px;
			height:45px;
			border-radius: 50%;
			background: black;
			margin-right: 15px;
		}
		.shenpirenList{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height:68px;
			.nameMess{
				display: flex;
				align-items: center;				
			}
			.status{
					text-align: right;
			}
			.time{
				color:#aaa;
			}
		}
		.chaosongrenList{
			
			>div{
				height:68px;
				display: flex;
				align-items: center;
			}
		}
	}
</style>
