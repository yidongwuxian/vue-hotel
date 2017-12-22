<template>
	<div id="employeeAdd">
		<Form ref="employeeAddForm" :model="employeeAddForm" :rules="ruleValidate" :label-width="80">
			<div class="requiredMessage">
				<p class="title">账号信息</p>
				<div class="main">
					<ul>
						<li>
							<FormItem label="用户名" prop="username">
					            <Input v-model="employeeAddForm.username" placeholder="填写员工的用户名"></Input>
					    	</FormItem>
						</li>
						<li>
							<FormItem label="密码" prop="password">
					            <Input v-model="employeeAddForm.password" type="password" placeholder="填写员工的密码"></Input>
					    	</FormItem>
						</li>
						<li>
							<FormItem label="姓名" prop="name">
					            <Input v-model="employeeAddForm.name" placeholder="填写员工的真实姓名"></Input>
					    	</FormItem>
						</li>
						<li>
							<FormItem label="手机号码" prop="phone">
					            <Input v-model="employeeAddForm.phone"  placeholder="手机号码将用作用户登录账号"></Input>
					    	</FormItem>
						</li>
						<li>
							<FormItem label="员工角色" prop="role">
					            <RadioGroup v-model="employeeAddForm.role">
								 	<Radio label="30">无业</Radio>
							        <Radio label="1">申请人</Radio>
							        <Radio label="2">审批人</Radio>	
							        <Radio label="11">预订者</Radio>
							        <Radio label="3">预订审批</Radio>						        
							    </RadioGroup>
					    	</FormItem>
						</li>
					</ul>
				</div>
			</div>
			<div class="optionalMessage">
				<p class="title">更多信息(可不填)</p>
				<div class="main">
					<ul>
						<li>
							<FormItem label="姓(英)" prop="surname">
					            <Input v-model="employeeAddForm.surname" placeholder="SURNAME，如LI"></Input>
					    	</FormItem>
						</li>
						<li>
							<FormItem label="名(英)" prop="fame">
					            <Input v-model="employeeAddForm.fame" placeholder="GIVEN NAME，如HONGLEI"></Input>
					    	</FormItem>
						</li>
						<li>
							<FormItem label="国籍" prop="nationality">
					            <Input v-model="employeeAddForm.nationality" required data-required="请填写国籍" value="中国" ></Input>
					    	</FormItem>
						</li>
						<li>
							<FormItem label="员工编号" prop="number">
					           <Input v-model="employeeAddForm.number" placeholder="请填写员工编号" ></Input>
					    	</FormItem>
						</li>
						<li>
							<FormItem label="所属部门">
								<Input v-model="employeeAddForm.department" placeholder="请填写部门" ></Input>
							</FormItem>
						</li>
						<li>
							<FormItem label="职级">
								<Input v-model="employeeAddForm.rank" placeholder="请选择职级" ></Input>
							</FormItem>
						</li>
						<li>
							<FormItem label="昵称" prop="nickname">
					           <Input v-model="employeeAddForm.nickname" placeholder="请填写昵称" ></Input>
					    	</FormItem>
						</li>
						<li>
							<FormItem label="企业邮箱" prop="email">
					           <Input v-model="employeeAddForm.email" placeholder="请填写企业邮箱"></Input>
					    	</FormItem>
						</li>
						<li>
							<FormItem label="性别" prop="gender">
								<RadioGroup v-model="employeeAddForm.gender">
							        <Radio label="1">男</Radio>
							        <Radio label="0">女</Radio>						        
							    </RadioGroup>
							</FormItem>
						</li>
						<li>
							<FormItem label="生日" prop="birthday">
								<DatePicker type="date" :value="employeeAddForm.birthday" v-model="employeeAddForm.birthday"  placeholder="请填写生日"></DatePicker>
							</FormItem>
						</li>
						<li>
							
								<Select style="width:100px" v-model="employeeAddForm.identificationType" >
							        <Option value="1">身份证</Option>
							        <Option value="2">护照</Option>
							    </Select>
							    <FormItem v-if="employeeAddForm.identificationType === '1'" label="证件号码" prop="identificationNo" :rules="[{ required: true, message: '身份证号码不能为空', trigger: 'blur' },{ pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号码不正确', trigger: 'blur' }]">
							    	<Input v-model="employeeAddForm.identificationNo" style="width:196px;"></Input>
							    </FormItem>
							    <FormItem v-if="employeeAddForm.identificationType === '2'" label="证件号码" prop="identificationNo" :rules="[{ required: true, message: '护照号码不能为空', trigger: 'blur' },{ pattern: /^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8，10})$/, message: '护照号码不正确', trigger: 'blur' }]">
							    	<Input v-model="employeeAddForm.identificationNo" style="width:196px;"></Input>
							    </FormItem>	
							    <DatePicker style="margin:2px 0 0 20px" v-model="employeeAddForm.identificationValidity" class="validity" type="date" placeholder="有效期至"></DatePicker>
							
						</li>
					</ul>
				</div>
			</div>
			<div class="btn">
				<Button v-if="addForm"  @click="add" class="save">保存</Button>
				<Button v-if="!addForm" @click="edit" class="save">修改</Button>
				<Button @click="back" class="back">返回</Button>
			</div>
			<Modal
		        v-model="tipModal"
		        title="提示"
		        @on-ok="tipModalOk"
		        @on-cancel="tipModalCancel">
		        <p>是否要保存数据？</p>
		    </Modal>
		</Form>
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
	@import '../../../../style/mixin.scss';
	@import '../../../../style/custom.css';
	@import "./style.scss";
</style>