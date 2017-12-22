<template>
	<div id="home">
		<div>
			<div>
				<div class="homeTop">
					<div @click="home" class="logo"></div>
					<p class="welcome">欢迎使用商旅无限企业管理系统</p>
					<div class="handle">
						<div class="manageSistem" @click="manageSistem">
							<span class="iconfont">&#xe936;</span>
							<span>管理系统</span>
						</div>
						<div class="logOut" @click="logOut">
							<span class="iconfont">&#xe625;</span>
							<span>退出</span>
						</div>
					</div>
				</div>
				<router-view/>
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
	@import '../../style/mixin.scss';
	@import '../../style/custom.css';
	@import "./style.scss";
</style>