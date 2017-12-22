<template>
	<div id="roleManage">
		<div>
			<p class="title">
				<span class="titleText">角色管理</span>
			</p>
			<div class="main">
				<div class="shuoming">
					<p>不同角色拥有不同的页面权限，您可以在本页面对角色的权限和成员进行设置。</p>
					<p><span class="iconfont">&#xe619; </span> 注意：一个员工可以属于多个角色</p>
				</div>
				<div class="searchAndAdd">
					<div class="searchWarp">
						<Input placeholder="角色名称"></Input>
						<Button class="search">搜素</Button>
					</div>
					<div><Button @click="addRole" class="addRole">添加角色</Button></div>
				</div>
				<table>
					<tr>
						<th>角色名称</th>
						<th>人数</th>
						<th>创建时间</th>
						<th>修改时间</th>
						<th>说明</th>
						<th class="handle">管理</th>
					</tr>
					<tr v-for="i in 5">
						<td>管理员</td>
						<td>30</td>
						<td>2017-12-12 12:12:12</td>
						<td>2017-12-12 12:12:12</td>
						<td>无</td>
						<td class="handle">
							<span @click="editRole" class="iconfont">&#xe62f;</span>
							<span @click="memberManage" class="iconfont">&#xe6be;</span>
							<span @click="deleteRole" class="iconfont">&#xe60a;</span>
						</td>
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