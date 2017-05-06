// 问题：不能使用angular的jsonp
// 使用angular的jsonp
// $http.jsonp('https://api.douban.com/v2/movie/ in_theaters?callback=JSON_CALLBACK') JSON_CALLBACK会被替换成angular.callbacks._0，而豆瓣不支持

// 解决方案：自己实现jsonp
// 1. 先生成一个唯一编码，可以使用事件的毫秒值，作为函数名callback_12353532
// 2. 将该函数挂载到全局中 window.callback_12353532
// 3. 动态生成script标签
	// ① 创建script标签
	// ② 设置其src：url+ callback=callback_1243432  让服务器知道回调函数名称
				//  - 服务器返回的东西就是 callback_1243432(data)
	// ③ 插入到document中
// 4. 将跨域请求数据作为单独的服务，注入到控制器中

(function (angular) {
	// 模块名：app.jsonp
	// 服务对象名称：jsonpService

	var app = angular.module('app.jsonp', []);
	app.service('jsonpService', ['$window', function ($window) {
		this.jsonp = function (url, argObj, callback) {
			var callbackName = 'callback_' + Date.now();
			$window[callbackName] = callback;
			url += '?';
			for (var k in argObj) {
				var searchStr = k + '=' + argObj[k] + '&';
				url += searchStr;
			}
			url += 'callback='+callbackName;

			var script = $window.document.createElement('script');
			script.src = url;
			$window.document.body.appendChild(script);
		}
	}])

})(angular)
