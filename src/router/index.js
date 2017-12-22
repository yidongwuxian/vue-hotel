import Vue from 'vue'
import Router from 'vue-router'
import { getSStore } from "../utils/util"
/*————————————————————————————————————————————登录——————————————————————————————————————————*/
const Login = resolve => require(['@/pages/login/login'], resolve)
/*————————————————————————————————————————————首页模块———————————————————————————————————————*/
//公共头部包含背景图和logo
const Home = resolve => require(['@/components/home/home'], resolve)
/*首页模块公共部分——————————*/
const Task = resolve => require(['@/pages/home/task/task'], resolve)
//我的差旅页面
const MyTravel = resolve => require(['@/pages/home/myTravel/myTravel'], resolve)
//行程预定页面
const TravelBooking = resolve => require(['@/pages/home/travelBooking/travelBooking'], resolve)
//差旅审批页面
const TravelApproval = resolve => require(['@/pages/home/travelApproval/travelApproval'], resolve)
//我的审批详情页面
const MyTravelDetail = resolve => require(['@/pages/home/details/myTravelDetail/detail'], resolve)
//差旅审批详情页面
const TravelApprovalDetail = resolve => require(['@/pages/home/details/travelApprovalDetail/detail'], resolve)
//行程预定详情页面
const TravelBookingDetail = resolve => require(['@/pages/home/details/travelBookingDetail/detail'], resolve)
//出差申请页面
const ApplyTrip = resolve => require(['@/pages/home/applyTrip/applyTrip'], resolve)
//个人设置的页面
const PersonalSetting = resolve => require(['@/pages/home/personalSetting/personalSetting'], resolve)

//酒店订单详情
const HotelOrderDetail = resolve => require(['@/pages/home/orders/hotelOrderDetail/hotelOrderDetail'], resolve)
//机票订单详情
const FlightOrderDetail = resolve => require(['@/pages/home/orders/flightOrderDetail/flightOrderDetail'], resolve)
//火车订单详情
const TrainOrderDetail = resolve => require(['@/pages/home/orders/trainOrderDetail/trainOrderDetail'], resolve)

/*————————————————————————————————————————————系统管理模块————————————————————————————————————*/
//系统管理模块的公共头部
const ManageSystem = resolve => require(['@/components/manageSystem/manageSystem'], resolve)
//系统管理模块的公共容器
const View = resolve => require(['@/components/View'], resolve)
/*企业管理部分——————————*/
//企业信息
const Information = resolve => require(['@/pages/manageSystem/company/information/information'], resolve)
//配送信息
const Dispatching = resolve => require(['@/pages/manageSystem/company/dispatching/dispatching'], resolve)
/*部门管理部分——————————*/
//设置部门
const SetDepartment = resolve => require(['@/pages/manageSystem/department/setDepartment/setDepartment'], resolve)
//设置职级
const SetRank = resolve => require(['@/pages/manageSystem/department/setRank/setRank'], resolve)
/*员工管理部分——————————*/
//员工列表页面
const EmployeeList = resolve => require(['@/pages/manageSystem/employee/employeeList/employeeList'], resolve)
//添加员工页面
const EmployeeAdd = resolve => require(['@/pages/manageSystem/employee/employeeAdd/employeeAdd'], resolve)
//批量导入页面
const EmployeeImport = resolve => require(['@/pages/manageSystem/employee/employeeImport/employeeImport'], resolve)
//新员工审核页面
const EmployeeAudit = resolve => require(['@/pages/manageSystem/employee/employeeAudit/employeeAudit'], resolve)
/*权限管理部分——————————*/
//角色管理页面
const RoleManage = resolve => require(['@/pages/manageSystem/auth/roleManage/roleManage'], resolve)
//新增角色页面
const MemberManage = resolve => require(['@/pages/manageSystem/auth/memberManage/memberManage'], resolve)
//角色成员管理页面
const AddRole = resolve => require(['@/pages/manageSystem/auth/addRole/addRole'], resolve)
/*规则管理部分——————————*/
//机票规则管理页面
const FlightRule = resolve => require(['@/pages/manageSystem/rule/flight/flight'], resolve)
//酒店规则管理页面
const HotelRule = resolve => require(['@/pages/manageSystem/rule/hotel/hotel'], resolve)
//火车票规则管理页面
const TrainRule = resolve => require(['@/pages/manageSystem/rule/train/train'], resolve)
/*差旅分析部分——————————*/
const Analyze = resolve => require(['@/pages/manageSystem/analyze/analyze'], resolve)







