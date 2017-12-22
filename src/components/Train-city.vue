<template>
	<div id="Train-city">
		<div class="cityInputer">
			<input 				
				:value='value'
				@focus="cityModal=true"
				@input="inputerChange"
				type="text" />
		</div>
		<div class="cityWarp" v-if="cityModal">
			<p class="tip">
				<span>暂时不支持/中文/拼音/简拼输入</span>
				<span @click="cityModal=false" class="close iconfont">&#xe604;</span>
			</p>
			<div class="type">
				<li @click="switchover(item.name)" :class="{'active':(active==item.name)}" v-for="item in type">{{item.name}}</li>
			</div>
			<div class="activeCitys">
				<!--热门城市-->
				<li v-if="active=='热门'" class="hot">
					<div @click="choose(items)" class="cityItem" v-for="(items,key) in activeCitys" :title="items.display">{{items.display}}</div>
				</li>	
				<!--非热门城市-->
				<li v-if="active!='热门'" v-for="(items,key) in activeCitys">				
					<div class="notHot">
						<div class="tag">{{key}}</div>
						<div class="citysItem">
							<li @click="choose(item)" class="cityItem" v-for="item in items" :title="item.display">{{item.display}}</li>
						</div>
					</div>
				</li>
			</div>			
		</div>
		
	</div>
</template>

<script>
	import citys from '@/assets/trainCitys'
	import { Trim } from '@/utils/util'
	export default {
		props: ['value'],
		data() {
			return {
				active: "热门",
				cityModal:false,
				filterModal:false,
				citys:citys,
				type: [
					{ name: '热门', key: 1 },
					{ name: 'ABCD', key: 2 },
					{ name: 'EFGH', key: 3 },
					{ name: 'JKLM', key: 4 },
					{ name: 'NOPQRS', key: 5 },
					{ name: 'TUVWX', key: 6 },
					{ name: 'YZ', key: 7 },
				],
			}
		},
		computed:{
			activeCitys(){
				return this.citys[this.active];
			},
			
		},
		methods: {
			switchover(val) {				
				this.active = val;				
			},
			choose(val){
				const target = val.display;
				this.$emit('input', target)
				this.cityModal = false;
			},
			inputerChange(event){
				//this.$emit('input', event.target.value)
			}
		},
		
		created(){
			
		},
		destroyed(){
			
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	#Train-city {				
		user-select: none;
		.cityInputer{			
			>input{
				width:100%;
				border:1px solid #d8dce5;
				border-radius: 4px;
				padding: 0 15px;
				height: 32px;
				transition: 0.3s;
				&:hover{
					border-color:#9E9E9E;
				}
				&:focus{
					outline: none;
					border-color:#21c2f8;
				}
			}
		}
		
		.cityWarp {
			border: 1px solid #999;
			width: 474px;
			position:absolute;
			z-index:100;
			background: white;
			.tip {
				color: #999;
				padding:5px 5px 0 15px;
				display:flex;
				justify-content:space-between;
				.close{
					cursor: pointer;
					font-size: 16px;
					&:hover{
						color:red;
					}
				}
			}
			.type {
				display: flex;
				height: 30px;
				align-items: center;
				justify-content: space-around;
				border-bottom: 1px solid #999;
				li {
					cursor: pointer;
					padding-right: 10px;
					&:hover {
						color: #21c2f8;
					}
					&.active {
						color: #21c2f8;
						font-weight: 600;
						border-bottom: 1px solid #21c2f8;
					}
				}
			}
			.activeCitys{
				padding:8px 0;
				.cityItem{
					width:84px;
					padding-left: 30px;
					height:30px;
					line-height: 30px;
					cursor: pointer;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					&:hover{
						background: #21c2f8;
						color:white;
					}
				}
				.hot{
					display: flex;
					flex-wrap:wrap;					
				}
				.notHot{
					display: flex;
					.tag{
						min-width:50px;
						text-align: center;
						padding-top: 8px;
						color:#999;
					}
					.citysItem{
						display: flex;
						flex-wrap:wrap;
						
					}
				}
			}
		}
	}
</style>