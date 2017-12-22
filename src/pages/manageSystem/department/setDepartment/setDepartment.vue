<template>
	<div id="setDepartment">
		<div>
			<p class="title">
				<span v-if="!addStatus" class="titleText">部门列表</span>
				<span v-if="addStatus&&!editStatus" class="titleText">新增部门</span>
				<span v-if="editStatus" class="titleText">修改部门</span>
				<span @click="addStatus=!addStatus" v-if="!addStatus" title="添加" class="add iconfont">&#xe620;</span>
			</p>
			<!------------------------------------------部门列表部分---------------------------------------->
			<div v-if="!addStatus" class="departmentList">
				<Tree :data="baseData" :render="renderContent"></Tree>
				<!--删除提示-->
				<Modal
			        v-model="showDelete"
			        title="删除提示"
			        @on-ok="del">
			        <p>该部门将被解散，本部门的人员不会被删除，随后请手动为他们分配部门。</p>			        
			    </Modal>
			</div>
			<!------------------------------------------新增部门部分---------------------------------------->
			<div v-else class="addMessage">
				<div>
					<ul>
						<li>
							<div class="tag">
								<span>上级部门:</span>
							</div>
							<div class="content">
								<Input placeholder="Enter something..."></Input>
							</div>
						</li>
						<li>
							<div class="tag">
								<span class="star">*</span>
								<span>部门名称:</span>
							</div>
							<div class="content">
								<Input placeholder="Enter something..."></Input>
							</div>
						</li>
						<li>
							<div class="tag">
								<span class="star">*</span>
								<span>部门负责人:</span>
							</div>
							<div class="content">
								<Input placeholder="Enter something..."></Input>
							</div>
						</li>
					</ul>
					<div class="btn">
						<Button @click="submit" type="error" class="submit">保存</Button>
						<Button @click="back" class="submit back">返回</Button>
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