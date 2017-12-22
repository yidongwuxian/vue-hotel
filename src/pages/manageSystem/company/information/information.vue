<template>
	<div id="companyInformation">
		<div>
			<p class="title">
				<span class="titleText">企业信息</span>
				<span @click="edit" v-if="!editStatus"" title="编辑" class="edit iconfont">&#xe62f;</span>
			</p>
			<div class="message">
				<ul>
					<li>
						<div class="tag">
							<span class="star">*</span>
							<span>企业名称:</span>
						</div>
						<div class="content">
							<Input v-if="editStatus" placeholder="Enter something..."></Input>
							<p v-if="!editStatus">天津伊翔运达网络科技有限公司</p>
						</div>
					</li>
					<li>
						<div class="tag">
							<span class="star">*</span>
							<span>城市:</span>
						</div>
						<div class="content">
							<Input v-if="editStatus" placeholder="Enter something..."></Input>
							<p v-if="!editStatus">北京市朝阳区</p>
						</div>
					</li>
					<li>
						<div class="tag">
							<span class="star">*</span>
							<span>行业:</span>
						</div>
						<div class="content">
							<Input v-if="editStatus" placeholder="Enter something..."></Input>
							<p v-if="!editStatus">互联网</p>
						</div>
					</li>
					<li>
						<div class="tag">
							<span>联系人:</span>
						</div>
						<div class="content">
							<Input v-if="editStatus" placeholder="Enter something..."></Input>
							<p v-if="!editStatus">王泽旭</p>
						</div>
					</li>
					<li>
						<div class="tag">
							<span>电子邮箱:</span>
						</div>
						<div class="content">
							<Input v-if="editStatus" placeholder="Enter something..."></Input>
							<p v-if="!editStatus">1095406754@qq.com</p>
						</div>
					</li>
				</ul>
			</div>
			<div class="btn" v-if="editStatus">
				<Button @click="submit" type="error" class="submit">提交</Button>
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