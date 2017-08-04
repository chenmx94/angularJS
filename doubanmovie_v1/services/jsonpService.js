(function(angular){
	// 1.创建跨域服务模块
	var app = angular.module('myJsonpService', []);

	// 2.创建服务
	app.service('myService', ['$window', function($window){
		this.myJsonp = function(url, arg, fn){
			// 1.创建script标签
			var scrip = $window.document.createElement('script');

			// 2.设置src属性值
			// 2.1拼接url及arg
			var queryString = '';
			for(var key in arg){
				queryString += key + '=' + arg[key] + '&';
			}
			// 2.2设置不同的函数名 随机数转换成字符串然后去掉'0'和'.'
			var funcName = 'myJsonp' + $window.Math.random().toString().substring(2);
			url += '?' + queryString + 'callback=' + funcName;
			$window[funcName] = function(data){
				fn(data);
			};
			scrip.src = url;

			// 3.把script标签添加到dom上去
			document.body.appendChild(scrip);
		}
	}]);
})(angular);