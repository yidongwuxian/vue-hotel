import Vue from 'vue'
Vue.filter("date", function(input) {
	if(!input) return "";
	return new Date(input).toLocaleDateString();
});
/**
 * 主流程状态
 */
Vue.filter("tripState", function(input) {
	if(input==0) return "暂存";
	if(input==1) return "审核中";
	if(input==2) return "审核通过";
	if(input==3) return "审核驳回";
});

/**
 * 子流程状态
 */
Vue.filter("childState", function(input) {
	if(input==0) return "待预定";
	if(input==1) return "预订中";
	if(input==2) return "预订成功";
	if(input==3) return "预订失败";
});
/**
 * 从日期中截取时分
 */
Vue.filter("getTime", function(input) {
	if(!input) return "";
	return input.substr(10,6)
});
/**
 * 从日期中截取月日
 */
Vue.filter("getDate", function(input) {
	if(!input) return "";
	return input.substr(5,5)
});
/**
 * 分钟转化为2小时25分
 */
Vue.filter("getHour", function(input) {
	if(!input) return "";
	input = Number(input);
	let h = parseInt(input/60);
	let m = input-h*60;
	return h+"小时"+m+"分";
});
/**
 * 舱位转化
 */
Vue.filter("cabinRank", function(input) {
	if(!input) return "";
	if(input=='Y') return "经济舱";
	if(input=='F') return "头等舱";
	if(input=='C') return "商务舱";
});

/**
 * 时间转化为12月01日(周二)
 */
Vue.filter("monDayWeek", function(input) {
	if(!input) return "";
	let d = new Date(input);	
	let weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];	
	return `${d.getMonth() + 1}月${d.getDate()}日(${weekDay[d.getDay()]})`  
});

/**
 * 时间转化为 周二
 */
Vue.filter("getWeek", function(input) {
	if(!input) return "";
	let d = new Date(input);	
	let weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];	
	return weekDay[d.getDay()]  
});

/**
 * 证件类型转换
 */
Vue.filter("docType", function(input) {
	if(input==1) return "身份证";
	if(input==2) return "护照";
});


/**
 * 是否超标
 */
Vue.filter("rule", function(input) {
	if(input=='notinrule') return "超标";
	if(input=='inrule') return "未超标";
});
/**
 * 火车座位类型
 */
Vue.filter("trainSeatType", function(input) {
	if(input=='0') return "商务座";
	if(input=='1') return "特等座";
	if(input=='2') return "一等座";
	if(input=='3') return "二等座";
	if(input=='4') return "高级软卧";
	if(input=='5') return "软卧";
	if(input=='6') return "硬卧";
	if(input=='7') return "软座";
	if(input=='8') return "硬座";
	if(input=='9') return "无座";
	if(input=='10') return "其他";
});
/**
 * 火车票类型
 */
Vue.filter("trainTicketType", function(input) {
	if(input=='0') return "成人票";
	if(input=='1') return "儿童票";	
});