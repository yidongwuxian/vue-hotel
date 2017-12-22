<template>
  <div id="train">
  	<div class="route">
  		<span>火车票</span>
  		<span>{{train.from_station}} - {{train.arrive_station}}</span>
  	</div>
  	<div class="xingcheng">
  		<span>{{train.train_code}}</span>
  		<span>{{train.from_station}} - {{train.arrive_station}}</span>
  		<span>{{train.travel_time}} {{train.from_time}}</span>
  	</div>
  	<div v-for="passenger in passengers">
  		<span>{{passenger.ticketType|trainTicketType}}：</span>
  		<span>{{passenger.userName}}</span>
  		<span>{{passenger.userIds}}</span>
  		<span class="seatRank">{{passenger.seattype|trainSeatType}}</span>
  		<span v-if="false">05车厢01座</span>
  	</div>
  </div>
</template>

<script>
import { getSStore } from "@/utils/util"
export default {
  props:[],
  data(){
  	return{
  		train:null,
  		passengers:null
  	}
  },
  computed:{
  	
  },
  methods:{
  	
  },
  created(){
  	this.train = JSON.parse(getSStore('trainOrderData'));
  	this.passengers = JSON.parse(getSStore('trainOrderPassengers'));
  }
}
</script>

<style lang="scss" scoped>
	#train{
		.route{
			font-size: 14px;
			font-weight: 600;
			color:black;
			line-height: 26px;
		}
		.xingcheng{
			line-height: 26px;
		}
		.seatRank{
			margin:0 25px;
		}
	}
	
</style>
