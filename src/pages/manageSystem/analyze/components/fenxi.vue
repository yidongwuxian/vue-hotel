<template>
	<div id="fenxi">
		<div class="searchWarp">
			<div>
				<span>时间：</span>
				<DatePicker class="date" type="date"></DatePicker>
				<DatePicker class="date" type="date"></DatePicker>
			</div>
			<div>
				<span class="tag">部门：</span>
				<Select class="select" v-model="department">
					<Option v-for="item in departments" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</div>
			<div>
				<Button @click="search" class="search">搜索</Button>
			</div>
		</div>
		<div class="result">
			<div class="mess" v-if="res">
				<p class="riqi">2012.12.12-2012.12.12</p>
				<p>
					<span>总金额：</span>
					<b class="count">60000</b>
				</p>
			</div>
			<table v-if="res">
				<tr>
					<td>项目</td>
					<td>金额</td>
					<td>占比</td>
				</tr>
				<tr>
					<td>机票</td>
					<td class="spec">9999</td>
					<td class="spec">99%</td>
				</tr>
				<tr>
					<td>火车</td>
					<td class="spec">9999</td>
					<td class="spec">99%</td>
				</tr>
				<tr>
					<td>酒店</td>
					<td class="spec">9999</td>
					<td class="spec">99%</td>
				</tr>
			</table>
			<div class="myChart" ref="myChart"></div>
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		props: ['type'],
		data() {
			return {
				department: "",
				departments: [
					{ value: '1', label: '设计部' },
					{ value: '2', label: '开发部' },
				],
				res:false,
			}
		},
		computed: {

		},
		methods: {
			search(){
				
				this.res = true;
				this.draw();
			},
			draw() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = echarts.init(this.$refs.myChart);
				// 绘制图表
				myChart.setOption({
					title: {
						text: '',
						subtext: '',
						x: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						left: 'right',
						data: ['火车', '酒店', '机票']
					},
					series: [{
						name: '',
						type: 'pie',
						radius: '55%',
						center: ['50%', '50%'],
						data: [
							{ value: 335, name: '火车' },
							{ value: 310, name: '酒店' },
							{ value: 234, name: '机票' },
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				});
			}
		},
		created() {

		},
		mounted() {
			
		},
		filters: {

		}
	}
</script>

<style lang="scss" scoped>
	#fenxi {
		padding: 0 20px;
		.searchWarp {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 90px;
			border-bottom: 4px solid #f5f5f5;
			>div {
				display: flex;
				align-items: center;
				.date {
					width: 110px;
					margin-right: 5px;
				}
				.tag {
					white-space: nowrap;
				}
				.select {
					width: 100px;
				}
			}
			.search {
				width: 90px;
				height: 30px;
				background: #392073;
				color: white;
			}
		}
		.result {
			.mess {
				display: flex;
				line-height: 64px;
				.riqi {
					width: 180px;
				}
				.count {
					color: #f6575b;
				}
			}
			table {
				width: 270px;
				td {
					width: 90px;
					height: 20px;
					text-align: left;
					&.spec {
						color: #392071;
						font-weight: 900;
					}
				}
			}
			.myChart {
				height: 400px;
			}
		}
	}
</style>