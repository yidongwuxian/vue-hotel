<template>
	<div id="ruleTable">
		<div>
			<p class="title">
				<span class="titleText">{{text}}</span>
				<span @click="xinzeng" title="新增规则" class="add iconfont">&#xe620;</span>
			</p>
			<div class="main">
				<table>
					<tr>
						<th>编号</th>
						<th>员工级别</th>
						<th>结果</th>
						<th>创建人</th>
						<th>创建时间</th>
						<th>操作</th>
					</tr>
					<tr v-for="(item,index) in data">
						<td>{{index+1}}</td>
						<td>{{item.level}}</td>
						<td v-if="item.discountStart">{{item.discountStart}} - {{item.discountEnd}}</td>
						<td v-if="item.defaultLevelCityPrice">{{item.defaultLevelCityPrice}} - {{item.firstLevelCityPrice}}</td>
						<td v-if="item.trainType">{{item.trainType|trainType}} - {{item.seatLevel|seatLevel}}</td>
						<td>{{item.createUser}}</td>
						<td>{{item.createTime|date}}</td>
						<td class="handle">
							<span @click="jihuo(item.id)" v-if="item.status==0" title="激活规则" class="iconfont">&#xe66b;</span>
							<span @click="shanchu(item.id)" title="删除规则" class="iconfont">&#xe601;</span>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import {} from '@/utils/util'
	export default {
		props: ['text', 'data', 'add', 'active', 'del'],
		data() {
			return {

			}
		},
		computed: {

		},
		methods: {
			xinzeng() {
				this.add()
			},
			jihuo(id) {
				this.active(id)
			},
			shanchu(id) {
				this.del(id)
			}
		},
		created() {

		},
		filters: {
			trainType(value) {
				switch(value) {
					case 1:
						return "G/C-高铁/城际";
					case 2:
						return "D-动车";
					case 3:
						return "普通车型";
				}
			},
			seatLevel(value) {
				switch(value) {
					case 1:
						return "商务座";
					case 2:
						return "特等座";
					case 3:
						return "一等座";
					case 4:
						return "二等座";
					case 5:
						return "商务座";
					case 6:
						return "特等座";
					case 7:
						return "一等座";
					case 8:
						return "二等座";
					case 9:
						return "高级软卧";
					case 10:
						return "动卧";
					case 11:
						return "软卧";
					case 12:
						return "硬卧";
					case 13:
						return "软座";
					case 14:
						return "硬座";					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	#ruleTable {
		>div {
			border: 1px solid #e0e0e0;
			margin: 40px 0 0 0;
			min-height: 500px;
			padding-bottom: 50px;
			.title {
				background: #f5f5f5;
				font-size: 14px;
				height: 39px;
				color: #666666;
				display: flex;
				align-items: center;
				padding: 0 20px;
				justify-content: space-between;
				.add {
					font-size: 16px;
					cursor: pointer;
					&:hover {
						color: red;
					}
				}
			}
			.main {
				padding: 20px;
				table {
					border-collapse: collapse;
					width: 100%;
					tr:nth-child(odd) {
						background: #f8f8f8;
					}
					th {
						background: #eae3f5;
						height: 38px;
						text-align: left;
						padding-left: 20px;
					}
					td {
						padding-left: 20px;
						height: 50px;
						&.handle {
							width: 100px;
							span {
								margin-right: 20px;
								cursor: pointer;
								font-size: 16px;
								&:hover {
									color: red;
								}
							}
						}
					}
				}
			}
		}
	}
</style>