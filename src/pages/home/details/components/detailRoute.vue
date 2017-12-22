<template>
  <div id="detailRoute">
  	<ul>
  		<li v-for="item in data.hotels">
  			<div class="survey">
  				<div class="city">
  					<div class="sign">
  						<span class="iconfont">&#xe64c;</span>
  					</div>
  					<div>
  						<p style="font-size: 14px;"><b>{{item.stopCity}}</b></p>
  						<p>{{item.inDate|date}}至{{item.depDate|date}}</p>
  					</div>
  				</div>
  				<div class="people">{{data.tripPersons}}</div>
  				<div class="btnWarp" v-if="false">
  					<div class="preBtn">预定</div>
  				</div>
  				<div class="statusWarp">
  					<p class="status">{{item.hotelState|childState}}</p>
  					<p>2018-01-01</p>
  				</div>
  			</div> 			
  		</li>
  		<li v-for="item in data.routes">
  			<div class="survey">
  				<div class="city">
  					<div class="sign">
  						<span class="iconfont" v-if="item.routeType==1">&#xe6a0;</span>
  						<span class="iconfont" v-if="item.routeType==2">&#xe6ca;</span>
  						<span class="iconfont" v-if="item.routeType==3">&#xe608;</span>
  					</div>
  					<div>
  						<p style="font-size: 14px;"><b>{{item.deptCity}}-{{item.arrCity}}</b></p>
  						<p>{{item.deptDate|date}}</p>
  					</div>
  				</div>
  				<div class="people">{{data.tripPersons}}</div>
  				<div class="btnWarp" v-if="false">
  					<div class="preBtn">预定</div>
  				</div>
  				<div class="statusWarp">
  					<p class="status">{{item.routeState|childState}}</p>
  					<p>2018-01-01</p>
  				</div>
  			</div> 			
  		</li>
  	</ul>
	</div>
</template>

<script>
export default {
  props:['data'],
		data() {
			return {

			}
		},
		computed: {

		},
}
</script>

<style lang="scss" scoped>
	#detailRoute{
		padding-bottom: 20px;
		>ul{			
			li{
				padding:0 20px;
				min-height:78px;
				border:1px solid #dedede;
				margin-bottom: 3px;
				background: white;
				.itemDetail{
					border-top:1px solid #dedede;
				}
				.survey{
					height:78px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.city{
						display:flex;
						width:250px;
						.sign{
							width:38px;
							height:38px;
							border-radius: 50%;
							border:1px solid #6a6a6a;
							margin-right: 15px;
							text-align: center;
							.iconfont{								
								font-size: 20px;								
								line-height: 38px;
							}
						}
					}
					.people{
						flex-grow: 1;
						text-align: center;
					}
					.btnWarp{
						.preBtn{
							width:72px;
							height:28px;
							background: #f65859;
							text-align: center;
							line-height: 28px;
							color:white;
							cursor: pointer;
							border-radius: 2px;
						}
					}
					.statusWarp{
						text-align: right;
						.status{
							color:#00b3fe;
							font-weight: 600;
						}
					}
				}				
			}
		}
	}
</style>
