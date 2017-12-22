<template>
 <Form :model="formItem">
	<div id="searchStl">
        <!--加载动画-->
        <load v-if="isLoading"></load>
		<!--主内容 start-->
            <div class="navigation">
                <router-link :to="{ path: '/home'}"><span class="index">首页</span></router-link>
                <span> > </span>
                <span>预定酒店</span>
            </div>
            <div class="main">
                    <p class="title">预定酒店</p>
                    <div>
                            <div class="inputWarp">
                                <div class="inputText">
                                    <p class="tag">目的地</p>
                                    <input type="hidden" v-model="formItem.SelName" />
                                    <Select v-if="isTempData == true" v-model="formItem.SelCode" filterable :placeholder="formItem.SelName" :label-in-value="true" @on-change="v=>{ setOption(v,'SelCode')}">
                                        <Option v-for="item in cityList" :value="item.cityCode" :key="item.cityCode">{{ item.cityName }}</Option>
                                    </Select>
                                    <Select v-else v-model="formItem.SelCode" filterable :label-in-value="true"  @on-change="v=>{ setOption(v,'SelCode')}">
                                        <Option v-for="item in cityList" :value="item.cityCode" :key="item.cityCode">{{ item.cityName }}</Option>
                                    </Select>
                                </div>
                            </div>
                            <div class="inputWord">
                                <div class="inputText">
                                    <p class="tag">入住</p>
                                    <DatePicker type="date" class="ml20" format="yyyy-MM-dd" v-model="formItem.checkIn"></DatePicker>
                                </div>
                                <div class="inputText">
                                    <p class="tag ml15">退房</p>
                                    <DatePicker type="date" class="ml15" format="yyyy-MM-dd" v-model="formItem.checkOut"></DatePicker>
                                </div>
                            </div>
                            <div class="dateWarp">
                                <CheckboxGroup v-model="formItem.layout">
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
                            <div class="inputWord">
                                <div class="inputText">
                                    <p class="tag">关键词</p>
                                    <div>
                                        <Input v-model="formItem.keyword" placeholder="如酒店名"></Input>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="searchBtn"  @click="searchResult">搜索</div>
                            </div>

                    </div>
            </div>   
	</div>
</Form>    	
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