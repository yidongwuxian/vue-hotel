<template>
	<div id="train">
		<ruleTable :data='data' :text='text' :add='add' :active='active' :del="del"></ruleTable>
		<Modal
			v-model="addModel"
			title="酒店差旅规则"
			width='800'
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
	            	<p class='tag'>G/C-高铁/城际</p>
	            	<RadioGroup v-model="newRule.seatLevel">
				        <Radio label="1">商务座</Radio>
				        <Radio label="2">特等座</Radio>
				        <Radio label="3">一等座</Radio>
				        <Radio label="4">二等座</Radio>
				    </RadioGroup>	            	
	            </div>
	            <div>
	            	<p class='tag'>D-动车</p>
	            	<RadioGroup v-model="newRule.seatLevel">
				        <Radio label="5">商务座</Radio>
				        <Radio label="6">特等座</Radio>
				        <Radio label="7">一等座</Radio>
				        <Radio label="8">二等座</Radio>
				        <Radio label="9">高级软卧</Radio>
				        <Radio label="10">动卧</Radio>
				    </RadioGroup>	  					
	            </div>
	            <div>
	            	<p class='tag'>普通车型</p>
	            	<RadioGroup v-model="newRule.seatLevel">
				        <Radio label="11">软卧</Radio>
				        <Radio label="12">硬卧</Radio>
				        <Radio label="13">软座</Radio>
				        <Radio label="14">硬座</Radio>
				    </RadioGroup>	 					
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