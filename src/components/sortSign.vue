<template>
	<div id="sortSign">
		<img v-if="type==false" src="../images/shopping/antitone.png" alt="" /><!--反序-->
		<img v-if="type==true" src="../images/shopping/sequence.png" alt="" /><!--有序-->
		<img v-if="type==null" src="../images/shopping/unordered.png" alt="" /><!--无序-->
	</div>
</template>

<script>
	export default {
		props:['type'],
		data() {
			return {

			}
		},
		computed: {

		},
	}
</script>

<style lang="scss" scoped>
	#sortSign {
		display: flex;
		align-items: center;
		img {
			width:20px;
		}
	}
</style>