<template>
	<div id="pay">
		<breadcrumb :breads="breads"></breadcrumb>
		<load v-if="paying" :model="model"></load>
		<div class="main">
			<p class="title">订单创建成功，请您尽快支付！</p>
			<p class="tip">请您在<span class="payLimit"> 30分钟内 </span>
				完成支付，否则订单会被自动取消。
				<span @click="back" class="backOrder"> <返回订单</span>
			</p>
			<div class="detail" v-if="payType=='hotel'">
				<hotel></hotel>
			</div>
			<div class="detail" v-if="payType=='flight'">
				<flight></flight>
			</div>
			<div class="detail" v-if="payType=='train'">
				<train></train>
			</div>			
			<div class="credit">
				<div class="left">
					<span class="iconfont">&#xe617;</span>
					<b class="sxzf">授信支付</b>
					<span class="sxzg">授信足够</span>
				</div>
				<div class="right">
					<p>支付 <b class="money">{{count}}</b> 元</p>
				</div>
			</div>
			<div class="btn">
				<div>
					<span @click="back" class="backOrder"><<返回订单</span>
					<div @click="pay" class="payBtn">立即支付</div>
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
<style lang="scss" scoped>
	@import '../../style/mixin.scss';
	@import "./style.scss";
</style>