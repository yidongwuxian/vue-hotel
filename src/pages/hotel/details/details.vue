<template>
	<div id="detailsStl">
		<!--主内容 start-->
        <!--面包屑导航-->
        <breadcrumb :breads="breads"></breadcrumb>
        <!--加载动画-->
        <load v-if="isLoading"></load>
        <div class="response_wrap clear">   
            <!--左边部分 start-->
            <div class="hdetail_main">
                <div class="tt">
                    <h2><b>{{infoArrs.HotelName}}</b></h2>
                    <p><span>[{{infoArrs.BusinessZoneName}}]{{infoArrs.Address}}</span></p>
                </div>
                <!--轮播图 start-->
                <div class="hdetail_player">
                    <iswiper :listImg="listImg"></iswiper>
                </div>
                <!--轮播图 end-->
                <div class="date_change">
                    <div class="search_item search_date">
                        <label class="inputText">
                            <DatePicker type="date" class="check_style" format="yyyy-MM-dd" v-model="checkIn"></DatePicker>
                        </label>
                        <label class="inputText">
                            <span>至</span>
                            <DatePicker type="date" class="check_style" format="yyyy-MM-dd" v-model="checkOut"></DatePicker>
                        </label>
                        <a href="javascript:;" class="search_btn left" @click="reSearch">重新搜索</a>
                    </div>
                    
                </div>
                <!--列表内容 start-->
                <div class="hdetail_type">
                    <div class="htype_item" v-for="(n,indexy) in roomItems" :key="indexy">
                        <Collapse active-key="1" >
                            <Panel key="{{indexy+1}}" >

                                <div class="htype_info clear">
                                    <div class="htype_info_pic left">
                                        <img src="http://pavo.elongstatic.com/i/Hotel120_120/nw_0006otcF.jpg" onerror="this.src='http://img.elongstatic.com/hotel/other/no_hap.jpg'" width="70" height="70">
                                    </div>
                                    <div class="htype_info_pb right">
                                        <p v-for="(item,index) in detailItems" :key="index">
                                            <span class="htype_info_num">¥<b class="bold_sty">{{item.LowRate}}</b></span>
                                            <span>起</span>
                                        </p>
                                        <p class="htype_info_total" v-if="n.RatePlans">共{{n.RatePlans.length}}个产品</p>
                                    </div>
                                    <div class="htype_info_nt">
                                        <p>
                                            <b>{{n.Name}}</b>
                                        </p>
                                        <div>
                                            <span>房间{{n.Area}}m<i>|</i></span>
                                            <span>{{n.BedType}}<i>|</i></span> 
                                            <span>可住{{n.Capcity}}人<i>|</i></span> 
                                            <span>楼层{{n.Floor}}层<i>|</i></span> 
                                            <span>{{Broadnet}}</span>
                                        </div>
                                    </div>
                                </div>
                                <p slot="content">
                                    <table cellpadding="0" cellspacing="0" class="htype-table">
                                        <thead>
                                        <tr>
                                            <th class="ht_empty">产品名称</th>
                                            <th class="ht_name">早餐</th>
                                            <th class="ht_retu">日均价</th>
                                            <th class="ht_pri">&nbsp;</th>
                                            <th class="ht_book">&nbsp;</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(m,indexz) in n.RatePlans" :key="indexz">
                                                <td class="ht_empty">{{m.RatePlanName}}</td>
                                                <td class="ht_name">
                                                    <span>{{breakfast}}</span>
                                                </td>
                                                <td class="ht_retu"> 
                                                    <span method="AvgPrice" class="ht_pri_h cur">¥<span class="ht_pri_num">{{m.AverageRate}}</span><span v-if="m.rule == 'notinrule' " class="exceed_standard">超标</span></span>
                                                </td>
                                                <td class="ht_pri">
                                                    &nbsp;
                                                </td>
                                                <td class="ht_book">
                                                    <a class="btn_com_w1" rel="nofollow" method="order" :disabled="isOrder" @click="goOrder(n,m)">预订</a>
                                                </td>
                                            </tr>
                                            <!-- <tr v-if="n.Description">
                                                <td>{{n.Description}}</td>
                                            </tr> -->
                                        </tbody>
                                    </table>
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                </div>
                <!--列表内容 end-->
            </div>
            <!--左边部分 end-->
            <!--右边部分 start-->
            <div class="info_box">
                <div class="info">
                    <h2><b>酒店信息</b></h2>
                    <ul>
                        <li v-if="infoArrs.Phone">
                            <p>酒店电话:</p>
                            <span class="ml10">{{infoArrs.Phone}}</span>
                        </li>
                       <!--  <li>
                            <p>停车场:</p>
                            <span class="ml10">酒店提供收费停车位</span>
                        </li>
                        <li>
                            <p>开业时间:</p>
                            <span class="ml10">酒店开业时间 2011年</span>
                        </li>
                        <li>
                            <p>酒店设施:</p><br />
                            <span>免费Wifi、收费停车、商务中心、会议室、中餐厅、西餐厅、叫车服务、婚宴服务、叫醒服务、洗衣服务、送餐服务、旅游服务、租车服务、专职行李员、行李寄存、有电梯、前台保险柜、大堂吧、残障人客房、咖啡厅、无烟楼层、24小时热水、宴会厅、桑拿浴室、美容美发室、SPA、足浴/足疗、按摩保健</span>
                        </li> -->
                        <li v-if="infoArrs.Features">
                            <p>酒店服务:</p><br />
                            <span>{{infoArrs.Features}}</span>
                        </li>
                        <!-- <li>
                            <p>酒店简介:</p><br />
                            <span>北京福地凰城酒店坐落在有着”中华第一街”美誉的王府井大街北端，是一家高端商务酒店。酒店掩映于气势恢弘的紫禁城之下，古老的四合院静置在酒店的一旁。穿过曲靖通幽的胡同，无声的与现代繁华相融合。酒店地处东四北大街钱粮胡同，邻近东城区政府、中国美术馆，去往新东安广场、王府井、天安门十分便利。 　　酒店地上7层，地下三层，建筑外观典雅庄重，卓尔不群，尽显欧陆风情。凌然于灰墙碧瓦的四合院之中，守望在金碧辉煌的紫禁城一侧。酒店拥有各类客房，配备中、西餐厅、多功能厅及多个独立的会议室，是宾客商务、旅游的理想选择。 　　酒店开业时间2011年12月01日，主楼高7层，客房总数193间（套）。</span>
                        </li> -->
                    </ul>
                </div>
                 <!--右边地图 start-->
                 <div id="detailsMap"></div>
                 <!--右边地图 end-->
            </div>
            <!--右边部分 end-->
        </div> 
		<!--主内容 end-->
	</div>
</template>

<script>
	import main from './main';
	export default {
		...main
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	@import '../../../style/mixin.scss';
	@import '../../../style/custom.css';
	@import "./style.scss";
</style>