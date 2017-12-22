<template>
	<div id="memberManage">
		<div>
			<p class="title">
				<span class="titleText">角色成员管理</span>
			</p>
			<div class="main">
				<div class="content">
					<div>
						<div class="chooseRoleText"><span>选择成员</span>-为其添加角色</div>
						<div>
							<Tree ref="Tree" :data="data" show-checkbox></Tree>
						</div>
					</div>
					<div>
						<div class="choosedRoleText">
							<span>已选择成员 (5人)</span>
							<Button @click="delAll" class="delAll">全部删除</Button>
						</div>
						<div class="chooseNameList">
							<ul>
								<li v-for="i in 5">
									<span>王泽旭</span>
									<span class="iconfont">&#xe638;</span>
								</li>
								
							</ul>
						</div>
					</div>
				</div>
				<div class="btnWarp">
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