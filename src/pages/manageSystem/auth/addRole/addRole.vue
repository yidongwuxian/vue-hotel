<template>
	<div id="addRole">
		<div>
			<p class="title">
				<span v-if="edit" class="titleText">修改角色</span>
				<span v-else class="titleText">新增角色</span>				
			</p>
			<div class="main">
				<div>
					<p class="tag">角色名称：</p>
					<div>
						<Input class="inputText" placeholder="请输入角色名称"></Input>
					</div>
				</div>
				<div>
					<p class="tag">角色权限：</p>
					<div>
						<Tree ref="Tree" :data="data" show-checkbox></Tree>
					</div>
				</div>
				<div>
					<p class="tag">角色说明：</p>
					<div>
						<Input type="textarea" class="inputText" placeholder="请输入角色说明"></Input>
					</div>
				</div>
				<div>
					<Button @click="submit" class="submit">提交</Button>
					<Button @click="back" class="back">返回</Button>
				</div>
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