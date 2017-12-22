<template>
	<div id="orderStl">
		<!--主内容 start-->
        <!--面包屑导航-->
        <breadcrumb :breads="breads"></breadcrumb>
        <!--加载动画-->
        <load v-if="isLoading"></load>
		<div class="w1140 clear">
		<div class="edit_booking_wrap left">		
		<Form ref="formValidate" :model="formValidate" :label-width="80">
		    <div class="edit_booking">
				<div class="booking_sinf pb0">
					 <span class="s_title yahei">预订信息</span>
					 <div class="booking_box">
					 	<div>
					 		<dl class="date_modify clear">
							 	<dt class="lh-20">入离日期</dt>
							 	<dd>
							 		<span>{{info.checkIn}}{{info.weekIn}}到{{info.checkOut}}{{info.weekOut}}<span v-if="info.checkNum != ''">共{{info.checkNum}}晚</span></span>
							 	</dd>
							 </dl>
							 <dl class="num_modify clear">
									<dt>房间数量</dt>
									<dd>
										<span class="num-stock">
											<a href="javascript:;" class="btn-reduce" name="btnReduce"  @click="minus(index)">-</a>
											<input type="text" readonly="readonly" class="buy-num" v-model="counterVal" minlength="1"  maxlength="10" />
											<a href="javascript:;" class="btn-add" name="btnAdd" @click="addNum()">+</a>		
									    </span>
										<div id="isOnTimePrompt" style="display:none"></div>
									</dd>
							 </dl>
							 <dl class="total_modify clear">
							 	<dt>房费总计</dt>
							 	<dd>
							 		<span class="price">¥<span class="bold_sty">{{roomRate}}</span></span>
							 	</dd>
							 </dl>
					 	</div>
					 </div>
				</div>
			</div>
			<div class="booking_sinf">
				<span class="s_title yahei">入住信息</span>
				<div class="booking_box">
					<div v-for="(sitem,index) in formValidate.infoArr" :key="index"  class="booking_line" >
							<FormItem :label="'房间' + (index+1)" :prop="'infoArr.' +index+ '.Name'" :rules="{ required: true, message: '入住人'+(index+1)+'姓名不能为空', trigger: 'blur' }">
					            <Input v-model="sitem.Name"  class="booking_txt" placeholder="请填写姓名"></Input>
					    	</FormItem>
							<FormItem label="性别">
								<RadioGroup v-model="sitem.Gender">
		                                <Radio label="Maile">
		                                    <span>男</span>
		                                </Radio>
		                                <Radio label="Female">
		                                    <span>女</span>
		                                </Radio>
		                            </RadioGroup> 
							</FormItem>
							<FormItem label="国籍" :prop="'infoArr.' +index+ '.Nationality'" :rules="{ required: true, message: '国籍不能为空', trigger: 'blur' }">
								<Input v-model="sitem.Nationality" class="booking_txt" placeholder="请填写国籍"></Input> 
							</FormItem>
							<FormItem label="联系电话" :prop="'infoArr.' +index+ '.Mobile'" :rules="[{ required: true, message: '电话不能为空', trigger: 'blur' },
                    { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入有效的11位手机号码', trigger: 'change' }]">
								<Input v-model="sitem.Mobile" class="booking_txt" placeholder="请填写联系电话"></Input>
							</FormItem>
							<FormItem label="电子邮件" :prop="'infoArr.' +index+ '.Email'" :rules="[{ required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱地址不正确', trigger: 'change' }]">
								<Input v-model="sitem.Email" class="booking_txt" placeholder="请填写电子邮件"></Input>
							</FormItem>
					</div>
				</div>	
			</div>  
			<div class="booking_sinf">
				<span class="s_title yahei">联系人信息</span>
				<div class="booking_box">
					<div>
						<FormItem label="姓名" prop="ContactName" :rules="{ required: true, message: '联系人姓名不能为空', trigger: 'blur' }">
				            <Input v-model="formValidate.ContactName" placeholder="请填写姓名"></Input>
				    	</FormItem>
						<FormItem label="性别">
							<RadioGroup v-model="formValidate.ContactGender">
                                <Radio label="Maile">
                                    <span>男</span>
                                </Radio>
                                <Radio label="Female">
                                    <span>女</span>
                                </Radio>
                            </RadioGroup>
                        </FormItem>  
                        <FormItem label="联系电话" prop="ContactMobile" :rules="[{ required: true, message: '联系人电话不能为空', trigger: 'blur' },
                    { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入有效的11位手机号码', trigger: 'change' }]">
				            <Input type="text" v-model="formValidate.ContactMobile"></Input>
				    	</FormItem>
						<FormItem label="电子邮件" prop="ContactEmail" :rules="[{ required: true, message: '联系人邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱地址不正确', trigger: 'change' }]">
				            <Input type="text" v-model="formValidate.ContactEmail"></Input>
				    	</FormItem>
					</div>
				</div>	
			</div>  
			<div class="booking_sinf" v-if="isNotinrule">
				<span class="s_title yahei">超标原因</span>
				<div class="booking_box">
					<div>
						<FormItem label="超标原因" prop="ContactruleContent" :rules="{ required: true, message: '超标原因不能为空', trigger: 'blur' }">
				            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="formValidate.ContactruleContent" placeholder="请填写超标原因"></Input>
				    	</FormItem>
					</div>
				</div>	
			</div>      
			<div class="toolbar-right clear">
				<p class="toolbar-lnk">《条款说明》</p>
	        	<div class="toolbar-normal clear">
	        		<div class="comm-right clear">
	        			<p class="toolbar-snk" @click="backDetails">《返回酒店</p>
	               		<div class="btn-area">
	               			<div class="price-sum">
			 					<p>
									<span class="txt">支付房费</span>
									<span class="price">¥<span class="bold_sty">{{roomRate}}</span></span>
								</p>
								<Button class="priceBtn" @click="handleSubmit('formValidate')">支付</Button>
							</div>
	               		</div>
					</div>      
				</div>
			</div>
			</Form>
		</div>
		<!--左边部分 end-->
		<!--右边部分 start -->
		<div class="hotel_inf right">
		    <div class="hotel_inf_w">
				<ul class="dsider_per_list pb10 clearfixs">
		          <li>
		            <div class="dsider_per_pic">
		            <a href="javascript:;">
		            	<img width="80" height="80" >
		            </a>
		            </div>
		            <div class="dsider_per_text">
		            	<h3  @click="backDetails" v-if="hotelInfo.name">
		                	{{hotelInfo.name}}
		                </h3>
		                <p class="blink" v-if="hotelInfo.roomType">{{hotelInfo.roomType}}</p>
		                <p class="blink" v-if="hotelInfo.address">{{hotelInfo.address}}</p>
		            </div>
		          </li>
		        </ul>
		        <div class="hotel_roominfobox">
			        <ul id="hotelRoomInfoUl" class="hotel_roominfo pb10 clearfix">
						<li v-if="hotelInfo.roomLey">
							<span class="c999">床型：</span>
							<em>{{hotelInfo.roomLey}}</em>
						</li>
						<li v-if="hotelInfo.area">
							<span class="c999">面积：</span>
							<em>{{hotelInfo.area}}平米</em>
						</li>
						<li v-if="hotelInfo.Broadnet">
							<span class="c999">宽带：</span>
							<em>{{hotelInfo.Broadnet}}</em>
						</li>
						<li v-if="hotelInfo.breakfast">
							<span class="c999">早餐：</span>
							<em>{{hotelInfo.breakfast}}</em>
						</li>
						<li v-if="hotelInfo.Floor">
							<span class="c999">楼层：</span>
							<em>{{hotelInfo.Floor}}层</em>
						</li>
						<li v-if="hotelInfo.person">
							<span class="c999">可住：</span>
							<em>
		                  		{{hotelInfo.person}}人
							</em>
						</li>
						<li class="w295" v-if="hotelInfo.Description">
							<span class="c999">其他：</span>
							<em id="othernotes">{{hotelInfo.Description}}</em>
						</li>				
					</ul>
			    </div>
			</div>
		</div>	
		<!--右边部分 end -->
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