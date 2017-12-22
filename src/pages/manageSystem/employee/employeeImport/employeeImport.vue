<template>
	<div id="employeeImport">
		<div class="stepOne">
			<p class="title">
				<span>第一步：下载导入模板</span>
			</p>
			<div class="main">
				<ul>
					<li class="center">
						<Button @click="download" class="btn download">下载导入模板</Button>
					</li>
					<li class="center"><h5>导入说明</h5></li>
					<li>1,导入文件格式必须为:xls,xlsx;</li>
					<li>2,模板中:姓名,手机为必填;</li>
					<li>3,导入前请先维护部门信息;</li>
				</ul>
			</div>
		</div>
		<div class="stepTwo">
			<p class="title">
				<span>第二部：上传员工数据</span>
			</p>
			<div class="main">
				<ul>
					<li>员工信息将被导入至 : 技术中心</li>
					<li class="center">
						<Button @click="importFile" class="btn import">导入文件</Button>
					</li>
				</ul>
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