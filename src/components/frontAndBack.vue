<template>
  <div id="frontAndBack">
  	<div @click="choose('-1')" class="choose"><span class="iconfont">&#xe939;</span>前一天</div>
  	<div class="preDate">{{date|monDayWeek}}</div>
  	<div @click="choose('1')" class="choose">后一天<span class="iconfont">&#xe610;</span></div>
  </div>
</template>

<script>
import { frontAndBackDay } from '@/utils/util'
export default {
  props:['date'],
  data(){
  	return{
  		
  	}
  },
  computed:{
  	
  },
  methods:{
  	choose(step){
  		let Date = frontAndBackDay(this.date,step)
  		this.$emit('getDate',Date)
  	}
  },
  created(){
  	
  }
}
</script>

<style lang="scss" scoped>
	#frontAndBack{
		height:100%;
		display: flex;
		color:white;
		>div{
			width:140px;
			height:100%;	
			line-height: 40px;								
			text-align: center;
			cursor: pointer;
			.iconfont{
				font-size: 12px;
				padding:0 5px;
			}
			&.preDate{
				background: #f55858;
			}
			&.choose{
				width:120px;
				transition:0.3s; 
				&:first-child{
					text-align: left;
				}
				&:last-child{
					text-align: right;
				}
				&:hover{
					color:#00b4ff;
				}
			}
		}
	}
	

</style>
