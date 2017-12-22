<template>
	<div id="login">
		<div>
			<div class="main">
				<div class="title"></div>
				<div class="loginContent">
					<p class="text">企业商旅会员登录</p>
					<div class="inputDiv">
						<span class="iconfont">&#xe6be;</span>
						<input class="hide" type="text" name="userName"/>
						<input type="text" name="userName" placeholder="请输入用户名" v-model="userName" autoComplete="off"/>
					</div>
					<div class="inputDiv">
						<span class="iconfont">&#xe6d1;</span>
						<input class="hide" type="password" name="txtPassword"/>
						<input type="password" @keyup.enter="login" name="txtPassword" placeholder="请输入密码" v-model="passWord" autoComplete="off"/>
					</div>
					<div class="handle">
						<div><Checkbox v-model="remember">记住密码</Checkbox></div>
						<div class="forgetPassword" @click="forgetPassword">忘记密码？</div>
					</div>
					<div class="loginDiv">
						<Button long @click="login" icon="toLoading" :loading="loading">
							<span v-if="!loading">立即登录</span>
        					<span v-else>登录中</span>
						</Button>
					</div>
					<div class="signDiv"><Button long @click="register">企业用户注册</Button></div>
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
	@import '../../style/mixin.scss';
	@import '../../style/custom.css';
	@import "./style.scss";
</style>