function getHttpUtrlAndPort () {
	return "http://182.90.54.2:8088/";
} 
function getWsUtrlAndPort () { 
	return "ws://182.90.54.2:8088/";
}
function getCurrentTime () {
	var date = new Date();
	return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":"
	+ date.getMinutes() + ":" + date.getSeconds();
}

function getCurrentUser (id) { 
	var currentUser = [];
	mui.ajax({
		url: getHttpUtrlAndPort() + 'getMemberInfo',
		data: id,
		dataType: 'json', 
		async: false,
		success: function (res) {
			currentUser.push(res.data[0].currentMember);
		},
		error: function () { 
		}
	});
	return currentUser;
}

 function getImgHeader (memberId, cookie_id) {
	let imgBase64Str = '';
	mui.ajax(`${getHttpUtrlAndPort()}getMemberImg`, {
		data: {memberId: memberId},
		dataType: 'json',
		async: false,
		header: {'Cookie': cookie_id},
		success: function (res) {
			imgBase64Str = `data:image/png;base64,${res}`;
		}
	});
	return imgBase64Str;
} 

function formatTimeStampToStr (timestamp) {
	var date = new Date(timestamp);
	var year = date.getFullYear().toString().length > 1 ? date.getFullYear() : '0' + date.getFullYear();
	var month = date.getMonth().toString().length > 1 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
	var day = date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate();
	var hour = date.getHours().toString().length > 1 ? date.getHours() : '0' + date.getHours();
	var minute = date.getMinutes().toString().length > 1 ? date.getMinutes() : '0' + date.getMinutes();
	var second = date.getSeconds().toString().length > 1 ? date.getSeconds() : '0' + date.getSeconds();
	return date = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

function isLogined () {
	let flag = -1;
	mui.ajax(getHttpUtrlAndPort() + 'getCurrentMember', {
		data: {'isApp': 'isApp'},
		dataType: 'json',
		async: false,
		success: function (res) {
			if (res.currentAppMember != null && res.currentAppMember != undefined) {
				if (res.currentAppMember.length > 0) 
					flag = 1;
				else
					flag = 0;
			}
		},
		error: function () {
			console.log("检查登录出错, 检查网络连接");
		}
	});
	return flag;
}

function isNull (arg) {
	let isArrayed = Array.isArray(arg);
	let isUndefined = typeof (arg) == 'undefined' ? true : false;
	let isObjected = typeof (arg) == 'object' ? true : false;
	if (arg == null)
		return true;
	if (isUndefined)
		return true;
	if (isArrayed) {
		if (arg.length == 0)
			return true;
		else 
			return Object.keys(arg[0]).length == 0 ? true : false
	}
	if (isObjected) {
		return Object.keys(arg).length == 0 ? true : false;
	}
}
