<template>
	<div id="personalSetting">
		<breadcrumb :fontColor="'black'" :breads="breads"></breadcrumb>
		<div class="setting">
			<p class="title">
				<span>个人信息设置</span>
				<span @click="setting = !setting" class="iconfont">&#xe62f;</span>
			</p>
			<div class="main">
				<div>
					<li>
						<p class="tag">手机号码</p>
						<div v-if="setting"><Input class="textInput"></Input></div>
						<div v-else>15516507061</div>
					</li>
					<li>
						<p class="tag">邮箱</p>
						<div v-if="setting"><Input class="textInput"></Input></div>
						<div v-else>1095406754@qq.com</div>
					</li>
					<li>
						<p class="tag"><span class="star">*</span>昵称</p>
						<div v-if="setting"><Input class="textInput"></Input></div>
						<div v-else>黄昏</div>
					</li>
					<li>
						<p class="tag"><span class="star">*</span>姓名</p>
						<div v-if="setting">
							<Input class="textInput"></Input>
						</div>
						<div v-else>石松岩</div>
					</li>
					<li>
						<p class="tag"><span class="star">*</span>性别</p>
						<div v-if="setting">
							<Radio>男</Radio>
							<Radio>女</Radio>							
						</div>
						<div v-else>男</div>
					</li>
					<li>
						<p class="tag">生日</p>
						<div v-if="setting"> <DatePicker class="textInput" type="date"></DatePicker></div>
						<div v-else>1992-09-17</div>
					</li>
					<li>
						<p class="tag">固定电话</p>
						<div v-if="setting"><Input class="textInput"></Input></div>
						<div v-else>7896110</div>
					</li>
					<li>
						<p class="tag">常用出发城市</p>
						<div v-if="setting"><Input class="textInput"></Input></div>
						<div v-else>北京</div>
					</li>
					<li class="save"><Button class="saveBtn">保存</Button></li>
				</div>

			</div>
		</div>

		<div class="setting">
			<p class="title">
				<span>个人信息设置</span>
				<span v-if="false" class="iconfont">&#xe62f;</span>
			</p>
			<div class="main">
				<div>
					<li>
						<p class="tag">当前密码</p>
						<div><Input class="textInput"></Input></div>						
					</li>
					<li>
						<p class="tag">新密码</p>
						<div><Input class="textInput"></Input></div>		
					</li>
					<li>
						<p class="tag">确认密码</p>
						<div><Input class="textInput"></Input></div>						
					</li>
					<li class="save"><Button class="saveBtn">保存</Button></li>
				</div>
			</div>
		</div>

		<div class="setting">
			<p class="title">
				<span>个人信息设置</span>
				<span v-if="false" class="iconfont">&#xe62f;</span>
			</p>
			<div class="avatarSet">
				<div class="tip">
					<span>头像</span>
					<input class="hide" id="imgFile" type="file" @change="handleFileChange" ref="inputer"/>
					<label class="imgFileLabel" for="imgFile">上传图片</label>
					<span>仅支持jpg,gif,png格式图片,且文件小于2M</span>
				</div>
				<div class="picture">
					<div class="mainPic">
						<img :src="imgUrl" alt="" />
					</div>
					<div class="minorPic">
						<div>
							<img class="minor180" :src="imgUrl" alt="" />
							<p>180x180像素</p>
						</div>
						<div class="flex smallMinor">
							<div>
								<img class="minor100" :src="imgUrl" alt="" />
								<p>100x100像素</p>
							</div>
							<div>
								<img class="minor50" :src="imgUrl" alt="" />
								<p>50x50像素</p>
							</div>
							<div class="lastMinor30">
								<img class="minor30" :src="imgUrl" alt="" />
								<p>30x30像素</p>
							</div>
						</div>
					</div>
				</div>
				<li class="save"><Button class="saveBtn">保存</Button></li>				 
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
	@import '../../../style/mixin.scss';
	@import "./style.scss";
</style>