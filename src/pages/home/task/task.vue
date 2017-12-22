<template>
	<div id="task">
		<!--左侧菜单-->
		<div class="left">
			<ul class="menu" v-for="menu in menus" v-if="menu.auth">
				<router-link :to="{ path: menu.path}">
					<li :class="{'active':$route.path==menu.path}">
						<span>{{menu.name}}</span>
						<span class="count">{{menu.count}}</span>
					</li>
				</router-link>
			</ul>

		</div>
		<!--中间部分-->
		<div class="middle">
			<!--顶部信息-->
			<nav>
				<div class="userMess">
					<div class="avatar"></div>
					<div class="name">
						<p class="userName">{{user.name}} <span v-if="user.role" class="role">(超级管理员)</span></p>
						<p class="companyName">中国冶金科工集团有限公司</p>
					</div>
				</div>
				<div class="operations">
					<div>
						<router-link :to="{ path: '/home/task/personalsetting'}">
							<div class="setting">
								<p><span title="个人设置" class="iconfont">&#xe7a0;</span></p>
								<p>个人设置</p>
							</div>
						</router-link>
					</div>
					<div>
						<router-link :to="{ path: '/home/applytrip'}">
							<div class="travelRequest">
								<span class="iconfont">&#xe690;</span>
								<span>出差申请</span>
							</div>
						</router-link>
					</div>
				</div>				
			</nav>
			<router-view/>
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
<style lang="scss" scoped>
	@import '../../../style/mixin.scss';
	@import '../../../style/custom.css';
	@import "./style.scss";
</style>