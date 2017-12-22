<template>
	<div id="manageSystem">
		<div v-if="isSingle" class="tip">
			<div><span>欢迎，</span><span class="name">石松岩</span></div>
			<div>
				<span>欢迎使用商旅无忧企业差旅管理系统</span>
				<router-link :to="{ path: '/home'}">
					<span class="back">返回差旅系统 <span class="iconfont"> &#xe609;</span></span>
				</router-link>
			</div>
		</div>
		<nav v-if="isSingle">
			<div>
				<ul>
					<!--动态加载路由及菜单-->
					<li :class="{'activeLi':isActive(route)}" v-for="route in routes">
						<!--单节点菜单-->
						<router-link v-if="route.leaf" :to="{ path: route.path}">
							<span class="title">{{route.name}}</span>
						</router-link>
						<!--多节点菜单-->
						<span v-if="!route.leaf" class="title">{{route.name}}</span>
						<span v-if="!route.leaf" class="iconfont">&#xe7a1;</span>
						<div v-if="!route.leaf" class="menu">
							<span v-for="(child,index) in route.children">
								<router-link :to="{ path: child.path}">
									<span class="childTitle" :class="{'activeMenu':($route.path==child.path)}">{{child.name}}</span>
								</router-link>
								<span v-if="index!=route.children.length-1" class="line">|</span>	
							</span>					
						</div>
					</li>					
				</ul>
			</div>
		</nav>
		<div v-if="isSingle" class="blank"></div>
		<div class="childView">
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
<style lang="scss">
	@import '../../style/mixin.scss';
	@import '../../style/custom.css';
	@import "./style.scss";
</style>