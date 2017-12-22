<template>
	<div id="companyDispatching">
		<div>
			<p class="title">
				<span class="titleText">配送信息</span>
				<span @click="edit" v-if="!editStatus"" title="编辑" class="edit iconfont">&#xe62f;</span>
			</p>
			<div class="message">
				<ul>
					<li>
						<div class="tag">							
							<span>定期配送:</span>
						</div>
						<div class="content">
							<Input v-if="editStatus" placeholder="Enter something..."></Input>
							<p v-if="!editStatus">
								<RadioGroup v-model="dispatchingTpye">
							        <Radio label="每年配送">
							            <span>每年配送</span>
							        </Radio>
							        <Radio label="每季度配送">
							            <span>每季度配送</span>
							        </Radio>
							        <Radio label="每月配送">
							            <span>每月配送</span>
							        </Radio>
							    </RadioGroup>
							</p>
						</div>
					</li>
					<li>
						<div class="tag">
							<span class="star">*</span>
							<span>发票抬头:</span>
						</div>
						<div class="content">
							<Input v-if="editStatus" placeholder="Enter something..."></Input>
							<p v-if="!editStatus">天津伊翔运达网络科技有限公司</p>
						</div>
					</li>
					<li>
						<div class="tag">
							<span class="star">*</span>
							<span>收件人:</span>
						</div>
						<div class="content">
							<Input v-if="editStatus" placeholder="Enter something..."></Input>
							<p v-if="!editStatus">石松岩</p>
						</div>
					</li>
					<li>
						<div class="tag">
							<span class="star">*</span>
							<span>联系电话:</span>
						</div>
						<div class="content">
							<Input v-if="editStatus" placeholder="Enter something..."></Input>
							<p v-if="!editStatus">15516507061</p>
						</div>
					</li>
					<li>
						<div class="tag">
							<span class="star">*</span>
							<span>地址:</span>
						</div>
						<div class="content">
							<Input v-if="editStatus" placeholder="Enter something..."></Input>
							<p v-if="!editStatus">北京市朝阳区返利大厦</p>
						</div>
					</li>
				</ul>
			</div>
			<div class="btn" v-if="editStatus">
				<Button @click="submit" type="error" class="submit">保存</Button>
				<Button @click="clear" class="submit clear">清空</Button>
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