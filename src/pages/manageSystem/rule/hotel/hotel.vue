<template>
	<div id="hotel">
		<ruleTable :data='data' :text='text' :add='add' :active='active' :del="del"></ruleTable>
		<Modal
			v-model="addModel"
			title="酒店差旅规则"
			@on-ok="sure"
			@on-cancel="cancel">	        
	        <div class="modalContent">
	            <div>
	            	<p class='tag'>员工级别</p>
	            	<Select v-model="newRule.level">
				        <Option v-for="item in rankList" :value="item.value" :key="item.value">{{item.label}}</Option>
				    </Select>
	            </div>
	            <div>
	            	<p class='tag'>默认</p>
	            	最高不超过 <Input v-model="newRule.defaultLevelCityPrice" style="width:210px;margin:0 4px"></Input> 元
	            </div>
	            <div>
					<Select v-model="newRule.cityLevel" style="width:70px;margin-right: 20px;">
				        <Option v-for="item in levelList" :value="item.value" :key="item.value">{{item.label}}</Option>
				    </Select>
	            	最高不超过 <Input v-model="newRule.firstLevelCityPrice" style="width:210px;margin:0 4px"></Input> 元
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