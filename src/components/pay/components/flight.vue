<template>
  <div id="flight">
  	<div class="route">
  		<span>机票</span>
  		<span>{{flight.data.segments[0].fromCityCn}} - 
  			{{flight.data.segments[flight.data.segments.length-1].toCityCn}}
  		</span>
  	</div>
  	<div class="xingcheng">
  		<span class="title">行程</span>
  		<span>{{flight.data.segments[0].fromAirportCn}}{{flight.data.segments[0].fromTower}} - 
  			{{flight.data.segments[flight.data.segments.length-1].toAirportCn}}{{flight.data.segments[flight.data.segments.length-1].toTower}}
  		</span>
  		<span class="depDate">出发时间：{{flight.data.segments[0].fromDate}}</span>
  	</div>
  	<div v-for="passenger in passengers">
  		<span class="title">乘机人：</span>
  		<span>{{passenger.lastName_cn}}</span>
  		<span class="zhengjian">乘机证件：</span>
  		<span>{{passenger.docType|docType}}</span>
  		<span>{{passenger.docId}}</span>
  	</div>
  </div>
</template>

<script>
import { getSStore } from "@/utils/util"
export default {
  props:[],
  data(){
  	return{
  		flight:null,
  		passengers:null
  	}
  },
  computed:{
  	
  },
  methods:{
  	
  },
  created(){
  	this.flight = JSON.parse(getSStore('flightData'));
  	this.passengers = JSON.parse(getSStore('flightPassengers'));
  }
}
</script>

<style lang="scss" scoped>
	#flight{
		.route{
			font-size: 14px;
			font-weight: 600;
			color:black;
			line-height: 26px;
		}
		.xingcheng{
			line-height: 26px;
		}
		.depDate,.zhengjian{
			margin-left: 25px;
		}
		.title{
			display: inline-block;
			width:50px;
		}
	}
	
</style>