/*————————————————————————————————————————————机票模块————————————————————————————————————————*/
const FlightSearch = resolve => require(['@/pages/flight/search/search'], resolve)
const FlightShopping = resolve => require(['@/pages/flight/shopping/shopping'], resolve)
const FlightOrder = resolve => require(['@/pages/flight/order/order'], resolve)


/*————————————————————————————————————————————酒店模块————————————————————————————————————————*/
const HotelSearch = resolve => require(['@/pages/hotel/search/search'], resolve)
const HotelShopping = resolve => require(['@/pages/hotel/shopping/shopping'], resolve)
const HotelDetails = resolve => require(['@/pages/hotel/details/details'], resolve)
const HotelOrder = resolve => require(['@/pages/hotel/order/order'], resolve)

/*————————————————————————————————————————————火车票模块————————————————————————————————————————*/
const TrainSearch = resolve => require(['@/pages/train/search/search'], resolve)
const TrainShopping = resolve => require(['@/pages/train/shopping/shopping'], resolve)
const TrainOrder = resolve => require(['@/pages/train/order/order'], resolve)


/*————————————————————————————————————————————支付模块————————————————————————————————————————*/
const Pay = resolve => require(['@/components/pay/pay'], resolve)

Vue.use(Router)

let router = new Router({
	routes: [
		//登录
		{
			path: '/',
			name: 'login',
			component: Login
		},
		//首页模块
		{
			path: '/home',
			name: 'home',
			component: Home,
			redirect: '/home/task',
			children: [
				//任务列表
				{
					path: '/home/task',
					component: Task,
					name: 'task',
					redirect: '/home/task/mytravel',
					children: [
						{ path: '/home/task/mytravel', component: MyTravel, name: '我的差旅', },
						{ path: '/home/task/travelbooking', component: TravelBooking, name: '行程预定', },
						{ path: '/home/task/travelapproval', component: TravelApproval, name: '差旅审批', },
						{ path: '/home/task/mytraveldetail', component: MyTravelDetail, name: '我的审批详情', },
						{ path: '/home/task/travelapprovaldetail', component: TravelApprovalDetail, name: '差旅审批详情', },
						{ path: '/home/task/travelbookingdetail', component: TravelBookingDetail, name: '行程预定详情', },
						{ path: '/home/task/personalsetting', component: PersonalSetting, name: '个人设置', },
					]
				},
				//出差申请
				{ path: '/home/applytrip', component: ApplyTrip, name: 'applyTrip' }, //申请出差
				{ path: '/home/hotelorderdetail', component: HotelOrderDetail, name: '酒店订单详情' }, //酒店订单详情
				{ path: '/home/flightorderdetail', component: FlightOrderDetail, name: '机票订单详情' }, //机票订单详情
				{ path: '/home/trainorderdetail', component: TrainOrderDetail, name: '火车订单详情' }, //火车订单详情
			]
		},
		/*flight模块*/
		{
			path: '/flight',
			component: Home,
			name: '航班',
			redirect: '/flight/search',
			children:[
				{ path: '/flight/search', component: FlightSearch, name: '航班预定', },
				{ path: '/flight/shopping', component: FlightShopping, name: '航班列表', },
				{ path: '/flight/order', component: FlightOrder, name: '航班订单', },
				{ path: '/flight/pay', component: Pay, name: '航班订单支付', },
			]
			
		},
		/*train模块*/
		{
			path: '/train',
			component: Home,
			name: '火车票',
			redirect: '/train/search',
			children:[
				{ path: '/train/search', component: TrainSearch, name: '火车票预定', },
				{ path: '/train/shopping', component: TrainShopping, name: '火车票列表', },
				{ path: '/train/order', component: TrainOrder, name: '火车票订单', },
				{ path: '/train/pay', component: Pay, name: '火车票订单支付', },				
			]
			
		},
		/*hotel模块*/
		{
			path: '/hotel',
			component: Home,
			name: '酒店',
			redirect: '/hotel/search',
			children:[
				{ path: '/hotel/search', component: HotelSearch, name: '预定酒店', },
				{ path: '/hotel/shopping', component: HotelShopping, name: '酒店列表', },
				{ path: '/hotel/details', component: HotelDetails, name: '酒店详情', },
				{ path: '/hotel/order', component: HotelOrder, name: '预定信息', },
				{ path: '/hotel/pay', component: Pay, name: '酒店订单支付', },
			]
			
		},
		/*系统管理模块*/
		{
			path: '/managesystem',
			name: 'manageSystem',
			component: ManageSystem, //此名字不可改动
			redirect: '/managesystem/company',
			children: [{
					path: '/managesystem/company',
					component: View,
					name: '企业管理',
					redirect: '/managesystem/company/information',
					children: [
						{ path: '/managesystem/company/information', component: Information, name: '企业信息', },
						{ path: '/managesystem/company/dispatching', component: Dispatching, name: '配送信息', }
					]
				},
				{
					path: '/managesystem/department',
					component: View,
					name: '部门管理',
					children: [
						{ path: '/managesystem/department/setdepartment', component: SetDepartment, name: '设置部门', },
						{ path: '/managesystem/department/setrank', component: SetRank, name: '设置职级' }
					]
				},
				{
					path: '/managesystem/employee',
					component: View,
					name: '员工管理',
					leaf: true, // 只有一个节点，无二级菜单
					redirect: '/managesystem/employee/list',
					children: [
						{ path: '/managesystem/employee/list', component: EmployeeList, name: '员工列表' },
						{ path: '/managesystem/employee/add', component: EmployeeAdd, name: '添加员工', single: true },
						{ path: '/managesystem/employee/import', component: EmployeeImport, name: '批量导入' },
						{ path: '/managesystem/employee/audit', component: EmployeeAudit, name: '新员工审核' }
					]
				},
				{
					path: '/managesystem/auth',
					component: View,
					name: '权限管理',
					leaf: true, // 只有一个节点
					redirect: '/managesystem/auth/rolemanage',
					children: [
						{ path: '/managesystem/auth/rolemanage', component: RoleManage, name: '角色管理' },
						{ path: '/managesystem/auth/membermanage', component: MemberManage, name: '角色成员管理' },
						{ path: '/managesystem/auth/addrole', component: AddRole, name: '添加角色' },
						{ path: '/managesystem/auth/editrole', component: AddRole, name: '修改角色' }
					]
				},
				{
					path: '/managesystem/rule',
					component: View,
					name: '规则管理',					
					redirect: '/managesystem/rule/flight',
					children: [
						{ path: '/managesystem/rule/flight', component: FlightRule, name: '机票' },
						{ path: '/managesystem/rule/hotel', component: HotelRule, name: '酒店' },						
						{ path: '/managesystem/rule/train', component: TrainRule, name: '火车' },						
					]
				},{
					path: '/managesystem/analyze',
					component: Analyze,
					name: '差旅分析',					
					leaf: true, // 只有一个节点
				},
			]
		},
	]
})

//登录拦截
router.beforeEach((to, from, next) => {
	let user = getSStore('user')
	if(user || to.path == "/") {
		next()
	} else {
		next({ path: '/' })
	}
})

export default router;