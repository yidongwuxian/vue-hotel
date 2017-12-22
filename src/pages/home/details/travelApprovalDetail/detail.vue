<template>
	<div id="detail">
		<Modal
	        v-model="passModal"
	        title="审核通过"
	        @on-ok="surePass">
	        <p>确定通过此审批？</p>
	    </Modal>
	    <Modal
	        v-model="refuseModal"
	        title="审核拒绝"
	        @on-ok="sureRefuse">
	        <p>        	
	        	<span>
	        		<Input v-model="remark" type="textarea" :autosize="true" placeholder="Enter reason..."></Input>
	        	</span>	        	
	        </p>
	    </Modal>
		<div class="caozuo">
			<breadcrumb :fontColor="'black'" :breads="breads"></breadcrumb>
			<div v-if="applyData.tripState==1&&!applyData.currentUserApproved">
				<Button @click="passModal=true" class="pass">通过</Button>
				<Button @click="refuseModal=true" class="refuse">拒绝</Button>
			</div>
		</div>
		<detailTop :data="applyData"></detailTop>
		<div class="main">
			<div class="rout"><detailRoute :data="applyData"></detailRoute></div>
			<div class="flow"><detailFlow></detailFlow></div>
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
	@import '../../../../style/mixin.scss';
	@import "./style.scss";
</style>