<template>
	<div id="employeeList">
		<div>
			<p class="title">
				<span class="titleText">员工管理</span>
			</p>
			<div class="content">
				<div class="head">
					<div class="search">
						<Input v-model="searchParams"  placeholder="手机号/姓名/部门名称" style="width:280px;"></Input>
						<Button @click="searchFn">搜索</Button>
					</div>
					<div class="handle">
						<router-link :to="{ path: '/managesystem/employee/add'}">
							<Button class="add">添加员工</Button>
						</router-link>
						<router-link :to="{ path: '/managesystem/employee/import'}">
							<Button class="import">批量导入</Button>
						</router-link>
						<router-link :to="{ path: '/managesystem/employee/audit'}">
							<Button class="audit">新员工审核</Button>
						</router-link>
						<Button class="active">激活全体员工</Button>
						<Button class="del" @click="delAllItem()">删除全部</Button>
					</div>
				</div>
				<div class="main">
					<table>
						<tr>
							<th>姓名</th>
							<th>手机号</th>
							<th>员工编号</th>
							<th>部门</th>
							<th>职级</th>
							<th>角色</th>
							<th>状态</th>
							<th>操作</th>
						</tr>
						<tr v-for="(item,i) in employeeLists" :key="i">
							<td>
								<Checkbox>{{item.realname}}</Checkbox>
							</td>
							<td>{{item.phoneNumber}}</td>
							<td>{{item.identifier}}</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>
								<div v-if="item.userType === 1">申请人</div>
								<div v-else-if="item.userType === 2">审批人</div>
							    <div v-else-if="item.userType === 11">预订者</div>
							    <div v-else-if="item.userType === 3">预订审批</div>
							    <div v-else>无业</div>
							</td>
							<td>
								<div v-if="item.userState === 0">未激活</div>
								<div v-else>可用</div>
							</td>
							<td class="handle">
								<span class="iconfont" @click="editItem(item.id)">&#xe62f;</span>
								<span class="iconfont" @click="delItem(item.id,i)">&#xe638;</span>
								<span class="iconfont">&#xe622;</span>
							</td>
							<Modal
						        v-model="delItemModal"
						        title="提示"
						        @on-ok="delItemModalOk(item.id,i)"
						        @on-cancel="delItemModalCancel">
						        <p>是否删除这条记录？</p>
						    </Modal>
						</tr>
					</table>
					 <!--分页 start -->
                    <div class="pagelist" v-if="isPageShow">
                        <Page :total="total" show-elevator :page-size="pageSize" class="page" @on-change="handleChange"></Page>
                    </div>
                    <!--分页 end --> 
				</div>
			</div>
			
		    <Modal
		        v-model="delAllModal"
		        title="提示"
		        @on-ok="delAllModalOk"
		        @on-cancel="delAllModalCancel">
		        <p>是否删除全部记录？</p>
		    </Modal>
		</div>
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