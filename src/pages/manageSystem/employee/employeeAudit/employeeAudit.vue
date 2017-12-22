<template>
	<div id="employeeAudit">
		<div>
			<p class="title">新员工审核</p>
			<div class="handle">
				<Button @click="refuse" class="refuse">批量拒绝</Button>
				<Button @click="agree" class="agree">批量同意</Button>
			</div>
			<div class="main">
				<table>
					<tr>
						<th>姓名</th>
						<th>手机号</th>
						<th>申请时间</th>
						<th>操作</th>
					</tr>
					<tr v-for="i in 10">
						<td>
							<Checkbox>王泽旭</Checkbox>
						</td>
						<td>15516507061</td>
						<td>2017-07-17 18:50:78</td>
						<td class="status">已同意</td>
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
<style lang="scss">
	@import '../../../../style/mixin.scss';
	@import '../../../../style/custom.css';
	@import "./style.scss";
</style>