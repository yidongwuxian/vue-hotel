<template>
	<div id="flight">
		<ruleTable :data='data' :text='text' :add='add' :active='active' :del="del"></ruleTable>
		<Modal
			v-model="addModel"
			title="机票差旅规则"
			@on-ok="sure"
			@on-cancel="cancel">	        
	        <div class="modalContent">
	            <div>
	            	<p class='tag'>员工级别</p>
	            	<Select v-model="newRule.level">
				        <Option v-for="item in staffLevel" :value="item.value" :key="item.value">{{item.label}}</Option>
				    </Select>
	            </div>
	            <div>
	            	<p class='tag'>折扣</p>
	            	<Input v-model="newRule.discountStart"></Input><span>%-</span>
	            	<Input v-model="newRule.discountEnd"></Input><span>%</span>
	            </div>
	        </div>	        
	    </Modal>
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
	@import '../../../../style/custom.css';
	@import "./style.scss";
</style>