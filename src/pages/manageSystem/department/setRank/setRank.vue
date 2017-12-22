<template>
	<div id="setRank">
		<div>
			<p class="title">
				<span class="titleText">职级列表</span>
			</p>
			<div class="message">
				<ul>
					<li v-for="i in 5">
						<div>产品总监</div>
						<div>
							<span class="iconfont" @click="edit">&#xe62f;</span>
							<span class="iconfont" @click="del">&#xe601;</span>
						</div>
					</li>
					
				</ul>
			</div>
		<!--新添加-->
			<div class="btn">				
				<div v-if="!addStatus" class="add" @click="addStatus=true"><span class="iconfont">&#xe600;</span>新增职称</div>
				<div v-else>
					<Input placeholder="新增职级"></Input>
					<div class="handle">
						<span class="iconfont" @click="sure">&#xe66b;</span>
						<span class="iconfont" @click="addStatus=false">&#xe60a;</span>
					</div>
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