<template>
  <div id="hotel">
  	<div><span class="hotelName">{{dataItem.name}}</span></div>
  	<div>
  		<span>{{dataItem.roomType}}</span>
  		<!-- <span>[单间]</span> -->
  		<span>{{dataItem.roomNum}}间</span>
  		<span class="tag">入住：{{dataItem.checkIn}} {{dataItem.weekIn}}</span>
  		<span class="tag">退房：{{dataItem.checkOut}} {{dataItem.weekOut}}</span>
  		<span class="tag">入住{{dataItem.checkNum}}晚</span>
  	</div>
  </div>
</template>

<script>
import { getSStore, formatRoomDay } from "@/utils/util"
export default {
  props:[],
  data(){
  	return{
  		dataItem:{
        name: '',
        checkIn: '',
        checkOut: '',
        checkNum:0,
        weekIn: '',
        weekOut: '',
        roomNum: 0,
        roomType:''
      }
  	}
  },
  created(){
  	//初始化请求数据
    let payInfo       = JSON.parse(getSStore('payInfo'));
    let DetailsRes    = JSON.parse(getSStore('DetailsRes'));
    let detailsResult = JSON.parse(getSStore('DetailItems'));
    if(!payInfo || !DetailsRes){
      return;
    }
    this.dataItem.name = DetailsRes.HotelName || '';
    this.dataItem.checkIn = payInfo.checkIn || '';
    this.dataItem.checkOut = payInfo.checkOut || '';
    this.dataItem.weekIn = payInfo.weekIn || '';
    this.dataItem.weekIn = payInfo.weekIn || '';
    this.dataItem.roomNum = payInfo.roomNum || 0;
    this.dataItem.checkNum = formatRoomDay(payInfo.checkIn,payInfo.checkOut) || 0;
    this.dataItem.roomType = detailsResult.Name || '';
  }
}
</script>

<style lang="scss" scoped>
	#hotel{
		.hotelName{
			font-size: 14px;
			font-weight: 600;
			color:black;
			line-height: 26px;
		}
		.tag{
			margin-left: 25px;
		}
	}
	
</style>
