<template>
	<div id="shoppingStl">
		<!--主内容 start-->
        <!--面包屑导航-->
        <breadcrumb :breads="breads"></breadcrumb>
        <!--加载动画-->
        <load v-if="isLoading"></load>
        <div class="w1140 clear">   
            <div class="main">
                <!--搜索框 start-->
                <div class="searchBox mb5">  
                    <Form :model="shoppingItem" :label-width="80">
                        <div class="selectWarp">
                            <input type="hidden" v-model="shoppingItem.SelName" />
                            <Select v-model="shoppingItem.SelCode" :label-in-value="true"  @on-change="v=>{ setOption(v,'SelCode')}">
                                <Option v-for="item in cityList" :value="item.cityCode" :key="item.cityCode">{{ item.cityName }}</Option>
                            </Select>
                        </div>
                        <div class="inputItem">
                            <DatePicker type="date" format="yyyy-MM-dd" v-model="shoppingItem.checkIn"></DatePicker>
                        </div>
                        <div class="inputItem">
                            <DatePicker type="date" format="yyyy-MM-dd" v-model="shoppingItem.checkOut"></DatePicker>
                        </div>
                        <div class="inputWarp">
                            <div class="inputText">
                            <input type="text" class="input_name" v-model="shoppingItem.keyword" placeholder="如酒店名" />
                            </div>
                        </div>    
                        <span class="btn_search_w1 right" @click="dataResult">
                            搜索
                        </span>
                    </Form>
                </div>
                <!--搜索框 end-->
                <!--过滤框 start-->
                <div class="filter_box">
                    <Form :model="filterItem" >
                        <div class="filter_item">
                            <div class="filter_title">
                                <span class="iconfont filter_ico">&#xe644;</span>酒店位置
                            </div>
                            <div class="filter_option_box">
                                <div class="filter_option">
                                    <div class="filter_posi_show">
                                        <RadioGroup v-model="filterItem.region" >
                                            <Radio label="">
                                                <span>不限</span>
                                            </Radio>
                                            <Radio v-for="item in cityCodes" :key="item.DistrictId" :label='item.DistrictId'>
                                                <span>{{item.DistrictName}}</span>
                                            </Radio>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="filter_item">
                            <div class="filter_title"><span class="iconfont filter_ico">&#xe603;</span>价格范围</div>
                            <div class="filter_option_box">
                                <RadioGroup v-model="filterItem.housePrice">
                                    <Radio label="">
                                        <span>不限</span>
                                    </Radio>
                                    <Radio label="150">
                                        <span>￥150以下</span>
                                    </Radio>
                                    <Radio label="150-300">
                                        <span>￥150-300</span>
                                    </Radio>
                                    <Radio label="300-600">
                                        <span>￥300-600</span>
                                    </Radio>
                                    <Radio label="600">
                                        <span>￥600以上</span>
                                    </Radio>
                                </RadioGroup>
                                <div class="fliter_custom">
                                    <label>自定义</label>
                                    <input type="text" class="fliter_custom_txt" v-model="filterItem.minCustom" />
                                    <span class="fliter_custom_span">—</span>
                                    <input type="text" class="fliter_custom_txt" v-model="filterItem.maxCustom" />
                                </div>
                            </div>
                        </div>
                        <div class="filter_item">
                            <div class="filter_title"><span class="iconfont filter_ico">&#xe616;</span>酒店星型</div>
                            <div class="filter_option_box">
                                <CheckboxGroup v-model="filterItem.fliterStar">
                                    <Checkbox label="0,1,2">
                                        <span>二星级以下/经济</span>
                                    </Checkbox>
                                    <Checkbox label="3">
                                        <span>三星级/舒适</span>
                                    </Checkbox>
                                    <Checkbox label="4">
                                        <span>四星级/高档</span>
                                    </Checkbox>
                                    <Checkbox label="5">
                                        <span>五星级/豪华</span>
                                    </Checkbox>
                                </CheckboxGroup>
                            </div>
                        </div>
                    </Form>
                </div>
                <!--过滤框 end-->
                <!--列表 start-->
                <div class="hlist_main left">
                    <div v-for="(item,index) in shopLists" :key="index">    
                        <div class="h_item">
                            <div class="h_info_pic">
                                <a href="javascript:;"><img method="bigImg" data-mark="img_91244394" src="http://pavo.elongstatic.com/i/Hotel180_135/0004kxnB.jpg" data-src="http://pavo.elongstatic.com/i/Hotel480_350/0004kxnB.jpg" alt="飘HOME连锁酒店(北京王府井店)" width="120" height="120"></a>
                            </div>
                            <div class="h_info_text">
                                <div class="h_info_pri">
                                    <p>
                                        <a href="javascript:;" @click="goDetail(index)">
                                        <span class="c666">¥</span>
                                        <span class="h_pri_num ">{{item.LowRate}}</span>
                                        <span class="cf55">起</span>
                                        </a>
                                    </p>
                                    <div class="to_detail">
                                    <a class="t14" href="javascript:;" @click="goDetail(index)">查看详情 </a>
                                    </div>
                                </div>
                                <div class="h_info_base">
                                    <p class="h_info_b1">
                                        <a href="javascript:;" @click="goDetail(index)"><span class="iconfont filter_ico">&#xe644;</span>{{item.Detail.HotelName}}</a>
                                    </p>
                                    <p class="h_info_b2">
                                        {{item.Detail.BusinessZoneName}}
                                    </p>
                                    <p class="h_info_b2">
                                        {{item.Detail.Address}}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>    
                    <!--分页 start -->
                    <div class="pagelist" v-if="isPageShow">
                        <Page :total="total" show-elevator :page-size="pageSize" class="page" @on-change="handleChange"></Page>
                    </div>
                    <!--分页 end --> 
                </div>    
                <!--列表 end-->
                
                <!--右侧地图 start -->
                <div class="right">
                    <div id="allmap"></div>
                </div>
                <!--右侧地图 start -->
            </div>
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