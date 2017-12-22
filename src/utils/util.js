/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if(!name) return;
	if(typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if(!name) return;	
	return JSON.parse(window.localStorage.getItem(name));
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if(!name) return;
	window.localStorage.removeItem(name);
}


/**
 * 存储sessionStorage
 */
export const setSStore = (name, content) => {
	if(!name) return;
	if(typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.sessionStorage.setItem(name, content);
}
/**
 * 获取sessionStorage
 */
export const getSStore = name => {
	if(!name) return;	
	return window.sessionStorage.getItem(name);
}
/**
 * 删除sessionStorage
 */
export const removeSStore = name => {
	if(!name) return;
	window.sessionStorage.removeItem(name);
}
/**
 * 去除字符串所有空格
 */
export const Trim = str => {
	if(str) return str.replace(/\s+/g, "")
	else return '';
}

/**
 * 时间不足零，补零
 */
export const zerofill = (n) => {
    if(n < 10){
     return  n = '0' + n;
    }else{
     return n;
    }
}

export const toDecimal = (x) => { 
   var f = parseFloat(x); 
   if (isNaN(f)) { 
    return; 
   } 
   f = Math.round(x*100)/100; 
   return f; 
}

/**
 * 判断数字是否含有小数点
 */
export const isDot = (num) => {
	if(!num) return;
	let str = '';
	let res = (num.toString()).indexOf(".");
	if(res != -1) {
		str = toDecimal(num)

    } else {
    	str = num
    }
　　 return str; 
}
/**
 * 计算入住日期到退房日期之间的天数
 */
export const formatRoomDay = (room1,room2) => {
	if(!room1 || !room2) return;
	let d1 = new Date(room1).getTime();
	let d2 = new Date(room2).getTime();
	let days = d2 - d1; 
　　   let day = parseInt(days / (1000 * 60 * 60 * 24)); 
　　  return day; 
}
/**
 * 格式化日期
 */
export const formatDate = (name) => {
	if(!name) return;
	let d = new Date(name);
	return d.getFullYear() + '-' + zerofill(d.getMonth() + 1) + '-' + zerofill(d.getDate()) + ' ' + zerofill(d.getHours()) + ':' + zerofill(d.getMinutes()) + ':' + zerofill(d.getSeconds());  	
}
/**
 * 格式化日期
 */
export const formDate = (date) => {
	if(!date) return;
	let d = new Date(date);
	return d.getFullYear() + '-' + zerofill(d.getMonth() + 1) + '-' + zerofill(d.getDate());
}
/**
 * 获取前后N天的日期
 */
export const frontAndBackDay = (date,step) => {
	if(!date) return;
	let dayMs = 86400*1000*step;
	let ms = new Date(date).getTime();
	var result = ms + dayMs;
	return formatDate(result)
}


/**
 * 从身份证获取出生日期
 */
export const getBirthDay = (iIdNo) => {
	var tmpStr = "";
	var idDate = "";
	var tmpInt = 0;
	var strReturn = "";

	iIdNo = Trim(iIdNo);

	if((iIdNo.length != 15) && (iIdNo.length != 18)) {
		strReturn = "";
		return strReturn;
	}

	if(iIdNo.length == 15) {
		tmpStr = iIdNo.substring(6, 12);
		tmpStr = "19" + tmpStr;
		tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)

		return tmpStr;
	} else {
		tmpStr = iIdNo.substring(6, 14);
		tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)

		return tmpStr;
	}
  }

/**
 * 格式化周期
 */
export const formatWeek = (name) => {
	if(!name) return;
	let d = new Date(name).getDay();
    let week = '';
    switch (d) {  
        case 0 :  
            week = "星期日";  
            break;  
        case 1 :  
            week = "星期一";  
            break;  
        case 2 :  
            week = "星期二";  
            break;  
        case 3 :  
            week = "星期三";  
            break;  
        case 4 :  
            week = "星期四";  
            break;  
        case 5 :  
            week = "星期五";  
            break;  
        case 6 :  
            week = "星期六";  
            break;  
	} 
	return week;
} 

/**
 * 两个数组去重，并合并为一个数组
 */
export const mergeArray = (arr1, arr2) => { 
	for (var i = 0 ; i < arr1.length ; i ++ ){
	   for(var j = 0 ; j < arr2.length ; j ++ ){
		    if (arr1[i] === arr2[j]){
		     	arr1.splice(i,1); 
		    }
	   }
	}
	for(var i = 0; i <arr2.length; i++){
	  	arr1.push(arr2[i]);
	}
 	return arr1;
} 

/**
 * 获取城市三字码
 */
export const getCityCode = (val) => { 
	if(!val) return "";
	return val.substr(-4,3);
} 

/**
 * 价格范围最小值
 */
export const setPriceMinRange = (val) => { 

	if(val.indexOf('-')){
		return val = val.split('-')[0]
	}else{
		if(val === '600'){
			return val;
		}else{
			return val;
		}
	}
	
		
	
	
} 

/**
 * 价格范围最大值
 */
export const setPriceMaxRange = (val) => {

	
	if(val.indexOf('-')){
		return val = val.split('-')[1]
	}else{
		if(val === '150'){
			return val;
		}else{
			return val;
		}
	}
	
}